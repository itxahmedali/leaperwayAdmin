import { __decorate, __metadata } from "tslib";
import { Component, Input, Output, EventEmitter, TemplateRef, } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * Shows all events on a given day. Example usage:
 *
 * ```typescript
 * <mwl-calendar-day-view
 *  [viewDate]="viewDate"
 *  [events]="events">
 * </mwl-calendar-day-view>
 * ```
 */
let CalendarDayViewComponent = class CalendarDayViewComponent {
    constructor() {
        /**
         * An array of events to display on view
         * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
         */
        this.events = [];
        /**
         * The number of segments in an hour. Must divide equally into 60.
         */
        this.hourSegments = 2;
        /**
         * The height in pixels of each hour segment
         */
        this.hourSegmentHeight = 30;
        /**
         * The day start hours in 24 hour time. Must be 0-23
         */
        this.dayStartHour = 0;
        /**
         * The day start minutes. Must be 0-59
         */
        this.dayStartMinute = 0;
        /**
         * The day end hours in 24 hour time. Must be 0-23
         */
        this.dayEndHour = 23;
        /**
         * The day end minutes. Must be 0-59
         */
        this.dayEndMinute = 59;
        /**
         * The placement of the event tooltip
         */
        this.tooltipPlacement = 'auto';
        /**
         * Whether to append tooltips to the body or next to the trigger element
         */
        this.tooltipAppendToBody = true;
        /**
         * The delay in milliseconds before the tooltip should be displayed. If not provided the tooltip
         * will be displayed immediately.
         */
        this.tooltipDelay = null;
        /**
         * Whether to snap events to a grid when dragging
         */
        this.snapDraggedEvents = true;
        /**
         * Called when an event title is clicked
         */
        this.eventClicked = new EventEmitter();
        /**
         * Called when an hour segment is clicked
         */
        this.hourSegmentClicked = new EventEmitter();
        /**
         * Called when an event is resized or dragged and dropped
         */
        this.eventTimesChanged = new EventEmitter();
        /**
         * An output that will be called before the view is rendered for the current day.
         * If you add the `cssClass` property to an hour grid segment it will add that class to the hour segment in the template
         */
        this.beforeViewRender = new EventEmitter();
    }
};
__decorate([
    Input(),
    __metadata("design:type", Date)
], CalendarDayViewComponent.prototype, "viewDate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], CalendarDayViewComponent.prototype, "events", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], CalendarDayViewComponent.prototype, "hourSegments", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], CalendarDayViewComponent.prototype, "hourSegmentHeight", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], CalendarDayViewComponent.prototype, "dayStartHour", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], CalendarDayViewComponent.prototype, "dayStartMinute", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], CalendarDayViewComponent.prototype, "dayEndHour", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], CalendarDayViewComponent.prototype, "dayEndMinute", void 0);
__decorate([
    Input(),
    __metadata("design:type", Subject)
], CalendarDayViewComponent.prototype, "refresh", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], CalendarDayViewComponent.prototype, "locale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], CalendarDayViewComponent.prototype, "eventSnapSize", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CalendarDayViewComponent.prototype, "tooltipPlacement", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], CalendarDayViewComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], CalendarDayViewComponent.prototype, "tooltipAppendToBody", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], CalendarDayViewComponent.prototype, "tooltipDelay", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], CalendarDayViewComponent.prototype, "hourSegmentTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], CalendarDayViewComponent.prototype, "eventTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], CalendarDayViewComponent.prototype, "eventTitleTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], CalendarDayViewComponent.prototype, "eventActionsTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], CalendarDayViewComponent.prototype, "snapDraggedEvents", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], CalendarDayViewComponent.prototype, "allDayEventsLabelTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], CalendarDayViewComponent.prototype, "currentTimeMarkerTemplate", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CalendarDayViewComponent.prototype, "eventClicked", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CalendarDayViewComponent.prototype, "hourSegmentClicked", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CalendarDayViewComponent.prototype, "eventTimesChanged", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CalendarDayViewComponent.prototype, "beforeViewRender", void 0);
CalendarDayViewComponent = __decorate([
    Component({
        selector: 'mwl-calendar-day-view',
        template: `
    <mwl-calendar-week-view
      class="cal-day-view"
      [daysInWeek]="1"
      [viewDate]="viewDate"
      [events]="events"
      [hourSegments]="hourSegments"
      [hourSegmentHeight]="hourSegmentHeight"
      [dayStartHour]="dayStartHour"
      [dayStartMinute]="dayStartMinute"
      [dayEndHour]="dayEndHour"
      [dayEndMinute]="dayEndMinute"
      [refresh]="refresh"
      [locale]="locale"
      [eventSnapSize]="eventSnapSize"
      [tooltipPlacement]="tooltipPlacement"
      [tooltipTemplate]="tooltipTemplate"
      [tooltipAppendToBody]="tooltipAppendToBody"
      [tooltipDelay]="tooltipDelay"
      [hourSegmentTemplate]="hourSegmentTemplate"
      [eventTemplate]="eventTemplate"
      [eventTitleTemplate]="eventTitleTemplate"
      [eventActionsTemplate]="eventActionsTemplate"
      [snapDraggedEvents]="snapDraggedEvents"
      [allDayEventsLabelTemplate]="allDayEventsLabelTemplate"
      [currentTimeMarkerTemplate]="currentTimeMarkerTemplate"
      (eventClicked)="eventClicked.emit($event)"
      (hourSegmentClicked)="hourSegmentClicked.emit($event)"
      (eventTimesChanged)="eventTimesChanged.emit($event)"
      (beforeViewRender)="beforeViewRender.emit($event)"
    ></mwl-calendar-week-view>
  `
    })
], CalendarDayViewComponent);
export { CalendarDayViewComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZGF5LXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvZGF5L2NhbGVuZGFyLWRheS12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixXQUFXLEdBQ1osTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQVEvQjs7Ozs7Ozs7O0dBU0c7QUFvQ0gsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7SUFBckM7UUFNRTs7O1dBR0c7UUFDTSxXQUFNLEdBQW9CLEVBQUUsQ0FBQztRQUV0Qzs7V0FFRztRQUNNLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBRWxDOztXQUVHO1FBQ00sc0JBQWlCLEdBQVcsRUFBRSxDQUFDO1FBRXhDOztXQUVHO1FBQ00saUJBQVksR0FBVyxDQUFDLENBQUM7UUFFbEM7O1dBRUc7UUFDTSxtQkFBYyxHQUFXLENBQUMsQ0FBQztRQUVwQzs7V0FFRztRQUNNLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFFakM7O1dBRUc7UUFDTSxpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQWlCbkM7O1dBRUc7UUFDTSxxQkFBZ0IsR0FBbUIsTUFBTSxDQUFDO1FBT25EOztXQUVHO1FBQ00sd0JBQW1CLEdBQVksSUFBSSxDQUFDO1FBRTdDOzs7V0FHRztRQUNNLGlCQUFZLEdBQWtCLElBQUksQ0FBQztRQXNCNUM7O1dBRUc7UUFDTSxzQkFBaUIsR0FBWSxJQUFJLENBQUM7UUFZM0M7O1dBRUc7UUFDTyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUdyQyxDQUFDO1FBRUw7O1dBRUc7UUFDTyx1QkFBa0IsR0FBRyxJQUFJLFlBQVksRUFHM0MsQ0FBQztRQUVMOztXQUVHO1FBQ08sc0JBQWlCLEdBQ3pCLElBQUksWUFBWSxFQUFrQyxDQUFDO1FBRXJEOzs7V0FHRztRQUNPLHFCQUFnQixHQUN4QixJQUFJLFlBQVksRUFBb0MsQ0FBQztJQUN6RCxDQUFDO0NBQUEsQ0FBQTtBQXpJVTtJQUFSLEtBQUssRUFBRTs4QkFBVyxJQUFJOzBEQUFDO0FBTWY7SUFBUixLQUFLLEVBQUU7O3dEQUE4QjtBQUs3QjtJQUFSLEtBQUssRUFBRTs7OERBQTBCO0FBS3pCO0lBQVIsS0FBSyxFQUFFOzttRUFBZ0M7QUFLL0I7SUFBUixLQUFLLEVBQUU7OzhEQUEwQjtBQUt6QjtJQUFSLEtBQUssRUFBRTs7Z0VBQTRCO0FBSzNCO0lBQVIsS0FBSyxFQUFFOzs0REFBeUI7QUFLeEI7SUFBUixLQUFLLEVBQUU7OzhEQUEyQjtBQUsxQjtJQUFSLEtBQUssRUFBRTs4QkFBVSxPQUFPO3lEQUFNO0FBS3RCO0lBQVIsS0FBSyxFQUFFOzt3REFBZ0I7QUFLZjtJQUFSLEtBQUssRUFBRTs7K0RBQXVCO0FBS3RCO0lBQVIsS0FBSyxFQUFFOztrRUFBMkM7QUFLMUM7SUFBUixLQUFLLEVBQUU7OEJBQWtCLFdBQVc7aUVBQU07QUFLbEM7SUFBUixLQUFLLEVBQUU7O3FFQUFxQztBQU1wQztJQUFSLEtBQUssRUFBRTs7OERBQW9DO0FBS25DO0lBQVIsS0FBSyxFQUFFOzhCQUFzQixXQUFXO3FFQUFNO0FBS3RDO0lBQVIsS0FBSyxFQUFFOzhCQUFnQixXQUFXOytEQUFNO0FBS2hDO0lBQVIsS0FBSyxFQUFFOzhCQUFxQixXQUFXO29FQUFNO0FBS3JDO0lBQVIsS0FBSyxFQUFFOzhCQUF1QixXQUFXO3NFQUFNO0FBS3ZDO0lBQVIsS0FBSyxFQUFFOzttRUFBbUM7QUFLbEM7SUFBUixLQUFLLEVBQUU7OEJBQTRCLFdBQVc7MkVBQU07QUFLNUM7SUFBUixLQUFLLEVBQUU7OEJBQTRCLFdBQVc7MkVBQU07QUFLM0M7SUFBVCxNQUFNLEVBQUU7OzhEQUdKO0FBS0s7SUFBVCxNQUFNLEVBQUU7O29FQUdKO0FBS0s7SUFBVCxNQUFNLEVBQUU7O21FQUM0QztBQU0zQztJQUFULE1BQU0sRUFBRTs7a0VBQzhDO0FBNUk1Qyx3QkFBd0I7SUFuQ3BDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSx1QkFBdUI7UUFDakMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0JUO0tBQ0YsQ0FBQztHQUNXLHdCQUF3QixDQTZJcEM7U0E3SVksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIFRlbXBsYXRlUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbGVuZGFyRXZlbnQgfSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnQgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItZXZlbnQtdGltZXMtY2hhbmdlZC1ldmVudC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUGxhY2VtZW50QXJyYXkgfSBmcm9tICdwb3NpdGlvbmluZyc7XG5pbXBvcnQgeyBDYWxlbmRhcldlZWtWaWV3QmVmb3JlUmVuZGVyRXZlbnQgfSBmcm9tICcuLi93ZWVrL2NhbGVuZGFyLXdlZWsubW9kdWxlJztcblxuZXhwb3J0IHR5cGUgQ2FsZW5kYXJEYXlWaWV3QmVmb3JlUmVuZGVyRXZlbnQgPVxuICBDYWxlbmRhcldlZWtWaWV3QmVmb3JlUmVuZGVyRXZlbnQ7XG5cbi8qKlxuICogU2hvd3MgYWxsIGV2ZW50cyBvbiBhIGdpdmVuIGRheS4gRXhhbXBsZSB1c2FnZTpcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiA8bXdsLWNhbGVuZGFyLWRheS12aWV3XG4gKiAgW3ZpZXdEYXRlXT1cInZpZXdEYXRlXCJcbiAqICBbZXZlbnRzXT1cImV2ZW50c1wiPlxuICogPC9td2wtY2FsZW5kYXItZGF5LXZpZXc+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLWRheS12aWV3JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bXdsLWNhbGVuZGFyLXdlZWstdmlld1xuICAgICAgY2xhc3M9XCJjYWwtZGF5LXZpZXdcIlxuICAgICAgW2RheXNJbldlZWtdPVwiMVwiXG4gICAgICBbdmlld0RhdGVdPVwidmlld0RhdGVcIlxuICAgICAgW2V2ZW50c109XCJldmVudHNcIlxuICAgICAgW2hvdXJTZWdtZW50c109XCJob3VyU2VnbWVudHNcIlxuICAgICAgW2hvdXJTZWdtZW50SGVpZ2h0XT1cImhvdXJTZWdtZW50SGVpZ2h0XCJcbiAgICAgIFtkYXlTdGFydEhvdXJdPVwiZGF5U3RhcnRIb3VyXCJcbiAgICAgIFtkYXlTdGFydE1pbnV0ZV09XCJkYXlTdGFydE1pbnV0ZVwiXG4gICAgICBbZGF5RW5kSG91cl09XCJkYXlFbmRIb3VyXCJcbiAgICAgIFtkYXlFbmRNaW51dGVdPVwiZGF5RW5kTWludXRlXCJcbiAgICAgIFtyZWZyZXNoXT1cInJlZnJlc2hcIlxuICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxuICAgICAgW2V2ZW50U25hcFNpemVdPVwiZXZlbnRTbmFwU2l6ZVwiXG4gICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCJ0b29sdGlwUGxhY2VtZW50XCJcbiAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcbiAgICAgIFt0b29sdGlwQXBwZW5kVG9Cb2R5XT1cInRvb2x0aXBBcHBlbmRUb0JvZHlcIlxuICAgICAgW3Rvb2x0aXBEZWxheV09XCJ0b29sdGlwRGVsYXlcIlxuICAgICAgW2hvdXJTZWdtZW50VGVtcGxhdGVdPVwiaG91clNlZ21lbnRUZW1wbGF0ZVwiXG4gICAgICBbZXZlbnRUZW1wbGF0ZV09XCJldmVudFRlbXBsYXRlXCJcbiAgICAgIFtldmVudFRpdGxlVGVtcGxhdGVdPVwiZXZlbnRUaXRsZVRlbXBsYXRlXCJcbiAgICAgIFtldmVudEFjdGlvbnNUZW1wbGF0ZV09XCJldmVudEFjdGlvbnNUZW1wbGF0ZVwiXG4gICAgICBbc25hcERyYWdnZWRFdmVudHNdPVwic25hcERyYWdnZWRFdmVudHNcIlxuICAgICAgW2FsbERheUV2ZW50c0xhYmVsVGVtcGxhdGVdPVwiYWxsRGF5RXZlbnRzTGFiZWxUZW1wbGF0ZVwiXG4gICAgICBbY3VycmVudFRpbWVNYXJrZXJUZW1wbGF0ZV09XCJjdXJyZW50VGltZU1hcmtlclRlbXBsYXRlXCJcbiAgICAgIChldmVudENsaWNrZWQpPVwiZXZlbnRDbGlja2VkLmVtaXQoJGV2ZW50KVwiXG4gICAgICAoaG91clNlZ21lbnRDbGlja2VkKT1cImhvdXJTZWdtZW50Q2xpY2tlZC5lbWl0KCRldmVudClcIlxuICAgICAgKGV2ZW50VGltZXNDaGFuZ2VkKT1cImV2ZW50VGltZXNDaGFuZ2VkLmVtaXQoJGV2ZW50KVwiXG4gICAgICAoYmVmb3JlVmlld1JlbmRlcik9XCJiZWZvcmVWaWV3UmVuZGVyLmVtaXQoJGV2ZW50KVwiXG4gICAgPjwvbXdsLWNhbGVuZGFyLXdlZWstdmlldz5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJEYXlWaWV3Q29tcG9uZW50IHtcbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHZpZXcgZGF0ZVxuICAgKi9cbiAgQElucHV0KCkgdmlld0RhdGU6IERhdGU7XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGV2ZW50cyB0byBkaXNwbGF5IG9uIHZpZXdcbiAgICogVGhlIHNjaGVtYSBpcyBhdmFpbGFibGUgaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL21hdHRsZXdpczkyL2NhbGVuZGFyLXV0aWxzL2Jsb2IvYzUxNjg5OTg1ZjU5YTI3MTk0MGUzMGJjNGUyYzRlMWZlZTNmY2I1Yy9zcmMvY2FsZW5kYXJVdGlscy50cyNMNDktTDYzXG4gICAqL1xuICBASW5wdXQoKSBldmVudHM6IENhbGVuZGFyRXZlbnRbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIG9mIHNlZ21lbnRzIGluIGFuIGhvdXIuIE11c3QgZGl2aWRlIGVxdWFsbHkgaW50byA2MC5cbiAgICovXG4gIEBJbnB1dCgpIGhvdXJTZWdtZW50czogbnVtYmVyID0gMjtcblxuICAvKipcbiAgICogVGhlIGhlaWdodCBpbiBwaXhlbHMgb2YgZWFjaCBob3VyIHNlZ21lbnRcbiAgICovXG4gIEBJbnB1dCgpIGhvdXJTZWdtZW50SGVpZ2h0OiBudW1iZXIgPSAzMDtcblxuICAvKipcbiAgICogVGhlIGRheSBzdGFydCBob3VycyBpbiAyNCBob3VyIHRpbWUuIE11c3QgYmUgMC0yM1xuICAgKi9cbiAgQElucHV0KCkgZGF5U3RhcnRIb3VyOiBudW1iZXIgPSAwO1xuXG4gIC8qKlxuICAgKiBUaGUgZGF5IHN0YXJ0IG1pbnV0ZXMuIE11c3QgYmUgMC01OVxuICAgKi9cbiAgQElucHV0KCkgZGF5U3RhcnRNaW51dGU6IG51bWJlciA9IDA7XG5cbiAgLyoqXG4gICAqIFRoZSBkYXkgZW5kIGhvdXJzIGluIDI0IGhvdXIgdGltZS4gTXVzdCBiZSAwLTIzXG4gICAqL1xuICBASW5wdXQoKSBkYXlFbmRIb3VyOiBudW1iZXIgPSAyMztcblxuICAvKipcbiAgICogVGhlIGRheSBlbmQgbWludXRlcy4gTXVzdCBiZSAwLTU5XG4gICAqL1xuICBASW5wdXQoKSBkYXlFbmRNaW51dGU6IG51bWJlciA9IDU5O1xuXG4gIC8qKlxuICAgKiBBbiBvYnNlcnZhYmxlIHRoYXQgd2hlbiBlbWl0dGVkIG9uIHdpbGwgcmUtcmVuZGVyIHRoZSBjdXJyZW50IHZpZXdcbiAgICovXG4gIEBJbnB1dCgpIHJlZnJlc2g6IFN1YmplY3Q8YW55PjtcblxuICAvKipcbiAgICogVGhlIGxvY2FsZSB1c2VkIHRvIGZvcm1hdCBkYXRlc1xuICAgKi9cbiAgQElucHV0KCkgbG9jYWxlOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBncmlkIHNpemUgdG8gc25hcCByZXNpemluZyBhbmQgZHJhZ2dpbmcgb2YgZXZlbnRzIHRvXG4gICAqL1xuICBASW5wdXQoKSBldmVudFNuYXBTaXplOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBwbGFjZW1lbnQgb2YgdGhlIGV2ZW50IHRvb2x0aXBcbiAgICovXG4gIEBJbnB1dCgpIHRvb2x0aXBQbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5ID0gJ2F1dG8nO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIHRoZSBldmVudCB0b29sdGlwc1xuICAgKi9cbiAgQElucHV0KCkgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGFwcGVuZCB0b29sdGlwcyB0byB0aGUgYm9keSBvciBuZXh0IHRvIHRoZSB0cmlnZ2VyIGVsZW1lbnRcbiAgICovXG4gIEBJbnB1dCgpIHRvb2x0aXBBcHBlbmRUb0JvZHk6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgZGVsYXkgaW4gbWlsbGlzZWNvbmRzIGJlZm9yZSB0aGUgdG9vbHRpcCBzaG91bGQgYmUgZGlzcGxheWVkLiBJZiBub3QgcHJvdmlkZWQgdGhlIHRvb2x0aXBcbiAgICogd2lsbCBiZSBkaXNwbGF5ZWQgaW1tZWRpYXRlbHkuXG4gICAqL1xuICBASW5wdXQoKSB0b29sdGlwRGVsYXk6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgdG8gcmVwbGFjZSB0aGUgaG91ciBzZWdtZW50XG4gICAqL1xuICBASW5wdXQoKSBob3VyU2VnbWVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIGRheSB2aWV3IGV2ZW50c1xuICAgKi9cbiAgQElucHV0KCkgZXZlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciBldmVudCB0aXRsZXNcbiAgICovXG4gIEBJbnB1dCgpIGV2ZW50VGl0bGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciBldmVudCBhY3Rpb25zXG4gICAqL1xuICBASW5wdXQoKSBldmVudEFjdGlvbnNUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogV2hldGhlciB0byBzbmFwIGV2ZW50cyB0byBhIGdyaWQgd2hlbiBkcmFnZ2luZ1xuICAgKi9cbiAgQElucHV0KCkgc25hcERyYWdnZWRFdmVudHM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIHRoZSBhbGwgZGF5IGV2ZW50cyBsYWJlbCB0ZXh0XG4gICAqL1xuICBASW5wdXQoKSBhbGxEYXlFdmVudHNMYWJlbFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIHRoZSBjdXJyZW50IHRpbWUgbWFya2VyXG4gICAqL1xuICBASW5wdXQoKSBjdXJyZW50VGltZU1hcmtlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhbiBldmVudCB0aXRsZSBpcyBjbGlja2VkXG4gICAqL1xuICBAT3V0cHV0KCkgZXZlbnRDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjx7XG4gICAgZXZlbnQ6IENhbGVuZGFyRXZlbnQ7XG4gICAgc291cmNlRXZlbnQ6IE1vdXNlRXZlbnQgfCBhbnk7XG4gIH0+KCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGFuIGhvdXIgc2VnbWVudCBpcyBjbGlja2VkXG4gICAqL1xuICBAT3V0cHV0KCkgaG91clNlZ21lbnRDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjx7XG4gICAgZGF0ZTogRGF0ZTtcbiAgICBzb3VyY2VFdmVudDogTW91c2VFdmVudDtcbiAgfT4oKTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYW4gZXZlbnQgaXMgcmVzaXplZCBvciBkcmFnZ2VkIGFuZCBkcm9wcGVkXG4gICAqL1xuICBAT3V0cHV0KCkgZXZlbnRUaW1lc0NoYW5nZWQgPVxuICAgIG5ldyBFdmVudEVtaXR0ZXI8Q2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBBbiBvdXRwdXQgdGhhdCB3aWxsIGJlIGNhbGxlZCBiZWZvcmUgdGhlIHZpZXcgaXMgcmVuZGVyZWQgZm9yIHRoZSBjdXJyZW50IGRheS5cbiAgICogSWYgeW91IGFkZCB0aGUgYGNzc0NsYXNzYCBwcm9wZXJ0eSB0byBhbiBob3VyIGdyaWQgc2VnbWVudCBpdCB3aWxsIGFkZCB0aGF0IGNsYXNzIHRvIHRoZSBob3VyIHNlZ21lbnQgaW4gdGhlIHRlbXBsYXRlXG4gICAqL1xuICBAT3V0cHV0KCkgYmVmb3JlVmlld1JlbmRlciA9XG4gICAgbmV3IEV2ZW50RW1pdHRlcjxDYWxlbmRhckRheVZpZXdCZWZvcmVSZW5kZXJFdmVudD4oKTtcbn1cbiJdfQ==