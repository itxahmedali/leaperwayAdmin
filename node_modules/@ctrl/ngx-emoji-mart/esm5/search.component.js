import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { EmojiSearch } from './emoji-search.service';
var id = 0;
var SearchComponent = /** @class */ (function () {
    function SearchComponent(emojiSearch) {
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
        this.inputId = "emoji-mart-search-" + ++id;
    }
    SearchComponent.prototype.ngOnInit = function () {
        this.icon = this.icons.search;
    };
    SearchComponent.prototype.ngAfterViewInit = function () {
        if (this.autoFocus) {
            this.inputRef.nativeElement.focus();
        }
    };
    SearchComponent.prototype.clear = function () {
        this.query = '';
        this.handleSearch('');
        this.inputRef.nativeElement.focus();
    };
    SearchComponent.prototype.handleEnterKey = function ($event) {
        if (!this.query) {
            return;
        }
        this.enterKey.emit($event);
        $event.preventDefault();
    };
    SearchComponent.prototype.handleSearch = function (value) {
        if (value === '') {
            this.icon = this.icons.search;
            this.isSearching = false;
        }
        else {
            this.icon = this.icons.delete;
            this.isSearching = true;
        }
        var emojis = this.emojiSearch.search(this.query, this.emojisToShowFilter, this.maxResults, this.include, this.exclude, this.custom);
        this.searchResults.emit(emojis);
    };
    SearchComponent.prototype.handleChange = function () {
        this.handleSearch(this.query);
    };
    SearchComponent.ctorParameters = function () { return [
        { type: EmojiSearch }
    ]; };
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
            template: "\n    <div class=\"emoji-mart-search\">\n      <input\n        [id]=\"inputId\"\n        #inputRef\n        type=\"search\"\n        (keyup.enter)=\"handleEnterKey($event)\"\n        [placeholder]=\"i18n.search\"\n        [autofocus]=\"autoFocus\"\n        [(ngModel)]=\"query\"\n        (ngModelChange)=\"handleChange()\"\n      />\n      <!--\n      Use a <label> in addition to the placeholder for accessibility, but place it off-screen\n      http://www.maxability.co.in/2016/01/placeholder-attribute-and-why-it-is-not-accessible/\n      -->\n      <label class=\"emoji-mart-sr-only\" [htmlFor]=\"inputId\">\n        {{ i18n.search }}\n      </label>\n      <button\n        type=\"button\"\n        class=\"emoji-mart-search-icon\"\n        (click)=\"clear()\"\n        (keyup.enter)=\"clear()\"\n        [disabled]=\"!isSearching\"\n        [attr.aria-label]=\"i18n.clear\"\n      >\n        <svg\n          xmlns=\"http://www.w3.org/2000/svg\"\n          viewBox=\"0 0 20 20\"\n          width=\"13\"\n          height=\"13\"\n          opacity=\"0.5\"\n        >\n          <path [attr.d]=\"icon\" />\n        </svg>\n      </button>\n    </div>\n  ",
            preserveWhitespaces: false
        })
    ], SearchComponent);
    return SearchComponent;
}());
export { SearchComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjdHJsL25neC1lbW9qaS1tYXJ0LyIsInNvdXJjZXMiOlsic2VhcmNoLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUVMLFNBQVMsRUFFVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXJELElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztBQTZDWDtJQWlCRSx5QkFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFoQm5DLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVsQixZQUFPLEdBQWEsRUFBRSxDQUFDO1FBQ3ZCLFlBQU8sR0FBYSxFQUFFLENBQUM7UUFDdkIsV0FBTSxHQUFVLEVBQUUsQ0FBQztRQUdsQixrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFTLENBQUM7UUFDMUMsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFFN0MsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFFcEIsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUNYLFlBQU8sR0FBRyx1QkFBcUIsRUFBRSxFQUFJLENBQUM7SUFFUyxDQUFDO0lBRWhELGtDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQ2hDLENBQUM7SUFDRCx5Q0FBZSxHQUFmO1FBQ0UsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQztJQUNELCtCQUFLLEdBQUw7UUFDRSxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFDRCx3Q0FBYyxHQUFkLFVBQWUsTUFBYTtRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNmLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBQ0Qsc0NBQVksR0FBWixVQUFhLEtBQWE7UUFDeEIsSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDMUI7YUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7U0FDekI7UUFDRCxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FDcEMsSUFBSSxDQUFDLEtBQUssRUFDVixJQUFJLENBQUMsa0JBQWtCLEVBQ3ZCLElBQUksQ0FBQyxVQUFVLEVBQ2YsSUFBSSxDQUFDLE9BQU8sRUFDWixJQUFJLENBQUMsT0FBTyxFQUNaLElBQUksQ0FBQyxNQUFNLENBQ1osQ0FBQztRQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDRCxzQ0FBWSxHQUFaO1FBQ0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7Z0JBMUNnQyxXQUFXOztJQWhCbkM7UUFBUixLQUFLLEVBQUU7dURBQWlCO0lBQ2hCO1FBQVIsS0FBSyxFQUFFO3NEQUFtQjtJQUNsQjtRQUFSLEtBQUssRUFBRTtpREFBVztJQUNWO1FBQVIsS0FBSyxFQUFFO29EQUF3QjtJQUN2QjtRQUFSLEtBQUssRUFBRTtvREFBd0I7SUFDdkI7UUFBUixLQUFLLEVBQUU7bURBQW9CO0lBQ25CO1FBQVIsS0FBSyxFQUFFO2tEQUFtQztJQUNsQztRQUFSLEtBQUssRUFBRTsrREFBMEM7SUFDeEM7UUFBVCxNQUFNLEVBQUU7MERBQTJDO0lBQzFDO1FBQVQsTUFBTSxFQUFFO3FEQUFvQztJQUNKO1FBQXhDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7cURBQStCO0lBWDVELGVBQWU7UUEzQzNCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFFBQVEsRUFBRSx1b0NBc0NUO1lBQ0QsbUJBQW1CLEVBQUUsS0FBSztTQUMzQixDQUFDO09BQ1csZUFBZSxDQTREM0I7SUFBRCxzQkFBQztDQUFBLEFBNURELElBNERDO1NBNURZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBFbW9qaVNlYXJjaCB9IGZyb20gJy4vZW1vamktc2VhcmNoLnNlcnZpY2UnO1xuXG5sZXQgaWQgPSAwO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdlbW9qaS1zZWFyY2gnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJlbW9qaS1tYXJ0LXNlYXJjaFwiPlxuICAgICAgPGlucHV0XG4gICAgICAgIFtpZF09XCJpbnB1dElkXCJcbiAgICAgICAgI2lucHV0UmVmXG4gICAgICAgIHR5cGU9XCJzZWFyY2hcIlxuICAgICAgICAoa2V5dXAuZW50ZXIpPVwiaGFuZGxlRW50ZXJLZXkoJGV2ZW50KVwiXG4gICAgICAgIFtwbGFjZWhvbGRlcl09XCJpMThuLnNlYXJjaFwiXG4gICAgICAgIFthdXRvZm9jdXNdPVwiYXV0b0ZvY3VzXCJcbiAgICAgICAgWyhuZ01vZGVsKV09XCJxdWVyeVwiXG4gICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cImhhbmRsZUNoYW5nZSgpXCJcbiAgICAgIC8+XG4gICAgICA8IS0tXG4gICAgICBVc2UgYSA8bGFiZWw+IGluIGFkZGl0aW9uIHRvIHRoZSBwbGFjZWhvbGRlciBmb3IgYWNjZXNzaWJpbGl0eSwgYnV0IHBsYWNlIGl0IG9mZi1zY3JlZW5cbiAgICAgIGh0dHA6Ly93d3cubWF4YWJpbGl0eS5jby5pbi8yMDE2LzAxL3BsYWNlaG9sZGVyLWF0dHJpYnV0ZS1hbmQtd2h5LWl0LWlzLW5vdC1hY2Nlc3NpYmxlL1xuICAgICAgLS0+XG4gICAgICA8bGFiZWwgY2xhc3M9XCJlbW9qaS1tYXJ0LXNyLW9ubHlcIiBbaHRtbEZvcl09XCJpbnB1dElkXCI+XG4gICAgICAgIHt7IGkxOG4uc2VhcmNoIH19XG4gICAgICA8L2xhYmVsPlxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgY2xhc3M9XCJlbW9qaS1tYXJ0LXNlYXJjaC1pY29uXCJcbiAgICAgICAgKGNsaWNrKT1cImNsZWFyKClcIlxuICAgICAgICAoa2V5dXAuZW50ZXIpPVwiY2xlYXIoKVwiXG4gICAgICAgIFtkaXNhYmxlZF09XCIhaXNTZWFyY2hpbmdcIlxuICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImkxOG4uY2xlYXJcIlxuICAgICAgPlxuICAgICAgICA8c3ZnXG4gICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICAgICAgdmlld0JveD1cIjAgMCAyMCAyMFwiXG4gICAgICAgICAgd2lkdGg9XCIxM1wiXG4gICAgICAgICAgaGVpZ2h0PVwiMTNcIlxuICAgICAgICAgIG9wYWNpdHk9XCIwLjVcIlxuICAgICAgICA+XG4gICAgICAgICAgPHBhdGggW2F0dHIuZF09XCJpY29uXCIgLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uSW5pdCB7XG4gIEBJbnB1dCgpIG1heFJlc3VsdHMgPSA3NTtcbiAgQElucHV0KCkgYXV0b0ZvY3VzID0gZmFsc2U7XG4gIEBJbnB1dCgpIGkxOG46IGFueTtcbiAgQElucHV0KCkgaW5jbHVkZTogc3RyaW5nW10gPSBbXTtcbiAgQElucHV0KCkgZXhjbHVkZTogc3RyaW5nW10gPSBbXTtcbiAgQElucHV0KCkgY3VzdG9tOiBhbnlbXSA9IFtdO1xuICBASW5wdXQoKSBpY29ucz86IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XG4gIEBJbnB1dCgpIGVtb2ppc1RvU2hvd0ZpbHRlcj86ICh4OiBhbnkpID0+IGJvb2xlYW47XG4gIEBPdXRwdXQoKSBzZWFyY2hSZXN1bHRzID0gbmV3IEV2ZW50RW1pdHRlcjxhbnlbXT4oKTtcbiAgQE91dHB1dCgpIGVudGVyS2V5ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBWaWV3Q2hpbGQoJ2lucHV0UmVmJywgeyBzdGF0aWM6IHRydWUgfSkgcHJpdmF0ZSBpbnB1dFJlZiE6IEVsZW1lbnRSZWY7XG4gIGlzU2VhcmNoaW5nID0gZmFsc2U7XG4gIGljb24/OiBzdHJpbmc7XG4gIHF1ZXJ5ID0gJyc7XG4gIGlucHV0SWQgPSBgZW1vamktbWFydC1zZWFyY2gtJHsrK2lkfWA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbW9qaVNlYXJjaDogRW1vamlTZWFyY2gpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pY29uID0gdGhpcy5pY29ucy5zZWFyY2g7XG4gIH1cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmICh0aGlzLmF1dG9Gb2N1cykge1xuICAgICAgdGhpcy5pbnB1dFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICB9XG4gIGNsZWFyKCkge1xuICAgIHRoaXMucXVlcnkgPSAnJztcbiAgICB0aGlzLmhhbmRsZVNlYXJjaCgnJyk7XG4gICAgdGhpcy5pbnB1dFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cbiAgaGFuZGxlRW50ZXJLZXkoJGV2ZW50OiBFdmVudCkge1xuICAgIGlmICghdGhpcy5xdWVyeSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmVudGVyS2V5LmVtaXQoJGV2ZW50KTtcbiAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuICBoYW5kbGVTZWFyY2godmFsdWU6IHN0cmluZykge1xuICAgIGlmICh2YWx1ZSA9PT0gJycpIHtcbiAgICAgIHRoaXMuaWNvbiA9IHRoaXMuaWNvbnMuc2VhcmNoO1xuICAgICAgdGhpcy5pc1NlYXJjaGluZyA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmljb24gPSB0aGlzLmljb25zLmRlbGV0ZTtcbiAgICAgIHRoaXMuaXNTZWFyY2hpbmcgPSB0cnVlO1xuICAgIH1cbiAgICBjb25zdCBlbW9qaXMgPSB0aGlzLmVtb2ppU2VhcmNoLnNlYXJjaChcbiAgICAgIHRoaXMucXVlcnksXG4gICAgICB0aGlzLmVtb2ppc1RvU2hvd0ZpbHRlcixcbiAgICAgIHRoaXMubWF4UmVzdWx0cyxcbiAgICAgIHRoaXMuaW5jbHVkZSxcbiAgICAgIHRoaXMuZXhjbHVkZSxcbiAgICAgIHRoaXMuY3VzdG9tLFxuICAgICk7XG4gICAgdGhpcy5zZWFyY2hSZXN1bHRzLmVtaXQoZW1vamlzKTtcbiAgfVxuICBoYW5kbGVDaGFuZ2UoKSB7XG4gICAgdGhpcy5oYW5kbGVTZWFyY2godGhpcy5xdWVyeSk7XG4gIH1cbn1cbiJdfQ==