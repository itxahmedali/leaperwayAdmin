/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/load-image.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { getTransformationsFromExifData, supportsAutomaticRotation } from '../utils/exif.utils';
import * as i0 from "@angular/core";
/**
 * @record
 */
function LoadImageBase64() { }
if (false) {
    /** @type {?} */
    LoadImageBase64.prototype.originalImage;
    /** @type {?} */
    LoadImageBase64.prototype.originalBase64;
}
var LoadImageService = /** @class */ (function () {
    function LoadImageService() {
        this.autoRotateSupported = supportsAutomaticRotation();
    }
    /**
     * @param {?} file
     * @param {?} cropperSettings
     * @return {?}
     */
    LoadImageService.prototype.loadImageFile = /**
     * @param {?} file
     * @param {?} cropperSettings
     * @return {?}
     */
    function (file, cropperSettings) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            /** @type {?} */
            var fileReader = new FileReader();
            fileReader.onload = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                _this.loadImage(event.target.result, file.type, cropperSettings)
                    .then(resolve)
                    .catch(reject);
            });
            fileReader.readAsDataURL(file);
        }));
    };
    /**
     * @private
     * @param {?} imageBase64
     * @param {?} imageType
     * @param {?} cropperSettings
     * @return {?}
     */
    LoadImageService.prototype.loadImage = /**
     * @private
     * @param {?} imageBase64
     * @param {?} imageType
     * @param {?} cropperSettings
     * @return {?}
     */
    function (imageBase64, imageType, cropperSettings) {
        if (!this.isValidImageType(imageType)) {
            return Promise.reject(new Error('Invalid image type'));
        }
        return this.loadBase64Image(imageBase64, cropperSettings);
    };
    /**
     * @private
     * @param {?} type
     * @return {?}
     */
    LoadImageService.prototype.isValidImageType = /**
     * @private
     * @param {?} type
     * @return {?}
     */
    function (type) {
        return /image\/(png|jpg|jpeg|bmp|gif|tiff|webp)/.test(type);
    };
    /**
     * @param {?} url
     * @param {?} cropperSettings
     * @return {?}
     */
    LoadImageService.prototype.loadImageFromURL = /**
     * @param {?} url
     * @param {?} cropperSettings
     * @return {?}
     */
    function (url, cropperSettings) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            /** @type {?} */
            var img = new Image();
            img.onerror = (/**
             * @return {?}
             */
            function () { return reject; });
            img.onload = (/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var canvas = document.createElement('canvas');
                /** @type {?} */
                var context = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0);
                _this.loadBase64Image(canvas.toDataURL(), cropperSettings).then(resolve);
            });
            img.crossOrigin = 'anonymous';
            img.src = url;
        }));
    };
    /**
     * @param {?} imageBase64
     * @param {?} cropperSettings
     * @return {?}
     */
    LoadImageService.prototype.loadBase64Image = /**
     * @param {?} imageBase64
     * @param {?} cropperSettings
     * @return {?}
     */
    function (imageBase64, cropperSettings) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            /** @type {?} */
            var originalImage = new Image();
            originalImage.onload = (/**
             * @return {?}
             */
            function () { return resolve({
                originalImage: originalImage,
                originalBase64: imageBase64
            }); });
            originalImage.onerror = reject;
            originalImage.src = imageBase64;
        })).then((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return _this.transformImageBase64(res, cropperSettings); }));
    };
    /**
     * @private
     * @param {?} res
     * @param {?} cropperSettings
     * @return {?}
     */
    LoadImageService.prototype.transformImageBase64 = /**
     * @private
     * @param {?} res
     * @param {?} cropperSettings
     * @return {?}
     */
    function (res, cropperSettings) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var autoRotate, exifTransform, loadedImage;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.autoRotateSupported];
                    case 1:
                        autoRotate = _a.sent();
                        return [4 /*yield*/, getTransformationsFromExifData(autoRotate ? -1 : res.originalBase64)];
                    case 2:
                        exifTransform = _a.sent();
                        if (!res.originalImage || !res.originalImage.complete) {
                            return [2 /*return*/, Promise.reject(new Error('No image loaded'))];
                        }
                        loadedImage = {
                            original: {
                                base64: res.originalBase64,
                                image: res.originalImage,
                                size: {
                                    width: res.originalImage.naturalWidth,
                                    height: res.originalImage.naturalHeight
                                }
                            },
                            exifTransform: exifTransform
                        };
                        return [2 /*return*/, this.transformLoadedImage(loadedImage, cropperSettings)];
                }
            });
        });
    };
    /**
     * @param {?} loadedImage
     * @param {?} cropperSettings
     * @return {?}
     */
    LoadImageService.prototype.transformLoadedImage = /**
     * @param {?} loadedImage
     * @param {?} cropperSettings
     * @return {?}
     */
    function (loadedImage, cropperSettings) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var canvasRotation, originalSize, transformedSize, canvas, ctx, transformedBase64, transformedImage;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        canvasRotation = cropperSettings.canvasRotation + loadedImage.exifTransform.rotate;
                        originalSize = {
                            width: loadedImage.original.image.naturalWidth,
                            height: loadedImage.original.image.naturalHeight
                        };
                        if (canvasRotation === 0 && !loadedImage.exifTransform.flip && !cropperSettings.containWithinAspectRatio) {
                            return [2 /*return*/, {
                                    original: {
                                        base64: loadedImage.original.base64,
                                        image: loadedImage.original.image,
                                        size: tslib_1.__assign({}, originalSize)
                                    },
                                    transformed: {
                                        base64: loadedImage.original.base64,
                                        image: loadedImage.original.image,
                                        size: tslib_1.__assign({}, originalSize)
                                    },
                                    exifTransform: loadedImage.exifTransform
                                }];
                        }
                        transformedSize = this.getTransformedSize(originalSize, loadedImage.exifTransform, cropperSettings);
                        canvas = document.createElement('canvas');
                        canvas.width = transformedSize.width;
                        canvas.height = transformedSize.height;
                        ctx = canvas.getContext('2d');
                        ctx.setTransform(loadedImage.exifTransform.flip ? -1 : 1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
                        ctx.rotate(Math.PI * (canvasRotation / 2));
                        ctx.drawImage(loadedImage.original.image, -originalSize.width / 2, -originalSize.height / 2);
                        transformedBase64 = canvas.toDataURL();
                        return [4 /*yield*/, this.loadImageFromBase64(transformedBase64)];
                    case 1:
                        transformedImage = _a.sent();
                        return [2 /*return*/, {
                                original: {
                                    base64: loadedImage.original.base64,
                                    image: loadedImage.original.image,
                                    size: tslib_1.__assign({}, originalSize)
                                },
                                transformed: {
                                    base64: transformedBase64,
                                    image: transformedImage,
                                    size: {
                                        width: transformedImage.width,
                                        height: transformedImage.height
                                    }
                                },
                                exifTransform: loadedImage.exifTransform
                            }];
                }
            });
        });
    };
    /**
     * @private
     * @param {?} imageBase64
     * @return {?}
     */
    LoadImageService.prototype.loadImageFromBase64 = /**
     * @private
     * @param {?} imageBase64
     * @return {?}
     */
    function (imageBase64) {
        return new Promise(((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            /** @type {?} */
            var image = new Image();
            image.onload = (/**
             * @return {?}
             */
            function () { return resolve(image); });
            image.onerror = reject;
            image.src = imageBase64;
        })));
    };
    /**
     * @private
     * @param {?} originalSize
     * @param {?} exifTransform
     * @param {?} cropperSettings
     * @return {?}
     */
    LoadImageService.prototype.getTransformedSize = /**
     * @private
     * @param {?} originalSize
     * @param {?} exifTransform
     * @param {?} cropperSettings
     * @return {?}
     */
    function (originalSize, exifTransform, cropperSettings) {
        /** @type {?} */
        var canvasRotation = cropperSettings.canvasRotation + exifTransform.rotate;
        if (cropperSettings.containWithinAspectRatio) {
            if (canvasRotation % 2) {
                /** @type {?} */
                var minWidthToContain = originalSize.width * cropperSettings.aspectRatio;
                /** @type {?} */
                var minHeightToContain = originalSize.height / cropperSettings.aspectRatio;
                return {
                    width: Math.max(originalSize.height, minWidthToContain),
                    height: Math.max(originalSize.width, minHeightToContain)
                };
            }
            else {
                /** @type {?} */
                var minWidthToContain = originalSize.height * cropperSettings.aspectRatio;
                /** @type {?} */
                var minHeightToContain = originalSize.width / cropperSettings.aspectRatio;
                return {
                    width: Math.max(originalSize.width, minWidthToContain),
                    height: Math.max(originalSize.height, minHeightToContain)
                };
            }
        }
        if (canvasRotation % 2) {
            return {
                height: originalSize.width,
                width: originalSize.height
            };
        }
        return {
            width: originalSize.width,
            height: originalSize.height
        };
    };
    LoadImageService.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ LoadImageService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function LoadImageService_Factory() { return new LoadImageService(); }, token: LoadImageService, providedIn: "root" });
    return LoadImageService;
}());
export { LoadImageService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    LoadImageService.prototype.autoRotateSupported;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZC1pbWFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWltYWdlLWNyb3BwZXIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbG9hZC1pbWFnZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsT0FBTyxFQUFFLDhCQUE4QixFQUFFLHlCQUF5QixFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7O0FBRWhHLDhCQUdDOzs7SUFGQyx3Q0FBZ0M7O0lBQ2hDLHlDQUF1Qjs7QUFHekI7SUFBQTtRQUdVLHdCQUFtQixHQUFxQix5QkFBeUIsRUFBRSxDQUFDO0tBbUw3RTs7Ozs7O0lBakxDLHdDQUFhOzs7OztJQUFiLFVBQWMsSUFBVSxFQUFFLGVBQWdDO1FBQTFELGlCQVVDO1FBVEMsT0FBTyxJQUFJLE9BQU87Ozs7O1FBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTs7Z0JBQzNCLFVBQVUsR0FBRyxJQUFJLFVBQVUsRUFBRTtZQUNuQyxVQUFVLENBQUMsTUFBTTs7OztZQUFHLFVBQUMsS0FBVTtnQkFDN0IsS0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQztxQkFDNUQsSUFBSSxDQUFDLE9BQU8sQ0FBQztxQkFDYixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkIsQ0FBQyxDQUFBLENBQUM7WUFDRixVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7Ozs7SUFFTyxvQ0FBUzs7Ozs7OztJQUFqQixVQUFrQixXQUFtQixFQUFFLFNBQWlCLEVBQUUsZUFBZ0M7UUFDeEYsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNyQyxPQUFP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VztnQkFDNUUsT0FBTztvQkFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLGlCQUFpQixDQUFDO29CQUN2RCxNQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLGtCQUFrQixDQUFDO2lCQUN6RCxDQUFDO2FBQ0g7aUJBQU07O29CQUNDLGlCQUFpQixHQUFHLFlBQVksQ0FBQyxNQUFNLEdBQUcsZUFBZSxDQUFDLFdBQVc7O29CQUNyRSxrQkFBa0IsR0FBRyxZQUFZLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQyxXQUFXO2dCQUMzRSxPQUFPO29CQUNMLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLENBQUM7b0JBQ3RELE1BQU0sRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLENBQUM7aUJBQzFELENBQUM7YUFDSDtTQUNGO1FBRUQsSUFBSSxjQUFjLEdBQUcsQ0FBQyxFQUFFO1lBQ3RCLE9BQU87Z0JBQ0wsTUFBTSxFQUFFLFlBQVksQ0FBQyxLQUFLO2dCQUMxQixLQUFLLEVBQUUsWUFBWSxDQUFDLE1BQU07YUFDM0IsQ0FBQztTQUNIO1FBQ0QsT0FBTztZQUNMLEtBQUssRUFBRSxZQUFZLENBQUMsS0FBSztZQUN6QixNQUFNLEVBQUUsWUFBWSxDQUFDLE1BQU07U0FDNUIsQ0FBQztJQUNKLENBQUM7O2dCQXJMRixVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOzs7MkJBWGhDO0NBaU1DLEFBdExELElBc0xDO1NBckxZLGdCQUFnQjs7Ozs7O0lBRTNCLCtDQUE0RSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERpbWVuc2lvbnMsIExvYWRlZEltYWdlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBDcm9wcGVyU2V0dGluZ3MgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2Nyb3BwZXIuc2V0dGluZ3MnO1xuaW1wb3J0IHsgRXhpZlRyYW5zZm9ybSB9IGZyb20gJy4uL2ludGVyZmFjZXMvZXhpZi10cmFuc2Zvcm0uaW50ZXJmYWNlJztcbmltcG9ydCB7IGdldFRyYW5zZm9ybWF0aW9uc0Zyb21FeGlmRGF0YSwgc3VwcG9ydHNBdXRvbWF0aWNSb3RhdGlvbiB9IGZyb20gJy4uL3V0aWxzL2V4aWYudXRpbHMnO1xuXG5pbnRlcmZhY2UgTG9hZEltYWdlQmFzZTY0IHtcbiAgb3JpZ2luYWxJbWFnZTogSFRNTEltYWdlRWxlbWVudDtcbiAgb3JpZ2luYWxCYXNlNjQ6IHN0cmluZztcbn1cblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgTG9hZEltYWdlU2VydmljZSB7XG5cbiAgcHJpdmF0ZSBhdXRvUm90YXRlU3VwcG9ydGVkOiBQcm9taXNlPGJvb2xlYW4+ID0gc3VwcG9ydHNBdXRvbWF0aWNSb3RhdGlvbigpO1xuXG4gIGxvYWRJbWFnZUZpbGUoZmlsZTogRmlsZSwgY3JvcHBlclNldHRpbmdzOiBDcm9wcGVyU2V0dGluZ3MpOiBQcm9taXNlPExvYWRlZEltYWdlPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgZmlsZVJlYWRlci5vbmxvYWQgPSAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRJbWFnZShldmVudC50YXJnZXQucmVzdWx0LCBmaWxlLnR5cGUsIGNyb3BwZXJTZXR0aW5ncylcbiAgICAgICAgICAudGhlbihyZXNvbHZlKVxuICAgICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgICAgfTtcbiAgICAgIGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZEltYWdlKGltYWdlQmFzZTY0OiBzdHJpbmcsIGltYWdlVHlwZTogc3RyaW5nLCBjcm9wcGVyU2V0dGluZ3M6IENyb3BwZXJTZXR0aW5ncyk6IFByb21pc2U8TG9hZGVkSW1hZ2U+IHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZEltYWdlVHlwZShpbWFnZVR5cGUpKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdJbnZhbGlkIGltYWdlIHR5cGUnKSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmxvYWRCYXNlNjRJbWFnZShpbWFnZUJhc2U2NCwgY3JvcHBlclNldHRpbmdzKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNWYWxpZEltYWdlVHlwZSh0eXBlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gL2ltYWdlXFwvKHBuZ3xqcGd8anBlZ3xibXB8Z2lmfHRpZmZ8d2VicCkvLnRlc3QodHlwZSk7XG4gIH1cblxuICBsb2FkSW1hZ2VGcm9tVVJMKHVybDogc3RyaW5nLCBjcm9wcGVyU2V0dGluZ3M6IENyb3BwZXJTZXR0aW5ncyk6IFByb21pc2U8TG9hZGVkSW1hZ2U+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICBpbWcub25lcnJvciA9ICgpID0+IHJlamVjdDtcbiAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IGltZy53aWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IGltZy5oZWlnaHQ7XG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGltZywgMCwgMCk7XG4gICAgICAgIHRoaXMubG9hZEJhc2U2NEltYWdlKGNhbnZhcy50b0RhdGFVUkwoKSwgY3JvcHBlclNldHRpbmdzKS50aGVuKHJlc29sdmUpO1xuICAgICAgfTtcbiAgICAgIGltZy5jcm9zc09yaWdpbiA9ICdhbm9ueW1vdXMnO1xuICAgICAgaW1nLnNyYyA9IHVybDtcbiAgICB9KTtcbiAgfVxuXG4gIGxvYWRCYXNlNjRJbWFnZShpbWFnZUJhc2U2NDogc3RyaW5nLCBjcm9wcGVyU2V0dGluZ3M6IENyb3BwZXJTZXR0aW5ncyk6IFByb21pc2U8TG9hZGVkSW1hZ2U+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8TG9hZEltYWdlQmFzZTY0PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBvcmlnaW5hbEltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICBvcmlnaW5hbEltYWdlLm9ubG9hZCA9ICgpID0+IHJlc29sdmUoe1xuICAgICAgICBvcmlnaW5hbEltYWdlLFxuICAgICAgICBvcmlnaW5hbEJhc2U2NDogaW1hZ2VCYXNlNjRcbiAgICAgIH0pO1xuICAgICAgb3JpZ2luYWxJbWFnZS5vbmVycm9yID0gcmVqZWN0O1xuICAgICAgb3JpZ2luYWxJbWFnZS5zcmMgPSBpbWFnZUJhc2U2NDtcbiAgICB9KS50aGVuKChyZXM6IExvYWRJbWFnZUJhc2U2NCkgPT4gdGhpcy50cmFuc2Zvcm1JbWFnZUJhc2U2NChyZXMsIGNyb3BwZXJTZXR0aW5ncykpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyB0cmFuc2Zvcm1JbWFnZUJhc2U2NChyZXM6IExvYWRJbWFnZUJhc2U2NCwgY3JvcHBlclNldHRpbmdzOiBDcm9wcGVyU2V0dGluZ3MpOiBQcm9taXNlPExvYWRlZEltYWdlPiB7XG4gICAgY29uc3QgYXV0b1JvdGF0ZSA9IGF3YWl0IHRoaXMuYXV0b1JvdGF0ZVN1cHBvcnRlZDtcbiAgICBjb25zdCBleGlmVHJhbnNmb3JtID0gYXdhaXQgZ2V0VHJhbnNmb3JtYXRpb25zRnJvbUV4aWZEYXRhKGF1dG9Sb3RhdGUgPyAtMSA6IHJlcy5vcmlnaW5hbEJhc2U2NCk7XG4gICAgaWYgKCFyZXMub3JpZ2luYWxJbWFnZSB8fCAhcmVzLm9yaWdpbmFsSW1hZ2UuY29tcGxldGUpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ05vIGltYWdlIGxvYWRlZCcpKTtcbiAgICB9XG4gICAgY29uc3QgbG9hZGVkSW1hZ2UgPSB7XG4gICAgICBvcmlnaW5hbDoge1xuICAgICAgICBiYXNlNjQ6IHJlcy5vcmlnaW5hbEJhc2U2NCxcbiAgICAgICAgaW1hZ2U6IHJlcy5vcmlnaW5hbEltYWdlLFxuICAgICAgICBzaXplOiB7XG4gICAgICAgICAgd2lkdGg6IHJlcy5vcmlnaW5hbEltYWdlLm5hdHVyYWxXaWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IHJlcy5vcmlnaW5hbEltYWdlLm5hdHVyYWxIZWlnaHRcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGV4aWZUcmFuc2Zvcm1cbiAgICB9O1xuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybUxvYWRlZEltYWdlKGxvYWRlZEltYWdlLCBjcm9wcGVyU2V0dGluZ3MpO1xuICB9XG5cbiAgYXN5bmMgdHJhbnNmb3JtTG9hZGVkSW1hZ2UobG9hZGVkSW1hZ2U6IFBhcnRpYWw8TG9hZGVkSW1hZ2U+LCBjcm9wcGVyU2V0dGluZ3M6IENyb3BwZXJTZXR0aW5ncyk6IFByb21pc2U8TG9hZGVkSW1hZ2U+IHtcbiAgICBjb25zdCBjYW52YXNSb3RhdGlvbiA9IGNyb3BwZXJTZXR0aW5ncy5jYW52YXNSb3RhdGlvbiArIGxvYWRlZEltYWdlLmV4aWZUcmFuc2Zvcm0ucm90YXRlO1xuICAgIGNvbnN0IG9yaWdpbmFsU2l6ZSA9IHtcbiAgICAgIHdpZHRoOiBsb2FkZWRJbWFnZS5vcmlnaW5hbC5pbWFnZS5uYXR1cmFsV2lkdGgsXG4gICAgICBoZWlnaHQ6IGxvYWRlZEltYWdlLm9yaWdpbmFsLmltYWdlLm5hdHVyYWxIZWlnaHRcbiAgICB9O1xuICAgIGlmIChjYW52YXNSb3RhdGlvbiA9PT0gMCAmJiAhbG9hZGVkSW1hZ2UuZXhpZlRyYW5zZm9ybS5mbGlwICYmICFjcm9wcGVyU2V0dGluZ3MuY29udGFpbldpdGhpbkFzcGVjdFJhdGlvKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBvcmlnaW5hbDoge1xuICAgICAgICAgIGJhc2U2NDogbG9hZGVkSW1hZ2Uub3JpZ2luYWwuYmFzZTY0LFxuICAgICAgICAgIGltYWdlOiBsb2FkZWRJbWFnZS5vcmlnaW5hbC5pbWFnZSxcbiAgICAgICAgICBzaXplOiB7Li4ub3JpZ2luYWxTaXplfVxuICAgICAgICB9LFxuICAgICAgICB0cmFuc2Zvcm1lZDoge1xuICAgICAgICAgIGJhc2U2NDogbG9hZGVkSW1hZ2Uub3JpZ2luYWwuYmFzZTY0LFxuICAgICAgICAgIGltYWdlOiBsb2FkZWRJbWFnZS5vcmlnaW5hbC5pbWFnZSxcbiAgICAgICAgICBzaXplOiB7Li4ub3JpZ2luYWxTaXplfVxuICAgICAgICB9LFxuICAgICAgICBleGlmVHJhbnNmb3JtOiBsb2FkZWRJbWFnZS5leGlmVHJhbnNmb3JtXG4gICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0IHRyYW5zZm9ybWVkU2l6ZSA9IHRoaXMuZ2V0VHJhbnNmb3JtZWRTaXplKG9yaWdpbmFsU2l6ZSwgbG9hZGVkSW1hZ2UuZXhpZlRyYW5zZm9ybSwgY3JvcHBlclNldHRpbmdzKTtcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjYW52YXMud2lkdGggPSB0cmFuc2Zvcm1lZFNpemUud2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IHRyYW5zZm9ybWVkU2l6ZS5oZWlnaHQ7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgY3R4LnNldFRyYW5zZm9ybShcbiAgICAgIGxvYWRlZEltYWdlLmV4aWZUcmFuc2Zvcm0uZmxpcCA/IC0xIDogMSxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMSxcbiAgICAgIGNhbnZhcy53aWR0aCAvIDIsXG4gICAgICBjYW52YXMuaGVpZ2h0IC8gMlxuICAgICk7XG4gICAgY3R4LnJvdGF0ZShNYXRoLlBJICogKGNhbnZhc1JvdGF0aW9uIC8gMikpO1xuICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICBsb2FkZWRJbWFnZS5vcmlnaW5hbC5pbWFnZSxcbiAgICAgIC1vcmlnaW5hbFNpemUud2lkdGggLyAyLFxuICAgICAgLW9yaWdpbmFsU2l6ZS5oZWlnaHQgLyAyXG4gICAgKTtcbiAgICBjb25zdCB0cmFuc2Zvcm1lZEJhc2U2NCA9IGNhbnZhcy50b0RhdGFVUkwoKTtcbiAgICBjb25zdCB0cmFuc2Zvcm1lZEltYWdlID0gYXdhaXQgdGhpcy5sb2FkSW1hZ2VGcm9tQmFzZTY0KHRyYW5zZm9ybWVkQmFzZTY0KTtcbiAgICByZXR1cm4ge1xuICAgICAgb3JpZ2luYWw6IHtcbiAgICAgICAgYmFzZTY0OiBsb2FkZWRJbWFnZS5vcmlnaW5hbC5iYXNlNjQsXG4gICAgICAgIGltYWdlOiBsb2FkZWRJbWFnZS5vcmlnaW5hbC5pbWFnZSxcbiAgICAgICAgc2l6ZTogey4uLm9yaWdpbmFsU2l6ZX1cbiAgICAgIH0sXG4gICAgICB0cmFuc2Zvcm1lZDoge1xuICAgICAgICBiYXNlNjQ6IHRyYW5zZm9ybWVkQmFzZTY0LFxuICAgICAgICBpbWFnZTogdHJhbnNmb3JtZWRJbWFnZSxcbiAgICAgICAgc2l6ZToge1xuICAgICAgICAgIHdpZHRoOiB0cmFuc2Zvcm1lZEltYWdlLndpZHRoLFxuICAgICAgICAgIGhlaWdodDogdHJhbnNmb3JtZWRJbWFnZS5oZWlnaHRcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGV4aWZUcmFuc2Zvcm06IGxvYWRlZEltYWdlLmV4aWZUcmFuc2Zvcm1cbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkSW1hZ2VGcm9tQmFzZTY0KGltYWdlQmFzZTY0OiBzdHJpbmcpOiBQcm9taXNlPEhUTUxJbWFnZUVsZW1lbnQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8SFRNTEltYWdlRWxlbWVudD4oKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKGltYWdlKTtcbiAgICAgIGltYWdlLm9uZXJyb3IgPSByZWplY3Q7XG4gICAgICBpbWFnZS5zcmMgPSBpbWFnZUJhc2U2NDtcbiAgICB9KSk7XG4gIH1cblxuICBwcml2YXRlIGdldFRyYW5zZm9ybWVkU2l6ZShcbiAgICBvcmlnaW5hbFNpemU6IHsgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIgfSxcbiAgICBleGlmVHJhbnNmb3JtOiBFeGlmVHJhbnNmb3JtLFxuICAgIGNyb3BwZXJTZXR0aW5nczogQ3JvcHBlclNldHRpbmdzXG4gICk6IERpbWVuc2lvbnMge1xuICAgIGNvbnN0IGNhbnZhc1JvdGF0aW9uID0gY3JvcHBlclNldHRpbmdzLmNhbnZhc1JvdGF0aW9uICsgZXhpZlRyYW5zZm9ybS5yb3RhdGU7XG4gICAgaWYgKGNyb3BwZXJTZXR0aW5ncy5jb250YWluV2l0aGluQXNwZWN0UmF0aW8pIHtcbiAgICAgIGlmIChjYW52YXNSb3RhdGlvbiAlIDIpIHtcbiAgICAgICAgY29uc3QgbWluV2lkdGhUb0NvbnRhaW4gPSBvcmlnaW5hbFNpemUud2lkdGggKiBjcm9wcGVyU2V0dGluZ3MuYXNwZWN0UmF0aW87XG4gICAgICAgIGNvbnN0IG1pbkhlaWdodFRvQ29udGFpbiA9IG9yaWdpbmFsU2l6ZS5oZWlnaHQgLyBjcm9wcGVyU2V0dGluZ3MuYXNwZWN0UmF0aW87XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgd2lkdGg6IE1hdGgubWF4KG9yaWdpbmFsU2l6ZS5oZWlnaHQsIG1pbldpZHRoVG9Db250YWluKSxcbiAgICAgICAgICBoZWlnaHQ6IE1hdGgubWF4KG9yaWdpbmFsU2l6ZS53aWR0aCwgbWluSGVpZ2h0VG9Db250YWluKVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbWluV2lkdGhUb0NvbnRhaW4gPSBvcmlnaW5hbFNpemUuaGVpZ2h0ICogY3JvcHBlclNldHRpbmdzLmFzcGVjdFJhdGlvO1xuICAgICAgICBjb25zdCBtaW5IZWlnaHRUb0NvbnRhaW4gPSBvcmlnaW5hbFNpemUud2lkdGggLyBjcm9wcGVyU2V0dGluZ3MuYXNwZWN0UmF0aW87XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgd2lkdGg6IE1hdGgubWF4KG9yaWdpbmFsU2l6ZS53aWR0aCwgbWluV2lkdGhUb0NvbnRhaW4pLFxuICAgICAgICAgIGhlaWdodDogTWF0aC5tYXgob3JpZ2luYWxTaXplLmhlaWdodCwgbWluSGVpZ2h0VG9Db250YWluKVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjYW52YXNSb3RhdGlvbiAlIDIpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhlaWdodDogb3JpZ2luYWxTaXplLndpZHRoLFxuICAgICAgICB3aWR0aDogb3JpZ2luYWxTaXplLmhlaWdodFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHdpZHRoOiBvcmlnaW5hbFNpemUud2lkdGgsXG4gICAgICBoZWlnaHQ6IG9yaWdpbmFsU2l6ZS5oZWlnaHRcbiAgICB9O1xuICB9XG59XG4iXX0=