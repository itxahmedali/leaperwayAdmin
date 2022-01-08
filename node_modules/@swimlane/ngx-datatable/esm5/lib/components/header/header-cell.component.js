import { __decorate, __values } from "tslib";
import { Component, Input, EventEmitter, Output, HostBinding, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SelectionType } from '../../types/selection.type';
import { nextSortDir } from '../../utils/sort';
import { SortDirection } from '../../types/sort-direction.type';
var DataTableHeaderCellComponent = /** @class */ (function () {
    function DataTableHeaderCellComponent(cd) {
        this.cd = cd;
        this.sort = new EventEmitter();
        this.select = new EventEmitter();
        this.columnContextmenu = new EventEmitter(false);
        this.sortFn = this.onSort.bind(this);
        this.selectFn = this.select.emit.bind(this.select);
        this.cellContext = {
            column: this.column,
            sortDir: this.sortDir,
            sortFn: this.sortFn,
            allRowsSelected: this.allRowsSelected,
            selectFn: this.selectFn
        };
    }
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "allRowsSelected", {
        get: function () {
            return this._allRowsSelected;
        },
        set: function (value) {
            this._allRowsSelected = value;
            this.cellContext.allRowsSelected = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "column", {
        get: function () {
            return this._column;
        },
        set: function (column) {
            this._column = column;
            this.cellContext.column = column;
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "sorts", {
        get: function () {
            return this._sorts;
        },
        set: function (val) {
            this._sorts = val;
            this.sortDir = this.calcSortDir(val);
            this.cellContext.sortDir = this.sortDir;
            this.sortClass = this.calcSortClass(this.sortDir);
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "columnCssClasses", {
        get: function () {
            var e_1, _a;
            var cls = 'datatable-header-cell';
            if (this.column.sortable)
                cls += ' sortable';
            if (this.column.resizeable)
                cls += ' resizeable';
            if (this.column.headerClass) {
                if (typeof this.column.headerClass === 'string') {
                    cls += ' ' + this.column.headerClass;
                }
                else if (typeof this.column.headerClass === 'function') {
                    var res = this.column.headerClass({
                        column: this.column
                    });
                    if (typeof res === 'string') {
                        cls += res;
                    }
                    else if (typeof res === 'object') {
                        var keys = Object.keys(res);
                        try {
                            for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                                var k = keys_1_1.value;
                                if (res[k] === true)
                                    cls += " " + k;
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                }
            }
            var sortDir = this.sortDir;
            if (sortDir) {
                cls += " sort-active sort-" + sortDir;
            }
            return cls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "name", {
        get: function () {
            // guaranteed to have a value by setColumnDefaults() in column-helper.ts
            return this.column.headerTemplate === undefined ? this.column.name : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "minWidth", {
        get: function () {
            return this.column.minWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "maxWidth", {
        get: function () {
            return this.column.maxWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "width", {
        get: function () {
            return this.column.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "isCheckboxable", {
        get: function () {
            return this.column.checkboxable && this.column.headerCheckboxable && this.selectionType === SelectionType.checkbox;
        },
        enumerable: true,
        configurable: true
    });
    DataTableHeaderCellComponent.prototype.onContextmenu = function ($event) {
        this.columnContextmenu.emit({ event: $event, column: this.column });
    };
    DataTableHeaderCellComponent.prototype.ngOnInit = function () {
        this.sortClass = this.calcSortClass(this.sortDir);
    };
    DataTableHeaderCellComponent.prototype.calcSortDir = function (sorts) {
        var _this = this;
        if (sorts && this.column) {
            var sort = sorts.find(function (s) {
                return s.prop === _this.column.prop;
            });
            if (sort)
                return sort.dir;
        }
    };
    DataTableHeaderCellComponent.prototype.onSort = function () {
        if (!this.column.sortable)
            return;
        var newValue = nextSortDir(this.sortType, this.sortDir);
        this.sort.emit({
            column: this.column,
            prevValue: this.sortDir,
            newValue: newValue
        });
    };
    DataTableHeaderCellComponent.prototype.calcSortClass = function (sortDir) {
        if (!this.cellContext.column.sortable)
            return;
        if (sortDir === SortDirection.asc) {
            return "sort-btn sort-asc " + this.sortAscendingIcon;
        }
        else if (sortDir === SortDirection.desc) {
            return "sort-btn sort-desc " + this.sortDescendingIcon;
        }
        else {
            return "sort-btn " + this.sortUnsetIcon;
        }
    };
    DataTableHeaderCellComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], DataTableHeaderCellComponent.prototype, "sortType", void 0);
    __decorate([
        Input()
    ], DataTableHeaderCellComponent.prototype, "sortAscendingIcon", void 0);
    __decorate([
        Input()
    ], DataTableHeaderCellComponent.prototype, "sortDescendingIcon", void 0);
    __decorate([
        Input()
    ], DataTableHeaderCellComponent.prototype, "sortUnsetIcon", void 0);
    __decorate([
        Input()
    ], DataTableHeaderCellComponent.prototype, "isTarget", void 0);
    __decorate([
        Input()
    ], DataTableHeaderCellComponent.prototype, "targetMarkerTemplate", void 0);
    __decorate([
        Input()
    ], DataTableHeaderCellComponent.prototype, "targetMarkerContext", void 0);
    __decorate([
        Input()
    ], DataTableHeaderCellComponent.prototype, "allRowsSelected", null);
    __decorate([
        Input()
    ], DataTableHeaderCellComponent.prototype, "selectionType", void 0);
    __decorate([
        Input()
    ], DataTableHeaderCellComponent.prototype, "column", null);
    __decorate([
        HostBinding('style.height.px'),
        Input()
    ], DataTableHeaderCellComponent.prototype, "headerHeight", void 0);
    __decorate([
        Input()
    ], DataTableHeaderCellComponent.prototype, "sorts", null);
    __decorate([
        Output()
    ], DataTableHeaderCellComponent.prototype, "sort", void 0);
    __decorate([
        Output()
    ], DataTableHeaderCellComponent.prototype, "select", void 0);
    __decorate([
        Output()
    ], DataTableHeaderCellComponent.prototype, "columnContextmenu", void 0);
    __decorate([
        HostBinding('class')
    ], DataTableHeaderCellComponent.prototype, "columnCssClasses", null);
    __decorate([
        HostBinding('attr.title')
    ], DataTableHeaderCellComponent.prototype, "name", null);
    __decorate([
        HostBinding('style.minWidth.px')
    ], DataTableHeaderCellComponent.prototype, "minWidth", null);
    __decorate([
        HostBinding('style.maxWidth.px')
    ], DataTableHeaderCellComponent.prototype, "maxWidth", null);
    __decorate([
        HostBinding('style.width.px')
    ], DataTableHeaderCellComponent.prototype, "width", null);
    __decorate([
        HostListener('contextmenu', ['$event'])
    ], DataTableHeaderCellComponent.prototype, "onContextmenu", null);
    DataTableHeaderCellComponent = __decorate([
        Component({
            selector: 'datatable-header-cell',
            template: "\n    <div class=\"datatable-header-cell-template-wrap\">\n      <ng-template\n        *ngIf=\"isTarget\"\n        [ngTemplateOutlet]=\"targetMarkerTemplate\"\n        [ngTemplateOutletContext]=\"targetMarkerContext\"\n      >\n      </ng-template>\n      <label *ngIf=\"isCheckboxable\" class=\"datatable-checkbox\">\n        <input type=\"checkbox\" [checked]=\"allRowsSelected\" (change)=\"select.emit(!allRowsSelected)\" />\n      </label>\n      <span *ngIf=\"!column.headerTemplate\" class=\"datatable-header-cell-wrapper\">\n        <span class=\"datatable-header-cell-label draggable\" (click)=\"onSort()\" [innerHTML]=\"name\"> </span>\n      </span>\n      <ng-template\n        *ngIf=\"column.headerTemplate\"\n        [ngTemplateOutlet]=\"column.headerTemplate\"\n        [ngTemplateOutletContext]=\"cellContext\"\n      >\n      </ng-template>\n      <span (click)=\"onSort()\" [class]=\"sortClass\"> </span>\n    </div>\n  ",
            host: {
                class: 'datatable-header-cell'
            },
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], DataTableHeaderCellComponent);
    return DataTableHeaderCellComponent;
}());
export { DataTableHeaderCellComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWNlbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHN3aW1sYW5lL25neC1kYXRhdGFibGUvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLWNlbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxZQUFZLEVBQ1osTUFBTSxFQUNOLFdBQVcsRUFDWCxZQUFZLEVBQ1osdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFM0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQWdDaEU7SUE4SEUsc0NBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBOUUvQixTQUFJLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDN0MsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQy9DLHNCQUFpQixHQUFHLElBQUksWUFBWSxDQUFxQyxLQUFLLENBQUMsQ0FBQztRQTREMUYsV0FBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBR2hDLGFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTlDLGdCQUFXLEdBQVE7WUFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO1lBQ3JDLFFBQVEsRUFBRSxJ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RUFBbUI7SUFDbEI7UUFBUixLQUFLLEVBQUU7OEVBQTJCO0lBQzFCO1FBQVIsS0FBSyxFQUFFOzZFQUEwQjtJQUl6QjtRQUFSLEtBQUssRUFBRTt1RUFHUDtJQUtRO1FBQVIsS0FBSyxFQUFFO3VFQUE4QjtJQUU3QjtRQUFSLEtBQUssRUFBRTs4REFJUDtJQVFEO1FBRkMsV0FBVyxDQUFDLGlCQUFpQixDQUFDO1FBQzlCLEtBQUssRUFBRTtzRUFDYTtJQUVaO1FBQVIsS0FBSyxFQUFFOzZEQU1QO0lBTVM7UUFBVCxNQUFNLEVBQUU7OERBQThDO0lBQzdDO1FBQVQsTUFBTSxFQUFFO2dFQUFnRDtJQUMvQztRQUFULE1BQU0sRUFBRTsyRUFBaUY7SUFHMUY7UUFEQyxXQUFXLENBQUMsT0FBTyxDQUFDO3dFQStCcEI7SUFHRDtRQURDLFdBQVcsQ0FBQyxZQUFZLENBQUM7NERBSXpCO0lBR0Q7UUFEQyxXQUFXLENBQUMsbUJBQW1CLENBQUM7Z0VBR2hDO0lBR0Q7UUFEQyxXQUFXLENBQUMsbUJBQW1CLENBQUM7Z0VBR2hDO0lBR0Q7UUFEQyxXQUFXLENBQUMsZ0JBQWdCLENBQUM7NkRBRzdCO0lBeUJEO1FBREMsWUFBWSxDQUFDLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3FFQUd2QztJQW5JVSw0QkFBNEI7UUE5QnhDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSx1QkFBdUI7WUFDakMsUUFBUSxFQUFFLDI2QkFzQlQ7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osS0FBSyxFQUFFLHVCQUF1QjthQUMvQjtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7T0FDVyw0QkFBNEIsQ0F3S3hDO0lBQUQsbUNBQUM7Q0FBQSxBQXhLRCxJQXdLQztTQXhLWSw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE91dHB1dCxcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU29ydFR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9zb3J0LnR5cGUnO1xuaW1wb3J0IHsgU2VsZWN0aW9uVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL3NlbGVjdGlvbi50eXBlJztcbmltcG9ydCB7IFRhYmxlQ29sdW1uIH0gZnJvbSAnLi4vLi4vdHlwZXMvdGFibGUtY29sdW1uLnR5cGUnO1xuaW1wb3J0IHsgbmV4dFNvcnREaXIgfSBmcm9tICcuLi8uLi91dGlscy9zb3J0JztcbmltcG9ydCB7IFNvcnREaXJlY3Rpb24gfSBmcm9tICcuLi8uLi90eXBlcy9zb3J0LWRpcmVjdGlvbi50eXBlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGF0YXRhYmxlLWhlYWRlci1jZWxsJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiZGF0YXRhYmxlLWhlYWRlci1jZWxsLXRlbXBsYXRlLXdyYXBcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgICAqbmdJZj1cImlzVGFyZ2V0XCJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwidGFyZ2V0TWFya2VyVGVtcGxhdGVcIlxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwidGFyZ2V0TWFya2VyQ29udGV4dFwiXG4gICAgICA+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPGxhYmVsICpuZ0lmPVwiaXNDaGVja2JveGFibGVcIiBjbGFzcz1cImRhdGF0YWJsZS1jaGVja2JveFwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgW2NoZWNrZWRdPVwiYWxsUm93c1NlbGVjdGVkXCIgKGNoYW5nZSk9XCJzZWxlY3QuZW1pdCghYWxsUm93c1NlbGVjdGVkKVwiIC8+XG4gICAgICA8L2xhYmVsPlxuICAgICAgPHNwYW4gKm5nSWY9XCIhY29sdW1uLmhlYWRlclRlbXBsYXRlXCIgY2xhc3M9XCJkYXRhdGFibGUtaGVhZGVyLWNlbGwtd3JhcHBlclwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGF0YWJsZS1oZWFkZXItY2VsbC1sYWJlbCBkcmFnZ2FibGVcIiAoY2xpY2spPVwib25Tb3J0KClcIiBbaW5uZXJIVE1MXT1cIm5hbWVcIj4gPC9zcGFuPlxuICAgICAgPC9zcGFuPlxuICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgICpuZ0lmPVwiY29sdW1uLmhlYWRlclRlbXBsYXRlXCJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29sdW1uLmhlYWRlclRlbXBsYXRlXCJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cImNlbGxDb250ZXh0XCJcbiAgICAgID5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8c3BhbiAoY2xpY2spPVwib25Tb3J0KClcIiBbY2xhc3NdPVwic29ydENsYXNzXCI+IDwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnZGF0YXRhYmxlLWhlYWRlci1jZWxsJ1xuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVIZWFkZXJDZWxsQ29tcG9uZW50IHtcbiAgQElucHV0KCkgc29ydFR5cGU6IFNvcnRUeXBlO1xuICBASW5wdXQoKSBzb3J0QXNjZW5kaW5nSWNvbjogc3RyaW5nO1xuICBASW5wdXQoKSBzb3J0RGVzY2VuZGluZ0ljb246IHN0cmluZztcbiAgQElucHV0KCkgc29ydFVuc2V0SWNvbjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIGlzVGFyZ2V0OiBib29sZWFuO1xuICBASW5wdXQoKSB0YXJnZXRNYXJrZXJUZW1wbGF0ZTogYW55O1xuICBASW5wdXQoKSB0YXJnZXRNYXJrZXJDb250ZXh0OiBhbnk7XG5cbiAgX2FsbFJvd3NTZWxlY3RlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBzZXQgYWxsUm93c1NlbGVjdGVkKHZhbHVlKSB7XG4gICAgdGhpcy5fYWxsUm93c1NlbGVjdGVkID0gdmFsdWU7XG4gICAgdGhpcy5jZWxsQ29udGV4dC5hbGxSb3dzU2VsZWN0ZWQgPSB2YWx1ZTtcbiAgfVxuICBnZXQgYWxsUm93c1NlbGVjdGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9hbGxSb3dzU2VsZWN0ZWQ7XG4gIH1cblxuICBASW5wdXQoKSBzZWxlY3Rpb25UeXBlOiBTZWxlY3Rpb25UeXBlO1xuXG4gIEBJbnB1dCgpIHNldCBjb2x1bW4oY29sdW1uOiBUYWJsZUNvbHVtbikge1xuICAgIHRoaXMuX2NvbHVtbiA9IGNvbHVtbjtcbiAgICB0aGlzLmNlbGxDb250ZXh0LmNvbHVtbiA9IGNvbHVtbjtcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0IGNvbHVtbigpOiBUYWJsZUNvbHVtbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbHVtbjtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0LnB4JylcbiAgQElucHV0KClcbiAgaGVhZGVySGVpZ2h0OiBudW1iZXI7XG5cbiAgQElucHV0KCkgc2V0IHNvcnRzKHZhbDogYW55W10pIHtcbiAgICB0aGlzLl9zb3J0cyA9IHZhbDtcbiAgICB0aGlzLnNvcnREaXIgPSB0aGlzLmNhbGNTb3J0RGlyKHZhbCk7XG4gICAgdGhpcy5jZWxsQ29udGV4dC5zb3J0RGlyID0gdGhpcy5zb3J0RGlyO1xuICAgIHRoaXMuc29ydENsYXNzID0gdGhpcy5jYWxjU29ydENsYXNzKHRoaXMuc29ydERpcik7XG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldCBzb3J0cygpOiBhbnlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3NvcnRzO1xuICB9XG5cbiAgQE91dHB1dCgpIHNvcnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgc2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGNvbHVtbkNvbnRleHRtZW51ID0gbmV3IEV2ZW50RW1pdHRlcjx7IGV2ZW50OiBNb3VzZUV2ZW50OyBjb2x1bW46IGFueSB9PihmYWxzZSk7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIGdldCBjb2x1bW5Dc3NDbGFzc2VzKCk6IGFueSB7XG4gICAgbGV0IGNscyA9ICdkYXRhdGFibGUtaGVhZGVyLWNlbGwnO1xuXG4gICAgaWYgKHRoaXMuY29sdW1uLnNvcnRhYmxlKSBjbHMgKz0gJyBzb3J0YWJsZSc7XG4gICAgaWYgKHRoaXMuY29sdW1uLnJlc2l6ZWFibGUpIGNscyArPSAnIHJlc2l6ZWFibGUnO1xuICAgIGlmICh0aGlzLmNvbHVtbi5oZWFkZXJDbGFzcykge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbHVtbi5oZWFkZXJDbGFzcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY2xzICs9ICcgJyArIHRoaXMuY29sdW1uLmhlYWRlckNsYXNzO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5jb2x1bW4uaGVhZGVyQ2xhc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc3QgcmVzID0gdGhpcy5jb2x1bW4uaGVhZGVyQ2xhc3Moe1xuICAgICAgICAgIGNvbHVtbjogdGhpcy5jb2x1bW5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiByZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY2xzICs9IHJlcztcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhyZXMpO1xuICAgICAgICAgIGZvciAoY29uc3QgayBvZiBrZXlzKSB7XG4gICAgICAgICAgICBpZiAocmVzW2tdID09PSB0cnVlKSBjbHMgKz0gYCAke2t9YDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzb3J0RGlyID0gdGhpcy5zb3J0RGlyO1xuICAgIGlmIChzb3J0RGlyKSB7XG4gICAgICBjbHMgKz0gYCBzb3J0LWFjdGl2ZSBzb3J0LSR7c29ydERpcn1gO1xuICAgIH1cblxuICAgIHJldHVybiBjbHM7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIudGl0bGUnKVxuICBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIC8vIGd1YXJhbnRlZWQgdG8gaGF2ZSBhIHZhbHVlIGJ5IHNldENvbHVtbkRlZmF1bHRzKCkgaW4gY29sdW1uLWhlbHBlci50c1xuICAgIHJldHVybiB0aGlzLmNvbHVtbi5oZWFkZXJUZW1wbGF0ZSA9PT0gdW5kZWZpbmVkID8gdGhpcy5jb2x1bW4ubmFtZSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUubWluV2lkdGgucHgnKVxuICBnZXQgbWluV2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW4ubWluV2lkdGg7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1heFdpZHRoLnB4JylcbiAgZ2V0IG1heFdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uLm1heFdpZHRoO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aC5weCcpXG4gIGdldCB3aWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbi53aWR0aDtcbiAgfVxuXG4gIGdldCBpc0NoZWNrYm94YWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW4uY2hlY2tib3hhYmxlICYmIHRoaXMuY29sdW1uLmhlYWRlckNoZWNrYm94YWJsZSAmJiB0aGlzLnNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvblR5cGUuY2hlY2tib3g7XG4gIH1cblxuICBzb3J0Rm4gPSB0aGlzLm9uU29ydC5iaW5kKHRoaXMpO1xuICBzb3J0Q2xhc3M6IHN0cmluZztcbiAgc29ydERpcjogU29ydERpcmVjdGlvbjtcbiAgc2VsZWN0Rm4gPSB0aGlzLnNlbGVjdC5lbWl0LmJpbmQodGhpcy5zZWxlY3QpO1xuXG4gIGNlbGxDb250ZXh0OiBhbnkgPSB7XG4gICAgY29sdW1uOiB0aGlzLmNvbHVtbixcbiAgICBzb3J0RGlyOiB0aGlzLnNvcnREaXIsXG4gICAgc29ydEZuOiB0aGlzLnNvcnRGbixcbiAgICBhbGxSb3dzU2VsZWN0ZWQ6IHRoaXMuYWxsUm93c1NlbGVjdGVkLFxuICAgIHNlbGVjdEZuOiB0aGlzLnNlbGVjdEZuXG4gIH07XG5cbiAgcHJpdmF0ZSBfY29sdW1uOiBUYWJsZUNvbHVtbjtcbiAgcHJpdmF0ZSBfc29ydHM6IGFueVtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgWyckZXZlbnQnXSlcbiAgb25Db250ZXh0bWVudSgkZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLmNvbHVtbkNvbnRleHRtZW51LmVtaXQoeyBldmVudDogJGV2ZW50LCBjb2x1bW46IHRoaXMuY29sdW1uIH0pO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zb3J0Q2xhc3MgPSB0aGlzLmNhbGNTb3J0Q2xhc3ModGhpcy5zb3J0RGlyKTtcbiAgfVxuXG4gIGNhbGNTb3J0RGlyKHNvcnRzOiBhbnlbXSk6IGFueSB7XG4gICAgaWYgKHNvcnRzICYmIHRoaXMuY29sdW1uKSB7XG4gICAgICBjb25zdCBzb3J0ID0gc29ydHMuZmluZCgoczogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiBzLnByb3AgPT09IHRoaXMuY29sdW1uLnByb3A7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHNvcnQpIHJldHVybiBzb3J0LmRpcjtcbiAgICB9XG4gIH1cblxuICBvblNvcnQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNvbHVtbi5zb3J0YWJsZSkgcmV0dXJuO1xuXG4gICAgY29uc3QgbmV3VmFsdWUgPSBuZXh0U29ydERpcih0aGlzLnNvcnRUeXBlLCB0aGlzLnNvcnREaXIpO1xuICAgIHRoaXMuc29ydC5lbWl0KHtcbiAgICAgIGNvbHVtbjogdGhpcy5jb2x1bW4sXG4gICAgICBwcmV2VmFsdWU6IHRoaXMuc29ydERpcixcbiAgICAgIG5ld1ZhbHVlXG4gICAgfSk7XG4gIH1cblxuICBjYWxjU29ydENsYXNzKHNvcnREaXI6IFNvcnREaXJlY3Rpb24pOiBzdHJpbmcge1xuICAgIGlmICghdGhpcy5jZWxsQ29udGV4dC5jb2x1bW4uc29ydGFibGUpIHJldHVybjtcbiAgICBpZiAoc29ydERpciA9PT0gU29ydERpcmVjdGlvbi5hc2MpIHtcbiAgICAgIHJldHVybiBgc29ydC1idG4gc29ydC1hc2MgJHt0aGlzLnNvcnRBc2NlbmRpbmdJY29ufWA7XG4gICAgfSBlbHNlIGlmIChzb3J0RGlyID09PSBTb3J0RGlyZWN0aW9uLmRlc2MpIHtcbiAgICAgIHJldHVybiBgc29ydC1idG4gc29ydC1kZXNjICR7dGhpcy5zb3J0RGVzY2VuZGluZ0ljb259YDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGBzb3J0LWJ0biAke3RoaXMuc29ydFVuc2V0SWNvbn1gO1xuICAgIH1cbiAgfVxufVxuIl19