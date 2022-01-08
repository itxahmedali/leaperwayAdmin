import { __assign, __decorate, __read, __spread, __values } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren, } from '@angular/core';
import { categories, } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { EmojiFrequentlyService } from './emoji-frequently.service';
import * as icons from './svgs';
import { measureScrollbar } from './utils';
var I18N = {
    search: 'Search',
    emojilist: 'List of emoji',
    notfound: 'No Emoji Found',
    clear: 'Clear',
    categories: {
        search: 'Search Results',
        recent: 'Frequently Used',
        people: 'Smileys & People',
        nature: 'Animals & Nature',
        foods: 'Food & Drink',
        activity: 'Activity',
        places: 'Travel & Places',
        objects: 'Objects',
        symbols: 'Symbols',
        flags: 'Flags',
        custom: 'Custom',
    },
    skintones: {
        1: 'Default Skin Tone',
        2: 'Light Skin Tone',
        3: 'Medium-Light Skin Tone',
        4: 'Medium Skin Tone',
        5: 'Medium-Dark Skin Tone',
        6: 'Dark Skin Tone',
    },
};
var PickerComponent = /** @class */ (function () {
    function PickerComponent(ref, frequently) {
        var _this = this;
        this.ref = ref;
        this.frequently = frequently;
        this.perLine = 9;
        this.totalFrequentLines = 4;
        this.i18n = {};
        this.style = {};
        this.title = 'Emoji Mart™';
        this.emoji = 'department_store';
        this.darkMode = !!(typeof matchMedia === 'function' &&
            matchMedia('(prefers-color-scheme: dark)').matches);
        this.color = '#ae65c5';
        this.hideObsolete = true;
        /** all categories shown */
        this.categories = [];
        /** used to temporarily draw categories */
        this.activeCategories = [];
        this.set = 'apple';
        this.skin = 1;
        /** Renders the native unicode emoji */
        this.isNative = false;
        this.emojiSize = 24;
        this.sheetSize = 64;
        this.showPreview = true;
        this.emojiTooltip = false;
        this.autoFocus = false;
        this.custom = [];
        this.hideRecent = true;
        this.notFoundEmoji = 'sleuth_or_spy';
        this.categoriesIcons = icons.categories;
        this.searchIcons = icons.search;
        this.useButton = false;
        this.enableFrequentEmojiSort = false;
        this.enableSearch = true;
        this.showSingleCategory = false;
        this.emojiClick = new EventEmitter();
        this.emojiSelect = new EventEmitter();
        this.skinChange = new EventEmitter();
        this.scrollHeight = 0;
        this.clientHeight = 0;
        this.firstRender = true;
        this.NAMESPACE = 'emoji-mart';
        this.measureScrollbar = 0;
        this.RECENT_CATEGORY = {
            id: 'recent',
            name: 'Recent',
            emojis: null,
        };
        this.SEARCH_CATEGORY = {
            id: 'search',
            name: 'Search',
            emojis: null,
            anchor: false,
        };
        this.CUSTOM_CATEGORY = {
            id: 'custom',
            name: 'Custom',
            emojis: [],
        };
        this.backgroundImageFn = function (set, sheetSize) {
            return "https://unpkg.com/emoji-datasource-" + _this.set + "@5.0.1/img/" + _this.set + "/sheets-256/" + _this.sheetSize + ".png";
        };
    }
    PickerComponent.prototype.ngOnInit = function () {
        var e_1, _a;
        var _this = this;
        // measure scroll
        this.measureScrollbar = measureScrollbar();
        this.i18n = __assign(__assign({}, I18N), this.i18n);
        this.i18n.categories = __assign(__assign({}, I18N.categories), this.i18n.categories);
        this.skin =
            JSON.parse(localStorage.getItem(this.NAMESPACE + ".skin") || 'null') ||
                this.skin;
        var allCategories = __spread(categories);
        if (this.custom.length > 0) {
            this.CUSTOM_CATEGORY.emojis = this.custom.map(function (emoji) {
                return __assign(__assign({}, emoji), { 
                    // `<Category />` expects emoji to have an `id`.
                    id: emoji.shortNames[0], custom: true });
            });
            allCategories.push(this.CUSTOM_CATEGORY);
        }
        if (this.include !== undefined) {
            allCategories.sort(function (a, b) {
                if (_this.include.indexOf(a.id) > _this.include.indexOf(b.id)) {
                    return 1;
                }
                return -1;
            });
        }
        try {
            for (var allCategories_1 = __values(allCategories), allCategories_1_1 = allCategories_1.next(); !allCategories_1_1.done; allCategories_1_1 = allCategories_1.next()) {
                var category = allCategories_1_1.value;
                var isIncluded = this.include && this.include.length
                    ? this.include.indexOf(category.id) > -1
                    : true;
                var isExcluded = this.exclude && this.exclude.length
                    ? this.exclude.indexOf(category.id) > -1
                    : false;
                if (!isIncluded || isExcluded) {
                    continue;
                }
                if (this.emojisToShowFilter) {
                    var newEmojis = [];
                    var emojis = category.emojis;
                    // tslint:disable-next-line: prefer-for-of
                    for (var emojiIndex = 0; emojiIndex < emojis.length; emojiIndex++) {
                        var emoji = emojis[emojiIndex];
                        if (this.emojisToShowFilter(emoji)) {
                            newEmojis.push(emoji);
                        }
                    }
                    if (newEmojis.length) {
                        var newCategory = {
                            emojis: newEmojis,
                            name: category.name,
                            id: category.id,
                        };
                        this.categories.push(newCategory);
                    }
                }
                else {
                    this.categories.push(category);
                }
                this.categoriesIcons = __assign(__assign({}, icons.categories), this.categoriesIcons);
                this.searchIcons = __assign(__assign({}, icons.search), this.searchIcons);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (allCategories_1_1 && !allCategories_1_1.done && (_a = allCategories_1.return)) _a.call(allCategories_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var includeRecent = this.include && this.include.length
            ? this.include.indexOf(this.RECENT_CATEGORY.id) > -1
            : true;
        var excludeRecent = this.exclude && this.exclude.length
            ? this.exclude.indexOf(this.RECENT_CATEGORY.id) > -1
            : false;
        if (includeRecent && !excludeRecent) {
            this.hideRecent = false;
            this.categories.unshift(this.RECENT_CATEGORY);
        }
        if (this.categories[0]) {
            this.categories[0].first = true;
        }
        this.categories.unshift(this.SEARCH_CATEGORY);
        this.selected = this.categories.filter(function (category) { return category.first; })[0].name;
        // Need to be careful if small number of categories
        var categoriesToLoadFirst = Math.min(this.categories.length, 3);
        this.setActiveCategories(this.activeCategories = this.categories.slice(0, categoriesToLoadFirst));
        // Trim last active category
        var lastActiveCategoryEmojis = this.categories[categoriesToLoadFirst - 1].emojis.slice();
        this.categories[categoriesToLoadFirst - 1].emojis = lastActiveCategoryEmojis.slice(0, 60);
        this.ref.markForCheck();
        setTimeout(function () {
            // Restore last category
            _this.categories[categoriesToLoadFirst - 1].emojis = lastActiveCategoryEmojis;
            _this.setActiveCategories(_this.categories);
            _this.ref.markForCheck();
            setTimeout(function () { return _this.updateCategoriesSize(); });
        });
    };
    PickerComponent.prototype.setActiveCategories = function (categoriesToMakeActive) {
        var _this = this;
        if (this.showSingleCategory) {
            this.activeCategories = categoriesToMakeActive.filter(function (x) { return (x.name === _this.selected || x === _this.SEARCH_CATEGORY); });
        }
        else {
            this.activeCategories = categoriesToMakeActive;
        }
    };
    PickerComponent.prototype.updateCategoriesSize = function () {
        this.categoryRefs.forEach(function (component) { return component.memoizeSize(); });
        if (this.scrollRef) {
            var target = this.scrollRef.nativeElement;
            this.scrollHeight = target.scrollHeight;
            this.clientHeight = target.clientHeight;
        }
    };
    PickerComponent.prototype.handleAnchorClick = function ($event) {
        this.updateCategoriesSize();
        this.selected = $event.category.name;
        this.setActiveCategories(this.categories);
        if (this.SEARCH_CATEGORY.emojis) {
            this.handleSearch(null);
            this.searchRef.clear();
            this.handleAnchorClick($event);
            return;
        }
        var component = this.categoryRefs.find(function (n) { return n.id === $event.category.id; });
        if (component) {
            var top_1 = component.top;
            if ($event.category.first) {
                top_1 = 0;
            }
            else {
                top_1 += 1;
            }
            this.scrollRef.nativeElement.scrollTop = top_1;
        }
        this.selected = $event.category.name;
        this.nextScroll = $event.category.name;
    };
    PickerComponent.prototype.categoryTrack = function (index, item) {
        return item.id;
    };
    PickerComponent.prototype.handleScroll = function () {
        var e_2, _a;
        if (this.nextScroll) {
            this.selected = this.nextScroll;
            this.nextScroll = undefined;
            return;
        }
        if (!this.scrollRef) {
            return;
        }
        if (this.showSingleCategory) {
            return;
        }
        var activeCategory = null;
        if (this.SEARCH_CATEGORY.emojis) {
            activeCategory = this.SEARCH_CATEGORY;
        }
        else {
            var target = this.scrollRef.nativeElement;
            // check scroll is not at bottom
            if (target.scrollTop === 0) {
                // hit the TOP
                activeCategory = this.categories.find(function (n) { return n.first === true; });
            }
            else if (target.scrollHeight - target.scrollTop === this.clientHeight) {
                // scrolled to bottom activate last category
                activeCategory = this.categories[this.categories.length - 1];
            }
            else {
                var _loop_1 = function (category) {
                    var component = this_1.categoryRefs.find(function (n) { return n.id === category.id; });
                    var active = component.handleScroll(target.scrollTop);
                    if (active) {
                        activeCategory = category;
                    }
                };
                var this_1 = this;
                try {
                    // scrolling
                    for (var _b = __values(this.categories), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var category = _c.value;
                        _loop_1(category);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            this.scrollTop = target.scrollTop;
        }
        if (activeCategory) {
            this.selected = activeCategory.name;
        }
    };
    PickerComponent.prototype.handleSearch = function ($emojis) {
        var e_3, _a;
        this.SEARCH_CATEGORY.emojis = $emojis;
        try {
            for (var _b = __values(this.categoryRefs.toArray()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var component = _c.value;
                if (component.name === 'Search') {
                    component.emojis = $emojis;
                    component.updateDisplay($emojis ? 'block' : 'none');
                }
                else {
                    component.updateDisplay($emojis ? 'none' : 'block');
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        this.scrollRef.nativeElement.scrollTop = 0;
        this.handleScroll();
    };
    PickerComponent.prototype.handleEnterKey = function ($event, emoji) {
        if (!emoji) {
            if (this.SEARCH_CATEGORY.emojis !== null && this.SEARCH_CATEGORY.emojis.length) {
                emoji = this.SEARCH_CATEGORY.emojis[0];
                if (emoji) {
                    this.emojiSelect.emit({ $event: $event, emoji: emoji });
                }
                else {
                    return;
                }
            }
        }
        if (!this.hideRecent && !this.recent) {
            this.frequently.add(emoji);
        }
        var component = this.categoryRefs.toArray()[1];
        if (component && this.enableFrequentEmojiSort) {
            component.getEmojis();
            component.ref.markForCheck();
        }
    };
    PickerComponent.prototype.handleEmojiOver = function ($event) {
        if (!this.showPreview || !this.previewRef) {
            return;
        }
        var emojiData = this.CUSTOM_CATEGORY.emojis.find(function (customEmoji) { return customEmoji.id === $event.emoji.id; });
        if (emojiData) {
            $event.emoji = __assign({}, emojiData);
        }
        this.previewEmoji = $event.emoji;
        clearTimeout(this.leaveTimeout);
    };
    PickerComponent.prototype.handleEmojiLeave = function () {
        var _this = this;
        if (!this.showPreview || !this.previewRef) {
            return;
        }
        this.leaveTimeout = setTimeout(function () {
            _this.previewEmoji = null;
            _this.previewRef.ref.markForCheck();
        }, 16);
    };
    PickerComponent.prototype.handleEmojiClick = function ($event) {
        this.emojiClick.emit($event);
        this.emojiSelect.emit($event);
        this.handleEnterKey($event.$event, $event.emoji);
    };
    PickerComponent.prototype.handleSkinChange = function (skin) {
        this.skin = skin;
        localStorage.setItem(this.NAMESPACE + ".skin", String(skin));
        this.skinChange.emit(skin);
    };
    PickerComponent.prototype.getWidth = function () {
        if (this.style && this.style.width) {
            return this.style.width;
        }
        return this.perLine * (this.emojiSize + 12) + 12 + 2 + this.measureScrollbar + 'px';
    };
    PickerComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: EmojiFrequentlyService }
    ]; };
    __decorate([
        Input()
    ], PickerComponent.prototype, "perLine", void 0);
    __decorate([
        Input()
    ], PickerComponent.prototype, "totalFrequentLines", void 0);
    __decorate([
        Input()
    ], PickerComponent.prototype, "i18n", void 0);
    __decorate([
        Input()
    ], PickerComponent.prototype, "style", void 0);
    __decorate([
        Input()
    ], PickerComponent.prototype, "title", void 0);
    __decorate([
        Input()
    ], PickerComponent.prototype, "emoji", void 0);
    __decorate([
        Input()
    ], PickerComponent.prototype, "darkMode", void 0);
    __decorate([
        Input()
    ], PickerComponent.prototype, "color", void 0);
    __decorate([
        Input()
    ], PickerComponent.prototype, "hideObsolete", void 0);
    __decorate([
        Input()
    ], PickerComponent.prototype, "categories", void 0);
    __decorate([
        Input()
    ], PickerComponent.prototype, "activeCategories", void 0);
    __decorate([
        Input()
    ], PickerComponent.prototype, "set", void 0);
    __decorate([
        Input()
    ], PickerComponent.prototype, "skin", void 0);
    __decorate([
        Input()
    ], PickerComponent.prototype, "isNative", void 0);
    __decorate([
        Input()
    ], PickerComponent.prototype, "emojiSize", void 0);
    __decorate([
        Input()
    ], PickerComponent.prototype, "sheetSize", void 0);
    __decorate([
        Input()
    ], PickerComponent.prototype, "emojisToShowFilter", void 0);
    __decorate([
        Input()
    ], PickerComponent.prototype, "showPreview", void 0);
    __decorate([
        Input()
    ], PickerComponent.prototype, "emojiTooltip", void 0);
    __decorate([
        Input()
    ], PickerComponent.prototype, "autoFocus", void 0);
    __decorate([
        Input()
    ], PickerComponent.prototype, "custom", void 0);
    __decorate([
        Input()
    ], PickerComponent.prototype, "hideRecent", void 0);
    __decorate([
        Input()
    ], PickerComponent.prototype, "include", void 0);
    __decorate([
        Input()
    ], PickerComponent.prototype, "exclude", void 0);
    __decorate([
        Input()
    ], PickerComponent.prototype, "notFoundEmoji", void 0);
    __decorate([
        Input()
    ], PickerComponent.prototype, "categoriesIcons", void 0);
    __decorate([
        Input()
    ], PickerComponent.prototype, "searchIcons", void 0);
    __decorate([
        Input()
    ], PickerComponent.prototype, "useButton", void 0);
    __decorate([
        Input()
    ], PickerComponent.prototype, "enableFrequentEmojiSort", void 0);
    __decorate([
        Input()
    ], PickerComponent.prototype, "enableSearch", void 0);
    __decorate([
        Input()
    ], PickerComponent.prototype, "showSingleCategory", void 0);
    __decorate([
        Output()
    ], PickerComponent.prototype, "emojiClick", void 0);
    __decorate([
        Output()
    ], PickerComponent.prototype, "emojiSelect", void 0);
    __decorate([
        Output()
    ], PickerComponent.prototype, "skinChange", void 0);
    __decorate([
        ViewChild('scrollRef', { static: true })
    ], PickerComponent.prototype, "scrollRef", void 0);
    __decorate([
        ViewChild('previewRef')
    ], PickerComponent.prototype, "previewRef", void 0);
    __decorate([
        ViewChild('searchRef', { static: true })
    ], PickerComponent.prototype, "searchRef", void 0);
    __decorate([
        ViewChildren('categoryRef')
    ], PickerComponent.prototype, "categoryRefs", void 0);
    __decorate([
        Input()
    ], PickerComponent.prototype, "backgroundImageFn", void 0);
    PickerComponent = __decorate([
        Component({
            selector: 'emoji-mart',
            template: "<section class=\"emoji-mart {{ darkMode ? 'emoji-mart-dark' : '' }}\"\n  [style.width]=\"getWidth()\"\n  [ngStyle]=\"style\">\n  <div class=\"emoji-mart-bar\">\n    <emoji-mart-anchors\n      [categories]=\"categories\"\n      (anchorClick)=\"handleAnchorClick($event)\"\n      [color]=\"color\"\n      [selected]=\"selected\"\n      [i18n]=\"i18n\"\n      [icons]=\"categoriesIcons\"\n    ></emoji-mart-anchors>\n  </div>\n  <emoji-search\n    *ngIf=\"enableSearch\"\n    #searchRef\n    [i18n]=\"i18n\"\n    (searchResults)=\"handleSearch($event)\"\n    (enterKey)=\"handleEnterKey($event)\"\n    [include]=\"include\"\n    [exclude]=\"exclude\"\n    [custom]=\"custom\"\n    [autoFocus]=\"autoFocus\"\n    [icons]=\"searchIcons\"\n    [emojisToShowFilter]=\"emojisToShowFilter\"\n  ></emoji-search>\n  <section #scrollRef class=\"emoji-mart-scroll\" (scroll)=\"handleScroll()\" [attr.aria-label]=\"i18n.emojilist\">\n    <emoji-category\n      *ngFor=\"let category of activeCategories; let idx = index; trackBy: categoryTrack\"\n      #categoryRef\n      [id]=\"category.id\"\n      [name]=\"category.name\"\n      [emojis]=\"category.emojis\"\n      [perLine]=\"perLine\"\n      [totalFrequentLines]=\"totalFrequentLines\"\n      [hasStickyPosition]=\"isNative\"\n      [i18n]=\"i18n\"\n      [hideObsolete]=\"hideObsolete\"\n      [notFoundEmoji]=\"notFoundEmoji\"\n      [custom]=\"category.id == RECENT_CATEGORY.id ? CUSTOM_CATEGORY.emojis : undefined\"\n      [recent]=\"category.id == RECENT_CATEGORY.id ? recent : undefined\"\n      [emojiIsNative]=\"isNative\"\n      [emojiSkin]=\"skin\"\n      [emojiSize]=\"emojiSize\"\n      [emojiSet]=\"set\"\n      [emojiSheetSize]=\"sheetSize\"\n      [emojiForceSize]=\"isNative\"\n      [emojiTooltip]=\"emojiTooltip\"\n      [emojiBackgroundImageFn]=\"backgroundImageFn\"\n      [emojiUseButton]=\"false\"\n      (emojiOver)=\"handleEmojiOver($event)\"\n      (emojiLeave)=\"handleEmojiLeave()\"\n      (emojiClick)=\"handleEmojiClick($event)\"\n    ></emoji-category>\n  </section>\n  <div class=\"emoji-mart-bar\" *ngIf=\"showPreview\">\n    <emoji-preview\n      #previewRef\n      [title]=\"title\"\n      [emoji]=\"previewEmoji\"\n      [idleEmoji]=\"emoji\"\n      [emojiIsNative]=\"isNative\"\n      [emojiSize]=\"38\"\n      [emojiSkin]=\"skin\"\n      [emojiSet]=\"set\"\n      [i18n]=\"i18n\"\n      [emojiSheetSize]=\"sheetSize\"\n      [emojiBackgroundImageFn]=\"backgroundImageFn\"\n      (skinChange)=\"handleSkinChange($event)\"\n    ></emoji-preview>\n  </div>\n</section>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            preserveWhitespaces: false
        })
    ], PickerComponent);
    return PickerComponent;
}());
export { PickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjdHJsL25neC1lbW9qaS1tYXJ0LyIsInNvdXJjZXMiOlsicGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxZQUFZLEdBQ2IsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUNMLFVBQVUsR0FLWCxNQUFNLGdDQUFnQyxDQUFDO0FBRXhDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBR3BFLE9BQU8sS0FBSyxLQUFLLE1BQU0sUUFBUSxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUkzQyxJQUFNLElBQUksR0FBUTtJQUNoQixNQUFNLEVBQUUsUUFBUTtJQUNoQixTQUFTLEVBQUUsZUFBZTtJQUMxQixRQUFRLEVBQUUsZ0JBQWdCO0lBQzFCLEtBQUssRUFBRSxPQUFPO0lBQ2QsVUFBVSxFQUFFO1FBQ1YsTUFBTSxFQUFFLGdCQUFnQjtRQUN4QixNQUFNLEVBQUUsaUJBQWlCO1FBQ3pCLE1BQU0sRUFBRSxrQkFBa0I7UUFDMUIsTUFBTSxFQUFFLGtCQUFrQjtRQUMxQixLQUFLLEVBQUUsY0FBYztRQUNyQixRQUFRLEVBQUUsVUFBVTtRQUNwQixNQUFNLEVBQUUsaUJBQWlCO1FBQ3pCLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLEtBQUssRUFBRSxPQUFPO1FBQ2QsTUFBTSxFQUFFLFFBQVE7S0FDakI7SUFDRCxTQUFTLEVBQUU7UUFDVCxDQUFDLEVBQUUsbUJBQW1CO1FBQ3RCLENBQUMsRUFBRSxpQkFBaUI7UUFDcEIsQ0FBQyxFQUFFLHdC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SUFDaEM7UUFBUixLQUFLLEVBQUU7NERBQW9DO0lBQ25DO1FBQVIsS0FBSyxFQUFFO3dEQUE0QjtJQUMzQjtRQUFSLEtBQUssRUFBRTtzREFBbUI7SUFDbEI7UUFBUixLQUFLLEVBQUU7b0VBQWlDO0lBQ2hDO1FBQVIsS0FBSyxFQUFFO3lEQUFxQjtJQUNwQjtRQUFSLEtBQUssRUFBRTsrREFBNEI7SUFDMUI7UUFBVCxNQUFNLEVBQUU7dURBQXNDO0lBQ3JDO1FBQVQsTUFBTSxFQUFFO3dEQUF1QztJQUN0QztRQUFULE1BQU0sRUFBRTt1REFBZ0Q7SUFDZjtRQUF6QyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO3NEQUFnQztJQUNoRDtRQUF4QixTQUFTLENBQUMsWUFBWSxDQUFDO3VEQUF1QztJQUNyQjtRQUF6QyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO3NEQUFxQztJQUNqRDtRQUE1QixZQUFZLENBQUMsYUFBYSxDQUFDO3lEQUFxRDtJQThCakY7UUFEQyxLQUFLLEVBQUU7OERBS2lHO0lBOUU5RixlQUFlO1FBTjNCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxZQUFZO1lBQ3RCLDgvRUFBc0M7WUFDdEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07WUFDL0MsbUJBQW1CLEVBQUUsS0FBSztTQUMzQixDQUFDO09BQ1csZUFBZSxDQThXM0I7SUFBRCxzQkFBQztDQUFBLEFBOVdELElBOFdDO1NBOVdZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q2hpbGRyZW4sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICBjYXRlZ29yaWVzLFxuICBFbW9qaSxcbiAgRW1vamlDYXRlZ29yeSxcbiAgRW1vamlEYXRhLFxuICBFbW9qaUV2ZW50LFxufSBmcm9tICdAY3RybC9uZ3gtZW1vamktbWFydC9uZ3gtZW1vamknO1xuaW1wb3J0IHsgQ2F0ZWdvcnlDb21wb25lbnQgfSBmcm9tICcuL2NhdGVnb3J5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFbW9qaUZyZXF1ZW50bHlTZXJ2aWNlIH0gZnJvbSAnLi9lbW9qaS1mcmVxdWVudGx5LnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJldmlld0NvbXBvbmVudCB9IGZyb20gJy4vcHJldmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VhcmNoQ29tcG9uZW50IH0gZnJvbSAnLi9zZWFyY2guY29tcG9uZW50JztcbmltcG9ydCAqIGFzIGljb25zIGZyb20gJy4vc3Zncyc7XG5pbXBvcnQgeyBtZWFzdXJlU2Nyb2xsYmFyIH0gZnJvbSAnLi91dGlscyc7XG5cblxuXG5jb25zdCBJMThOOiBhbnkgPSB7XG4gIHNlYXJjaDogJ1NlYXJjaCcsXG4gIGVtb2ppbGlzdDogJ0xpc3Qgb2YgZW1vamknLFxuICBub3Rmb3VuZDogJ05vIEVtb2ppIEZvdW5kJyxcbiAgY2xlYXI6ICdDbGVhcicsXG4gIGNhdGVnb3JpZXM6IHtcbiAgICBzZWFyY2g6ICdTZWFyY2ggUmVzdWx0cycsXG4gICAgcmVjZW50OiAnRnJlcXVlbnRseSBVc2VkJyxcbiAgICBwZW9wbGU6ICdTbWlsZXlzICYgUGVvcGxlJyxcbiAgICBuYXR1cmU6ICdBbmltYWxzICYgTmF0dXJlJyxcbiAgICBmb29kczogJ0Zvb2QgJiBEcmluaycsXG4gICAgYWN0aXZpdHk6ICdBY3Rpdml0eScsXG4gICAgcGxhY2VzOiAnVHJhdmVsICYgUGxhY2VzJyxcbiAgICBvYmplY3RzOiAnT2JqZWN0cycsXG4gICAgc3ltYm9sczogJ1N5bWJvbHMnLFxuICAgIGZsYWdzOiAnRmxhZ3MnLFxuICAgIGN1c3RvbTogJ0N1c3RvbScsXG4gIH0sXG4gIHNraW50b25lczoge1xuICAgIDE6ICdEZWZhdWx0IFNraW4gVG9uZScsXG4gICAgMjogJ0xpZ2h0IFNraW4gVG9uZScsXG4gICAgMzogJ01lZGl1bS1MaWdodCBTa2luIFRvbmUnLFxuICAgIDQ6ICdNZWRpdW0gU2tpbiBUb25lJyxcbiAgICA1OiAnTWVkaXVtLURhcmsgU2tpbiBUb25lJyxcbiAgICA2OiAnRGFyayBTa2luIFRvbmUnLFxuICB9LFxufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZW1vamktbWFydCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9waWNrZXIuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG59KVxuZXhwb3J0IGNsYXNzIFBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHBlckxpbmUgPSA5O1xuICBASW5wdXQoKSB0b3RhbEZyZXF1ZW50TGluZXMgPSA0O1xuICBASW5wdXQoKSBpMThuOiBhbnkgPSB7fTtcbiAgQElucHV0KCkgc3R5bGU6IGFueSA9IHt9O1xuICBASW5wdXQoKSB0aXRsZSA9ICdFbW9qaSBNYXJ04oSiJztcbiAgQElucHV0KCkgZW1vamkgPSAnZGVwYXJ0bWVudF9zdG9yZSc7XG4gIEBJbnB1dCgpIGRhcmtNb2RlID0gISEoXG4gICAgdHlwZW9mIG1hdGNoTWVkaWEgPT09ICdmdW5jdGlvbicgJiZcbiAgICBtYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJykubWF0Y2hlc1xuICApO1xuICBASW5wdXQoKSBjb2xvciA9ICcjYWU2NWM1JztcbiAgQElucHV0KCkgaGlkZU9ic29sZXRlID0gdHJ1ZTtcbiAgLyoqIGFsbCBjYXRlZ29yaWVzIHNob3duICovXG4gIEBJbnB1dCgpIGNhdGVnb3JpZXM6IEVtb2ppQ2F0ZWdvcnlbXSA9IFtdO1xuICAvKiogdXNlZCB0byB0ZW1wb3JhcmlseSBkcmF3IGNhdGVnb3JpZXMgKi9cbiAgQElucHV0KCkgYWN0aXZlQ2F0ZWdvcmllczogRW1vamlDYXRlZ29yeVtdID0gW107XG4gIEBJbnB1dCgpIHNldDogRW1vamlbJ3NldCddID0gJ2FwcGxlJztcbiAgQElucHV0KCkgc2tpbjogRW1vamlbJ3NraW4nXSA9IDE7XG4gIC8qKiBSZW5kZXJzIHRoZSBuYXRpdmUgdW5pY29kZSBlbW9qaSAqL1xuICBASW5wdXQoKSBpc05hdGl2ZTogRW1vamlbJ2lzTmF0aXZlJ10gPSBmYWxzZTtcbiAgQElucHV0KCkgZW1vamlTaXplOiBFbW9qaVsnc2l6ZSddID0gMjQ7XG4gIEBJbnB1dCgpIHNoZWV0U2l6ZTogRW1vamlbJ3NoZWV0U2l6ZSddID0gNjQ7XG4gIEBJbnB1dCgpIGVtb2ppc1RvU2hvd0ZpbHRlcj86ICh4OiBzdHJpbmcpID0+IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNob3dQcmV2aWV3ID0gdHJ1ZTtcbiAgQElucHV0KCkgZW1vamlUb29sdGlwID0gZmFsc2U7XG4gIEBJbnB1dCgpIGF1dG9Gb2N1cyA9IGZhbHNlO1xuICBASW5wdXQoKSBjdXN0b206IGFueVtdID0gW107XG4gIEBJbnB1dCgpIGhpZGVSZWNlbnQgPSB0cnVlO1xuICBASW5wdXQoKSBpbmNsdWRlPzogc3RyaW5nW107XG4gIEBJbnB1dCgpIGV4Y2x1ZGU/OiBzdHJpbmdbXTtcbiAgQElucHV0KCkgbm90Rm91bmRFbW9qaSA9ICdzbGV1dGhfb3Jfc3B5JztcbiAgQElucHV0KCkgY2F0ZWdvcmllc0ljb25zID0gaWNvbnMuY2F0ZWdvcmllcztcbiAgQElucHV0KCkgc2VhcmNoSWNvbnMgPSBpY29ucy5zZWFyY2g7XG4gIEBJbnB1dCgpIHVzZUJ1dHRvbiA9IGZhbHNlO1xuICBASW5wdXQoKSBlbmFibGVGcmVxdWVudEVtb2ppU29ydCA9IGZhbHNlO1xuICBASW5wdXQoKSBlbmFibGVTZWFyY2ggPSB0cnVlO1xuICBASW5wdXQoKSBzaG93U2luZ2xlQ2F0ZWdvcnkgPSBmYWxzZTtcbiAgQE91dHB1dCgpIGVtb2ppQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGVtb2ppU2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBza2luQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxFbW9qaVsnc2tpbiddPigpO1xuICBAVmlld0NoaWxkKCdzY3JvbGxSZWYnLCB7IHN0YXRpYzogdHJ1ZSB9KSBwcml2YXRlIHNjcm9sbFJlZiE6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3ByZXZpZXdSZWYnKSBwcml2YXRlIHByZXZpZXdSZWYhOiBQcmV2aWV3Q29tcG9uZW50O1xuICBAVmlld0NoaWxkKCdzZWFyY2hSZWYnLCB7IHN0YXRpYzogdHJ1ZSB9KSBwcml2YXRlIHNlYXJjaFJlZiE6IFNlYXJjaENvbXBvbmVudDtcbiAgQFZpZXdDaGlsZHJlbignY2F0ZWdvcnlSZWYnKSBwcml2YXRlIGNhdGVnb3J5UmVmcyE6IFF1ZXJ5TGlzdDxDYXRlZ29yeUNvbXBvbmVudD47XG4gIHNjcm9sbEhlaWdodCA9IDA7XG4gIGNsaWVudEhlaWdodCA9IDA7XG4gIHNlbGVjdGVkPzogc3RyaW5nO1xuICBuZXh0U2Nyb2xsPzogc3RyaW5nO1xuICBzY3JvbGxUb3A/OiBudW1iZXI7XG4gIGZpcnN0UmVuZGVyID0gdHJ1ZTtcbiAgcmVjZW50Pzogc3RyaW5nW107XG4gIHByZXZpZXdFbW9qaTogYW55O1xuICBsZWF2ZVRpbWVvdXQ6IGFueTtcbiAgTkFNRVNQQUNFID0gJ2Vtb2ppLW1hcnQnO1xuICBtZWFzdXJlU2Nyb2xsYmFyID0gMDtcbiAgUkVDRU5UX0NBVEVHT1JZOiBFbW9qaUNhdGVnb3J5ID0ge1xuICAgIGlkOiAncmVjZW50JyxcbiAgICBuYW1lOiAnUmVjZW50JyxcbiAgICBlbW9qaXM6IG51bGwsXG4gIH07XG4gIFNFQVJDSF9DQVRFR09SWTogRW1vamlDYXRlZ29yeSA9IHtcbiAgICBpZDogJ3NlYXJjaCcsXG4gICAgbmFtZTogJ1NlYXJjaCcsXG4gICAgZW1vamlzOiBudWxsLFxuICAgIGFuY2hvcjogZmFsc2UsXG4gIH07XG4gIENVU1RPTV9DQVRFR09SWTogRW1vamlDYXRlZ29yeSA9IHtcbiAgICBpZDogJ2N1c3RvbScsXG4gICAgbmFtZTogJ0N1c3RvbScsXG4gICAgZW1vamlzOiBbXSxcbiAgfTtcblxuICBASW5wdXQoKVxuICBiYWNrZ3JvdW5kSW1hZ2VGbjogRW1vamlbJ2JhY2tncm91bmRJbWFnZUZuJ10gPSAoXG4gICAgc2V0OiBzdHJpbmcsXG4gICAgc2hlZXRTaXplOiBudW1iZXIsXG4gICkgPT5cbiAgICBgaHR0cHM6Ly91bnBrZy5jb20vZW1vamktZGF0YXNvdXJjZS0ke3RoaXMuc2V0fUA1LjAuMS9pbWcvJHt0aGlzLnNldH0vc2hlZXRzLTI1Ni8ke3RoaXMuc2hlZXRTaXplfS5wbmdgXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgZnJlcXVlbnRseTogRW1vamlGcmVxdWVudGx5U2VydmljZSxcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIG1lYXN1cmUgc2Nyb2xsXG4gICAgdGhpcy5tZWFzdXJlU2Nyb2xsYmFyID0gbWVhc3VyZVNjcm9sbGJhcigpO1xuXG4gICAgdGhpcy5pMThuID0geyAuLi5JMThOLCAuLi50aGlzLmkxOG4gfTtcbiAgICB0aGlzLmkxOG4uY2F0ZWdvcmllcyA9IHsgLi4uSTE4Ti5jYXRlZ29yaWVzLCAuLi50aGlzLmkxOG4uY2F0ZWdvcmllcyB9O1xuICAgIHRoaXMuc2tpbiA9XG4gICAgICBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke3RoaXMuTkFNRVNQQUNFfS5za2luYCkgfHwgJ251bGwnKSB8fFxuICAgICAgdGhpcy5za2luO1xuXG4gICAgY29uc3QgYWxsQ2F0ZWdvcmllcyA9IFsuLi5jYXRlZ29yaWVzXTtcblxuICAgIGlmICh0aGlzLmN1c3RvbS5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLkNVU1RPTV9DQVRFR09SWS5lbW9qaXMgPSB0aGlzLmN1c3RvbS5tYXAoZW1vamkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLmVtb2ppLFxuICAgICAgICAgIC8vIGA8Q2F0ZWdvcnkgLz5gIGV4cGVjdHMgZW1vamkgdG8gaGF2ZSBhbiBgaWRgLlxuICAgICAgICAgIGlkOiBlbW9qaS5zaG9ydE5hbWVzWzBdLFxuICAgICAgICAgIGN1c3RvbTogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICBhbGxDYXRlZ29yaWVzLnB1c2godGhpcy5DVVNUT01fQ0FURUdPUlkpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmluY2x1ZGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgYWxsQ2F0ZWdvcmllcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmluY2x1ZGUuaW5kZXhPZihhLmlkKSA+IHRoaXMuaW5jbHVkZS5pbmRleE9mKGIuaWQpKSB7XG4gICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBjYXRlZ29yeSBvZiBhbGxDYXRlZ29yaWVzKSB7XG4gICAgICBjb25zdCBpc0luY2x1ZGVkID1cbiAgICAgICAgdGhpcy5pbmNsdWRlICYmIHRoaXMuaW5jbHVkZS5sZW5ndGhcbiAgICAgICAgICA/IHRoaXMuaW5jbHVkZS5pbmRleE9mKGNhdGVnb3J5LmlkKSA+IC0xXG4gICAgICAgICAgOiB0cnVlO1xuICAgICAgY29uc3QgaXNFeGNsdWRlZCA9XG4gICAgICAgIHRoaXMuZXhjbHVkZSAmJiB0aGlzLmV4Y2x1ZGUubGVuZ3RoXG4gICAgICAgICAgPyB0aGlzLmV4Y2x1ZGUuaW5kZXhPZihjYXRlZ29yeS5pZCkgPiAtMVxuICAgICAgICAgIDogZmFsc2U7XG4gICAgICBpZiAoIWlzSW5jbHVkZWQgfHwgaXNFeGNsdWRlZCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZW1vamlzVG9TaG93RmlsdGVyKSB7XG4gICAgICAgIGNvbnN0IG5ld0Vtb2ppcyA9IFtdO1xuXG4gICAgICAgIGNvbnN0IHsgZW1vamlzIH0gPSBjYXRlZ29yeTtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBwcmVmZXItZm9yLW9mXG4gICAgICAgIGZvciAobGV0IGVtb2ppSW5kZXggPSAwOyBlbW9qaUluZGV4IDwgZW1vamlzLmxlbmd0aDsgZW1vamlJbmRleCsrKSB7XG4gICAgICAgICAgY29uc3QgZW1vamkgPSBlbW9qaXNbZW1vamlJbmRleF07XG4gICAgICAgICAgaWYgKHRoaXMuZW1vamlzVG9TaG93RmlsdGVyKGVtb2ppKSkge1xuICAgICAgICAgICAgbmV3RW1vamlzLnB1c2goZW1vamkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdFbW9qaXMubGVuZ3RoKSB7XG4gICAgICAgICAgY29uc3QgbmV3Q2F0ZWdvcnkgPSB7XG4gICAgICAgICAgICBlbW9qaXM6IG5ld0Vtb2ppcyxcbiAgICAgICAgICAgIG5hbWU6IGNhdGVnb3J5Lm5hbWUsXG4gICAgICAgICAgICBpZDogY2F0ZWdvcnkuaWQsXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHRoaXMuY2F0ZWdvcmllcy5wdXNoKG5ld0NhdGVnb3J5KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jYXRlZ29yaWVzLnB1c2goY2F0ZWdvcnkpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNhdGVnb3JpZXNJY29ucyA9IHsgLi4uaWNvbnMuY2F0ZWdvcmllcywgLi4udGhpcy5jYXRlZ29yaWVzSWNvbnMgfTtcbiAgICAgIHRoaXMuc2VhcmNoSWNvbnMgPSB7IC4uLmljb25zLnNlYXJjaCwgLi4udGhpcy5zZWFyY2hJY29ucyB9O1xuICAgIH1cblxuICAgIGNvbnN0IGluY2x1ZGVSZWNlbnQgPVxuICAgICAgdGhpcy5pbmNsdWRlICYmIHRoaXMuaW5jbHVkZS5sZW5ndGhcbiAgICAgICAgPyB0aGlzLmluY2x1ZGUuaW5kZXhPZih0aGlzLlJFQ0VOVF9DQVRFR09SWS5pZCkgPiAtMVxuICAgICAgICA6IHRydWU7XG4gICAgY29uc3QgZXhjbHVkZVJlY2VudCA9XG4gICAgICB0aGlzLmV4Y2x1ZGUgJiYgdGhpcy5leGNsdWRlLmxlbmd0aFxuICAgICAgICA/IHRoaXMuZXhjbHVkZS5pbmRleE9mKHRoaXMuUkVDRU5UX0NBVEVHT1JZLmlkKSA+IC0xXG4gICAgICAgIDogZmFsc2U7XG4gICAgaWYgKGluY2x1ZGVSZWNlbnQgJiYgIWV4Y2x1ZGVSZWNlbnQpIHtcbiAgICAgIHRoaXMuaGlkZVJlY2VudCA9IGZhbHNlO1xuICAgICAgdGhpcy5jYXRlZ29yaWVzLnVuc2hpZnQodGhpcy5SRUNFTlRfQ0FURUdPUlkpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNhdGVnb3JpZXNbMF0pIHtcbiAgICAgIHRoaXMuY2F0ZWdvcmllc1swXS5maXJzdCA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy5jYXRlZ29yaWVzLnVuc2hpZnQodGhpcy5TRUFSQ0hfQ0FURUdPUlkpO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmNhdGVnb3JpZXMuZmlsdGVyKGNhdGVnb3J5ID0+IGNhdGVnb3J5LmZpcnN0KVswXS5uYW1lO1xuXG4gICAgLy8gTmVlZCB0byBiZSBjYXJlZnVsIGlmIHNtYWxsIG51bWJlciBvZiBjYXRlZ29yaWVzXG4gICAgY29uc3QgY2F0ZWdvcmllc1RvTG9hZEZpcnN0ID0gTWF0aC5taW4odGhpcy5jYXRlZ29yaWVzLmxlbmd0aCwgMyk7XG4gICAgdGhpcy5zZXRBY3RpdmVDYXRlZ29yaWVzKHRoaXMuYWN0aXZlQ2F0ZWdvcmllcyA9IHRoaXMuY2F0ZWdvcmllcy5zbGljZSgwLCBjYXRlZ29yaWVzVG9Mb2FkRmlyc3QpKTtcblxuICAgIC8vIFRyaW0gbGFzdCBhY3RpdmUgY2F0ZWdvcnlcbiAgICBjb25zdCBsYXN0QWN0aXZlQ2F0ZWdvcnlFbW9qaXMgPSB0aGlzLmNhdGVnb3JpZXNbY2F0ZWdvcmllc1RvTG9hZEZpcnN0IC0gMV0uZW1vamlzLnNsaWNlKCk7XG4gICAgdGhpcy5jYXRlZ29yaWVzW2NhdGVnb3JpZXNUb0xvYWRGaXJzdCAtIDFdLmVtb2ppcyA9IGxhc3RBY3RpdmVDYXRlZ29yeUVtb2ppcy5zbGljZSgwLCA2MCk7XG5cbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgLy8gUmVzdG9yZSBsYXN0IGNhdGVnb3J5XG4gICAgICB0aGlzLmNhdGVnb3JpZXNbY2F0ZWdvcmllc1RvTG9hZEZpcnN0IC0gMV0uZW1vamlzID0gbGFzdEFjdGl2ZUNhdGVnb3J5RW1vamlzO1xuICAgICAgdGhpcy5zZXRBY3RpdmVDYXRlZ29yaWVzKHRoaXMuY2F0ZWdvcmllcyk7XG4gICAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGVDYXRlZ29yaWVzU2l6ZSgpKTtcbiAgICB9KTtcbiAgfVxuICBzZXRBY3RpdmVDYXRlZ29yaWVzKGNhdGVnb3JpZXNUb01ha2VBY3RpdmU6IEFycmF5PEVtb2ppQ2F0ZWdvcnk+KSB7XG4gICAgaWYgKHRoaXMuc2hvd1NpbmdsZUNhdGVnb3J5KSB7XG4gICAgICB0aGlzLmFjdGl2ZUNhdGVnb3JpZXMgPSBjYXRlZ29yaWVzVG9NYWtlQWN0aXZlLmZpbHRlcihcbiAgICAgICAgeCA9PiAoeC5uYW1lID09PSB0aGlzLnNlbGVjdGVkIHx8IHggPT09IHRoaXMuU0VBUkNIX0NBVEVHT1JZKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hY3RpdmVDYXRlZ29yaWVzID0gY2F0ZWdvcmllc1RvTWFrZUFjdGl2ZTtcbiAgICB9XG4gIH1cbiAgdXBkYXRlQ2F0ZWdvcmllc1NpemUoKSB7XG4gICAgdGhpcy5jYXRlZ29yeVJlZnMuZm9yRWFjaChjb21wb25lbnQgPT4gY29tcG9uZW50Lm1lbW9pemVTaXplKCkpO1xuXG4gICAgaWYgKHRoaXMuc2Nyb2xsUmVmKSB7XG4gICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLnNjcm9sbFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgdGhpcy5zY3JvbGxIZWlnaHQgPSB0YXJnZXQuc2Nyb2xsSGVpZ2h0O1xuICAgICAgdGhpcy5jbGllbnRIZWlnaHQgPSB0YXJnZXQuY2xpZW50SGVpZ2h0O1xuICAgIH1cbiAgfVxuICBoYW5kbGVBbmNob3JDbGljaygkZXZlbnQ6IHsgY2F0ZWdvcnk6IEVtb2ppQ2F0ZWdvcnk7IGluZGV4OiBudW1iZXIgfSkge1xuICAgIHRoaXMudXBkYXRlQ2F0ZWdvcmllc1NpemUoKTtcbiAgICB0aGlzLnNlbGVjdGVkID0gJGV2ZW50LmNhdGVnb3J5Lm5hbWU7XG4gICAgdGhpcy5zZXRBY3RpdmVDYXRlZ29yaWVzKHRoaXMuY2F0ZWdvcmllcyk7XG5cbiAgICBpZiAodGhpcy5TRUFSQ0hfQ0FURUdPUlkuZW1vamlzKSB7XG4gICAgICB0aGlzLmhhbmRsZVNlYXJjaChudWxsKTtcbiAgICAgIHRoaXMuc2VhcmNoUmVmLmNsZWFyKCk7XG4gICAgICB0aGlzLmhhbmRsZUFuY2hvckNsaWNrKCRldmVudCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5jYXRlZ29yeVJlZnMuZmluZChuID0+IG4uaWQgPT09ICRldmVudC5jYXRlZ29yeS5pZCk7XG4gICAgaWYgKGNvbXBvbmVudCkge1xuICAgICAgbGV0IHsgdG9wIH0gPSBjb21wb25lbnQ7XG5cbiAgICAgIGlmICgkZXZlbnQuY2F0ZWdvcnkuZmlyc3QpIHtcbiAgICAgICAgdG9wID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvcCArPSAxO1xuICAgICAgfVxuICAgICAgdGhpcy5zY3JvbGxSZWYubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSB0b3A7XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0ZWQgPSAkZXZlbnQuY2F0ZWdvcnkubmFtZTtcbiAgICB0aGlzLm5leHRTY3JvbGwgPSAkZXZlbnQuY2F0ZWdvcnkubmFtZTtcbiAgfVxuICBjYXRlZ29yeVRyYWNrKGluZGV4OiBudW1iZXIsIGl0ZW06IGFueSkge1xuICAgIHJldHVybiBpdGVtLmlkO1xuICB9XG4gIGhhbmRsZVNjcm9sbCgpIHtcbiAgICBpZiAodGhpcy5uZXh0U2Nyb2xsKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5uZXh0U2Nyb2xsO1xuICAgICAgdGhpcy5uZXh0U2Nyb2xsID0gdW5kZWZpbmVkO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuc2Nyb2xsUmVmKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnNob3dTaW5nbGVDYXRlZ29yeSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBhY3RpdmVDYXRlZ29yeSA9IG51bGw7XG4gICAgaWYgKHRoaXMuU0VBUkNIX0NBVEVHT1JZLmVtb2ppcykge1xuICAgICAgYWN0aXZlQ2F0ZWdvcnkgPSB0aGlzLlNFQVJDSF9DQVRFR09SWTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5zY3JvbGxSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgIC8vIGNoZWNrIHNjcm9sbCBpcyBub3QgYXQgYm90dG9tXG4gICAgICBpZiAodGFyZ2V0LnNjcm9sbFRvcCA9PT0gMCkge1xuICAgICAgICAvLyBoaXQgdGhlIFRPUFxuICAgICAgICBhY3RpdmVDYXRlZ29yeSA9IHRoaXMuY2F0ZWdvcmllcy5maW5kKG4gPT4gbi5maXJzdCA9PT0gdHJ1ZSk7XG4gICAgICB9IGVsc2UgaWYgKHRhcmdldC5zY3JvbGxIZWlnaHQgLSB0YXJnZXQuc2Nyb2xsVG9wID09PSB0aGlzLmNsaWVudEhlaWdodCkge1xuICAgICAgICAvLyBzY3JvbGxlZCB0byBib3R0b20gYWN0aXZhdGUgbGFzdCBjYXRlZ29yeVxuICAgICAgICBhY3RpdmVDYXRlZ29yeSA9IHRoaXMuY2F0ZWdvcmllc1t0aGlzLmNhdGVnb3JpZXMubGVuZ3RoIC0gMV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBzY3JvbGxpbmdcbiAgICAgICAgZm9yIChjb25zdCBjYXRlZ29yeSBvZiB0aGlzLmNhdGVnb3JpZXMpIHtcbiAgICAgICAgICBjb25zdCBjb21wb25lbnQgPSB0aGlzLmNhdGVnb3J5UmVmcy5maW5kKG4gPT4gbi5pZCA9PT0gY2F0ZWdvcnkuaWQpO1xuICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IGNvbXBvbmVudC5oYW5kbGVTY3JvbGwodGFyZ2V0LnNjcm9sbFRvcCk7XG4gICAgICAgICAgaWYgKGFjdGl2ZSkge1xuICAgICAgICAgICAgYWN0aXZlQ2F0ZWdvcnkgPSBjYXRlZ29yeTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5zY3JvbGxUb3AgPSB0YXJnZXQuc2Nyb2xsVG9wO1xuICAgIH1cbiAgICBpZiAoYWN0aXZlQ2F0ZWdvcnkpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBhY3RpdmVDYXRlZ29yeS5uYW1lO1xuICAgIH1cbiAgfVxuICBoYW5kbGVTZWFyY2goJGVtb2ppczogYW55W10gfCBudWxsKSB7XG4gICAgdGhpcy5TRUFSQ0hfQ0FURUdPUlkuZW1vamlzID0gJGVtb2ppcztcbiAgICBmb3IgKGNvbnN0IGNvbXBvbmVudCBvZiB0aGlzLmNhdGVnb3J5UmVmcy50b0FycmF5KCkpIHtcbiAgICAgIGlmIChjb21wb25lbnQubmFtZSA9PT0gJ1NlYXJjaCcpIHtcbiAgICAgICAgY29tcG9uZW50LmVtb2ppcyA9ICRlbW9qaXM7XG4gICAgICAgIGNvbXBvbmVudC51cGRhdGVEaXNwbGF5KCRlbW9qaXMgPyAnYmxvY2snIDogJ25vbmUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbXBvbmVudC51cGRhdGVEaXNwbGF5KCRlbW9qaXMgPyAnbm9uZScgOiAnYmxvY2snKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNjcm9sbFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IDA7XG4gICAgdGhpcy5oYW5kbGVTY3JvbGwoKTtcbiAgfVxuXG4gIGhhbmRsZUVudGVyS2V5KCRldmVudDogRXZlbnQsIGVtb2ppPzogRW1vamlEYXRhKSB7XG4gICAgaWYgKCFlbW9qaSkge1xuICAgICAgaWYgKHRoaXMuU0VBUkNIX0NBVEVHT1JZLmVtb2ppcyAhPT0gbnVsbCAmJiB0aGlzLlNFQVJDSF9DQVRFR09SWS5lbW9qaXMubGVuZ3RoKSB7XG4gICAgICAgIGVtb2ppID0gdGhpcy5TRUFSQ0hfQ0FURUdPUlkuZW1vamlzWzBdO1xuICAgICAgICBpZiAoZW1vamkpIHtcbiAgICAgICAgICB0aGlzLmVtb2ppU2VsZWN0LmVtaXQoeyAkZXZlbnQsIGVtb2ppIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghdGhpcy5oaWRlUmVjZW50ICYmICF0aGlzLnJlY2VudCkge1xuICAgICAgdGhpcy5mcmVxdWVudGx5LmFkZChlbW9qaSk7XG4gICAgfVxuXG4gICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5jYXRlZ29yeVJlZnMudG9BcnJheSgpWzFdO1xuICAgIGlmIChjb21wb25lbnQgJiYgdGhpcy5lbmFibGVGcmVxdWVudEVtb2ppU29ydCkge1xuICAgICAgY29tcG9uZW50LmdldEVtb2ppcygpO1xuICAgICAgY29tcG9uZW50LnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cbiAgaGFuZGxlRW1vamlPdmVyKCRldmVudDogRW1vamlFdmVudCkge1xuICAgIGlmICghdGhpcy5zaG93UHJldmlldyB8fCAhdGhpcy5wcmV2aWV3UmVmKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZW1vamlEYXRhID0gdGhpcy5DVVNUT01fQ0FURUdPUlkuZW1vamlzLmZpbmQoXG4gICAgICBjdXN0b21FbW9qaSA9PiBjdXN0b21FbW9qaS5pZCA9PT0gJGV2ZW50LmVtb2ppLmlkLFxuICAgICk7XG4gICAgaWYgKGVtb2ppRGF0YSkge1xuICAgICAgJGV2ZW50LmVtb2ppID0geyAuLi5lbW9qaURhdGEgfTtcbiAgICB9XG5cbiAgICB0aGlzLnByZXZpZXdFbW9qaSA9ICRldmVudC5lbW9qaTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5sZWF2ZVRpbWVvdXQpO1xuICB9XG4gIGhhbmRsZUVtb2ppTGVhdmUoKSB7XG4gICAgaWYgKCF0aGlzLnNob3dQcmV2aWV3IHx8ICF0aGlzLnByZXZpZXdSZWYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmxlYXZlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5wcmV2aWV3RW1vamkgPSBudWxsO1xuICAgICAgdGhpcy5wcmV2aWV3UmVmLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9LCAxNik7XG4gIH1cbiAgaGFuZGxlRW1vamlDbGljaygkZXZlbnQ6IEVtb2ppRXZlbnQpIHtcbiAgICB0aGlzLmVtb2ppQ2xpY2suZW1pdCgkZXZlbnQpO1xuICAgIHRoaXMuZW1vamlTZWxlY3QuZW1pdCgkZXZlbnQpO1xuICAgIHRoaXMuaGFuZGxlRW50ZXJLZXkoJGV2ZW50LiRldmVudCwgJGV2ZW50LmVtb2ppKTtcbiAgfVxuICBoYW5kbGVTa2luQ2hhbmdlKHNraW46IEVtb2ppWydza2luJ10pIHtcbiAgICB0aGlzLnNraW4gPSBza2luO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGAke3RoaXMuTkFNRVNQQUNFfS5za2luYCwgU3RyaW5nKHNraW4pKTtcbiAgICB0aGlzLnNraW5DaGFuZ2UuZW1pdChza2luKTtcbiAgfVxuICBnZXRXaWR0aCgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLnN0eWxlICYmIHRoaXMuc3R5bGUud2lkdGgpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0eWxlLndpZHRoO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wZXJMaW5lICogKHRoaXMuZW1vamlTaXplICsgMTIpICsgMTIgKyAyICsgdGhpcy5tZWFzdXJlU2Nyb2xsYmFyICsgJ3B4JztcbiAgfVxufVxuIl19