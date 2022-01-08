import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
export class DomRefService {
    constructor(platformId) {
        this.platformId = platformId;
        this.fakeDocument = { body: {}, documentElement: {} };
        this.fakeWindow = { document: this.fakeDocument, navigator: {} };
    }
    getNativeWindow() {
        if (isPlatformBrowser(this.platformId))
            return window;
        else
            return this.fakeWindow;
    }
    getNativeDocument() {
        if (isPlatformBrowser(this.platformId))
            return document;
        else
            return this.fakeDocument;
    }
}
DomRefService.decorators = [
    { type: Injectable }
];
DomRefService.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtam95cmlkZS9zcmMvbGliL3NlcnZpY2VzL2RvbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUdwRCxNQUFNLE9BQU8sYUFBYTtJQUd0QixZQUF5QyxVQUFrQjtRQUFsQixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBRm5ELGlCQUFZLEdBQXVCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDckUsZUFBVSxHQUFtQixFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBQy9ELGVBQWU7UUFDWCxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFBRSxPQUFPLE1BQU0sQ0FBQzs7WUFDakQsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxpQkFBaUI7UUFDYixJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFBRSxPQUFPLFFBQVEsQ0FBQzs7WUFDbkQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQ2xDLENBQUM7OztZQWJKLFVBQVU7OztZQUk4QyxNQUFNLHVCQUE5QyxNQUFNLFNBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRG9tUmVmU2VydmljZSB7XHJcbiAgICBwcml2YXRlIGZha2VEb2N1bWVudDogRG9jdW1lbnQgPSA8RG9jdW1lbnQ+eyBib2R5OiB7fSwgZG9jdW1lbnRFbGVtZW50OiB7fSB9O1xyXG4gICAgcHJpdmF0ZSBmYWtlV2luZG93OiBXaW5kb3cgPSA8V2luZG93PnsgZG9jdW1lbnQ6IHRoaXMuZmFrZURvY3VtZW50LCBuYXZpZ2F0b3I6IHt9IH07XHJcbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCkge31cclxuICAgIGdldE5hdGl2ZVdpbmRvdygpOiBXaW5kb3cge1xyXG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSByZXR1cm4gd2luZG93O1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIHRoaXMuZmFrZVdpbmRvdztcclxuICAgIH1cclxuXHJcbiAgICBnZXROYXRpdmVEb2N1bWVudCgpIHtcclxuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkgcmV0dXJuIGRvY3VtZW50O1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIHRoaXMuZmFrZURvY3VtZW50O1xyXG4gICAgfVxyXG59Il19