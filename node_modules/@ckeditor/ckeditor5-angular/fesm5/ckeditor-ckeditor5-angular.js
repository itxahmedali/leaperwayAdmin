import { __awaiter, __generator, __assign } from 'tslib';
import EditorWatchdog from '@ckeditor/ckeditor5-watchdog/src/editorwatchdog';
import { Component, Input, Output, NgZone, EventEmitter, forwardRef, ElementRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

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
var CKEditor5;
(function (CKEditor5) {
    /**
     * The CKEditor5 editor constructor.
     * @record
     */
    function EditorConstructor() { }
    CKEditor5.EditorConstructor = EditorConstructor;
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
    /**
     * The base Editor class.
     *
     * See https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editor-Editor.html
     * @record
     */
    function BaseEditor() { }
    CKEditor5.BaseEditor = BaseEditor;
    /**
     * The CKEditor5 DataApi interface.
     *
     * See https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_utils_dataapimixin-DataApi.html.
     * @record
     */
    function DataApi() { }
    CKEditor5.DataApi = DataApi;
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
    /**
     * @record
     */
    function EditorWatchdog$$1() { }
    CKEditor5.EditorWatchdog = EditorWatchdog$$1;
    /**
     * @record
     * @template T
     */
    function Watchdog() { }
    CKEditor5.Watchdog = Watchdog;
})(CKEditor5 || (CKEditor5 = {}));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
// A copy of @ckeditor/ckeditor5-utils/src/uid.js
// A hash table of hex numbers to avoid using toString() in uid() which is costly.
// [ '00', '01', '02', ..., 'fe', 'ff' ]
var ɵ0 = /**
 * @param {?} val
 * @param {?} index
 * @return {?}
 */
function (val, index) { return ('0' + (index).toString(16)).slice(-2); };
/** @type {?} */
var HEX_NUMBERS = new Array(256).fill(0)
    .map((ɵ0));
/**
 * Returns a unique id. The id starts with an "e" character and a randomly generated string of
 * 32 alphanumeric characters.
 *
 * **Note**: The characters the unique id is built from correspond to the hex number notation
 * (from "0" to "9", from "a" to "f"). In other words, each id corresponds to an "e" followed
 * by 16 8-bit numbers next to each other.
 *
 * @return {?} An unique id string.
 */
function uid() {
    // Let's create some positive random 32bit integers first.
    //
    // 1. Math.random() is a float between 0 and 1.
    // 2. 0x100000000 is 2^32 = 4294967296.
    // 3. >>> 0 enforces integer (in JS all numbers are floating point).
    //
    // For instance:
    //		Math.random() * 0x100000000 = 3366450031.853859
    // but
    //		Math.random() * 0x100000000 >>> 0 = 3366450031.
    /** @type {?} */
    var r1 = Math.random() * 0x100000000 >>> 0;
    /** @type {?} */
    var r2 = Math.random() * 0x100000000 >>> 0;
    /** @type {?} */
    var r3 = Math.random() * 0x100000000 >>> 0;
    /** @type {?} */
    var r4 = Math.random() * 0x100000000 >>> 0;
    // Make sure that id does not start with number.
    return 'e' +
        HEX_NUMBERS[r1 >> 0 & 0xFF] +
        HEX_NUMBERS[r1 >> 8 & 0xFF] +
        HEX_NUMBERS[r1 >> 16 & 0xFF] +
        HEX_NUMBERS[r1 >> 24 & 0xFF] +
        HEX_NUMBERS[r2 >> 0 & 0xFF] +
        HEX_NUMBERS[r2 >> 8 & 0xFF] +
        HEX_NUMBERS[r2 >> 16 & 0xFF] +
        HEX_NUMBERS[r2 >> 24 & 0xFF] +
        HEX_NUMBERS[r3 >> 0 & 0xFF] +
        HEX_NUMBERS[r3 >> 8 & 0xFF] +
        HEX_NUMBERS[r3 >> 16 & 0xFF] +
        HEX_NUMBERS[r3 >> 24 & 0xFF] +
        HEX_NUMBERS[r4 >> 0 & 0xFF] +
        HEX_NUMBERS[r4 >> 8 & 0xFF] +
        HEX_NUMBERS[r4 >> 16 & 0xFF] +
        HEX_NUMBERS[r4 >> 24 & 0xFF];
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CKEditorComponent = /** @class */ (function () {
    function CKEditorComponent(elementRef, ngZone) {
        /**
         * The configuration of the editor.
         * See https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editorconfig-EditorConfig.html
         * to learn more.
         */
        this.config = {};
        /**
         * The initial data of the editor. Useful when not using the ngModel.
         * See https://angular.io/api/forms/NgModel to learn more.
         */
        this.data = '';
        /**
         * Tag name of the editor component.
         *
         * The default tag is 'div'.
         */
        this.tagName = 'div';
        /**
         * Fires when the editor is ready. It corresponds with the `editor#ready`
         * https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editor-Editor.html#event-ready
         * event.
         */
        this.ready = new EventEmitter();
        /**
         * Fires when the content of the editor has changed. It corresponds with the `editor.model.document#change`
         * https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_model_document-Document.html#event-change
         * event.
         */
        this.change = new EventEmitter();
        /**
         * Fires when the editing view of the editor is blurred. It corresponds with the `editor.editing.view.document#blur`
         * https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_view_document-Document.html#event-event:blur
         * event.
         */
        this.blur = new EventEmitter();
        /**
         * Fires when the editing view of the editor is focused. It corresponds with the `editor.editing.view.document#focus`
         * https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_view_document-Document.html#event-event:focus
         * event.
         */
        this.focus = new EventEmitter();
        /**
         * Fires when the editor component crashes.
         */
        this.error = new EventEmitter();
        /**
         * If the component is read–only before the editor instance is created, it remembers that state,
         * so the editor can become read–only once it is ready.
         */
        this.initiallyDisabled = false;
        /**
         * A lock flag preventing from calling the `cvaOnChange()` during setting editor data.
         */
        this.isEditorSettingData = false;
        this.id = uid();
        this.ngZone = ngZone;
        this.elementRef = elementRef;
    }
    Object.defineProperty(CKEditorComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.editorInstance) {
                return this.editorInstance.isReadOnly;
            }
            return this.initiallyDisabled;
        },
        /**
         * When set `true`, the editor becomes read-only.
         * See https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editor-Editor.html#member-isReadOnly
         * to learn more.
         */
        set: /**
         * When set `true`, the editor becomes read-only.
         * See https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editor-Editor.html#member-isReadOnly
         * to learn more.
         * @param {?} isDisabled
         * @return {?}
         */
        function (isDisabled) {
            this.setDisabledState(isDisabled);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CKEditorComponent.prototype, "editorInstance", {
        /**
         * The instance of the editor created by this component.
         */
        get: /**
         * The instance of the editor created by this component.
         * @return {?}
         */
        function () {
            /** @type {?} */
            var editorWatchdog = this.editorWatchdog;
            if (this.watchdog) {
                // Temporarily use the `_watchdogs` internal map as the `getItem()` method throws
                // an error when the item is not registered yet.
                // See https://github.com/ckeditor/ckeditor5-angular/issues/177.
                editorWatchdog = this.watchdog._watchdogs.get(this.id);
            }
            if (editorWatchdog) {
                return editorWatchdog.editor;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    // Implementing the AfterViewInit interface.
    // Implementing the AfterViewInit interface.
    /**
     * @return {?}
     */
    CKEditorComponent.prototype.ngAfterViewInit = 
    // Implementing the AfterViewInit interface.
    /**
     * @return {?}
     */
    function () {
        this.attachToWatchdog();
    };
    // Implementing the OnDestroy interface.
    // Implementing the OnDestroy interface.
    /**
     * @return {?}
     */
    CKEditorComponent.prototype.ngOnDestroy = 
    // Implementing the OnDestroy interface.
    /**
     * @return {?}
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.watchdog) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.watchdog.remove(this.id)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(this.editorWatchdog && this.editorWatchdog.editor)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.editorWatchdog.destroy()];
                    case 3:
                        _a.sent();
                        this.editorWatchdog = undefined;
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Implementing the ControlValueAccessor interface (only when binding to ngModel).
    // Implementing the ControlValueAccessor interface (only when binding to ngModel).
    /**
     * @param {?} value
     * @return {?}
     */
    CKEditorComponent.prototype.writeValue = 
    // Implementing the ControlValueAccessor interface (only when binding to ngModel).
    /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        // This method is called with the `null` value when the form resets.
        // A component's responsibility is to restore to the initial state.
        if (value === null) {
            value = '';
        }
        // If already initialized.
        if (this.editorInstance) {
            // The lock mechanism prevents from calling `cvaOnChange()` during changing
            // the editor state. See #139
            this.isEditorSettingData = true;
            this.editorInstance.setData(value);
            this.isEditorSettingData = false;
        }
        // If not, wait for it to be ready; store the data.
        else {
            this.data = value;
            // If the editor element is already available, then update its content.
            // If the ngModel is used then the editor element should be updated directly here.
            if (this.editorElement) {
                this.editorElement.innerHTML = this.data;
            }
        }
    };
    // Implementing the ControlValueAccessor interface (only when binding to ngModel).
    // Implementing the ControlValueAccessor interface (only when binding to ngModel).
    /**
     * @param {?} callback
     * @return {?}
     */
    CKEditorComponent.prototype.registerOnChange = 
    // Implementing the ControlValueAccessor interface (only when binding to ngModel).
    /**
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        this.cvaOnChange = callback;
    };
    // Implementing the ControlValueAccessor interface (only when binding to ngModel).
    // Implementing the ControlValueAccessor interface (only when binding to ngModel).
    /**
     * @param {?} callback
     * @return {?}
     */
    CKEditorComponent.prototype.registerOnTouched = 
    // Implementing the ControlValueAccessor interface (only when binding to ngModel).
    /**
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        this.cvaOnTouched = callback;
    };
    // Implementing the ControlValueAccessor interface (only when binding to ngModel).
    // Implementing the ControlValueAccessor interface (only when binding to ngModel).
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    CKEditorComponent.prototype.setDisabledState = 
    // Implementing the ControlValueAccessor interface (only when binding to ngModel).
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        // If already initialized.
        if (this.editorInstance) {
            this.editorInstance.isReadOnly = isDisabled;
        }
        // Store the state anyway to use it once the editor is created.
        this.initiallyDisabled = isDisabled;
    };
    /**
     * Creates the editor instance, sets initial editor data, then integrates
     * the editor with the Angular component. This method does not use the `editor.setData()`
     * because of the issue in the collaboration mode (#6).
     */
    /**
     * Creates the editor instance, sets initial editor data, then integrates
     * the editor with the Angular component. This method does not use the `editor.setData()`
     * because of the issue in the collaboration mode (#6).
     * @private
     * @return {?}
     */
    CKEditorComponent.prototype.attachToWatchdog = /**
     * Creates the editor instance, sets initial editor data, then integrates
     * the editor with the Angular component. This method does not use the `editor.setData()`
     * because of the issue in the collaboration mode (#6).
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var creator = (/**
         * @param {?} element
         * @param {?} config
         * @return {?}
         */
        function (element, config) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.ngZone.runOutsideAngular((/**
                     * @return {?}
                     */
                    function () { return __awaiter(_this, void 0, void 0, function () {
                        var editor;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.elementRef.nativeElement.appendChild(element);
                                    return [4 /*yield*/, (/** @type {?} */ (this.editor)).create(element, config)];
                                case 1:
                                    editor = _a.sent();
                                    if (this.initiallyDisabled) {
                                        editor.isReadOnly = this.initiallyDisabled;
                                    }
                                    this.ngZone.run((/**
                                     * @return {?}
                                     */
                                    function () {
                                        _this.ready.emit(editor);
                                    }));
                                    this.setUpEditorEvents(editor);
                                    return [2 /*return*/, editor];
                            }
                        });
                    }); }))];
            });
        }); });
        /** @type {?} */
        var destructor = (/**
         * @param {?} editor
         * @return {?}
         */
        function (editor) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, editor.destroy()];
                    case 1:
                        _a.sent();
                        this.elementRef.nativeElement.removeChild((/** @type {?} */ (this.editorElement)));
                        return [2 /*return*/];
                }
            });
        }); });
        /** @type {?} */
        var emitError = (/**
         * @return {?}
         */
        function () {
            _this.ngZone.run((/**
             * @return {?}
             */
            function () {
                _this.error.emit();
            }));
        });
        /** @type {?} */
        var element = document.createElement(this.tagName);
        /** @type {?} */
        var config = this.getConfig();
        this.editorElement = element;
        // Based on the presence of the watchdog decide how to initialize the editor.
        if (this.watchdog) {
            // When the context watchdog is passed add the new item to it based on the passed configuration.
            this.watchdog.add({
                id: this.id,
                type: 'editor',
                creator: creator,
                destructor: destructor,
                sourceElementOrData: element,
                config: config
            });
            this.watchdog.on('itemError', (/**
             * @param {?} _
             * @param {?} __1
             * @return {?}
             */
            function (_, _a) {
                var itemId = _a.itemId;
                if (itemId === _this.id) {
                    emitError();
                }
            }));
        }
        else {
            // In the other case create the watchdog by hand to keep the editor running.
            /** @type {?} */
            var editorWatchdog = new EditorWatchdog(this.editor);
            editorWatchdog.setCreator(creator);
            editorWatchdog.setDestructor(destructor);
            editorWatchdog.on('error', emitError);
            this.editorWatchdog = editorWatchdog;
            this.editorWatchdog.create(element, config);
        }
    };
    /**
     * @private
     * @return {?}
     */
    CKEditorComponent.prototype.getConfig = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.data && this.config.initialData) {
            throw new Error('Editor data should be provided either using `config.initialData` or `data` properties.');
        }
        // Merge two possible ways of providing data into the `config.initialData` field.
        return __assign({}, this.config, { initialData: this.config.initialData || this.data || '' });
    };
    /**
     * Integrates the editor with the component by attaching related event listeners.
     */
    /**
     * Integrates the editor with the component by attaching related event listeners.
     * @private
     * @param {?} editor
     * @return {?}
     */
    CKEditorComponent.prototype.setUpEditorEvents = /**
     * Integrates the editor with the component by attaching related event listeners.
     * @private
     * @param {?} editor
     * @return {?}
     */
    function (editor) {
        var _this = this;
        /** @type {?} */
        var modelDocument = editor.model.document;
        /** @type {?} */
        var viewDocument = editor.editing.view.document;
        modelDocument.on('change:data', (/**
         * @param {?} evt
         * @return {?}
         */
        function (evt) {
            _this.ngZone.run((/**
             * @return {?}
             */
            function () {
                if (_this.cvaOnChange && !_this.isEditorSettingData) {
                    /** @type {?} */
                    var data = editor.getData();
                    _this.cvaOnChange(data);
                }
                _this.change.emit({ event: evt, editor: editor });
            }));
        }));
        viewDocument.on('focus', (/**
         * @param {?} evt
         * @return {?}
         */
        function (evt) {
            _this.ngZone.run((/**
             * @return {?}
             */
            function () {
                _this.focus.emit({ event: evt, editor: editor });
            }));
        }));
        viewDocument.on('blur', (/**
         * @param {?} evt
         * @return {?}
         */
        function (evt) {
            _this.ngZone.run((/**
             * @return {?}
             */
            function () {
                if (_this.cvaOnTouched) {
                    _this.cvaOnTouched();
                }
                _this.blur.emit({ event: evt, editor: editor });
            }));
        }));
    };
    CKEditorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ckeditor',
                    template: '<ng-template></ng-template>',
                    // Integration with @angular/forms.
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            // eslint-disable-next-line @typescript-eslint/no-use-before-define
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return CKEditorComponent; })),
                            multi: true,
                        }
                    ]
                }] }
    ];
    /** @nocollapse */
    CKEditorComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    CKEditorComponent.propDecorators = {
        editor: [{ type: Input }],
        config: [{ type: Input }],
        data: [{ type: Input }],
        tagName: [{ type: Input }],
        watchdog: [{ type: Input }],
        disabled: [{ type: Input }],
        ready: [{ type: Output }],
        change: [{ type: Output }],
        blur: [{ type: Output }],
        focus: [{ type: Output }],
        error: [{ type: Output }]
    };
    return CKEditorComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CKEditorModule = /** @class */ (function () {
    function CKEditorModule() {
    }
    CKEditorModule.decorators = [
        { type: NgModule, args: [{
                    imports: [FormsModule, CommonModule],
                    declarations: [CKEditorComponent],
                    exports: [CKEditorComponent]
                },] }
    ];
    return CKEditorModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { CKEditorComponent, CKEditorModule };

//# sourceMappingURL=ckeditor-ckeditor5-angular.js.map