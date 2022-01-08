import { Component, Input, ViewEncapsulation } from "@angular/core";
export class JoyrideArrowComponent {
    constructor() {
        this.position = 'top';
    }
}
JoyrideArrowComponent.decorators = [
    { type: Component, args: [{
                selector: 'joyride-arrow',
                template: "<div [class.joyride-arrow__top]=\"position == 'top'\"\r\n     [class.joyride-arrow__bottom]=\"position == 'bottom'\"\r\n     [class.joyride-arrow__left]=\"position == 'left'\"\r\n     [class.joyride-arrow__right]=\"position == 'right'\">\r\n</div>",
                encapsulation: ViewEncapsulation.None,
                styles: [".joyride-arrow__top{border-bottom:11px solid #fff}.joyride-arrow__bottom,.joyride-arrow__top{border-left:11px solid transparent;border-right:11px solid transparent}.joyride-arrow__bottom{border-top:11px solid #fff}.joyride-arrow__right{border-left:11px solid #fff}.joyride-arrow__left,.joyride-arrow__right{border-bottom:11px solid transparent;border-top:11px solid transparent}.joyride-arrow__left{border-right:11px solid #fff}"]
            },] }
];
JoyrideArrowComponent.propDecorators = {
    position: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyb3cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWpveXJpZGUvc3JjL2xpYi9jb21wb25lbnRzL2Fycm93L2Fycm93LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVFwRSxNQUFNLE9BQU8scUJBQXFCO0lBTmxDO1FBUUksYUFBUSxHQUFXLEtBQUssQ0FBQztJQUM3QixDQUFDOzs7WUFUQSxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLG1RQUFxQztnQkFFckMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3hDOzs7dUJBRUksS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnam95cmlkZS1hcnJvdycsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXJyb3cuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vYXJyb3cuY29tcG9uZW50LnNjc3MnXSxcclxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcclxufSlcclxuZXhwb3J0IGNsYXNzIEpveXJpZGVBcnJvd0NvbXBvbmVudCB7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgcG9zaXRpb246IHN0cmluZyA9ICd0b3AnO1xyXG59Il19