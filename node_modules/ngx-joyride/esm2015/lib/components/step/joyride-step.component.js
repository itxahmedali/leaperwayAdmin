import { Component, Input, ViewEncapsulation, ViewChild, Renderer2, Injector, HostListener } from '@angular/core';
import { JoyrideStepService, ARROW_SIZE, DISTANCE_FROM_TARGET } from '../../services';
import { JoyrideStepsContainerService } from '../../services/joyride-steps-container.service';
import { EventListenerService } from '../../services/event-listener.service';
import { DocumentService } from '../../services/document.service';
import { JoyrideOptionsService } from '../../services/joyride-options.service';
import { LoggerService } from '../../services/logger.service';
import { TemplatesService } from '../../services/templates.service';
const STEP_MIN_WIDTH = 200;
const STEP_MAX_WIDTH = 400;
const CUSTOM_STEP_MAX_WIDTH_VW = 90;
const STEP_HEIGHT = 200;
const ASPECT_RATIO = 1.212;
export const DEFAULT_DISTANCE_FROM_MARGIN_TOP = 2;
export const DEFAULT_DISTANCE_FROM_MARGIN_LEFT = 2;
const DEFAULT_DISTANCE_FROM_MARGIN_BOTTOM = 5;
const DEFAULT_DISTANCE_FROM_MARGIN_RIGHT = 5;
export var KEY_CODE;
(function (KEY_CODE) {
    KEY_CODE[KEY_CODE["RIGHT_ARROW"] = 39] = "RIGHT_ARROW";
    KEY_CODE[KEY_CODE["LEFT_ARROW"] = 37] = "LEFT_ARROW";
    KEY_CODE[KEY_CODE["ESCAPE_KEY"] = 27] = "ESCAPE_KEY";
})(KEY_CODE || (KEY_CODE = {}));
export class JoyrideStepComponent {
    constructor(injector, stepsContainerService, eventListenerService, documentService, renderer, logger, optionsService, templateService) {
        this.injector = injector;
        this.stepsContainerService = stepsContainerService;
        this.eventListenerService = eventListenerService;
        this.documentService = documentService;
        this.renderer = renderer;
        this.logger = logger;
        this.optionsService = optionsService;
        this.templateService = templateService;
        this.stepWidth = STEP_MIN_WIDTH;
        this.stepHeight = STEP_HEIGHT;
        this.showArrow = true;
        this.arrowSize = ARROW_SIZE;
        this.subscriptions = [];
    }
    ngOnInit() {
        // Need to Inject here otherwise you will obtain a circular dependency
        this.joyrideStepService = this.injector.get(JoyrideStepService);
        this.documentHeight = this.documentService.getDocumentHeight();
        this.subscriptions.push(this.subscribeToResizeEvents());
        this.title = this.step.title.asObservable();
        this.text = this.step.text.asObservable();
        this.setCustomTemplates();
        this.setCustomTexts();
        this.counter = this.getCounter();
        this.isCounterVisible = this.optionsService.isCounterVisible();
        this.isPrevButtonVisible = this.optionsService.isPrevButtonVisible();
        this.themeColor = this.optionsService.getThemeColor();
        if (this.text)
            this.text.subscribe(val => this.checkRedraw(val));
        if (this.title)
            this.title.subscribe(val => this.checkRedraw(val));
    }
    ngAfterViewInit() {
        if (this.isCustomized()) {
            this.renderer.setStyle(this.stepContainer.nativeElement, 'max-width', CUSTOM_STEP_MAX_WIDTH_VW + 'vw');
            this.updateStepDimensions();
        }
        else {
            this.renderer.setStyle(this.stepContainer.nativeElement, 'max-width', STEP_MAX_WIDTH + 'px');
            let dimensions = this.getDimensionsByAspectRatio(this.stepContainer.nativeElement.clientWidth, this.stepContainer.nativeElement.clientHeight, ASPECT_RATIO);
            dimensions = this.adjustDimensions(dimensions.width, dimensions.height);
            this.stepWidth = dimensions.width;
            this.stepHeight = dimensions.height;
            this.renderer.setStyle(this.stepContainer.nativeElement, 'width', this.stepWidth + 'px');
            this.renderer.setStyle(this.stepContainer.nativeElement, 'height', this.stepHeight + 'px');
        }
        this.drawStep();
    }
    checkRedraw(val) {
        if (val != null) {
            // Need to wait that the change is rendered before redrawing
            setTimeout(() => {
                this.redrawStep();
            }, 2);
        }
    }
    isCustomized() {
        return (this.step.stepContent ||
            this.templateService.getCounter() ||
            this.templateService.getPrevButton() ||
            this.templateService.getNextButton() ||
            this.templateService.getDoneButton());
    }
    setCustomTexts() {
        const customeTexts = this.optionsService.getCustomTexts();
        this.prevText = customeTexts.prev;
        this.nextText = customeTexts.next;
        this.doneText = customeTexts.done;
    }
    drawStep() {
        let position = this.step.isElementOrAncestorFixed
            ? 'fixed'
            : 'absolute';
        this.renderer.setStyle(this.stepHolder.nativeElement, 'position', position);
        this.renderer.setStyle(this.stepHolder.nativeElement, 'transform', this.step.transformCssStyle);
        this.targetWidth = this.step.targetViewContainer.element.nativeElement.getBoundingClientRect().width;
        this.targetHeight = this.step.targetViewContainer.element.nativeElement.getBoundingClientRect().height;
        this.targetAbsoluteLeft =
            position === 'fixed'
                ? this.documentService.getElementFixedLeft(this.step.targetViewContainer.element)
                : this.documentService.getElementAbsoluteLeft(this.step.targetViewContainer.element);
        this.targetAbsoluteTop =
            position === 'fixed'
                ? this.documentService.getElementFixedTop(this.step.targetViewContainer.element)
                : this.documentService.getElementAbsoluteTop(this.step.targetViewContainer.element);
        this.setStepStyle();
    }
    getCounter() {
        let stepPosition = this.stepsContainerService.getStepNumber(this.step.name);
        let numberOfSteps = this.stepsContainerService.getStepsCount();
        this.counterData = { step: stepPosition, total: numberOfSteps };
        return stepPosition + '/' + numberOfSteps;
    }
    setCustomTemplates() {
        this.customContent = this.step.stepContent;
        this.ctx = this.step.stepContentParams;
        this.customPrevButton = this.templateService.getPrevButton();
        this.customNextButton = this.templateService.getNextButton();
        this.customDoneButton = this.templateService.getDoneButton();
        this.customCounter = this.templateService.getCounter();
    }
    keyEvent(event) {
        console.log(event);
        if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
            if (this.isLastStep()) {
                this.close();
            }
            else {
                this.next();
            }
        }
        else if (event.keyCode === KEY_CODE.LEFT_ARROW) {
            this.prev();
        }
        else if (event.keyCode === KEY_CODE.ESCAPE_KEY) {
            this.close();
        }
    }
    prev() {
        this.joyrideStepService.prev();
    }
    next() {
        this.joyrideStepService.next();
    }
    close() {
        this.joyrideStepService.close();
    }
    isFirstStep() {
        return this.stepsContainerService.getStepNumber(this.step.name) === 1;
    }
    isLastStep() {
        return (this.stepsContainerService.getStepNumber(this.step.name) ===
            this.stepsContainerService.getStepsCount());
    }
    setStepStyle() {
        switch (this.step.position) {
            case 'top': {
                this.setStyleTop();
                break;
            }
            case 'bottom': {
                this.setStyleBottom();
                break;
            }
            case 'right': {
                this.setStyleRight();
                break;
            }
            case 'left': {
                this.setStyleLeft();
                break;
            }
            case 'center': {
                this.setStyleCenter();
                break;
            }
            default: {
                this.setStyleBottom();
            }
        }
    }
    setStyleTop() {
        this.stepsContainerService.updatePosition(this.step.name, 'top');
        this.topPosition =
            this.targetAbsoluteTop - DISTANCE_FROM_TARGET - this.stepHeight;
        this.stepAbsoluteTop =
            this.targetAbsoluteTop - DISTANCE_FROM_TARGET - this.stepHeight;
        this.arrowTopPosition = this.stepHeight;
        this.leftPosition =
            this.targetWidth / 2 - this.stepWidth / 2 + this.targetAbsoluteLeft;
        this.stepAbsoluteLeft =
            this.targetWidth / 2 - this.stepWidth / 2 + this.targetAbsoluteLeft;
        this.arrowLeftPosition = this.stepWidth / 2 - this.arrowSize;
        this.adjustLeftPosition();
        this.adjustRightPosition();
        this.arrowPosition = 'bottom';
        this.autofixTopPosition();
    }
    setStyleRight() {
        this.stepsContainerService.updatePosition(this.step.name, 'right');
        this.topPosition =
            this.targetAbsoluteTop +
                this.targetHeight / 2 -
                this.stepHeight / 2;
        this.stepAbsoluteTop =
            this.targetAbsoluteTop +
                this.targetHeight / 2 -
                this.stepHeight / 2;
        this.arrowTopPosition = this.stepHeight / 2 - this.arrowSize;
        this.leftPosition =
            this.targetAbsoluteLeft + this.targetWidth + DISTANCE_FROM_TARGET;
        this.stepAbsoluteLeft =
            this.targetAbsoluteLeft + this.targetWidth + DISTANCE_FROM_TARGET;
        this.arrowLeftPosition = -this.arrowSize;
        this.adjustTopPosition();
        this.adjustBottomPosition();
        this.arrowPosition = 'left';
        this.autofixRightPosition();
    }
    setStyleBottom() {
        this.stepsContainerService.updatePosition(this.step.name, 'bottom');
        this.topPosition =
            this.targetAbsoluteTop + this.targetHeight + DISTANCE_FROM_TARGET;
        this.stepAbsoluteTop =
            this.targetAbsoluteTop + this.targetHeight + DISTANCE_FROM_TARGET;
        this.arrowTopPosition = -this.arrowSize;
        this.arrowLeftPosition = this.stepWidth / 2 - this.arrowSize;
        this.leftPosition =
            this.targetWidth / 2 - this.stepWidth / 2 + this.targetAbsoluteLeft;
        this.stepAbsoluteLeft =
            this.targetWidth / 2 - this.stepWidth / 2 + this.targetAbsoluteLeft;
        this.adjustLeftPosition();
        this.adjustRightPosition();
        this.arrowPosition = 'top';
        this.autofixBottomPosition();
    }
    setStyleLeft() {
        this.stepsContainerService.updatePosition(this.step.name, 'left');
        this.topPosition =
            this.targetAbsoluteTop +
                this.targetHeight / 2 -
                this.stepHeight / 2;
        this.stepAbsoluteTop =
            this.targetAbsoluteTop +
                this.targetHeight / 2 -
                this.stepHeight / 2;
        this.arrowTopPosition = this.stepHeight / 2 - this.arrowSize;
        this.leftPosition =
            this.targetAbsoluteLeft - this.stepWidth - DISTANCE_FROM_TARGET;
        this.stepAbsoluteLeft =
            this.targetAbsoluteLeft - this.stepWidth - DISTANCE_FROM_TARGET;
        this.arrowLeftPosition = this.stepWidth;
        this.adjustTopPosition();
        this.adjustBottomPosition();
        this.arrowPosition = 'right';
        this.autofixLeftPosition();
    }
    setStyleCenter() {
        this.renderer.setStyle(this.stepHolder.nativeElement, 'position', 'fixed');
        this.renderer.setStyle(this.stepHolder.nativeElement, 'top', '50%');
        this.renderer.setStyle(this.stepHolder.nativeElement, 'left', '50%');
        this.updateStepDimensions();
        this.renderer.setStyle(this.stepHolder.nativeElement, 'transform', `translate(-${this.stepWidth / 2}px, -${this.stepHeight / 2}px)`);
        this.showArrow = false;
    }
    adjustLeftPosition() {
        if (this.leftPosition < 0) {
            this.arrowLeftPosition =
                this.arrowLeftPosition +
                    this.leftPosition -
                    DEFAULT_DISTANCE_FROM_MARGIN_LEFT;
            this.leftPosition = DEFAULT_DISTANCE_FROM_MARGIN_LEFT;
        }
    }
    adjustRightPosition() {
        let currentWindowWidth = document.body.clientWidth;
        if (this.stepAbsoluteLeft + this.stepWidth > currentWindowWidth) {
            let newLeftPos = this.leftPosition -
                (this.stepAbsoluteLeft +
                    this.stepWidth +
                    DEFAULT_DISTANCE_FROM_MARGIN_RIGHT -
                    currentWindowWidth);
            let deltaLeftPosition = newLeftPos - this.leftPosition;
            this.leftPosition = newLeftPos;
            this.arrowLeftPosition = this.arrowLeftPosition - deltaLeftPosition;
        }
    }
    adjustTopPosition() {
        if (this.stepAbsoluteTop < 0) {
            this.arrowTopPosition =
                this.arrowTopPosition +
                    this.topPosition -
                    DEFAULT_DISTANCE_FROM_MARGIN_TOP;
            this.topPosition = DEFAULT_DISTANCE_FROM_MARGIN_TOP;
        }
    }
    adjustBottomPosition() {
        if (this.stepAbsoluteTop + this.stepHeight > this.documentHeight) {
            let newTopPos = this.topPosition -
                (this.stepAbsoluteTop +
                    this.stepHeight +
                    DEFAULT_DISTANCE_FROM_MARGIN_BOTTOM -
                    this.documentHeight);
            let deltaTopPosition = newTopPos - this.topPosition;
            this.topPosition = newTopPos;
            this.arrowTopPosition = this.arrowTopPosition - deltaTopPosition;
        }
    }
    autofixTopPosition() {
        if (this.positionAlreadyFixed) {
            this.logger.warn('No step positions found for this step. The step will be centered.');
        }
        else if (this.targetAbsoluteTop - this.stepHeight - this.arrowSize <
            0) {
            this.positionAlreadyFixed = true;
            this.setStyleRight();
        }
    }
    autofixRightPosition() {
        if (this.targetAbsoluteLeft +
            this.targetWidth +
            this.stepWidth +
            this.arrowSize >
            document.body.clientWidth) {
            this.setStyleBottom();
        }
    }
    autofixBottomPosition() {
        if (this.targetAbsoluteTop +
            this.stepHeight +
            this.arrowSize +
            this.targetHeight >
            this.documentHeight) {
            this.setStyleLeft();
        }
    }
    autofixLeftPosition() {
        if (this.targetAbsoluteLeft - this.stepWidth - this.arrowSize < 0) {
            this.setStyleTop();
        }
    }
    subscribeToResizeEvents() {
        return this.eventListenerService.resizeEvent.subscribe(() => {
            this.redrawStep();
        });
    }
    redrawStep() {
        this.updateStepDimensions();
        this.drawStep();
    }
    getDimensionsByAspectRatio(width, height, aspectRatio) {
        let calcHeight = (width + height) / (1 + aspectRatio);
        let calcWidth = calcHeight * aspectRatio;
        return {
            width: calcWidth,
            height: calcHeight
        };
    }
    adjustDimensions(width, height) {
        let area = width * height;
        let newWidth = width;
        let newHeight = height;
        if (width > STEP_MAX_WIDTH) {
            newWidth = STEP_MAX_WIDTH;
            newHeight = area / newWidth;
        }
        else if (width < STEP_MIN_WIDTH) {
            newWidth = STEP_MIN_WIDTH;
            newHeight = STEP_MIN_WIDTH / ASPECT_RATIO;
        }
        return {
            width: newWidth,
            height: newHeight
        };
    }
    updateStepDimensions() {
        this.stepWidth = this.stepContainer.nativeElement.clientWidth;
        this.stepHeight = this.stepContainer.nativeElement.clientHeight;
    }
    ngOnDestroy() {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
    }
}
JoyrideStepComponent.decorators = [
    { type: Component, args: [{
                selector: 'joyride-step',
                template: "<div #stepHolder class=\"joyride-step__holder\" [id]=\"'joyride-step-' + step.name\" [style.top.px]=\"topPosition\" [style.left.px]=\"leftPosition\">\r\n    <joyride-arrow *ngIf=\"showArrow\" class=\"joyride-step__arrow\" [position]=\"arrowPosition\" [style.top.px]=\"arrowTopPosition\"\r\n        [style.left.px]=\"arrowLeftPosition\"></joyride-arrow>\r\n    <div #stepContainer class=\"joyride-step__container\">\r\n        <joy-close-button class=\"joyride-step__close\" (click)=\"close()\"></joy-close-button>\r\n        <div class=\"joyride-step__header\">\r\n            <div class=\"joyride-step__title\" [style.color]=\"themeColor\">{{ title | async }}</div>\r\n        </div>\r\n        <div class=\"joyride-step__body\">\r\n            <ng-container *ngTemplateOutlet=\"customContent ? customContent : defaultContent; context: ctx\"></ng-container>\r\n            <ng-template #defaultContent>\r\n                {{ text | async }}\r\n            </ng-template>\r\n        </div>\r\n        <div class=\"joyride-step__footer\">\r\n            <div *ngIf=\"isCounterVisible\" class=\"joyride-step__counter-container\">\r\n                <ng-container *ngTemplateOutlet=\"customCounter ? customCounter : defaultCounter; context: counterData\"></ng-container>\r\n                <ng-template #defaultCounter>\r\n                    <div class=\"joyride-step__counter\">{{ counter }}</div>\r\n                </ng-template>\r\n            </div>\r\n            <div class=\"joyride-step__buttons-container\">\r\n                <div class=\"joyride-step__prev-container joyride-step__button\" *ngIf=\"isPrevButtonVisible && !isFirstStep()\" (click)=\"prev()\">\r\n                    <ng-container *ngTemplateOutlet=\"customPrevButton ? customPrevButton : defaultPrevButton\"></ng-container>\r\n                    <ng-template #defaultPrevButton>\r\n                        <joyride-button class=\"joyride-step__prev-button\" [color]=\"themeColor\">{{ prevText | async }}</joyride-button>\r\n                    </ng-template>\r\n                </div>\r\n                <div class=\"joyride-step__next-container joyride-step__button\" *ngIf=\"!isLastStep(); else doneButton\" (click)=\"next()\">\r\n                    <ng-container *ngTemplateOutlet=\"customNextButton ? customNextButton : defaulNextButton\"></ng-container>\r\n                    <ng-template #defaulNextButton>\r\n                        <joyride-button [color]=\"themeColor\">{{ nextText | async }}</joyride-button>\r\n                    </ng-template>\r\n                </div>\r\n                <ng-template #doneButton>\r\n                    <div class=\"joyride-step__done-container joyride-step__button\" (click)=\"close()\">\r\n                        <ng-container *ngTemplateOutlet=\"customDoneButton ? customDoneButton : defaultDoneButton\"></ng-container>\r\n                        <ng-template #defaultDoneButton>\r\n                            <joyride-button class=\"joyride-step__done-button\" [color]=\"themeColor\">{{ doneText | async }}</joyride-button>\r\n                        </ng-template>\r\n                    </div>\r\n                </ng-template>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>",
                encapsulation: ViewEncapsulation.None,
                styles: [".joyride-step__holder{position:absolute;font-family:Arial,Helvetica,sans-serif;font-size:16px;z-index:1001}.joyride-step__arrow{position:absolute;left:40px;z-index:1002}.joyride-step__container{box-sizing:border-box;position:relative;color:#000;background-color:#fff;display:flex;flex-direction:column;justify-content:space-between;padding:10px;box-shadow:0 0 30px 1px #000}.joyride-step__header{display:flex;align-items:center;padding:8px}.joyride-step__title{font-weight:700;font-size:20px}.joyride-step__close{position:absolute;right:10px;top:10px;width:14px;height:14px;cursor:pointer}.joyride-step__body{text-align:left;padding:10px 8px}.joyride-step__footer{justify-content:space-between;align-items:center;padding-left:8px}.joyride-step__buttons-container,.joyride-step__footer{display:flex;flex-direction:row}.joyride-step__button:first-child{margin-right:2.5px}.joyride-step__button:last-child{margin-left:2.5px}.joyride-step__counter{font-weight:700;font-size:14px}.joyride-step__counter-container{margin-right:10px}"]
            },] }
];
JoyrideStepComponent.ctorParameters = () => [
    { type: Injector },
    { type: JoyrideStepsContainerService },
    { type: EventListenerService },
    { type: DocumentService },
    { type: Renderer2 },
    { type: LoggerService },
    { type: JoyrideOptionsService },
    { type: TemplatesService }
];
JoyrideStepComponent.propDecorators = {
    step: [{ type: Input }],
    stepHolder: [{ type: ViewChild, args: ['stepHolder', { static: true },] }],
    stepContainer: [{ type: ViewChild, args: ['stepContainer', { static: true },] }],
    keyEvent: [{ type: HostListener, args: ['window:keyup', ['$event'],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam95cmlkZS1zdGVwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1qb3lyaWRlL3NyYy9saWIvY29tcG9uZW50cy9zdGVwL2pveXJpZGUtc3RlcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBRUwsaUJBQWlCLEVBSWpCLFNBQVMsRUFDVCxTQUFTLEVBQ1QsUUFBUSxFQUVSLFlBQVksRUFDZixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQ0gsa0JBQWtCLEVBQ2xCLFVBQVUsRUFDVixvQkFBb0IsRUFFdkIsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUM5RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUU3RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRXBFLE1BQU0sY0FBYyxHQUFHLEdBQUcsQ0FBQztBQUMzQixNQUFNLGNBQWMsR0FBRyxHQUFHLENBQUM7QUFDM0IsTUFBTSx3QkFBd0IsR0FBRyxFQUFFLENBQUM7QUFDcEMsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDO0FBQ3hCLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQztBQUMzQixNQUFNLENBQUMsTUFBTSxnQ0FBZ0MsR0FBRyxDQUFDLENBQUM7QUFDbEQsTUFBTSxDQUFDLE1BQU0saUNBQWlDLEdBQUcsQ0FBQyxDQUFDO0FBQ25ELE1BQU0sbUNBQW1DLEdBQUcsQ0FBQyxD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LFlBQVksQ0FBQztJQUNwRSxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ3RDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7OztZQXJnQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxjQUFjO2dCQUN4QixxcUdBQTRDO2dCQUU1QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFDeEM7OztZQXZDRyxRQUFRO1lBV0gsNEJBQTRCO1lBQzVCLG9CQUFvQjtZQUVwQixlQUFlO1lBZnBCLFNBQVM7WUFpQkosYUFBYTtZQURiLHFCQUFxQjtZQUVyQixnQkFBZ0I7OzttQkFnRXBCLEtBQUs7eUJBQ0wsU0FBUyxTQUFDLFlBQVksRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7NEJBQ3hDLFNBQVMsU0FBQyxlQUFlLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO3VCQXlKM0MsWUFBWSxTQUFDLGNBQWMsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBJbnB1dCxcclxuICAgIEFmdGVyVmlld0luaXQsXHJcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcclxuICAgIE9uSW5pdCxcclxuICAgIE9uRGVzdHJveSxcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBWaWV3Q2hpbGQsXHJcbiAgICBSZW5kZXJlcjIsXHJcbiAgICBJbmplY3RvcixcclxuICAgIFRlbXBsYXRlUmVmLFxyXG4gICAgSG9zdExpc3RlbmVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEpveXJpZGVTdGVwIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2pveXJpZGUtc3RlcC5jbGFzcyc7XHJcbmltcG9ydCB7XHJcbiAgICBKb3lyaWRlU3RlcFNlcnZpY2UsXHJcbiAgICBBUlJPV19TSVpFLFxyXG4gICAgRElTVEFOQ0VfRlJPTV9UQVJHRVQsXHJcbiAgICBJSm95cmlkZVN0ZXBTZXJ2aWNlXHJcbn0gZnJvbSAnLi4vLi4vc2VydmljZXMnO1xyXG5pbXBvcnQgeyBKb3lyaWRlU3RlcHNDb250YWluZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvam95cmlkZS1zdGVwcy1jb250YWluZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEV2ZW50TGlzdGVuZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZXZlbnQtbGlzdGVuZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBEb2N1bWVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kb2N1bWVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSm95cmlkZU9wdGlvbnNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvam95cmlkZS1vcHRpb25zLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMb2dnZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbG9nZ2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUZW1wbGF0ZXNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdGVtcGxhdGVzLnNlcnZpY2UnO1xyXG5cclxuY29uc3QgU1RFUF9NSU5fV0lEVEggPSAyMDA7XHJcbmNvbnN0IFNURVBfTUFYX1dJRFRIID0gNDAwO1xyXG5jb25zdCBDVVNUT01fU1RFUF9NQVhfV0lEVEhfVlcgPSA5MDtcclxuY29uc3QgU1RFUF9IRUlHSFQgPSAyMDA7XHJcbmNvbnN0IEFTUEVDVF9SQVRJTyA9IDEuMjEyO1xyXG5leHBvcnQgY29uc3QgREVGQVVMVF9ESVNUQU5DRV9GUk9NX01BUkdJTl9UT1AgPSAyO1xyXG5leHBvcnQgY29uc3QgREVGQVVMVF9ESVNUQU5DRV9GUk9NX01BUkdJTl9MRUZUID0gMjtcclxuY29uc3QgREVGQVVMVF9ESVNUQU5DRV9GUk9NX01BUkdJTl9CT1RUT00gPSA1O1xyXG5jb25zdCBERUZBVUxUX0RJU1RBTkNFX0ZST01fTUFSR0lOX1JJR0hUID0gNTtcclxuZXhwb3J0IGVudW0gS0VZX0NPREUge1xyXG4gIFJJR0hUX0FSUk9XID0gMzksXHJcbiAgTEVGVF9BUlJPVyA9IDM3LFxyXG4gIEVTQ0FQRV9LRVk9IDI3XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdqb3lyaWRlLXN0ZXAnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2pveXJpZGUtc3RlcC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9qb3lyaWRlLXN0ZXAuY29tcG9uZW50LnNjc3MnXSxcclxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcclxufSlcclxuZXhwb3J0IGNsYXNzIEpveXJpZGVTdGVwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xyXG4gICAgc3RlcFdpZHRoOiBudW1iZXIgPSBTVEVQX01JTl9XSURUSDtcclxuICAgIHN0ZXBIZWlnaHQ6IG51bWJlciA9IFNURVBfSEVJR0hUO1xyXG4gICAgbGVmdFBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICB0b3BQb3NpdGlvbjogbnVtYmVyO1xyXG4gICAgc2hvd0Fycm93ID0gdHJ1ZTtcclxuICAgIGFycm93UG9zaXRpb246IHN0cmluZztcclxuICAgIGFycm93TGVmdFBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICBhcnJvd1RvcFBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICB0aXRsZTogT2JzZXJ2YWJsZTxzdHJpbmc+O1xyXG4gICAgdGV4dDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xyXG4gICAgY291bnRlcjogc3RyaW5nO1xyXG4gICAgaXNDb3VudGVyVmlzaWJsZTogYm9vbGVhbjtcclxuICAgIGlzUHJldkJ1dHRvblZpc2libGU6IGJvb2xlYW47XHJcbiAgICB0aGVtZUNvbG9yOiBzdHJpbmc7XHJcbiAgICBjdXN0b21Db250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gICAgY3VzdG9tUHJldkJ1dHRvbjogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgIGN1c3RvbU5leHRCdXR0b246IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgICBjdXN0b21Eb25lQnV0dG9uOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gICAgY3VzdG9tQ291bnRlcjogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgIGNvdW50ZXJEYXRhOiBhbnk7XHJcbiAgICBjdHg6IE9iamVjdDtcclxuXHJcbiAgICBwcml2YXRlIGFycm93U2l6ZTogbnVtYmVyID0gQVJST1dfU0laRTtcclxuICAgIHByaXZhdGUgc3RlcEFic29sdXRlTGVmdDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBzdGVwQWJzb2x1dGVUb3A6IG51bWJlcjtcclxuICAgIHByaXZhdGUgdGFyZ2V0V2lkdGg6IG51bWJlcjtcclxuICAgIHRhcmdldEhlaWdodDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSB0YXJnZXRBYnNvbHV0ZUxlZnQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgdGFyZ2V0QWJzb2x1dGVUb3A6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcbiAgICBqb3lyaWRlU3RlcFNlcnZpY2U6IElKb3lyaWRlU3RlcFNlcnZpY2U7XHJcblxyXG4gICAgcHJpdmF0ZSBwb3NpdGlvbkFscmVhZHlGaXhlZDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgZG9jdW1lbnRIZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgICBwcmV2VGV4dDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xyXG4gICAgbmV4dFRleHQ6IE9ic2VydmFibGU8c3RyaW5nPjtcclxuICAgIGRvbmVUZXh0OiBPYnNlcnZhYmxlPHN0cmluZz47XHJcblxyXG4gICAgQElucHV0KCkgc3RlcD86IEpveXJpZGVTdGVwO1xyXG4gICAgQFZpZXdDaGlsZCgnc3RlcEhvbGRlcicsIHsgc3RhdGljOiB0cnVlIH0pIHN0ZXBIb2xkZXI6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKCdzdGVwQ29udGFpbmVyJywgeyBzdGF0aWM6IHRydWUgfSkgc3RlcENvbnRhaW5lcjogRWxlbWVudFJlZjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHN0ZXBzQ29udGFpbmVyU2VydmljZTogSm95cmlkZVN0ZXBzQ29udGFpbmVyU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50TGlzdGVuZXJTZXJ2aWNlOiBFdmVudExpc3RlbmVyU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGRvY3VtZW50U2VydmljZTogRG9jdW1lbnRTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGxvZ2dlcjogTG9nZ2VyU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IG9wdGlvbnNTZXJ2aWNlOiBKb3lyaWRlT3B0aW9uc1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSB0ZW1wbGF0ZVNlcnZpY2U6IFRlbXBsYXRlc1NlcnZpY2VcclxuICAgICkge31cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICAvLyBOZWVkIHRvIEluamVjdCBoZXJlIG90aGVyd2lzZSB5b3Ugd2lsbCBvYnRhaW4gYSBjaXJjdWxhciBkZXBlbmRlbmN5XHJcbiAgICAgICAgdGhpcy5qb3lyaWRlU3RlcFNlcnZpY2UgPSB0aGlzLmluamVjdG9yLmdldChKb3lyaWRlU3RlcFNlcnZpY2UpO1xyXG5cclxuICAgICAgICB0aGlzLmRvY3VtZW50SGVpZ2h0ID0gdGhpcy5kb2N1bWVudFNlcnZpY2UuZ2V0RG9jdW1lbnRIZWlnaHQoKTtcclxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLnN1YnNjcmliZVRvUmVzaXplRXZlbnRzKCkpO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aGlzLnN0ZXAudGl0bGUuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICAgICAgdGhpcy50ZXh0ID0gdGhpcy5zdGVwLnRleHQuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0Q3VzdG9tVGVtcGxhdGVzKCk7XHJcbiAgICAgICAgdGhpcy5zZXRDdXN0b21UZXh0cygpO1xyXG5cclxuICAgICAgICB0aGlzLmNvdW50ZXIgPSB0aGlzLmdldENvdW50ZXIoKTtcclxuICAgICAgICB0aGlzLmlzQ291bnRlclZpc2libGUgPSB0aGlzLm9wdGlvbnNTZXJ2aWNlLmlzQ291bnRlclZpc2libGUoKTtcclxuICAgICAgICB0aGlzLmlzUHJldkJ1dHRvblZpc2libGUgPSB0aGlzLm9wdGlvbnNTZXJ2aWNlLmlzUHJldkJ1dHRvblZpc2libGUoKTtcclxuICAgICAgICB0aGlzLnRoZW1lQ29sb3IgPSB0aGlzLm9wdGlvbnNTZXJ2aWNlLmdldFRoZW1lQ29sb3IoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudGV4dCkgdGhpcy50ZXh0LnN1YnNjcmliZSh2YWwgPT4gdGhpcy5jaGVja1JlZHJhdyh2YWwpKTtcclxuICAgICAgICBpZiAodGhpcy50aXRsZSkgdGhpcy50aXRsZS5zdWJzY3JpYmUodmFsID0+IHRoaXMuY2hlY2tSZWRyYXcodmFsKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzQ3VzdG9taXplZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0ZXBDb250YWluZXIubmF0aXZlRWxlbWVudCxcclxuICAgICAgICAgICAgICAgICdtYXgtd2lkdGgnLFxyXG4gICAgICAgICAgICAgICAgQ1VTVE9NX1NURVBfTUFYX1dJRFRIX1ZXICsgJ3Z3J1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVN0ZXBEaW1lbnNpb25zKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RlcENvbnRhaW5lci5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgJ21heC13aWR0aCcsXHJcbiAgICAgICAgICAgICAgICBTVEVQX01BWF9XSURUSCArICdweCdcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgbGV0IGRpbWVuc2lvbnMgPSB0aGlzLmdldERpbWVuc2lvbnNCeUFzcGVjdFJhdGlvKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGVwQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuY2xpZW50V2lkdGgsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0ZXBDb250YWluZXIubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBBU1BFQ1RfUkFUSU9cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgZGltZW5zaW9ucyA9IHRoaXMuYWRqdXN0RGltZW5zaW9ucyhcclxuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnMud2lkdGgsXHJcbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zLmhlaWdodFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0aGlzLnN0ZXBXaWR0aCA9IGRpbWVuc2lvbnMud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuc3RlcEhlaWdodCA9IGRpbWVuc2lvbnMuaGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGVwQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAnd2lkdGgnLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGVwV2lkdGggKyAncHgnXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0ZXBDb250YWluZXIubmF0aXZlRWxlbWVudCxcclxuICAgICAgICAgICAgICAgICdoZWlnaHQnLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGVwSGVpZ2h0ICsgJ3B4J1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRyYXdTdGVwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja1JlZHJhdyh2YWwpIHtcclxuICAgICAgICBpZiAodmFsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgLy8gTmVlZCB0byB3YWl0IHRoYXQgdGhlIGNoYW5nZSBpcyByZW5kZXJlZCBiZWZvcmUgcmVkcmF3aW5nXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWRyYXdTdGVwKCk7XHJcbiAgICAgICAgICAgIH0sIDIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzQ3VzdG9taXplZCgpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICB0aGlzLnN0ZXAuc3RlcENvbnRlbnQgfHxcclxuICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZVNlcnZpY2UuZ2V0Q291bnRlcigpIHx8XHJcbiAgICAgICAgICAgIHRoaXMudGVtcGxhdGVTZXJ2aWNlLmdldFByZXZCdXR0b24oKSB8fFxyXG4gICAgICAgICAgICB0aGlzLnRlbXBsYXRlU2VydmljZS5nZXROZXh0QnV0dG9uKCkgfHxcclxuICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZVNlcnZpY2UuZ2V0RG9uZUJ1dHRvbigpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldEN1c3RvbVRleHRzKCkge1xyXG4gICAgICAgIGNvbnN0IGN1c3RvbWVUZXh0cyA9IHRoaXMub3B0aW9uc1NlcnZpY2UuZ2V0Q3VzdG9tVGV4dHMoKTtcclxuICAgICAgICB0aGlzLnByZXZUZXh0ID0gY3VzdG9tZVRleHRzLnByZXY7XHJcbiAgICAgICAgdGhpcy5uZXh0VGV4dCA9IGN1c3RvbWVUZXh0cy5uZXh0O1xyXG4gICAgICAgIHRoaXMuZG9uZVRleHQgPSBjdXN0b21lVGV4dHMuZG9uZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyYXdTdGVwKCkge1xyXG4gICAgICAgIGxldCBwb3NpdGlvbiA9IHRoaXMuc3RlcC5pc0VsZW1lbnRPckFuY2VzdG9yRml4ZWRcclxuICAgICAgICAgICAgPyAnZml4ZWQnXHJcbiAgICAgICAgICAgIDogJ2Fic29sdXRlJztcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKFxyXG4gICAgICAgICAgICB0aGlzLnN0ZXBIb2xkZXIubmF0aXZlRWxlbWVudCxcclxuICAgICAgICAgICAgJ3Bvc2l0aW9uJyxcclxuICAgICAgICAgICAgcG9zaXRpb25cclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoXHJcbiAgICAgICAgICAgIHRoaXMuc3RlcEhvbGRlci5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAgICAgICAndHJhbnNmb3JtJyxcclxuICAgICAgICAgICAgdGhpcy5zdGVwLnRyYW5zZm9ybUNzc1N0eWxlXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLnRhcmdldFdpZHRoID0gdGhpcy5zdGVwLnRhcmdldFZpZXdDb250YWluZXIuZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0SGVpZ2h0ID0gdGhpcy5zdGVwLnRhcmdldFZpZXdDb250YWluZXIuZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcclxuICAgICAgICB0aGlzLnRhcmdldEFic29sdXRlTGVmdCA9XHJcbiAgICAgICAgICAgIHBvc2l0aW9uID09PSAnZml4ZWQnXHJcbiAgICAgICAgICAgICAgICA/IHRoaXMuZG9jdW1lbnRTZXJ2aWNlLmdldEVsZW1lbnRGaXhlZExlZnQoXHJcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0ZXAudGFyZ2V0Vmlld0NvbnRhaW5lci5lbGVtZW50XHJcbiAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIDogdGhpcy5kb2N1bWVudFNlcnZpY2UuZ2V0RWxlbWVudEFic29sdXRlTGVmdChcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RlcC50YXJnZXRWaWV3Q29udGFpbmVyLmVsZW1lbnRcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB0aGlzLnRhcmdldEFic29sdXRlVG9wID1cclxuICAgICAgICAgICAgcG9zaXRpb24gPT09ICdmaXhlZCdcclxuICAgICAgICAgICAgICAgID8gdGhpcy5kb2N1bWVudFNlcnZpY2UuZ2V0RWxlbWVudEZpeGVkVG9wKFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGVwLnRhcmdldFZpZXdDb250YWluZXIuZWxlbWVudFxyXG4gICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICA6IHRoaXMuZG9jdW1lbnRTZXJ2aWNlLmdldEVsZW1lbnRBYnNvbHV0ZVRvcChcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RlcC50YXJnZXRWaWV3Q29udGFpbmVyLmVsZW1lbnRcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB0aGlzLnNldFN0ZXBTdHlsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Q291bnRlcigpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBzdGVwUG9zaXRpb24gPSB0aGlzLnN0ZXBzQ29udGFpbmVyU2VydmljZS5nZXRTdGVwTnVtYmVyKFxyXG4gICAgICAgICAgICB0aGlzLnN0ZXAubmFtZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgbGV0IG51bWJlck9mU3RlcHMgPSB0aGlzLnN0ZXBzQ29udGFpbmVyU2VydmljZS5nZXRTdGVwc0NvdW50KCk7XHJcbiAgICAgICAgdGhpcy5jb3VudGVyRGF0YSA9IHsgc3RlcDogc3RlcFBvc2l0aW9uLCB0b3RhbDogbnVtYmVyT2ZTdGVwcyB9O1xyXG4gICAgICAgIHJldHVybiBzdGVwUG9zaXRpb24gKyAnLycgKyBudW1iZXJPZlN0ZXBzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0Q3VzdG9tVGVtcGxhdGVzKCkge1xyXG4gICAgICAgIHRoaXMuY3VzdG9tQ29udGVudCA9IHRoaXMuc3RlcC5zdGVwQ29udGVudDtcclxuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuc3RlcC5zdGVwQ29udGVudFBhcmFtcztcclxuICAgICAgICB0aGlzLmN1c3RvbVByZXZCdXR0b24gPSB0aGlzLnRlbXBsYXRlU2VydmljZS5nZXRQcmV2QnV0dG9uKCk7XHJcbiAgICAgICAgdGhpcy5jdXN0b21OZXh0QnV0dG9uID0gdGhpcy50ZW1wbGF0ZVNlcnZpY2UuZ2V0TmV4dEJ1dHRvbigpO1xyXG4gICAgICAgIHRoaXMuY3VzdG9tRG9uZUJ1dHRvbiA9IHRoaXMudGVtcGxhdGVTZXJ2aWNlLmdldERvbmVCdXR0b24oKTtcclxuICAgICAgICB0aGlzLmN1c3RvbUNvdW50ZXIgPSB0aGlzLnRlbXBsYXRlU2VydmljZS5nZXRDb3VudGVyKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzprZXl1cCcsIFsnJGV2ZW50J10pXHJcbiAgICBrZXlFdmVudChldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgY29uc29sZS5sb2coZXZlbnQpO1xyXG5cclxuICAgIGlmIChldmVudC5rZXlDb2RlID09PSBLRVlfQ09ERS5SSUdIVF9BUlJPVykge1xyXG4gICAgICBpZiAodGhpcy5pc0xhc3RTdGVwKCkpIHtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5uZXh0KCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gS0VZX0NPREUuTEVGVF9BUlJPVykge1xyXG4gICAgICB0aGlzLnByZXYoKTtcclxuICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gS0VZX0NPREUuRVNDQVBFX0tFWSkge1xyXG4gICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAgIHByZXYoKSB7XHJcbiAgICAgICAgdGhpcy5qb3lyaWRlU3RlcFNlcnZpY2UucHJldigpO1xyXG4gICAgfVxyXG5cclxuICAgIG5leHQoKSB7XHJcbiAgICAgICAgdGhpcy5qb3lyaWRlU3RlcFNlcnZpY2UubmV4dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMuam95cmlkZVN0ZXBTZXJ2aWNlLmNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNGaXJzdFN0ZXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RlcHNDb250YWluZXJTZXJ2aWNlLmdldFN0ZXBOdW1iZXIodGhpcy5zdGVwLm5hbWUpID09PSAxO1xyXG4gICAgfVxyXG5cclxuICAgIGlzTGFzdFN0ZXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgdGhpcy5zdGVwc0NvbnRhaW5lclNlcnZpY2UuZ2V0U3RlcE51bWJlcih0aGlzLnN0ZXAubmFtZSkgPT09XHJcbiAgICAgICAgICAgIHRoaXMuc3RlcHNDb250YWluZXJTZXJ2aWNlLmdldFN0ZXBzQ291bnQoKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRTdGVwU3R5bGUoKSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0ZXAucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgY2FzZSAndG9wJzoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdHlsZVRvcCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAnYm90dG9tJzoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdHlsZUJvdHRvbSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAncmlnaHQnOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0eWxlUmlnaHQoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0eWxlTGVmdCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAnY2VudGVyJzoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdHlsZUNlbnRlcigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdHlsZUJvdHRvbSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0U3R5bGVUb3AoKSB7XHJcbiAgICAgICAgdGhpcy5zdGVwc0NvbnRhaW5lclNlcnZpY2UudXBkYXRlUG9zaXRpb24odGhpcy5zdGVwLm5hbWUsICd0b3AnKTtcclxuICAgICAgICB0aGlzLnRvcFBvc2l0aW9uID1cclxuICAgICAgICAgICAgdGhpcy50YXJnZXRBYnNvbHV0ZVRvcCAtIERJU1RBTkNFX0ZST01fVEFSR0VUIC0gdGhpcy5zdGVwSGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuc3RlcEFic29sdXRlVG9wID1cclxuICAgICAgICAgICAgdGhpcy50YXJnZXRBYnNvbHV0ZVRvcCAtIERJU1RBTkNFX0ZST01fVEFSR0VUIC0gdGhpcy5zdGVwSGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuYXJyb3dUb3BQb3NpdGlvbiA9IHRoaXMuc3RlcEhlaWdodDtcclxuXHJcbiAgICAgICAgdGhpcy5sZWZ0UG9zaXRpb24gPVxyXG4gICAgICAgICAgICB0aGlzLnRhcmdldFdpZHRoIC8gMiAtIHRoaXMuc3RlcFdpZHRoIC8gMiArIHRoaXMudGFyZ2V0QWJzb2x1dGVMZWZ0O1xyXG4gICAgICAgIHRoaXMuc3RlcEFic29sdXRlTGVmdCA9XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0V2lkdGggLyAyIC0gdGhpcy5zdGVwV2lkdGggLyAyICsgdGhpcy50YXJnZXRBYnNvbHV0ZUxlZnQ7XHJcbiAgICAgICAgdGhpcy5hcnJvd0xlZnRQb3NpdGlvbiA9IHRoaXMuc3RlcFdpZHRoIC8gMiAtIHRoaXMuYXJyb3dTaXplO1xyXG4gICAgICAgIHRoaXMuYWRqdXN0TGVmdFBvc2l0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5hZGp1c3RSaWdodFBvc2l0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5hcnJvd1Bvc2l0aW9uID0gJ2JvdHRvbSc7XHJcbiAgICAgICAgdGhpcy5hdXRvZml4VG9wUG9zaXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFN0eWxlUmlnaHQoKSB7XHJcbiAgICAgICAgdGhpcy5zdGVwc0NvbnRhaW5lclNlcnZpY2UudXBkYXRlUG9zaXRpb24odGhpcy5zdGVwLm5hbWUsICdyaWdodCcpO1xyXG4gICAgICAgIHRoaXMudG9wUG9zaXRpb24gPVxyXG4gICAgICAgICAgICB0aGlzLnRhcmdldEFic29sdXRlVG9wICtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXRIZWlnaHQgLyAyIC1cclxuICAgICAgICAgICAgdGhpcy5zdGVwSGVpZ2h0IC8gMjtcclxuICAgICAgICB0aGlzLnN0ZXBBYnNvbHV0ZVRvcCA9XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0QWJzb2x1dGVUb3AgK1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldEhlaWdodCAvIDIgLVxyXG4gICAgICAgICAgICB0aGlzLnN0ZXBIZWlnaHQgLyAyO1xyXG4gICAgICAgIHRoaXMuYXJyb3dUb3BQb3NpdGlvbiA9IHRoaXMuc3RlcEhlaWdodCAvIDIgLSB0aGlzLmFycm93U2l6ZTtcclxuXHJcbiAgICAgICAgdGhpcy5sZWZ0UG9zaXRpb24gPVxyXG4gICAgICAgICAgICB0aGlzLnRhcmdldEFic29sdXRlTGVmdCArIHRoaXMudGFyZ2V0V2lkdGggKyBESVNUQU5DRV9GUk9NX1RBUkdFVDtcclxuICAgICAgICB0aGlzLnN0ZXBBYnNvbHV0ZUxlZnQgPVxyXG4gICAgICAgICAgICB0aGlzLnRhcmdldEFic29sdXRlTGVmdCArIHRoaXMudGFyZ2V0V2lkdGggKyBESVNUQU5DRV9GUk9NX1RBUkdFVDtcclxuICAgICAgICB0aGlzLmFycm93TGVmdFBvc2l0aW9uID0gLXRoaXMuYXJyb3dTaXplO1xyXG4gICAgICAgIHRoaXMuYWRqdXN0VG9wUG9zaXRpb24oKTtcclxuICAgICAgICB0aGlzLmFkanVzdEJvdHRvbVBvc2l0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5hcnJvd1Bvc2l0aW9uID0gJ2xlZnQnO1xyXG4gICAgICAgIHRoaXMuYXV0b2ZpeFJpZ2h0UG9zaXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFN0eWxlQm90dG9tKCkge1xyXG4gICAgICAgIHRoaXMuc3RlcHNDb250YWluZXJTZXJ2aWNlLnVwZGF0ZVBvc2l0aW9uKHRoaXMuc3RlcC5uYW1lLCAnYm90dG9tJyk7XHJcbiAgICAgICAgdGhpcy50b3BQb3NpdGlvbiA9XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0QWJzb2x1dGVUb3AgKyB0aGlzLnRhcmdldEhlaWdodCArIERJU1RBTkNFX0ZST01fVEFSR0VUO1xyXG4gICAgICAgIHRoaXMuc3RlcEFic29sdXRlVG9wID1cclxuICAgICAgICAgICAgdGhpcy50YXJnZXRBYnNvbHV0ZVRvcCArIHRoaXMudGFyZ2V0SGVpZ2h0ICsgRElTVEFOQ0VfRlJPTV9UQVJHRVQ7XHJcbiAgICAgICAgdGhpcy5hcnJvd1RvcFBvc2l0aW9uID0gLXRoaXMuYXJyb3dTaXplO1xyXG5cclxuICAgICAgICB0aGlzLmFycm93TGVmdFBvc2l0aW9uID0gdGhpcy5zdGVwV2lkdGggLyAyIC0gdGhpcy5hcnJvd1NpemU7XHJcbiAgICAgICAgdGhpcy5sZWZ0UG9zaXRpb24gPVxyXG4gICAgICAgICAgICB0aGlzLnRhcmdldFdpZHRoIC8gMiAtIHRoaXMuc3RlcFdpZHRoIC8gMiArIHRoaXMudGFyZ2V0QWJzb2x1dGVMZWZ0O1xyXG4gICAgICAgIHRoaXMuc3RlcEFic29sdXRlTGVmdCA9XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0V2lkdGggLyAyIC0gdGhpcy5zdGVwV2lkdGggLyAyICsgdGhpcy50YXJnZXRBYnNvbHV0ZUxlZnQ7XHJcbiAgICAgICAgdGhpcy5hZGp1c3RMZWZ0UG9zaXRpb24oKTtcclxuICAgICAgICB0aGlzLmFkanVzdFJpZ2h0UG9zaXRpb24oKTtcclxuICAgICAgICB0aGlzLmFycm93UG9zaXRpb24gPSAndG9wJztcclxuICAgICAgICB0aGlzLmF1dG9maXhCb3R0b21Qb3NpdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0U3R5bGVMZWZ0KCkge1xyXG4gICAgICAgIHRoaXMuc3RlcHNDb250YWluZXJTZXJ2aWNlLnVwZGF0ZVBvc2l0aW9uKHRoaXMuc3RlcC5uYW1lLCAnbGVmdCcpO1xyXG4gICAgICAgIHRoaXMudG9wUG9zaXRpb24gPVxyXG4gICAgICAgICAgICB0aGlzLnRhcmdldEFic29sdXRlVG9wICtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXRIZWlnaHQgLyAyIC1cclxuICAgICAgICAgICAgdGhpcy5zdGVwSGVpZ2h0IC8gMjtcclxuICAgICAgICB0aGlzLnN0ZXBBYnNvbHV0ZVRvcCA9XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0QWJzb2x1dGVUb3AgK1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldEhlaWdodCAvIDIgLVxyXG4gICAgICAgICAgICB0aGlzLnN0ZXBIZWlnaHQgLyAyO1xyXG4gICAgICAgIHRoaXMuYXJyb3dUb3BQb3NpdGlvbiA9IHRoaXMuc3RlcEhlaWdodCAvIDIgLSB0aGlzLmFycm93U2l6ZTtcclxuXHJcbiAgICAgICAgdGhpcy5sZWZ0UG9zaXRpb24gPVxyXG4gICAgICAgICAgICB0aGlzLnRhcmdldEFic29sdXRlTGVmdCAtIHRoaXMuc3RlcFdpZHRoIC0gRElTVEFOQ0VfRlJPTV9UQVJHRVQ7XHJcbiAgICAgICAgdGhpcy5zdGVwQWJzb2x1dGVMZWZ0ID1cclxuICAgICAgICAgICAgdGhpcy50YXJnZXRBYnNvbHV0ZUxlZnQgLSB0aGlzLnN0ZXBXaWR0aCAtIERJU1RBTkNFX0ZST01fVEFSR0VUO1xyXG4gICAgICAgIHRoaXMuYXJyb3dMZWZ0UG9zaXRpb24gPSB0aGlzLnN0ZXBXaWR0aDtcclxuICAgICAgICB0aGlzLmFkanVzdFRvcFBvc2l0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5hZGp1c3RCb3R0b21Qb3NpdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYXJyb3dQb3NpdGlvbiA9ICdyaWdodCc7XHJcbiAgICAgICAgdGhpcy5hdXRvZml4TGVmdFBvc2l0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRTdHlsZUNlbnRlcigpIHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKFxyXG4gICAgICAgICAgICB0aGlzLnN0ZXBIb2xkZXIubmF0aXZlRWxlbWVudCxcclxuICAgICAgICAgICAgJ3Bvc2l0aW9uJyxcclxuICAgICAgICAgICAgJ2ZpeGVkJ1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnN0ZXBIb2xkZXIubmF0aXZlRWxlbWVudCwgJ3RvcCcsICc1MCUnKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuc3RlcEhvbGRlci5uYXRpdmVFbGVtZW50LCAnbGVmdCcsICc1MCUnKTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGVwRGltZW5zaW9ucygpO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKFxyXG4gICAgICAgICAgICB0aGlzLnN0ZXBIb2xkZXIubmF0aXZlRWxlbWVudCxcclxuICAgICAgICAgICAgJ3RyYW5zZm9ybScsXHJcbiAgICAgICAgICAgIGB0cmFuc2xhdGUoLSR7dGhpcy5zdGVwV2lkdGggLyAyfXB4LCAtJHt0aGlzLnN0ZXBIZWlnaHQgLyAyfXB4KWBcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuc2hvd0Fycm93ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGp1c3RMZWZ0UG9zaXRpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubGVmdFBvc2l0aW9uIDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLmFycm93TGVmdFBvc2l0aW9uID1cclxuICAgICAgICAgICAgICAgIHRoaXMuYXJyb3dMZWZ0UG9zaXRpb24gK1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWZ0UG9zaXRpb24gLVxyXG4gICAgICAgICAgICAgICAgREVGQVVMVF9ESVNUQU5DRV9GUk9NX01BUkdJTl9MRUZUO1xyXG4gICAgICAgICAgICB0aGlzLmxlZnRQb3NpdGlvbiA9IERFRkFVTFRfRElTVEFOQ0VfRlJPTV9NQVJHSU5fTEVGVDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGp1c3RSaWdodFBvc2l0aW9uKCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50V2luZG93V2lkdGggPSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xyXG4gICAgICAgIGlmICh0aGlzLnN0ZXBBYnNvbHV0ZUxlZnQgKyB0aGlzLnN0ZXBXaWR0aCA+IGN1cnJlbnRXaW5kb3dXaWR0aCkge1xyXG4gICAgICAgICAgICBsZXQgbmV3TGVmdFBvcyA9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnRQb3NpdGlvbiAtXHJcbiAgICAgICAgICAgICAgICAodGhpcy5zdGVwQWJzb2x1dGVMZWZ0ICtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0ZXBXaWR0aCArXHJcbiAgICAgICAgICAgICAgICAgICAgREVGQVVMVF9ESVNUQU5DRV9GUk9NX01BUkdJTl9SSUdIVCAtXHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFdpbmRvd1dpZHRoKTtcclxuICAgICAgICAgICAgbGV0IGRlbHRhTGVmdFBvc2l0aW9uID0gbmV3TGVmdFBvcyAtIHRoaXMubGVmdFBvc2l0aW9uO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5sZWZ0UG9zaXRpb24gPSBuZXdMZWZ0UG9zO1xyXG4gICAgICAgICAgICB0aGlzLmFycm93TGVmdFBvc2l0aW9uID0gdGhpcy5hcnJvd0xlZnRQb3NpdGlvbiAtIGRlbHRhTGVmdFBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkanVzdFRvcFBvc2l0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0ZXBBYnNvbHV0ZVRvcCA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5hcnJvd1RvcFBvc2l0aW9uID1cclxuICAgICAgICAgICAgICAgIHRoaXMuYXJyb3dUb3BQb3NpdGlvbiArXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvcFBvc2l0aW9uIC1cclxuICAgICAgICAgICAgICAgIERFRkFVTFRfRElTVEFOQ0VfRlJPTV9NQVJHSU5fVE9QO1xyXG4gICAgICAgICAgICB0aGlzLnRvcFBvc2l0aW9uID0gREVGQVVMVF9ESVNUQU5DRV9GUk9NX01BUkdJTl9UT1A7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRqdXN0Qm90dG9tUG9zaXRpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RlcEFic29sdXRlVG9wICsgdGhpcy5zdGVwSGVpZ2h0ID4gdGhpcy5kb2N1bWVudEhlaWdodCkge1xyXG4gICAgICAgICAgICBsZXQgbmV3VG9wUG9zID1cclxuICAgICAgICAgICAgICAgIHRoaXMudG9wUG9zaXRpb24gLVxyXG4gICAgICAgICAgICAgICAgKHRoaXMuc3RlcEFic29sdXRlVG9wICtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0ZXBIZWlnaHQgK1xyXG4gICAgICAgICAgICAgICAgICAgIERFRkFVTFRfRElTVEFOQ0VfRlJPTV9NQVJHSU5fQk9UVE9NIC1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvY3VtZW50SGVpZ2h0KTtcclxuICAgICAgICAgICAgbGV0IGRlbHRhVG9wUG9zaXRpb24gPSBuZXdUb3BQb3MgLSB0aGlzLnRvcFBvc2l0aW9uO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50b3BQb3NpdGlvbiA9IG5ld1RvcFBvcztcclxuICAgICAgICAgICAgdGhpcy5hcnJvd1RvcFBvc2l0aW9uID0gdGhpcy5hcnJvd1RvcFBvc2l0aW9uIC0gZGVsdGFUb3BQb3NpdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhdXRvZml4VG9wUG9zaXRpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucG9zaXRpb25BbHJlYWR5Rml4ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dnZXIud2FybihcclxuICAgICAgICAgICAgICAgICdObyBzdGVwIHBvc2l0aW9ucyBmb3VuZCBmb3IgdGhpcyBzdGVwLiBUaGUgc3RlcCB3aWxsIGJlIGNlbnRlcmVkLidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgICB0aGlzLnRhcmdldEFic29sdXRlVG9wIC0gdGhpcy5zdGVwSGVpZ2h0IC0gdGhpcy5hcnJvd1NpemUgPFxyXG4gICAgICAgICAgICAwXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25BbHJlYWR5Rml4ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0eWxlUmlnaHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhdXRvZml4UmlnaHRQb3NpdGlvbigpIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0QWJzb2x1dGVMZWZ0ICtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0V2lkdGggK1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGVwV2lkdGggK1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJvd1NpemUgPlxyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3R5bGVCb3R0b20oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhdXRvZml4Qm90dG9tUG9zaXRpb24oKSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICB0aGlzLnRhcmdldEFic29sdXRlVG9wICtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RlcEhlaWdodCArXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFycm93U2l6ZSArXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldEhlaWdodCA+XHJcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRIZWlnaHRcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdHlsZUxlZnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhdXRvZml4TGVmdFBvc2l0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRhcmdldEFic29sdXRlTGVmdCAtIHRoaXMuc3RlcFdpZHRoIC0gdGhpcy5hcnJvd1NpemUgPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3R5bGVUb3AoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdWJzY3JpYmVUb1Jlc2l6ZUV2ZW50cygpOiBTdWJzY3JpcHRpb24ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50TGlzdGVuZXJTZXJ2aWNlLnJlc2l6ZUV2ZW50LnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVkcmF3U3RlcCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVkcmF3U3RlcCgpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVN0ZXBEaW1lbnNpb25zKCk7XHJcbiAgICAgICAgdGhpcy5kcmF3U3RlcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGltZW5zaW9uc0J5QXNwZWN0UmF0aW8oXHJcbiAgICAgICAgd2lkdGg6IG51bWJlcixcclxuICAgICAgICBoZWlnaHQ6IG51bWJlcixcclxuICAgICAgICBhc3BlY3RSYXRpbzogbnVtYmVyXHJcbiAgICApIHtcclxuICAgICAgICBsZXQgY2FsY0hlaWdodCA9ICh3aWR0aCArIGhlaWdodCkgLyAoMSArIGFzcGVjdFJhdGlvKTtcclxuICAgICAgICBsZXQgY2FsY1dpZHRoID0gY2FsY0hlaWdodCAqIGFzcGVjdFJhdGlvO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBjYWxjV2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogY2FsY0hlaWdodFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGFkanVzdERpbWVuc2lvbnMod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgYXJlYSA9IHdpZHRoICogaGVpZ2h0O1xyXG4gICAgICAgIGxldCBuZXdXaWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIGxldCBuZXdIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgaWYgKHdpZHRoID4gU1RFUF9NQVhfV0lEVEgpIHtcclxuICAgICAgICAgICAgbmV3V2lkdGggPSBTVEVQX01BWF9XSURUSDtcclxuICAgICAgICAgICAgbmV3SGVpZ2h0ID0gYXJlYSAvIG5ld1dpZHRoO1xyXG4gICAgICAgIH0gZWxzZSBpZiAod2lkdGggPCBTVEVQX01JTl9XSURUSCkge1xyXG4gICAgICAgICAgICBuZXdXaWR0aCA9IFNURVBfTUlOX1dJRFRIO1xyXG4gICAgICAgICAgICBuZXdIZWlnaHQgPSBTVEVQX01JTl9XSURUSCAvIEFTUEVDVF9SQVRJTztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkdGg6IG5ld1dpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IG5ld0hlaWdodFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVTdGVwRGltZW5zaW9ucygpIHtcclxuICAgICAgICB0aGlzLnN0ZXBXaWR0aCA9IHRoaXMuc3RlcENvbnRhaW5lci5uYXRpdmVFbGVtZW50LmNsaWVudFdpZHRoO1xyXG4gICAgICAgIHRoaXMuc3RlcEhlaWdodCA9IHRoaXMuc3RlcENvbnRhaW5lci5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWJzY3JpcHRpb24gPT4ge1xyXG4gICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=