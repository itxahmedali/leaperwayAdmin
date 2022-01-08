/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */
/**
 * Basic typings for the CKEditor5 elements.
 */
export var CKEditor5;
(function (CKEditor5) {
    /**
     * The CKEditor5 editor constructor.
     * @record
     */
    function EditorConstructor() { }
    CKEditor5.EditorConstructor = EditorConstructor;
    if (false) {
        /**
         * @param {?} sourceElementOrData
         * @param {?=} config
         * @return {?}
         */
        EditorConstructor.prototype.create = function (sourceElementOrData, config) { };
    }
    /**
     * The CKEditor5 editor config.
     * @record
     */
    function Config() { }
    CKEditor5.Config = Config;
    /**
     * The event object passed to CKEditor5 event callbacks.
     *
     * See https://ckeditor.com/docs/ckeditor5/latest/api/module_utils_eventinfo-EventInfo.html
     * @record
     * @template EventName
     */
    function EventInfo() { }
    CKEditor5.EventInfo = EventInfo;
    if (false) {
        /** @type {?} */
        EventInfo.prototype.name;
        /** @type {?} */
        EventInfo.prototype.path;
        /** @type {?} */
        EventInfo.prototype.source;
        /** @type {?|undefined} */
        EventInfo.prototype.return;
        /**
         * @return {?}
         */
        EventInfo.prototype.off = function () { };
        /**
         * @return {?}
         */
        EventInfo.prototype.stop = function () { };
    }
    /**
     * The base Editor class.
     *
     * See https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editor-Editor.html
     * @record
     */
    function BaseEditor() { }
    CKEditor5.BaseEditor = BaseEditor;
    if (false) {
        /** @type {?} */
        BaseEditor.prototype.commands;
        /** @type {?} */
        BaseEditor.prototype.config;
        /** @type {?} */
        BaseEditor.prototype.conversion;
        /** @type {?} */
        BaseEditor.prototype.data;
        /** @type {?} */
        BaseEditor.prototype.editing;
        /** @type {?} */
        BaseEditor.prototype.keystrokes;
        /** @type {?} */
        BaseEditor.prototype.locale;
        /** @type {?} */
        BaseEditor.prototype.model;
        /** @type {?} */
        BaseEditor.prototype.plugins;
        /** @type {?} */
        BaseEditor.prototype.state;
        /** @type {?} */
        BaseEditor.prototype.isReadOnly;
        /* Skipping unhandled member: [ property: string ]: any;*/
        /**
         * @param {?} events
         * @return {?}
         */
        BaseEditor.prototype.delegate = function (events) { };
        /**
         * @return {?}
         */
        BaseEditor.prototype.destroy = function () { };
        /**
         * @param {?} commandName
         * @param {...?} params
         * @return {?}
         */
        BaseEditor.prototype.execute = function (commandName, params) { };
        /**
         * @param {?} eventName
         * @param {?=} args
         * @return {?}
         */
        BaseEditor.prototype.fire = function (eventName, args) { };
        /**
         * @param {?} emitter
         * @param {?} eventName
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        BaseEditor.prototype.listenTo = function (emitter, eventName, callback, options) { };
        /**
         * @param {?} eventName
         * @param {?} callback
         * @return {?}
         */
        BaseEditor.prototype.off = function (eventName, callback) { };
        /**
         * @param {?} eventName
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        BaseEditor.prototype.on = function (eventName, callback, options) { };
        /**
         * @param {?} eventName
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        BaseEditor.prototype.once = function (eventName, callback, options) { };
        /**
         * @param {?} emitter
         * @param {?} eventName
         * @param {?} callback
         * @return {?}
         */
        BaseEditor.prototype.stopListening = function (emitter, eventName, callback) { };
        /**
         * @param {...?} args
         * @return {?}
         */
        BaseEditor.prototype.t = function (args) { };
    }
    /**
     * The CKEditor5 DataApi interface.
     *
     * See https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_utils_dataapimixin-DataApi.html.
     * @record
     */
    function DataApi() { }
    CKEditor5.DataApi = DataApi;
    if (false) {
        /**
         * @return {?}
         */
        DataApi.prototype.getData = function () { };
        /**
         * @param {?} data
         * @return {?}
         */
        DataApi.prototype.setData = function (data) { };
    }
    /**
     * A CKEditor5 editor that implements the
     * [DataApi interface](https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_utils_dataapimixin-DataApi.html).
     * E.g. the `ClassicEditor`, `InlineEditor`, etc.
     * @record
     */
    function Editor() { }
    CKEditor5.Editor = Editor;
    /**
     * @record
     */
    function ContextWatchdog() { }
    CKEditor5.ContextWatchdog = ContextWatchdog;
    if (false) {
        /** @type {?} */
        ContextWatchdog.prototype.context;
        /** @type {?} */
        ContextWatchdog.prototype._watchdogs;
        /**
         * @param {?} items
         * @return {?}
         */
        ContextWatchdog.prototype.add = function (items) { };
        /**
         * @param {?} items
         * @return {?}
         */
        ContextWatchdog.prototype.remove = function (items) { };
        /**
         * @param {?} itemId
         * @return {?}
         */
        ContextWatchdog.prototype.getItem = function (itemId) { };
        /**
         * @param {?} itemId
         * @param {?} itemType
         * @param {?} watchdog
         * @return {?}
         */
        ContextWatchdog.prototype.addItemWatchdog = function (itemId, itemType, watchdog) { };
    }
    /**
     * @record
     */
    function EditorWatchdog() { }
    CKEditor5.EditorWatchdog = EditorWatchdog;
    if (false) {
        /** @type {?} */
        EditorWatchdog.prototype.editor;
    }
    /**
     * @record
     * @template T
     */
    function Watchdog() { }
    CKEditor5.Watchdog = Watchdog;
    if (false) {
        /**
         * @param {?} creator
         * @return {?}
         */
        Watchdog.prototype.setCreator = function (creator) { };
        /**
         * @param {?} destructor
         * @return {?}
         */
        Watchdog.prototype.setDestructor = function (destructor) { };
        /**
         * @param {?} event
         * @param {?} callback
         * @return {?}
         */
        Watchdog.prototype.on = function (event, callback) { };
        /**
         * @return {?}
         */
        Watchdog.prototype.destroy = function () { };
        /**
         * @param {...?} args
         * @return {?}
         */
        Watchdog.prototype.create = function (args) { };
    }
})(CKEditor5 || (CKEditor5 = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2tlZGl0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2tlZGl0b3IvY2tlZGl0b3I1LWFuZ3VsYXIvIiwic291cmNlcyI6WyJja2VkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE1BQU0sS0FBVyxTQUFTLENBcUd6QjtBQXJHRCxXQUFpQixTQUFTOzs7OztJQUt6QixnQ0FFQzs7Ozs7Ozs7UUFEQSxnRkFBc0Y7Ozs7OztJQU12RixxQkFFQzs7Ozs7Ozs7O0lBT0Qsd0JBUUM7Ozs7UUFQQSx5QkFBeUI7O1FBQ3pCLHlCQUFxQjs7UUFDckIsMkJBQXFCOztRQUNyQiwyQkFBYTs7OztRQUViLDBDQUFZOzs7O1FBQ1osMkNBQWE7Ozs7Ozs7O0lBUWQseUJBMEJDOzs7O1FBekJBLDhCQUF1Qjs7UUFDdkIsNEJBQXFCOztRQUNyQixnQ0FBeUI7O1FBQ3pCLDBCQUFtQjs7UUFDbkIsNkJBQXNCOztRQUN0QixnQ0FBeUI7O1FBQ3pCLDRCQUFxQjs7UUFDckIsMkJBQW9COztRQUNwQiw2QkFBc0I7O1FBQ3RCLDJCQUF1RDs7UUFFdkQsZ0NBQW9COzs7Ozs7UUFFcEIsc0RBQWtDOzs7O1FBQ2xDLCtDQUF5Qjs7Ozs7O1FBQ3pCLGtFQUFzRDs7Ozs7O1FBQ3RELDJEQUEyQzs7Ozs7Ozs7UUFDM0MscUZBQXFGOzs7Ozs7UUFDckYsOERBQW1EOzs7Ozs7O1FBQ25ELHNFQUFpRTs7Ozs7OztRQUNqRSx3RUFBbUU7Ozs7Ozs7UUFDbkUsaUZBQTJFOzs7OztRQUMzRSw2Q0FBMEI7Ozs7Ozs7O0lBVTNCLHNCQUdDOzs7Ozs7UUFGQSw0Q0FBa0I7Ozs7O1FBQ2xCLGdEQUE4Qjs7Ozs7Ozs7SUFRL0IscUJBQXNEOzs7OztJQUV0RCw4QkFPQzs7OztRQU5BLGtDQUFhOztRQUNiLHFDQUF3Qzs7Ozs7UUFDeEMscURBQWlDOzs7OztRQUNqQyx3REFBa0Q7Ozs7O1FBQ2xELDBEQUFrQzs7Ozs7OztRQUNsQyxzRkFBNEY7Ozs7O0lBRzdGLDZCQUVDOzs7O1FBREEsZ0NBQWU7Ozs7OztJQUdoQix1QkFNQzs7Ozs7OztRQUxBLHVEQUE4RDs7Ozs7UUFDOUQsNkRBQWdFOzs7Ozs7UUFDaEUsdURBQStEOzs7O1FBQy9ELDZDQUF5Qjs7Ozs7UUFDekIsZ0RBQXdDOztBQUUxQyxDQUFDLEVBckdnQixTQUFTLEtBQVQsU0FBUyxRQXFHekIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlIENvcHlyaWdodCAoYykgMjAwMy0yMDIwLCBDS1NvdXJjZSAtIEZyZWRlcmljbyBLbmFiYmVuLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogRm9yIGxpY2Vuc2luZywgc2VlIExJQ0VOU0UubWQuXG4gKi9cblxuLyoqXG4gKiBCYXNpYyB0eXBpbmdzIGZvciB0aGUgQ0tFZGl0b3I1IGVsZW1lbnRzLlxuICovXG5leHBvcnQgbmFtZXNwYWNlIENLRWRpdG9yNSB7XG5cblx0LyoqXG5cdCAqIFRoZSBDS0VkaXRvcjUgZWRpdG9yIGNvbnN0cnVjdG9yLlxuXHQgKi9cblx0ZXhwb3J0IGludGVyZmFjZSBFZGl0b3JDb25zdHJ1Y3RvciB7XG5cdFx0Y3JlYXRlKCBzb3VyY2VFbGVtZW50T3JEYXRhOiBIVE1MRWxlbWVudCB8IHN0cmluZywgY29uZmlnPzogQ29uZmlnICk6IFByb21pc2U8RWRpdG9yPjtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgQ0tFZGl0b3I1IGVkaXRvciBjb25maWcuXG5cdCAqL1xuXHRleHBvcnQgaW50ZXJmYWNlIENvbmZpZyB7XG5cdFx0WyBrZXk6IHN0cmluZyBdOiBhbnk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGV2ZW50IG9iamVjdCBwYXNzZWQgdG8gQ0tFZGl0b3I1IGV2ZW50IGNhbGxiYWNrcy5cblx0ICpcblx0ICogU2VlIGh0dHBzOi8vY2tlZGl0b3IuY29tL2RvY3MvY2tlZGl0b3I1L2xhdGVzdC9hcGkvbW9kdWxlX3V0aWxzX2V2ZW50aW5mby1FdmVudEluZm8uaHRtbFxuXHQgKi9cblx0ZXhwb3J0IGludGVyZmFjZSBFdmVudEluZm88RXZlbnROYW1lIGV4dGVuZHMgc3RyaW5nPiB7XG5cdFx0cmVhZG9ubHkgbmFtZTogRXZlbnROYW1lO1xuXHRcdHJlYWRvbmx5IHBhdGg6IGFueVtdO1xuXHRcdHJlYWRvbmx5IHNvdXJjZTogYW55O1xuXHRcdHJldHVybj86IGFueTtcblxuXHRcdG9mZigpOiB2b2lkO1xuXHRcdHN0b3AoKTogdm9pZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgYmFzZSBFZGl0b3IgY2xhc3MuXG5cdCAqXG5cdCAqIFNlZSBodHRwczovL2NrZWRpdG9yLmNvbS9kb2NzL2NrZWRpdG9yNS9sYXRlc3QvYXBpL21vZHVsZV9jb3JlX2VkaXRvcl9lZGl0b3ItRWRpdG9yLmh0bWxcblx0ICovXG5cdGV4cG9ydCBpbnRlcmZhY2UgQmFzZUVkaXRvciB7XG5cdFx0cmVhZG9ubHkgY29tbWFuZHM6IGFueTtcblx0XHRyZWFkb25seSBjb25maWc6IGFueTtcblx0XHRyZWFkb25seSBjb252ZXJzaW9uOiBhbnk7XG5cdFx0cmVhZG9ubHkgZGF0YTogYW55O1xuXHRcdHJlYWRvbmx5IGVkaXRpbmc6IGFueTtcblx0XHRyZWFkb25seSBrZXlzdHJva2VzOiBhbnk7XG5cdFx0cmVhZG9ubHkgbG9jYWxlOiBhbnk7XG5cdFx0cmVhZG9ubHkgbW9kZWw6IGFueTtcblx0XHRyZWFkb25seSBwbHVnaW5zOiBhbnk7XG5cdFx0cmVhZG9ubHkgc3RhdGU6ICdpbml0aWFsaXppbmcnIHwgJ3JlYWR5JyB8ICdkZXN0cm95ZWQnO1xuXG5cdFx0aXNSZWFkT25seTogYm9vbGVhbjtcblxuXHRcdGRlbGVnYXRlKCBldmVudHM6IHN0cmluZ1tdICk6IGFueTtcblx0XHRkZXN0cm95KCk6IFByb21pc2U8dm9pZD47XG5cdFx0ZXhlY3V0ZSggY29tbWFuZE5hbWU6IHN0cmluZywgLi4ucGFyYW1zOiBhbnlbXSApOiBhbnk7XG5cdFx0ZmlyZSggZXZlbnROYW1lOiBzdHJpbmcsIGFyZ3M/OiBhbnkgKTogYW55O1xuXHRcdGxpc3RlblRvKCBlbWl0dGVyOiBhbnksIGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24sIG9wdGlvbnM/OiBhbnkgKTogdm9pZDtcblx0XHRvZmYoIGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24gKTogdm9pZDtcblx0XHRvbiggZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbiwgb3B0aW9ucz86IGFueSApOiB2b2lkO1xuXHRcdG9uY2UoIGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24sIG9wdGlvbnM/OiBhbnkgKTogdm9pZDtcblx0XHRzdG9wTGlzdGVuaW5nKCBlbWl0dGVyOiBhbnksIGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24gKTogdm9pZDtcblx0XHR0KCAuLi5hcmdzOiBhbnlbXSApOiB2b2lkO1xuXG5cdFx0WyBwcm9wZXJ0eTogc3RyaW5nIF06IGFueTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgQ0tFZGl0b3I1IERhdGFBcGkgaW50ZXJmYWNlLlxuXHQgKlxuXHQgKiBTZWUgaHR0cHM6Ly9ja2VkaXRvci5jb20vZG9jcy9ja2VkaXRvcjUvbGF0ZXN0L2FwaS9tb2R1bGVfY29yZV9lZGl0b3JfdXRpbHNfZGF0YWFwaW1peGluLURhdGFBcGkuaHRtbC5cblx0ICovXG5cdGV4cG9ydCBpbnRlcmZhY2UgRGF0YUFwaSB7XG5cdFx0Z2V0RGF0YSgpOiBzdHJpbmc7XG5cdFx0c2V0RGF0YSggZGF0YTogc3RyaW5nICk6IHZvaWQ7XG5cdH1cblxuXHQvKipcblx0ICogQSBDS0VkaXRvcjUgZWRpdG9yIHRoYXQgaW1wbGVtZW50cyB0aGVcblx0ICogW0RhdGFBcGkgaW50ZXJmYWNlXShodHRwczovL2NrZWRpdG9yLmNvbS9kb2NzL2NrZWRpdG9yNS9sYXRlc3QvYXBpL21vZHVsZV9jb3JlX2VkaXRvcl91dGlsc19kYXRhYXBpbWl4aW4tRGF0YUFwaS5odG1sKS5cblx0ICogRS5nLiB0aGUgYENsYXNzaWNFZGl0b3JgLCBgSW5saW5lRWRpdG9yYCwgZXRjLlxuXHQgKi9cblx0ZXhwb3J0IGludGVyZmFjZSBFZGl0b3IgZXh0ZW5kcyBCYXNlRWRpdG9yLCBEYXRhQXBpIHt9XG5cblx0ZXhwb3J0IGludGVyZmFjZSBDb250ZXh0V2F0Y2hkb2cgZXh0ZW5kcyBXYXRjaGRvZzxhbnk+IHtcblx0XHRjb250ZXh0OiBhbnk7XG5cdFx0X3dhdGNoZG9nczogTWFwPHN0cmluZywgRWRpdG9yV2F0Y2hkb2c+O1xuXHRcdGFkZCggaXRlbXM6IGFueSApOiBQcm9taXNlPHZvaWQ+O1xuXHRcdHJlbW92ZSggaXRlbXM6IHN0cmluZyB8IHN0cmluZ1tdICk6IFByb21pc2U8dm9pZD47XG5cdFx0Z2V0SXRlbSggaXRlbUlkOiBzdHJpbmcgKTogRWRpdG9yO1xuXHRcdGFkZEl0ZW1XYXRjaGRvZyggaXRlbUlkOiBzdHJpbmcsIGl0ZW1UeXBlOiBzdHJpbmcsIHdhdGNoZG9nOiBXYXRjaGRvZzxhbnk+ICk6IFByb21pc2U8dm9pZD47XG5cdH1cblxuXHRleHBvcnQgaW50ZXJmYWNlIEVkaXRvcldhdGNoZG9nIGV4dGVuZHMgV2F0Y2hkb2c8RWRpdG9yPiB7XG5cdFx0ZWRpdG9yOiBFZGl0b3I7XG5cdH1cblxuXHRleHBvcnQgaW50ZXJmYWNlIFdhdGNoZG9nPFQ+IHtcblx0XHRzZXRDcmVhdG9yKCBjcmVhdG9yOiAoIC4uLmFyZ3M6IGFueVtdICkgPT4gUHJvbWlzZTxUPiApOiB2b2lkO1xuXHRcdHNldERlc3RydWN0b3IoIGRlc3RydWN0b3I6ICggaXRlbTogVCApID0+IFByb21pc2U8dm9pZD4gKTogdm9pZDtcblx0XHRvbiggZXZlbnQ6IHN0cmluZywgY2FsbGJhY2s6ICggLi4uYXJnczogYW55W10gKSA9PiBhbnkgKTogdm9pZDtcblx0XHRkZXN0cm95KCk6IFByb21pc2U8dm9pZD47XG5cdFx0Y3JlYXRlKCAuLi5hcmdzOiBhbnlbXSApOiBQcm9taXNlPHZvaWQ+O1xuXHR9XG59XG4iXX0=