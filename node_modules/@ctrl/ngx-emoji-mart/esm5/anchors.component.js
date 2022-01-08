import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
var AnchorsComponent = /** @class */ (function () {
    function AnchorsComponent() {
        this.categories = [];
        this.icons = {};
        this.anchorClick = new EventEmitter();
    }
    AnchorsComponent.prototype.trackByFn = function (idx, cat) {
        return cat.id;
    };
    AnchorsComponent.prototype.handleClick = function ($event, index) {
        this.anchorClick.emit({
            category: this.categories[index],
            index: index,
        });
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
            template: "\n  <div class=\"emoji-mart-anchors\">\n    <ng-template ngFor let-category [ngForOf]=\"categories\" let-idx=\"index\" [ngForTrackBy]=\"trackByFn\">\n      <span\n        *ngIf=\"category.anchor !== false\"\n        [attr.title]=\"i18n.categories[category.id]\"\n        (click)=\"this.handleClick($event, idx)\"\n        class=\"emoji-mart-anchor\"\n        [class.emoji-mart-anchor-selected]=\"category.name === selected\"\n        [style.color]=\"category.name === selected ? color : null\"\n      >\n        <div>\n          <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\">\n            <path [attr.d]=\"icons[category.id]\" />\n          </svg>\n        </div>\n        <span class=\"emoji-mart-anchor-bar\" [style.background-color]=\"color\"></span>\n      </span>\n    </ng-template>\n  </div>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            preserveWhitespaces: false
        })
    ], AnchorsComponent);
    return AnchorsComponent;
}());
export { AnchorsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5jaG9ycy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY3RybC9uZ3gtZW1vamktbWFydC8iLCJzb3VyY2VzIjpbImFuY2hvcnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQThCdkI7SUFBQTtRQUNXLGVBQVUsR0FBb0IsRUFBRSxDQUFDO1FBSWpDLFVBQUssR0FBOEIsRUFBRSxDQUFDO1FBQ3JDLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQThDLENBQUM7SUFXekYsQ0FBQztJQVRDLG9DQUFTLEdBQVQsVUFBVSxHQUFXLEVBQUUsR0FBa0I7UUFDdkMsT0FBTyxHQUFHLENBQUMsRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxzQ0FBVyxHQUFYLFVBQVksTUFBYSxFQUFFLEtBQWE7UUFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDcEIsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1lBQ2hDLEtBQUssT0FBQTtTQUNOLENBQUMsQ0FBQztJQUNMLENBQUM7SUFmUTtRQUFSLEtBQUssRUFBRTt3REFBa0M7SUFDakM7UUFBUixLQUFLLEVBQUU7bURBQWdCO0lBQ2Y7UUFBUixLQUFLLEVBQUU7c0RBQW1CO0lBQ2xCO1FBQVIsS0FBSyxFQUFFO2tEQUFXO0lBQ1Y7UUFBUixLQUFLLEVBQUU7bURBQXVDO0lBQ3JDO1FBQVQsTUFBTSxFQUFFO3lEQUE4RTtJQU41RSxnQkFBZ0I7UUExQjVCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsUUFBUSxFQUFFLGkxQkFvQlQ7WUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtZQUMvQyxtQkFBbUIsRUFBRSxLQUFLO1NBQzNCLENBQUM7T0FDVyxnQkFBZ0IsQ0FpQjVCO0lBQUQsdUJBQUM7Q0FBQSxBQWpCRCxJQWlCQztTQWpCWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBFbW9qaUNhdGVnb3J5IH0gZnJvbSAnQGN0cmwvbmd4LWVtb2ppLW1hcnQvbmd4LWVtb2ppJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZW1vamktbWFydC1hbmNob3JzJyxcbiAgdGVtcGxhdGU6IGBcbiAgPGRpdiBjbGFzcz1cImVtb2ppLW1hcnQtYW5jaG9yc1wiPlxuICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtY2F0ZWdvcnkgW25nRm9yT2ZdPVwiY2F0ZWdvcmllc1wiIGxldC1pZHg9XCJpbmRleFwiIFtuZ0ZvclRyYWNrQnldPVwidHJhY2tCeUZuXCI+XG4gICAgICA8c3BhblxuICAgICAgICAqbmdJZj1cImNhdGVnb3J5LmFuY2hvciAhPT0gZmFsc2VcIlxuICAgICAgICBbYXR0ci50aXRsZV09XCJpMThuLmNhdGVnb3JpZXNbY2F0ZWdvcnkuaWRdXCJcbiAgICAgICAgKGNsaWNrKT1cInRoaXMuaGFuZGxlQ2xpY2soJGV2ZW50LCBpZHgpXCJcbiAgICAgICAgY2xhc3M9XCJlbW9qaS1tYXJ0LWFuY2hvclwiXG4gICAgICAgIFtjbGFzcy5lbW9qaS1tYXJ0LWFuY2hvci1zZWxlY3RlZF09XCJjYXRlZ29yeS5uYW1lID09PSBzZWxlY3RlZFwiXG4gICAgICAgIFtzdHlsZS5jb2xvcl09XCJjYXRlZ29yeS5uYW1lID09PSBzZWxlY3RlZCA/IGNvbG9yIDogbnVsbFwiXG4gICAgICA+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiPlxuICAgICAgICAgICAgPHBhdGggW2F0dHIuZF09XCJpY29uc1tjYXRlZ29yeS5pZF1cIiAvPlxuICAgICAgICAgIDwvc3ZnPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJlbW9qaS1tYXJ0LWFuY2hvci1iYXJcIiBbc3R5bGUuYmFja2dyb3VuZC1jb2xvcl09XCJjb2xvclwiPjwvc3Bhbj5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICA8L2Rpdj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxufSlcbmV4cG9ydCBjbGFzcyBBbmNob3JzQ29tcG9uZW50IHtcbiAgQElucHV0KCkgY2F0ZWdvcmllczogRW1vamlDYXRlZ29yeVtdID0gW107XG4gIEBJbnB1dCgpIGNvbG9yPzogc3RyaW5nO1xuICBASW5wdXQoKSBzZWxlY3RlZD86IHN0cmluZztcbiAgQElucHV0KCkgaTE4bjogYW55O1xuICBASW5wdXQoKSBpY29uczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuICBAT3V0cHV0KCkgYW5jaG9yQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPHsgY2F0ZWdvcnk6IEVtb2ppQ2F0ZWdvcnksIGluZGV4OiBudW1iZXIgfT4oKTtcblxuICB0cmFja0J5Rm4oaWR4OiBudW1iZXIsIGNhdDogRW1vamlDYXRlZ29yeSkge1xuICAgIHJldHVybiBjYXQuaWQ7XG4gIH1cbiAgaGFuZGxlQ2xpY2soJGV2ZW50OiBFdmVudCwgaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuYW5jaG9yQ2xpY2suZW1pdCh7XG4gICAgICBjYXRlZ29yeTogdGhpcy5jYXRlZ29yaWVzW2luZGV4XSxcbiAgICAgIGluZGV4LFxuICAgIH0pO1xuICB9XG59XG4iXX0=