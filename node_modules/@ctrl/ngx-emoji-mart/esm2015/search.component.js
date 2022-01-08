import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { EmojiSearch } from './emoji-search.service';
let id = 0;
let SearchComponent = class SearchComponent {
    constructor(emojiSearch) {
        this.emojiSearch = emojiSearch;
        this.maxResults = 75;
        this.autoFocus = false;
        this.include = [];
        this.exclude = [];
        this.custom = [];
        this.searchResults = new EventEmitter();
        this.enterKey = new EventEmitter();
        this.isSearching = false;
        this.query = '';
        this.inputId = `emoji-mart-search-${++id}`;
    }
    ngOnInit() {
        this.icon = this.icons.search;
    }
    ngAfterViewInit() {
        if (this.autoFocus) {
            this.inputRef.nativeElement.focus();
        }
    }
    clear() {
        this.query = '';
        this.handleSearch('');
        this.inputRef.nativeElement.focus();
    }
    handleEnterKey($event) {
        if (!this.query) {
            return;
        }
        this.enterKey.emit($event);
        $event.preventDefault();
    }
    handleSearch(value) {
        if (value === '') {
            this.icon = this.icons.search;
            this.isSearching = false;
        }
        else {
            this.icon = this.icons.delete;
            this.isSearching = true;
        }
        const emojis = this.emojiSearch.search(this.query, this.emojisToShowFilter, this.maxResults, this.include, this.exclude, this.custom);
        this.searchResults.emit(emojis);
    }
    handleChange() {
        this.handleSearch(this.query);
    }
};
SearchComponent.ctorParameters = () => [
    { type: EmojiSearch }
];
__decorate([
    Input()
], SearchComponent.prototype, "maxResults", void 0);
__decorate([
    Input()
], SearchComponent.prototype, "autoFocus", void 0);
__decorate([
    Input()
], SearchComponent.prototype, "i18n", void 0);
__decorate([
    Input()
], SearchComponent.prototype, "include", void 0);
__decorate([
    Input()
], SearchComponent.prototype, "exclude", void 0);
__decorate([
    Input()
], SearchComponent.prototype, "custom", void 0);
__decorate([
    Input()
], SearchComponent.prototype, "icons", void 0);
__decorate([
    Input()
], SearchComponent.prototype, "emojisToShowFilter", void 0);
__decorate([
    Output()
], SearchComponent.prototype, "searchResults", void 0);
__decorate([
    Output()
], SearchComponent.prototype, "enterKey", void 0);
__decorate([
    ViewChild('inputRef', { static: true })
], SearchComponent.prototype, "inputRef", void 0);
SearchComponent = __decorate([
    Component({
        selector: 'emoji-search',
        template: `
    <div class="emoji-mart-search">
      <input
        [id]="inputId"
        #inputRef
        type="search"
        (keyup.enter)="handleEnterKey($event)"
        [placeholder]="i18n.search"
        [autofocus]="autoFocus"
        [(ngModel)]="query"
        (ngModelChange)="handleChange()"
      />
      <!--
      Use a <label> in addition to the placeholder for accessibility, but place it off-screen
      http://www.maxability.co.in/2016/01/placeholder-attribute-and-why-it-is-not-accessible/
      -->
      <label class="emoji-mart-sr-only" [htmlFor]="inputId">
        {{ i18n.search }}
      </label>
      <button
        type="button"
        class="emoji-mart-search-icon"
        (click)="clear()"
        (keyup.enter)="clear()"
        [disabled]="!isSearching"
        [attr.aria-label]="i18n.clear"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          width="13"
          height="13"
          opacity="0.5"
        >
          <path [attr.d]="icon" />
        </svg>
      </button>
    </div>
  `,
        preserveWhitespaces: false
    })
], SearchComponent);
export { SearchComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjdHJsL25neC1lbW9qaS1tYXJ0LyIsInNvdXJjZXMiOlsic2VhcmNoLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUVMLFNBQVMsRUFFVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXJELElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztBQTZDWCxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBaUIxQixZQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQWhCbkMsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWxCLFlBQU8sR0FBYSxFQUFFLENBQUM7UUFDdkIsWUFBTyxHQUFhLEVBQUUsQ0FBQztRQUN2QixXQUFNLEdBQVUsRUFBRSxDQUFDO1FBR2xCLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQVMsQ0FBQztRQUMxQyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUU3QyxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUVwQixVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsWUFBTyxHQUFHLHFCQUFxQixFQUFFLEVBQUUsRUFBRSxDQUFDO0lBRVMsQ0FBQztJQUVoRCxRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUNoQyxDQUFDO0lBQ0QsZUFBZTtRQUNiLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNyQztJQUNILENBQUM7SUFDRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBQ0QsY0FBYyxDQUFDLE1BQWE7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQixNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUNELFlBQVksQ0FBQyxLQUFhO1FBQ3hCLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtZQUNoQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1NBQzFCO2FBQU07WUFDTCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1NBQ3pCO1FBQ0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQ3BDLElBQUksQ0FBQyxLQUFLLEVBQ1YsSUFBSSxDQUFDLGtCQUFrQixFQUN2QixJQUFJLENBQUMsVUFBVSxFQUNmLElBQUksQ0FBQyxPQUFPLEVBQ1osSUFBSSxDQUFDLE9BQU8sRUFDWixJQUFJLENBQUMsTUFBTSxDQUNaLENBQUM7UUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBQ0QsWUFBWTtRQUNWLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Q0FDRixDQUFBOztZQTNDa0MsV0FBVzs7QUFoQm5DO0lBQVIsS0FBSyxFQUFFO21EQUFpQjtBQUNoQjtJQUFSLEtBQUssRUFBRTtrREFBbUI7QUFDbEI7SUFBUixLQUFLLEVBQUU7NkNBQVc7QUFDVjtJQUFSLEtBQUssRUFBRTtnREFBd0I7QUFDdkI7SUFBUixLQUFLLEVBQUU7Z0RBQXdCO0FBQ3ZCO0lBQVIsS0FBSyxFQUFFOytDQUFvQjtBQUNuQjtJQUFSLEtBQUssRUFBRTs4Q0FBbUM7QUFDbEM7SUFBUixLQUFLLEVBQUU7MkRBQTBDO0FBQ3hDO0lBQVQsTUFBTSxFQUFFO3NEQUEyQztBQUMxQztJQUFULE1BQU0sRUFBRTtpREFBb0M7QUFDSjtJQUF4QyxTQUFTLENBQUMsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO2lEQUErQjtBQVg1RCxlQUFlO0lBM0MzQixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsY0FBYztRQUN4QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0NUO1FBQ0QsbUJBQW1CLEVBQUUsS0FBSztLQUMzQixDQUFDO0dBQ1csZUFBZSxDQTREM0I7U0E1RFksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEVtb2ppU2VhcmNoIH0gZnJvbSAnLi9lbW9qaS1zZWFyY2guc2VydmljZSc7XG5cbmxldCBpZCA9IDA7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Vtb2ppLXNlYXJjaCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImVtb2ppLW1hcnQtc2VhcmNoXCI+XG4gICAgICA8aW5wdXRcbiAgICAgICAgW2lkXT1cImlucHV0SWRcIlxuICAgICAgICAjaW5wdXRSZWZcbiAgICAgICAgdHlwZT1cInNlYXJjaFwiXG4gICAgICAgIChrZXl1cC5lbnRlcik9XCJoYW5kbGVFbnRlcktleSgkZXZlbnQpXCJcbiAgICAgICAgW3BsYWNlaG9sZGVyXT1cImkxOG4uc2VhcmNoXCJcbiAgICAgICAgW2F1dG9mb2N1c109XCJhdXRvRm9jdXNcIlxuICAgICAgICBbKG5nTW9kZWwpXT1cInF1ZXJ5XCJcbiAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwiaGFuZGxlQ2hhbmdlKClcIlxuICAgICAgLz5cbiAgICAgIDwhLS1cbiAgICAgIFVzZSBhIDxsYWJlbD4gaW4gYWRkaXRpb24gdG8gdGhlIHBsYWNlaG9sZGVyIGZvciBhY2Nlc3NpYmlsaXR5LCBidXQgcGxhY2UgaXQgb2ZmLXNjcmVlblxuICAgICAgaHR0cDovL3d3dy5tYXhhYmlsaXR5LmNvLmluLzIwMTYvMDEvcGxhY2Vob2xkZXItYXR0cmlidXRlLWFuZC13aHktaXQtaXMtbm90LWFjY2Vzc2libGUvXG4gICAgICAtLT5cbiAgICAgIDxsYWJlbCBjbGFzcz1cImVtb2ppLW1hcnQtc3Itb25seVwiIFtodG1sRm9yXT1cImlucHV0SWRcIj5cbiAgICAgICAge3sgaTE4bi5zZWFyY2ggfX1cbiAgICAgIDwvbGFiZWw+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBjbGFzcz1cImVtb2ppLW1hcnQtc2VhcmNoLWljb25cIlxuICAgICAgICAoY2xpY2spPVwiY2xlYXIoKVwiXG4gICAgICAgIChrZXl1cC5lbnRlcik9XCJjbGVhcigpXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cIiFpc1NlYXJjaGluZ1wiXG4gICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiaTE4bi5jbGVhclwiXG4gICAgICA+XG4gICAgICAgIDxzdmdcbiAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgICAgICB2aWV3Qm94PVwiMCAwIDIwIDIwXCJcbiAgICAgICAgICB3aWR0aD1cIjEzXCJcbiAgICAgICAgICBoZWlnaHQ9XCIxM1wiXG4gICAgICAgICAgb3BhY2l0eT1cIjAuNVwiXG4gICAgICAgID5cbiAgICAgICAgICA8cGF0aCBbYXR0ci5kXT1cImljb25cIiAvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICBgLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0IHtcbiAgQElucHV0KCkgbWF4UmVzdWx0cyA9IDc1O1xuICBASW5wdXQoKSBhdXRvRm9jdXMgPSBmYWxzZTtcbiAgQElucHV0KCkgaTE4bjogYW55O1xuICBASW5wdXQoKSBpbmNsdWRlOiBzdHJpbmdbXSA9IFtdO1xuICBASW5wdXQoKSBleGNsdWRlOiBzdHJpbmdbXSA9IFtdO1xuICBASW5wdXQoKSBjdXN0b206IGFueVtdID0gW107XG4gIEBJbnB1dCgpIGljb25zPzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcbiAgQElucHV0KCkgZW1vamlzVG9TaG93RmlsdGVyPzogKHg6IGFueSkgPT4gYm9vbGVhbjtcbiAgQE91dHB1dCgpIHNlYXJjaFJlc3VsdHMgPSBuZXcgRXZlbnRFbWl0dGVyPGFueVtdPigpO1xuICBAT3V0cHV0KCkgZW50ZXJLZXkgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQFZpZXdDaGlsZCgnaW5wdXRSZWYnLCB7IHN0YXRpYzogdHJ1ZSB9KSBwcml2YXRlIGlucHV0UmVmITogRWxlbWVudFJlZjtcbiAgaXNTZWFyY2hpbmcgPSBmYWxzZTtcbiAgaWNvbj86IHN0cmluZztcbiAgcXVlcnkgPSAnJztcbiAgaW5wdXRJZCA9IGBlbW9qaS1tYXJ0LXNlYXJjaC0keysraWR9YDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVtb2ppU2VhcmNoOiBFbW9qaVNlYXJjaCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmljb24gPSB0aGlzLmljb25zLnNlYXJjaDtcbiAgfVxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKHRoaXMuYXV0b0ZvY3VzKSB7XG4gICAgICB0aGlzLmlucHV0UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gIH1cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5xdWVyeSA9ICcnO1xuICAgIHRoaXMuaGFuZGxlU2VhcmNoKCcnKTtcbiAgICB0aGlzLmlucHV0UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuICBoYW5kbGVFbnRlcktleSgkZXZlbnQ6IEV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLnF1ZXJ5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZW50ZXJLZXkuZW1pdCgkZXZlbnQpO1xuICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG4gIGhhbmRsZVNlYXJjaCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHZhbHVlID09PSAnJykge1xuICAgICAgdGhpcy5pY29uID0gdGhpcy5pY29ucy5zZWFyY2g7XG4gICAgICB0aGlzLmlzU2VhcmNoaW5nID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaWNvbiA9IHRoaXMuaWNvbnMuZGVsZXRlO1xuICAgICAgdGhpcy5pc1NlYXJjaGluZyA9IHRydWU7XG4gICAgfVxuICAgIGNvbnN0IGVtb2ppcyA9IHRoaXMuZW1vamlTZWFyY2guc2VhcmNoKFxuICAgICAgdGhpcy5xdWVyeSxcbiAgICAgIHRoaXMuZW1vamlzVG9TaG93RmlsdGVyLFxuICAgICAgdGhpcy5tYXhSZXN1bHRzLFxuICAgICAgdGhpcy5pbmNsdWRlLFxuICAgICAgdGhpcy5leGNsdWRlLFxuICAgICAgdGhpcy5jdXN0b20sXG4gICAgKTtcbiAgICB0aGlzLnNlYXJjaFJlc3VsdHMuZW1pdChlbW9qaXMpO1xuICB9XG4gIGhhbmRsZUNoYW5nZSgpIHtcbiAgICB0aGlzLmhhbmRsZVNlYXJjaCh0aGlzLnF1ZXJ5KTtcbiAgfVxufVxuIl19