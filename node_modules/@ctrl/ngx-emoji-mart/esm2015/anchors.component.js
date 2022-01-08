import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
let AnchorsComponent = class AnchorsComponent {
    constructor() {
        this.categories = [];
        this.icons = {};
        this.anchorClick = new EventEmitter();
    }
    trackByFn(idx, cat) {
        return cat.id;
    }
    handleClick($event, index) {
        this.anchorClick.emit({
            category: this.categories[index],
            index,
        });
    }
};
__decorate([
    Input()
], AnchorsComponent.prototype, "categories", void 0);
__decorate([
    Input()
], AnchorsComponent.prototype, "color", void 0);
__decorate([
    Input()
], AnchorsComponent.prototype, "selected", void 0);
__decorate([
    Input()
], AnchorsComponent.prototype, "i18n", void 0);
__decorate([
    Input()
], AnchorsComponent.prototype, "icons", void 0);
__decorate([
    Output()
], AnchorsComponent.prototype, "anchorClick", void 0);
AnchorsComponent = __decorate([
    Component({
        selector: 'emoji-mart-anchors',
        template: `
  <div class="emoji-mart-anchors">
    <ng-template ngFor let-category [ngForOf]="categories" let-idx="index" [ngForTrackBy]="trackByFn">
      <span
        *ngIf="category.anchor !== false"
        [attr.title]="i18n.categories[category.id]"
        (click)="this.handleClick($event, idx)"
        class="emoji-mart-anchor"
        [class.emoji-mart-anchor-selected]="category.name === selected"
        [style.color]="category.name === selected ? color : null"
      >
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path [attr.d]="icons[category.id]" />
          </svg>
        </div>
        <span class="emoji-mart-anchor-bar" [style.background-color]="color"></span>
      </span>
    </ng-template>
  </div>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        preserveWhitespaces: false
    })
], AnchorsComponent);
export { AnchorsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5jaG9ycy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY3RybC9uZ3gtZW1vamktbWFydC8iLCJzb3VyY2VzIjpbImFuY2hvcnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQThCdkIsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBZ0I7SUFBN0I7UUFDVyxlQUFVLEdBQW9CLEVBQUUsQ0FBQztRQUlqQyxVQUFLLEdBQThCLEVBQUUsQ0FBQztRQUNyQyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUE4QyxDQUFDO0lBV3pGLENBQUM7SUFUQyxTQUFTLENBQUMsR0FBVyxFQUFFLEdBQWtCO1FBQ3ZDLE9BQU8sR0FBRyxDQUFDLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBQ0QsV0FBVyxDQUFDLE1BQWEsRUFBRSxLQUFhO1FBQ3RDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQ3BCLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztZQUNoQyxLQUFLO1NBQ04sQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGLENBQUE7QUFoQlU7SUFBUixLQUFLLEVBQUU7b0RBQWtDO0FBQ2pDO0lBQVIsS0FBSyxFQUFFOytDQUFnQjtBQUNmO0lBQVIsS0FBSyxFQUFFO2tEQUFtQjtBQUNsQjtJQUFSLEtBQUssRUFBRTs4Q0FBVztBQUNWO0lBQVIsS0FBSyxFQUFFOytDQUF1QztBQUNyQztJQUFULE1BQU0sRUFBRTtxREFBOEU7QUFONUUsZ0JBQWdCO0lBMUI1QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsb0JBQW9CO1FBQzlCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQlQ7UUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtRQUMvQyxtQkFBbUIsRUFBRSxLQUFLO0tBQzNCLENBQUM7R0FDVyxnQkFBZ0IsQ0FpQjVCO1NBakJZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEVtb2ppQ2F0ZWdvcnkgfSBmcm9tICdAY3RybC9uZ3gtZW1vamktbWFydC9uZ3gtZW1vamknO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdlbW9qaS1tYXJ0LWFuY2hvcnMnLFxuICB0ZW1wbGF0ZTogYFxuICA8ZGl2IGNsYXNzPVwiZW1vamktbWFydC1hbmNob3JzXCI+XG4gICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1jYXRlZ29yeSBbbmdGb3JPZl09XCJjYXRlZ29yaWVzXCIgbGV0LWlkeD1cImluZGV4XCIgW25nRm9yVHJhY2tCeV09XCJ0cmFja0J5Rm5cIj5cbiAgICAgIDxzcGFuXG4gICAgICAgICpuZ0lmPVwiY2F0ZWdvcnkuYW5jaG9yICE9PSBmYWxzZVwiXG4gICAgICAgIFthdHRyLnRpdGxlXT1cImkxOG4uY2F0ZWdvcmllc1tjYXRlZ29yeS5pZF1cIlxuICAgICAgICAoY2xpY2spPVwidGhpcy5oYW5kbGVDbGljaygkZXZlbnQsIGlkeClcIlxuICAgICAgICBjbGFzcz1cImVtb2ppLW1hcnQtYW5jaG9yXCJcbiAgICAgICAgW2NsYXNzLmVtb2ppLW1hcnQtYW5jaG9yLXNlbGVjdGVkXT1cImNhdGVnb3J5Lm5hbWUgPT09IHNlbGVjdGVkXCJcbiAgICAgICAgW3N0eWxlLmNvbG9yXT1cImNhdGVnb3J5Lm5hbWUgPT09IHNlbGVjdGVkID8gY29sb3IgOiBudWxsXCJcbiAgICAgID5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCI+XG4gICAgICAgICAgICA8cGF0aCBbYXR0ci5kXT1cImljb25zW2NhdGVnb3J5LmlkXVwiIC8+XG4gICAgICAgICAgPC9zdmc+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8c3BhbiBjbGFzcz1cImVtb2ppLW1hcnQtYW5jaG9yLWJhclwiIFtzdHlsZS5iYWNrZ3JvdW5kLWNvbG9yXT1cImNvbG9yXCI+PC9zcGFuPlxuICAgICAgPC9zcGFuPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIDwvZGl2PlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG59KVxuZXhwb3J0IGNsYXNzIEFuY2hvcnNDb21wb25lbnQge1xuICBASW5wdXQoKSBjYXRlZ29yaWVzOiBFbW9qaUNhdGVnb3J5W10gPSBbXTtcbiAgQElucHV0KCkgY29sb3I/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNlbGVjdGVkPzogc3RyaW5nO1xuICBASW5wdXQoKSBpMThuOiBhbnk7XG4gIEBJbnB1dCgpIGljb25zOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG4gIEBPdXRwdXQoKSBhbmNob3JDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8eyBjYXRlZ29yeTogRW1vamlDYXRlZ29yeSwgaW5kZXg6IG51bWJlciB9PigpO1xuXG4gIHRyYWNrQnlGbihpZHg6IG51bWJlciwgY2F0OiBFbW9qaUNhdGVnb3J5KSB7XG4gICAgcmV0dXJuIGNhdC5pZDtcbiAgfVxuICBoYW5kbGVDbGljaygkZXZlbnQ6IEV2ZW50LCBpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5hbmNob3JDbGljay5lbWl0KHtcbiAgICAgIGNhdGVnb3J5OiB0aGlzLmNhdGVnb3JpZXNbaW5kZXhdLFxuICAgICAgaW5kZXgsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==