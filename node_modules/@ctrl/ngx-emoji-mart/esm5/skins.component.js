import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
var SkinComponent = /** @class */ (function () {
    function SkinComponent() {
        this.changeSkin = new EventEmitter();
        this.opened = false;
        this.skinTones = [1, 2, 3, 4, 5, 6];
    }
    SkinComponent.prototype.toggleOpen = function () {
        this.opened = !this.opened;
    };
    SkinComponent.prototype.isSelected = function (skinTone) {
        return skinTone === this.skin;
    };
    SkinComponent.prototype.isVisible = function (skinTone) {
        return this.opened || this.isSelected(skinTone);
    };
    SkinComponent.prototype.pressed = function (skinTone) {
        return this.opened ? !!this.isSelected(skinTone) : '';
    };
    SkinComponent.prototype.tabIndex = function (skinTone) {
        return this.isVisible(skinTone) ? '0' : '';
    };
    SkinComponent.prototype.expanded = function (skinTone) {
        return this.isSelected(skinTone) ? this.opened : '';
    };
    SkinComponent.prototype.handleClick = function (skin) {
        if (!this.opened) {
            this.opened = true;
            return;
        }
        this.opened = false;
        if (skin !== this.skin) {
            this.changeSkin.emit(skin);
        }
    };
    __decorate([
        Input()
    ], SkinComponent.prototype, "skin", void 0);
    __decorate([
        Input()
    ], SkinComponent.prototype, "i18n", void 0);
    __decorate([
        Output()
    ], SkinComponent.prototype, "changeSkin", void 0);
    SkinComponent = __decorate([
        Component({
            selector: 'emoji-skins',
            template: "\n    <section\n      class=\"emoji-mart-skin-swatches\"\n      [class.opened]=\"opened\"\n    >\n      <span\n        *ngFor=\"let skinTone of skinTones\"\n        class=\"emoji-mart-skin-swatch\"\n        [class.selected]=\"skinTone === skin\"\n      >\n        <span\n          (click)=\"this.handleClick(skinTone)\"\n          (keyup.enter)=\"handleClick(skinTone)\"\n          (keyup.space)=\"handleClick(skinTone)\"\n          class=\"emoji-mart-skin emoji-mart-skin-tone-{{ skinTone }}\"\n          role=\"button\"\n          [tabIndex]=\"tabIndex(skinTone)\"\n          [attr.aria-hidden]=\"!isVisible(skinTone)\"\n          [attr.aria-pressed]=\"pressed(skinTone)\"\n          [attr.aria-haspopup]=\"!!isSelected(skinTone)\"\n          [attr.aria-expanded]=\"expanded(skinTone)\"\n          [attr.aria-label]=\"i18n.skintones[skinTone]\"\n          [title]=\"i18n.skintones[skinTone]\"\n        ></span>\n      </span>\n    </section>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            preserveWhitespaces: false
        })
    ], SkinComponent);
    return SkinComponent;
}());
export { SkinComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tpbnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGN0cmwvbmd4LWVtb2ppLW1hcnQvIiwic291cmNlcyI6WyJza2lucy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBb0N2QjtJQUFBO1FBSVksZUFBVSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDbEQsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLGNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFvQ2pDLENBQUM7SUFsQ0Msa0NBQVUsR0FBVjtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQzdCLENBQUM7SUFFRCxrQ0FBVSxHQUFWLFVBQVcsUUFBdUI7UUFDaEMsT0FBTyxRQUFRLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQztJQUNoQyxDQUFDO0lBRUQsaUNBQVMsR0FBVCxVQUFVLFFBQXVCO1FBQy9CLE9BQU8sSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCwrQkFBTyxHQUFQLFVBQVEsUUFBdUI7UUFDN0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3hELENBQUM7SUFFRCxnQ0FBUSxHQUFSLFVBQVMsUUFBdUI7UUFDOUIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQsZ0NBQVEsR0FBUixVQUFTLFFBQXVCO1FBQzlCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3RELENBQUM7SUFFRCxtQ0FBVyxHQUFYLFVBQVksSUFBWTtRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNuQixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztJQXZDUTtRQUFSLEtBQUssRUFBRTsrQ0FBc0I7SUFDckI7UUFBUixLQUFLLEVBQUU7K0NBQVc7SUFDVDtRQUFULE1BQU0sRUFBRTtxREFBeUM7SUFKdkMsYUFBYTtRQWhDekIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGFBQWE7WUFDdkIsUUFBUSxFQUFFLHE3QkEwQlQ7WUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtZQUMvQyxtQkFBbUIsRUFBRSxLQUFLO1NBQzNCLENBQUM7T0FDVyxhQUFhLENBMEN6QjtJQUFELG9CQUFDO0NBQUEsQUExQ0QsSUEwQ0M7U0ExQ1ksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEVtb2ppIH0gZnJvbSAnQGN0cmwvbmd4LWVtb2ppLW1hcnQvbmd4LWVtb2ppJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZW1vamktc2tpbnMnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzZWN0aW9uXG4gICAgICBjbGFzcz1cImVtb2ppLW1hcnQtc2tpbi1zd2F0Y2hlc1wiXG4gICAgICBbY2xhc3Mub3BlbmVkXT1cIm9wZW5lZFwiXG4gICAgPlxuICAgICAgPHNwYW5cbiAgICAgICAgKm5nRm9yPVwibGV0IHNraW5Ub25lIG9mIHNraW5Ub25lc1wiXG4gICAgICAgIGNsYXNzPVwiZW1vamktbWFydC1za2luLXN3YXRjaFwiXG4gICAgICAgIFtjbGFzcy5zZWxlY3RlZF09XCJza2luVG9uZSA9PT0gc2tpblwiXG4gICAgICA+XG4gICAgICAgIDxzcGFuXG4gICAgICAgICAgKGNsaWNrKT1cInRoaXMuaGFuZGxlQ2xpY2soc2tpblRvbmUpXCJcbiAgICAgICAgICAoa2V5dXAuZW50ZXIpPVwiaGFuZGxlQ2xpY2soc2tpblRvbmUpXCJcbiAgICAgICAgICAoa2V5dXAuc3BhY2UpPVwiaGFuZGxlQ2xpY2soc2tpblRvbmUpXCJcbiAgICAgICAgICBjbGFzcz1cImVtb2ppLW1hcnQtc2tpbiBlbW9qaS1tYXJ0LXNraW4tdG9uZS17eyBza2luVG9uZSB9fVwiXG4gICAgICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICAgICAgW3RhYkluZGV4XT1cInRhYkluZGV4KHNraW5Ub25lKVwiXG4gICAgICAgICAgW2F0dHIuYXJpYS1oaWRkZW5dPVwiIWlzVmlzaWJsZShza2luVG9uZSlcIlxuICAgICAgICAgIFthdHRyLmFyaWEtcHJlc3NlZF09XCJwcmVzc2VkKHNraW5Ub25lKVwiXG4gICAgICAgICAgW2F0dHIuYXJpYS1oYXNwb3B1cF09XCIhIWlzU2VsZWN0ZWQoc2tpblRvbmUpXCJcbiAgICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cImV4cGFuZGVkKHNraW5Ub25lKVwiXG4gICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJpMThuLnNraW50b25lc1tza2luVG9uZV1cIlxuICAgICAgICAgIFt0aXRsZV09XCJpMThuLnNraW50b25lc1tza2luVG9uZV1cIlxuICAgICAgICA+PC9zcGFuPlxuICAgICAgPC9zcGFuPlxuICAgIDwvc2VjdGlvbj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxufSlcbmV4cG9ydCBjbGFzcyBTa2luQ29tcG9uZW50IHtcbiAgLyoqIGN1cnJlbnRseSBzZWxlY3RlZCBza2luICovXG4gIEBJbnB1dCgpIHNraW4/OiBFbW9qaVsnc2tpbiddO1xuICBASW5wdXQoKSBpMThuOiBhbnk7XG4gIEBPdXRwdXQoKSBjaGFuZ2VTa2luID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIG9wZW5lZCA9IGZhbHNlO1xuICBza2luVG9uZXMgPSBbMSwgMiwgMywgNCwgNSwgNl07XG5cbiAgdG9nZ2xlT3BlbigpIHtcbiAgICB0aGlzLm9wZW5lZCA9ICF0aGlzLm9wZW5lZDtcbiAgfVxuXG4gIGlzU2VsZWN0ZWQoc2tpblRvbmU6IEVtb2ppWydza2luJ10pOiBib29sZWFuIHtcbiAgICByZXR1cm4gc2tpblRvbmUgPT09IHRoaXMuc2tpbjtcbiAgfVxuXG4gIGlzVmlzaWJsZShza2luVG9uZTogRW1vamlbJ3NraW4nXSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm9wZW5lZCB8fCB0aGlzLmlzU2VsZWN0ZWQoc2tpblRvbmUpO1xuICB9XG5cbiAgcHJlc3NlZChza2luVG9uZTogRW1vamlbJ3NraW4nXSkge1xuICAgIHJldHVybiB0aGlzLm9wZW5lZCA/ICEhdGhpcy5pc1NlbGVjdGVkKHNraW5Ub25lKSA6ICcnO1xuICB9XG5cbiAgdGFiSW5kZXgoc2tpblRvbmU6IEVtb2ppWydza2luJ10pIHtcbiAgICByZXR1cm4gdGhpcy5pc1Zpc2libGUoc2tpblRvbmUpID8gJzAnIDogJyc7XG4gIH1cblxuICBleHBhbmRlZChza2luVG9uZTogRW1vamlbJ3NraW4nXSkge1xuICAgIHJldHVybiB0aGlzLmlzU2VsZWN0ZWQoc2tpblRvbmUpID8gdGhpcy5vcGVuZWQgOiAnJztcbiAgfVxuXG4gIGhhbmRsZUNsaWNrKHNraW46IG51bWJlcikge1xuICAgIGlmICghdGhpcy5vcGVuZWQpIHtcbiAgICAgIHRoaXMub3BlbmVkID0gdHJ1ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5vcGVuZWQgPSBmYWxzZTtcbiAgICBpZiAoc2tpbiAhPT0gdGhpcy5za2luKSB7XG4gICAgICB0aGlzLmNoYW5nZVNraW4uZW1pdChza2luKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==