import { Injectable, ɵɵdefineInjectable, EventEmitter, isDevMode, Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, Input, HostBinding, Output, HostListener, NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { __awaiter } from 'tslib';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/interfaces/move-start.interface.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/platform-browser';
import * as ɵngcc2 from '@angular/common';

const _c0 = ["wrapper"];
const _c1 = ["sourceImage"];
function ImageCropperComponent_img_2_Template(rf, ctx) { if (rf & 1) {
    const _r5 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "img", 4, 5);
    ɵngcc0.ɵɵlistener("load", function ImageCropperComponent_img_2_Template_img_load_0_listener() { ɵngcc0.ɵɵrestoreView(_r5); const ctx_r4 = ɵngcc0.ɵɵnextContext(); return ctx_r4.imageLoadedInView(); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵstyleProp("visibility", ctx_r1.imageVisible ? "visible" : "hidden")("transform", ctx_r1.safeTransformStyle);
    ɵngcc0.ɵɵproperty("src", ctx_r1.safeImgDataUrl, ɵngcc0.ɵɵsanitizeUrl);
} }
function ImageCropperComponent_div_4_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r8 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementContainerStart(0);
    ɵngcc0.ɵɵelementStart(1, "span", 9);
    ɵngcc0.ɵɵlistener("mousedown", function ImageCropperComponent_div_4_ng_container_2_Template_span_mousedown_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r8); const ctx_r7 = ɵngcc0.ɵɵnextContext(2); return ctx_r7.startMove($event, ctx_r7.moveTypes.Resize, "topleft"); })("touchstart", function ImageCropperComponent_div_4_ng_container_2_Template_span_touchstart_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r8); const ctx_r9 = ɵngcc0.ɵɵnextContext(2); return ctx_r9.startMove($event, ctx_r9.moveTypes.Resize, "topleft"); });
    ɵngcc0.ɵɵelement(2, "span", 10);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(3, "span", 11);
    ɵngcc0.ɵɵelement(4, "span", 10);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(5, "span", 12);
    ɵngcc0.ɵɵlistener("mousedown", function ImageCropperComponent_div_4_ng_container_2_Template_span_mousedown_5_listener($event) { ɵngcc0.ɵɵrestoreView(_r8); const ctx_r10 = ɵngcc0.ɵɵnextContext(2); return ctx_r10.startMove($event, ctx_r10.moveTypes.Resize, "topright"); })("touchstart", function ImageCropperComponent_div_4_ng_container_2_Template_span_touchstart_5_listener($event) { ɵngcc0.ɵɵrestoreView(_r8); const ctx_r11 = ɵngcc0.ɵɵnextContext(2); return ctx_r11.startMove($event, ctx_r11.moveTypes.Resize, "topright"); });
    ɵngcc0.ɵɵelement(6, "span", 10);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(7, "span", 13);
    ɵngcc0.ɵɵelement(8, "span", 10);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(9, "span", 14);
    ɵngcc0.ɵɵlistener("mousedown", function ImageCropperComponent_div_4_ng_container_2_Template_span_mousedown_9_listener($event) { ɵngcc0.ɵɵrestoreView(_r8); const ctx_r12 = ɵngcc0.ɵɵnextContext(2); return ctx_r12.startMove($event, ctx_r12.moveTypes.Resize, "bottomright"); })("touchstart", function ImageCropperComponent_div_4_ng_container_2_Template_span_touchstart_9_listener($event) { ɵngcc0.ɵɵrestoreView(_r8); const ctx_r13 = ɵngcc0.ɵɵnextContext(2); return ctx_r13.startMove($event, ctx_r13.moveTypes.Resize, "bottomright"); });
    ɵngcc0.ɵɵelement(10, "span", 10);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(11, "span", 15);
    ɵngcc0.ɵɵelement(12, "span", 10);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(13, "span", 16);
    ɵngcc0.ɵɵlistener("mousedown", function ImageCropperComponent_div_4_ng_container_2_Template_span_mousedown_13_listener($event) { ɵngcc0.ɵɵrestoreView(_r8); const ctx_r14 = ɵngcc0.ɵɵnextContext(2); return ctx_r14.startMove($event, ctx_r14.moveTypes.Resize, "bottomleft"); })("touchstart", function ImageCropperComponent_div_4_ng_container_2_Template_span_touchstart_13_listener($event) { ɵngcc0.ɵɵrestoreView(_r8); const ctx_r15 = ɵngcc0.ɵɵnextContext(2); return ctx_r15.startMove($event, ctx_r15.moveTypes.Resize, "bottomleft"); });
    ɵngcc0.ɵɵelement(14, "span", 10);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(15, "span", 17);
    ɵngcc0.ɵɵelement(16, "span", 10);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(17, "span", 18);
    ɵngcc0.ɵɵlistener("mousedown", function ImageCropperComponent_div_4_ng_container_2_Template_span_mousedown_17_listener($event) { ɵngcc0.ɵɵrestoreView(_r8); const ctx_r16 = ɵngcc0.ɵɵnextContext(2); return ctx_r16.startMove($event, ctx_r16.moveTypes.Resize, "top"); })("touchstart", function ImageCropperComponent_div_4_ng_container_2_Template_span_touchstart_17_listener($event) { ɵngcc0.ɵɵrestoreView(_r8); const ctx_r17 = ɵngcc0.ɵɵnextContext(2); return ctx_r17.startMove($event, ctx_r17.moveTypes.Resize, "top"); });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(18, "span", 19);
    ɵngcc0.ɵɵlistener("mousedown", function ImageCropperComponent_div_4_ng_container_2_Template_span_mousedown_18_listener($event) { ɵngcc0.ɵɵrestoreView(_r8); const ctx_r18 = ɵngcc0.ɵɵnextContext(2); return ctx_r18.startMove($event, ctx_r18.moveTypes.Resize, "right"); })("touchstart", function ImageCropperComponent_div_4_ng_container_2_Template_span_touchstart_18_listener($event) { ɵngcc0.ɵɵrestoreView(_r8); const ctx_r19 = ɵngcc0.ɵɵnextContext(2); return ctx_r19.startMove($event, ctx_r19.moveTypes.Resize, "right"); });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(19, "span", 20);
    ɵngcc0.ɵɵlistener("mousedown", function ImageCropperComponent_div_4_ng_container_2_Template_span_mousedown_19_listener($event) { ɵngcc0.ɵɵrestoreView(_r8); const ctx_r20 = ɵngcc0.ɵɵnextContext(2); return ctx_r20.startMove($event, ctx_r20.moveTypes.Resize, "bottom"); })("touchstart", function ImageCropperComponent_div_4_ng_container_2_Template_span_touchstart_19_listener($event) { ɵngcc0.ɵɵrestoreView(_r8); const ctx_r21 = ɵngcc0.ɵɵnextContext(2); return ctx_r21.startMove($event, ctx_r21.moveTypes.Resize, "bottom"); });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(20, "span", 21);
    ɵngcc0.ɵɵlistener("mousedown", function ImageCropperComponent_div_4_ng_container_2_Template_span_mousedown_20_listener($event) { ɵngcc0.ɵɵrestoreView(_r8); const ctx_r22 = ɵngcc0.ɵɵnextContext(2); return ctx_r22.startMove($event, ctx_r22.moveTypes.Resize, "left"); })("touchstart", function ImageCropperComponent_div_4_ng_container_2_Template_span_touchstart_20_listener($event) { ɵngcc0.ɵɵrestoreView(_r8); const ctx_r23 = ɵngcc0.ɵɵnextContext(2); return ctx_r23.startMove($event, ctx_r23.moveTypes.Resize, "left"); });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementContainerEnd();
} }
function ImageCropperComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r25 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 6);
    ɵngcc0.ɵɵlistener("keydown", function ImageCropperComponent_div_4_Template_div_keydown_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r25); const ctx_r24 = ɵngcc0.ɵɵnextContext(); return ctx_r24.keyboardAccess($event); });
    ɵngcc0.ɵɵelementStart(1, "div", 7);
    ɵngcc0.ɵɵlistener("mousedown", function ImageCropperComponent_div_4_Template_div_mousedown_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r25); const ctx_r26 = ɵngcc0.ɵɵnextContext(); return ctx_r26.startMove($event, ctx_r26.moveTypes.Move); })("touchstart", function ImageCropperComponent_div_4_Template_div_touchstart_1_listener($event) { ɵngcc0.ɵɵrestoreView(_r25); const ctx_r27 = ɵngcc0.ɵɵnextContext(); return ctx_r27.startMove($event, ctx_r27.moveTypes.Move); });
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtemplate(2, ImageCropperComponent_div_4_ng_container_2_Template, 21, 0, "ng-container", 8);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵstyleProp("top", ctx_r2.cropper.y1, "px")("left", ctx_r2.cropper.x1, "px")("width", ctx_r2.cropper.x2 - ctx_r2.cropper.x1, "px")("height", ctx_r2.cropper.y2 - ctx_r2.cropper.y1, "px")("margin-left", ctx_r2.alignImage === "center" ? ctx_r2.marginLeft : null)("visibility", ctx_r2.imageVisible ? "visible" : "hidden");
    ɵngcc0.ɵɵclassProp("rounded", ctx_r2.roundCropper);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngIf", !ctx_r2.hideResizeSquares);
} }
function MoveStart() { }
if (false) {
    /** @type {?} */
    MoveStart.prototype.active;
    /** @type {?} */
    MoveStart.prototype.type;
    /** @type {?} */
    MoveStart.prototype.position;
    /** @type {?} */
    MoveStart.prototype.x1;
    /** @type {?} */
    MoveStart.prototype.y1;
    /** @type {?} */
    MoveStart.prototype.x2;
    /** @type {?} */
    MoveStart.prototype.y2;
    /** @type {?} */
    MoveStart.prototype.clientX;
    /** @type {?} */
    MoveStart.prototype.clientY;
}
/** @enum {string} */
const MoveTypes = {
    Move: "move",
    Resize: "resize",
    Pinch: "pinch",
};

/**
 * @fileoverview added by tsickle
 * Generated from: lib/utils/resize.utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * Hermite resize - fast image resize/resample using Hermite filter.
 * https://github.com/viliusle/Hermite-resize
 */
/**
 * @param {?} canvas
 * @param {?} width
 * @param {?} height
 * @return {?}
 */
