import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DEFAULT_BACKGROUNDFN, EmojiService } from './emoji.service';
let EmojiComponent = class EmojiComponent {
    constructor(emojiService) {
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
    ngOnChanges() {
        if (!this.emoji) {
            return (this.isVisible = false);
        }
        const data = this.getData();
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
            this.style = { fontSize: `${this.size}px` };
            if (this.forceSize) {
                this.style.display = 'inline-block';
                this.style.width = `${this.size}px`;
                this.style.height = `${this.size}px`;
                this.style['word-break'] = 'keep-all';
            }
        }
        else if (data.custom) {
            this.style = {
                width: `${this.size}px`,
                height: `${this.size}px`,
                display: 'inline-block'
            };
            if (data.spriteUrl && this.sheetRows && this.sheetColumns) {
                this.style = Object.assign(Object.assign({}, this.style), { backgroundImage: `url(${data.spriteUrl})`, backgroundSize: `${100 * this.sheetColumns}% ${100 * this.sheetRows}%`, backgroundPosition: this.emojiService.getSpritePosition(data.sheet, this.sheetColumns) });
            }
            else {
                this.style = Object.assign(Object.assign({}, this.style), { backgroundImage: `url(${data.imageUrl})`, backgroundSize: 'contain' });
            }
        }
        else {
            if (data.hidden.length && data.hidden.includes(this.set)) {
                if (this.fallback) {
                    this.style = { fontSize: `${this.size}px` };
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
    }
    getData() {
        return this.emojiService.getData(this.emoji, this.skin, this.set);
    }
    getSanitizedData() {
        return this.emojiService.getSanitizedData(this.emoji, this.skin, this.set);
    }
    handleClick($event) {
        const emoji = this.getSanitizedData();
        this.emojiClick.emit({ emoji, $event });
    }
    handleOver($event) {
        const emoji = this.getSanitizedData();
        this.emojiOver.emit({ emoji, $event });
    }
    handleLeave($event) {
        const emoji = this.getSanitizedData();
        this.emojiLeave.emit({ emoji, $event });
    }
};
EmojiComponent.ctorParameters = () => [
    { type: EmojiService }
];
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
        template: `
    <button
      *ngIf="useButton && isVisible"
      type="button"
      (click)="handleClick($event)"
      (mouseenter)="handleOver($event)"
      (mouseleave)="handleLeave($event)"
      [title]="title"
      [attr.aria-label]="label"
      class="emoji-mart-emoji"
      [class.emoji-mart-emoji-native]="isNative"
      [class.emoji-mart-emoji-custom]="custom"
    >
      <span [ngStyle]="style">
        <ng-template [ngIf]="isNative">{{ unified }}</ng-template>
        <ng-content></ng-content>
      </span>
    </button>

    <span
      *ngIf="!useButton && isVisible"
      (click)="handleClick($event)"
      (mouseenter)="handleOver($event)"
      (mouseleave)="handleLeave($event)"
      [title]="title"
      [attr.aria-label]="label"
      class="emoji-mart-emoji"
      [class.emoji-mart-emoji-native]="isNative"
      [class.emoji-mart-emoji-custom]="custom"
    >
      <span [ngStyle]="style">
        <ng-template [ngIf]="isNative">{{ unified }}</ng-template>
        <ng-content></ng-content>
      </span>
    </span>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        preserveWhitespaces: false
    })
], EmojiComponent);
export { EmojiComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1vamkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGN0cmwvbmd4LWVtb2ppLW1hcnQvbmd4LWVtb2ppLyIsInNvdXJjZXMiOlsiZW1vamkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFrRXJFLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUE0QnpCLFlBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBM0JyQyxTQUFJLEdBQWtCLENBQUMsQ0FBQztRQUN4QixRQUFHLEdBQWlCLE9BQU8sQ0FBQztRQUM1QixjQUFTLEdBQXVCLEVBQUUsQ0FBQztRQUM1Qyx1Q0FBdUM7UUFDOUIsYUFBUSxHQUFzQixLQUFLLENBQUM7UUFDcEMsY0FBUyxHQUF1QixLQUFLLENBQUM7UUFDdEMsWUFBTyxHQUFxQixLQUFLLENBQUM7UUFDbEMsU0FBSSxHQUFrQixFQUFFLENBQUM7UUFDekIsVUFBSyxHQUFtQixFQUFFLENBQUM7UUFFM0IsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFJbEIsY0FBUyxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ25ELGVBQVUsR0FBd0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNyRCxlQUFVLEdBQXdCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFL0QsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUNYLFVBQUssR0FBRyxFQUFFLENBQUM7UUFFWCxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixtRkFBbUY7UUFDMUUsc0JBQWlCLEdBQStCLG9CQUFv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UixLQUFLLEVBQUU7cURBQW9CO0FBQ25CO0lBQVIsS0FBSyxFQUFFO2lEQUFvQjtBQUNuQjtJQUFSLEtBQUssRUFBRTtvREFBdUI7QUFDdEI7SUFBUixLQUFLLEVBQUU7aURBQXFCO0FBQ25CO0lBQVQsTUFBTSxFQUFFO2lEQUFvRDtBQUNuRDtJQUFULE1BQU0sRUFBRTtrREFBc0Q7QUFDckQ7SUFBVCxNQUFNLEVBQUU7a0RBQXNEO0FBUXREO0lBQVIsS0FBSyxFQUFFO3lEQUFzRTtBQTFCbkUsY0FBYztJQXpDMUIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFdBQVc7UUFDckIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1DVDtRQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1FBQy9DLG1CQUFtQixFQUFFLEtBQUs7S0FDM0IsQ0FBQztHQUNXLGNBQWMsQ0E0STFCO1NBNUlZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRW1vamlEYXRhIH0gZnJvbSAnLi9kYXRhL2RhdGEuaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBERUZBVUxUX0JBQ0tHUk9VTkRGTiwgRW1vamlTZXJ2aWNlIH0gZnJvbSAnLi9lbW9qaS5zZXJ2aWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBFbW9qaSB7XG4gIC8qKiBSZW5kZXJzIHRoZSBuYXRpdmUgdW5pY29kZSBlbW9qaSAqL1xuICBpc05hdGl2ZTogYm9vbGVhbjtcbiAgZm9yY2VTaXplOiBib29sZWFuO1xuICB0b29sdGlwOiBib29sZWFuO1xuICBza2luOiAxIHwgMiB8IDMgfCA0IHwgNSB8IDY7XG4gIHNoZWV0U2l6ZTogMTYgfCAyMCB8IDMyIHwgNjQ7XG4gIHNoZWV0Um93cz86IG51bWJlcjtcbiAgc2V0OiAnYXBwbGUnIHwgJ2dvb2dsZScgfCAndHdpdHRlcicgfCAnZmFjZWJvb2snIHwgJyc7XG4gIHNpemU6IG51bWJlcjtcbiAgZW1vamk6IHN0cmluZyB8IEVtb2ppRGF0YTtcbiAgYmFja2dyb3VuZEltYWdlRm46IChzZXQ6IHN0cmluZywgc2hlZXRTaXplOiBudW1iZXIpID0+IHN0cmluZztcbiAgZmFsbGJhY2s/OiAoZGF0YTogYW55LCBwcm9wczogYW55KSA9PiBzdHJpbmc7XG4gIGVtb2ppT3ZlcjogRXZlbnRFbWl0dGVyPEVtb2ppRXZlbnQ+O1xuICBlbW9qaUxlYXZlOiBFdmVudEVtaXR0ZXI8RW1vamlFdmVudD47XG4gIGVtb2ppQ2xpY2s6IEV2ZW50RW1pdHRlcjxFbW9qaUV2ZW50Pjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFbW9qaUV2ZW50IHtcbiAgZW1vamk6IEVtb2ppRGF0YTtcbiAgJGV2ZW50OiBFdmVudDtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LWVtb2ppJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8YnV0dG9uXG4gICAgICAqbmdJZj1cInVzZUJ1dHRvbiAmJiBpc1Zpc2libGVcIlxuICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAoY2xpY2spPVwiaGFuZGxlQ2xpY2soJGV2ZW50KVwiXG4gICAgICAobW91c2VlbnRlcik9XCJoYW5kbGVPdmVyKCRldmVudClcIlxuICAgICAgKG1vdXNlbGVhdmUpPVwiaGFuZGxlTGVhdmUoJGV2ZW50KVwiXG4gICAgICBbdGl0bGVdPVwidGl0bGVcIlxuICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJsYWJlbFwiXG4gICAgICBjbGFzcz1cImVtb2ppLW1hcnQtZW1vamlcIlxuICAgICAgW2NsYXNzLmVtb2ppLW1hcnQtZW1vamktbmF0aXZlXT1cImlzTmF0aXZlXCJcbiAgICAgIFtjbGFzcy5lbW9qaS1tYXJ0LWVtb2ppLWN1c3RvbV09XCJjdXN0b21cIlxuICAgID5cbiAgICAgIDxzcGFuIFtuZ1N0eWxlXT1cInN0eWxlXCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJpc05hdGl2ZVwiPnt7IHVuaWZpZWQgfX08L25nLXRlbXBsYXRlPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8L3NwYW4+XG4gICAgPC9idXR0b24+XG5cbiAgICA8c3BhblxuICAgICAgKm5nSWY9XCIhdXNlQnV0dG9uICYmIGlzVmlzaWJsZVwiXG4gICAgICAoY2xpY2spPVwiaGFuZGxlQ2xpY2soJGV2ZW50KVwiXG4gICAgICAobW91c2VlbnRlcik9XCJoYW5kbGVPdmVyKCRldmVudClcIlxuICAgICAgKG1vdXNlbGVhdmUpPVwiaGFuZGxlTGVhdmUoJGV2ZW50KVwiXG4gICAgICBbdGl0bGVdPVwidGl0bGVcIlxuICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJsYWJlbFwiXG4gICAgICBjbGFzcz1cImVtb2ppLW1hcnQtZW1vamlcIlxuICAgICAgW2NsYXNzLmVtb2ppLW1hcnQtZW1vamktbmF0aXZlXT1cImlzTmF0aXZlXCJcbiAgICAgIFtjbGFzcy5lbW9qaS1tYXJ0LWVtb2ppLWN1c3RvbV09XCJjdXN0b21cIlxuICAgID5cbiAgICAgIDxzcGFuIFtuZ1N0eWxlXT1cInN0eWxlXCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJpc05hdGl2ZVwiPnt7IHVuaWZpZWQgfX08L25nLXRlbXBsYXRlPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8L3NwYW4+XG4gICAgPC9zcGFuPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2Vcbn0pXG5leHBvcnQgY2xhc3MgRW1vamlDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIEVtb2ppIHtcbiAgQElucHV0KCkgc2tpbjogRW1vamlbJ3NraW4nXSA9IDE7XG4gIEBJbnB1dCgpIHNldDogRW1vamlbJ3NldCddID0gJ2FwcGxlJztcbiAgQElucHV0KCkgc2hlZXRTaXplOiBFbW9qaVsnc2hlZXRTaXplJ10gPSA2NDtcbiAgLyoqIFJlbmRlcnMgdGhlIG5hdGl2ZSB1bmljb2RlIGVtb2ppICovXG4gIEBJbnB1dCgpIGlzTmF0aXZlOiBFbW9qaVsnaXNOYXRpdmUnXSA9IGZhbHNlO1xuICBASW5wdXQoKSBmb3JjZVNpemU6IEVtb2ppWydmb3JjZVNpemUnXSA9IGZhbHNlO1xuICBASW5wdXQoKSB0b29sdGlwOiBFbW9qaVsndG9vbHRpcCddID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNpemU6IEVtb2ppWydzaXplJ10gPSAyNDtcbiAgQElucHV0KCkgZW1vamk6IEVtb2ppWydlbW9qaSddID0gJyc7XG4gIEBJbnB1dCgpIGZhbGxiYWNrPzogRW1vamlbJ2ZhbGxiYWNrJ107XG4gIEBJbnB1dCgpIGhpZGVPYnNvbGV0ZSA9IGZhbHNlO1xuICBASW5wdXQoKSBTSEVFVF9DT0xVTU5TID0gNTc7XG4gIEBJbnB1dCgpIHNoZWV0Um93cz86IG51bWJlcjtcbiAgQElucHV0KCkgc2hlZXRDb2x1bW5zPzogbnVtYmVyO1xuICBASW5wdXQoKSB1c2VCdXR0b24/OiBib29sZWFuO1xuICBAT3V0cHV0KCkgZW1vamlPdmVyOiBFbW9qaVsnZW1vamlPdmVyJ10gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBlbW9qaUxlYXZlOiBFbW9qaVsnZW1vamlMZWF2ZSddID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZW1vamlDbGljazogRW1vamlbJ2Vtb2ppQ2xpY2snXSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgc3R5bGU6IGFueTtcbiAgdGl0bGUgPSAnJztcbiAgbGFiZWwgPSAnJztcbiAgdW5pZmllZD86IHN0cmluZyB8IG51bGw7XG4gIGN1c3RvbSA9IGZhbHNlO1xuICBpc1Zpc2libGUgPSB0cnVlO1xuICAvLyBUT0RPOiByZXBsYWNlIDQuMC4zIHcvIGR5bmFtaWMgZ2V0IHZlcmlzb24gZnJvbSBlbW9qaS1kYXRhc291cmNlIGluIHBhY2thZ2UuanNvblxuICBASW5wdXQoKSBiYWNrZ3JvdW5kSW1hZ2VGbjogRW1vamlbJ2JhY2tncm91bmRJbWFnZUZuJ10gPSBERUZBVUxUX0JBQ0tHUk9VTkRGTjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVtb2ppU2VydmljZTogRW1vamlTZXJ2aWNlKSB7fVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGlmICghdGhpcy5lbW9qaSkge1xuICAgICAgcmV0dXJuICh0aGlzLmlzVmlzaWJsZSA9IGZhbHNlKTtcbiAgICB9XG4gICAgY29uc3QgZGF0YSA9IHRoaXMuZ2V0RGF0YSgpO1xuICAgIGlmICghZGF0YSkge1xuICAgICAgcmV0dXJuICh0aGlzLmlzVmlzaWJsZSA9IGZhbHNlKTtcbiAgICB9XG4gICAgLy8gY29uc3QgY2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuO1xuICAgIHRoaXMudW5pZmllZCA9IGRhdGEubmF0aXZlIHx8IG51bGw7XG4gICAgaWYgKGRhdGEuY3VzdG9tKSB7XG4gICAgICB0aGlzLmN1c3RvbSA9IGRhdGEuY3VzdG9tO1xuICAgIH1cbiAgICBpZiAoIWRhdGEudW5pZmllZCAmJiAhZGF0YS5jdXN0b20pIHtcbiAgICAgIHJldHVybiAodGhpcy5pc1Zpc2libGUgPSBmYWxzZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnRvb2x0aXApIHtcbiAgICAgIHRoaXMudGl0bGUgPSBkYXRhLnNob3J0TmFtZXNbMF07XG4gICAgfVxuICAgIGlmIChkYXRhLm9ic29sZXRlZEJ5ICYmIHRoaXMuaGlkZU9ic29sZXRlKSB7XG4gICAgICByZXR1cm4gKHRoaXMuaXNWaXNpYmxlID0gZmFsc2UpO1xuICAgIH1cblxuICAgIHRoaXMubGFiZWwgPSBbZGF0YS5uYXRpdmVdXG4gICAgICAuY29uY2F0KGRhdGEuc2hvcnROYW1lcylcbiAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAgIC5qb2luKCcsICcpO1xuXG4gICAgaWYgKHRoaXMuaXNOYXRpdmUgJiYgZGF0YS51bmlmaWVkICYmIGRhdGEubmF0aXZlKSB7XG4gICAgICAvLyBoaWRlIG9sZGVyIGVtb2ppIGJlZm9yZSB0aGUgc3BsaXQgaW50byBnZW5kZXJlZCBlbW9qaVxuICAgICAgdGhpcy5zdHlsZSA9IHsgZm9udFNpemU6IGAke3RoaXMuc2l6ZX1weGAgfTtcblxuICAgICAgaWYgKHRoaXMuZm9yY2VTaXplKSB7XG4gICAgICAgIHRoaXMuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuICAgICAgICB0aGlzLnN0eWxlLndpZHRoID0gYCR7dGhpcy5zaXplfXB4YDtcbiAgICAgICAgdGhpcy5zdHlsZS5oZWlnaHQgPSBgJHt0aGlzLnNpemV9cHhgO1xuICAgICAgICB0aGlzLnN0eWxlWyd3b3JkLWJyZWFrJ10gPSAna2VlcC1hbGwnO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZGF0YS5jdXN0b20pIHtcbiAgICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICAgIHdpZHRoOiBgJHt0aGlzLnNpemV9cHhgLFxuICAgICAgICBoZWlnaHQ6IGAke3RoaXMuc2l6ZX1weGAsXG4gICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXG4gICAgICB9O1xuICAgICAgaWYgKGRhdGEuc3ByaXRlVXJsICYmIHRoaXMuc2hlZXRSb3dzICYmIHRoaXMuc2hlZXRDb2x1bW5zKSB7XG4gICAgICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICAgICAgLi4udGhpcy5zdHlsZSxcbiAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtkYXRhLnNwcml0ZVVybH0pYCxcbiAgICAgICAgICBiYWNrZ3JvdW5kU2l6ZTogYCR7MTAwICogdGhpcy5zaGVldENvbHVtbnN9JSAkezEwMCAqIHRoaXMuc2hlZXRSb3dzfSVgLFxuICAgICAgICAgIGJhY2tncm91bmRQb3NpdGlvbjogdGhpcy5lbW9qaVNlcnZpY2UuZ2V0U3ByaXRlUG9zaXRpb24oXG4gICAgICAgICAgICBkYXRhLnNoZWV0LFxuICAgICAgICAgICAgdGhpcy5zaGVldENvbHVtbnNcbiAgICAgICAgICApXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0eWxlID0ge1xuICAgICAgICAgIC4uLnRoaXMuc3R5bGUsXG4gICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7ZGF0YS5pbWFnZVVybH0pYCxcbiAgICAgICAgICBiYWNrZ3JvdW5kU2l6ZTogJ2NvbnRhaW4nXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChkYXRhLmhpZGRlbi5sZW5ndGggJiYgZGF0YS5oaWRkZW4uaW5jbHVkZXModGhpcy5zZXQpKSB7XG4gICAgICAgIGlmICh0aGlzLmZhbGxiYWNrKSB7XG4gICAgICAgICAgdGhpcy5zdHlsZSA9IHsgZm9udFNpemU6IGAke3RoaXMuc2l6ZX1weGAgfTtcbiAgICAgICAgICB0aGlzLnVuaWZpZWQgPSB0aGlzLmZhbGxiYWNrKGRhdGEsIHRoaXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiAodGhpcy5pc1Zpc2libGUgPSBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3R5bGUgPSB0aGlzLmVtb2ppU2VydmljZS5lbW9qaVNwcml0ZVN0eWxlcyhcbiAgICAgICAgICBkYXRhLnNoZWV0LFxuICAgICAgICAgIHRoaXMuc2V0LFxuICAgICAgICAgIHRoaXMuc2l6ZSxcbiAgICAgICAgICB0aGlzLnNoZWV0U2l6ZSxcbiAgICAgICAgICB0aGlzLnNoZWV0Um93cyxcbiAgICAgICAgICB0aGlzLmJhY2tncm91bmRJbWFnZUZuLFxuICAgICAgICAgIHRoaXMuU0hFRVRfQ09MVU1OU1xuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gKHRoaXMuaXNWaXNpYmxlID0gdHJ1ZSk7XG4gIH1cblxuICBnZXREYXRhKCkge1xuICAgIHJldHVybiB0aGlzLmVtb2ppU2VydmljZS5nZXREYXRhKHRoaXMuZW1vamksIHRoaXMuc2tpbiwgdGhpcy5zZXQpO1xuICB9XG5cbiAgZ2V0U2FuaXRpemVkRGF0YSgpOiBFbW9qaURhdGEge1xuICAgIHJldHVybiB0aGlzLmVtb2ppU2VydmljZS5nZXRTYW5pdGl6ZWREYXRhKFxuICAgICAgdGhpcy5lbW9qaSxcbiAgICAgIHRoaXMuc2tpbixcbiAgICAgIHRoaXMuc2V0XG4gICAgKSBhcyBFbW9qaURhdGE7XG4gIH1cblxuICBoYW5kbGVDbGljaygkZXZlbnQ6IEV2ZW50KSB7XG4gICAgY29uc3QgZW1vamkgPSB0aGlzLmdldFNhbml0aXplZERhdGEoKTtcbiAgICB0aGlzLmVtb2ppQ2xpY2suZW1pdCh7IGVtb2ppLCAkZXZlbnQgfSk7XG4gIH1cblxuICBoYW5kbGVPdmVyKCRldmVudDogRXZlbnQpIHtcbiAgICBjb25zdCBlbW9qaSA9IHRoaXMuZ2V0U2FuaXRpemVkRGF0YSgpO1xuICAgIHRoaXMuZW1vamlPdmVyLmVtaXQoeyBlbW9qaSwgJGV2ZW50IH0pO1xuICB9XG5cbiAgaGFuZGxlTGVhdmUoJGV2ZW50OiBFdmVudCkge1xuICAgIGNvbnN0IGVtb2ppID0gdGhpcy5nZXRTYW5pdGl6ZWREYXRhKCk7XG4gICAgdGhpcy5lbW9qaUxlYXZlLmVtaXQoeyBlbW9qaSwgJGV2ZW50IH0pO1xuICB9XG59XG4iXX0=