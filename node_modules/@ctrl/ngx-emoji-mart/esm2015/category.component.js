import { __decorate } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, } from '@angular/core';
import { Emoji, EmojiService } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { EmojiFrequentlyService } from './emoji-frequently.service';
let CategoryComponent = class CategoryComponent {
    constructor(ref, emojiService, frequently) {
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
    ngOnInit() {
        this.emojis = this.getEmojis();
        if (!this.emojis) {
            this.containerStyles = { display: 'none' };
        }
        if (!this.hasStickyPosition) {
            this.labelStyles = { height: 28 };
            // this.labelSpanStyles = { position: 'absolute' };
        }
    }
    memoizeSize() {
        const parent = this.container.nativeElement.parentNode.parentNode;
        const { top, height, } = this.container.nativeElement.getBoundingClientRect();
        const parentTop = parent.getBoundingClientRect().top;
        const labelHeight = this.label.nativeElement.getBoundingClientRect().height;
        this.top = top - parentTop + parent.scrollTop;
        if (height === 0) {
            this.maxMargin = 0;
        }
        else {
            this.maxMargin = height - labelHeight;
        }
    }
    handleScroll(scrollTop) {
        let margin = scrollTop - this.top;
        margin = margin < this.minMargin ? this.minMargin : margin;
        margin = margin > this.maxMargin ? this.maxMargin : margin;
        if (margin === this.margin) {
            return false;
        }
        if (!this.hasStickyPosition) {
            this.label.nativeElement.style.top = `${margin}px`;
        }
        this.margin = margin;
        return true;
    }
    getEmojis() {
        if (this.name === 'Recent') {
            let frequentlyUsed = this.recent || this.frequently.get(this.perLine, this.totalFrequentLines);
            if (!frequentlyUsed || !frequentlyUsed.length) {
                frequentlyUsed = this.frequently.get(this.perLine, this.totalFrequentLines);
            }
            if (frequentlyUsed.length) {
                this.emojis = frequentlyUsed
                    .map(id => {
                    const emoji = this.custom.filter((e) => e.id === id)[0];
                    if (emoji) {
                        return emoji;
                    }
                    return id;
                })
                    .filter(id => !!this.emojiService.getData(id));
            }
            if ((!this.emojis || this.emojis.length === 0) && frequentlyUsed.length > 0) {
                return null;
            }
        }
        if (this.emojis) {
            this.emojis = this.emojis.slice(0);
        }
        return this.emojis;
    }
    updateDisplay(display) {
        this.containerStyles.display = display;
        this.getEmojis();
        this.ref.detectChanges();
    }
    trackById(index, item) {
        return item;
    }
};
CategoryComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: EmojiService },
    { type: EmojiFrequentlyService }
];
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
        template: `
  <section #container class="emoji-mart-category"
    [attr.aria-label]="i18n.categories[id]"
    [class.emoji-mart-no-results]="emojis && !emojis.length"
    [ngStyle]="containerStyles">
    <div class="emoji-mart-category-label"
      [ngStyle]="labelStyles"
      [attr.data-name]="name">
      <!-- already labeled by the section aria-label -->
      <span #label [ngStyle]="labelSpanStyles" aria-hidden="true">
        {{ i18n.categories[id] }}
      </span>
    </div>

    <ng-template [ngIf]="emojis">
      <ngx-emoji
        *ngFor="let emoji of emojis; trackBy: trackById"
        [emoji]="emoji"
        [size]="emojiSize"
        [skin]="emojiSkin"
        [isNative]="emojiIsNative"
        [set]="emojiSet"
        [sheetSize]="emojiSheetSize"
        [forceSize]="emojiForceSize"
        [tooltip]="emojiTooltip"
        [backgroundImageFn]="emojiBackgroundImageFn"
        [hideObsolete]="hideObsolete"
        (emojiOver)="emojiOver.emit($event)"
        (emojiLeave)="emojiLeave.emit($event)"
        (emojiClick)="emojiClick.emit($event)"
      ></ngx-emoji>
    </ng-template>

    <div *ngIf="emojis && !emojis.length">
      <div>
        <ngx-emoji
          [emoji]="notFoundEmoji"
          size="38"
          [skin]="emojiSkin"
          [isNative]="emojiIsNative"
          [set]="emojiSet"
          [sheetSize]="emojiSheetSize"
          [forceSize]="emojiForceSize"
          [tooltip]="emojiTooltip"
          [backgroundImageFn]="emojiBackgroundImageFn"
          [useButton]="emojiUseButton"
        ></ngx-emoji>
      </div>

      <div class="emoji-mart-no-results-label">
        {{ i18n.notfound }}
      </div>
    </div>

  </section>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        preserveWhitespaces: false
    })
], CategoryComponent);
export { CategoryComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGN0cmwvbmd4LWVtb2ppLW1hcnQvIiwic291cmNlcyI6WyJjYXRlZ29yeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBQ04sTUFBTSxFQUNOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBK0RwRSxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQWtDNUIsWUFDUyxHQUFzQixFQUNyQixZQUEwQixFQUMxQixVQUFrQztRQUZuQyxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUNyQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixlQUFVLEdBQVYsVUFBVSxDQUF3QjtRQW5DbkMsc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLFNBQUksR0FBRyxFQUFFLENBQUM7UUFDVixZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osdUJBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLFdBQU0sR0FBYSxFQUFFLENBQUM7UUFDdEIsV0FBTSxHQUFVLEVBQUUsQ0FBQztRQUduQixpQkFBWSxHQUFHLElBQUksQ0FBQztRQVduQixjQUFTLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbkQsZUFBVSxHQUF3QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3JELGVBQVUsR0FBd0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUcvRCxvQkFBZSxHQUFRLEVBQUUsQ0FBQztRQUMxQixnQkFBVyxHQUFRLEVBQUUsQ0FBQztRQUN0QixvQkFBZSxHQUFRLEVB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O0dBdURUO1FBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07UUFDL0MsbUJBQW1CLEVBQUUsS0FBSztLQUMzQixDQUFDO0dBQ1csaUJBQWlCLENBNEg3QjtTQTVIWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEVtb2ppLCBFbW9qaVNlcnZpY2UgfSBmcm9tICdAY3RybC9uZ3gtZW1vamktbWFydC9uZ3gtZW1vamknO1xuaW1wb3J0IHsgRW1vamlGcmVxdWVudGx5U2VydmljZSB9IGZyb20gJy4vZW1vamktZnJlcXVlbnRseS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZW1vamktY2F0ZWdvcnknLFxuICB0ZW1wbGF0ZTogYFxuICA8c2VjdGlvbiAjY29udGFpbmVyIGNsYXNzPVwiZW1vamktbWFydC1jYXRlZ29yeVwiXG4gICAgW2F0dHIuYXJpYS1sYWJlbF09XCJpMThuLmNhdGVnb3JpZXNbaWRdXCJcbiAgICBbY2xhc3MuZW1vamktbWFydC1uby1yZXN1bHRzXT1cImVtb2ppcyAmJiAhZW1vamlzLmxlbmd0aFwiXG4gICAgW25nU3R5bGVdPVwiY29udGFpbmVyU3R5bGVzXCI+XG4gICAgPGRpdiBjbGFzcz1cImVtb2ppLW1hcnQtY2F0ZWdvcnktbGFiZWxcIlxuICAgICAgW25nU3R5bGVdPVwibGFiZWxTdHlsZXNcIlxuICAgICAgW2F0dHIuZGF0YS1uYW1lXT1cIm5hbWVcIj5cbiAgICAgIDwhLS0gYWxyZWFkeSBsYWJlbGVkIGJ5IHRoZSBzZWN0aW9uIGFyaWEtbGFiZWwgLS0+XG4gICAgICA8c3BhbiAjbGFiZWwgW25nU3R5bGVdPVwibGFiZWxTcGFuU3R5bGVzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgIHt7IGkxOG4uY2F0ZWdvcmllc1tpZF0gfX1cbiAgICAgIDwvc3Bhbj5cbiAgICA8L2Rpdj5cblxuICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJlbW9qaXNcIj5cbiAgICAgIDxuZ3gtZW1vamlcbiAgICAgICAgKm5nRm9yPVwibGV0IGVtb2ppIG9mIGVtb2ppczsgdHJhY2tCeTogdHJhY2tCeUlkXCJcbiAgICAgICAgW2Vtb2ppXT1cImVtb2ppXCJcbiAgICAgICAgW3NpemVdPVwiZW1vamlTaXplXCJcbiAgICAgICAgW3NraW5dPVwiZW1vamlTa2luXCJcbiAgICAgICAgW2lzTmF0aXZlXT1cImVtb2ppSXNOYXRpdmVcIlxuICAgICAgICBbc2V0XT1cImVtb2ppU2V0XCJcbiAgICAgICAgW3NoZWV0U2l6ZV09XCJlbW9qaVNoZWV0U2l6ZVwiXG4gICAgICAgIFtmb3JjZVNpemVdPVwiZW1vamlGb3JjZVNpemVcIlxuICAgICAgICBbdG9vbHRpcF09XCJlbW9qaVRvb2x0aXBcIlxuICAgICAgICBbYmFja2dyb3VuZEltYWdlRm5dPVwiZW1vamlCYWNrZ3JvdW5kSW1hZ2VGblwiXG4gICAgICAgIFtoaWRlT2Jzb2xldGVdPVwiaGlkZU9ic29sZXRlXCJcbiAgICAgICAgKGVtb2ppT3Zlcik9XCJlbW9qaU92ZXIuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgKGVtb2ppTGVhdmUpPVwiZW1vamlMZWF2ZS5lbWl0KCRldmVudClcIlxuICAgICAgICAoZW1vamlDbGljayk9XCJlbW9qaUNsaWNrLmVtaXQoJGV2ZW50KVwiXG4gICAgICA+PC9uZ3gtZW1vamk+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDxkaXYgKm5nSWY9XCJlbW9qaXMgJiYgIWVtb2ppcy5sZW5ndGhcIj5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxuZ3gtZW1vamlcbiAgICAgICAgICBbZW1vamldPVwibm90Rm91bmRFbW9qaVwiXG4gICAgICAgICAgc2l6ZT1cIjM4XCJcbiAgICAgICAgICBbc2tpbl09XCJlbW9qaVNraW5cIlxuICAgICAgICAgIFtpc05hdGl2ZV09XCJlbW9qaUlzTmF0aXZlXCJcbiAgICAgICAgICBbc2V0XT1cImVtb2ppU2V0XCJcbiAgICAgICAgICBbc2hlZXRTaXplXT1cImVtb2ppU2hlZXRTaXplXCJcbiAgICAgICAgICBbZm9yY2VTaXplXT1cImVtb2ppRm9yY2VTaXplXCJcbiAgICAgICAgICBbdG9vbHRpcF09XCJlbW9qaVRvb2x0aXBcIlxuICAgICAgICAgIFtiYWNrZ3JvdW5kSW1hZ2VGbl09XCJlbW9qaUJhY2tncm91bmRJbWFnZUZuXCJcbiAgICAgICAgICBbdXNlQnV0dG9uXT1cImVtb2ppVXNlQnV0dG9uXCJcbiAgICAgICAgPjwvbmd4LWVtb2ppPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJlbW9qaS1tYXJ0LW5vLXJlc3VsdHMtbGFiZWxcIj5cbiAgICAgICAge3sgaTE4bi5ub3Rmb3VuZCB9fVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgPC9zZWN0aW9uPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG59KVxuZXhwb3J0IGNsYXNzIENhdGVnb3J5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZW1vamlzPzogYW55W10gfCBudWxsO1xuICBASW5wdXQoKSBoYXNTdGlja3lQb3NpdGlvbiA9IHRydWU7XG4gIEBJbnB1dCgpIG5hbWUgPSAnJztcbiAgQElucHV0KCkgcGVyTGluZSA9IDk7XG4gIEBJbnB1dCgpIHRvdGFsRnJlcXVlbnRMaW5lcyA9IDQ7XG4gIEBJbnB1dCgpIHJlY2VudDogc3RyaW5nW10gPSBbXTtcbiAgQElucHV0KCkgY3VzdG9tOiBhbnlbXSA9IFtdO1xuICBASW5wdXQoKSBpMThuOiBhbnk7XG4gIEBJbnB1dCgpIGlkOiBhbnk7XG4gIEBJbnB1dCgpIGhpZGVPYnNvbGV0ZSA9IHRydWU7XG4gIEBJbnB1dCgpIG5vdEZvdW5kRW1vamk/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGVtb2ppSXNOYXRpdmU/OiBFbW9qaVsnaXNOYXRpdmUnXTtcbiAgQElucHV0KCkgZW1vamlTa2luPzogRW1vamlbJ3NraW4nXTtcbiAgQElucHV0KCkgZW1vamlTaXplPzogRW1vamlbJ3NpemUnXTtcbiAgQElucHV0KCkgZW1vamlTZXQ/OiBFbW9qaVsnc2V0J107XG4gIEBJbnB1dCgpIGVtb2ppU2hlZXRTaXplPzogRW1vamlbJ3NoZWV0U2l6ZSddO1xuICBASW5wdXQoKSBlbW9qaUZvcmNlU2l6ZT86IEVtb2ppWydmb3JjZVNpemUnXTtcbiAgQElucHV0KCkgZW1vamlUb29sdGlwPzogRW1vamlbJ3Rvb2x0aXAnXTtcbiAgQElucHV0KCkgZW1vamlCYWNrZ3JvdW5kSW1hZ2VGbj86IEVtb2ppWydiYWNrZ3JvdW5kSW1hZ2VGbiddO1xuICBASW5wdXQoKSBlbW9qaVVzZUJ1dHRvbjogYm9vbGVhbjtcbiAgQE91dHB1dCgpIGVtb2ppT3ZlcjogRW1vamlbJ2Vtb2ppT3ZlciddID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZW1vamlMZWF2ZTogRW1vamlbJ2Vtb2ppTGVhdmUnXSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGVtb2ppQ2xpY2s6IEVtb2ppWydlbW9qaUNsaWNrJ10gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicsIHsgc3RhdGljOiB0cnVlIH0pIGNvbnRhaW5lciE6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2xhYmVsJywgeyBzdGF0aWM6IHRydWUgfSkgbGFiZWwhOiBFbGVtZW50UmVmO1xuICBjb250YWluZXJTdHlsZXM6IGFueSA9IHt9O1xuICBsYWJlbFN0eWxlczogYW55ID0ge307XG4gIGxhYmVsU3BhblN0eWxlczogYW55ID0ge307XG4gIG1hcmdpbiA9IDA7XG4gIG1pbk1hcmdpbiA9IDA7XG4gIG1heE1hcmdpbiA9IDA7XG4gIHRvcCA9IDA7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBlbW9qaVNlcnZpY2U6IEVtb2ppU2VydmljZSxcbiAgICBwcml2YXRlIGZyZXF1ZW50bHk6IEVtb2ppRnJlcXVlbnRseVNlcnZpY2UsXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmVtb2ppcyA9IHRoaXMuZ2V0RW1vamlzKCk7XG5cbiAgICBpZiAoIXRoaXMuZW1vamlzKSB7XG4gICAgICB0aGlzLmNvbnRhaW5lclN0eWxlcyA9IHsgZGlzcGxheTogJ25vbmUnIH07XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmhhc1N0aWNreVBvc2l0aW9uKSB7XG4gICAgICB0aGlzLmxhYmVsU3R5bGVzID0geyBoZWlnaHQ6IDI4IH07XG4gICAgICAvLyB0aGlzLmxhYmVsU3BhblN0eWxlcyA9IHsgcG9zaXRpb246ICdhYnNvbHV0ZScgfTtcbiAgICB9XG4gIH1cbiAgbWVtb2l6ZVNpemUoKSB7XG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgY29uc3Qge1xuICAgICAgdG9wLFxuICAgICAgaGVpZ2h0LFxuICAgIH0gPSB0aGlzLmNvbnRhaW5lci5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHBhcmVudFRvcCA9IHBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgY29uc3QgbGFiZWxIZWlnaHQgPSB0aGlzLmxhYmVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuXG4gICAgdGhpcy50b3AgPSB0b3AgLSBwYXJlbnRUb3AgKyBwYXJlbnQuc2Nyb2xsVG9wO1xuXG4gICAgaWYgKGhlaWdodCA9PT0gMCkge1xuICAgICAgdGhpcy5tYXhNYXJnaW4gPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1heE1hcmdpbiA9IGhlaWdodCAtIGxhYmVsSGVpZ2h0O1xuICAgIH1cbiAgfVxuICBoYW5kbGVTY3JvbGwoc2Nyb2xsVG9wOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBsZXQgbWFyZ2luID0gc2Nyb2xsVG9wIC0gdGhpcy50b3A7XG4gICAgbWFyZ2luID0gbWFyZ2luIDwgdGhpcy5taW5NYXJnaW4gPyB0aGlzLm1pbk1hcmdpbiA6IG1hcmdpbjtcbiAgICBtYXJnaW4gPSBtYXJnaW4gPiB0aGlzLm1heE1hcmdpbiA/IHRoaXMubWF4TWFyZ2luIDogbWFyZ2luO1xuXG4gICAgaWYgKG1hcmdpbiA9PT0gdGhpcy5tYXJnaW4pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaGFzU3RpY2t5UG9zaXRpb24pIHtcbiAgICAgIHRoaXMubGFiZWwubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPSBgJHttYXJnaW59cHhgO1xuICAgIH1cblxuICAgIHRoaXMubWFyZ2luID0gbWFyZ2luO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZ2V0RW1vamlzKCkge1xuICAgIGlmICh0aGlzLm5hbWUgPT09ICdSZWNlbnQnKSB7XG4gICAgICBsZXQgZnJlcXVlbnRseVVzZWQgPSB0aGlzLnJlY2VudCB8fCB0aGlzLmZyZXF1ZW50bHkuZ2V0KHRoaXMucGVyTGluZSwgdGhpcy50b3RhbEZyZXF1ZW50TGluZXMpO1xuICAgICAgaWYgKCFmcmVxdWVudGx5VXNlZCB8fCAhZnJlcXVlbnRseVVzZWQubGVuZ3RoKSB7XG4gICAgICAgIGZyZXF1ZW50bHlVc2VkID0gdGhpcy5mcmVxdWVudGx5LmdldCh0aGlzLnBlckxpbmUsIHRoaXMudG90YWxGcmVxdWVudExpbmVzKTtcbiAgICAgIH1cbiAgICAgIGlmIChmcmVxdWVudGx5VXNlZC5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5lbW9qaXMgPSBmcmVxdWVudGx5VXNlZFxuICAgICAgICAgIC5tYXAoaWQgPT4ge1xuICAgICAgICAgICAgY29uc3QgZW1vamkgPSB0aGlzLmN1c3RvbS5maWx0ZXIoKGU6IGFueSkgPT4gZS5pZCA9PT0gaWQpWzBdO1xuICAgICAgICAgICAgaWYgKGVtb2ppKSB7XG4gICAgICAgICAgICAgIHJldHVybiBlbW9qaTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZpbHRlcihpZCA9PiAhIXRoaXMuZW1vamlTZXJ2aWNlLmdldERhdGEoaWQpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCghdGhpcy5lbW9qaXMgfHwgdGhpcy5lbW9qaXMubGVuZ3RoID09PSAwKSAmJiBmcmVxdWVudGx5VXNlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmVtb2ppcykge1xuICAgICAgdGhpcy5lbW9qaXMgPSB0aGlzLmVtb2ppcy5zbGljZSgwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5lbW9qaXM7XG4gIH1cbiAgdXBkYXRlRGlzcGxheShkaXNwbGF5OiAnbm9uZScgfCAnYmxvY2snKSB7XG4gICAgdGhpcy5jb250YWluZXJTdHlsZXMuZGlzcGxheSA9IGRpc3BsYXk7XG4gICAgdGhpcy5nZXRFbW9qaXMoKTtcbiAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cbiAgdHJhY2tCeUlkKGluZGV4OiBudW1iZXIsIGl0ZW06IGFueSkge1xuICAgIHJldHVybiBpdGVtO1xuICB9XG59XG4iXX0=