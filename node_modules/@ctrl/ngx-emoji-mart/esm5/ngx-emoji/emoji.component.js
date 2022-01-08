import { __assign, __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DEFAULT_BACKGROUNDFN, EmojiService } from './emoji.service';
var EmojiComponent = /** @class */ (function () {
    function EmojiComponent(emojiService) {
        this.emojiService = emojiService;
        this.skin = 1;
        this.set = 'apple';
        this.sheetSize = 64;
        /** Renders the native unicode emoji */
        this.isNative = false;
        this.forceSize = false;
        this.tooltip = false;
        this.size = 24;
        this.emoji = '';
        this.hideObsolete = false;
        this.SHEET_COLUMNS = 57;
        this.emojiOver = new EventEmitter();
        this.emojiLeave = new EventEmitter();
        this.emojiClick = new EventEmitter();
        this.title = '';
        this.label = '';
        this.custom = false;
        this.isVisible = true;
        // TODO: replace 4.0.3 w/ dynamic get verison from emoji-datasource in package.json
        this.backgroundImageFn = DEFAULT_BACKGROUNDFN;
    }
    EmojiComponent.prototype.ngOnChanges = function () {
        if (!this.emoji) {
            return (this.isVisible = false);
        }
        var data = this.getData();
        if (!data) {
            return (this.isVisible = false);
        }
        // const children = this.children;
        this.unified = data.native || null;
        if (data.custom) {
            this.custom = data.custom;
        }
        if (!data.unified && !data.custom) {
            return (this.isVisible = false);
        }
        if (this.tooltip) {
            this.title = data.shortNames[0];
        }
        if (data.obsoletedBy && this.hideObsolete) {
            return (this.isVisible = false);
        }
        this.label = [data.native]
            .concat(data.shortNames)
            .filter(Boolean)
            .join(', ');
        if (this.isNative && data.unified && data.native) {
            // hide older emoji before the split into gendered emoji
            this.style = { fontSize: this.size + "px" };
            if (this.forceSize) {
                this.style.display = 'inline-block';
                this.style.width = this.size + "px";
                this.style.height = this.size + "px";
                this.style['word-break'] = 'keep-all';
            }
        }
        else if (data.custom) {
            this.style = {
                width: this.size + "px",
                height: this.size + "px",
                display: 'inline-block'
            };
            if (data.spriteUrl && this.sheetRows && this.sheetColumns) {
                this.style = __assign(__assign({}, this.style), { backgroundImage: "url(" + data.spriteUrl + ")", backgroundSize: 100 * this.sheetColumns + "% " + 100 * this.sheetRows + "%", backgroundPosition: this.emojiService.getSpritePosition(data.sheet, this.sheetColumns) });
            }
            else {
                this.style = __assign(__assign({}, this.style), { backgroundImage: "url(" + data.imageUrl + ")", backgroundSize: 'contain' });
            }
        }
        else {
            if (data.hidden.length && data.hidden.includes(this.set)) {
                if (this.fallback) {
                    this.style = { fontSize: this.size + "px" };
                    this.unified = this.fallback(data, this);
                }
                else {
                    return (this.isVisible = false);
                }
            }
            else {
                this.style = this.emojiService.emojiSpriteStyles(data.sheet, this.set, this.size, this.sheetSize, this.sheetRows, this.backgroundImageFn, this.SHEET_COLUMNS);
            }
        }
        return (this.isVisible = true);
    };
    EmojiComponent.prototype.getData = function () {
        return this.emojiService.getData(this.emoji, this.skin, this.set);
    };
    EmojiComponent.prototype.getSanitizedData = function () {
        return this.emojiService.getSanitizedData(this.emoji, this.skin, this.set);
    };
    EmojiComponent.prototype.handleClick = function ($event) {
        var emoji = this.getSanitizedData();
        this.emojiClick.emit({ emoji: emoji, $event: $event });
    };
    EmojiComponent.prototype.handleOver = function ($event) {
        var emoji = this.getSanitizedData();
        this.emojiOver.emit({ emoji: emoji, $event: $event });
    };
    EmojiComponent.prototype.handleLeave = function ($event) {
        var emoji = this.getSanitizedData();
        this.emojiLeave.emit({ emoji: emoji, $event: $event });
    };
    EmojiComponent.ctorParameters = function () { return [
        { type: EmojiService }
    ]; };
    __decorate([
        Input()
    ], EmojiComponent.prototype, "skin", void 0);
    __decorate([
        Input()
    ], EmojiComponent.prototype, "set", void 0);
    __decorate([
        Input()
    ], EmojiComponent.prototype, "sheetSize", void 0);
    __decorate([
        Input()
    ], EmojiComponent.prototype, "isNative", void 0);
    __decorate([
        Input()
    ], EmojiComponent.prototype, "forceSize", void 0);
    __decorate([
        Input()
    ], EmojiComponent.prototype, "tooltip", void 0);
    __decorate([
        Input()
    ], EmojiComponent.prototype, "size", void 0);
    __decorate([
        Input()
    ], EmojiComponent.prototype, "emoji", void 0);
    __decorate([
        Input()
    ], EmojiComponent.prototype, "fallback", void 0);
    __decorate([
        Input()
    ], EmojiComponent.prototype, "hideObsolete", void 0);
    __decorate([
        Input()
    ], EmojiComponent.prototype, "SHEET_COLUMNS", void 0);
    __decorate([
        Input()
    ], EmojiComponent.prototype, "sheetRows", void 0);
    __decorate([
        Input()
    ], EmojiComponent.prototype, "sheetColumns", void 0);
    __decorate([
        Input()
    ], EmojiComponent.prototype, "useButton", void 0);
    __decorate([
        Output()
    ], EmojiComponent.prototype, "emojiOver", void 0);
    __decorate([
        Output()
    ], EmojiComponent.prototype, "emojiLeave", void 0);
    __decorate([
        Output()
    ], EmojiComponent.prototype, "emojiClick", void 0);
    __decorate([
        Input()
    ], EmojiComponent.prototype, "backgroundImageFn", void 0);
    EmojiComponent = __decorate([
        Component({
            selector: 'ngx-emoji',
            template: "\n    <button\n      *ngIf=\"useButton && isVisible\"\n      type=\"button\"\n      (click)=\"handleClick($event)\"\n      (mouseenter)=\"handleOver($event)\"\n      (mouseleave)=\"handleLeave($event)\"\n      [title]=\"title\"\n      [attr.aria-label]=\"label\"\n      class=\"emoji-mart-emoji\"\n      [class.emoji-mart-emoji-native]=\"isNative\"\n      [class.emoji-mart-emoji-custom]=\"custom\"\n    >\n      <span [ngStyle]=\"style\">\n        <ng-template [ngIf]=\"isNative\">{{ unified }}</ng-template>\n        <ng-content></ng-content>\n      </span>\n    </button>\n\n    <span\n      *ngIf=\"!useButton && isVisible\"\n      (click)=\"handleClick($event)\"\n      (mouseenter)=\"handleOver($event)\"\n      (mouseleave)=\"handleLeave($event)\"\n      [title]=\"title\"\n      [attr.aria-label]=\"label\"\n      class=\"emoji-mart-emoji\"\n      [class.emoji-mart-emoji-native]=\"isNative\"\n      [class.emoji-mart-emoji-custom]=\"custom\"\n    >\n      <span [ngStyle]=\"style\">\n        <ng-template [ngIf]=\"isNative\">{{ unified }}</ng-template>\n        <ng-content></ng-content>\n      </span>\n    </span>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            preserveWhitespaces: false
        })
    ], EmojiComponent);
    return EmojiComponent;
}());
export { EmojiComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1vamkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGN0cmwvbmd4LWVtb2ppLW1hcnQvbmd4LWVtb2ppLyIsInNvdXJjZXMiOlsiZW1vamkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFrRXJFO0lBNEJFLHdCQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQTNCckMsU0FBSSxHQUFrQixDQUFDLENBQUM7UUFDeEIsUUFBRyxHQUFpQixPQUFPLENBQUM7UUFDNUIsY0FBUyxHQUF1QixFQUFFLENBQUM7UUFDNUMsdUNBQXVDO1FBQzlCLGFBQVEsR0FBc0IsS0FBSyxDQUFDO1FBQ3BDLGNBQVMsR0FBdUIsS0FBSyxDQUFDO1FBQ3RDLFlBQU8sR0FBcUIsS0FBSyxDQUFDO1FBQ2xDLFNBQUksR0FBa0IsRUFBRSxDQUFDO1FBQ3pCLFVBQUssR0FBbUIsRUFBRSxDQUFDO1FBRTNCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBSWxCLGNBQVMsR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNuRCxlQUFVLEdBQXdCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDckQsZUFBVSxHQUF3QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRS9ELFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBRVgsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsbUZBQW1GO1FBQzFFLHNCQUFpQixHQUErQixvQkFBb0IsQ0FBQztJQUU3QixDQUFDO0lBRWxELG9D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QUssRUFBRTt5REFBb0I7SUFDbkI7UUFBUixLQUFLLEVBQUU7cURBQW9CO0lBQ25CO1FBQVIsS0FBSyxFQUFFO3dEQUF1QjtJQUN0QjtRQUFSLEtBQUssRUFBRTtxREFBcUI7SUFDbkI7UUFBVCxNQUFNLEVBQUU7cURBQW9EO0lBQ25EO1FBQVQsTUFBTSxFQUFFO3NEQUFzRDtJQUNyRDtRQUFULE1BQU0sRUFBRTtzREFBc0Q7SUFRdEQ7UUFBUixLQUFLLEVBQUU7NkRBQXNFO0lBMUJuRSxjQUFjO1FBekMxQixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsV0FBVztZQUNyQixRQUFRLEVBQUUsMG1DQW1DVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1lBQy9DLG1CQUFtQixFQUFFLEtBQUs7U0FDM0IsQ0FBQztPQUNXLGNBQWMsQ0E0STFCO0lBQUQscUJBQUM7Q0FBQSxBQTVJRCxJQTRJQztTQTVJWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEVtb2ppRGF0YSB9IGZyb20gJy4vZGF0YS9kYXRhLmludGVyZmFjZXMnO1xuaW1wb3J0IHsgREVGQVVMVF9CQUNLR1JPVU5ERk4sIEVtb2ppU2VydmljZSB9IGZyb20gJy4vZW1vamkuc2VydmljZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW1vamkge1xuICAvKiogUmVuZGVycyB0aGUgbmF0aXZlIHVuaWNvZGUgZW1vamkgKi9cbiAgaXNOYXRpdmU6IGJvb2xlYW47XG4gIGZvcmNlU2l6ZTogYm9vbGVhbjtcbiAgdG9vbHRpcDogYm9vbGVhbjtcbiAgc2tpbjogMSB8IDIgfCAzIHwgNCB8IDUgfCA2O1xuICBzaGVldFNpemU6IDE2IHwgMjAgfCAzMiB8IDY0O1xuICBzaGVldFJvd3M/OiBudW1iZXI7XG4gIHNldDogJ2FwcGxlJyB8ICdnb29nbGUnIHwgJ3R3aXR0ZXInIHwgJ2ZhY2Vib29rJyB8ICcnO1xuICBzaXplOiBudW1iZXI7XG4gIGVtb2ppOiBzdHJpbmcgfCBFbW9qaURhdGE7XG4gIGJhY2tncm91bmRJbWFnZUZuOiAoc2V0OiBzdHJpbmcsIHNoZWV0U2l6ZTogbnVtYmVyKSA9PiBzdHJpbmc7XG4gIGZhbGxiYWNrPzogKGRhdGE6IGFueSwgcHJvcHM6IGFueSkgPT4gc3RyaW5nO1xuICBlbW9qaU92ZXI6IEV2ZW50RW1pdHRlcjxFbW9qaUV2ZW50PjtcbiAgZW1vamlMZWF2ZTogRXZlbnRFbWl0dGVyPEVtb2ppRXZlbnQ+O1xuICBlbW9qaUNsaWNrOiBFdmVudEVtaXR0ZXI8RW1vamlFdmVudD47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW1vamlFdmVudCB7XG4gIGVtb2ppOiBFbW9qaURhdGE7XG4gICRldmVudDogRXZlbnQ7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1lbW9qaScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGJ1dHRvblxuICAgICAgKm5nSWY9XCJ1c2VCdXR0b24gJiYgaXNWaXNpYmxlXCJcbiAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudClcIlxuICAgICAgKG1vdXNlZW50ZXIpPVwiaGFuZGxlT3ZlcigkZXZlbnQpXCJcbiAgICAgIChtb3VzZWxlYXZlKT1cImhhbmRsZUxlYXZlKCRldmVudClcIlxuICAgICAgW3RpdGxlXT1cInRpdGxlXCJcbiAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwibGFiZWxcIlxuICAgICAgY2xhc3M9XCJlbW9qaS1tYXJ0LWVtb2ppXCJcbiAgICAgIFtjbGFzcy5lbW9qaS1tYXJ0LWVtb2ppLW5hdGl2ZV09XCJpc05hdGl2ZVwiXG4gICAgICBbY2xhc3MuZW1vamktbWFydC1lbW9qaS1jdXN0b21dPVwiY3VzdG9tXCJcbiAgICA+XG4gICAgICA8c3BhbiBbbmdTdHlsZV09XCJzdHlsZVwiPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiaXNOYXRpdmVcIj57eyB1bmlmaWVkIH19PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgPC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuXG4gICAgPHNwYW5cbiAgICAgICpuZ0lmPVwiIXVzZUJ1dHRvbiAmJiBpc1Zpc2libGVcIlxuICAgICAgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudClcIlxuICAgICAgKG1vdXNlZW50ZXIpPVwiaGFuZGxlT3ZlcigkZXZlbnQpXCJcbiAgICAgIChtb3VzZWxlYXZlKT1cImhhbmRsZUxlYXZlKCRldmVudClcIlxuICAgICAgW3RpdGxlXT1cInRpdGxlXCJcbiAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwibGFiZWxcIlxuICAgICAgY2xhc3M9XCJlbW9qaS1tYXJ0LWVtb2ppXCJcbiAgICAgIFtjbGFzcy5lbW9qaS1tYXJ0LWVtb2ppLW5hdGl2ZV09XCJpc05hdGl2ZVwiXG4gICAgICBbY2xhc3MuZW1vamktbWFydC1lbW9qaS1jdXN0b21dPVwiY3VzdG9tXCJcbiAgICA+XG4gICAgICA8c3BhbiBbbmdTdHlsZV09XCJzdHlsZVwiPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiaXNOYXRpdmVcIj57eyB1bmlmaWVkIH19PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgPC9zcGFuPlxuICAgIDwvc3Bhbj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIEVtb2ppQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBFbW9qaSB7XG4gIEBJbnB1dCgpIHNraW46IEVtb2ppWydza2luJ10gPSAxO1xuICBASW5wdXQoKSBzZXQ6IEVtb2ppWydzZXQnXSA9ICdhcHBsZSc7XG4gIEBJbnB1dCgpIHNoZWV0U2l6ZTogRW1vamlbJ3NoZWV0U2l6ZSddID0gNjQ7XG4gIC8qKiBSZW5kZXJzIHRoZSBuYXRpdmUgdW5pY29kZSBlbW9qaSAqL1xuICBASW5wdXQoKSBpc05hdGl2ZTogRW1vamlbJ2lzTmF0aXZlJ10gPSBmYWxzZTtcbiAgQElucHV0KCkgZm9yY2VTaXplOiBFbW9qaVsnZm9yY2VTaXplJ10gPSBmYWxzZTtcbiAgQElucHV0KCkgdG9vbHRpcDogRW1vamlbJ3Rvb2x0aXAnXSA9IGZhbHNlO1xuICBASW5wdXQoKSBzaXplOiBFbW9qaVsnc2l6ZSddID0gMjQ7XG4gIEBJbnB1dCgpIGVtb2ppOiBFbW9qaVsnZW1vamknXSA9ICcnO1xuICBASW5wdXQoKSBmYWxsYmFjaz86IEVtb2ppWydmYWxsYmFjayddO1xuICBASW5wdXQoKSBoaWRlT2Jzb2xldGUgPSBmYWxzZTtcbiAgQElucHV0KCkgU0hFRVRfQ09MVU1OUyA9IDU3O1xuICBASW5wdXQoKSBzaGVldFJvd3M/OiBudW1iZXI7XG4gIEBJbnB1dCgpIHNoZWV0Q29sdW1ucz86IG51bWJlcjtcbiAgQElucHV0KCkgdXNlQnV0dG9uPzogYm9vbGVhbjtcbiAgQE91dHB1dCgpIGVtb2ppT3ZlcjogRW1vamlbJ2Vtb2ppT3ZlciddID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZW1vamlMZWF2ZTogRW1vamlbJ2Vtb2ppTGVhdmUnXSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGVtb2ppQ2xpY2s6IEVtb2ppWydlbW9qaUNsaWNrJ10gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIHN0eWxlOiBhbnk7XG4gIHRpdGxlID0gJyc7XG4gIGxhYmVsID0gJyc7XG4gIHVuaWZpZWQ/OiBzdHJpbmcgfCBudWxsO1xuICBjdXN0b20gPSBmYWxzZTtcbiAgaXNWaXNpYmxlID0gdHJ1ZTtcbiAgLy8gVE9ETzogcmVwbGFjZSA0LjAuMyB3LyBkeW5hbWljIGdldCB2ZXJpc29uIGZyb20gZW1vamktZGF0YXNvdXJjZSBpbiBwYWNrYWdlLmpzb25cbiAgQElucHV0KCkgYmFja2dyb3VuZEltYWdlRm46IEVtb2ppWydiYWNrZ3JvdW5kSW1hZ2VGbiddID0gREVGQVVMVF9CQUNLR1JPVU5ERk47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbW9qaVNlcnZpY2U6IEVtb2ppU2VydmljZSkge31cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICBpZiAoIXRoaXMuZW1vamkpIHtcbiAgICAgIHJldHVybiAodGhpcy5pc1Zpc2libGUgPSBmYWxzZSk7XG4gICAgfVxuICAgIGNvbnN0IGRhdGEgPSB0aGlzLmdldERhdGEoKTtcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHJldHVybiAodGhpcy5pc1Zpc2libGUgPSBmYWxzZSk7XG4gICAgfVxuICAgIC8vIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5jaGlsZHJlbjtcbiAgICB0aGlzLnVuaWZpZWQgPSBkYXRhLm5hdGl2ZSB8fCBudWxsO1xuICAgIGlmIChkYXRhLmN1c3RvbSkge1xuICAgICAgdGhpcy5jdXN0b20gPSBkYXRhLmN1c3RvbTtcbiAgICB9XG4gICAgaWYgKCFkYXRhLnVuaWZpZWQgJiYgIWRhdGEuY3VzdG9tKSB7XG4gICAgICByZXR1cm4gKHRoaXMuaXNWaXNpYmxlID0gZmFsc2UpO1xuICAgIH1cbiAgICBpZiAodGhpcy50b29sdGlwKSB7XG4gICAgICB0aGlzLnRpdGxlID0gZGF0YS5zaG9ydE5hbWVzWzBdO1xuICAgIH1cbiAgICBpZiAoZGF0YS5vYnNvbGV0ZWRCeSAmJiB0aGlzLmhpZGVPYnNvbGV0ZSkge1xuICAgICAgcmV0dXJuICh0aGlzLmlzVmlzaWJsZSA9IGZhbHNlKTtcbiAgICB9XG5cbiAgICB0aGlzLmxhYmVsID0gW2RhdGEubmF0aXZlXVxuICAgICAgLmNvbmNhdChkYXRhLnNob3J0TmFtZXMpXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAuam9pbignLCAnKTtcblxuICAgIGlmICh0aGlzLmlzTmF0aXZlICYmIGRhdGEudW5pZmllZCAmJiBkYXRhLm5hdGl2ZSkge1xuICAgICAgLy8gaGlkZSBvbGRlciBlbW9qaSBiZWZvcmUgdGhlIHNwbGl0IGludG8gZ2VuZGVyZWQgZW1vamlcbiAgICAgIHRoaXMuc3R5bGUgPSB7IGZvbnRTaXplOiBgJHt0aGlzLnNpemV9cHhgIH07XG5cbiAgICAgIGlmICh0aGlzLmZvcmNlU2l6ZSkge1xuICAgICAgICB0aGlzLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcbiAgICAgICAgdGhpcy5zdHlsZS53aWR0aCA9IGAke3RoaXMuc2l6ZX1weGA7XG4gICAgICAgIHRoaXMuc3R5bGUuaGVpZ2h0ID0gYCR7dGhpcy5zaXplfXB4YDtcbiAgICAgICAgdGhpcy5zdHlsZVsnd29yZC1icmVhayddID0gJ2tlZXAtYWxsJztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGRhdGEuY3VzdG9tKSB7XG4gICAgICB0aGlzLnN0eWxlID0ge1xuICAgICAgICB3aWR0aDogYCR7dGhpcy5zaXplfXB4YCxcbiAgICAgICAgaGVpZ2h0OiBgJHt0aGlzLnNpemV9cHhgLFxuICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xuICAgICAgfTtcbiAgICAgIGlmIChkYXRhLnNwcml0ZVVybCAmJiB0aGlzLnNoZWV0Um93cyAmJiB0aGlzLnNoZWV0Q29sdW1ucykge1xuICAgICAgICB0aGlzLnN0eWxlID0ge1xuICAgICAgICAgIC4uLnRoaXMuc3R5bGUsXG4gICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7ZGF0YS5zcHJpdGVVcmx9KWAsXG4gICAgICAgICAgYmFja2dyb3VuZFNpemU6IGAkezEwMCAqIHRoaXMuc2hlZXRDb2x1bW5zfSUgJHsxMDAgKiB0aGlzLnNoZWV0Um93c30lYCxcbiAgICAgICAgICBiYWNrZ3JvdW5kUG9zaXRpb246IHRoaXMuZW1vamlTZXJ2aWNlLmdldFNwcml0ZVBvc2l0aW9uKFxuICAgICAgICAgICAgZGF0YS5zaGVldCxcbiAgICAgICAgICAgIHRoaXMuc2hlZXRDb2x1bW5zXG4gICAgICAgICAgKVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdHlsZSA9IHtcbiAgICAgICAgICAuLi50aGlzLnN0eWxlLFxuICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogYHVybCgke2RhdGEuaW1hZ2VVcmx9KWAsXG4gICAgICAgICAgYmFja2dyb3VuZFNpemU6ICdjb250YWluJ1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZGF0YS5oaWRkZW4ubGVuZ3RoICYmIGRhdGEuaGlkZGVuLmluY2x1ZGVzKHRoaXMuc2V0KSkge1xuICAgICAgICBpZiAodGhpcy5mYWxsYmFjaykge1xuICAgICAgICAgIHRoaXMuc3R5bGUgPSB7IGZvbnRTaXplOiBgJHt0aGlzLnNpemV9cHhgIH07XG4gICAgICAgICAgdGhpcy51bmlmaWVkID0gdGhpcy5mYWxsYmFjayhkYXRhLCB0aGlzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gKHRoaXMuaXNWaXNpYmxlID0gZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0eWxlID0gdGhpcy5lbW9qaVNlcnZpY2UuZW1vamlTcHJpdGVTdHlsZXMoXG4gICAgICAgICAgZGF0YS5zaGVldCxcbiAgICAgICAgICB0aGlzLnNldCxcbiAgICAgICAgICB0aGlzLnNpemUsXG4gICAgICAgICAgdGhpcy5zaGVldFNpemUsXG4gICAgICAgICAgdGhpcy5zaGVldFJvd3MsXG4gICAgICAgICAgdGhpcy5iYWNrZ3JvdW5kSW1hZ2VGbixcbiAgICAgICAgICB0aGlzLlNIRUVUX0NPTFVNTlNcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICh0aGlzLmlzVmlzaWJsZSA9IHRydWUpO1xuICB9XG5cbiAgZ2V0RGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy5lbW9qaVNlcnZpY2UuZ2V0RGF0YSh0aGlzLmVtb2ppLCB0aGlzLnNraW4sIHRoaXMuc2V0KTtcbiAgfVxuXG4gIGdldFNhbml0aXplZERhdGEoKTogRW1vamlEYXRhIHtcbiAgICByZXR1cm4gdGhpcy5lbW9qaVNlcnZpY2UuZ2V0U2FuaXRpemVkRGF0YShcbiAgICAgIHRoaXMuZW1vamksXG4gICAgICB0aGlzLnNraW4sXG4gICAgICB0aGlzLnNldFxuICAgICkgYXMgRW1vamlEYXRhO1xuICB9XG5cbiAgaGFuZGxlQ2xpY2soJGV2ZW50OiBFdmVudCkge1xuICAgIGNvbnN0IGVtb2ppID0gdGhpcy5nZXRTYW5pdGl6ZWREYXRhKCk7XG4gICAgdGhpcy5lbW9qaUNsaWNrLmVtaXQoeyBlbW9qaSwgJGV2ZW50IH0pO1xuICB9XG5cbiAgaGFuZGxlT3ZlcigkZXZlbnQ6IEV2ZW50KSB7XG4gICAgY29uc3QgZW1vamkgPSB0aGlzLmdldFNhbml0aXplZERhdGEoKTtcbiAgICB0aGlzLmVtb2ppT3Zlci5lbWl0KHsgZW1vamksICRldmVudCB9KTtcbiAgfVxuXG4gIGhhbmRsZUxlYXZlKCRldmVudDogRXZlbnQpIHtcbiAgICBjb25zdCBlbW9qaSA9IHRoaXMuZ2V0U2FuaXRpemVkRGF0YSgpO1xuICAgIHRoaXMuZW1vamlMZWF2ZS5lbWl0KHsgZW1vamksICRldmVudCB9KTtcbiAgfVxufVxuIl19