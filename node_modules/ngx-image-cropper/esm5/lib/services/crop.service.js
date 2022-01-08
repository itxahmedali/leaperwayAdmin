/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/crop.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { resizeCanvas } from '../utils/resize.utils';
import * as i0 from "@angular/core";
var CropService = /** @class */ (function () {
    function CropService() {
    }
    /**
     * @param {?} sourceImage
     * @param {?} loadedImage
     * @param {?} cropper
     * @param {?} settings
     * @return {?}
     */
    CropService.prototype.crop = /**
     * @param {?} sourceImage
     * @param {?} loadedImage
     * @param {?} cropper
     * @param {?} settings
     * @return {?}
     */
    function (sourceImage, loadedImage, cropper, settings) {
        /** @type {?} */
        var imagePosition = this.getImagePosition(sourceImage, loadedImage, cropper, settings);
        /** @type {?} */
        var width = imagePosition.x2 - imagePosition.x1;
        /** @type {?} */
        var height = imagePosition.y2 - imagePosition.y1;
        /** @type {?} */
        var cropCanvas = (/** @type {?} */ (document.createElement('canvas')));
        cropCanvas.width = width;
        cropCanvas.height = height;
        /** @type {?} */
        var ctx = cropCanvas.getContext('2d');
        if (!ctx) {
            return;
        }
        if (settings.backgroundColor != null) {
            ctx.fillStyle = settings.backgroundColor;
            ctx.fillRect(0, 0, width, height);
        }
        /** @type {?} */
        var scaleX = (settings.transform.scale || 1) * (settings.transform.flipH ? -1 : 1);
        /** @type {?} */
        var scaleY = (settings.transform.scale || 1) * (settings.transform.flipV ? -1 : 1);
        /** @type {?} */
        var transformedImage = loadedImage.transformed;
        ctx.setTransform(scaleX, 0, 0, scaleY, transformedImage.size.width / 2, transformedImage.size.height / 2);
        ctx.translate(-imagePosition.x1 / scaleX, -imagePosition.y1 / scaleY);
        ctx.rotate((settings.transform.rotate || 0) * Math.PI / 180);
        ctx.drawImage(transformedImage.image, -transformedImage.size.width / 2, -transformedImage.size.height / 2);
        /** @type {?} */
        var output = {
            width: width, height: height,
            imagePosition: imagePosition,
            cropperPosition: tslib_1.__assign({}, cropper)
        };
        if (settings.containWithinAspectRatio) {
            output.offsetImagePosition = this.getOffsetImagePosition(sourceImage, loadedImage, cropper, settings);
        }
        /** @type {?} */
        var resizeRatio = this.getResizeRatio(width, height, settings);
        if (resizeRatio !== 1) {
            output.width = Math.round(width * resizeRatio);
            output.height = settings.maintainAspectRatio
                ? Math.round(output.width / settings.aspectRatio)
                : Math.round(height * resizeRatio);
            resizeCanvas(cropCanvas, output.width, output.height);
        }
        output.base64 = cropCanvas.toDataURL('image/' + settings.format, this.getQuality(settings));
        return output;
    };
    /**
     * @private
     * @param {?} sourceImage
     * @param {?} loadedImage
     * @param {?} cropper
     * @param {?} settings
     * @return {?}
     */
    CropService.prototype.getImagePosition = /**
     * @private
     * @param {?} sourceImage
     * @param {?} loadedImage
     * @param {?} cropper
     * @param {?} settings
     * @return {?}
     */
    function (sourceImage, loadedImage, cropper, settings) {
        /** @type {?} */
        var sourceImageElement = sourceImage.nativeElement;
        /** @type {?} */
        var ratio = loadedImage.transformed.size.width / sourceImageElement.offsetWidth;
        /** @type {?} */
        var out = {
            x1: Math.round(cropper.x1 * ratio),
            y1: Math.round(cropper.y1 * ratio),
            x2: Math.round(cropper.x2 * ratio),
            y2: Math.round(cropper.y2 * ratio)
        };
        if (!settings.containWithinAspectRatio) {
            out.x1 = Math.max(out.x1, 0);
            out.y1 = Math.max(out.y1, 0);
            out.x2 = Math.min(out.x2, loadedImage.transformed.size.width);
            out.y2 = Math.min(out.y2, loadedImage.transformed.size.height);
        }
        return out;
    };
    /**
     * @private
     * @param {?} sourceImage
     * @param {?} loadedImage
     * @param {?} cropper
     * @param {?} settings
     * @return {?}
     */
    CropService.prototype.getOffsetImagePosition = /**
     * @private
     * @param {?} sourceImage
     * @param {?} loadedImage
     * @param {?} cropper
     * @param {?} settings
     * @return {?}
     */
    function (sourceImage, loadedImage, cropper, settings) {
        /** @type {?} */
        var canvasRotation = settings.canvasRotation + loadedImage.exifTransform.rotate;
        /** @type {?} */
        var sourceImageElement = sourceImage.nativeElement;
        /** @type {?} */
        var ratio = loadedImage.transformed.size.width / sourceImageElement.offsetWidth;
        /** @type {?} */
        var offsetX;
        /** @type {?} */
        var offsetY;
        if (canvasRotation % 2) {
            offsetX = (loadedImage.transformed.size.width - loadedImage.original.size.height) / 2;
            offsetY = (loadedImage.transformed.size.height - loadedImage.original.size.width) / 2;
        }
        else {
            offsetX = (loadedImage.transformed.size.width - loadedImage.original.size.width) / 2;
            offsetY = (loadedImage.transformed.size.height - loadedImage.original.size.height) / 2;
        }
        /** @type {?} */
        var out = {
            x1: Math.round(cropper.x1 * ratio) - offsetX,
            y1: Math.round(cropper.y1 * ratio) - offsetY,
            x2: Math.round(cropper.x2 * ratio) - offsetX,
            y2: Math.round(cropper.y2 * ratio) - offsetY
        };
        if (!settings.containWithinAspectRatio) {
            out.x1 = Math.max(out.x1, 0);
            out.y1 = Math.max(out.y1, 0);
            out.x2 = Math.min(out.x2, loadedImage.transformed.size.width);
            out.y2 = Math.min(out.y2, loadedImage.transformed.size.height);
        }
        return out;
    };
    /**
     * @param {?} width
     * @param {?} height
     * @param {?} settings
     * @return {?}
     */
    CropService.prototype.getResizeRatio = /**
     * @param {?} width
     * @param {?} height
     * @param {?} settings
     * @return {?}
     */
    function (width, height, settings) {
        /** @type {?} */
        var ratioWidth = settings.resizeToWidth / width;
        /** @type {?} */
        var ratioHeight = settings.resizeToHeight / height;
        /** @type {?} */
        var ratios = new Array();
        if (settings.resizeToWidth > 0) {
            ratios.push(ratioWidth);
        }
        if (settings.resizeToHeight > 0) {
            ratios.push(ratioHeight);
        }
        /** @type {?} */
        var result = ratios.length === 0 ? 1 : Math.min.apply(Math, tslib_1.__spread(ratios));
        if (result > 1 && !settings.onlyScaleDown) {
            return result;
        }
        return Math.min(result, 1);
    };
    /**
     * @param {?} settings
     * @return {?}
     */
    CropService.prototype.getQuality = /**
     * @param {?} settings
     * @return {?}
     */
    function (settings) {
        return Math.min(1, Math.max(0, settings.imageQuality / 100));
    };
    CropService.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ CropService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function CropService_Factory() { return new CropService(); }, token: CropService, providedIn: "root" });
    return CropService;
}());
export { CropService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JvcC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWltYWdlLWNyb3BwZXIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvY3JvcC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBYyxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDOztBQUVyRDtJQUFBO0tBNkhDOzs7Ozs7OztJQTFIQywwQkFBSTs7Ozs7OztJQUFKLFVBQUssV0FBdUIsRUFBRSxXQUF3QixFQUFFLE9BQXdCLEVBQUUsUUFBeUI7O1lBQ25HLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDOztZQUNsRixLQUFLLEdBQUcsYUFBYSxDQUFDLEVBQUUsR0FBRyxhQUFhLENBQUMsRUFBRTs7WUFDM0MsTUFBTSxHQUFHLGFBQWEsQ0FBQyxFQUFFLEdBQUcsYUFBYSxDQUFDLEVBQUU7O1lBQzVDLFVBQVUsR0FBRyxtQkFBQSxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFxQjtRQUN4RSxVQUFVLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN6QixVQUFVLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzs7WUFFckIsR0FBRyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDUixPQUFPO1NBQ1I7UUFDRCxJQUFJLFFBQVEsQ0FBQyxlQUFlLElBQUksSUFBSSxFQUFFO1lBQ3BDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQztZQUN6QyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ25DOztZQUVLLE1BQU0s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Q0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQVIsSUFBSSxtQkFBUSxNQUFNLEVBQUM7UUFFNUQsSUFBSSxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRTtZQUN6QyxPQUFPLE1BQU0sQ0FBQztTQUNmO1FBQ0QsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM3QixDQUFDOzs7OztJQUVELGdDQUFVOzs7O0lBQVYsVUFBVyxRQUF5QjtRQUNsQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDOztnQkE1SEYsVUFBVSxTQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7O3NCQUxoQztDQWtJQyxBQTdIRCxJQTZIQztTQTVIWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ3JvcHBlclNldHRpbmdzIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9jcm9wcGVyLnNldHRpbmdzJztcbmltcG9ydCB7IENyb3BwZXJQb3NpdGlvbiwgSW1hZ2VDcm9wcGVkRXZlbnQsIExvYWRlZEltYWdlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyByZXNpemVDYW52YXMgfSBmcm9tICcuLi91dGlscy9yZXNpemUudXRpbHMnO1xuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBDcm9wU2VydmljZSB7XG5cbiAgY3JvcChzb3VyY2VJbWFnZTogRWxlbWVudFJlZiwgbG9hZGVkSW1hZ2U6IExvYWRlZEltYWdlLCBjcm9wcGVyOiBDcm9wcGVyUG9zaXRpb24sIHNldHRpbmdzOiBDcm9wcGVyU2V0dGluZ3MpOiBJbWFnZUNyb3BwZWRFdmVudCB8IG51bGwge1xuICAgIGNvbnN0IGltYWdlUG9zaXRpb24gPSB0aGlzLmdldEltYWdlUG9zaXRpb24oc291cmNlSW1hZ2UsIGxvYWRlZEltYWdlLCBjcm9wcGVyLCBzZXR0aW5ncyk7XG4gICAgY29uc3Qgd2lkdGggPSBpbWFnZVBvc2l0aW9uLngyIC0gaW1hZ2VQb3NpdGlvbi54MTtcbiAgICBjb25zdCBoZWlnaHQgPSBpbWFnZVBvc2l0aW9uLnkyIC0gaW1hZ2VQb3NpdGlvbi55MTtcbiAgICBjb25zdCBjcm9wQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJykgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgY3JvcENhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgIGNyb3BDYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgY29uc3QgY3R4ID0gY3JvcENhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGlmICghY3R4KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChzZXR0aW5ncy5iYWNrZ3JvdW5kQ29sb3IgIT0gbnVsbCkge1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IHNldHRpbmdzLmJhY2tncm91bmRDb2xvcjtcbiAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBjb25zdCBzY2FsZVggPSAoc2V0dGluZ3MudHJhbnNmb3JtLnNjYWxlIHx8IDEpICogKHNldHRpbmdzLnRyYW5zZm9ybS5mbGlwSCA/IC0xIDogMSk7XG4gICAgY29uc3Qgc2NhbGVZID0gKHNldHRpbmdzLnRyYW5zZm9ybS5zY2FsZSB8fCAxKSAqIChzZXR0aW5ncy50cmFuc2Zvcm0uZmxpcFYgPyAtMSA6IDEpO1xuXG4gICAgY29uc3QgdHJhbnNmb3JtZWRJbWFnZSA9IGxvYWRlZEltYWdlLnRyYW5zZm9ybWVkO1xuICAgIGN0eC5zZXRUcmFuc2Zvcm0oc2NhbGVYLCAwLCAwLCBzY2FsZVksIHRyYW5zZm9ybWVkSW1hZ2Uuc2l6ZS53aWR0aCAvIDIsIHRyYW5zZm9ybWVkSW1hZ2Uuc2l6ZS5oZWlnaHQgLyAyKTtcbiAgICBjdHgudHJhbnNsYXRlKC1pbWFnZVBvc2l0aW9uLngxIC8gc2NhbGVYLCAtaW1hZ2VQb3NpdGlvbi55MSAvIHNjYWxlWSk7XG4gICAgY3R4LnJvdGF0ZSgoc2V0dGluZ3MudHJhbnNmb3JtLnJvdGF0ZSB8fCAwKSAqIE1hdGguUEkgLyAxODApO1xuICAgIGN0eC5kcmF3SW1hZ2UodHJhbnNmb3JtZWRJbWFnZS5pbWFnZSwgLXRyYW5zZm9ybWVkSW1hZ2Uuc2l6ZS53aWR0aCAvIDIsIC10cmFuc2Zvcm1lZEltYWdlLnNpemUuaGVpZ2h0IC8gMik7XG5cbiAgICBjb25zdCBvdXRwdXQ6IEltYWdlQ3JvcHBlZEV2ZW50ID0ge1xuICAgICAgd2lkdGgsIGhlaWdodCxcbiAgICAgIGltYWdlUG9zaXRpb24sXG4gICAgICBjcm9wcGVyUG9zaXRpb246IHsuLi5jcm9wcGVyfVxuICAgIH07XG4gICAgaWYgKHNldHRpbmdzLmNvbnRhaW5XaXRoaW5Bc3BlY3RSYXRpbykge1xuICAgICAgb3V0cHV0Lm9mZnNldEltYWdlUG9zaXRpb24gPSB0aGlzLmdldE9mZnNldEltYWdlUG9zaXRpb24oc291cmNlSW1hZ2UsIGxvYWRlZEltYWdlLCBjcm9wcGVyLCBzZXR0aW5ncyk7XG4gICAgfVxuICAgIGNvbnN0IHJlc2l6ZVJhdGlvID0gdGhpcy5nZXRSZXNpemVSYXRpbyh3aWR0aCwgaGVpZ2h0LCBzZXR0aW5ncyk7XG4gICAgaWYgKHJlc2l6ZVJhdGlvICE9PSAxKSB7XG4gICAgICBvdXRwdXQud2lkdGggPSBNYXRoLnJvdW5kKHdpZHRoICogcmVzaXplUmF0aW8pO1xuICAgICAgb3V0cHV0LmhlaWdodCA9IHNldHRpbmdzLm1haW50YWluQXNwZWN0UmF0aW9cbiAgICAgICAgPyBNYXRoLnJvdW5kKG91dHB1dC53aWR0aCAvIHNldHRpbmdzLmFzcGVjdFJhdGlvKVxuICAgICAgICA6IE1hdGgucm91bmQoaGVpZ2h0ICogcmVzaXplUmF0aW8pO1xuICAgICAgcmVzaXplQ2FudmFzKGNyb3BDYW52YXMsIG91dHB1dC53aWR0aCwgb3V0cHV0LmhlaWdodCk7XG4gICAgfVxuICAgIG91dHB1dC5iYXNlNjQgPSBjcm9wQ2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvJyArIHNldHRpbmdzLmZvcm1hdCwgdGhpcy5nZXRRdWFsaXR5KHNldHRpbmdzKSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0SW1hZ2VQb3NpdGlvbihzb3VyY2VJbWFnZTogRWxlbWVudFJlZiwgbG9hZGVkSW1hZ2U6IExvYWRlZEltYWdlLCBjcm9wcGVyOiBDcm9wcGVyUG9zaXRpb24sIHNldHRpbmdzOiBDcm9wcGVyU2V0dGluZ3MpOiBDcm9wcGVyUG9zaXRpb24ge1xuICAgIGNvbnN0IHNvdXJjZUltYWdlRWxlbWVudCA9IHNvdXJjZUltYWdlLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgcmF0aW8gPSBsb2FkZWRJbWFnZS50cmFuc2Zvcm1lZC5zaXplLndpZHRoIC8gc291cmNlSW1hZ2VFbGVtZW50Lm9mZnNldFdpZHRoO1xuXG4gICAgY29uc3Qgb3V0OiBDcm9wcGVyUG9zaXRpb24gPSB7XG4gICAgICB4MTogTWF0aC5yb3VuZChjcm9wcGVyLngxICogcmF0aW8pLFxuICAgICAgeTE6IE1hdGgucm91bmQoY3JvcHBlci55MSAqIHJhdGlvKSxcbiAgICAgIHgyOiBNYXRoLnJvdW5kKGNyb3BwZXIueDIgKiByYXRpbyksXG4gICAgICB5MjogTWF0aC5yb3VuZChjcm9wcGVyLnkyICogcmF0aW8pXG4gICAgfTtcblxuICAgIGlmICghc2V0dGluZ3MuY29udGFpbldpdGhpbkFzcGVjdFJhdGlvKSB7XG4gICAgICBvdXQueDEgPSBNYXRoLm1heChvdXQueDEsIDApO1xuICAgICAgb3V0LnkxID0gTWF0aC5tYXgob3V0LnkxLCAwKTtcbiAgICAgIG91dC54MiA9IE1hdGgubWluKG91dC54MiwgbG9hZGVkSW1hZ2UudHJhbnNmb3JtZWQuc2l6ZS53aWR0aCk7XG4gICAgICBvdXQueTIgPSBNYXRoLm1pbihvdXQueTIsIGxvYWRlZEltYWdlLnRyYW5zZm9ybWVkLnNpemUuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRPZmZzZXRJbWFnZVBvc2l0aW9uKHNvdXJjZUltYWdlOiBFbGVtZW50UmVmLCBsb2FkZWRJbWFnZTogTG9hZGVkSW1hZ2UsIGNyb3BwZXI6IENyb3BwZXJQb3NpdGlvbiwgc2V0dGluZ3M6IENyb3BwZXJTZXR0aW5ncyk6IENyb3BwZXJQb3NpdGlvbiB7XG4gICAgY29uc3QgY2FudmFzUm90YXRpb24gPSBzZXR0aW5ncy5jYW52YXNSb3RhdGlvbiArIGxvYWRlZEltYWdlLmV4aWZUcmFuc2Zvcm0ucm90YXRlO1xuICAgIGNvbnN0IHNvdXJjZUltYWdlRWxlbWVudCA9IHNvdXJjZUltYWdlLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgcmF0aW8gPSBsb2FkZWRJbWFnZS50cmFuc2Zvcm1lZC5zaXplLndpZHRoIC8gc291cmNlSW1hZ2VFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgIGxldCBvZmZzZXRYOiBudW1iZXI7XG4gICAgbGV0IG9mZnNldFk6IG51bWJlcjtcblxuICAgIGlmIChjYW52YXNSb3RhdGlvbiAlIDIpIHtcbiAgICAgIG9mZnNldFggPSAobG9hZGVkSW1hZ2UudHJhbnNmb3JtZWQuc2l6ZS53aWR0aCAtIGxvYWRlZEltYWdlLm9yaWdpbmFsLnNpemUuaGVpZ2h0KSAvIDI7XG4gICAgICBvZmZzZXRZID0gKGxvYWRlZEltYWdlLnRyYW5zZm9ybWVkLnNpemUuaGVpZ2h0IC0gbG9hZGVkSW1hZ2Uub3JpZ2luYWwuc2l6ZS53aWR0aCkgLyAyO1xuICAgIH0gZWxzZSB7XG4gICAgICBvZmZzZXRYID0gKGxvYWRlZEltYWdlLnRyYW5zZm9ybWVkLnNpemUud2lkdGggLSBsb2FkZWRJbWFnZS5vcmlnaW5hbC5zaXplLndpZHRoKSAvIDI7XG4gICAgICBvZmZzZXRZID0gKGxvYWRlZEltYWdlLnRyYW5zZm9ybWVkLnNpemUuaGVpZ2h0IC0gbG9hZGVkSW1hZ2Uub3JpZ2luYWwuc2l6ZS5oZWlnaHQpIC8gMjtcbiAgICB9XG5cbiAgICBjb25zdCBvdXQ6IENyb3BwZXJQb3NpdGlvbiA9IHtcbiAgICAgIHgxOiBNYXRoLnJvdW5kKGNyb3BwZXIueDEgKiByYXRpbykgLSBvZmZzZXRYLFxuICAgICAgeTE6IE1hdGgucm91bmQoY3JvcHBlci55MSAqIHJhdGlvKSAtIG9mZnNldFksXG4gICAgICB4MjogTWF0aC5yb3VuZChjcm9wcGVyLngyICogcmF0aW8pIC0gb2Zmc2V0WCxcbiAgICAgIHkyOiBNYXRoLnJvdW5kKGNyb3BwZXIueTIgKiByYXRpbykgLSBvZmZzZXRZXG4gICAgfTtcblxuICAgIGlmICghc2V0dGluZ3MuY29udGFpbldpdGhpbkFzcGVjdFJhdGlvKSB7XG4gICAgICBvdXQueDEgPSBNYXRoLm1heChvdXQueDEsIDApO1xuICAgICAgb3V0LnkxID0gTWF0aC5tYXgob3V0LnkxLCAwKTtcbiAgICAgIG91dC54MiA9IE1hdGgubWluKG91dC54MiwgbG9hZGVkSW1hZ2UudHJhbnNmb3JtZWQuc2l6ZS53aWR0aCk7XG4gICAgICBvdXQueTIgPSBNYXRoLm1pbihvdXQueTIsIGxvYWRlZEltYWdlLnRyYW5zZm9ybWVkLnNpemUuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xuICB9XG5cbiAgZ2V0UmVzaXplUmF0aW8od2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHNldHRpbmdzOiBDcm9wcGVyU2V0dGluZ3MpOiBudW1iZXIge1xuICAgIGNvbnN0IHJhdGlvV2lkdGggPSBzZXR0aW5ncy5yZXNpemVUb1dpZHRoIC8gd2lkdGg7XG4gICAgY29uc3QgcmF0aW9IZWlnaHQgPSBzZXR0aW5ncy5yZXNpemVUb0hlaWdodCAvIGhlaWdodDtcbiAgICBjb25zdCByYXRpb3MgPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xuXG4gICAgaWYgKHNldHRpbmdzLnJlc2l6ZVRvV2lkdGggPiAwKSB7XG4gICAgICByYXRpb3MucHVzaChyYXRpb1dpZHRoKTtcbiAgICB9XG4gICAgaWYgKHNldHRpbmdzLnJlc2l6ZVRvSGVpZ2h0ID4gMCkge1xuICAgICAgcmF0aW9zLnB1c2gocmF0aW9IZWlnaHQpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IHJhdGlvcy5sZW5ndGggPT09IDAgPyAxIDogTWF0aC5taW4oLi4ucmF0aW9zKTtcblxuICAgIGlmIChyZXN1bHQgPiAxICYmICFzZXR0aW5ncy5vbmx5U2NhbGVEb3duKSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZXR1cm4gTWF0aC5taW4ocmVzdWx0LCAxKTtcbiAgfVxuXG4gIGdldFF1YWxpdHkoc2V0dGluZ3M6IENyb3BwZXJTZXR0aW5ncyk6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGgubWluKDEsIE1hdGgubWF4KDAsIHNldHRpbmdzLmltYWdlUXVhbGl0eSAvIDEwMCkpO1xuICB9XG59XG4iXX0=