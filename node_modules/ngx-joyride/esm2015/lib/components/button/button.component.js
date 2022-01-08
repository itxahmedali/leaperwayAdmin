import { Component, Input, EventEmitter, Output } from "@angular/core";
export class JoyrideButtonComponent {
    constructor() {
        this.clicked = new EventEmitter();
    }
    onClick() {
        this.clicked.emit();
    }
}
JoyrideButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'joyride-button',
                template: "<button (mouseleave)=\"hover=false\" (mouseover)=\"hover=true\"\r\n    [ngStyle]=\"{'background-color': hover ? '#fff' : color, \r\n                'color': hover ? color : '#fff',\r\n                'border-color' : hover ? color : 'transparent'}\"\r\n    class=\"joyride-button\" (click)=\"onClick()\">\r\n    <ng-content></ng-content>\r\n</button>",
                styles: [".joyride-button{text-transform:uppercase;border:2px solid transparent;outline:none;padding:6px 12px;font-size:12px;font-weight:700;color:#fff;background-color:#3b5560;cursor:pointer}.joyride-button:hover{color:#3b5560;border:2px solid #3b5560;background-color:#fff}"]
            },] }
];
JoyrideButtonComponent.propDecorators = {
    color: [{ type: Input }],
    clicked: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1qb3lyaWRlL3NyYy9saWIvY29tcG9uZW50cy9idXR0b24vYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBT3ZFLE1BQU0sT0FBTyxzQkFBc0I7SUFMbkM7UUFZSSxZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFLcEQsQ0FBQztJQUhHLE9BQU87UUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7OztZQWhCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsMFdBQXNDOzthQUV6Qzs7O29CQUlJLEtBQUs7c0JBR0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdqb3lyaWRlLWJ1dHRvbicsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2J1dHRvbi5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBKb3lyaWRlQnV0dG9uQ29tcG9uZW50IHtcclxuICAgIGhvdmVyOiBib29sZWFuO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBcclxuICAgIGNvbG9yOiBzdHJpbmc7XHJcbiAgICBcclxuICAgIEBPdXRwdXQoKVxyXG4gICAgY2xpY2tlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgb25DbGljaygpIHtcclxuICAgICAgICB0aGlzLmNsaWNrZWQuZW1pdCgpO1xyXG4gICAgfVxyXG59Il19