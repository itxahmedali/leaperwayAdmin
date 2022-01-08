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
export class LoadImageService {
    constructor() {
        this.autoRotateSupported = supportsAutomaticRotation();
    }
    /**
     * @param {?} file
     * @param {?} cropperSettings
     * @return {?}
     */
    loadImageFile(file, cropperSettings) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            /** @type {?} */
            const fileReader = new FileReader();
            fileReader.onload = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                this.loadImage(event.target.result, file.type, cropperSettings)
                    .then(resolve)
                    .catch(reject);
            });
            fileReader.readAsDataURL(file);
        }));
    }
    /**
     * @private
     * @param {?} imageBase64
     * @param {?} imageType
     * @param {?} cropperSettings
     * @return {?}
     */
    loadImage(imageBase64, imageType, cropperSettings) {
        if (!this.isValidImageType(imageType)) {
            return Promise.reject(new Error('Invalid image type'));
        }
        return this.loadBase64Image(imageBase64, cropperSettings);
    }
    /**
     * @private
     * @param {?} type
     * @return {?}
     */
    isValidImageType(type) {
        return /image\/(png|jpg|jpeg|bmp|gif|tiff|webp)/.test(type);
    }
    /**
     * @param {?} url
     * @param {?} cropperSettings
     * @return {?}
     */
    loadImageFromURL(url, cropperSettings) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            /** @type {?} */
            const img = new Image();
            img.onerror = (/**
             * @return {?}
             */
            () => reject);
            img.onload = (/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const canvas = document.createElement('canvas');
                /** @type {?} */
                const context = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0);
                this.loadBase64Image(canvas.toDataURL(), cropperSettings).then(resolve);
            });
            img.crossOrigin = 'anonymous';
            img.src = url;
        }));
    }
    /**
     * @param {?} imageBase64
     * @param {?} cropperSettings
     * @return {?}
     */
    loadBase64Image(imageBase64, cropperSettings) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            /** @type {?} */
            const originalImage = new Image();
            originalImage.onload = (/**
             * @return {?}
             */
            () => resolve({
                originalImage,
                originalBase64: imageBase64
            }));
            originalImage.onerror = reject;
            originalImage.src = imageBase64;
        })).then((/**
         * @param {?} res
         * @return {?}
         */
        (res) => this.transformImageBase64(res, cropperSettings)));
    }
    /**
     * @private
     * @param {?} res
     * @param {?} cropperSettings
     * @return {?}
     */
    transformImageBase64(res, cropperSettings) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const autoRotate = yield this.autoRotateSupported;
            /** @type {?} */
            const exifTransform = yield getTransformationsFromExifData(autoRotate ? -1 : res.originalBase64);
            if (!res.originalImage || !res.originalImage.complete) {
                return Promise.reject(new Error('No image loaded'));
            }
            /** @type {?} */
            const loadedImage = {
                original: {
                    base64: res.originalBase64,
                    image: res.originalImage,
                    size: {
                        width: res.originalImage.naturalWidth,
                        height: res.originalImage.naturalHeight
                    }
                },
                exifTransform
            };
            return this.transformLoadedImage(loadedImage, cropperSettings);
        });
    }
    /**
     * @param {?} loadedImage
     * @param {?} cropperSettings
     * @return {?}
     */
    transformLoadedImage(loadedImage, cropperSettings) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const canvasRotation = cropperSettings.canvasRotation + loadedImage.exifTransform.rotate;
            /** @type {?} */
            const originalSize = {
                width: loadedImage.original.image.naturalWidth,
                height: loadedImage.original.image.naturalHeight
            };
            if (canvasRotation === 0 && !loadedImage.exifTransform.flip && !cropperSettings.containWithinAspectRatio) {
                return {
                    original: {
                        base64: loadedImage.original.base64,
                        image: loadedImage.original.image,
                        size: Object.assign({}, originalSize)
                    },
                    transformed: {
                        base64: loadedImage.original.base64,
                        image: loadedImage.original.image,
                        size: Object.assign({}, originalSize)
                    },
                    exifTransform: loadedImage.exifTransform
                };
            }
            /** @type {?} */
            const transformedSize = this.getTransformedSize(originalSize, loadedImage.exifTransform, cropperSettings);
            /** @type {?} */
            const canvas = document.createElement('canvas');
            canvas.width = transformedSize.width;
            canvas.height = transformedSize.height;
            /** @type {?} */
            const ctx = canvas.getContext('2d');
            ctx.setTransform(loadedImage.exifTransform.flip ? -1 : 1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
            ctx.rotate(Math.PI * (canvasRotation / 2));
            ctx.drawImage(loadedImage.original.image, -originalSize.width / 2, -originalSize.height / 2);
            /** @type {?} */
            const transformedBase64 = canvas.toDataURL();
            /** @type {?} */
            const transformedImage = yield this.loadImageFromBase64(transformedBase64);
            return {
                original: {
                    base64: loadedImage.original.base64,
                    image: loadedImage.original.image,
                    size: Object.assign({}, originalSize)
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
            };
        });
    }
    /**
     * @private
     * @param {?} imageBase64
     * @return {?}
     */
    loadImageFromBase64(imageBase64) {
        return new Promise(((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            /** @type {?} */
            const image = new Image();
            image.onload = (/**
             * @return {?}
             */
            () => resolve(image));
            image.onerror = reject;
            image.src = imageBase64;
        })));
    }
    /**
     * @private
     * @param {?} originalSize
     * @param {?} exifTransform
     * @param {?} cropperSettings
     * @return {?}
     */
    getTransformedSize(originalSize, exifTransform, cropperSettings) {
        /** @type {?} */
        const canvasRotation = cropperSettings.canvasRotation + exifTransform.rotate;
        if (cropperSettings.containWithinAspectRatio) {
            if (canvasRotation % 2) {
                /** @type {?} */
                const minWidthToContain = originalSize.width * cropperSettings.aspectRatio;
                /** @type {?} */
                const minHeightToContain = originalSize.height / cropperSettings.aspectRatio;
                return {
                    width: Math.max(originalSize.height, minWidthToContain),
                    height: Math.max(originalSize.width, minHeightToContain)
                };
            }
            else {
                /** @type {?} */
                const minWidthToContain = originalSize.height * cropperSettings.aspectRatio;
                /** @type {?} */
                const minHeightToContain = originalSize.width / cropperSettings.aspectRatio;
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
    }
}
LoadImageService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ LoadImageService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function LoadImageService_Factory() { return new LoadImageService(); }, token: LoadImageService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    LoadImageService.prototype.autoRotateSupported;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZC1pbWFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWltYWdlLWNyb3BwZXIvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbG9hZC1pbWFnZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsT0FBTyxFQUFFLDhCQUE4QixFQUFFLHlCQUF5QixFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7O0FBRWhHLDhCQUdDOzs7SUFGQyx3Q0FBZ0M7O0lBQ2hDLHlDQUF1Qjs7QUFJekIsTUFBTSxPQUFPLGdCQUFnQjtJQUQ3QjtRQUdVLHdCQUFtQixHQUFxQix5QkFBeUIsRUFBRSxDQUFDO0tBbUw3RTs7Ozs7O0lBakxDLGFBQWEsQ0FBQyxJQUFVLEVBQUUsZUFBZ0M7UUFDeEQsT0FBTyxJQUFJLE9BQU87Ozs7O1FBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7O2tCQUMvQixVQUFVLEdBQUcsSUFBSSxVQUFVLEVBQUU7WUFDbkMsVUFBVSxDQUFDLE1BQU07Ozs7WUFBRyxDQUFDLEtBQVUsRUFBRSxFQUFFO2dCQUNqQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDO3FCQUM1RCxJQUFJLENBQUMsT0FBTyxDQUFDO3FCQUNiLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuQixDQUFDLENBQUEsQ0FBQztZQUNGLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7OztJQUVPLFNBQVMsQ0FBQyxXQUFtQixFQUFFLFNBQWlCLEVBQUUsZUFBZ0M7UUFDeEYsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNyQyxP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QkFDekQsQ0FBQzthQUNIO2lCQUFNOztzQkFDQyxpQkFBaUIsR0FBRyxZQUFZLENBQUMsTUFBTSxHQUFHLGVBQWUsQ0FBQyxXQUFXOztzQkFDckUsa0JBQWtCLEdBQUcsWUFBWSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUMsV0FBVztnQkFDM0UsT0FBTztvQkFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLGlCQUFpQixDQUFDO29CQUN0RCxNQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLGtCQUFrQixDQUFDO2lCQUMxRCxDQUFDO2FBQ0g7U0FDRjtRQUVELElBQUksY0FBYyxHQUFHLENBQUMsRUFBRTtZQUN0QixPQUFPO2dCQUNMLE1BQU0sRUFBRSxZQUFZLENBQUMsS0FBSztnQkFDMUIsS0FBSyxFQUFFLFlBQVksQ0FBQyxNQUFNO2FBQzNCLENBQUM7U0FDSDtRQUNELE9BQU87WUFDTCxLQUFLLEVBQUUsWUFBWSxDQUFDLEtBQUs7WUFDekIsTUFBTSxFQUFFLFlBQVksQ0FBQyxNQUFNO1NBQzVCLENBQUM7SUFDSixDQUFDOzs7WUFyTEYsVUFBVSxTQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7Ozs7Ozs7SUFHOUIsK0NBQTRFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGltZW5zaW9ucywgTG9hZGVkSW1hZ2UgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IENyb3BwZXJTZXR0aW5ncyB9IGZyb20gJy4uL2ludGVyZmFjZXMvY3JvcHBlci5zZXR0aW5ncyc7XG5pbXBvcnQgeyBFeGlmVHJhbnNmb3JtIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9leGlmLXRyYW5zZm9ybS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgZ2V0VHJhbnNmb3JtYXRpb25zRnJvbUV4aWZEYXRhLCBzdXBwb3J0c0F1dG9tYXRpY1JvdGF0aW9uIH0gZnJvbSAnLi4vdXRpbHMvZXhpZi51dGlscyc7XG5cbmludGVyZmFjZSBMb2FkSW1hZ2VCYXNlNjQge1xuICBvcmlnaW5hbEltYWdlOiBIVE1MSW1hZ2VFbGVtZW50O1xuICBvcmlnaW5hbEJhc2U2NDogc3RyaW5nO1xufVxuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBMb2FkSW1hZ2VTZXJ2aWNlIHtcblxuICBwcml2YXRlIGF1dG9Sb3RhdGVTdXBwb3J0ZWQ6IFByb21pc2U8Ym9vbGVhbj4gPSBzdXBwb3J0c0F1dG9tYXRpY1JvdGF0aW9uKCk7XG5cbiAgbG9hZEltYWdlRmlsZShmaWxlOiBGaWxlLCBjcm9wcGVyU2V0dGluZ3M6IENyb3BwZXJTZXR0aW5ncyk6IFByb21pc2U8TG9hZGVkSW1hZ2U+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICBmaWxlUmVhZGVyLm9ubG9hZCA9IChldmVudDogYW55KSA9PiB7XG4gICAgICAgIHRoaXMubG9hZEltYWdlKGV2ZW50LnRhcmdldC5yZXN1bHQsIGZpbGUudHlwZSwgY3JvcHBlclNldHRpbmdzKVxuICAgICAgICAgIC50aGVuKHJlc29sdmUpXG4gICAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgICB9O1xuICAgICAgZmlsZVJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkSW1hZ2UoaW1hZ2VCYXNlNjQ6IHN0cmluZywgaW1hZ2VUeXBlOiBzdHJpbmcsIGNyb3BwZXJTZXR0aW5nczogQ3JvcHBlclNldHRpbmdzKTogUHJvbWlzZTxMb2FkZWRJbWFnZT4ge1xuICAgIGlmICghdGhpcy5pc1ZhbGlkSW1hZ2VUeXBlKGltYWdlVHlwZSkpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ0ludmFsaWQgaW1hZ2UgdHlwZScpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubG9hZEJhc2U2NEltYWdlKGltYWdlQmFzZTY0LCBjcm9wcGVyU2V0dGluZ3MpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1ZhbGlkSW1hZ2VUeXBlKHR5cGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAvaW1hZ2VcXC8ocG5nfGpwZ3xqcGVnfGJtcHxnaWZ8dGlmZnx3ZWJwKS8udGVzdCh0eXBlKTtcbiAgfVxuXG4gIGxvYWRJbWFnZUZyb21VUkwodXJsOiBzdHJpbmcsIGNyb3BwZXJTZXR0aW5nczogQ3JvcHBlclNldHRpbmdzKTogUHJvbWlzZTxMb2FkZWRJbWFnZT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltZy5vbmVycm9yID0gKCkgPT4gcmVqZWN0O1xuICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgY2FudmFzLndpZHRoID0gaW1nLndpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaW1nLmhlaWdodDtcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtcbiAgICAgICAgdGhpcy5sb2FkQmFzZTY0SW1hZ2UoY2FudmFzLnRvRGF0YVVSTCgpLCBjcm9wcGVyU2V0dGluZ3MpLnRoZW4ocmVzb2x2ZSk7XG4gICAgICB9O1xuICAgICAgaW1nLmNyb3NzT3JpZ2luID0gJ2Fub255bW91cyc7XG4gICAgICBpbWcuc3JjID0gdXJsO1xuICAgIH0pO1xuICB9XG5cbiAgbG9hZEJhc2U2NEltYWdlKGltYWdlQmFzZTY0OiBzdHJpbmcsIGNyb3BwZXJTZXR0aW5nczogQ3JvcHBlclNldHRpbmdzKTogUHJvbWlzZTxMb2FkZWRJbWFnZT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxMb2FkSW1hZ2VCYXNlNjQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IG9yaWdpbmFsSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIG9yaWdpbmFsSW1hZ2Uub25sb2FkID0gKCkgPT4gcmVzb2x2ZSh7XG4gICAgICAgIG9yaWdpbmFsSW1hZ2UsXG4gICAgICAgIG9yaWdpbmFsQmFzZTY0OiBpbWFnZUJhc2U2NFxuICAgICAgfSk7XG4gICAgICBvcmlnaW5hbEltYWdlLm9uZXJyb3IgPSByZWplY3Q7XG4gICAgICBvcmlnaW5hbEltYWdlLnNyYyA9IGltYWdlQmFzZTY0O1xuICAgIH0pLnRoZW4oKHJlczogTG9hZEltYWdlQmFzZTY0KSA9PiB0aGlzLnRyYW5zZm9ybUltYWdlQmFzZTY0KHJlcywgY3JvcHBlclNldHRpbmdzKSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHRyYW5zZm9ybUltYWdlQmFzZTY0KHJlczogTG9hZEltYWdlQmFzZTY0LCBjcm9wcGVyU2V0dGluZ3M6IENyb3BwZXJTZXR0aW5ncyk6IFByb21pc2U8TG9hZGVkSW1hZ2U+IHtcbiAgICBjb25zdCBhdXRvUm90YXRlID0gYXdhaXQgdGhpcy5hdXRvUm90YXRlU3VwcG9ydGVkO1xuICAgIGNvbnN0IGV4aWZUcmFuc2Zvcm0gPSBhd2FpdCBnZXRUcmFuc2Zvcm1hdGlvbnNGcm9tRXhpZkRhdGEoYXV0b1JvdGF0ZSA/IC0xIDogcmVzLm9yaWdpbmFsQmFzZTY0KTtcbiAgICBpZiAoIXJlcy5vcmlnaW5hbEltYWdlIHx8ICFyZXMub3JpZ2luYWxJbWFnZS5jb21wbGV0ZSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignTm8gaW1hZ2UgbG9hZGVkJykpO1xuICAgIH1cbiAgICBjb25zdCBsb2FkZWRJbWFnZSA9IHtcbiAgICAgIG9yaWdpbmFsOiB7XG4gICAgICAgIGJhc2U2NDogcmVzLm9yaWdpbmFsQmFzZTY0LFxuICAgICAgICBpbWFnZTogcmVzLm9yaWdpbmFsSW1hZ2UsXG4gICAgICAgIHNpemU6IHtcbiAgICAgICAgICB3aWR0aDogcmVzLm9yaWdpbmFsSW1hZ2UubmF0dXJhbFdpZHRoLFxuICAgICAgICAgIGhlaWdodDogcmVzLm9yaWdpbmFsSW1hZ2UubmF0dXJhbEhlaWdodFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZXhpZlRyYW5zZm9ybVxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtTG9hZGVkSW1hZ2UobG9hZGVkSW1hZ2UsIGNyb3BwZXJTZXR0aW5ncyk7XG4gIH1cblxuICBhc3luYyB0cmFuc2Zvcm1Mb2FkZWRJbWFnZShsb2FkZWRJbWFnZTogUGFydGlhbDxMb2FkZWRJbWFnZT4sIGNyb3BwZXJTZXR0aW5nczogQ3JvcHBlclNldHRpbmdzKTogUHJvbWlzZTxMb2FkZWRJbWFnZT4ge1xuICAgIGNvbnN0IGNhbnZhc1JvdGF0aW9uID0gY3JvcHBlclNldHRpbmdzLmNhbnZhc1JvdGF0aW9uICsgbG9hZGVkSW1hZ2UuZXhpZlRyYW5zZm9ybS5yb3RhdGU7XG4gICAgY29uc3Qgb3JpZ2luYWxTaXplID0ge1xuICAgICAgd2lkdGg6IGxvYWRlZEltYWdlLm9yaWdpbmFsLmltYWdlLm5hdHVyYWxXaWR0aCxcbiAgICAgIGhlaWdodDogbG9hZGVkSW1hZ2Uub3JpZ2luYWwuaW1hZ2UubmF0dXJhbEhlaWdodFxuICAgIH07XG4gICAgaWYgKGNhbnZhc1JvdGF0aW9uID09PSAwICYmICFsb2FkZWRJbWFnZS5leGlmVHJhbnNmb3JtLmZsaXAgJiYgIWNyb3BwZXJTZXR0aW5ncy5jb250YWluV2l0aGluQXNwZWN0UmF0aW8pIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG9yaWdpbmFsOiB7XG4gICAgICAgICAgYmFzZTY0OiBsb2FkZWRJbWFnZS5vcmlnaW5hbC5iYXNlNjQsXG4gICAgICAgICAgaW1hZ2U6IGxvYWRlZEltYWdlLm9yaWdpbmFsLmltYWdlLFxuICAgICAgICAgIHNpemU6IHsuLi5vcmlnaW5hbFNpemV9XG4gICAgICAgIH0sXG4gICAgICAgIHRyYW5zZm9ybWVkOiB7XG4gICAgICAgICAgYmFzZTY0OiBsb2FkZWRJbWFnZS5vcmlnaW5hbC5iYXNlNjQsXG4gICAgICAgICAgaW1hZ2U6IGxvYWRlZEltYWdlLm9yaWdpbmFsLmltYWdlLFxuICAgICAgICAgIHNpemU6IHsuLi5vcmlnaW5hbFNpemV9XG4gICAgICAgIH0sXG4gICAgICAgIGV4aWZUcmFuc2Zvcm06IGxvYWRlZEltYWdlLmV4aWZUcmFuc2Zvcm1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3QgdHJhbnNmb3JtZWRTaXplID0gdGhpcy5nZXRUcmFuc2Zvcm1lZFNpemUob3JpZ2luYWxTaXplLCBsb2FkZWRJbWFnZS5leGlmVHJhbnNmb3JtLCBjcm9wcGVyU2V0dGluZ3MpO1xuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIGNhbnZhcy53aWR0aCA9IHRyYW5zZm9ybWVkU2l6ZS53aWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gdHJhbnNmb3JtZWRTaXplLmhlaWdodDtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjdHguc2V0VHJhbnNmb3JtKFxuICAgICAgbG9hZGVkSW1hZ2UuZXhpZlRyYW5zZm9ybS5mbGlwID8gLTEgOiAxLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAxLFxuICAgICAgY2FudmFzLndpZHRoIC8gMixcbiAgICAgIGNhbnZhcy5oZWlnaHQgLyAyXG4gICAgKTtcbiAgICBjdHgucm90YXRlKE1hdGguUEkgKiAoY2FudmFzUm90YXRpb24gLyAyKSk7XG4gICAgY3R4LmRyYXdJbWFnZShcbiAgICAgIGxvYWRlZEltYWdlLm9yaWdpbmFsLmltYWdlLFxuICAgICAgLW9yaWdpbmFsU2l6ZS53aWR0aCAvIDIsXG4gICAgICAtb3JpZ2luYWxTaXplLmhlaWdodCAvIDJcbiAgICApO1xuICAgIGNvbnN0IHRyYW5zZm9ybWVkQmFzZTY0ID0gY2FudmFzLnRvRGF0YVVSTCgpO1xuICAgIGNvbnN0IHRyYW5zZm9ybWVkSW1hZ2UgPSBhd2FpdCB0aGlzLmxvYWRJbWFnZUZyb21CYXNlNjQodHJhbnNmb3JtZWRCYXNlNjQpO1xuICAgIHJldHVybiB7XG4gICAgICBvcmlnaW5hbDoge1xuICAgICAgICBiYXNlNjQ6IGxvYWRlZEltYWdlLm9yaWdpbmFsLmJhc2U2NCxcbiAgICAgICAgaW1hZ2U6IGxvYWRlZEltYWdlLm9yaWdpbmFsLmltYWdlLFxuICAgICAgICBzaXplOiB7Li4ub3JpZ2luYWxTaXplfVxuICAgICAgfSxcbiAgICAgIHRyYW5zZm9ybWVkOiB7XG4gICAgICAgIGJhc2U2NDogdHJhbnNmb3JtZWRCYXNlNjQsXG4gICAgICAgIGltYWdlOiB0cmFuc2Zvcm1lZEltYWdlLFxuICAgICAgICBzaXplOiB7XG4gICAgICAgICAgd2lkdGg6IHRyYW5zZm9ybWVkSW1hZ2Uud2lkdGgsXG4gICAgICAgICAgaGVpZ2h0OiB0cmFuc2Zvcm1lZEltYWdlLmhlaWdodFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZXhpZlRyYW5zZm9ybTogbG9hZGVkSW1hZ2UuZXhpZlRyYW5zZm9ybVxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGxvYWRJbWFnZUZyb21CYXNlNjQoaW1hZ2VCYXNlNjQ6IHN0cmluZyk6IFByb21pc2U8SFRNTEltYWdlRWxlbWVudD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxIVE1MSW1hZ2VFbGVtZW50PigoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHJlc29sdmUoaW1hZ2UpO1xuICAgICAgaW1hZ2Uub25lcnJvciA9IHJlamVjdDtcbiAgICAgIGltYWdlLnNyYyA9IGltYWdlQmFzZTY0O1xuICAgIH0pKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VHJhbnNmb3JtZWRTaXplKFxuICAgIG9yaWdpbmFsU2l6ZTogeyB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciB9LFxuICAgIGV4aWZUcmFuc2Zvcm06IEV4aWZUcmFuc2Zvcm0sXG4gICAgY3JvcHBlclNldHRpbmdzOiBDcm9wcGVyU2V0dGluZ3NcbiAgKTogRGltZW5zaW9ucyB7XG4gICAgY29uc3QgY2FudmFzUm90YXRpb24gPSBjcm9wcGVyU2V0dGluZ3MuY2FudmFzUm90YXRpb24gKyBleGlmVHJhbnNmb3JtLnJvdGF0ZTtcbiAgICBpZiAoY3JvcHBlclNldHRpbmdzLmNvbnRhaW5XaXRoaW5Bc3BlY3RSYXRpbykge1xuICAgICAgaWYgKGNhbnZhc1JvdGF0aW9uICUgMikge1xuICAgICAgICBjb25zdCBtaW5XaWR0aFRvQ29udGFpbiA9IG9yaWdpbmFsU2l6ZS53aWR0aCAqIGNyb3BwZXJTZXR0aW5ncy5hc3BlY3RSYXRpbztcbiAgICAgICAgY29uc3QgbWluSGVpZ2h0VG9Db250YWluID0gb3JpZ2luYWxTaXplLmhlaWdodCAvIGNyb3BwZXJTZXR0aW5ncy5hc3BlY3RSYXRpbztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB3aWR0aDogTWF0aC5tYXgob3JpZ2luYWxTaXplLmhlaWdodCwgbWluV2lkdGhUb0NvbnRhaW4pLFxuICAgICAgICAgIGhlaWdodDogTWF0aC5tYXgob3JpZ2luYWxTaXplLndpZHRoLCBtaW5IZWlnaHRUb0NvbnRhaW4pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBtaW5XaWR0aFRvQ29udGFpbiA9IG9yaWdpbmFsU2l6ZS5oZWlnaHQgKiBjcm9wcGVyU2V0dGluZ3MuYXNwZWN0UmF0aW87XG4gICAgICAgIGNvbnN0IG1pbkhlaWdodFRvQ29udGFpbiA9IG9yaWdpbmFsU2l6ZS53aWR0aCAvIGNyb3BwZXJTZXR0aW5ncy5hc3BlY3RSYXRpbztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB3aWR0aDogTWF0aC5tYXgob3JpZ2luYWxTaXplLndpZHRoLCBtaW5XaWR0aFRvQ29udGFpbiksXG4gICAgICAgICAgaGVpZ2h0OiBNYXRoLm1heChvcmlnaW5hbFNpemUuaGVpZ2h0LCBtaW5IZWlnaHRUb0NvbnRhaW4pXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNhbnZhc1JvdGF0aW9uICUgMikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaGVpZ2h0OiBvcmlnaW5hbFNpemUud2lkdGgsXG4gICAgICAgIHdpZHRoOiBvcmlnaW5hbFNpemUuaGVpZ2h0XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGg6IG9yaWdpbmFsU2l6ZS53aWR0aCxcbiAgICAgIGhlaWdodDogb3JpZ2luYWxTaXplLmhlaWdodFxuICAgIH07XG4gIH1cbn1cbiJdfQ==