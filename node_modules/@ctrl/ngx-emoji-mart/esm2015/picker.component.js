import { __decorate } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren, } from '@angular/core';
import { categories, } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { EmojiFrequentlyService } from './emoji-frequently.service';
import * as icons from './svgs';
import { measureScrollbar } from './utils';
const I18N = {
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
let PickerComponent = class PickerComponent {
    constructor(ref, frequently) {
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
        this.backgroundImageFn = (set, sheetSize) => `https://unpkg.com/emoji-datasource-${this.set}@5.0.1/img/${this.set}/sheets-256/${this.sheetSize}.png`;
    }
    ngOnInit() {
        // measure scroll
        this.measureScrollbar = measureScrollbar();
        this.i18n = Object.assign(Object.assign({}, I18N), this.i18n);
        this.i18n.categories = Object.assign(Object.assign({}, I18N.categories), this.i18n.categories);
        this.skin =
            JSON.parse(localStorage.getItem(`${this.NAMESPACE}.skin`) || 'null') ||
                this.skin;
        const allCategories = [...categories];
        if (this.custom.length > 0) {
            this.CUSTOM_CATEGORY.emojis = this.custom.map(emoji => {
                return Object.assign(Object.assign({}, emoji), { 
                    // `<Category />` expects emoji to have an `id`.
                    id: emoji.shortNames[0], custom: true });
            });
            allCategories.push(this.CUSTOM_CATEGORY);
        }
        if (this.include !== undefined) {
            allCategories.sort((a, b) => {
                if (this.include.indexOf(a.id) > this.include.indexOf(b.id)) {
                    return 1;
                }
                return -1;
            });
        }
        for (const category of allCategories) {
            const isIncluded = this.include && this.include.length
                ? this.include.indexOf(category.id) > -1
                : true;
            const isExcluded = this.exclude && this.exclude.length
                ? this.exclude.indexOf(category.id) > -1
                : false;
            if (!isIncluded || isExcluded) {
                continue;
            }
            if (this.emojisToShowFilter) {
                const newEmojis = [];
                const { emojis } = category;
                // tslint:disable-next-line: prefer-for-of
                for (let emojiIndex = 0; emojiIndex < emojis.length; emojiIndex++) {
                    const emoji = emojis[emojiIndex];
                    if (this.emojisToShowFilter(emoji)) {
                        newEmojis.push(emoji);
                    }
                }
                if (newEmojis.length) {
                    const newCategory = {
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
            this.categoriesIcons = Object.assign(Object.assign({}, icons.categories), this.categoriesIcons);
            this.searchIcons = Object.assign(Object.assign({}, icons.search), this.searchIcons);
        }
        const includeRecent = this.include && this.include.length
            ? this.include.indexOf(this.RECENT_CATEGORY.id) > -1
            : true;
        const excludeRecent = this.exclude && this.exclude.length
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
        this.selected = this.categories.filter(category => category.first)[0].name;
        // Need to be careful if small number of categories
        const categoriesToLoadFirst = Math.min(this.categories.length, 3);
        this.setActiveCategories(this.activeCategories = this.categories.slice(0, categoriesToLoadFirst));
        // Trim last active category
        const lastActiveCategoryEmojis = this.categories[categoriesToLoadFirst - 1].emojis.slice();
        this.categories[categoriesToLoadFirst - 1].emojis = lastActiveCategoryEmojis.slice(0, 60);
        this.ref.markForCheck();
        setTimeout(() => {
            // Restore last category
            this.categories[categoriesToLoadFirst - 1].emojis = lastActiveCategoryEmojis;
            this.setActiveCategories(this.categories);
            this.ref.markForCheck();
            setTimeout(() => this.updateCategoriesSize());
        });
    }
    setActiveCategories(categoriesToMakeActive) {
        if (this.showSingleCategory) {
            this.activeCategories = categoriesToMakeActive.filter(x => (x.name === this.selected || x === this.SEARCH_CATEGORY));
        }
        else {
            this.activeCategories = categoriesToMakeActive;
        }
    }
    updateCategoriesSize() {
        this.categoryRefs.forEach(component => component.memoizeSize());
        if (this.scrollRef) {
            const target = this.scrollRef.nativeElement;
            this.scrollHeight = target.scrollHeight;
            this.clientHeight = target.clientHeight;
        }
    }
    handleAnchorClick($event) {
        this.updateCategoriesSize();
        this.selected = $event.category.name;
        this.setActiveCategories(this.categories);
        if (this.SEARCH_CATEGORY.emojis) {
            this.handleSearch(null);
            this.searchRef.clear();
            this.handleAnchorClick($event);
            return;
        }
        const component = this.categoryRefs.find(n => n.id === $event.category.id);
        if (component) {
            let { top } = component;
            if ($event.category.first) {
                top = 0;
            }
            else {
                top += 1;
            }
            this.scrollRef.nativeElement.scrollTop = top;
        }
        this.selected = $event.category.name;
        this.nextScroll = $event.category.name;
    }
    categoryTrack(index, item) {
        return item.id;
    }
    handleScroll() {
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
        let activeCategory = null;
        if (this.SEARCH_CATEGORY.emojis) {
            activeCategory = this.SEARCH_CATEGORY;
        }
        else {
            const target = this.scrollRef.nativeElement;
            // check scroll is not at bottom
            if (target.scrollTop === 0) {
                // hit the TOP
                activeCategory = this.categories.find(n => n.first === true);
            }
            else if (target.scrollHeight - target.scrollTop === this.clientHeight) {
                // scrolled to bottom activate last category
                activeCategory = this.categories[this.categories.length - 1];
            }
            else {
                // scrolling
                for (const category of this.categories) {
                    const component = this.categoryRefs.find(n => n.id === category.id);
                    const active = component.handleScroll(target.scrollTop);
                    if (active) {
                        activeCategory = category;
                    }
                }
            }
            this.scrollTop = target.scrollTop;
        }
        if (activeCategory) {
            this.selected = activeCategory.name;
        }
    }
    handleSearch($emojis) {
        this.SEARCH_CATEGORY.emojis = $emojis;
        for (const component of this.categoryRefs.toArray()) {
            if (component.name === 'Search') {
                component.emojis = $emojis;
                component.updateDisplay($emojis ? 'block' : 'none');
            }
            else {
                component.updateDisplay($emojis ? 'none' : 'block');
            }
        }
        this.scrollRef.nativeElement.scrollTop = 0;
        this.handleScroll();
    }
    handleEnterKey($event, emoji) {
        if (!emoji) {
            if (this.SEARCH_CATEGORY.emojis !== null && this.SEARCH_CATEGORY.emojis.length) {
                emoji = this.SEARCH_CATEGORY.emojis[0];
                if (emoji) {
                    this.emojiSelect.emit({ $event, emoji });
                }
                else {
                    return;
                }
            }
        }
        if (!this.hideRecent && !this.recent) {
            this.frequently.add(emoji);
        }
        const component = this.categoryRefs.toArray()[1];
        if (component && this.enableFrequentEmojiSort) {
            component.getEmojis();
            component.ref.markForCheck();
        }
    }
    handleEmojiOver($event) {
        if (!this.showPreview || !this.previewRef) {
            return;
        }
        const emojiData = this.CUSTOM_CATEGORY.emojis.find(customEmoji => customEmoji.id === $event.emoji.id);
        if (emojiData) {
            $event.emoji = Object.assign({}, emojiData);
        }
        this.previewEmoji = $event.emoji;
        clearTimeout(this.leaveTimeout);
    }
    handleEmojiLeave() {
        if (!this.showPreview || !this.previewRef) {
            return;
        }
        this.leaveTimeout = setTimeout(() => {
            this.previewEmoji = null;
            this.previewRef.ref.markForCheck();
        }, 16);
    }
    handleEmojiClick($event) {
        this.emojiClick.emit($event);
        this.emojiSelect.emit($event);
        this.handleEnterKey($event.$event, $event.emoji);
    }
    handleSkinChange(skin) {
        this.skin = skin;
        localStorage.setItem(`${this.NAMESPACE}.skin`, String(skin));
        this.skinChange.emit(skin);
    }
    getWidth() {
        if (this.style && this.style.width) {
            return this.style.width;
        }
        return this.perLine * (this.emojiSize + 12) + 12 + 2 + this.measureScrollbar + 'px';
    }
};
PickerComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: EmojiFrequentlyService }
];
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
export { PickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjdHJsL25neC1lbW9qaS1tYXJ0LyIsInNvdXJjZXMiOlsicGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxZQUFZLEdBQ2IsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUNMLFVBQVUsR0FLWCxNQUFNLGdDQUFnQyxDQUFDO0FBRXhDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBR3BFLE9BQU8sS0FBSyxLQUFLLE1BQU0sUUFBUSxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUkzQyxNQUFNLElBQUksR0FBUTtJQUNoQixNQUFNLEVBQUUsUUFBUTtJQUNoQixTQUFTLEVBQUUsZUFBZTtJQUMxQixRQUFRLEVBQUUsZ0JBQWdCO0lBQzFCLEtBQUssRUFBRSxPQUFPO0lBQ2QsVUFBVSxFQUFFO1FBQ1YsTUFBTSxFQUFFLGdCQUFnQjtRQUN4QixNQUFNLEVBQUUsaUJBQWlCO1FBQ3pCLE1BQU0sRUFBRSxrQkFBa0I7UUFDMUIsTUFBTSxFQUFFLGtCQUFrQjtRQUMxQixLQUFLLEVBQUUsY0FBYztRQUNyQixRQUFRLEVBQUUsVUFBVTtRQUNwQixNQUFNLEVBQUUsaUJBQWlCO1FBQ3pCLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLEtBQUssRUFBRSxPQUFPO1FBQ2QsTUFBTSxFQUFFLFFBQVE7S0FDakI7SUFDRCxTQUFTLEVBQUU7UUFDVCxDQUFDLEVBQUUsbUJBQW1CO1FBQ3RCLENBQUMsRUFBRSxpQkFBaUI7UUFDcEIsQ0FBQyxFQUFFLHdC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QUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO2tEQUFnQztBQUNoRDtJQUF4QixTQUFTLENBQUMsWUFBWSxDQUFDO21EQUF1QztBQUNyQjtJQUF6QyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO2tEQUFxQztBQUNqRDtJQUE1QixZQUFZLENBQUMsYUFBYSxDQUFDO3FEQUFxRDtBQThCakY7SUFEQyxLQUFLLEVBQUU7MERBS2lHO0FBOUU5RixlQUFlO0lBTjNCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxZQUFZO1FBQ3RCLDgvRUFBc0M7UUFDdEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07UUFDL0MsbUJBQW1CLEVBQUUsS0FBSztLQUMzQixDQUFDO0dBQ1csZUFBZSxDQThXM0I7U0E5V1ksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDaGlsZHJlbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIGNhdGVnb3JpZXMsXG4gIEVtb2ppLFxuICBFbW9qaUNhdGVnb3J5LFxuICBFbW9qaURhdGEsXG4gIEVtb2ppRXZlbnQsXG59IGZyb20gJ0BjdHJsL25neC1lbW9qaS1tYXJ0L25neC1lbW9qaSc7XG5pbXBvcnQgeyBDYXRlZ29yeUNvbXBvbmVudCB9IGZyb20gJy4vY2F0ZWdvcnkuY29tcG9uZW50JztcbmltcG9ydCB7IEVtb2ppRnJlcXVlbnRseVNlcnZpY2UgfSBmcm9tICcuL2Vtb2ppLWZyZXF1ZW50bHkuc2VydmljZSc7XG5pbXBvcnQgeyBQcmV2aWV3Q29tcG9uZW50IH0gZnJvbSAnLi9wcmV2aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZWFyY2hDb21wb25lbnQgfSBmcm9tICcuL3NlYXJjaC5jb21wb25lbnQnO1xuaW1wb3J0ICogYXMgaWNvbnMgZnJvbSAnLi9zdmdzJztcbmltcG9ydCB7IG1lYXN1cmVTY3JvbGxiYXIgfSBmcm9tICcuL3V0aWxzJztcblxuXG5cbmNvbnN0IEkxOE46IGFueSA9IHtcbiAgc2VhcmNoOiAnU2VhcmNoJyxcbiAgZW1vamlsaXN0OiAnTGlzdCBvZiBlbW9qaScsXG4gIG5vdGZvdW5kOiAnTm8gRW1vamkgRm91bmQnLFxuICBjbGVhcjogJ0NsZWFyJyxcbiAgY2F0ZWdvcmllczoge1xuICAgIHNlYXJjaDogJ1NlYXJjaCBSZXN1bHRzJyxcbiAgICByZWNlbnQ6ICdGcmVxdWVudGx5IFVzZWQnLFxuICAgIHBlb3BsZTogJ1NtaWxleXMgJiBQZW9wbGUnLFxuICAgIG5hdHVyZTogJ0FuaW1hbHMgJiBOYXR1cmUnLFxuICAgIGZvb2RzOiAnRm9vZCAmIERyaW5rJyxcbiAgICBhY3Rpdml0eTogJ0FjdGl2aXR5JyxcbiAgICBwbGFjZXM6ICdUcmF2ZWwgJiBQbGFjZXMnLFxuICAgIG9iamVjdHM6ICdPYmplY3RzJyxcbiAgICBzeW1ib2xzOiAnU3ltYm9scycsXG4gICAgZmxhZ3M6ICdGbGFncycsXG4gICAgY3VzdG9tOiAnQ3VzdG9tJyxcbiAgfSxcbiAgc2tpbnRvbmVzOiB7XG4gICAgMTogJ0RlZmF1bHQgU2tpbiBUb25lJyxcbiAgICAyOiAnTGlnaHQgU2tpbiBUb25lJyxcbiAgICAzOiAnTWVkaXVtLUxpZ2h0IFNraW4gVG9uZScsXG4gICAgNDogJ01lZGl1bSBTa2luIFRvbmUnLFxuICAgIDU6ICdNZWRpdW0tRGFyayBTa2luIFRvbmUnLFxuICAgIDY6ICdEYXJrIFNraW4gVG9uZScsXG4gIH0sXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdlbW9qaS1tYXJ0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3BpY2tlci5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbn0pXG5leHBvcnQgY2xhc3MgUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgcGVyTGluZSA9IDk7XG4gIEBJbnB1dCgpIHRvdGFsRnJlcXVlbnRMaW5lcyA9IDQ7XG4gIEBJbnB1dCgpIGkxOG46IGFueSA9IHt9O1xuICBASW5wdXQoKSBzdHlsZTogYW55ID0ge307XG4gIEBJbnB1dCgpIHRpdGxlID0gJ0Vtb2ppIE1hcnTihKInO1xuICBASW5wdXQoKSBlbW9qaSA9ICdkZXBhcnRtZW50X3N0b3JlJztcbiAgQElucHV0KCkgZGFya01vZGUgPSAhIShcbiAgICB0eXBlb2YgbWF0Y2hNZWRpYSA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIG1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKS5tYXRjaGVzXG4gICk7XG4gIEBJbnB1dCgpIGNvbG9yID0gJyNhZTY1YzUnO1xuICBASW5wdXQoKSBoaWRlT2Jzb2xldGUgPSB0cnVlO1xuICAvKiogYWxsIGNhdGVnb3JpZXMgc2hvd24gKi9cbiAgQElucHV0KCkgY2F0ZWdvcmllczogRW1vamlDYXRlZ29yeVtdID0gW107XG4gIC8qKiB1c2VkIHRvIHRlbXBvcmFyaWx5IGRyYXcgY2F0ZWdvcmllcyAqL1xuICBASW5wdXQoKSBhY3RpdmVDYXRlZ29yaWVzOiBFbW9qaUNhdGVnb3J5W10gPSBbXTtcbiAgQElucHV0KCkgc2V0OiBFbW9qaVsnc2V0J10gPSAnYXBwbGUnO1xuICBASW5wdXQoKSBza2luOiBFbW9qaVsnc2tpbiddID0gMTtcbiAgLyoqIFJlbmRlcnMgdGhlIG5hdGl2ZSB1bmljb2RlIGVtb2ppICovXG4gIEBJbnB1dCgpIGlzTmF0aXZlOiBFbW9qaVsnaXNOYXRpdmUnXSA9IGZhbHNlO1xuICBASW5wdXQoKSBlbW9qaVNpemU6IEVtb2ppWydzaXplJ10gPSAyNDtcbiAgQElucHV0KCkgc2hlZXRTaXplOiBFbW9qaVsnc2hlZXRTaXplJ10gPSA2NDtcbiAgQElucHV0KCkgZW1vamlzVG9TaG93RmlsdGVyPzogKHg6IHN0cmluZykgPT4gYm9vbGVhbjtcbiAgQElucHV0KCkgc2hvd1ByZXZpZXcgPSB0cnVlO1xuICBASW5wdXQoKSBlbW9qaVRvb2x0aXAgPSBmYWxzZTtcbiAgQElucHV0KCkgYXV0b0ZvY3VzID0gZmFsc2U7XG4gIEBJbnB1dCgpIGN1c3RvbTogYW55W10gPSBbXTtcbiAgQElucHV0KCkgaGlkZVJlY2VudCA9IHRydWU7XG4gIEBJbnB1dCgpIGluY2x1ZGU/OiBzdHJpbmdbXTtcbiAgQElucHV0KCkgZXhjbHVkZT86IHN0cmluZ1tdO1xuICBASW5wdXQoKSBub3RGb3VuZEVtb2ppID0gJ3NsZXV0aF9vcl9zcHknO1xuICBASW5wdXQoKSBjYXRlZ29yaWVzSWNvbnMgPSBpY29ucy5jYXRlZ29yaWVzO1xuICBASW5wdXQoKSBzZWFyY2hJY29ucyA9IGljb25zLnNlYXJjaDtcbiAgQElucHV0KCkgdXNlQnV0dG9uID0gZmFsc2U7XG4gIEBJbnB1dCgpIGVuYWJsZUZyZXF1ZW50RW1vamlTb3J0ID0gZmFsc2U7XG4gIEBJbnB1dCgpIGVuYWJsZVNlYXJjaCA9IHRydWU7XG4gIEBJbnB1dCgpIHNob3dTaW5nbGVDYXRlZ29yeSA9IGZhbHNlO1xuICBAT3V0cHV0KCkgZW1vamlDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgZW1vamlTZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHNraW5DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEVtb2ppWydza2luJ10+KCk7XG4gIEBWaWV3Q2hpbGQoJ3Njcm9sbFJlZicsIHsgc3RhdGljOiB0cnVlIH0pIHByaXZhdGUgc2Nyb2xsUmVmITogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgncHJldmlld1JlZicpIHByaXZhdGUgcHJldmlld1JlZiE6IFByZXZpZXdDb21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoJ3NlYXJjaFJlZicsIHsgc3RhdGljOiB0cnVlIH0pIHByaXZhdGUgc2VhcmNoUmVmITogU2VhcmNoQ29tcG9uZW50O1xuICBAVmlld0NoaWxkcmVuKCdjYXRlZ29yeVJlZicpIHByaXZhdGUgY2F0ZWdvcnlSZWZzITogUXVlcnlMaXN0PENhdGVnb3J5Q29tcG9uZW50PjtcbiAgc2Nyb2xsSGVpZ2h0ID0gMDtcbiAgY2xpZW50SGVpZ2h0ID0gMDtcbiAgc2VsZWN0ZWQ/OiBzdHJpbmc7XG4gIG5leHRTY3JvbGw/OiBzdHJpbmc7XG4gIHNjcm9sbFRvcD86IG51bWJlcjtcbiAgZmlyc3RSZW5kZXIgPSB0cnVlO1xuICByZWNlbnQ/OiBzdHJpbmdbXTtcbiAgcHJldmlld0Vtb2ppOiBhbnk7XG4gIGxlYXZlVGltZW91dDogYW55O1xuICBOQU1FU1BBQ0UgPSAnZW1vamktbWFydCc7XG4gIG1lYXN1cmVTY3JvbGxiYXIgPSAwO1xuICBSRUNFTlRfQ0FURUdPUlk6IEVtb2ppQ2F0ZWdvcnkgPSB7XG4gICAgaWQ6ICdyZWNlbnQnLFxuICAgIG5hbWU6ICdSZWNlbnQnLFxuICAgIGVtb2ppczogbnVsbCxcbiAgfTtcbiAgU0VBUkNIX0NBVEVHT1JZOiBFbW9qaUNhdGVnb3J5ID0ge1xuICAgIGlkOiAnc2VhcmNoJyxcbiAgICBuYW1lOiAnU2VhcmNoJyxcbiAgICBlbW9qaXM6IG51bGwsXG4gICAgYW5jaG9yOiBmYWxzZSxcbiAgfTtcbiAgQ1VTVE9NX0NBVEVHT1JZOiBFbW9qaUNhdGVnb3J5ID0ge1xuICAgIGlkOiAnY3VzdG9tJyxcbiAgICBuYW1lOiAnQ3VzdG9tJyxcbiAgICBlbW9qaXM6IFtdLFxuICB9O1xuXG4gIEBJbnB1dCgpXG4gIGJhY2tncm91bmRJbWFnZUZuOiBFbW9qaVsnYmFja2dyb3VuZEltYWdlRm4nXSA9IChcbiAgICBzZXQ6IHN0cmluZyxcbiAgICBzaGVldFNpemU6IG51bWJlcixcbiAgKSA9PlxuICAgIGBodHRwczovL3VucGtnLmNvbS9lbW9qaS1kYXRhc291cmNlLSR7dGhpcy5zZXR9QDUuMC4xL2ltZy8ke3RoaXMuc2V0fS9zaGVldHMtMjU2LyR7dGhpcy5zaGVldFNpemV9LnBuZ2BcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBmcmVxdWVudGx5OiBFbW9qaUZyZXF1ZW50bHlTZXJ2aWNlLFxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gbWVhc3VyZSBzY3JvbGxcbiAgICB0aGlzLm1lYXN1cmVTY3JvbGxiYXIgPSBtZWFzdXJlU2Nyb2xsYmFyKCk7XG5cbiAgICB0aGlzLmkxOG4gPSB7IC4uLkkxOE4sIC4uLnRoaXMuaTE4biB9O1xuICAgIHRoaXMuaTE4bi5jYXRlZ29yaWVzID0geyAuLi5JMThOLmNhdGVnb3JpZXMsIC4uLnRoaXMuaTE4bi5jYXRlZ29yaWVzIH07XG4gICAgdGhpcy5za2luID1cbiAgICAgIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oYCR7dGhpcy5OQU1FU1BBQ0V9LnNraW5gKSB8fCAnbnVsbCcpIHx8XG4gICAgICB0aGlzLnNraW47XG5cbiAgICBjb25zdCBhbGxDYXRlZ29yaWVzID0gWy4uLmNhdGVnb3JpZXNdO1xuXG4gICAgaWYgKHRoaXMuY3VzdG9tLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuQ1VTVE9NX0NBVEVHT1JZLmVtb2ppcyA9IHRoaXMuY3VzdG9tLm1hcChlbW9qaSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uZW1vamksXG4gICAgICAgICAgLy8gYDxDYXRlZ29yeSAvPmAgZXhwZWN0cyBlbW9qaSB0byBoYXZlIGFuIGBpZGAuXG4gICAgICAgICAgaWQ6IGVtb2ppLnNob3J0TmFtZXNbMF0sXG4gICAgICAgICAgY3VzdG9tOiB0cnVlLFxuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIGFsbENhdGVnb3JpZXMucHVzaCh0aGlzLkNVU1RPTV9DQVRFR09SWSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaW5jbHVkZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBhbGxDYXRlZ29yaWVzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaW5jbHVkZS5pbmRleE9mKGEuaWQpID4gdGhpcy5pbmNsdWRlLmluZGV4T2YoYi5pZCkpIHtcbiAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGNhdGVnb3J5IG9mIGFsbENhdGVnb3JpZXMpIHtcbiAgICAgIGNvbnN0IGlzSW5jbHVkZWQgPVxuICAgICAgICB0aGlzLmluY2x1ZGUgJiYgdGhpcy5pbmNsdWRlLmxlbmd0aFxuICAgICAgICAgID8gdGhpcy5pbmNsdWRlLmluZGV4T2YoY2F0ZWdvcnkuaWQpID4gLTFcbiAgICAgICAgICA6IHRydWU7XG4gICAgICBjb25zdCBpc0V4Y2x1ZGVkID1cbiAgICAgICAgdGhpcy5leGNsdWRlICYmIHRoaXMuZXhjbHVkZS5sZW5ndGhcbiAgICAgICAgICA/IHRoaXMuZXhjbHVkZS5pbmRleE9mKGNhdGVnb3J5LmlkKSA+IC0xXG4gICAgICAgICAgOiBmYWxzZTtcbiAgICAgIGlmICghaXNJbmNsdWRlZCB8fCBpc0V4Y2x1ZGVkKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5lbW9qaXNUb1Nob3dGaWx0ZXIpIHtcbiAgICAgICAgY29uc3QgbmV3RW1vamlzID0gW107XG5cbiAgICAgICAgY29uc3QgeyBlbW9qaXMgfSA9IGNhdGVnb3J5O1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHByZWZlci1mb3Itb2ZcbiAgICAgICAgZm9yIChsZXQgZW1vamlJbmRleCA9IDA7IGVtb2ppSW5kZXggPCBlbW9qaXMubGVuZ3RoOyBlbW9qaUluZGV4KyspIHtcbiAgICAgICAgICBjb25zdCBlbW9qaSA9IGVtb2ppc1tlbW9qaUluZGV4XTtcbiAgICAgICAgICBpZiAodGhpcy5lbW9qaXNUb1Nob3dGaWx0ZXIoZW1vamkpKSB7XG4gICAgICAgICAgICBuZXdFbW9qaXMucHVzaChlbW9qaSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5ld0Vtb2ppcy5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCBuZXdDYXRlZ29yeSA9IHtcbiAgICAgICAgICAgIGVtb2ppczogbmV3RW1vamlzLFxuICAgICAgICAgICAgbmFtZTogY2F0ZWdvcnkubmFtZSxcbiAgICAgICAgICAgIGlkOiBjYXRlZ29yeS5pZCxcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdGhpcy5jYXRlZ29yaWVzLnB1c2gobmV3Q2F0ZWdvcnkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNhdGVnb3JpZXMucHVzaChjYXRlZ29yeSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2F0ZWdvcmllc0ljb25zID0geyAuLi5pY29ucy5jYXRlZ29yaWVzLCAuLi50aGlzLmNhdGVnb3JpZXNJY29ucyB9O1xuICAgICAgdGhpcy5zZWFyY2hJY29ucyA9IHsgLi4uaWNvbnMuc2VhcmNoLCAuLi50aGlzLnNlYXJjaEljb25zIH07XG4gICAgfVxuXG4gICAgY29uc3QgaW5jbHVkZVJlY2VudCA9XG4gICAgICB0aGlzLmluY2x1ZGUgJiYgdGhpcy5pbmNsdWRlLmxlbmd0aFxuICAgICAgICA/IHRoaXMuaW5jbHVkZS5pbmRleE9mKHRoaXMuUkVDRU5UX0NBVEVHT1JZLmlkKSA+IC0xXG4gICAgICAgIDogdHJ1ZTtcbiAgICBjb25zdCBleGNsdWRlUmVjZW50ID1cbiAgICAgIHRoaXMuZXhjbHVkZSAmJiB0aGlzLmV4Y2x1ZGUubGVuZ3RoXG4gICAgICAgID8gdGhpcy5leGNsdWRlLmluZGV4T2YodGhpcy5SRUNFTlRfQ0FURUdPUlkuaWQpID4gLTFcbiAgICAgICAgOiBmYWxzZTtcbiAgICBpZiAoaW5jbHVkZVJlY2VudCAmJiAhZXhjbHVkZVJlY2VudCkge1xuICAgICAgdGhpcy5oaWRlUmVjZW50ID0gZmFsc2U7XG4gICAgICB0aGlzLmNhdGVnb3JpZXMudW5zaGlmdCh0aGlzLlJFQ0VOVF9DQVRFR09SWSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY2F0ZWdvcmllc1swXSkge1xuICAgICAgdGhpcy5jYXRlZ29yaWVzWzBdLmZpcnN0ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLmNhdGVnb3JpZXMudW5zaGlmdCh0aGlzLlNFQVJDSF9DQVRFR09SWSk7XG4gICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuY2F0ZWdvcmllcy5maWx0ZXIoY2F0ZWdvcnkgPT4gY2F0ZWdvcnkuZmlyc3QpWzBdLm5hbWU7XG5cbiAgICAvLyBOZWVkIHRvIGJlIGNhcmVmdWwgaWYgc21hbGwgbnVtYmVyIG9mIGNhdGVnb3JpZXNcbiAgICBjb25zdCBjYXRlZ29yaWVzVG9Mb2FkRmlyc3QgPSBNYXRoLm1pbih0aGlzLmNhdGVnb3JpZXMubGVuZ3RoLCAzKTtcbiAgICB0aGlzLnNldEFjdGl2ZUNhdGVnb3JpZXModGhpcy5hY3RpdmVDYXRlZ29yaWVzID0gdGhpcy5jYXRlZ29yaWVzLnNsaWNlKDAsIGNhdGVnb3JpZXNUb0xvYWRGaXJzdCkpO1xuXG4gICAgLy8gVHJpbSBsYXN0IGFjdGl2ZSBjYXRlZ29yeVxuICAgIGNvbnN0IGxhc3RBY3RpdmVDYXRlZ29yeUVtb2ppcyA9IHRoaXMuY2F0ZWdvcmllc1tjYXRlZ29yaWVzVG9Mb2FkRmlyc3QgLSAxXS5lbW9qaXMuc2xpY2UoKTtcbiAgICB0aGlzLmNhdGVnb3JpZXNbY2F0ZWdvcmllc1RvTG9hZEZpcnN0IC0gMV0uZW1vamlzID0gbGFzdEFjdGl2ZUNhdGVnb3J5RW1vamlzLnNsaWNlKDAsIDYwKTtcblxuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAvLyBSZXN0b3JlIGxhc3QgY2F0ZWdvcnlcbiAgICAgIHRoaXMuY2F0ZWdvcmllc1tjYXRlZ29yaWVzVG9Mb2FkRmlyc3QgLSAxXS5lbW9qaXMgPSBsYXN0QWN0aXZlQ2F0ZWdvcnlFbW9qaXM7XG4gICAgICB0aGlzLnNldEFjdGl2ZUNhdGVnb3JpZXModGhpcy5jYXRlZ29yaWVzKTtcbiAgICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZUNhdGVnb3JpZXNTaXplKCkpO1xuICAgIH0pO1xuICB9XG4gIHNldEFjdGl2ZUNhdGVnb3JpZXMoY2F0ZWdvcmllc1RvTWFrZUFjdGl2ZTogQXJyYXk8RW1vamlDYXRlZ29yeT4pIHtcbiAgICBpZiAodGhpcy5zaG93U2luZ2xlQ2F0ZWdvcnkpIHtcbiAgICAgIHRoaXMuYWN0aXZlQ2F0ZWdvcmllcyA9IGNhdGVnb3JpZXNUb01ha2VBY3RpdmUuZmlsdGVyKFxuICAgICAgICB4ID0+ICh4Lm5hbWUgPT09IHRoaXMuc2VsZWN0ZWQgfHwgeCA9PT0gdGhpcy5TRUFSQ0hfQ0FURUdPUlkpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFjdGl2ZUNhdGVnb3JpZXMgPSBjYXRlZ29yaWVzVG9NYWtlQWN0aXZlO1xuICAgIH1cbiAgfVxuICB1cGRhdGVDYXRlZ29yaWVzU2l6ZSgpIHtcbiAgICB0aGlzLmNhdGVnb3J5UmVmcy5mb3JFYWNoKGNvbXBvbmVudCA9PiBjb21wb25lbnQubWVtb2l6ZVNpemUoKSk7XG5cbiAgICBpZiAodGhpcy5zY3JvbGxSZWYpIHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuc2Nyb2xsUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICB0aGlzLnNjcm9sbEhlaWdodCA9IHRhcmdldC5zY3JvbGxIZWlnaHQ7XG4gICAgICB0aGlzLmNsaWVudEhlaWdodCA9IHRhcmdldC5jbGllbnRIZWlnaHQ7XG4gICAgfVxuICB9XG4gIGhhbmRsZUFuY2hvckNsaWNrKCRldmVudDogeyBjYXRlZ29yeTogRW1vamlDYXRlZ29yeTsgaW5kZXg6IG51bWJlciB9KSB7XG4gICAgdGhpcy51cGRhdGVDYXRlZ29yaWVzU2l6ZSgpO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSAkZXZlbnQuY2F0ZWdvcnkubmFtZTtcbiAgICB0aGlzLnNldEFjdGl2ZUNhdGVnb3JpZXModGhpcy5jYXRlZ29yaWVzKTtcblxuICAgIGlmICh0aGlzLlNFQVJDSF9DQVRFR09SWS5lbW9qaXMpIHtcbiAgICAgIHRoaXMuaGFuZGxlU2VhcmNoKG51bGwpO1xuICAgICAgdGhpcy5zZWFyY2hSZWYuY2xlYXIoKTtcbiAgICAgIHRoaXMuaGFuZGxlQW5jaG9yQ2xpY2soJGV2ZW50KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjb21wb25lbnQgPSB0aGlzLmNhdGVnb3J5UmVmcy5maW5kKG4gPT4gbi5pZCA9PT0gJGV2ZW50LmNhdGVnb3J5LmlkKTtcbiAgICBpZiAoY29tcG9uZW50KSB7XG4gICAgICBsZXQgeyB0b3AgfSA9IGNvbXBvbmVudDtcblxuICAgICAgaWYgKCRldmVudC5jYXRlZ29yeS5maXJzdCkge1xuICAgICAgICB0b3AgPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9wICs9IDE7XG4gICAgICB9XG4gICAgICB0aGlzLnNjcm9sbFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IHRvcDtcbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZCA9ICRldmVudC5jYXRlZ29yeS5uYW1lO1xuICAgIHRoaXMubmV4dFNjcm9sbCA9ICRldmVudC5jYXRlZ29yeS5uYW1lO1xuICB9XG4gIGNhdGVnb3J5VHJhY2soaW5kZXg6IG51bWJlciwgaXRlbTogYW55KSB7XG4gICAgcmV0dXJuIGl0ZW0uaWQ7XG4gIH1cbiAgaGFuZGxlU2Nyb2xsKCkge1xuICAgIGlmICh0aGlzLm5leHRTY3JvbGwpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLm5leHRTY3JvbGw7XG4gICAgICB0aGlzLm5leHRTY3JvbGwgPSB1bmRlZmluZWQ7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghdGhpcy5zY3JvbGxSZWYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2hvd1NpbmdsZUNhdGVnb3J5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGFjdGl2ZUNhdGVnb3J5ID0gbnVsbDtcbiAgICBpZiAodGhpcy5TRUFSQ0hfQ0FURUdPUlkuZW1vamlzKSB7XG4gICAgICBhY3RpdmVDYXRlZ29yeSA9IHRoaXMuU0VBUkNIX0NBVEVHT1JZO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLnNjcm9sbFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgLy8gY2hlY2sgc2Nyb2xsIGlzIG5vdCBhdCBib3R0b21cbiAgICAgIGlmICh0YXJnZXQuc2Nyb2xsVG9wID09PSAwKSB7XG4gICAgICAgIC8vIGhpdCB0aGUgVE9QXG4gICAgICAgIGFjdGl2ZUNhdGVnb3J5ID0gdGhpcy5jYXRlZ29yaWVzLmZpbmQobiA9PiBuLmZpcnN0ID09PSB0cnVlKTtcbiAgICAgIH0gZWxzZSBpZiAodGFyZ2V0LnNjcm9sbEhlaWdodCAtIHRhcmdldC5zY3JvbGxUb3AgPT09IHRoaXMuY2xpZW50SGVpZ2h0KSB7XG4gICAgICAgIC8vIHNjcm9sbGVkIHRvIGJvdHRvbSBhY3RpdmF0ZSBsYXN0IGNhdGVnb3J5XG4gICAgICAgIGFjdGl2ZUNhdGVnb3J5ID0gdGhpcy5jYXRlZ29yaWVzW3RoaXMuY2F0ZWdvcmllcy5sZW5ndGggLSAxXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHNjcm9sbGluZ1xuICAgICAgICBmb3IgKGNvbnN0IGNhdGVnb3J5IG9mIHRoaXMuY2F0ZWdvcmllcykge1xuICAgICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMuY2F0ZWdvcnlSZWZzLmZpbmQobiA9PiBuLmlkID09PSBjYXRlZ29yeS5pZCk7XG4gICAgICAgICAgY29uc3QgYWN0aXZlID0gY29tcG9uZW50LmhhbmRsZVNjcm9sbCh0YXJnZXQuc2Nyb2xsVG9wKTtcbiAgICAgICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgICAgICBhY3RpdmVDYXRlZ29yeSA9IGNhdGVnb3J5O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnNjcm9sbFRvcCA9IHRhcmdldC5zY3JvbGxUb3A7XG4gICAgfVxuICAgIGlmIChhY3RpdmVDYXRlZ29yeSkge1xuICAgICAgdGhpcy5zZWxlY3RlZCA9IGFjdGl2ZUNhdGVnb3J5Lm5hbWU7XG4gICAgfVxuICB9XG4gIGhhbmRsZVNlYXJjaCgkZW1vamlzOiBhbnlbXSB8IG51bGwpIHtcbiAgICB0aGlzLlNFQVJDSF9DQVRFR09SWS5lbW9qaXMgPSAkZW1vamlzO1xuICAgIGZvciAoY29uc3QgY29tcG9uZW50IG9mIHRoaXMuY2F0ZWdvcnlSZWZzLnRvQXJyYXkoKSkge1xuICAgICAgaWYgKGNvbXBvbmVudC5uYW1lID09PSAnU2VhcmNoJykge1xuICAgICAgICBjb21wb25lbnQuZW1vamlzID0gJGVtb2ppcztcbiAgICAgICAgY29tcG9uZW50LnVwZGF0ZURpc3BsYXkoJGVtb2ppcyA/ICdibG9jaycgOiAnbm9uZScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29tcG9uZW50LnVwZGF0ZURpc3BsYXkoJGVtb2ppcyA/ICdub25lJyA6ICdibG9jaycpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2Nyb2xsUmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gMDtcbiAgICB0aGlzLmhhbmRsZVNjcm9sbCgpO1xuICB9XG5cbiAgaGFuZGxlRW50ZXJLZXkoJGV2ZW50OiBFdmVudCwgZW1vamk/OiBFbW9qaURhdGEpIHtcbiAgICBpZiAoIWVtb2ppKSB7XG4gICAgICBpZiAodGhpcy5TRUFSQ0hfQ0FURUdPUlkuZW1vamlzICE9PSBudWxsICYmIHRoaXMuU0VBUkNIX0NBVEVHT1JZLmVtb2ppcy5sZW5ndGgpIHtcbiAgICAgICAgZW1vamkgPSB0aGlzLlNFQVJDSF9DQVRFR09SWS5lbW9qaXNbMF07XG4gICAgICAgIGlmIChlbW9qaSkge1xuICAgICAgICAgIHRoaXMuZW1vamlTZWxlY3QuZW1pdCh7ICRldmVudCwgZW1vamkgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmhpZGVSZWNlbnQgJiYgIXRoaXMucmVjZW50KSB7XG4gICAgICB0aGlzLmZyZXF1ZW50bHkuYWRkKGVtb2ppKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb21wb25lbnQgPSB0aGlzLmNhdGVnb3J5UmVmcy50b0FycmF5KClbMV07XG4gICAgaWYgKGNvbXBvbmVudCAmJiB0aGlzLmVuYWJsZUZyZXF1ZW50RW1vamlTb3J0KSB7XG4gICAgICBjb21wb25lbnQuZ2V0RW1vamlzKCk7XG4gICAgICBjb21wb25lbnQucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuICBoYW5kbGVFbW9qaU92ZXIoJGV2ZW50OiBFbW9qaUV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLnNob3dQcmV2aWV3IHx8ICF0aGlzLnByZXZpZXdSZWYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBlbW9qaURhdGEgPSB0aGlzLkNVU1RPTV9DQVRFR09SWS5lbW9qaXMuZmluZChcbiAgICAgIGN1c3RvbUVtb2ppID0+IGN1c3RvbUVtb2ppLmlkID09PSAkZXZlbnQuZW1vamkuaWQsXG4gICAgKTtcbiAgICBpZiAoZW1vamlEYXRhKSB7XG4gICAgICAkZXZlbnQuZW1vamkgPSB7IC4uLmVtb2ppRGF0YSB9O1xuICAgIH1cblxuICAgIHRoaXMucHJldmlld0Vtb2ppID0gJGV2ZW50LmVtb2ppO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmxlYXZlVGltZW91dCk7XG4gIH1cbiAgaGFuZGxlRW1vamlMZWF2ZSgpIHtcbiAgICBpZiAoIXRoaXMuc2hvd1ByZXZpZXcgfHwgIXRoaXMucHJldmlld1JlZikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubGVhdmVUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnByZXZpZXdFbW9qaSA9IG51bGw7XG4gICAgICB0aGlzLnByZXZpZXdSZWYucmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0sIDE2KTtcbiAgfVxuICBoYW5kbGVFbW9qaUNsaWNrKCRldmVudDogRW1vamlFdmVudCkge1xuICAgIHRoaXMuZW1vamlDbGljay5lbWl0KCRldmVudCk7XG4gICAgdGhpcy5lbW9qaVNlbGVjdC5lbWl0KCRldmVudCk7XG4gICAgdGhpcy5oYW5kbGVFbnRlcktleSgkZXZlbnQuJGV2ZW50LCAkZXZlbnQuZW1vamkpO1xuICB9XG4gIGhhbmRsZVNraW5DaGFuZ2Uoc2tpbjogRW1vamlbJ3NraW4nXSkge1xuICAgIHRoaXMuc2tpbiA9IHNraW47XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYCR7dGhpcy5OQU1FU1BBQ0V9LnNraW5gLCBTdHJpbmcoc2tpbikpO1xuICAgIHRoaXMuc2tpbkNoYW5nZS5lbWl0KHNraW4pO1xuICB9XG4gIGdldFdpZHRoKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuc3R5bGUgJiYgdGhpcy5zdHlsZS53aWR0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3R5bGUud2lkdGg7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnBlckxpbmUgKiAodGhpcy5lbW9qaVNpemUgKyAxMikgKyAxMiArIDIgKyB0aGlzLm1lYXN1cmVTY3JvbGxiYXIgKyAncHgnO1xuICB9XG59XG4iXX0=