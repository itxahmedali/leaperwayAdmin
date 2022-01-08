import { __decorate } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, } from '@angular/core';
import { Emoji, EmojiService } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { EmojiFrequentlyService } from './emoji-frequently.service';
var CategoryComponent = /** @class */ (function () {
    function CategoryComponent(ref, emojiService, frequently) {
        this.ref = ref;
        this.emojiService = emojiService;
        this.frequently = frequently;
        this.hasStickyPosition = true;
        this.name = '';
        this.perLine = 9;
        this.totalFrequentLines = 4;
        this.recent = [];
        this.custom = [];
        this.hideObsolete = true;
        this.emojiOver = new EventEmitter();
        this.emojiLeave = new EventEmitter();
        this.emojiClick = new EventEmitter();
        this.containerStyles = {};
        this.labelStyles = {};
        this.labelSpanStyles = {};
        this.margin = 0;
        this.minMargin = 0;
        this.maxMargin = 0;
        this.top = 0;
    }
    CategoryComponent.prototype.ngOnInit = function () {
        this.emojis = this.getEmojis();
        if (!this.emojis) {
            this.containerStyles = { display: 'none' };
        }
        if (!this.hasStickyPosition) {
            this.labelStyles = { height: 28 };
            // this.labelSpanStyles = { position: 'absolute' };
        }
    };
    CategoryComponent.prototype.memoizeSize = function () {
        var parent = this.container.nativeElement.parentNode.parentNode;
        var _a = this.container.nativeElement.getBoundingClientRect(), top = _a.top, height = _a.height;
        var parentTop = parent.getBoundingClientRect().top;
        var labelHeight = this.label.nativeElement.getBoundingClientRect().height;
        this.top = top - parentTop + parent.scrollTop;
        if (height === 0) {
            this.maxMargin = 0;
        }
        else {
            this.maxMargin = height - labelHeight;
        }
    };
    CategoryComponent.prototype.handleScroll = function (scrollTop) {
        var margin = scrollTop - this.top;
        margin = margin < this.minMargin ? this.minMargin : margin;
        margin = margin > this.maxMargin ? this.maxMargin : margin;
        if (margin === this.margin) {
            return false;
        }
        if (!this.hasStickyPosition) {
            this.label.nativeElement.style.top = margin + "px";
        }
        this.margin = margin;
        return true;
    };
    CategoryComponent.prototype.getEmojis = function () {
        var _this = this;
        if (this.name === 'Recent') {
            var frequentlyUsed = this.recent || this.frequently.get(this.perLine, this.totalFrequentLines);
            if (!frequentlyUsed || !frequentlyUsed.length) {
                frequentlyUsed = this.frequently.get(this.perLine, this.totalFrequentLines);
            }
            if (frequentlyUsed.length) {
                this.emojis = frequentlyUsed
                    .map(function (id) {
                    var emoji = _this.custom.filter(function (e) { return e.id === id; })[0];
                    if (emoji) {
                        return emoji;
                    }
                    return id;
                })
                    .filter(function (id) { return !!_this.emojiService.getData(id); });
            }
            if ((!this.emojis || this.emojis.length === 0) && frequentlyUsed.length > 0) {
                return null;
            }
        }
        if (this.emojis) {
            this.emojis = this.emojis.slice(0);
        }
        return this.emojis;
    };
    CategoryComponent.prototype.updateDisplay = function (display) {
        this.containerStyles.display = display;
        this.getEmojis();
        this.ref.detectChanges();
    };
    CategoryComponent.prototype.trackById = function (index, item) {
        return item;
    };
    CategoryComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: EmojiService },
        { type: EmojiFrequentlyService }
    ]; };
    __decorate([
        Input()
    ], CategoryComponent.prototype, "emojis", void 0);
    __decorate([
        Input()
    ], CategoryComponent.prototype, "hasStickyPosition", void 0);
    __decorate([
        Input()
    ], CategoryComponent.prototype, "name", void 0);
    __decorate([
        Input()
    ], CategoryComponent.prototype, "perLine", void 0);
    __decorate([
        Input()
    ], CategoryComponent.prototype, "totalFrequentLines", void 0);
    __decorate([
        Input()
    ], CategoryComponent.prototype, "recent", void 0);
    __decorate([
        Input()
    ], CategoryComponent.prototype, "custom", void 0);
    __decorate([
        Input()
    ], CategoryComponent.prototype, "i18n", void 0);
    __decorate([
        Input()
    ], CategoryComponent.prototype, "id", void 0);
    __decorate([
        Input()
    ], CategoryComponent.prototype, "hideObsolete", void 0);
    __decorate([
        Input()
    ], CategoryComponent.prototype, "notFoundEmoji", void 0);
    __decorate([
        Input()
    ], CategoryComponent.prototype, "emojiIsNative", void 0);
    __decorate([
        Input()
    ], CategoryComponent.prototype, "emojiSkin", void 0);
    __decorate([
        Input()
    ], CategoryComponent.prototype, "emojiSize", void 0);
    __decorate([
        Input()
    ], CategoryComponent.prototype, "emojiSet", void 0);
    __decorate([
        Input()
    ], CategoryComponent.prototype, "emojiSheetSize", void 0);
    __decorate([
        Input()
    ], CategoryComponent.prototype, "emojiForceSize", void 0);
    __decorate([
        Input()
    ], CategoryComponent.prototype, "emojiTooltip", void 0);
    __decorate([
        Input()
    ], CategoryComponent.prototype, "emojiBackgroundImageFn", void 0);
    __decorate([
        Input()
    ], CategoryComponent.prototype, "emojiUseButton", void 0);
    __decorate([
        Output()
    ], CategoryComponent.prototype, "emojiOver", void 0);
    __decorate([
        Output()
    ], CategoryComponent.prototype, "emojiLeave", void 0);
    __decorate([
        Output()
    ], CategoryComponent.prototype, "emojiClick", void 0);
    __decorate([
        ViewChild('container', { static: true })
    ], CategoryComponent.prototype, "container", void 0);
    __decorate([
        ViewChild('label', { static: true })
    ], CategoryComponent.prototype, "label", void 0);
    CategoryComponent = __decorate([
        Component({
            selector: 'emoji-category',
            template: "\n  <section #container class=\"emoji-mart-category\"\n    [attr.aria-label]=\"i18n.categories[id]\"\n    [class.emoji-mart-no-results]=\"emojis && !emojis.length\"\n    [ngStyle]=\"containerStyles\">\n    <div class=\"emoji-mart-category-label\"\n      [ngStyle]=\"labelStyles\"\n      [attr.data-name]=\"name\">\n      <!-- already labeled by the section aria-label -->\n      <span #label [ngStyle]=\"labelSpanStyles\" aria-hidden=\"true\">\n        {{ i18n.categories[id] }}\n      </span>\n    </div>\n\n    <ng-template [ngIf]=\"emojis\">\n      <ngx-emoji\n        *ngFor=\"let emoji of emojis; trackBy: trackById\"\n        [emoji]=\"emoji\"\n        [size]=\"emojiSize\"\n        [skin]=\"emojiSkin\"\n        [isNative]=\"emojiIsNative\"\n        [set]=\"emojiSet\"\n        [sheetSize]=\"emojiSheetSize\"\n        [forceSize]=\"emojiForceSize\"\n        [tooltip]=\"emojiTooltip\"\n        [backgroundImageFn]=\"emojiBackgroundImageFn\"\n        [hideObsolete]=\"hideObsolete\"\n        (emojiOver)=\"emojiOver.emit($event)\"\n        (emojiLeave)=\"emojiLeave.emit($event)\"\n        (emojiClick)=\"emojiClick.emit($event)\"\n      ></ngx-emoji>\n    </ng-template>\n\n    <div *ngIf=\"emojis && !emojis.length\">\n      <div>\n        <ngx-emoji\n          [emoji]=\"notFoundEmoji\"\n          size=\"38\"\n          [skin]=\"emojiSkin\"\n          [isNative]=\"emojiIsNative\"\n          [set]=\"emojiSet\"\n          [sheetSize]=\"emojiSheetSize\"\n          [forceSize]=\"emojiForceSize\"\n          [tooltip]=\"emojiTooltip\"\n          [backgroundImageFn]=\"emojiBackgroundImageFn\"\n          [useButton]=\"emojiUseButton\"\n        ></ngx-emoji>\n      </div>\n\n      <div class=\"emoji-mart-no-results-label\">\n        {{ i18n.notfound }}\n      </div>\n    </div>\n\n  </section>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            preserveWhitespaces: false
        })
    ], CategoryComponent);
    return CategoryComponent;
}());
export { CategoryComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGN0cmwvbmd4LWVtb2ppLW1hcnQvIiwic291cmNlcyI6WyJjYXRlZ29yeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBQ04sTUFBTSxFQUNOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBK0RwRTtJQWtDRSwyQkFDUyxHQUFzQixFQUNyQixZQUEwQixFQUMxQixVQUFrQztRQUZuQyxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUNyQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixlQUFVLEdBQVYsVUFBVSxDQUF3QjtRQW5DbkMsc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLFNBQUksR0FBRyxFQUFFLENBQUM7UUFDVixZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osdUJBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLFdBQU0sR0FBYSxFQUFFLENBQUM7UUFDdEIsV0FBTSxHQUFVLEVBQUUsQ0FBQztRQUduQixpQkFBWSxHQUFHLElBQUksQ0FBQztRQVduQixjQUFTLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbkQsZUFBVSxHQUF3QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3JELGVBQVUsR0FBd0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUcvRCxvQkFBZSxHQUFRLEVBQUUsQ0FBQztRQUMxQixnQkFBVyxHQUFRLEVBQUUsQ0FBQztRQUN0QixvQkFBZSxHQUFRLEVBQUUsQ0FBQztRQUMxQixXQUFNLEdBQUcsQ0FBQyxD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Q1csaUJBQWlCLENBNEg3QjtJQUFELHdCQUFDO0NBQUEsQUE1SEQsSUE0SEM7U0E1SFksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBFbW9qaSwgRW1vamlTZXJ2aWNlIH0gZnJvbSAnQGN0cmwvbmd4LWVtb2ppLW1hcnQvbmd4LWVtb2ppJztcbmltcG9ydCB7IEVtb2ppRnJlcXVlbnRseVNlcnZpY2UgfSBmcm9tICcuL2Vtb2ppLWZyZXF1ZW50bHkuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Vtb2ppLWNhdGVnb3J5JyxcbiAgdGVtcGxhdGU6IGBcbiAgPHNlY3Rpb24gI2NvbnRhaW5lciBjbGFzcz1cImVtb2ppLW1hcnQtY2F0ZWdvcnlcIlxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiaTE4bi5jYXRlZ29yaWVzW2lkXVwiXG4gICAgW2NsYXNzLmVtb2ppLW1hcnQtbm8tcmVzdWx0c109XCJlbW9qaXMgJiYgIWVtb2ppcy5sZW5ndGhcIlxuICAgIFtuZ1N0eWxlXT1cImNvbnRhaW5lclN0eWxlc1wiPlxuICAgIDxkaXYgY2xhc3M9XCJlbW9qaS1tYXJ0LWNhdGVnb3J5LWxhYmVsXCJcbiAgICAgIFtuZ1N0eWxlXT1cImxhYmVsU3R5bGVzXCJcbiAgICAgIFthdHRyLmRhdGEtbmFtZV09XCJuYW1lXCI+XG4gICAgICA8IS0tIGFscmVhZHkgbGFiZWxlZCBieSB0aGUgc2VjdGlvbiBhcmlhLWxhYmVsIC0tPlxuICAgICAgPHNwYW4gI2xhYmVsIFtuZ1N0eWxlXT1cImxhYmVsU3BhblN0eWxlc1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICB7eyBpMThuLmNhdGVnb3JpZXNbaWRdIH19XG4gICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG5cbiAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiZW1vamlzXCI+XG4gICAgICA8bmd4LWVtb2ppXG4gICAgICAgICpuZ0Zvcj1cImxldCBlbW9qaSBvZiBlbW9qaXM7IHRyYWNrQnk6IHRyYWNrQnlJZFwiXG4gICAgICAgIFtlbW9qaV09XCJlbW9qaVwiXG4gICAgICAgIFtzaXplXT1cImVtb2ppU2l6ZVwiXG4gICAgICAgIFtza2luXT1cImVtb2ppU2tpblwiXG4gICAgICAgIFtpc05hdGl2ZV09XCJlbW9qaUlzTmF0aXZlXCJcbiAgICAgICAgW3NldF09XCJlbW9qaVNldFwiXG4gICAgICAgIFtzaGVldFNpemVdPVwiZW1vamlTaGVldFNpemVcIlxuICAgICAgICBbZm9yY2VTaXplXT1cImVtb2ppRm9yY2VTaXplXCJcbiAgICAgICAgW3Rvb2x0aXBdPVwiZW1vamlUb29sdGlwXCJcbiAgICAgICAgW2JhY2tncm91bmRJbWFnZUZuXT1cImVtb2ppQmFja2dyb3VuZEltYWdlRm5cIlxuICAgICAgICBbaGlkZU9ic29sZXRlXT1cImhpZGVPYnNvbGV0ZVwiXG4gICAgICAgIChlbW9qaU92ZXIpPVwiZW1vamlPdmVyLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgIChlbW9qaUxlYXZlKT1cImVtb2ppTGVhdmUuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgKGVtb2ppQ2xpY2spPVwiZW1vamlDbGljay5lbWl0KCRldmVudClcIlxuICAgICAgPjwvbmd4LWVtb2ppPlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8ZGl2ICpuZ0lmPVwiZW1vamlzICYmICFlbW9qaXMubGVuZ3RoXCI+XG4gICAgICA8ZGl2PlxuICAgICAgICA8bmd4LWVtb2ppXG4gICAgICAgICAgW2Vtb2ppXT1cIm5vdEZvdW5kRW1vamlcIlxuICAgICAgICAgIHNpemU9XCIzOFwiXG4gICAgICAgICAgW3NraW5dPVwiZW1vamlTa2luXCJcbiAgICAgICAgICBbaXNOYXRpdmVdPVwiZW1vamlJc05hdGl2ZVwiXG4gICAgICAgICAgW3NldF09XCJlbW9qaVNldFwiXG4gICAgICAgICAgW3NoZWV0U2l6ZV09XCJlbW9qaVNoZWV0U2l6ZVwiXG4gICAgICAgICAgW2ZvcmNlU2l6ZV09XCJlbW9qaUZvcmNlU2l6ZVwiXG4gICAgICAgICAgW3Rvb2x0aXBdPVwiZW1vamlUb29sdGlwXCJcbiAgICAgICAgICBbYmFja2dyb3VuZEltYWdlRm5dPVwiZW1vamlCYWNrZ3JvdW5kSW1hZ2VGblwiXG4gICAgICAgICAgW3VzZUJ1dHRvbl09XCJlbW9qaVVzZUJ1dHRvblwiXG4gICAgICAgID48L25neC1lbW9qaT5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiZW1vamktbWFydC1uby1yZXN1bHRzLWxhYmVsXCI+XG4gICAgICAgIHt7IGkxOG4ubm90Zm91bmQgfX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gIDwvc2VjdGlvbj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxufSlcbmV4cG9ydCBjbGFzcyBDYXRlZ29yeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGVtb2ppcz86IGFueVtdIHwgbnVsbDtcbiAgQElucHV0KCkgaGFzU3RpY2t5UG9zaXRpb24gPSB0cnVlO1xuICBASW5wdXQoKSBuYW1lID0gJyc7XG4gIEBJbnB1dCgpIHBlckxpbmUgPSA5O1xuICBASW5wdXQoKSB0b3RhbEZyZXF1ZW50TGluZXMgPSA0O1xuICBASW5wdXQoKSByZWNlbnQ6IHN0cmluZ1tdID0gW107XG4gIEBJbnB1dCgpIGN1c3RvbTogYW55W10gPSBbXTtcbiAgQElucHV0KCkgaTE4bjogYW55O1xuICBASW5wdXQoKSBpZDogYW55O1xuICBASW5wdXQoKSBoaWRlT2Jzb2xldGUgPSB0cnVlO1xuICBASW5wdXQoKSBub3RGb3VuZEVtb2ppPzogc3RyaW5nO1xuICBASW5wdXQoKSBlbW9qaUlzTmF0aXZlPzogRW1vamlbJ2lzTmF0aXZlJ107XG4gIEBJbnB1dCgpIGVtb2ppU2tpbj86IEVtb2ppWydza2luJ107XG4gIEBJbnB1dCgpIGVtb2ppU2l6ZT86IEVtb2ppWydzaXplJ107XG4gIEBJbnB1dCgpIGVtb2ppU2V0PzogRW1vamlbJ3NldCddO1xuICBASW5wdXQoKSBlbW9qaVNoZWV0U2l6ZT86IEVtb2ppWydzaGVldFNpemUnXTtcbiAgQElucHV0KCkgZW1vamlGb3JjZVNpemU/OiBFbW9qaVsnZm9yY2VTaXplJ107XG4gIEBJbnB1dCgpIGVtb2ppVG9vbHRpcD86IEVtb2ppWyd0b29sdGlwJ107XG4gIEBJbnB1dCgpIGVtb2ppQmFja2dyb3VuZEltYWdlRm4/OiBFbW9qaVsnYmFja2dyb3VuZEltYWdlRm4nXTtcbiAgQElucHV0KCkgZW1vamlVc2VCdXR0b246IGJvb2xlYW47XG4gIEBPdXRwdXQoKSBlbW9qaU92ZXI6IEVtb2ppWydlbW9qaU92ZXInXSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGVtb2ppTGVhdmU6IEVtb2ppWydlbW9qaUxlYXZlJ10gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBlbW9qaUNsaWNrOiBFbW9qaVsnZW1vamlDbGljayddID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAVmlld0NoaWxkKCdjb250YWluZXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBjb250YWluZXIhOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdsYWJlbCcsIHsgc3RhdGljOiB0cnVlIH0pIGxhYmVsITogRWxlbWVudFJlZjtcbiAgY29udGFpbmVyU3R5bGVzOiBhbnkgPSB7fTtcbiAgbGFiZWxTdHlsZXM6IGFueSA9IHt9O1xuICBsYWJlbFNwYW5TdHlsZXM6IGFueSA9IHt9O1xuICBtYXJnaW4gPSAwO1xuICBtaW5NYXJnaW4gPSAwO1xuICBtYXhNYXJnaW4gPSAwO1xuICB0b3AgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyByZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgZW1vamlTZXJ2aWNlOiBFbW9qaVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBmcmVxdWVudGx5OiBFbW9qaUZyZXF1ZW50bHlTZXJ2aWNlLFxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5lbW9qaXMgPSB0aGlzLmdldEVtb2ppcygpO1xuXG4gICAgaWYgKCF0aGlzLmVtb2ppcykge1xuICAgICAgdGhpcy5jb250YWluZXJTdHlsZXMgPSB7IGRpc3BsYXk6ICdub25lJyB9O1xuICAgIH1cblxuICAgIGlmICghdGhpcy5oYXNTdGlja3lQb3NpdGlvbikge1xuICAgICAgdGhpcy5sYWJlbFN0eWxlcyA9IHsgaGVpZ2h0OiAyOCB9O1xuICAgICAgLy8gdGhpcy5sYWJlbFNwYW5TdHlsZXMgPSB7IHBvc2l0aW9uOiAnYWJzb2x1dGUnIH07XG4gICAgfVxuICB9XG4gIG1lbW9pemVTaXplKCkge1xuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuY29udGFpbmVyLm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgIGNvbnN0IHtcbiAgICAgIHRvcCxcbiAgICAgIGhlaWdodCxcbiAgICB9ID0gdGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBwYXJlbnRUb3AgPSBwYXJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgIGNvbnN0IGxhYmVsSGVpZ2h0ID0gdGhpcy5sYWJlbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcblxuICAgIHRoaXMudG9wID0gdG9wIC0gcGFyZW50VG9wICsgcGFyZW50LnNjcm9sbFRvcDtcblxuICAgIGlmIChoZWlnaHQgPT09IDApIHtcbiAgICAgIHRoaXMubWF4TWFyZ2luID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tYXhNYXJnaW4gPSBoZWlnaHQgLSBsYWJlbEhlaWdodDtcbiAgICB9XG4gIH1cbiAgaGFuZGxlU2Nyb2xsKHNjcm9sbFRvcDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgbGV0IG1hcmdpbiA9IHNjcm9sbFRvcCAtIHRoaXMudG9wO1xuICAgIG1hcmdpbiA9IG1hcmdpbiA8IHRoaXMubWluTWFyZ2luID8gdGhpcy5taW5NYXJnaW4gOiBtYXJnaW47XG4gICAgbWFyZ2luID0gbWFyZ2luID4gdGhpcy5tYXhNYXJnaW4gPyB0aGlzLm1heE1hcmdpbiA6IG1hcmdpbjtcblxuICAgIGlmIChtYXJnaW4gPT09IHRoaXMubWFyZ2luKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmhhc1N0aWNreVBvc2l0aW9uKSB7XG4gICAgICB0aGlzLmxhYmVsLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gYCR7bWFyZ2lufXB4YDtcbiAgICB9XG5cbiAgICB0aGlzLm1hcmdpbiA9IG1hcmdpbjtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldEVtb2ppcygpIHtcbiAgICBpZiAodGhpcy5uYW1lID09PSAnUmVjZW50Jykge1xuICAgICAgbGV0IGZyZXF1ZW50bHlVc2VkID0gdGhpcy5yZWNlbnQgfHwgdGhpcy5mcmVxdWVudGx5LmdldCh0aGlzLnBlckxpbmUsIHRoaXMudG90YWxGcmVxdWVudExpbmVzKTtcbiAgICAgIGlmICghZnJlcXVlbnRseVVzZWQgfHwgIWZyZXF1ZW50bHlVc2VkLmxlbmd0aCkge1xuICAgICAgICBmcmVxdWVudGx5VXNlZCA9IHRoaXMuZnJlcXVlbnRseS5nZXQodGhpcy5wZXJMaW5lLCB0aGlzLnRvdGFsRnJlcXVlbnRMaW5lcyk7XG4gICAgICB9XG4gICAgICBpZiAoZnJlcXVlbnRseVVzZWQubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuZW1vamlzID0gZnJlcXVlbnRseVVzZWRcbiAgICAgICAgICAubWFwKGlkID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVtb2ppID0gdGhpcy5jdXN0b20uZmlsdGVyKChlOiBhbnkpID0+IGUuaWQgPT09IGlkKVswXTtcbiAgICAgICAgICAgIGlmIChlbW9qaSkge1xuICAgICAgICAgICAgICByZXR1cm4gZW1vamk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5maWx0ZXIoaWQgPT4gISF0aGlzLmVtb2ppU2VydmljZS5nZXREYXRhKGlkKSk7XG4gICAgICB9XG5cbiAgICAgIGlmICgoIXRoaXMuZW1vamlzIHx8IHRoaXMuZW1vamlzLmxlbmd0aCA9PT0gMCkgJiYgZnJlcXVlbnRseVVzZWQubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5lbW9qaXMpIHtcbiAgICAgIHRoaXMuZW1vamlzID0gdGhpcy5lbW9qaXMuc2xpY2UoMCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZW1vamlzO1xuICB9XG4gIHVwZGF0ZURpc3BsYXkoZGlzcGxheTogJ25vbmUnIHwgJ2Jsb2NrJykge1xuICAgIHRoaXMuY29udGFpbmVyU3R5bGVzLmRpc3BsYXkgPSBkaXNwbGF5O1xuICAgIHRoaXMuZ2V0RW1vamlzKCk7XG4gICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG4gIHRyYWNrQnlJZChpbmRleDogbnVtYmVyLCBpdGVtOiBhbnkpIHtcbiAgICByZXR1cm4gaXRlbTtcbiAgfVxufVxuIl19