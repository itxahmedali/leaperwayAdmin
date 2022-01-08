import { __decorate } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, } from '@angular/core';
import { Emoji, EmojiData, EmojiService } from '@ctrl/ngx-emoji-mart/ngx-emoji';
let PreviewComponent = class PreviewComponent {
    constructor(ref, emojiService) {
        this.ref = ref;
        this.emojiService = emojiService;
        this.skinChange = new EventEmitter();
        this.emojiData = {};
    }
    ngOnChanges() {
        if (!this.emoji) {
            return;
        }
        this.emojiData = this.emojiService.getData(this.emoji, this.emojiSkin, this.emojiSet);
        const knownEmoticons = [];
        const listedEmoticons = [];
        const emoitcons = this.emojiData.emoticons || [];
        emoitcons.forEach((emoticon) => {
            if (knownEmoticons.indexOf(emoticon.toLowerCase()) >= 0) {
                return;
            }
            knownEmoticons.push(emoticon.toLowerCase());
            listedEmoticons.push(emoticon);
        });
        this.listedEmoticons = listedEmoticons;
    }
};
PreviewComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: EmojiService }
];
__decorate([
    Input()
], PreviewComponent.prototype, "title", void 0);
__decorate([
    Input()
], PreviewComponent.prototype, "emoji", void 0);
__decorate([
    Input()
], PreviewComponent.prototype, "idleEmoji", void 0);
__decorate([
    Input()
], PreviewComponent.prototype, "i18n", void 0);
__decorate([
    Input()
], PreviewComponent.prototype, "emojiIsNative", void 0);
__decorate([
    Input()
], PreviewComponent.prototype, "emojiSkin", void 0);
__decorate([
    Input()
], PreviewComponent.prototype, "emojiSize", void 0);
__decorate([
    Input()
], PreviewComponent.prototype, "emojiSet", void 0);
__decorate([
    Input()
], PreviewComponent.prototype, "emojiSheetSize", void 0);
__decorate([
    Input()
], PreviewComponent.prototype, "emojiBackgroundImageFn", void 0);
__decorate([
    Output()
], PreviewComponent.prototype, "skinChange", void 0);
PreviewComponent = __decorate([
    Component({
        selector: 'emoji-preview',
        template: `
  <div class="emoji-mart-preview" *ngIf="emoji && emojiData">
    <div class="emoji-mart-preview-emoji">
      <ngx-emoji
        [emoji]="emoji"
        [size]="38"
        [isNative]="emojiIsNative"
        [skin]="emojiSkin"
        [size]="emojiSize"
        [set]="emojiSet"
        [sheetSize]="emojiSheetSize"
        [backgroundImageFn]="emojiBackgroundImageFn"
      ></ngx-emoji>
    </div>

    <div class="emoji-mart-preview-data">
      <div class="emoji-mart-preview-name">{{ emojiData.name }}</div>
      <div class="emoji-mart-preview-shortname">
        <span class="emoji-mart-preview-shortname" *ngFor="let short_name of emojiData.shortNames">
          :{{ short_name }}:
        </span>
      </div>
      <div class="emoji-mart-preview-emoticons">
        <span class="emoji-mart-preview-emoticon" *ngFor="let emoticon of listedEmoticons">
          {{ emoticon }}
        </span>
      </div>
    </div>
  </div>

  <div class="emoji-mart-preview" *ngIf="!emoji">
    <div class="emoji-mart-preview-emoji">
      <ngx-emoji *ngIf="idleEmoji && idleEmoji.length"
        [isNative]="emojiIsNative"
        [skin]="emojiSkin"
        [set]="emojiSet"
        [emoji]="idleEmoji"
        [backgroundImageFn]="emojiBackgroundImageFn"
        [size]="38"
      ></ngx-emoji>
    </div>

    <div class="emoji-mart-preview-data">
      <span class="emoji-mart-title-label">{{ title }}</span>
    </div>

    <div class="emoji-mart-preview-skins">
      <emoji-skins [skin]="emojiSkin" (changeSkin)="skinChange.emit($event)" [i18n]="i18n">
      </emoji-skins>
    </div>
  </div>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        preserveWhitespaces: false
    })
], PreviewComponent);
export { PreviewComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY3RybC9uZ3gtZW1vamktbWFydC8iLCJzb3VyY2VzIjpbInByZXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFDTCxTQUFTLEVBQ1QsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBMkRoRixJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQWUzQixZQUNTLEdBQXNCLEVBQ3JCLFlBQTBCO1FBRDNCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3JCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBTjFCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQ2xELGNBQVMsR0FBdUIsRUFBRSxDQUFDO0lBTWhDLENBQUM7SUFFSixXQUFXO1FBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFjLENBQUM7UUFDbkcsTUFBTSxjQUFjLEdBQWEsRUFBRSxDQUFDO1FBQ3BDLE1BQU0sZUFBZSxHQUFhLEVBQUUsQ0FBQztRQUNyQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7UUFDakQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQWdCLEVBQUUsRUFBRTtZQUNyQyxJQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN2RCxPQUFPO2FBQ1I7WUFDRCxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1lBQzVDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztJQUN6QyxDQUFDO0NBQ0YsQ0FBQTs7WUFyQmUsaUJBQWlCO1lBQ1AsWUFBWTs7QUFoQjNCO0lBQVIsS0FBSyxFQUFFOytDQUFnQjtBQUNmO0lBQVIsS0FBSyxFQUFFOytDQUFZO0FBQ1g7SUFBUixLQUFLLEVBQUU7bURBQWdCO0FBQ2Y7SUFBUixLQUFLLEVBQUU7OENBQVc7QUFDVjtJQUFSLEtBQUssRUFBRTt1REFBbUM7QUFDbEM7SUFBUixLQUFLLEVBQUU7bURBQTJCO0FBQzFCO0lBQVIsS0FBSyxFQUFFO21EQUEyQjtBQUMxQjtJQUFSLEtBQUssRUFBRTtrREFBeUI7QUFDeEI7SUFBUixLQUFLLEVBQUU7d0RBQXFDO0FBQ3BDO0lBQVIsS0FBSyxFQUFFO2dFQUFxRDtBQUNuRDtJQUFULE1BQU0sRUFBRTtvREFBeUM7QUFYdkMsZ0JBQWdCO0lBekQ1QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsZUFBZTtRQUN6QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1EVDtRQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1FBQy9DLG1CQUFtQixFQUFFLEtBQUs7S0FDM0IsQ0FBQztHQUNXLGdCQUFnQixDQXFDNUI7U0FyQ1ksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT3V0cHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRW1vamksIEVtb2ppRGF0YSwgRW1vamlTZXJ2aWNlIH0gZnJvbSAnQGN0cmwvbmd4LWVtb2ppLW1hcnQvbmd4LWVtb2ppJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZW1vamktcHJldmlldycsXG4gIHRlbXBsYXRlOiBgXG4gIDxkaXYgY2xhc3M9XCJlbW9qaS1tYXJ0LXByZXZpZXdcIiAqbmdJZj1cImVtb2ppICYmIGVtb2ppRGF0YVwiPlxuICAgIDxkaXYgY2xhc3M9XCJlbW9qaS1tYXJ0LXByZXZpZXctZW1vamlcIj5cbiAgICAgIDxuZ3gtZW1vamlcbiAgICAgICAgW2Vtb2ppXT1cImVtb2ppXCJcbiAgICAgICAgW3NpemVdPVwiMzhcIlxuICAgICAgICBbaXNOYXRpdmVdPVwiZW1vamlJc05hdGl2ZVwiXG4gICAgICAgIFtza2luXT1cImVtb2ppU2tpblwiXG4gICAgICAgIFtzaXplXT1cImVtb2ppU2l6ZVwiXG4gICAgICAgIFtzZXRdPVwiZW1vamlTZXRcIlxuICAgICAgICBbc2hlZXRTaXplXT1cImVtb2ppU2hlZXRTaXplXCJcbiAgICAgICAgW2JhY2tncm91bmRJbWFnZUZuXT1cImVtb2ppQmFja2dyb3VuZEltYWdlRm5cIlxuICAgICAgPjwvbmd4LWVtb2ppPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cImVtb2ppLW1hcnQtcHJldmlldy1kYXRhXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZW1vamktbWFydC1wcmV2aWV3LW5hbWVcIj57eyBlbW9qaURhdGEubmFtZSB9fTwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImVtb2ppLW1hcnQtcHJldmlldy1zaG9ydG5hbWVcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJlbW9qaS1tYXJ0LXByZXZpZXctc2hvcnRuYW1lXCIgKm5nRm9yPVwibGV0IHNob3J0X25hbWUgb2YgZW1vamlEYXRhLnNob3J0TmFtZXNcIj5cbiAgICAgICAgICA6e3sgc2hvcnRfbmFtZSB9fTpcbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiZW1vamktbWFydC1wcmV2aWV3LWVtb3RpY29uc1wiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImVtb2ppLW1hcnQtcHJldmlldy1lbW90aWNvblwiICpuZ0Zvcj1cImxldCBlbW90aWNvbiBvZiBsaXN0ZWRFbW90aWNvbnNcIj5cbiAgICAgICAgICB7eyBlbW90aWNvbiB9fVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cImVtb2ppLW1hcnQtcHJldmlld1wiICpuZ0lmPVwiIWVtb2ppXCI+XG4gICAgPGRpdiBjbGFzcz1cImVtb2ppLW1hcnQtcHJldmlldy1lbW9qaVwiPlxuICAgICAgPG5neC1lbW9qaSAqbmdJZj1cImlkbGVFbW9qaSAmJiBpZGxlRW1vamkubGVuZ3RoXCJcbiAgICAgICAgW2lzTmF0aXZlXT1cImVtb2ppSXNOYXRpdmVcIlxuICAgICAgICBbc2tpbl09XCJlbW9qaVNraW5cIlxuICAgICAgICBbc2V0XT1cImVtb2ppU2V0XCJcbiAgICAgICAgW2Vtb2ppXT1cImlkbGVFbW9qaVwiXG4gICAgICAgIFtiYWNrZ3JvdW5kSW1hZ2VGbl09XCJlbW9qaUJhY2tncm91bmRJbWFnZUZuXCJcbiAgICAgICAgW3NpemVdPVwiMzhcIlxuICAgICAgPjwvbmd4LWVtb2ppPlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cImVtb2ppLW1hcnQtcHJldmlldy1kYXRhXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImVtb2ppLW1hcnQtdGl0bGUtbGFiZWxcIj57eyB0aXRsZSB9fTwvc3Bhbj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJlbW9qaS1tYXJ0LXByZXZpZXctc2tpbnNcIj5cbiAgICAgIDxlbW9qaS1za2lucyBbc2tpbl09XCJlbW9qaVNraW5cIiAoY2hhbmdlU2tpbik9XCJza2luQ2hhbmdlLmVtaXQoJGV2ZW50KVwiIFtpMThuXT1cImkxOG5cIj5cbiAgICAgIDwvZW1vamktc2tpbnM+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG59KVxuZXhwb3J0IGNsYXNzIFByZXZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSB0aXRsZT86IHN0cmluZztcbiAgQElucHV0KCkgZW1vamk6IGFueTtcbiAgQElucHV0KCkgaWRsZUVtb2ppOiBhbnk7XG4gIEBJbnB1dCgpIGkxOG46IGFueTtcbiAgQElucHV0KCkgZW1vamlJc05hdGl2ZT86IEVtb2ppWydpc05hdGl2ZSddO1xuICBASW5wdXQoKSBlbW9qaVNraW4/OiBFbW9qaVsnc2tpbiddO1xuICBASW5wdXQoKSBlbW9qaVNpemU/OiBFbW9qaVsnc2l6ZSddO1xuICBASW5wdXQoKSBlbW9qaVNldD86IEVtb2ppWydzZXQnXTtcbiAgQElucHV0KCkgZW1vamlTaGVldFNpemU/OiBFbW9qaVsnc2hlZXRTaXplJ107XG4gIEBJbnB1dCgpIGVtb2ppQmFja2dyb3VuZEltYWdlRm4/OiBFbW9qaVsnYmFja2dyb3VuZEltYWdlRm4nXTtcbiAgQE91dHB1dCgpIHNraW5DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgZW1vamlEYXRhOiBQYXJ0aWFsPEVtb2ppRGF0YT4gPSB7fTtcbiAgbGlzdGVkRW1vdGljb25zPzogc3RyaW5nW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBlbW9qaVNlcnZpY2U6IEVtb2ppU2VydmljZSxcbiAgKSB7fVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGlmICghdGhpcy5lbW9qaSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmVtb2ppRGF0YSA9IHRoaXMuZW1vamlTZXJ2aWNlLmdldERhdGEodGhpcy5lbW9qaSwgdGhpcy5lbW9qaVNraW4sIHRoaXMuZW1vamlTZXQpIGFzIEVtb2ppRGF0YTtcbiAgICBjb25zdCBrbm93bkVtb3RpY29uczogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCBsaXN0ZWRFbW90aWNvbnM6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3QgZW1vaXRjb25zID0gdGhpcy5lbW9qaURhdGEuZW1vdGljb25zIHx8IFtdO1xuICAgIGVtb2l0Y29ucy5mb3JFYWNoKChlbW90aWNvbjogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAoa25vd25FbW90aWNvbnMuaW5kZXhPZihlbW90aWNvbi50b0xvd2VyQ2FzZSgpKSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGtub3duRW1vdGljb25zLnB1c2goZW1vdGljb24udG9Mb3dlckNhc2UoKSk7XG4gICAgICBsaXN0ZWRFbW90aWNvbnMucHVzaChlbW90aWNvbik7XG4gICAgfSk7XG4gICAgdGhpcy5saXN0ZWRFbW90aWNvbnMgPSBsaXN0ZWRFbW90aWNvbnM7XG4gIH1cbn1cbiJdfQ==