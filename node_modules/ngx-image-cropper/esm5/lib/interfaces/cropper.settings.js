/**
 * @fileoverview added by tsickle
 * Generated from: lib/interfaces/cropper.settings.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CropperSettings = /** @class */ (function () {
    function CropperSettings() {
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
    CropperSettings.prototype.setOptions = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        var _this = this;
        Object.keys(options)
            .filter((/**
         * @param {?} k
         * @return {?}
         */
        function (k) { return k in _this; }))
            .forEach((/**
         * @param {?} k
         * @return {?}
         */
        function (k) { return _this[k] = options[k]; }));
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    CropperSettings.prototype.setOptionsFromChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        Object.keys(changes)
            .filter((/**
         * @param {?} k
         * @return {?}
         */
        function (k) { return k in _this; }))
            .forEach((/**
         * @param {?} k
         * @return {?}
         */
        function (k) { return _this[k] = changes[k].currentValue; }));
    };
    return CropperSettings;
}());
export { CropperSettings };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JvcHBlci5zZXR0aW5ncy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1pbWFnZS1jcm9wcGVyLyIsInNvdXJjZXMiOlsibGliL2ludGVyZmFjZXMvY3JvcHBlci5zZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUlBO0lBQUE7O1FBR0UsV0FBTSxHQUFpQixLQUFLLENBQUM7UUFDN0Isd0JBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQzNCLGNBQVMsR0FBbUIsRUFBRSxDQUFDO1FBQy9CLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLG9CQUFlLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLHFCQUFnQixHQUFHLENBQUMsQ0FBQztRQUNyQixxQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFDckIsb0JBQWUsR0FBRyxDQUFDLENBQUM7UUFDcEIsdUJBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLHdCQUFtQixHQUFHLENBQUMsQ0FBQztRQUN4QixtQkFBYyxHQUFHLENBQUMsQ0FBQztRQUNuQixvQkFBZSxHQUFHLENBQUMsQ0FBQztRQUNwQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUNsQixhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLG9CQUFlLEdBQVcsU0FBUyxDQUFDO1FBQ3BDLDZCQUF3QixHQUFHLEtBQUssQ0FBQztRQUNqQyxzQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDMUIsZUFBVSxHQUFzQixRQUFRLENBQUM7O1FBR3pDLDBCQUFxQixHQUFHLEVBQUUsQ0FBQztRQUMzQiwyQkFBc0IsR0FBRyxFQUFFLENBQUM7UUFDNUIsMEJBQXFCLEdBQUcsRUFBRSxDQUFDO1FBQzNCLDJCQUFzQixHQUFHLEVBQUUsQ0FBQztRQUM1QixhQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztJQWFsQyxDQUFDOzs7OztJQVhDLG9DQUFVOzs7O0lBQVYsVUFBVyxPQUFnQztRQUEzQyxpQkFJQztRQUhDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQ2pCLE1BQU07Ozs7UUFBQyxVQUFDLENBQUMsSUFBSyxPQUFBLENBQUMsSUFBSSxLQUFJLEVBQVQsQ0FBUyxFQUFDO2FBQ3hCLE9BQU87Ozs7UUFBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQXBCLENBQW9CLEVBQUMsQ0FBQztJQUMxQyxDQUFDOzs7OztJQUVELCtDQUFxQjs7OztJQUFyQixVQUFzQixPQUFzQjtRQUE1QyxpQkFJQztRQUhDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQ2pCLE1BQU07Ozs7UUFBQyxVQUFDLENBQUMsSUFBSyxPQUFBLENBQUMsSUFBSSxLQUFJLEVBQVQsQ0FBUyxFQUFDO2FBQ3hCLE9BQU87Ozs7UUFBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFqQyxDQUFpQyxFQUFDLENBQUM7SUFDdkQsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQTVDRCxJQTRDQzs7OztJQXpDQyxpQ0FBNkI7O0lBQzdCLDhDQUEyQjs7SUFDM0Isb0NBQStCOztJQUMvQixzQ0FBZ0I7O0lBQ2hCLHdDQUFrQjs7SUFDbEIseUNBQW1COztJQUNuQiwwQ0FBb0I7O0lBQ3BCLDJDQUFxQjs7SUFDckIsMkNBQXFCOztJQUNyQiwwQ0FBb0I7O0lBQ3BCLDZDQUF1Qjs7SUFDdkIsOENBQXdCOztJQUN4Qix5Q0FBbUI7O0lBQ25CLDBDQUFvQjs7SUFDcEIsdUNBQXFCOztJQUNyQix3Q0FBc0I7O0lBQ3RCLHVDQUFrQjs7SUFDbEIsbUNBQWdCOztJQUNoQiwwQ0FBb0M7O0lBQ3BDLG1EQUFpQzs7SUFDakMsNENBQTBCOztJQUMxQixxQ0FBeUM7O0lBR3pDLGdEQUEyQjs7SUFDM0IsaURBQTRCOztJQUM1QixnREFBMkI7O0lBQzNCLGlEQUE0Qjs7SUFDNUIsbUNBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ3JvcHBlck9wdGlvbnMsIE91dHB1dEZvcm1hdCB9IGZyb20gJy4vY3JvcHBlci1vcHRpb25zLmludGVyZmFjZSc7XG5pbXBvcnQgeyBJbWFnZVRyYW5zZm9ybSB9IGZyb20gJy4vaW1hZ2UtdHJhbnNmb3JtLmludGVyZmFjZSc7XG5pbXBvcnQgeyBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBjbGFzcyBDcm9wcGVyU2V0dGluZ3Mge1xuXG4gIC8vIEZyb20gb3B0aW9uc1xuICBmb3JtYXQ6IE91dHB1dEZvcm1hdCA9ICdwbmcnO1xuICBtYWludGFpbkFzcGVjdFJhdGlvID0gdHJ1ZTtcbiAgdHJhbnNmb3JtOiBJbWFnZVRyYW5zZm9ybSA9IHt9O1xuICBhc3BlY3RSYXRpbyA9IDE7XG4gIHJlc2l6ZVRvV2lkdGggPSAwO1xuICByZXNpemVUb0hlaWdodCA9IDA7XG4gIGNyb3BwZXJNaW5XaWR0aCA9IDA7XG4gIGNyb3BwZXJNaW5IZWlnaHQgPSAwO1xuICBjcm9wcGVyTWF4SGVpZ2h0ID0gMDtcbiAgY3JvcHBlck1heFdpZHRoID0gMDtcbiAgY3JvcHBlclN0YXRpY1dpZHRoID0gMDtcbiAgY3JvcHBlclN0YXRpY0hlaWdodCA9IDA7XG4gIGNhbnZhc1JvdGF0aW9uID0gMDtcbiAgaW5pdGlhbFN0ZXBTaXplID0gMztcbiAgcm91bmRDcm9wcGVyID0gZmFsc2U7XG4gIG9ubHlTY2FsZURvd24gPSBmYWxzZTtcbiAgaW1hZ2VRdWFsaXR5ID0gOTI7XG4gIGF1dG9Dcm9wID0gdHJ1ZTtcbiAgYmFja2dyb3VuZENvbG9yOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gIGNvbnRhaW5XaXRoaW5Bc3BlY3RSYXRpbyA9IGZhbHNlO1xuICBoaWRlUmVzaXplU3F1YXJlcyA9IGZhbHNlO1xuICBhbGlnbkltYWdlOiAnbGVmdCcgfCAnY2VudGVyJyA9ICdjZW50ZXInO1xuXG4gIC8vIEludGVybmFsXG4gIGNyb3BwZXJTY2FsZWRNaW5XaWR0aCA9IDIwO1xuICBjcm9wcGVyU2NhbGVkTWluSGVpZ2h0ID0gMjA7XG4gIGNyb3BwZXJTY2FsZWRNYXhXaWR0aCA9IDIwO1xuICBjcm9wcGVyU2NhbGVkTWF4SGVpZ2h0ID0gMjA7XG4gIHN0ZXBTaXplID0gdGhpcy5pbml0aWFsU3RlcFNpemU7XG5cbiAgc2V0T3B0aW9ucyhvcHRpb25zOiBQYXJ0aWFsPENyb3BwZXJPcHRpb25zPik6IHZvaWQge1xuICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpXG4gICAgICAuZmlsdGVyKChrKSA9PiBrIGluIHRoaXMpXG4gICAgICAuZm9yRWFjaCgoaykgPT4gdGhpc1trXSA9IG9wdGlvbnNba10pO1xuICB9XG5cbiAgc2V0T3B0aW9uc0Zyb21DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBPYmplY3Qua2V5cyhjaGFuZ2VzKVxuICAgICAgLmZpbHRlcigoaykgPT4gayBpbiB0aGlzKVxuICAgICAgLmZvckVhY2goKGspID0+IHRoaXNba10gPSBjaGFuZ2VzW2tdLmN1cnJlbnRWYWx1ZSk7XG4gIH1cbn1cbiJdfQ==