function resizeCanvas(canvas, width, height) {
    /** @type {?} */
    const width_source = canvas.width;
    /** @type {?} */
    const height_source = canvas.height;
    width = Math.round(width);
    height = Math.round(height);
    /** @type {?} */
    const ratio_w = width_source / width;
    /** @type {?} */
    const ratio_h = height_source / height;
    /** @type {?} */
    const ratio_w_half = Math.ceil(ratio_w / 2);
    /** @type {?} */
    const ratio_h_half = Math.ceil(ratio_h / 2);
    /** @type {?} */
    const ctx = canvas.getContext('2d');
    if (ctx) {
        /** @type {?} */
        const img = ctx.getImageData(0, 0, width_source, height_source);
        /** @type {?} */
        const img2 = ctx.createImageData(width, height);
        /** @type {?} */
        const data = img.data;
        /** @type {?} */
        const data2 = img2.data;
        for (let j = 0; j < height; j++) {
            for (let i = 0; i < width; i++) {
                /** @type {?} */
                const x2 = (i + j * width) * 4;
                /** @type {?} */
                const center_y = j * ratio_h;
                /** @type {?} */
                let weight = 0;
                /** @type {?} */
                let weights = 0;
                /** @type {?} */
                let weights_alpha = 0;
                /** @type {?} */
                let gx_r = 0;
                /** @type {?} */
                let gx_g = 0;
                /** @type {?} */
                let gx_b = 0;
                /** @type {?} */
                let gx_a = 0;
                /** @type {?} */
                const xx_start = Math.floor(i * ratio_w);
                /** @type {?} */
                const yy_start = Math.floor(j * ratio_h);
                /** @type {?} */
                let xx_stop = Math.ceil((i + 1) * ratio_w);
                /** @type {?} */
                let yy_stop = Math.ceil((j + 1) * ratio_h);
                xx_stop = Math.min(xx_stop, width_source);
                yy_stop = Math.min(yy_stop, height_source);
                for (let yy = yy_start; yy < yy_stop; yy++) {
                    /** @type {?} */
                    const dy = Math.abs(center_y - yy) / ratio_h_half;
                    /** @type {?} */
                    const center_x = i * ratio_w;
                    /** @type {?} */
                    const w0 = dy * dy;
                    for (let xx = xx_start; xx < xx_stop; xx++) {
                        /** @type {?} */
                        const dx = Math.abs(center_x - xx) / ratio_w_half;
                        /** @type {?} */
                        const w = Math.sqrt(w0 + dx * dx);
                        if (w >= 1) {
                            //pixel too far
                            continue;
                        }
                        //hermite filter
                        weight = 2 * w * w * w - 3 * w * w + 1;
                        /** @type {?} */
                        const pos_x = 4 * (xx + yy * width_source);
                        //alpha
                        gx_a += weight * data[pos_x + 3];
                        weights_alpha += weight;
                        //colors
                        if (data[pos_x + 3] < 255)
                            weight = weight * data[pos_x + 3] / 250;
                        gx_r += weight * data[pos_x];
                        gx_g += weight * data[pos_x + 1];
                        gx_b += weight * data[pos_x + 2];
                        weights += weight;
                    }
                }
                data2[x2] = gx_r / weights;
                data2[x2 + 1] = gx_g / weights;
                data2[x2 + 2] = gx_b / weights;
                data2[x2 + 3] = gx_a / weights_alpha;
            }
        }
        canvas.width = width;
        canvas.height = height;
        //draw
        ctx.putImageData(img2, 0, 0);
    }
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/crop.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CropService {
    /**
     * @param {?} sourceImage
     * @param {?} loadedImage
     * @param {?} cropper
     * @param {?} settings
     * @return {?}
     */
    crop(sourceImage, loadedImage, cropper, settings) {
        /** @type {?} */
        const imagePosition = this.getImagePosition(sourceImage, loadedImage, cropper, settings);
        /** @type {?} */
        const width = imagePosition.x2 - imagePosition.x1;
        /** @type {?} */
        const height = imagePosition.y2 - imagePosition.y1;
        /** @type {?} */
        const cropCanvas = (/** @type {?} */ (document.createElement('canvas')));
        cropCanvas.width = width;
        cropCanvas.height = height;
        /** @type {?} */
        const ctx = cropCanvas.getContext('2d');
        if (!ctx) {
            return;
        }
        if (settings.backgroundColor != null) {
            ctx.fillStyle = settings.backgroundColor;
            ctx.fillRect(0, 0, width, height);
        }
        /** @type {?} */
        const scaleX = (settings.transform.scale || 1) * (settings.transform.flipH ? -1 : 1);
        /** @type {?} */
        const scaleY = (settings.transform.scale || 1) * (settings.transform.flipV ? -1 : 1);
        /** @type {?} */
        const transformedImage = loadedImage.transformed;
        ctx.setTransform(scaleX, 0, 0, scaleY, transformedImage.size.width / 2, transformedImage.size.height / 2);
        ctx.translate(-imagePosition.x1 / scaleX, -imagePosition.y1 / scaleY);
        ctx.rotate((settings.transform.rotate || 0) * Math.PI / 180);
        ctx.drawImage(transformedImage.image, -transformedImage.size.width / 2, -transformedImage.size.height / 2);
        /** @type {?} */
        const output = {
            width, height,
            imagePosition,
            cropperPosition: Object.assign({}, cropper)
        };
        if (settings.containWithinAspectRatio) {
            output.offsetImagePosition = this.getOffsetImagePosition(sourceImage, loadedImage, cropper, settings);
        }
        /** @type {?} */
        const resizeRatio = this.getResizeRatio(width, height, settings);
        if (resizeRatio !== 1) {
            output.width = Math.round(width * resizeRatio);
            output.height = settings.maintainAspectRatio
                ? Math.round(output.width / settings.aspectRatio)
                : Math.round(height * resizeRatio);
            resizeCanvas(cropCanvas, output.width, output.height);
        }
        output.base64 = cropCanvas.toDataURL('image/' + settings.format, this.getQuality(settings));
        return output;
    }
    /**
     * @private
     * @param {?} sourceImage
     * @param {?} loadedImage
     * @param {?} cropper
     * @param {?} settings
     * @return {?}
     */
    getImagePosition(sourceImage, loadedImage, cropper, settings) {
        /** @type {?} */
        const sourceImageElement = sourceImage.nativeElement;
        /** @type {?} */
        const ratio = loadedImage.transformed.size.width / sourceImageElement.offsetWidth;
        /** @type {?} */
        const out = {
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
    }
    /**
     * @private
     * @param {?} sourceImage
     * @param {?} loadedImage
     * @param {?} cropper
     * @param {?} settings
     * @return {?}
     */
    getOffsetImagePosition(sourceImage, loadedImage, cropper, settings) {
        /** @type {?} */
        const canvasRotation = settings.canvasRotation + loadedImage.exifTransform.rotate;
        /** @type {?} */
        const sourceImageElement = sourceImage.nativeElement;
        /** @type {?} */
        const ratio = loadedImage.transformed.size.width / sourceImageElement.offsetWidth;
        /** @type {?} */
        let offsetX;
        /** @type {?} */
        let offsetY;
        if (canvasRotation % 2) {
            offsetX = (loadedImage.transformed.size.width - loadedImage.original.size.height) / 2;
            offsetY = (loadedImage.transformed.size.height - loadedImage.original.size.width) / 2;
        }
        else {
            offsetX = (loadedImage.transformed.size.width - loadedImage.original.size.width) / 2;
            offsetY = (loadedImage.transformed.size.height - loadedImage.original.size.height) / 2;
        }
        /** @type {?} */
        const out = {
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
    }
    /**
     * @param {?} width
     * @param {?} height
     * @param {?} settings
     * @return {?}
     */
    getResizeRatio(width, height, settings) {
        /** @type {?} */
        const ratioWidth = settings.resizeToWidth / width;
        /** @type {?} */
        const ratioHeight = settings.resizeToHeight / height;
        /** @type {?} */
        const ratios = new Array();
        if (settings.resizeToWidth > 0) {
            ratios.push(ratioWidth);
        }
        if (settings.resizeToHeight > 0) {
            ratios.push(ratioHeight);
        }
        /** @type {?} */
        const result = ratios.length === 0 ? 1 : Math.min(...ratios);
        if (result > 1 && !settings.onlyScaleDown) {
            return result;
        }
        return Math.min(result, 1);
    }
    /**
     * @param {?} settings
     * @return {?}
     */
    getQuality(settings) {
        return Math.min(1, Math.max(0, settings.imageQuality / 100));
    }
}
CropService.ɵfac = function CropService_Factory(t) { return new (t || CropService)(); };
CropService.ɵprov = /*@__PURE__*/ ɵngcc0.ɵɵdefineInjectable({ token: CropService, factory: CropService.ɵfac, providedIn: 'root' });
/** @nocollapse */ CropService.ngInjectableDef = ɵɵdefineInjectable({ factory: function CropService_Factory() { return new CropService(); }, token: CropService, providedIn: "root" });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(CropService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * Generated from: lib/interfaces/cropper.settings.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CropperSettings {
    constructor() {
        // From options
        this.format = 'png';
        this.maintainAspectRatio = true;
        this.transform = {};
        this.aspectRatio = 1;
        this.resizeToWidth = 0;
        this.resizeToHeight = 0;
        this.cropperMinWidth = 0;
        this.cropperMinHeight = 0;
        this.cropperMaxHeight = 0;
        this.cropperMaxWidth = 0;
        this.cropperStaticWidth = 0;
        this.cropperStaticHeight = 0;
        this.canvasRotation = 0;
        this.initialStepSize = 3;
        this.roundCropper = false;
        this.onlyScaleDown = false;
        this.imageQuality = 92;
        this.autoCrop = true;
        this.backgroundColor = undefined;
        this.containWithinAspectRatio = false;
        this.hideResizeSquares = false;
        this.alignImage = 'center';
        // Internal
        this.cropperScaledMinWidth = 20;
        this.cropperScaledMinHeight = 20;
        this.cropperScaledMaxWidth = 20;
        this.cropperScaledMaxHeight = 20;
        this.stepSize = this.initialStepSize;
    }
    /**
     * @param {?} options
     * @return {?}
     */
    setOptions(options) {
        Object.keys(options)
            .filter((/**
         * @param {?} k
         * @return {?}
         */
        (k) => k in this))
            .forEach((/**
         * @param {?} k
         * @return {?}
         */
        (k) => this[k] = options[k]));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    setOptionsFromChanges(changes) {
        Object.keys(changes)
            .filter((/**
         * @param {?} k
         * @return {?}
         */
        (k) => k in this))
            .forEach((/**
         * @param {?} k
         * @return {?}
         */
        (k) => this[k] = changes[k].currentValue));
    }
}
if (false) {
    /** @type {?} */
    CropperSettings.prototype.format;
    /** @type {?} */
    CropperSettings.prototype.maintainAspectRatio;
    /** @type {?} */
    CropperSettings.prototype.transform;
    /** @type {?} */
    CropperSettings.prototype.aspectRatio;
    /** @type {?} */
    CropperSettings.prototype.resizeToWidth;
    /** @type {?} */
    CropperSettings.prototype.resizeToHeight;
    /** @type {?} */
    CropperSettings.prototype.cropperMinWidth;
    /** @type {?} */
    CropperSettings.prototype.cropperMinHeight;
    /** @type {?} */
    CropperSettings.prototype.cropperMaxHeight;
    /** @type {?} */
    CropperSettings.prototype.cropperMaxWidth;
    /** @type {?} */
    CropperSettings.prototype.cropperStaticWidth;
    /** @type {?} */
    CropperSettings.prototype.cropperStaticHeight;
    /** @type {?} */
    CropperSettings.prototype.canvasRotation;
    /** @type {?} */
    CropperSettings.prototype.initialStepSize;
    /** @type {?} */
    CropperSettings.prototype.roundCropper;
    /** @type {?} */
    CropperSettings.prototype.onlyScaleDown;
    /** @type {?} */
    CropperSettings.prototype.imageQuality;
    /** @type {?} */
    CropperSettings.prototype.autoCrop;
    /** @type {?} */
    CropperSettings.prototype.backgroundColor;
    /** @type {?} */
    CropperSettings.prototype.containWithinAspectRatio;
    /** @type {?} */
    CropperSettings.prototype.hideResizeSquares;
    /** @type {?} */
    CropperSettings.prototype.alignImage;
    /** @type {?} */
    CropperSettings.prototype.cropperScaledMinWidth;
    /** @type {?} */
    CropperSettings.prototype.cropperScaledMinHeight;
    /** @type {?} */
    CropperSettings.prototype.cropperScaledMaxWidth;
    /** @type {?} */
    CropperSettings.prototype.cropperScaledMaxHeight;
    /** @type {?} */
    CropperSettings.prototype.stepSize;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/utils/exif.utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Black 2x1 JPEG, with the following meta information set:
// - EXIF Orientation: 6 (Rotated 90° CCW)
// Source: https://github.com/blueimp/JavaScript-Load-Image
/** @type {?} */
const testAutoOrientationImageURL = 'data:image/jpeg;base64,/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAA' +
    'AAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBA' +
    'QEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQE' +
    'BAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAEAAgMBEQACEQEDEQH/x' +
    'ABKAAEAAAAAAAAAAAAAAAAAAAALEAEAAAAAAAAAAAAAAAAAAAAAAQEAAAAAAAAAAAAAAAA' +
    'AAAAAEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8H//2Q==';
/**
 * @return {?}
 */
function supportsAutomaticRotation() {
    return new Promise((/**
     * @param {?} resolve
     * @return {?}
     */
    (resolve) => {
        /** @type {?} */
        const img = new Image();
        img.onload = (/**
         * @return {?}
         */
        () => {
            // Check if browser supports automatic image orientation:
            /** @type {?} */
            const supported = img.width === 1 && img.height === 2;
            resolve(supported);
        });
        img.src = testAutoOrientationImageURL;
    }));
}
/**
 * @param {?} exifRotationOrBase64Image
 * @return {?}
 */
function getTransformationsFromExifData(exifRotationOrBase64Image) {
    if (typeof exifRotationOrBase64Image === 'string') {
        exifRotationOrBase64Image = getExifRotation(exifRotationOrBase64Image);
    }
    switch (exifRotationOrBase64Image) {
        case 2:
            return { rotate: 0, flip: true };
        case 3:
            return { rotate: 2, flip: false };
        case 4:
            return { rotate: 2, flip: true };
        case 5:
            return { rotate: 1, flip: true };
        case 6:
            return { rotate: 1, flip: false };
        case 7:
            return { rotate: 3, flip: true };
        case 8:
            return { rotate: 3, flip: false };
        default:
            return { rotate: 0, flip: false };
    }
}
/**
 * @param {?} imageBase64
 * @return {?}
 */
function getExifRotation(imageBase64) {
    /** @type {?} */
    const view = new DataView(base64ToArrayBuffer(imageBase64));
    if (view.getUint16(0, false) != 0xFFD8) {
        return -2;
    }
    /** @type {?} */
    const length = view.byteLength;
    /** @type {?} */
    let offset = 2;
    while (offset < length) {
        if (view.getUint16(offset + 2, false) <= 8)
            return -1;
        /** @type {?} */
        const marker = view.getUint16(offset, false);
        offset += 2;
        if (marker == 0xFFE1) {
            if (view.getUint32(offset += 2, false) != 0x45786966) {
                return -1;
            }
            /** @type {?} */
            const little = view.getUint16(offset += 6, false) == 0x4949;
            offset += view.getUint32(offset + 4, little);
            /** @type {?} */
            const tags = view.getUint16(offset, little);
            offset += 2;
            for (let i = 0; i < tags; i++) {
                if (view.getUint16(offset + (i * 12), little) == 0x0112) {
                    return view.getUint16(offset + (i * 12) + 8, little);
                }
            }
        }
        else if ((marker & 0xFF00) != 0xFF00) {
            break;
        }
        else {
            offset += view.getUint16(offset, false);
        }
    }
    return -1;
}
/**
 * @param {?} imageBase64
 * @return {?}
 */
function base64ToArrayBuffer(imageBase64) {
    imageBase64 = imageBase64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
    /** @type {?} */
    const binaryString = atob(imageBase64);
    /** @type {?} */
    const len = binaryString.length;
    /** @type {?} */
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/load-image.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
class LoadImageService {
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
        return __awaiter(this, void 0, void 0, function* () {
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
        return __awaiter(this, void 0, void 0, function* () {
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
LoadImageService.ɵfac = function LoadImageService_Factory(t) { return new (t || LoadImageService)(); };
LoadImageService.ɵprov = /*@__PURE__*/ ɵngcc0.ɵɵdefineInjectable({ token: LoadImageService, factory: LoadImageService.ɵfac, providedIn: 'root' });
/** @nocollapse */ LoadImageService.ngInjectableDef = ɵɵdefineInjectable({ factory: function LoadImageService_Factory() { return new LoadImageService(); }, token: LoadImageService, providedIn: "root" });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(LoadImageService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return []; }, null); })();
if (false) {
    /**
     * @type {?}
     * @private
     */
    LoadImageService.prototype.autoRotateSupported;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/cropper-position.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CropperPositionService {
    /**
     * @param {?} sourceImage
     * @param {?} cropperPosition
     * @param {?} settings
     * @return {?}
     */
    resetCropperPosition(sourceImage, cropperPosition, settings) {
        /** @type {?} */
        const sourceImageElement = sourceImage.nativeElement;
        if (settings.cropperStaticHeight && settings.cropperStaticWidth) {
            cropperPosition.x1 = 0;
            cropperPosition.x2 = sourceImageElement.offsetWidth > settings.cropperStaticWidth ?
                settings.cropperStaticWidth : sourceImageElement.offsetWidth;
            cropperPosition.y1 = 0;
            cropperPosition.y2 = sourceImageElement.offsetHeight > settings.cropperStaticHeight ?
                settings.cropperStaticHeight : sourceImageElement.offsetHeight;
        }
        else {
            /** @type {?} */
            const cropperWidth = Math.min(settings.cropperScaledMaxWidth, sourceImageElement.offsetWidth);
            /** @type {?} */
            const cropperHeight = Math.min(settings.cropperScaledMaxHeight, sourceImageElement.offsetHeight);
            if (!settings.maintainAspectRatio) {
                cropperPosition.x1 = 0;
                cropperPosition.x2 = cropperWidth;
                cropperPosition.y1 = 0;
                cropperPosition.y2 = cropperHeight;
            }
            else if (cropperWidth / settings.aspectRatio < cropperHeight) {
                cropperPosition.x1 = 0;
                cropperPosition.x2 = cropperWidth;
                /** @type {?} */
                const cropperHeightWithAspectRatio = cropperWidth / settings.aspectRatio;
                cropperPosition.y1 = (sourceImageElement.offsetHeight - cropperHeightWithAspectRatio) / 2;
                cropperPosition.y2 = cropperPosition.y1 + cropperHeightWithAspectRatio;
            }
            else {
                cropperPosition.y1 = 0;
                cropperPosition.y2 = cropperHeight;
                /** @type {?} */
                const cropperWidthWithAspectRatio = cropperHeight * settings.aspectRatio;
                cropperPosition.x1 = (sourceImageElement.offsetWidth - cropperWidthWithAspectRatio) / 2;
                cropperPosition.x2 = cropperPosition.x1 + cropperWidthWithAspectRatio;
            }
        }
    }
    /**
     * @param {?} event
     * @param {?} moveStart
     * @param {?} cropperPosition
     * @return {?}
     */
    move(event, moveStart, cropperPosition) {
        /** @type {?} */
        const diffX = this.getClientX(event) - moveStart.clientX;
        /** @type {?} */
        const diffY = this.getClientY(event) - moveStart.clientY;
        cropperPosition.x1 = moveStart.x1 + diffX;
        cropperPosition.y1 = moveStart.y1 + diffY;
        cropperPosition.x2 = moveStart.x2 + diffX;
        cropperPosition.y2 = moveStart.y2 + diffY;
    }
    /**
     * @param {?} event
     * @param {?} moveStart
     * @param {?} cropperPosition
     * @param {?} maxSize
     * @param {?} settings
     * @return {?}
     */
    resize(event, moveStart, cropperPosition, maxSize, settings) {
        /** @type {?} */
        const moveX = this.getClientX(event) - moveStart.clientX;
        /** @type {?} */
        const moveY = this.getClientY(event) - moveStart.clientY;
        switch (moveStart.position) {
            case 'left':
                cropperPosition.x1 = Math.min(Math.max(moveStart.x1 + moveX, cropperPosition.x2 - settings.cropperScaledMaxWidth), cropperPosition.x2 - settings.cropperScaledMinWidth);
                break;
            case 'topleft':
                cropperPosition.x1 = Math.min(Math.max(moveStart.x1 + moveX, cropperPosition.x2 - settings.cropperScaledMaxWidth), cropperPosition.x2 - settings.cropperScaledMinWidth);
                cropperPosition.y1 = Math.min(Math.max(moveStart.y1 + moveY, cropperPosition.y2 - settings.cropperScaledMaxHeight), cropperPosition.y2 - settings.cropperScaledMinHeight);
                break;
            case 'top':
                cropperPosition.y1 = Math.min(Math.max(moveStart.y1 + moveY, cropperPosition.y2 - settings.cropperScaledMaxHeight), cropperPosition.y2 - settings.cropperScaledMinHeight);
                break;
            case 'topright':
                cropperPosition.x2 = Math.max(Math.min(moveStart.x2 + moveX, cropperPosition.x1 + settings.cropperScaledMaxWidth), cropperPosition.x1 + settings.cropperScaledMinWidth);
                cropperPosition.y1 = Math.min(Math.max(moveStart.y1 + moveY, cropperPosition.y2 - settings.cropperScaledMaxHeight), cropperPosition.y2 - settings.cropperScaledMinHeight);
                break;
            case 'right':
                cropperPosition.x2 = Math.max(Math.min(moveStart.x2 + moveX, cropperPosition.x1 + settings.cropperScaledMaxWidth), cropperPosition.x1 + settings.cropperScaledMinWidth);
                break;
            case 'bottomright':
                cropperPosition.x2 = Math.max(Math.min(moveStart.x2 + moveX, cropperPosition.x1 + settings.cropperScaledMaxWidth), cropperPosition.x1 + settings.cropperScaledMinWidth);
                cropperPosition.y2 = Math.max(Math.min(moveStart.y2 + moveY, cropperPosition.y1 + settings.cropperScaledMaxHeight), cropperPosition.y1 + settings.cropperScaledMinHeight);
                break;
            case 'bottom':
                cropperPosition.y2 = Math.max(Math.min(moveStart.y2 + moveY, cropperPosition.y1 + settings.cropperScaledMaxHeight), cropperPosition.y1 + settings.cropperScaledMinHeight);
                break;
            case 'bottomleft':
                cropperPosition.x1 = Math.min(Math.max(moveStart.x1 + moveX, cropperPosition.x2 - settings.cropperScaledMaxWidth), cropperPosition.x2 - settings.cropperScaledMinWidth);
                cropperPosition.y2 = Math.max(Math.min(moveStart.y2 + moveY, cropperPosition.y1 + settings.cropperScaledMaxHeight), cropperPosition.y1 + settings.cropperScaledMinHeight);
                break;
            case 'center':
                /** @type {?} */
                const scale = event.scale;
                /** @type {?} */
                const newWidth = Math.min(Math.max(settings.cropperScaledMinWidth, (Math.abs(moveStart.x2 - moveStart.x1)) * scale), settings.cropperScaledMaxWidth);
                /** @type {?} */
                const newHeight = Math.min(Math.max(settings.cropperScaledMinHeight, (Math.abs(moveStart.y2 - moveStart.y1)) * scale), settings.cropperScaledMaxHeight);
                cropperPosition.x1 = moveStart.clientX - newWidth / 2;
                cropperPosition.x2 = moveStart.clientX + newWidth / 2;
                cropperPosition.y1 = moveStart.clientY - newHeight / 2;
                cropperPosition.y2 = moveStart.clientY + newHeight / 2;
                if (cropperPosition.x1 < 0) {
                    cropperPosition.x2 -= cropperPosition.x1;
                    cropperPosition.x1 = 0;
                }
                else if (cropperPosition.x2 > maxSize.width) {
                    cropperPosition.x1 -= (cropperPosition.x2 - maxSize.width);
                    cropperPosition.x2 = maxSize.width;
                }
                if (cropperPosition.y1 < 0) {
                    cropperPosition.y2 -= cropperPosition.y1;
                    cropperPosition.y1 = 0;
                }
                else if (cropperPosition.y2 > maxSize.height) {
                    cropperPosition.y1 -= (cropperPosition.y2 - maxSize.height);
                    cropperPosition.y2 = maxSize.height;
                }
                break;
        }
        if (settings.maintainAspectRatio) {
            this.checkAspectRatio(moveStart.position, cropperPosition, maxSize, settings);
        }
    }
    /**
     * @param {?} position
     * @param {?} cropperPosition
     * @param {?} maxSize
     * @param {?} settings
     * @return {?}
     */
    checkAspectRatio(position, cropperPosition, maxSize, settings) {
        /** @type {?} */
        let overflowX = 0;
        /** @type {?} */
        let overflowY = 0;
        switch (position) {
            case 'top':
                cropperPosition.x2 = cropperPosition.x1 + (cropperPosition.y2 - cropperPosition.y1) * settings.aspectRatio;
                overflowX = Math.max(cropperPosition.x2 - maxSize.width, 0);
                overflowY = Math.max(0 - cropperPosition.y1, 0);
                if (overflowX > 0 || overflowY > 0) {
                    cropperPosition.x2 -= (overflowY * settings.aspectRatio) > overflowX ? (overflowY * settings.aspectRatio) : overflowX;
                    cropperPosition.y1 += (overflowY * settings.aspectRatio) > overflowX ? overflowY : overflowX / settings.aspectRatio;
                }
                break;
            case 'bottom':
                cropperPosition.x2 = cropperPosition.x1 + (cropperPosition.y2 - cropperPosition.y1) * settings.aspectRatio;
                overflowX = Math.max(cropperPosition.x2 - maxSize.width, 0);
                overflowY = Math.max(cropperPosition.y2 - maxSize.height, 0);
                if (overflowX > 0 || overflowY > 0) {
                    cropperPosition.x2 -= (overflowY * settings.aspectRatio) > overflowX ? (overflowY * settings.aspectRatio) : overflowX;
                    cropperPosition.y2 -= (overflowY * settings.aspectRatio) > overflowX ? overflowY : (overflowX / settings.aspectRatio);
                }
                break;
            case 'topleft':
                cropperPosition.y1 = cropperPosition.y2 - (cropperPosition.x2 - cropperPosition.x1) / settings.aspectRatio;
                overflowX = Math.max(0 - cropperPosition.x1, 0);
                overflowY = Math.max(0 - cropperPosition.y1, 0);
                if (overflowX > 0 || overflowY > 0) {
                    cropperPosition.x1 += (overflowY * settings.aspectRatio) > overflowX ? (overflowY * settings.aspectRatio) : overflowX;
                    cropperPosition.y1 += (overflowY * settings.aspectRatio) > overflowX ? overflowY : overflowX / settings.aspectRatio;
                }
                break;
            case 'topright':
                cropperPosition.y1 = cropperPosition.y2 - (cropperPosition.x2 - cropperPosition.x1) / settings.aspectRatio;
                overflowX = Math.max(cropperPosition.x2 - maxSize.width, 0);
                overflowY = Math.max(0 - cropperPosition.y1, 0);
                if (overflowX > 0 || overflowY > 0) {
                    cropperPosition.x2 -= (overflowY * settings.aspectRatio) > overflowX ? (overflowY * settings.aspectRatio) : overflowX;
                    cropperPosition.y1 += (overflowY * settings.aspectRatio) > overflowX ? overflowY : overflowX / settings.aspectRatio;
                }
                break;
            case 'right':
            case 'bottomright':
                cropperPosition.y2 = cropperPosition.y1 + (cropperPosition.x2 - cropperPosition.x1) / settings.aspectRatio;
                overflowX = Math.max(cropperPosition.x2 - maxSize.width, 0);
                overflowY = Math.max(cropperPosition.y2 - maxSize.height, 0);
                if (overflowX > 0 || overflowY > 0) {
                    cropperPosition.x2 -= (overflowY * settings.aspectRatio) > overflowX ? (overflowY * settings.aspectRatio) : overflowX;
                    cropperPosition.y2 -= (overflowY * settings.aspectRatio) > overflowX ? overflowY : overflowX / settings.aspectRatio;
                }
                break;
            case 'left':
            case 'bottomleft':
                cropperPosition.y2 = cropperPosition.y1 + (cropperPosition.x2 - cropperPosition.x1) / settings.aspectRatio;
                overflowX = Math.max(0 - cropperPosition.x1, 0);
                overflowY = Math.max(cropperPosition.y2 - maxSize.height, 0);
                if (overflowX > 0 || overflowY > 0) {
                    cropperPosition.x1 += (overflowY * settings.aspectRatio) > overflowX ? (overflowY * settings.aspectRatio) : overflowX;
                    cropperPosition.y2 -= (overflowY * settings.aspectRatio) > overflowX ? overflowY : overflowX / settings.aspectRatio;
                }
                break;
            case 'center':
                cropperPosition.x2 = cropperPosition.x1 + (cropperPosition.y2 - cropperPosition.y1) * settings.aspectRatio;
                cropperPosition.y2 = cropperPosition.y1 + (cropperPosition.x2 - cropperPosition.x1) / settings.aspectRatio;
                /** @type {?} */
                const overflowX1 = Math.max(0 - cropperPosition.x1, 0);
                /** @type {?} */
                const overflowX2 = Math.max(cropperPosition.x2 - maxSize.width, 0);
                /** @type {?} */
                const overflowY1 = Math.max(cropperPosition.y2 - maxSize.height, 0);
                /** @type {?} */
                const overflowY2 = Math.max(0 - cropperPosition.y1, 0);
                if (overflowX1 > 0 || overflowX2 > 0 || overflowY1 > 0 || overflowY2 > 0) {
                    cropperPosition.x1 += (overflowY1 * settings.aspectRatio) > overflowX1 ? (overflowY1 * settings.aspectRatio) : overflowX1;
                    cropperPosition.x2 -= (overflowY2 * settings.aspectRatio) > overflowX2 ? (overflowY2 * settings.aspectRatio) : overflowX2;
                    cropperPosition.y1 += (overflowY2 * settings.aspectRatio) > overflowX2 ? overflowY2 : overflowX2 / settings.aspectRatio;
                    cropperPosition.y2 -= (overflowY1 * settings.aspectRatio) > overflowX1 ? overflowY1 : overflowX1 / settings.aspectRatio;
                }
                break;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    getClientX(event) {
        return (event.touches && event.touches[0] ? event.touches[0].clientX : event.clientX) || 0;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    getClientY(event) {
        return (event.touches && event.touches[0] ? event.touches[0].clientY : event.clientY) || 0;
    }
}
CropperPositionService.ɵfac = function CropperPositionService_Factory(t) { return new (t || CropperPositionService)(); };
CropperPositionService.ɵprov = /*@__PURE__*/ ɵngcc0.ɵɵdefineInjectable({ token: CropperPositionService, factory: CropperPositionService.ɵfac, providedIn: 'root' });
/** @nocollapse */ CropperPositionService.ngInjectableDef = ɵɵdefineInjectable({ factory: function CropperPositionService_Factory() { return new CropperPositionService(); }, token: CropperPositionService, providedIn: "root" });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(CropperPositionService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * Generated from: lib/utils/keyboard.utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} key
 * @return {?}
 */
function getPositionForKey(key) {
    switch (key) {
        case 'ArrowUp':
            return 'top';
        case 'ArrowRight':
            return 'right';
        case 'ArrowDown':
            return 'bottom';
        case 'ArrowLeft':
        default:
            return 'left';
    }
}
/**
 * @param {?} key
 * @return {?}
 */
function getInvertedPositionForKey(key) {
    switch (key) {
        case 'ArrowUp':
            return 'bottom';
        case 'ArrowRight':
            return 'left';
        case 'ArrowDown':
            return 'top';
        case 'ArrowLeft':
        default:
            return 'right';
    }
}
/**
 * @param {?} key
 * @param {?} stepSize
 * @return {?}
 */
function getEventForKey(key, stepSize) {
    switch (key) {
        case 'ArrowUp':
            return { clientX: 0, clientY: stepSize * -1 };
        case 'ArrowRight':
            return { clientX: stepSize, clientY: 0 };
        case 'ArrowDown':
            return { clientX: 0, clientY: stepSize };
        case 'ArrowLeft':
        default:
            return { clientX: stepSize * -1, clientY: 0 };
    }
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/component/image-cropper.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ImageCropperComponent {
    /**
     * @param {?} cropService
     * @param {?} cropperPositionService
     * @param {?} loadImageService
     * @param {?} sanitizer
     * @param {?} cd
     */
    constructor(cropService, cropperPositionService, loadImageService, sanitizer, cd) {
        this.cropService = cropService;
        this.cropperPositionService = cropperPositionService;
        this.loadImageService = loadImageService;
        this.sanitizer = sanitizer;
        this.cd = cd;
        this.Hammer = typeof window !== 'undefined'
            ? (/** @type {?} */ (((/** @type {?} */ (window))).Hammer))
            : null;
        this.settings = new CropperSettings();
        this.setImageMaxSizeRetries = 0;
        this.marginLeft = '0px';
        this.moveTypes = MoveTypes;
        this.imageVisible = false;
        this.format = this.settings.format;
        this.transform = {};
        this.maintainAspectRatio = this.settings.maintainAspectRatio;
        this.aspectRatio = this.settings.aspectRatio;
        this.resizeToWidth = this.settings.resizeToWidth;
        this.resizeToHeight = this.settings.resizeToHeight;
        this.cropperMinWidth = this.settings.cropperMinWidth;
        this.cropperMinHeight = this.settings.cropperMinHeight;
        this.cropperMaxHeight = this.settings.cropperMaxHeight;
        this.cropperMaxWidth = this.settings.cropperMaxWidth;
        this.cropperStaticWidth = this.settings.cropperStaticWidth;
        this.cropperStaticHeight = this.settings.cropperStaticHeight;
        this.canvasRotation = this.settings.canvasRotation;
        this.initialStepSize = this.settings.initialStepSize;
        this.roundCropper = this.settings.roundCropper;
        this.onlyScaleDown = this.settings.onlyScaleDown;
        this.imageQuality = this.settings.imageQuality;
        this.autoCrop = this.settings.autoCrop;
        this.backgroundColor = this.settings.backgroundColor;
        this.containWithinAspectRatio = this.settings.containWithinAspectRatio;
        this.hideResizeSquares = this.settings.hideResizeSquares;
        this.cropper = {
            x1: -100,
            y1: -100,
            x2: 10000,
            y2: 10000
        };
        this.alignImage = this.settings.alignImage;
        this.disabled = false;
        this.imageCropped = new EventEmitter();
        this.startCropImage = new EventEmitter();
        this.imageLoaded = new EventEmitter();
        this.cropperReady = new EventEmitter();
        this.loadImageFailed = new EventEmitter();
        this.reset();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.onChangesUpdateSettings(changes);
        this.onChangesInputImage(changes);
        if (this.loadedImage && this.loadedImage.original.image.complete
            && (changes.containWithinAspectRatio || changes.canvasRotation)) {
            this.loadImageService
                .transformLoadedImage(this.loadedImage, this.settings)
                .then((/**
             * @param {?} res
             * @return {?}
             */
            (res) => this.setLoadedImage(res)))
                .catch((/**
             * @param {?} err
             * @return {?}
             */
            (err) => this.loadImageError(err)));
        }
        if (changes.cropper) {
            this.setMaxSize();
            this.setCropperScaledMinSize();
            this.setCropperScaledMaxSize();
            this.checkCropperPosition(false);
            this.doAutoCrop();
            this.cd.markForCheck();
        }
        if (changes.aspectRatio && this.imageVisible) {
            this.resetCropperPosition();
        }
        if (changes.transform) {
            this.transform = this.transform || {};
            this.setCssTransform();
            this.doAutoCrop();
        }
    }
    /**
     * @private
     * @param {?} changes
     * @return {?}
     */
    onChangesUpdateSettings(changes) {
        this.settings.setOptionsFromChanges(changes);
        if (this.settings.cropperStaticHeight && this.settings.cropperStaticWidth) {
            this.settings.setOptions({
                hideResizeSquares: true,
                cropperMinWidth: this.settings.cropperStaticWidth,
                cropperMinHeight: this.settings.cropperStaticHeight,
                cropperMaxHeight: this.settings.cropperStaticHeight,
                cropperMaxWidth: this.settings.cropperStaticWidth,
                maintainAspectRatio: false
            });
        }
    }
    /**
     * @private
     * @param {?} changes
     * @return {?}
     */
    onChangesInputImage(changes) {
        if (changes.imageChangedEvent || changes.imageURL || changes.imageBase64 || changes.imageFile) {
            this.reset();
        }
        if (changes.imageChangedEvent && this.isValidImageChangedEvent()) {
            this.loadImageFile(this.imageChangedEvent.target.files[0]);
        }
        if (changes.imageURL && this.imageURL) {
            this.loadImageFromURL(this.imageURL);
        }
        if (changes.imageBase64 && this.imageBase64) {
            this.loadBase64Image(this.imageBase64);
        }
        if (changes.imageFile && this.imageFile) {
            this.loadImageFile(this.imageFile);
        }
    }
    /**
     * @private
     * @return {?}
     */
    isValidImageChangedEvent() {
        return this.imageChangedEvent
            && this.imageChangedEvent.target
            && this.imageChangedEvent.target.files
            && this.imageChangedEvent.target.files.length > 0;
    }
    /**
     * @private
     * @return {?}
     */
    setCssTransform() {
        this.safeTransformStyle = this.sanitizer.bypassSecurityTrustStyle('scaleX(' + (this.transform.scale || 1) * (this.transform.flipH ? -1 : 1) + ')' +
            'scaleY(' + (this.transform.scale || 1) * (this.transform.flipV ? -1 : 1) + ')' +
            'rotate(' + (this.transform.rotate || 0) + 'deg)');
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.settings.stepSize = this.initialStepSize;
        this.activatePinchGesture();
    }
    /**
     * @private
     * @return {?}
     */
    reset() {
        this.imageVisible = false;
        this.loadedImage = null;
        this.safeImgDataUrl = 'data:image/png;base64,iVBORw0KGg'
            + 'oAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAU'
            + 'AAarVyFEAAAAASUVORK5CYII=';
        this.moveStart = {
            active: false,
            type: null,
            position: null,
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            clientX: 0,
            clientY: 0
        };
        this.maxSize = {
            width: 0,
            height: 0
        };
        this.cropper.x1 = -100;
        this.cropper.y1 = -100;
        this.cropper.x2 = 10000;
        this.cropper.y2 = 10000;
    }
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    loadImageFile(file) {
        this.loadImageService
            .loadImageFile(file, this.settings)
            .then((/**
         * @param {?} res
         * @return {?}
         */
        (res) => this.setLoadedImage(res)))
            .catch((/**
         * @param {?} err
         * @return {?}
         */
        (err) => this.loadImageError(err)));
    }
    /**
     * @private
     * @param {?} imageBase64
     * @return {?}
     */
    loadBase64Image(imageBase64) {
        this.loadImageService
            .loadBase64Image(imageBase64, this.settings)
            .then((/**
         * @param {?} res
         * @return {?}
         */
        (res) => this.setLoadedImage(res)))
            .catch((/**
         * @param {?} err
         * @return {?}
         */
        (err) => this.loadImageError(err)));
    }
    /**
     * @private
     * @param {?} url
     * @return {?}
     */
    loadImageFromURL(url) {
        this.loadImageService
            .loadImageFromURL(url, this.settings)
            .then((/**
         * @param {?} res
         * @return {?}
         */
        (res) => this.setLoadedImage(res)))
            .catch((/**
         * @param {?} err
         * @return {?}
         */
        (err) => this.loadImageError(err)));
    }
    /**
     * @private
     * @param {?} loadedImage
     * @return {?}
     */
    setLoadedImage(loadedImage) {
        this.loadedImage = loadedImage;
        this.safeImgDataUrl = this.sanitizer.bypassSecurityTrustResourceUrl(loadedImage.transformed.base64);
        this.cd.markForCheck();
    }
    /**
     * @private
     * @param {?} error
     * @return {?}
     */
    loadImageError(error) {
        console.error(error);
        this.loadImageFailed.emit();
    }
    /**
     * @return {?}
     */
    imageLoadedInView() {
        if (this.loadedImage != null) {
            this.imageLoaded.emit(this.loadedImage);
            this.setImageMaxSizeRetries = 0;
            setTimeout((/**
             * @return {?}
             */
            () => this.checkImageMaxSizeRecursively()));
        }
    }
    /**
     * @private
     * @return {?}
     */
    checkImageMaxSizeRecursively() {
        if (this.setImageMaxSizeRetries > 40) {
            this.loadImageFailed.emit();
        }
        else if (this.sourceImageLoaded()) {
            this.setMaxSize();
            this.setCropperScaledMinSize();
            this.setCropperScaledMaxSize();
            this.resetCropperPosition();
            this.cropperReady.emit(Object.assign({}, this.maxSize));
            this.cd.markForCheck();
        }
        else {
            this.setImageMaxSizeRetries++;
            setTimeout((/**
             * @return {?}
             */
            () => this.checkImageMaxSizeRecursively()), 50);
        }
    }
    /**
     * @private
     * @return {?}
     */
    sourceImageLoaded() {
        return this.sourceImage && this.sourceImage.nativeElement && this.sourceImage.nativeElement.offsetWidth > 0;
    }
    /**
     * @return {?}
     */
    onResize() {
        if (!this.loadedImage) {
            return;
        }
        this.resizeCropperPosition();
        this.setMaxSize();
        this.setCropperScaledMinSize();
        this.setCropperScaledMaxSize();
    }
    /**
     * @private
     * @return {?}
     */
    activatePinchGesture() {
        if (this.Hammer) {
            /** @type {?} */
            const hammer = new this.Hammer(this.wrapper.nativeElement);
            hammer.get('pinch').set({ enable: true });
            hammer.on('pinchmove', this.onPinch.bind(this));
            hammer.on('pinchend', this.pinchStop.bind(this));
            hammer.on('pinchstart', this.startPinch.bind(this));
        }
        else if (isDevMode()) {
            console.warn('[NgxImageCropper] Could not find HammerJS - Pinch Gesture won\'t work');
        }
    }
    /**
     * @private
     * @return {?}
     */
    resizeCropperPosition() {
        /** @type {?} */
        const sourceImageElement = this.sourceImage.nativeElement;
        if (this.maxSize.width !== sourceImageElement.offsetWidth || this.maxSize.height !== sourceImageElement.offsetHeight) {
            this.cropper.x1 = this.cropper.x1 * sourceImageElement.offsetWidth / this.maxSize.width;
            this.cropper.x2 = this.cropper.x2 * sourceImageElement.offsetWidth / this.maxSize.width;
            this.cropper.y1 = this.cropper.y1 * sourceImageElement.offsetHeight / this.maxSize.height;
            this.cropper.y2 = this.cropper.y2 * sourceImageElement.offsetHeight / this.maxSize.height;
        }
    }
    /**
     * @return {?}
     */
    resetCropperPosition() {
        this.cropperPositionService.resetCropperPosition(this.sourceImage, this.cropper, this.settings);
        this.doAutoCrop();
        this.imageVisible = true;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    keyboardAccess(event) {
        this.changeKeyboardStepSize(event);
        this.keyboardMoveCropper(event);
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    changeKeyboardStepSize(event) {
        if (event.key >= '1' && event.key <= '9') {
            this.settings.stepSize = +event.key;
            return;
        }
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    keyboardMoveCropper(event) {
        /** @type {?} */
        const keyboardWhiteList = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'];
        if (!(keyboardWhiteList.includes(event.key))) {
            return;
        }
        /** @type {?} */
        const moveType = event.shiftKey ? MoveTypes.Resize : MoveTypes.Move;
        /** @type {?} */
        const position = event.altKey ? getInvertedPositionForKey(event.key) : getPositionForKey(event.key);
        /** @type {?} */
        const moveEvent = getEventForKey(event.key, this.settings.stepSize);
        event.preventDefault();
        event.stopPropagation();
        this.startMove({ clientX: 0, clientY: 0 }, moveType, position);
        this.moveImg(moveEvent);
        this.moveStop();
    }
    /**
     * @param {?} event
     * @param {?} moveType
     * @param {?=} position
     * @return {?}
     */
    startMove(event, moveType, position = null) {
        if (this.moveStart && this.moveStart.active && this.moveStart.type === MoveTypes.Pinch) {
            return;
        }
        if (event.preventDefault) {
            event.preventDefault();
        }
        this.moveStart = Object.assign({ active: true, type: moveType, position, clientX: this.cropperPositionService.getClientX(event), clientY: this.cropperPositionService.getClientY(event) }, this.cropper);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    startPinch(event) {
        if (!this.safeImgDataUrl) {
            return;
        }
        if (event.preventDefault) {
            event.preventDefault();
        }
        this.moveStart = Object.assign({ active: true, type: MoveTypes.Pinch, position: 'center', clientX: this.cropper.x1 + (this.cropper.x2 - this.cropper.x1) / 2, clientY: this.cropper.y1 + (this.cropper.y2 - this.cropper.y1) / 2 }, this.cropper);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    moveImg(event) {
        if (this.moveStart.active) {
            if (event.stopPropagation) {
                event.stopPropagation();
            }
            if (event.preventDefault) {
                event.preventDefault();
            }
            if (this.moveStart.type === MoveTypes.Move) {
                this.cropperPositionService.move(event, this.moveStart, this.cropper);
                this.checkCropperPosition(true);
            }
            else if (this.moveStart.type === MoveTypes.Resize) {
                if (!this.cropperStaticWidth && !this.cropperStaticHeight) {
                    this.cropperPositionService.resize(event, this.moveStart, this.cropper, this.maxSize, this.settings);
                }
                this.checkCropperPosition(false);
            }
            this.cd.detectChanges();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onPinch(event) {
        if (this.moveStart.active) {
            if (event.stopPropagation) {
                event.stopPropagation();
            }
            if (event.preventDefault) {
                event.preventDefault();
            }
            if (this.moveStart.type === MoveTypes.Pinch) {
                this.cropperPositionService.resize(event, this.moveStart, this.cropper, this.maxSize, this.settings);
                this.checkCropperPosition(false);
            }
            this.cd.detectChanges();
        }
    }
    /**
     * @private
     * @return {?}
     */
    setMaxSize() {
        if (this.sourceImage) {
            /** @type {?} */
            const sourceImageElement = this.sourceImage.nativeElement;
            this.maxSize.width = sourceImageElement.offsetWidth;
            this.maxSize.height = sourceImageElement.offsetHeight;
            this.marginLeft = this.sanitizer.bypassSecurityTrustStyle('calc(50% - ' + this.maxSize.width / 2 + 'px)');
        }
    }
    /**
     * @private
     * @return {?}
     */
    setCropperScaledMinSize() {
        if (this.loadedImage && this.loadedImage.transformed && this.loadedImage.transformed.image) {
            this.setCropperScaledMinWidth();
            this.setCropperScaledMinHeight();
        }
        else {
            this.settings.cropperScaledMinWidth = 20;
            this.settings.cropperScaledMinHeight = 20;
        }
    }
    /**
     * @private
     * @return {?}
     */
    setCropperScaledMinWidth() {
        this.settings.cropperScaledMinWidth = this.cropperMinWidth > 0
            ? Math.max(20, this.cropperMinWidth / this.loadedImage.transformed.image.width * this.maxSize.width)
            : 20;
    }
    /**
     * @private
     * @return {?}
     */
    setCropperScaledMinHeight() {
        if (this.maintainAspectRatio) {
            this.settings.cropperScaledMinHeight = Math.max(20, this.settings.cropperScaledMinWidth / this.aspectRatio);
        }
        else if (this.cropperMinHeight > 0) {
            this.settings.cropperScaledMinHeight = Math.max(20, this.cropperMinHeight / this.loadedImage.transformed.image.height * this.maxSize.height);
        }
        else {
            this.settings.cropperScaledMinHeight = 20;
        }
    }
    /**
     * @private
     * @return {?}
     */
    setCropperScaledMaxSize() {
        if (this.loadedImage && this.loadedImage.transformed && this.loadedImage.transformed.image) {
            /** @type {?} */
            const ratio = this.loadedImage.transformed.size.width / this.maxSize.width;
            this.settings.cropperScaledMaxWidth = this.cropperMaxWidth > 20 ? this.cropperMaxWidth / ratio : this.maxSize.width;
            this.settings.cropperScaledMaxHeight = this.cropperMaxHeight > 20 ? this.cropperMaxHeight / ratio : this.maxSize.height;
            if (this.maintainAspectRatio) {
                if (this.settings.cropperScaledMaxWidth > this.settings.cropperScaledMaxHeight * this.aspectRatio) {
                    this.settings.cropperScaledMaxWidth = this.settings.cropperScaledMaxHeight * this.aspectRatio;
                }
                else if (this.settings.cropperScaledMaxWidth < this.settings.cropperScaledMaxHeight * this.aspectRatio) {
                    this.settings.cropperScaledMaxHeight = this.settings.cropperScaledMaxWidth / this.aspectRatio;
                }
            }
        }
        else {
            this.settings.cropperScaledMaxWidth = this.maxSize.width;
            this.settings.cropperScaledMaxHeight = this.maxSize.height;
        }
    }
    /**
     * @private
     * @param {?=} maintainSize
     * @return {?}
     */
    checkCropperPosition(maintainSize = false) {
        if (this.cropper.x1 < 0) {
            this.cropper.x2 -= maintainSize ? this.cropper.x1 : 0;
            this.cropper.x1 = 0;
        }
        if (this.cropper.y1 < 0) {
            this.cropper.y2 -= maintainSize ? this.cropper.y1 : 0;
            this.cropper.y1 = 0;
        }
        if (this.cropper.x2 > this.maxSize.width) {
            this.cropper.x1 -= maintainSize ? (this.cropper.x2 - this.maxSize.width) : 0;
            this.cropper.x2 = this.maxSize.width;
        }
        if (this.cropper.y2 > this.maxSize.height) {
            this.cropper.y1 -= maintainSize ? (this.cropper.y2 - this.maxSize.height) : 0;
            this.cropper.y2 = this.maxSize.height;
        }
    }
    /**
     * @return {?}
     */
    moveStop() {
        if (this.moveStart.active) {
            this.moveStart.active = false;
            this.doAutoCrop();
        }
    }
    /**
     * @return {?}
     */
    pinchStop() {
        if (this.moveStart.active) {
            this.moveStart.active = false;
            this.doAutoCrop();
        }
    }
    /**
     * @private
     * @return {?}
     */
    doAutoCrop() {
        if (this.autoCrop) {
            this.crop();
        }
    }
    /**
     * @return {?}
     */
    crop() {
        if (this.sourceImage && this.sourceImage.nativeElement && this.loadedImage.transformed.image != null) {
            this.startCropImage.emit();
            /** @type {?} */
            const output = this.cropService.crop(this.sourceImage, this.loadedImage, this.cropper, this.settings);
            if (output != null) {
                this.imageCropped.emit(output);
            }
            return output;
        }
        return null;
    }
}
ImageCropperComponent.ɵfac = function ImageCropperComponent_Factory(t) { return new (t || ImageCropperComponent)(ɵngcc0.ɵɵdirectiveInject(CropService), ɵngcc0.ɵɵdirectiveInject(CropperPositionService), ɵngcc0.ɵɵdirectiveInject(LoadImageService), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.DomSanitizer), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ChangeDetectorRef)); };
ImageCropperComponent.ɵcmp = /*@__PURE__*/ ɵngcc0.ɵɵdefineComponent({ type: ImageCropperComponent, selectors: [["image-cropper"]], viewQuery: function ImageCropperComponent_Query(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵviewQuery(_c0, 7);
        ɵngcc0.ɵɵviewQuery(_c1, 5);
    } if (rf & 2) {
        let _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.wrapper = _t.first);
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.sourceImage = _t.first);
    } }, hostVars: 4, hostBindings: function ImageCropperComponent_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("resize", function ImageCropperComponent_resize_HostBindingHandler() { return ctx.onResize(); }, false, ɵngcc0.ɵɵresolveWindow)("mousemove", function ImageCropperComponent_mousemove_HostBindingHandler($event) { return ctx.moveImg($event); }, false, ɵngcc0.ɵɵresolveDocument)("touchmove", function ImageCropperComponent_touchmove_HostBindingHandler($event) { return ctx.moveImg($event); }, false, ɵngcc0.ɵɵresolveDocument)("mouseup", function ImageCropperComponent_mouseup_HostBindingHandler() { return ctx.moveStop(); }, false, ɵngcc0.ɵɵresolveDocument)("touchend", function ImageCropperComponent_touchend_HostBindingHandler() { return ctx.moveStop(); }, false, ɵngcc0.ɵɵresolveDocument);
    } if (rf & 2) {
        ɵngcc0.ɵɵstyleProp("text-align", ctx.alignImage);
        ɵngcc0.ɵɵclassProp("disabled", ctx.disabled);
    } }, inputs: { format: "format", transform: "transform", maintainAspectRatio: "maintainAspectRatio", aspectRatio: "aspectRatio", resizeToWidth: "resizeToWidth", resizeToHeight: "resizeToHeight", cropperMinWidth: "cropperMinWidth", cropperMinHeight: "cropperMinHeight", cropperMaxHeight: "cropperMaxHeight", cropperMaxWidth: "cropperMaxWidth", cropperStaticWidth: "cropperStaticWidth", cropperStaticHeight: "cropperStaticHeight", canvasRotation: "canvasRotation", initialStepSize: "initialStepSize", roundCropper: "roundCropper", onlyScaleDown: "onlyScaleDown", imageQuality: "imageQuality", autoCrop: "autoCrop", backgroundColor: "backgroundColor", containWithinAspectRatio: "containWithinAspectRatio", hideResizeSquares: "hideResizeSquares", cropper: "cropper", alignImage: "alignImage", disabled: "disabled", imageChangedEvent: "imageChangedEvent", imageURL: "imageURL", imageBase64: "imageBase64", imageFile: "imageFile" }, outputs: { imageCropped: "imageCropped", startCropImage: "startCropImage", imageLoaded: "imageLoaded", cropperReady: "cropperReady", loadImageFailed: "loadImageFailed" }, features: [ɵngcc0.ɵɵNgOnChangesFeature], decls: 5, vars: 10, consts: [["wrapper", ""], ["class", "source-image", 3, "src", "visibility", "transform", "load", 4, "ngIf"], [1, "overlay"], ["class", "cropper", "tabindex", "0", 3, "rounded", "top", "left", "width", "height", "margin-left", "visibility", "keydown", 4, "ngIf"], [1, "source-image", 3, "src", "load"], ["sourceImage", ""], ["tabindex", "0", 1, "cropper", 3, "keydown"], [1, "move", 3, "mousedown", "touchstart"], [4, "ngIf"], [1, "resize", "topleft", 3, "mousedown", "touchstart"], [1, "square"], [1, "resize", "top"], [1, "resize", "topright", 3, "mousedown", "touchstart"], [1, "resize", "right"], [1, "resize", "bottomright", 3, "mousedown", "touchstart"], [1, "resize", "bottom"], [1, "resize", "bottomleft", 3, "mousedown", "touchstart"], [1, "resize", "left"], [1, "resize-bar", "top", 3, "mousedown", "touchstart"], [1, "resize-bar", "right", 3, "mousedown", "touchstart"], [1, "resize-bar", "bottom", 3, "mousedown", "touchstart"], [1, "resize-bar", "left", 3, "mousedown", "touchstart"]], template: function ImageCropperComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", null, 0);
        ɵngcc0.ɵɵtemplate(2, ImageCropperComponent_img_2_Template, 2, 5, "img", 1);
        ɵngcc0.ɵɵelement(3, "div", 2);
        ɵngcc0.ɵɵtemplate(4, ImageCropperComponent_div_4_Template, 3, 15, "div", 3);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵstyleProp("background", ctx.imageVisible && ctx.backgroundColor);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngIf", ctx.safeImgDataUrl);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵstyleProp("width", ctx.maxSize.width, "px")("height", ctx.maxSize.height, "px")("margin-left", ctx.alignImage === "center" ? ctx.marginLeft : null);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.imageVisible);
    } }, directives: [ɵngcc2.NgIf], styles: ["[_nghost-%COMP%]{display:flex;position:relative;width:100%;max-width:100%;max-height:100%;overflow:hidden;padding:5px;text-align:center}[_nghost-%COMP%] > div[_ngcontent-%COMP%]{width:100%;position:relative}[_nghost-%COMP%] > div[_ngcontent-%COMP%]   img.source-image[_ngcontent-%COMP%]{max-width:100%;max-height:100%;transform-origin:center}[_nghost-%COMP%]   .overlay[_ngcontent-%COMP%]{position:absolute;pointer-events:none;touch-action:none;outline:var(--cropper-overlay-color,#fff) solid 100vw;top:0;left:0}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]{position:absolute;display:flex;color:#53535c;background:0 0;outline:rgba(255,255,255,.3) solid 100vw;outline:var(--cropper-outline-color,rgba(255,255,255,.3)) solid 100vw;touch-action:none}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]:after{position:absolute;content:\"\";top:0;bottom:0;left:0;right:0;pointer-events:none;border:1px dashed;opacity:.75;color:inherit;z-index:1}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .move[_ngcontent-%COMP%]{width:100%;cursor:move;border:1px solid rgba(255,255,255,.5)}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]:focus   .move[_ngcontent-%COMP%]{border-color:#1e90ff;border-width:2px}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize[_ngcontent-%COMP%]{position:absolute;display:inline-block;line-height:6px;padding:8px;opacity:.85;z-index:1}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize[_ngcontent-%COMP%]   .square[_ngcontent-%COMP%]{display:inline-block;background:#53535c;width:6px;height:6px;border:1px solid rgba(255,255,255,.5);box-sizing:content-box}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize.topleft[_ngcontent-%COMP%]{top:-12px;left:-12px;cursor:nwse-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize.top[_ngcontent-%COMP%]{top:-12px;left:calc(50% - 12px);cursor:ns-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize.topright[_ngcontent-%COMP%]{top:-12px;right:-12px;cursor:nesw-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize.right[_ngcontent-%COMP%]{top:calc(50% - 12px);right:-12px;cursor:ew-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize.bottomright[_ngcontent-%COMP%]{bottom:-12px;right:-12px;cursor:nwse-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize.bottom[_ngcontent-%COMP%]{bottom:-12px;left:calc(50% - 12px);cursor:ns-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize.bottomleft[_ngcontent-%COMP%]{bottom:-12px;left:-12px;cursor:nesw-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize.left[_ngcontent-%COMP%]{top:calc(50% - 12px);left:-12px;cursor:ew-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize-bar[_ngcontent-%COMP%]{position:absolute;z-index:1}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize-bar.top[_ngcontent-%COMP%]{top:-11px;left:11px;width:calc(100% - 22px);height:22px;cursor:ns-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize-bar.right[_ngcontent-%COMP%]{top:11px;right:-11px;height:calc(100% - 22px);width:22px;cursor:ew-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize-bar.bottom[_ngcontent-%COMP%]{bottom:-11px;left:11px;width:calc(100% - 22px);height:22px;cursor:ns-resize}[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize-bar.left[_ngcontent-%COMP%]{top:11px;left:-11px;height:calc(100% - 22px);width:22px;cursor:ew-resize}[_nghost-%COMP%]   .cropper.rounded[_ngcontent-%COMP%]{outline-color:transparent}[_nghost-%COMP%]   .cropper.rounded[_ngcontent-%COMP%]:after{border-radius:100%;box-shadow:0 0 0 100vw rgba(255,255,255,.3);box-shadow:0 0 0 100vw var(--cropper-outline-color,rgba(255,255,255,.3))}@media (orientation:portrait){[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]{outline-width:100vh}[_nghost-%COMP%]   .cropper.rounded[_ngcontent-%COMP%]:after{box-shadow:0 0 0 100vh rgba(255,255,255,.3);box-shadow:0 0 0 100vh var(--cropper-outline-color,rgba(255,255,255,.3))}}[_nghost-%COMP%]   .cropper.rounded[_ngcontent-%COMP%]   .move[_ngcontent-%COMP%]{border-radius:100%}.disabled[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .move[_ngcontent-%COMP%], .disabled[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize[_ngcontent-%COMP%], .disabled[_nghost-%COMP%]   .cropper[_ngcontent-%COMP%]   .resize-bar[_ngcontent-%COMP%]{display:none}"], changeDetection: 0 });
/** @nocollapse */
ImageCropperComponent.ctorParameters = () => [
    { type: CropService },
    { type: CropperPositionService },
    { type: LoadImageService },
    { type: DomSanitizer },
    { type: ChangeDetectorRef }
];
ImageCropperComponent.propDecorators = {
    wrapper: [{ type: ViewChild, args: ['wrapper', { static: true },] }],
    sourceImage: [{ type: ViewChild, args: ['sourceImage', { static: false },] }],
    imageChangedEvent: [{ type: Input }],
    imageURL: [{ type: Input }],
    imageBase64: [{ type: Input }],
    imageFile: [{ type: Input }],
    format: [{ type: Input }],
    transform: [{ type: Input }],
    maintainAspectRatio: [{ type: Input }],
    aspectRatio: [{ type: Input }],
    resizeToWidth: [{ type: Input }],
    resizeToHeight: [{ type: Input }],
    cropperMinWidth: [{ type: Input }],
    cropperMinHeight: [{ type: Input }],
    cropperMaxHeight: [{ type: Input }],
    cropperMaxWidth: [{ type: Input }],
    cropperStaticWidth: [{ type: Input }],
    cropperStaticHeight: [{ type: Input }],
    canvasRotation: [{ type: Input }],
    initialStepSize: [{ type: Input }],
    roundCropper: [{ type: Input }],
    onlyScaleDown: [{ type: Input }],
    imageQuality: [{ type: Input }],
    autoCrop: [{ type: Input }],
    backgroundColor: [{ type: Input }],
    containWithinAspectRatio: [{ type: Input }],
    hideResizeSquares: [{ type: Input }],
    cropper: [{ type: Input }],
    alignImage: [{ type: HostBinding, args: ['style.text-align',] }, { type: Input }],
    disabled: [{ type: HostBinding, args: ['class.disabled',] }, { type: Input }],
    imageCropped: [{ type: Output }],
    startCropImage: [{ type: Output }],
    imageLoaded: [{ type: Output }],
    cropperReady: [{ type: Output }],
    loadImageFailed: [{ type: Output }],
    onResize: [{ type: HostListener, args: ['window:resize',] }],
    moveImg: [{ type: HostListener, args: ['document:mousemove', ['$event'],] }, { type: HostListener, args: ['document:touchmove', ['$event'],] }],
    moveStop: [{ type: HostListener, args: ['document:mouseup',] }, { type: HostListener, args: ['document:touchend',] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(ImageCropperComponent, [{
        type: Component,
        args: [{
                selector: 'image-cropper',
                template: "<div [style.background]=\"imageVisible && backgroundColor\"\n     #wrapper\n>\n    <img\n      #sourceImage\n      class=\"source-image\"\n      *ngIf=\"safeImgDataUrl\"\n      [src]=\"safeImgDataUrl\"\n      [style.visibility]=\"imageVisible ? 'visible' : 'hidden'\"\n      [style.transform]=\"safeTransformStyle\"\n      (load)=\"imageLoadedInView()\"\n    />\n    <div\n        class=\"overlay\"\n        [style.width.px]=\"maxSize.width\"\n        [style.height.px]=\"maxSize.height\"\n        [style.margin-left]=\"alignImage === 'center' ? marginLeft : null\"\n    ></div>\n    <div class=\"cropper\"\n         *ngIf=\"imageVisible\"\n         [class.rounded]=\"roundCropper\"\n         [style.top.px]=\"cropper.y1\"\n         [style.left.px]=\"cropper.x1\"\n         [style.width.px]=\"cropper.x2 - cropper.x1\"\n         [style.height.px]=\"cropper.y2 - cropper.y1\"\n         [style.margin-left]=\"alignImage === 'center' ? marginLeft : null\"\n         [style.visibility]=\"imageVisible ? 'visible' : 'hidden'\"\n         (keydown)=\"keyboardAccess($event)\"\n         tabindex=\"0\"\n    >\n        <div\n            (mousedown)=\"startMove($event, moveTypes.Move)\"\n            (touchstart)=\"startMove($event, moveTypes.Move)\"\n            class=\"move\">\n        </div>\n        <ng-container *ngIf=\"!hideResizeSquares\">\n            <span class=\"resize topleft\"\n                  (mousedown)=\"startMove($event, moveTypes.Resize, 'topleft')\"\n                  (touchstart)=\"startMove($event, moveTypes.Resize, 'topleft')\">\n                <span class=\"square\"></span>\n            </span>\n            <span class=\"resize top\">\n                <span class=\"square\"></span>\n            </span>\n            <span class=\"resize topright\"\n                  (mousedown)=\"startMove($event, moveTypes.Resize, 'topright')\"\n                  (touchstart)=\"startMove($event, moveTypes.Resize, 'topright')\">\n                <span class=\"square\"></span>\n            </span>\n            <span class=\"resize right\">\n                <span class=\"square\"></span>\n            </span>\n            <span class=\"resize bottomright\"\n                  (mousedown)=\"startMove($event, moveTypes.Resize, 'bottomright')\"\n                  (touchstart)=\"startMove($event, moveTypes.Resize, 'bottomright')\">\n                <span class=\"square\"></span>\n            </span>\n            <span class=\"resize bottom\">\n                <span class=\"square\"></span>\n            </span>\n            <span class=\"resize bottomleft\"\n                  (mousedown)=\"startMove($event, moveTypes.Resize, 'bottomleft')\"\n                  (touchstart)=\"startMove($event, moveTypes.Resize, 'bottomleft')\">\n                <span class=\"square\"></span>\n            </span>\n            <span class=\"resize left\">\n                <span class=\"square\"></span>\n            </span>\n            <span class=\"resize-bar top\"\n                  (mousedown)=\"startMove($event, moveTypes.Resize, 'top')\"\n                  (touchstart)=\"startMove($event, moveTypes.Resize, 'top')\">\n            </span>\n            <span class=\"resize-bar right\"\n                  (mousedown)=\"startMove($event, moveTypes.Resize, 'right')\"\n                  (touchstart)=\"startMove($event, moveTypes.Resize, 'right')\">\n            </span>\n            <span class=\"resize-bar bottom\"\n                  (mousedown)=\"startMove($event, moveTypes.Resize, 'bottom')\"\n                  (touchstart)=\"startMove($event, moveTypes.Resize, 'bottom')\">\n            </span>\n            <span class=\"resize-bar left\"\n                  (mousedown)=\"startMove($event, moveTypes.Resize, 'left')\"\n                  (touchstart)=\"startMove($event, moveTypes.Resize, 'left')\">\n            </span>\n        </ng-container>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:flex;position:relative;width:100%;max-width:100%;max-height:100%;overflow:hidden;padding:5px;text-align:center}:host>div{width:100%;position:relative}:host>div img.source-image{max-width:100%;max-height:100%;transform-origin:center}:host .overlay{position:absolute;pointer-events:none;touch-action:none;outline:var(--cropper-overlay-color,#fff) solid 100vw;top:0;left:0}:host .cropper{position:absolute;display:flex;color:#53535c;background:0 0;outline:rgba(255,255,255,.3) solid 100vw;outline:var(--cropper-outline-color,rgba(255,255,255,.3)) solid 100vw;touch-action:none}:host .cropper:after{position:absolute;content:\"\";top:0;bottom:0;left:0;right:0;pointer-events:none;border:1px dashed;opacity:.75;color:inherit;z-index:1}:host .cropper .move{width:100%;cursor:move;border:1px solid rgba(255,255,255,.5)}:host .cropper:focus .move{border-color:#1e90ff;border-width:2px}:host .cropper .resize{position:absolute;display:inline-block;line-height:6px;padding:8px;opacity:.85;z-index:1}:host .cropper .resize .square{display:inline-block;background:#53535c;width:6px;height:6px;border:1px solid rgba(255,255,255,.5);box-sizing:content-box}:host .cropper .resize.topleft{top:-12px;left:-12px;cursor:nwse-resize}:host .cropper .resize.top{top:-12px;left:calc(50% - 12px);cursor:ns-resize}:host .cropper .resize.topright{top:-12px;right:-12px;cursor:nesw-resize}:host .cropper .resize.right{top:calc(50% - 12px);right:-12px;cursor:ew-resize}:host .cropper .resize.bottomright{bottom:-12px;right:-12px;cursor:nwse-resize}:host .cropper .resize.bottom{bottom:-12px;left:calc(50% - 12px);cursor:ns-resize}:host .cropper .resize.bottomleft{bottom:-12px;left:-12px;cursor:nesw-resize}:host .cropper .resize.left{top:calc(50% - 12px);left:-12px;cursor:ew-resize}:host .cropper .resize-bar{position:absolute;z-index:1}:host .cropper .resize-bar.top{top:-11px;left:11px;width:calc(100% - 22px);height:22px;cursor:ns-resize}:host .cropper .resize-bar.right{top:11px;right:-11px;height:calc(100% - 22px);width:22px;cursor:ew-resize}:host .cropper .resize-bar.bottom{bottom:-11px;left:11px;width:calc(100% - 22px);height:22px;cursor:ns-resize}:host .cropper .resize-bar.left{top:11px;left:-11px;height:calc(100% - 22px);width:22px;cursor:ew-resize}:host .cropper.rounded{outline-color:transparent}:host .cropper.rounded:after{border-radius:100%;box-shadow:0 0 0 100vw rgba(255,255,255,.3);box-shadow:0 0 0 100vw var(--cropper-outline-color,rgba(255,255,255,.3))}@media (orientation:portrait){:host .cropper{outline-width:100vh}:host .cropper.rounded:after{box-shadow:0 0 0 100vh rgba(255,255,255,.3);box-shadow:0 0 0 100vh var(--cropper-outline-color,rgba(255,255,255,.3))}}:host .cropper.rounded .move{border-radius:100%}:host.disabled .cropper .move,:host.disabled .cropper .resize,:host.disabled .cropper .resize-bar{display:none}"]
            }]
    }], function () { return [{ type: CropService }, { type: CropperPositionService }, { type: LoadImageService }, { type: ɵngcc1.DomSanitizer }, { type: ɵngcc0.ChangeDetectorRef }]; }, { format: [{
            type: Input
        }], transform: [{
            type: Input
        }], maintainAspectRatio: [{
            type: Input
        }], aspectRatio: [{
            type: Input
        }], resizeToWidth: [{
            type: Input
        }], resizeToHeight: [{
            type: Input
        }], cropperMinWidth: [{
            type: Input
        }], cropperMinHeight: [{
            type: Input
        }], cropperMaxHeight: [{
            type: Input
        }], cropperMaxWidth: [{
            type: Input
        }], cropperStaticWidth: [{
            type: Input
        }], cropperStaticHeight: [{
            type: Input
        }], canvasRotation: [{
            type: Input
        }], initialStepSize: [{
            type: Input
        }], roundCropper: [{
            type: Input
        }], onlyScaleDown: [{
            type: Input
        }], imageQuality: [{
            type: Input
        }], autoCrop: [{
            type: Input
        }], backgroundColor: [{
            type: Input
        }], containWithinAspectRatio: [{
            type: Input
        }], hideResizeSquares: [{
            type: Input
        }], cropper: [{
            type: Input
        }], alignImage: [{
            type: HostBinding,
            args: ['style.text-align']
        }, {
            type: Input
        }], disabled: [{
            type: HostBinding,
            args: ['class.disabled']
        }, {
            type: Input
        }], imageCropped: [{
            type: Output
        }], startCropImage: [{
            type: Output
        }], imageLoaded: [{
            type: Output
        }], cropperReady: [{
            type: Output
        }], loadImageFailed: [{
            type: Output
        }], 
    /**
     * @return {?}
     */
    onResize: [{
            type: HostListener,
            args: ['window:resize']
        }], 
    /**
     * @param {?} event
     * @return {?}
     */
    moveImg: [{
            type: HostListener,
            args: ['document:mousemove', ['$event']]
        }, {
            type: HostListener,
            args: ['document:touchmove', ['$event']]
        }], 
    /**
     * @return {?}
     */
    moveStop: [{
            type: HostListener,
            args: ['document:mouseup']
        }, {
            type: HostListener,
            args: ['document:touchend']
        }], wrapper: [{
            type: ViewChild,
            args: ['wrapper', { static: true }]
        }], sourceImage: [{
            type: ViewChild,
            args: ['sourceImage', { static: false }]
        }], imageChangedEvent: [{
            type: Input
        }], imageURL: [{
            type: Input
        }], imageBase64: [{
            type: Input
        }], imageFile: [{
            type: Input
        }] }); })();
if (false) {
    /**
     * @type {?}
     * @private
     */
    ImageCropperComponent.prototype.Hammer;
    /**
     * @type {?}
     * @private
     */
    ImageCropperComponent.prototype.settings;
    /**
     * @type {?}
     * @private
     */
    ImageCropperComponent.prototype.setImageMaxSizeRetries;
    /**
     * @type {?}
     * @private
     */
    ImageCropperComponent.prototype.moveStart;
    /**
     * @type {?}
     * @private
     */
    ImageCropperComponent.prototype.loadedImage;
    /** @type {?} */
    ImageCropperComponent.prototype.safeImgDataUrl;
    /** @type {?} */
    ImageCropperComponent.prototype.safeTransformStyle;
    /** @type {?} */
    ImageCropperComponent.prototype.marginLeft;
    /** @type {?} */
    ImageCropperComponent.prototype.maxSize;
    /** @type {?} */
    ImageCropperComponent.prototype.moveTypes;
    /** @type {?} */
    ImageCropperComponent.prototype.imageVisible;
    /** @type {?} */
    ImageCropperComponent.prototype.wrapper;
    /** @type {?} */
    ImageCropperComponent.prototype.sourceImage;
    /** @type {?} */
    ImageCropperComponent.prototype.imageChangedEvent;
    /** @type {?} */
    ImageCropperComponent.prototype.imageURL;
    /** @type {?} */
    ImageCropperComponent.prototype.imageBase64;
    /** @type {?} */
    ImageCropperComponent.prototype.imageFile;
    /** @type {?} */
    ImageCropperComponent.prototype.format;
    /** @type {?} */
    ImageCropperComponent.prototype.transform;
    /** @type {?} */
    ImageCropperComponent.prototype.maintainAspectRatio;
    /** @type {?} */
    ImageCropperComponent.prototype.aspectRatio;
    /** @type {?} */
    ImageCropperComponent.prototype.resizeToWidth;
    /** @type {?} */
    ImageCropperComponent.prototype.resizeToHeight;
    /** @type {?} */
    ImageCropperComponent.prototype.cropperMinWidth;
    /** @type {?} */
    ImageCropperComponent.prototype.cropperMinHeight;
    /** @type {?} */
    ImageCropperComponent.prototype.cropperMaxHeight;
    /** @type {?} */
    ImageCropperComponent.prototype.cropperMaxWidth;
    /** @type {?} */
    ImageCropperComponent.prototype.cropperStaticWidth;
    /** @type {?} */
    ImageCropperComponent.prototype.cropperStaticHeight;
    /** @type {?} */
    ImageCropperComponent.prototype.canvasRotation;
    /** @type {?} */
    ImageCropperComponent.prototype.initialStepSize;
    /** @type {?} */
    ImageCropperComponent.prototype.roundCropper;
    /** @type {?} */
    ImageCropperComponent.prototype.onlyScaleDown;
    /** @type {?} */
    ImageCropperComponent.prototype.imageQuality;
    /** @type {?} */
    ImageCropperComponent.prototype.autoCrop;
    /** @type {?} */
    ImageCropperComponent.prototype.backgroundColor;
    /** @type {?} */
    ImageCropperComponent.prototype.containWithinAspectRatio;
    /** @type {?} */
    ImageCropperComponent.prototype.hideResizeSquares;
    /** @type {?} */
    ImageCropperComponent.prototype.cropper;
    /** @type {?} */
    ImageCropperComponent.prototype.alignImage;
    /** @type {?} */
    ImageCropperComponent.prototype.disabled;
    /** @type {?} */
    ImageCropperComponent.prototype.imageCropped;
    /** @type {?} */
    ImageCropperComponent.prototype.startCropImage;
    /** @type {?} */
    ImageCropperComponent.prototype.imageLoaded;
    /** @type {?} */
    ImageCropperComponent.prototype.cropperReady;
    /** @type {?} */
    ImageCropperComponent.prototype.loadImageFailed;
    /**
     * @type {?}
     * @private
     */
    ImageCropperComponent.prototype.cropService;
    /**
     * @type {?}
     * @private
     */
    ImageCropperComponent.prototype.cropperPositionService;
    /**
     * @type {?}
     * @private
     */
    ImageCropperComponent.prototype.loadImageService;
    /**
     * @type {?}
     * @private
     */
    ImageCropperComponent.prototype.sanitizer;
    /**
     * @type {?}
     * @private
     */
    ImageCropperComponent.prototype.cd;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/image-cropper.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ImageCropperModule {
}
ImageCropperModule.ɵfac = function ImageCropperModule_Factory(t) { return new (t || ImageCropperModule)(); };
ImageCropperModule.ɵmod = /*@__PURE__*/ ɵngcc0.ɵɵdefineNgModule({ type: ImageCropperModule });
ImageCropperModule.ɵinj = /*@__PURE__*/ ɵngcc0.ɵɵdefineInjector({ imports: [[
            CommonModule
        ]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(ImageCropperModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    ImageCropperComponent
                ],
                exports: [
                    ImageCropperComponent
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(ImageCropperModule, { declarations: function () { return [ImageCropperComponent]; }, imports: function () { return [CommonModule]; }, exports: function () { return [ImageCropperComponent]; } }); })();

/**
 * @fileoverview added by tsickle
 * Generated from: lib/interfaces/index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: lib/utils/blob.utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} base64Image
 * @return {?}
 */
function base64ToFile(base64Image) {
    /** @type {?} */
    const split = base64Image.split(',');
    /** @type {?} */
    const type = split[0].replace('data:', '').replace(';base64', '');
    /** @type {?} */
    const byteString = atob(split[1]);
    /** @type {?} */
    const ab = new ArrayBuffer(byteString.length);
    /** @type {?} */
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i += 1) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type });
}

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ngx-image-cropper.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { ImageCropperComponent, ImageCropperModule, base64ToFile, resizeCanvas, CropService as ɵa, CropperPositionService as ɵb, LoadImageService as ɵc };

//# sourceMappingURL=ngx-image-cropper.js.map