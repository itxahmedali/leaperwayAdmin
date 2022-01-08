import { __decorate, __metadata, __param, __rest } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges, OnInit, OnDestroy, LOCALE_ID, Inject, TemplateRef, } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarDragHelper } from '../common/calendar-drag-helper.provider';
import { CalendarResizeHelper } from '../common/calendar-resize-helper.provider';
import { CalendarEventTimesChangedEventType, } from '../common/calendar-event-times-changed-event.interface';
import { CalendarUtils } from '../common/calendar-utils.provider';
import { validateEvents, roundToNearest, trackByWeekDayHeaderDate, trackByHourSegment, trackByHour, getMinutesMoved, getDefaultEventEnd, getMinimumEventHeightInMinutes, addDaysWithExclusions, isDraggedWithinPeriod, shouldFireDroppedEvent, getWeekViewPeriod, trackByWeekAllDayEvent, trackByWeekTimeEvent, } from '../common/util';
import { DateAdapter } from '../../date-adapters/date-adapter';
/**
 * Shows all events on a given week. Example usage:
 *
 * ```typescript
 * <mwl-calendar-week-view
 *  [viewDate]="viewDate"
 *  [events]="events">
 * </mwl-calendar-week-view>
 * ```
 */
let CalendarWeekViewComponent = class CalendarWeekViewComponent {
    /**
     * @hidden
     */
    constructor(cdr, utils, locale, dateAdapter) {
        this.cdr = cdr;
        this.utils = utils;
        this.dateAdapter = dateAdapter;
        /**
         * An array of events to display on view
         * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
         */
        this.events = [];
        /**
         * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
         */
        this.excludeDays = [];
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
         * The precision to display events.
         * `days` will round event start and end dates to the nearest day and `minutes` will not do this rounding
         */
        this.precision = 'days';
        /**
         * Whether to snap events to a grid when dragging
         */
        this.snapDraggedEvents = true;
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
         * Called when a header week day is clicked. Adding a `cssClass` property on `$event.day` will add that class to the header element
         */
        this.dayHeaderClicked = new EventEmitter();
        /**
         * Called when the event title is clicked
         */
        this.eventClicked = new EventEmitter();
        /**
         * Called when an event is resized or dragged and dropped
         */
        this.eventTimesChanged = new EventEmitter();
        /**
         * An output that will be called before the view is rendered for the current week.
         * If you add the `cssClass` property to a day in the header it will add that class to the cell element in the template
         */
        this.beforeViewRender = new EventEmitter();
        /**
         * Called when an hour segment is clicked
         */
        this.hourSegmentClicked = new EventEmitter();
        /**
         * @hidden
         */
        this.allDayEventResizes = new Map();
        /**
         * @hidden
         */
        this.timeEventResizes = new Map();
        /**
         * @hidden
         */
        this.eventDragEnterByType = {
            allDay: 0,
            time: 0,
        };
        /**
         * @hidden
         */
        this.dragActive = false;
        /**
         * @hidden
         */
        this.dragAlreadyMoved = false;
        /**
         * @hidden
         */
        this.calendarId = Symbol('angular calendar week view id');
        /**
         * @hidden
         */
        this.trackByWeekDayHeaderDate = trackByWeekDayHeaderDate;
        /**
         * @hidden
         */
        this.trackByHourSegment = trackByHourSegment;
        /**
         * @hidden
         */
        this.trackByHour = trackByHour;
        /**
         * @hidden
         */
        this.trackByWeekAllDayEvent = trackByWeekAllDayEvent;
        /**
         * @hidden
         */
        this.trackByWeekTimeEvent = trackByWeekTimeEvent;
        /**
         * @hidden
         */
        this.trackByHourColumn = (index, column) => column.hours[0] ? column.hours[0].segments[0].date.toISOString() : column;
        /**
         * @hidden
         */
        this.trackById = (index, row) => row.id;
        this.locale = locale;
    }
    /**
     * @hidden
     */
    ngOnInit() {
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(() => {
                this.refreshAll();
                this.cdr.markForCheck();
            });
        }
    }
    /**
     * @hidden
     */
    ngOnChanges(changes) {
        const refreshHeader = changes.viewDate ||
            changes.excludeDays ||
            changes.weekendDays ||
            changes.daysInWeek ||
            changes.weekStartsOn;
        const refreshBody = changes.viewDate ||
            changes.dayStartHour ||
            changes.dayStartMinute ||
            changes.dayEndHour ||
            changes.dayEndMinute ||
            changes.hourSegments ||
            changes.weekStartsOn ||
            changes.weekendDays ||
            changes.excludeDays ||
            changes.hourSegmentHeight ||
            changes.events ||
            changes.daysInWeek;
        if (refreshHeader) {
            this.refreshHeader();
        }
        if (changes.events) {
            validateEvents(this.events);
        }
        if (refreshBody) {
            this.refreshBody();
        }
        if (refreshHeader || refreshBody) {
            this.emitBeforeViewRender();
        }
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    }
    /**
     * @hidden
     */
    timeEventResizeStarted(eventsContainer, timeEvent, resizeEvent) {
        this.timeEventResizes.set(timeEvent.event, resizeEvent);
        this.resizeStarted(eventsContainer);
    }
    /**
     * @hidden
     */
    timeEventResizing(timeEvent, resizeEvent) {
        this.timeEventResizes.set(timeEvent.event, resizeEvent);
        const adjustedEvents = new Map();
        const tempEvents = [...this.events];
        this.timeEventResizes.forEach((lastResizeEvent, event) => {
            const newEventDates = this.getTimeEventResizedDates(event, lastResizeEvent);
            const adjustedEvent = Object.assign(Object.assign({}, event), newEventDates);
            adjustedEvents.set(adjustedEvent, event);
            const eventIndex = tempEvents.indexOf(event);
            tempEvents[eventIndex] = adjustedEvent;
        });
        this.restoreOriginalEvents(tempEvents, adjustedEvents, true);
    }
    /**
     * @hidden
     */
    timeEventResizeEnded(timeEvent) {
        this.view = this.getWeekView(this.events);
        const lastResizeEvent = this.timeEventResizes.get(timeEvent.event);
        if (lastResizeEvent) {
            this.timeEventResizes.delete(timeEvent.event);
            const newEventDates = this.getTimeEventResizedDates(timeEvent.event, lastResizeEvent);
            this.eventTimesChanged.emit({
                newStart: newEventDates.start,
                newEnd: newEventDates.end,
                event: timeEvent.event,
                type: CalendarEventTimesChangedEventType.Resize,
            });
        }
    }
    /**
     * @hidden
     */
    allDayEventResizeStarted(allDayEventsContainer, allDayEvent, resizeEvent) {
        this.allDayEventResizes.set(allDayEvent, {
            originalOffset: allDayEvent.offset,
            originalSpan: allDayEvent.span,
            edge: typeof resizeEvent.edges.left !== 'undefined' ? 'left' : 'right',
        });
        this.resizeStarted(allDayEventsContainer, this.getDayColumnWidth(allDayEventsContainer));
    }
    /**
     * @hidden
     */
    allDayEventResizing(allDayEvent, resizeEvent, dayWidth) {
        const currentResize = this.allDayEventResizes.get(allDayEvent);
        if (typeof resizeEvent.edges.left !== 'undefined') {
            const diff = Math.round(+resizeEvent.edges.left / dayWidth);
            allDayEvent.offset = currentResize.originalOffset + diff;
            allDayEvent.span = currentResize.originalSpan - diff;
        }
        else if (typeof resizeEvent.edges.right !== 'undefined') {
            const diff = Math.round(+resizeEvent.edges.right / dayWidth);
            allDayEvent.span = currentResize.originalSpan + diff;
        }
    }
    /**
     * @hidden
     */
    allDayEventResizeEnded(allDayEvent) {
        const currentResize = this.allDayEventResizes.get(allDayEvent);
        if (currentResize) {
            const allDayEventResizingBeforeStart = currentResize.edge === 'left';
            let daysDiff;
            if (allDayEventResizingBeforeStart) {
                daysDiff = allDayEvent.offset - currentResize.originalOffset;
            }
            else {
                daysDiff = allDayEvent.span - currentResize.originalSpan;
            }
            allDayEvent.offset = currentResize.originalOffset;
            allDayEvent.span = currentResize.originalSpan;
            let newStart = allDayEvent.event.start;
            let newEnd = allDayEvent.event.end || allDayEvent.event.start;
            if (allDayEventResizingBeforeStart) {
                newStart = addDaysWithExclusions(this.dateAdapter, newStart, daysDiff, this.excludeDays);
            }
            else {
                newEnd = addDaysWithExclusions(this.dateAdapter, newEnd, daysDiff, this.excludeDays);
            }
            this.eventTimesChanged.emit({
                newStart,
                newEnd,
                event: allDayEvent.event,
                type: CalendarEventTimesChangedEventType.Resize,
            });
            this.allDayEventResizes.delete(allDayEvent);
        }
    }
    /**
     * @hidden
     */
    getDayColumnWidth(eventRowContainer) {
        return Math.floor(eventRowContainer.offsetWidth / this.days.length);
    }
    /**
     * @hidden
     */
    dateDragEnter(date) {
        this.lastDragEnterDate = date;
    }
    /**
     * @hidden
     */
    eventDropped(dropEvent, date, allDay) {
        if (shouldFireDroppedEvent(dropEvent, date, allDay, this.calendarId) &&
            this.lastDragEnterDate.getTime() === date.getTime() &&
            (!this.snapDraggedEvents ||
                dropEvent.dropData.event !== this.lastDraggedEvent)) {
            this.eventTimesChanged.emit({
                type: CalendarEventTimesChangedEventType.Drop,
                event: dropEvent.dropData.event,
                newStart: date,
                allDay,
            });
        }
        this.lastDraggedEvent = null;
    }
    /**
     * @hidden
     */
    dragEnter(type) {
        this.eventDragEnterByType[type]++;
    }
    /**
     * @hidden
     */
    dragLeave(type) {
        this.eventDragEnterByType[type]--;
    }
    /**
     * @hidden
     */
    dragStarted(eventsContainer, event, dayEvent) {
        this.dayColumnWidth = this.getDayColumnWidth(eventsContainer);
        const dragHelper = new CalendarDragHelper(eventsContainer, event);
        this.validateDrag = ({ x, y, transform }) => this.allDayEventResizes.size === 0 &&
            this.timeEventResizes.size === 0 &&
            dragHelper.validateDrag({
                x,
                y,
                snapDraggedEvents: this.snapDraggedEvents,
                dragAlreadyMoved: this.dragAlreadyMoved,
                transform,
            });
        this.dragActive = true;
        this.dragAlreadyMoved = false;
        this.lastDraggedEvent = null;
        this.eventDragEnterByType = {
            allDay: 0,
            time: 0,
        };
        if (!this.snapDraggedEvents && dayEvent) {
            this.view.hourColumns.forEach((column) => {
                const linkedEvent = column.events.find((columnEvent) => columnEvent.event === dayEvent.event && columnEvent !== dayEvent);
                // hide any linked events while dragging
                if (linkedEvent) {
                    linkedEvent.width = 0;
                    linkedEvent.height = 0;
                }
            });
        }
        this.cdr.markForCheck();
    }
    /**
     * @hidden
     */
    dragMove(dayEvent, dragEvent) {
        const newEventTimes = this.getDragMovedEventTimes(dayEvent, dragEvent, this.dayColumnWidth, true);
        const originalEvent = dayEvent.event;
        const adjustedEvent = Object.assign(Object.assign({}, originalEvent), newEventTimes);
        const tempEvents = this.events.map((event) => {
            if (event === originalEvent) {
                return adjustedEvent;
            }
            return event;
        });
        this.restoreOriginalEvents(tempEvents, new Map([[adjustedEvent, originalEvent]]), this.snapDraggedEvents);
        this.dragAlreadyMoved = true;
    }
    /**
     * @hidden
     */
    allDayEventDragMove() {
        this.dragAlreadyMoved = true;
    }
    /**
     * @hidden
     */
    dragEnded(weekEvent, dragEndEvent, dayWidth, useY = false) {
        this.view = this.getWeekView(this.events);
        this.dragActive = false;
        this.validateDrag = null;
        const { start, end } = this.getDragMovedEventTimes(weekEvent, dragEndEvent, dayWidth, useY);
        if ((this.snapDraggedEvents ||
            this.eventDragEnterByType[useY ? 'time' : 'allDay'] > 0) &&
            isDraggedWithinPeriod(start, end, this.view.period)) {
            this.lastDraggedEvent = weekEvent.event;
            this.eventTimesChanged.emit({
                newStart: start,
                newEnd: end,
                event: weekEvent.event,
                type: CalendarEventTimesChangedEventType.Drag,
                allDay: !useY,
            });
        }
    }
    refreshHeader() {
        this.days = this.utils.getWeekViewHeader(Object.assign({ viewDate: this.viewDate, weekStartsOn: this.weekStartsOn, excluded: this.excludeDays, weekendDays: this.weekendDays }, getWeekViewPeriod(this.dateAdapter, this.viewDate, this.weekStartsOn, this.excludeDays, this.daysInWeek)));
    }
    refreshBody() {
        this.view = this.getWeekView(this.events);
    }
    refreshAll() {
        this.refreshHeader();
        this.refreshBody();
        this.emitBeforeViewRender();
    }
    emitBeforeViewRender() {
        if (this.days && this.view) {
            this.beforeViewRender.emit(Object.assign({ header: this.days }, this.view));
        }
    }
    getWeekView(events) {
        return this.utils.getWeekView(Object.assign({ events, viewDate: this.viewDate, weekStartsOn: this.weekStartsOn, excluded: this.excludeDays, precision: this.precision, absolutePositionedEvents: true, hourSegments: this.hourSegments, dayStart: {
                hour: this.dayStartHour,
                minute: this.dayStartMinute,
            }, dayEnd: {
                hour: this.dayEndHour,
                minute: this.dayEndMinute,
            }, segmentHeight: this.hourSegmentHeight, weekendDays: this.weekendDays }, getWeekViewPeriod(this.dateAdapter, this.viewDate, this.weekStartsOn, this.excludeDays, this.daysInWeek)));
    }
    getDragMovedEventTimes(weekEvent, dragEndEvent, dayWidth, useY) {
        const daysDragged = roundToNearest(dragEndEvent.x, dayWidth) / dayWidth;
        const minutesMoved = useY
            ? getMinutesMoved(dragEndEvent.y, this.hourSegments, this.hourSegmentHeight, this.eventSnapSize)
            : 0;
        const start = this.dateAdapter.addMinutes(addDaysWithExclusions(this.dateAdapter, weekEvent.event.start, daysDragged, this.excludeDays), minutesMoved);
        let end;
        if (weekEvent.event.end) {
            end = this.dateAdapter.addMinutes(addDaysWithExclusions(this.dateAdapter, weekEvent.event.end, daysDragged, this.excludeDays), minutesMoved);
        }
        return { start, end };
    }
    restoreOriginalEvents(tempEvents, adjustedEvents, snapDraggedEvents = true) {
        const previousView = this.view;
        if (snapDraggedEvents) {
            this.view = this.getWeekView(tempEvents);
        }
        const adjustedEventsArray = tempEvents.filter((event) => adjustedEvents.has(event));
        this.view.hourColumns.forEach((column, columnIndex) => {
            previousView.hourColumns[columnIndex].hours.forEach((hour, hourIndex) => {
                hour.segments.forEach((segment, segmentIndex) => {
                    column.hours[hourIndex].segments[segmentIndex].cssClass =
                        segment.cssClass;
                });
            });
            adjustedEventsArray.forEach((adjustedEvent) => {
                const originalEvent = adjustedEvents.get(adjustedEvent);
                const existingColumnEvent = column.events.find((columnEvent) => columnEvent.event ===
                    (snapDraggedEvents ? adjustedEvent : originalEvent));
                if (existingColumnEvent) {
                    // restore the original event so trackBy kicks in and the dom isn't changed
                    existingColumnEvent.event = originalEvent;
                    existingColumnEvent['tempEvent'] = adjustedEvent;
                    if (!snapDraggedEvents) {
                        existingColumnEvent.height = 0;
                        existingColumnEvent.width = 0;
                    }
                }
                else {
                    // add a dummy event to the drop so if the event was removed from the original column the drag doesn't end early
                    const event = {
                        event: originalEvent,
                        left: 0,
                        top: 0,
                        height: 0,
                        width: 0,
                        startsBeforeDay: false,
                        endsAfterDay: false,
                        tempEvent: adjustedEvent,
                    };
                    column.events.push(event);
                }
            });
        });
        adjustedEvents.clear();
    }
    getTimeEventResizedDates(calendarEvent, resizeEvent) {
        const minimumEventHeight = getMinimumEventHeightInMinutes(this.hourSegments, this.hourSegmentHeight);
        const newEventDates = {
            start: calendarEvent.start,
            end: getDefaultEventEnd(this.dateAdapter, calendarEvent, minimumEventHeight),
        };
        const { end } = calendarEvent, eventWithoutEnd = __rest(calendarEvent, ["end"]);
        const smallestResizes = {
            start: this.dateAdapter.addMinutes(newEventDates.end, minimumEventHeight * -1),
            end: getDefaultEventEnd(this.dateAdapter, eventWithoutEnd, minimumEventHeight),
        };
        if (typeof resizeEvent.edges.left !== 'undefined') {
            const daysDiff = Math.round(+resizeEvent.edges.left / this.dayColumnWidth);
            const newStart = addDaysWithExclusions(this.dateAdapter, newEventDates.start, daysDiff, this.excludeDays);
            if (newStart < smallestResizes.start) {
                newEventDates.start = newStart;
            }
            else {
                newEventDates.start = smallestResizes.start;
            }
        }
        else if (typeof resizeEvent.edges.right !== 'undefined') {
            const daysDiff = Math.round(+resizeEvent.edges.right / this.dayColumnWidth);
            const newEnd = addDaysWithExclusions(this.dateAdapter, newEventDates.end, daysDiff, this.excludeDays);
            if (newEnd > smallestResizes.end) {
                newEventDates.end = newEnd;
            }
            else {
                newEventDates.end = smallestResizes.end;
            }
        }
        if (typeof resizeEvent.edges.top !== 'undefined') {
            const minutesMoved = getMinutesMoved(resizeEvent.edges.top, this.hourSegments, this.hourSegmentHeight, this.eventSnapSize);
            const newStart = this.dateAdapter.addMinutes(newEventDates.start, minutesMoved);
            if (newStart < smallestResizes.start) {
                newEventDates.start = newStart;
            }
            else {
                newEventDates.start = smallestResizes.start;
            }
        }
        else if (typeof resizeEvent.edges.bottom !== 'undefined') {
            const minutesMoved = getMinutesMoved(resizeEvent.edges.bottom, this.hourSegments, this.hourSegmentHeight, this.eventSnapSize);
            const newEnd = this.dateAdapter.addMinutes(newEventDates.end, minutesMoved);
            if (newEnd > smallestResizes.end) {
                newEventDates.end = newEnd;
            }
            else {
                newEventDates.end = smallestResizes.end;
            }
        }
        return newEventDates;
    }
    resizeStarted(eventsContainer, minWidth) {
        this.dayColumnWidth = this.getDayColumnWidth(eventsContainer);
        const resizeHelper = new CalendarResizeHelper(eventsContainer, minWidth);
        this.validateResize = ({ rectangle }) => resizeHelper.validateResize({ rectangle });
        this.cdr.markForCheck();
    }
};
CalendarWeekViewComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: CalendarUtils },
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] },
    { type: DateAdapter }
];
__decorate([
    Input(),
    __metadata("design:type", Date)
], CalendarWeekViewComponent.prototype, "viewDate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], CalendarWeekViewComponent.prototype, "events", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], CalendarWeekViewComponent.prototype, "excludeDays", void 0);
__decorate([
    Input(),
    __metadata("design:type", Subject)
], CalendarWeekViewComponent.prototype, "refresh", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], CalendarWeekViewComponent.prototype, "locale", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], CalendarWeekViewComponent.prototype, "tooltipPlacement", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], CalendarWeekViewComponent.prototype, "tooltipTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], CalendarWeekViewComponent.prototype, "tooltipAppendToBody", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], CalendarWeekViewComponent.prototype, "tooltipDelay", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], CalendarWeekViewComponent.prototype, "weekStartsOn", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], CalendarWeekViewComponent.prototype, "headerTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], CalendarWeekViewComponent.prototype, "eventTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], CalendarWeekViewComponent.prototype, "eventTitleTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], CalendarWeekViewComponent.prototype, "eventActionsTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], CalendarWeekViewComponent.prototype, "precision", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], CalendarWeekViewComponent.prototype, "weekendDays", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], CalendarWeekViewComponent.prototype, "snapDraggedEvents", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], CalendarWeekViewComponent.prototype, "hourSegments", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], CalendarWeekViewComponent.prototype, "hourSegmentHeight", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], CalendarWeekViewComponent.prototype, "dayStartHour", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], CalendarWeekViewComponent.prototype, "dayStartMinute", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], CalendarWeekViewComponent.prototype, "dayEndHour", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], CalendarWeekViewComponent.prototype, "dayEndMinute", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], CalendarWeekViewComponent.prototype, "hourSegmentTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], CalendarWeekViewComponent.prototype, "eventSnapSize", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], CalendarWeekViewComponent.prototype, "allDayEventsLabelTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], CalendarWeekViewComponent.prototype, "daysInWeek", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], CalendarWeekViewComponent.prototype, "currentTimeMarkerTemplate", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CalendarWeekViewComponent.prototype, "dayHeaderClicked", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CalendarWeekViewComponent.prototype, "eventClicked", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CalendarWeekViewComponent.prototype, "eventTimesChanged", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CalendarWeekViewComponent.prototype, "beforeViewRender", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], CalendarWeekViewComponent.prototype, "hourSegmentClicked", void 0);
CalendarWeekViewComponent = __decorate([
    Component({
        selector: 'mwl-calendar-week-view',
        template: `
    <div class="cal-week-view" role="grid">
      <mwl-calendar-week-view-header
        [days]="days"
        [locale]="locale"
        [customTemplate]="headerTemplate"
        (dayHeaderClicked)="dayHeaderClicked.emit($event)"
        (eventDropped)="
          eventDropped({ dropData: $event }, $event.newStart, true)
        "
        (dragEnter)="dateDragEnter($event.date)"
      >
      </mwl-calendar-week-view-header>
      <div
        class="cal-all-day-events"
        #allDayEventsContainer
        *ngIf="view.allDayEventRows.length > 0"
        mwlDroppable
        (dragEnter)="dragEnter('allDay')"
        (dragLeave)="dragLeave('allDay')"
      >
        <div class="cal-day-columns">
          <div
            class="cal-time-label-column"
            [ngTemplateOutlet]="allDayEventsLabelTemplate"
          ></div>
          <div
            class="cal-day-column"
            *ngFor="let day of days; trackBy: trackByWeekDayHeaderDate"
            mwlDroppable
            dragOverClass="cal-drag-over"
            (drop)="eventDropped($event, day.date, true)"
            (dragEnter)="dateDragEnter(day.date)"
          ></div>
        </div>
        <div
          *ngFor="let eventRow of view.allDayEventRows; trackBy: trackById"
          #eventRowContainer
          class="cal-events-row"
        >
          <div
            *ngFor="
              let allDayEvent of eventRow.row;
              trackBy: trackByWeekAllDayEvent
            "
            #event
            class="cal-event-container"
            [class.cal-draggable]="
              allDayEvent.event.draggable && allDayEventResizes.size === 0
            "
            [class.cal-starts-within-week]="!allDayEvent.startsBeforeWeek"
            [class.cal-ends-within-week]="!allDayEvent.endsAfterWeek"
            [ngClass]="allDayEvent.event?.cssClass"
            [style.width.%]="(100 / days.length) * allDayEvent.span"
            [style.marginLeft.%]="(100 / days.length) * allDayEvent.offset"
            mwlResizable
            [resizeSnapGrid]="{ left: dayColumnWidth, right: dayColumnWidth }"
            [validateResize]="validateResize"
            (resizeStart)="
              allDayEventResizeStarted(eventRowContainer, allDayEvent, $event)
            "
            (resizing)="
              allDayEventResizing(allDayEvent, $event, dayColumnWidth)
            "
            (resizeEnd)="allDayEventResizeEnded(allDayEvent)"
            mwlDraggable
            dragActiveClass="cal-drag-active"
            [dropData]="{ event: allDayEvent.event, calendarId: calendarId }"
            [dragAxis]="{
              x: allDayEvent.event.draggable && allDayEventResizes.size === 0,
              y:
                !snapDraggedEvents &&
                allDayEvent.event.draggable &&
                allDayEventResizes.size === 0
            }"
            [dragSnapGrid]="snapDraggedEvents ? { x: dayColumnWidth } : {}"
            [validateDrag]="validateDrag"
            [touchStartLongPress]="{ delay: 300, delta: 30 }"
            (dragStart)="dragStarted(eventRowContainer, event)"
            (dragging)="allDayEventDragMove()"
            (dragEnd)="dragEnded(allDayEvent, $event, dayColumnWidth)"
          >
            <div
              class="cal-resize-handle cal-resize-handle-before-start"
              *ngIf="
                allDayEvent.event?.resizable?.beforeStart &&
                !allDayEvent.startsBeforeWeek
              "
              mwlResizeHandle
              [resizeEdges]="{ left: true }"
            ></div>
            <mwl-calendar-week-view-event
              [locale]="locale"
              [weekEvent]="allDayEvent"
              [tooltipPlacement]="tooltipPlacement"
              [tooltipTemplate]="tooltipTemplate"
              [tooltipAppendToBody]="tooltipAppendToBody"
              [tooltipDelay]="tooltipDelay"
              [customTemplate]="eventTemplate"
              [eventTitleTemplate]="eventTitleTemplate"
              [eventActionsTemplate]="eventActionsTemplate"
              [daysInWeek]="daysInWeek"
              (eventClicked)="
                eventClicked.emit({
                  event: allDayEvent.event,
                  sourceEvent: $event.sourceEvent
                })
              "
            >
            </mwl-calendar-week-view-event>
            <div
              class="cal-resize-handle cal-resize-handle-after-end"
              *ngIf="
                allDayEvent.event?.resizable?.afterEnd &&
                !allDayEvent.endsAfterWeek
              "
              mwlResizeHandle
              [resizeEdges]="{ right: true }"
            ></div>
          </div>
        </div>
      </div>
      <div
        class="cal-time-events"
        mwlDroppable
        (dragEnter)="dragEnter('time')"
        (dragLeave)="dragLeave('time')"
      >
        <div
          class="cal-time-label-column"
          *ngIf="view.hourColumns.length > 0 && daysInWeek !== 1"
        >
          <div
            *ngFor="
              let hour of view.hourColumns[0].hours;
              trackBy: trackByHour;
              let odd = odd
            "
            class="cal-hour"
            [class.cal-hour-odd]="odd"
          >
            <mwl-calendar-week-view-hour-segment
              *ngFor="let segment of hour.segments; trackBy: trackByHourSegment"
              [style.height.px]="hourSegmentHeight"
              [segment]="segment"
              [segmentHeight]="hourSegmentHeight"
              [locale]="locale"
              [customTemplate]="hourSegmentTemplate"
              [isTimeLabel]="true"
              [daysInWeek]="daysInWeek"
            >
            </mwl-calendar-week-view-hour-segment>
          </div>
        </div>
        <div
          class="cal-day-columns"
          [class.cal-resize-active]="timeEventResizes.size > 0"
          #dayColumns
        >
          <div
            class="cal-day-column"
            *ngFor="let column of view.hourColumns; trackBy: trackByHourColumn"
          >
            <mwl-calendar-week-view-current-time-marker
              [columnDate]="column.date"
              [dayStartHour]="dayStartHour"
              [dayStartMinute]="dayStartMinute"
              [dayEndHour]="dayEndHour"
              [dayEndMinute]="dayEndMinute"
              [hourSegments]="hourSegments"
              [hourSegmentHeight]="hourSegmentHeight"
              [customTemplate]="currentTimeMarkerTemplate"
            ></mwl-calendar-week-view-current-time-marker>
            <div class="cal-events-container">
              <div
                *ngFor="
                  let timeEvent of column.events;
                  trackBy: trackByWeekTimeEvent
                "
                #event
                class="cal-event-container"
                [class.cal-draggable]="
                  timeEvent.event.draggable && timeEventResizes.size === 0
                "
                [class.cal-starts-within-day]="!timeEvent.startsBeforeDay"
                [class.cal-ends-within-day]="!timeEvent.endsAfterDay"
                [ngClass]="timeEvent.event.cssClass"
                [hidden]="timeEvent.height === 0 && timeEvent.width === 0"
                [style.top.px]="timeEvent.top"
                [style.height.px]="timeEvent.height"
                [style.left.%]="timeEvent.left"
                [style.width.%]="timeEvent.width"
                mwlResizable
                [resizeSnapGrid]="{
                  left: dayColumnWidth,
                  right: dayColumnWidth,
                  top: eventSnapSize || hourSegmentHeight,
                  bottom: eventSnapSize || hourSegmentHeight
                }"
                [validateResize]="validateResize"
                [allowNegativeResizes]="true"
                (resizeStart)="
                  timeEventResizeStarted(dayColumns, timeEvent, $event)
                "
                (resizing)="timeEventResizing(timeEvent, $event)"
                (resizeEnd)="timeEventResizeEnded(timeEvent)"
                mwlDraggable
                dragActiveClass="cal-drag-active"
                [dropData]="{ event: timeEvent.event, calendarId: calendarId }"
                [dragAxis]="{
                  x: timeEvent.event.draggable && timeEventResizes.size === 0,
                  y: timeEvent.event.draggable && timeEventResizes.size === 0
                }"
                [dragSnapGrid]="
                  snapDraggedEvents
                    ? {
                        x: dayColumnWidth,
                        y: eventSnapSize || hourSegmentHeight
                      }
                    : {}
                "
                [touchStartLongPress]="{ delay: 300, delta: 30 }"
                [ghostDragEnabled]="!snapDraggedEvents"
                [ghostElementTemplate]="weekEventTemplate"
                [validateDrag]="validateDrag"
                (dragStart)="dragStarted(dayColumns, event, timeEvent)"
                (dragging)="dragMove(timeEvent, $event)"
                (dragEnd)="dragEnded(timeEvent, $event, dayColumnWidth, true)"
              >
                <div
                  class="cal-resize-handle cal-resize-handle-before-start"
                  *ngIf="
                    timeEvent.event?.resizable?.beforeStart &&
                    !timeEvent.startsBeforeDay
                  "
                  mwlResizeHandle
                  [resizeEdges]="{
                    left: true,
                    top: true
                  }"
                ></div>
                <ng-template
                  [ngTemplateOutlet]="weekEventTemplate"
                ></ng-template>
                <ng-template #weekEventTemplate>
                  <mwl-calendar-week-view-event
                    [locale]="locale"
                    [weekEvent]="timeEvent"
                    [tooltipPlacement]="tooltipPlacement"
                    [tooltipTemplate]="tooltipTemplate"
                    [tooltipAppendToBody]="tooltipAppendToBody"
                    [tooltipDisabled]="dragActive || timeEventResizes.size > 0"
                    [tooltipDelay]="tooltipDelay"
                    [customTemplate]="eventTemplate"
                    [eventTitleTemplate]="eventTitleTemplate"
                    [eventActionsTemplate]="eventActionsTemplate"
                    [column]="column"
                    [daysInWeek]="daysInWeek"
                    (eventClicked)="
                      eventClicked.emit({
                        event: timeEvent.event,
                        sourceEvent: $event.sourceEvent
                      })
                    "
                  >
                  </mwl-calendar-week-view-event>
                </ng-template>
                <div
                  class="cal-resize-handle cal-resize-handle-after-end"
                  *ngIf="
                    timeEvent.event?.resizable?.afterEnd &&
                    !timeEvent.endsAfterDay
                  "
                  mwlResizeHandle
                  [resizeEdges]="{
                    right: true,
                    bottom: true
                  }"
                ></div>
              </div>
            </div>

            <div
              *ngFor="
                let hour of column.hours;
                trackBy: trackByHour;
                let odd = odd
              "
              class="cal-hour"
              [class.cal-hour-odd]="odd"
            >
              <mwl-calendar-week-view-hour-segment
                *ngFor="
                  let segment of hour.segments;
                  trackBy: trackByHourSegment
                "
                [style.height.px]="hourSegmentHeight"
                [segment]="segment"
                [segmentHeight]="hourSegmentHeight"
                [locale]="locale"
                [customTemplate]="hourSegmentTemplate"
                [daysInWeek]="daysInWeek"
                (mwlClick)="
                  hourSegmentClicked.emit({
                    date: segment.date,
                    sourceEvent: $event
                  })
                "
                [clickListenerDisabled]="
                  hourSegmentClicked.observers.length === 0
                "
                mwlDroppable
                [dragOverClass]="
                  !dragActive || !snapDraggedEvents ? 'cal-drag-over' : null
                "
                dragActiveClass="cal-drag-active"
                (drop)="eventDropped($event, segment.date, false)"
                (dragEnter)="dateDragEnter(segment.date)"
                [isTimeLabel]="daysInWeek === 1"
              >
              </mwl-calendar-week-view-hour-segment>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
    }),
    __param(2, Inject(LOCALE_ID)),
    __metadata("design:paramtypes", [ChangeDetectorRef,
        CalendarUtils, String, DateAdapter])
], CalendarWeekViewComponent);
export { CalendarWeekViewComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2Vlay12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL3dlZWsvY2FsZW5kYXItd2Vlay12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixpQkFBaUIsRUFDakIsU0FBUyxFQUNULE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULE1BQU0sRUFDTixXQUFXLEdBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFjN0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDakYsT0FBTyxFQUVMLGtDQUFrQyxHQUNuQyxNQUFNLHdEQUF3RCxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNsRSxPQUFPLEVBQ0wsY0FBYyxFQUNkLGNBQWMsRUFDZCx3QkFBd0IsRUFDeEIsa0JBQWtCLEVBQ2xCLFdBQVcsRUFDWCxlQUFlLEVBQ2Ysa0JBQWtCLEVBQ2xCLDhCQUE4QixFQUM5QixxQkFBcUIsRUFDckIscUJBQXFCLEVBQ3JCLHNCQUFzQixFQUN0QixpQkFBaUIsRUFDakIsc0JBQXNCLEVBQ3RCLG9CQUFvQixHQUNyQixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQW1CL0Q7Ozs7Ozs7OztHQVNHO0FBMlVILElBQWEseUJBQXlCLEdBQXRDLE1BQWEseUJBQXlCO0lBb1NwQzs7T0FFRztJQUNILFlBQ1ksR0FBc0IsRUFDdEIsS0FBb0IsRUFDWCxNQUFjLEVBQ3ZCLFdB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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNVVDtLQUNGLENBQUM7SUEyU0csV0FBQSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7cUNBRkgsaUJBQWlCO1FBQ2YsYUFBYSxVQUVQLFdBQVc7R0EzU3pCLHlCQUF5QixDQTA3QnJDO1NBMTdCWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG4gIExPQ0FMRV9JRCxcbiAgSW5qZWN0LFxuICBUZW1wbGF0ZVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIFdlZWtEYXksXG4gIENhbGVuZGFyRXZlbnQsXG4gIFdlZWtWaWV3QWxsRGF5RXZlbnQsXG4gIFdlZWtWaWV3LFxuICBWaWV3UGVyaW9kLFxuICBXZWVrVmlld0hvdXJDb2x1bW4sXG4gIFdlZWtWaWV3VGltZUV2ZW50LFxuICBXZWVrVmlld0hvdXJTZWdtZW50LFxuICBXZWVrVmlld0hvdXIsXG4gIFdlZWtWaWV3QWxsRGF5RXZlbnRSb3csXG59IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcbmltcG9ydCB7IFJlc2l6ZUV2ZW50IH0gZnJvbSAnYW5ndWxhci1yZXNpemFibGUtZWxlbWVudCc7XG5pbXBvcnQgeyBDYWxlbmRhckRyYWdIZWxwZXIgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItZHJhZy1oZWxwZXIucHJvdmlkZXInO1xuaW1wb3J0IHsgQ2FsZW5kYXJSZXNpemVIZWxwZXIgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItcmVzaXplLWhlbHBlci5wcm92aWRlcic7XG5pbXBvcnQge1xuICBDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnQsXG4gIENhbGVuZGFyRXZlbnRUaW1lc0NoYW5nZWRFdmVudFR5cGUsXG59IGZyb20gJy4uL2NvbW1vbi9jYWxlbmRhci1ldmVudC10aW1lcy1jaGFuZ2VkLWV2ZW50LmludGVyZmFjZSc7XG5pbXBvcnQgeyBDYWxlbmRhclV0aWxzIH0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLXV0aWxzLnByb3ZpZGVyJztcbmltcG9ydCB7XG4gIHZhbGlkYXRlRXZlbnRzLFxuICByb3VuZFRvTmVhcmVzdCxcbiAgdHJhY2tCeVdlZWtEYXlIZWFkZXJEYXRlLFxuICB0cmFja0J5SG91clNlZ21lbnQsXG4gIHRyYWNrQnlIb3VyLFxuICBnZXRNaW51dGVzTW92ZWQsXG4gIGdldERlZmF1bHRFdmVudEVuZCxcbiAgZ2V0TWluaW11bUV2ZW50SGVpZ2h0SW5NaW51dGVzLFxuICBhZGREYXlzV2l0aEV4Y2x1c2lvbnMsXG4gIGlzRHJhZ2dlZFdpdGhpblBlcmlvZCxcbiAgc2hvdWxkRmlyZURyb3BwZWRFdmVudCxcbiAgZ2V0V2Vla1ZpZXdQZXJpb2QsXG4gIHRyYWNrQnlXZWVrQWxsRGF5RXZlbnQsXG4gIHRyYWNrQnlXZWVrVGltZUV2ZW50LFxufSBmcm9tICcuLi9jb21tb24vdXRpbCc7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gJy4uLy4uL2RhdGUtYWRhcHRlcnMvZGF0ZS1hZGFwdGVyJztcbmltcG9ydCB7XG4gIERyYWdFbmRFdmVudCxcbiAgRHJvcEV2ZW50LFxuICBEcmFnTW92ZUV2ZW50LFxuICBWYWxpZGF0ZURyYWcsXG59IGZyb20gJ2FuZ3VsYXItZHJhZ2dhYmxlLWRyb3BwYWJsZSc7XG5pbXBvcnQgeyBQbGFjZW1lbnRBcnJheSB9IGZyb20gJ3Bvc2l0aW9uaW5nJztcblxuZXhwb3J0IGludGVyZmFjZSBXZWVrVmlld0FsbERheUV2ZW50UmVzaXplIHtcbiAgb3JpZ2luYWxPZmZzZXQ6IG51bWJlcjtcbiAgb3JpZ2luYWxTcGFuOiBudW1iZXI7XG4gIGVkZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDYWxlbmRhcldlZWtWaWV3QmVmb3JlUmVuZGVyRXZlbnQgZXh0ZW5kcyBXZWVrVmlldyB7XG4gIGhlYWRlcjogV2Vla0RheVtdO1xufVxuXG4vKipcbiAqIFNob3dzIGFsbCBldmVudHMgb24gYSBnaXZlbiB3ZWVrLiBFeGFtcGxlIHVzYWdlOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIDxtd2wtY2FsZW5kYXItd2Vlay12aWV3XG4gKiAgW3ZpZXdEYXRlXT1cInZpZXdEYXRlXCJcbiAqICBbZXZlbnRzXT1cImV2ZW50c1wiPlxuICogPC9td2wtY2FsZW5kYXItd2Vlay12aWV3PlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ213bC1jYWxlbmRhci13ZWVrLXZpZXcnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJjYWwtd2Vlay12aWV3XCIgcm9sZT1cImdyaWRcIj5cbiAgICAgIDxtd2wtY2FsZW5kYXItd2Vlay12aWV3LWhlYWRlclxuICAgICAgICBbZGF5c109XCJkYXlzXCJcbiAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxuICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiaGVhZGVyVGVtcGxhdGVcIlxuICAgICAgICAoZGF5SGVhZGVyQ2xpY2tlZCk9XCJkYXlIZWFkZXJDbGlja2VkLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgIChldmVudERyb3BwZWQpPVwiXG4gICAgICAgICAgZXZlbnREcm9wcGVkKHsgZHJvcERhdGE6ICRldmVudCB9LCAkZXZlbnQubmV3U3RhcnQsIHRydWUpXG4gICAgICAgIFwiXG4gICAgICAgIChkcmFnRW50ZXIpPVwiZGF0ZURyYWdFbnRlcigkZXZlbnQuZGF0ZSlcIlxuICAgICAgPlxuICAgICAgPC9td2wtY2FsZW5kYXItd2Vlay12aWV3LWhlYWRlcj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJjYWwtYWxsLWRheS1ldmVudHNcIlxuICAgICAgICAjYWxsRGF5RXZlbnRzQ29udGFpbmVyXG4gICAgICAgICpuZ0lmPVwidmlldy5hbGxEYXlFdmVudFJvd3MubGVuZ3RoID4gMFwiXG4gICAgICAgIG13bERyb3BwYWJsZVxuICAgICAgICAoZHJhZ0VudGVyKT1cImRyYWdFbnRlcignYWxsRGF5JylcIlxuICAgICAgICAoZHJhZ0xlYXZlKT1cImRyYWdMZWF2ZSgnYWxsRGF5JylcIlxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsLWRheS1jb2x1bW5zXCI+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9XCJjYWwtdGltZS1sYWJlbC1jb2x1bW5cIlxuICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiYWxsRGF5RXZlbnRzTGFiZWxUZW1wbGF0ZVwiXG4gICAgICAgICAgPjwvZGl2PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwiY2FsLWRheS1jb2x1bW5cIlxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGRheSBvZiBkYXlzOyB0cmFja0J5OiB0cmFja0J5V2Vla0RheUhlYWRlckRhdGVcIlxuICAgICAgICAgICAgbXdsRHJvcHBhYmxlXG4gICAgICAgICAgICBkcmFnT3ZlckNsYXNzPVwiY2FsLWRyYWctb3ZlclwiXG4gICAgICAgICAgICAoZHJvcCk9XCJldmVudERyb3BwZWQoJGV2ZW50LCBkYXkuZGF0ZSwgdHJ1ZSlcIlxuICAgICAgICAgICAgKGRyYWdFbnRlcik9XCJkYXRlRHJhZ0VudGVyKGRheS5kYXRlKVwiXG4gICAgICAgICAgPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBldmVudFJvdyBvZiB2aWV3LmFsbERheUV2ZW50Um93czsgdHJhY2tCeTogdHJhY2tCeUlkXCJcbiAgICAgICAgICAjZXZlbnRSb3dDb250YWluZXJcbiAgICAgICAgICBjbGFzcz1cImNhbC1ldmVudHMtcm93XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICpuZ0Zvcj1cIlxuICAgICAgICAgICAgICBsZXQgYWxsRGF5RXZlbnQgb2YgZXZlbnRSb3cucm93O1xuICAgICAgICAgICAgICB0cmFja0J5OiB0cmFja0J5V2Vla0FsbERheUV2ZW50XG4gICAgICAgICAgICBcIlxuICAgICAgICAgICAgI2V2ZW50XG4gICAgICAgICAgICBjbGFzcz1cImNhbC1ldmVudC1jb250YWluZXJcIlxuICAgICAgICAgICAgW2NsYXNzLmNhbC1kcmFnZ2FibGVdPVwiXG4gICAgICAgICAgICAgIGFsbERheUV2ZW50LmV2ZW50LmRyYWdnYWJsZSAmJiBhbGxEYXlFdmVudFJlc2l6ZXMuc2l6ZSA9PT0gMFxuICAgICAgICAgICAgXCJcbiAgICAgICAgICAgIFtjbGFzcy5jYWwtc3RhcnRzLXdpdGhpbi13ZWVrXT1cIiFhbGxEYXlFdmVudC5zdGFydHNCZWZvcmVXZWVrXCJcbiAgICAgICAgICAgIFtjbGFzcy5jYWwtZW5kcy13aXRoaW4td2Vla109XCIhYWxsRGF5RXZlbnQuZW5kc0FmdGVyV2Vla1wiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJhbGxEYXlFdmVudC5ldmVudD8uY3NzQ2xhc3NcIlxuICAgICAgICAgICAgW3N0eWxlLndpZHRoLiVdPVwiKDEwMCAvIGRheXMubGVuZ3RoKSAqIGFsbERheUV2ZW50LnNwYW5cIlxuICAgICAgICAgICAgW3N0eWxlLm1hcmdpbkxlZnQuJV09XCIoMTAwIC8gZGF5cy5sZW5ndGgpICogYWxsRGF5RXZlbnQub2Zmc2V0XCJcbiAgICAgICAgICAgIG13bFJlc2l6YWJsZVxuICAgICAgICAgICAgW3Jlc2l6ZVNuYXBHcmlkXT1cInsgbGVmdDogZGF5Q29sdW1uV2lkdGgsIHJpZ2h0OiBkYXlDb2x1bW5XaWR0aCB9XCJcbiAgICAgICAgICAgIFt2YWxpZGF0ZVJlc2l6ZV09XCJ2YWxpZGF0ZVJlc2l6ZVwiXG4gICAgICAgICAgICAocmVzaXplU3RhcnQpPVwiXG4gICAgICAgICAgICAgIGFsbERheUV2ZW50UmVzaXplU3RhcnRlZChldmVudFJvd0NvbnRhaW5lciwgYWxsRGF5RXZlbnQsICRldmVudClcbiAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAocmVzaXppbmcpPVwiXG4gICAgICAgICAgICAgIGFsbERheUV2ZW50UmVzaXppbmcoYWxsRGF5RXZlbnQsICRldmVudCwgZGF5Q29sdW1uV2lkdGgpXG4gICAgICAgICAgICBcIlxuICAgICAgICAgICAgKHJlc2l6ZUVuZCk9XCJhbGxEYXlFdmVudFJlc2l6ZUVuZGVkKGFsbERheUV2ZW50KVwiXG4gICAgICAgICAgICBtd2xEcmFnZ2FibGVcbiAgICAgICAgICAgIGRyYWdBY3RpdmVDbGFzcz1cImNhbC1kcmFnLWFjdGl2ZVwiXG4gICAgICAgICAgICBbZHJvcERhdGFdPVwieyBldmVudDogYWxsRGF5RXZlbnQuZXZlbnQsIGNhbGVuZGFySWQ6IGNhbGVuZGFySWQgfVwiXG4gICAgICAgICAgICBbZHJhZ0F4aXNdPVwie1xuICAgICAgICAgICAgICB4OiBhbGxEYXlFdmVudC5ldmVudC5kcmFnZ2FibGUgJiYgYWxsRGF5RXZlbnRSZXNpemVzLnNpemUgPT09IDAsXG4gICAgICAgICAgICAgIHk6XG4gICAgICAgICAgICAgICAgIXNuYXBEcmFnZ2VkRXZlbnRzICYmXG4gICAgICAgICAgICAgICAgYWxsRGF5RXZlbnQuZXZlbnQuZHJhZ2dhYmxlICYmXG4gICAgICAgICAgICAgICAgYWxsRGF5RXZlbnRSZXNpemVzLnNpemUgPT09IDBcbiAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgW2RyYWdTbmFwR3JpZF09XCJzbmFwRHJhZ2dlZEV2ZW50cyA/IHsgeDogZGF5Q29sdW1uV2lkdGggfSA6IHt9XCJcbiAgICAgICAgICAgIFt2YWxpZGF0ZURyYWddPVwidmFsaWRhdGVEcmFnXCJcbiAgICAgICAgICAgIFt0b3VjaFN0YXJ0TG9uZ1ByZXNzXT1cInsgZGVsYXk6IDMwMCwgZGVsdGE6IDMwIH1cIlxuICAgICAgICAgICAgKGRyYWdTdGFydCk9XCJkcmFnU3RhcnRlZChldmVudFJvd0NvbnRhaW5lciwgZXZlbnQpXCJcbiAgICAgICAgICAgIChkcmFnZ2luZyk9XCJhbGxEYXlFdmVudERyYWdNb3ZlKClcIlxuICAgICAgICAgICAgKGRyYWdFbmQpPVwiZHJhZ0VuZGVkKGFsbERheUV2ZW50LCAkZXZlbnQsIGRheUNvbHVtbldpZHRoKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzcz1cImNhbC1yZXNpemUtaGFuZGxlIGNhbC1yZXNpemUtaGFuZGxlLWJlZm9yZS1zdGFydFwiXG4gICAgICAgICAgICAgICpuZ0lmPVwiXG4gICAgICAgICAgICAgICAgYWxsRGF5RXZlbnQuZXZlbnQ/LnJlc2l6YWJsZT8uYmVmb3JlU3RhcnQgJiZcbiAgICAgICAgICAgICAgICAhYWxsRGF5RXZlbnQuc3RhcnRzQmVmb3JlV2Vla1xuICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICBtd2xSZXNpemVIYW5kbGVcbiAgICAgICAgICAgICAgW3Jlc2l6ZUVkZ2VzXT1cInsgbGVmdDogdHJ1ZSB9XCJcbiAgICAgICAgICAgID48L2Rpdj5cbiAgICAgICAgICAgIDxtd2wtY2FsZW5kYXItd2Vlay12aWV3LWV2ZW50XG4gICAgICAgICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcbiAgICAgICAgICAgICAgW3dlZWtFdmVudF09XCJhbGxEYXlFdmVudFwiXG4gICAgICAgICAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cInRvb2x0aXBQbGFjZW1lbnRcIlxuICAgICAgICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgIFt0b29sdGlwQXBwZW5kVG9Cb2R5XT1cInRvb2x0aXBBcHBlbmRUb0JvZHlcIlxuICAgICAgICAgICAgICBbdG9vbHRpcERlbGF5XT1cInRvb2x0aXBEZWxheVwiXG4gICAgICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJldmVudFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgW2V2ZW50VGl0bGVUZW1wbGF0ZV09XCJldmVudFRpdGxlVGVtcGxhdGVcIlxuICAgICAgICAgICAgICBbZXZlbnRBY3Rpb25zVGVtcGxhdGVdPVwiZXZlbnRBY3Rpb25zVGVtcGxhdGVcIlxuICAgICAgICAgICAgICBbZGF5c0luV2Vla109XCJkYXlzSW5XZWVrXCJcbiAgICAgICAgICAgICAgKGV2ZW50Q2xpY2tlZCk9XCJcbiAgICAgICAgICAgICAgICBldmVudENsaWNrZWQuZW1pdCh7XG4gICAgICAgICAgICAgICAgICBldmVudDogYWxsRGF5RXZlbnQuZXZlbnQsXG4gICAgICAgICAgICAgICAgICBzb3VyY2VFdmVudDogJGV2ZW50LnNvdXJjZUV2ZW50XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgIDwvbXdsLWNhbGVuZGFyLXdlZWstdmlldy1ldmVudD5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3M9XCJjYWwtcmVzaXplLWhhbmRsZSBjYWwtcmVzaXplLWhhbmRsZS1hZnRlci1lbmRcIlxuICAgICAgICAgICAgICAqbmdJZj1cIlxuICAgICAgICAgICAgICAgIGFsbERheUV2ZW50LmV2ZW50Py5yZXNpemFibGU/LmFmdGVyRW5kICYmXG4gICAgICAgICAgICAgICAgIWFsbERheUV2ZW50LmVuZHNBZnRlcldlZWtcbiAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgbXdsUmVzaXplSGFuZGxlXG4gICAgICAgICAgICAgIFtyZXNpemVFZGdlc109XCJ7IHJpZ2h0OiB0cnVlIH1cIlxuICAgICAgICAgICAgPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cImNhbC10aW1lLWV2ZW50c1wiXG4gICAgICAgIG13bERyb3BwYWJsZVxuICAgICAgICAoZHJhZ0VudGVyKT1cImRyYWdFbnRlcigndGltZScpXCJcbiAgICAgICAgKGRyYWdMZWF2ZSk9XCJkcmFnTGVhdmUoJ3RpbWUnKVwiXG4gICAgICA+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cImNhbC10aW1lLWxhYmVsLWNvbHVtblwiXG4gICAgICAgICAgKm5nSWY9XCJ2aWV3LmhvdXJDb2x1bW5zLmxlbmd0aCA+IDAgJiYgZGF5c0luV2VlayAhPT0gMVwiXG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAqbmdGb3I9XCJcbiAgICAgICAgICAgICAgbGV0IGhvdXIgb2Ygdmlldy5ob3VyQ29sdW1uc1swXS5ob3VycztcbiAgICAgICAgICAgICAgdHJhY2tCeTogdHJhY2tCeUhvdXI7XG4gICAgICAgICAgICAgIGxldCBvZGQgPSBvZGRcbiAgICAgICAgICAgIFwiXG4gICAgICAgICAgICBjbGFzcz1cImNhbC1ob3VyXCJcbiAgICAgICAgICAgIFtjbGFzcy5jYWwtaG91ci1vZGRdPVwib2RkXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8bXdsLWNhbGVuZGFyLXdlZWstdmlldy1ob3VyLXNlZ21lbnRcbiAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IHNlZ21lbnQgb2YgaG91ci5zZWdtZW50czsgdHJhY2tCeTogdHJhY2tCeUhvdXJTZWdtZW50XCJcbiAgICAgICAgICAgICAgW3N0eWxlLmhlaWdodC5weF09XCJob3VyU2VnbWVudEhlaWdodFwiXG4gICAgICAgICAgICAgIFtzZWdtZW50XT1cInNlZ21lbnRcIlxuICAgICAgICAgICAgICBbc2VnbWVudEhlaWdodF09XCJob3VyU2VnbWVudEhlaWdodFwiXG4gICAgICAgICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcbiAgICAgICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImhvdXJTZWdtZW50VGVtcGxhdGVcIlxuICAgICAgICAgICAgICBbaXNUaW1lTGFiZWxdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgIFtkYXlzSW5XZWVrXT1cImRheXNJbldlZWtcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgPC9td2wtY2FsZW5kYXItd2Vlay12aWV3LWhvdXItc2VnbWVudD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cImNhbC1kYXktY29sdW1uc1wiXG4gICAgICAgICAgW2NsYXNzLmNhbC1yZXNpemUtYWN0aXZlXT1cInRpbWVFdmVudFJlc2l6ZXMuc2l6ZSA+IDBcIlxuICAgICAgICAgICNkYXlDb2x1bW5zXG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzcz1cImNhbC1kYXktY29sdW1uXCJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBjb2x1bW4gb2Ygdmlldy5ob3VyQ29sdW1uczsgdHJhY2tCeTogdHJhY2tCeUhvdXJDb2x1bW5cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxtd2wtY2FsZW5kYXItd2Vlay12aWV3LWN1cnJlbnQtdGltZS1tYXJrZXJcbiAgICAgICAgICAgICAgW2NvbHVtbkRhdGVdPVwiY29sdW1uLmRhdGVcIlxuICAgICAgICAgICAgICBbZGF5U3RhcnRIb3VyXT1cImRheVN0YXJ0SG91clwiXG4gICAgICAgICAgICAgIFtkYXlTdGFydE1pbnV0ZV09XCJkYXlTdGFydE1pbnV0ZVwiXG4gICAgICAgICAgICAgIFtkYXlFbmRIb3VyXT1cImRheUVuZEhvdXJcIlxuICAgICAgICAgICAgICBbZGF5RW5kTWludXRlXT1cImRheUVuZE1pbnV0ZVwiXG4gICAgICAgICAgICAgIFtob3VyU2VnbWVudHNdPVwiaG91clNlZ21lbnRzXCJcbiAgICAgICAgICAgICAgW2hvdXJTZWdtZW50SGVpZ2h0XT1cImhvdXJTZWdtZW50SGVpZ2h0XCJcbiAgICAgICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImN1cnJlbnRUaW1lTWFya2VyVGVtcGxhdGVcIlxuICAgICAgICAgICAgPjwvbXdsLWNhbGVuZGFyLXdlZWstdmlldy1jdXJyZW50LXRpbWUtbWFya2VyPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhbC1ldmVudHMtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAqbmdGb3I9XCJcbiAgICAgICAgICAgICAgICAgIGxldCB0aW1lRXZlbnQgb2YgY29sdW1uLmV2ZW50cztcbiAgICAgICAgICAgICAgICAgIHRyYWNrQnk6IHRyYWNrQnlXZWVrVGltZUV2ZW50XG4gICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAjZXZlbnRcbiAgICAgICAgICAgICAgICBjbGFzcz1cImNhbC1ldmVudC1jb250YWluZXJcIlxuICAgICAgICAgICAgICAgIFtjbGFzcy5jYWwtZHJhZ2dhYmxlXT1cIlxuICAgICAgICAgICAgICAgICAgdGltZUV2ZW50LmV2ZW50LmRyYWdnYWJsZSAmJiB0aW1lRXZlbnRSZXNpemVzLnNpemUgPT09IDBcbiAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgIFtjbGFzcy5jYWwtc3RhcnRzLXdpdGhpbi1kYXldPVwiIXRpbWVFdmVudC5zdGFydHNCZWZvcmVEYXlcIlxuICAgICAgICAgICAgICAgIFtjbGFzcy5jYWwtZW5kcy13aXRoaW4tZGF5XT1cIiF0aW1lRXZlbnQuZW5kc0FmdGVyRGF5XCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ0aW1lRXZlbnQuZXZlbnQuY3NzQ2xhc3NcIlxuICAgICAgICAgICAgICAgIFtoaWRkZW5dPVwidGltZUV2ZW50LmhlaWdodCA9PT0gMCAmJiB0aW1lRXZlbnQud2lkdGggPT09IDBcIlxuICAgICAgICAgICAgICAgIFtzdHlsZS50b3AucHhdPVwidGltZUV2ZW50LnRvcFwiXG4gICAgICAgICAgICAgICAgW3N0eWxlLmhlaWdodC5weF09XCJ0aW1lRXZlbnQuaGVpZ2h0XCJcbiAgICAgICAgICAgICAgICBbc3R5bGUubGVmdC4lXT1cInRpbWVFdmVudC5sZWZ0XCJcbiAgICAgICAgICAgICAgICBbc3R5bGUud2lkdGguJV09XCJ0aW1lRXZlbnQud2lkdGhcIlxuICAgICAgICAgICAgICAgIG13bFJlc2l6YWJsZVxuICAgICAgICAgICAgICAgIFtyZXNpemVTbmFwR3JpZF09XCJ7XG4gICAgICAgICAgICAgICAgICBsZWZ0OiBkYXlDb2x1bW5XaWR0aCxcbiAgICAgICAgICAgICAgICAgIHJpZ2h0OiBkYXlDb2x1bW5XaWR0aCxcbiAgICAgICAgICAgICAgICAgIHRvcDogZXZlbnRTbmFwU2l6ZSB8fCBob3VyU2VnbWVudEhlaWdodCxcbiAgICAgICAgICAgICAgICAgIGJvdHRvbTogZXZlbnRTbmFwU2l6ZSB8fCBob3VyU2VnbWVudEhlaWdodFxuICAgICAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgICAgIFt2YWxpZGF0ZVJlc2l6ZV09XCJ2YWxpZGF0ZVJlc2l6ZVwiXG4gICAgICAgICAgICAgICAgW2FsbG93TmVnYXRpdmVSZXNpemVzXT1cInRydWVcIlxuICAgICAgICAgICAgICAgIChyZXNpemVTdGFydCk9XCJcbiAgICAgICAgICAgICAgICAgIHRpbWVFdmVudFJlc2l6ZVN0YXJ0ZWQoZGF5Q29sdW1ucywgdGltZUV2ZW50LCAkZXZlbnQpXG4gICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAocmVzaXppbmcpPVwidGltZUV2ZW50UmVzaXppbmcodGltZUV2ZW50LCAkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAocmVzaXplRW5kKT1cInRpbWVFdmVudFJlc2l6ZUVuZGVkKHRpbWVFdmVudClcIlxuICAgICAgICAgICAgICAgIG13bERyYWdnYWJsZVxuICAgICAgICAgICAgICAgIGRyYWdBY3RpdmVDbGFzcz1cImNhbC1kcmFnLWFjdGl2ZVwiXG4gICAgICAgICAgICAgICAgW2Ryb3BEYXRhXT1cInsgZXZlbnQ6IHRpbWVFdmVudC5ldmVudCwgY2FsZW5kYXJJZDogY2FsZW5kYXJJZCB9XCJcbiAgICAgICAgICAgICAgICBbZHJhZ0F4aXNdPVwie1xuICAgICAgICAgICAgICAgICAgeDogdGltZUV2ZW50LmV2ZW50LmRyYWdnYWJsZSAmJiB0aW1lRXZlbnRSZXNpemVzLnNpemUgPT09IDAsXG4gICAgICAgICAgICAgICAgICB5OiB0aW1lRXZlbnQuZXZlbnQuZHJhZ2dhYmxlICYmIHRpbWVFdmVudFJlc2l6ZXMuc2l6ZSA9PT0gMFxuICAgICAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgICAgIFtkcmFnU25hcEdyaWRdPVwiXG4gICAgICAgICAgICAgICAgICBzbmFwRHJhZ2dlZEV2ZW50c1xuICAgICAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IGRheUNvbHVtbldpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogZXZlbnRTbmFwU2l6ZSB8fCBob3VyU2VnbWVudEhlaWdodFxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgOiB7fVxuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgW3RvdWNoU3RhcnRMb25nUHJlc3NdPVwieyBkZWxheTogMzAwLCBkZWx0YTogMzAgfVwiXG4gICAgICAgICAgICAgICAgW2dob3N0RHJhZ0VuYWJsZWRdPVwiIXNuYXBEcmFnZ2VkRXZlbnRzXCJcbiAgICAgICAgICAgICAgICBbZ2hvc3RFbGVtZW50VGVtcGxhdGVdPVwid2Vla0V2ZW50VGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIFt2YWxpZGF0ZURyYWddPVwidmFsaWRhdGVEcmFnXCJcbiAgICAgICAgICAgICAgICAoZHJhZ1N0YXJ0KT1cImRyYWdTdGFydGVkKGRheUNvbHVtbnMsIGV2ZW50LCB0aW1lRXZlbnQpXCJcbiAgICAgICAgICAgICAgICAoZHJhZ2dpbmcpPVwiZHJhZ01vdmUodGltZUV2ZW50LCAkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAoZHJhZ0VuZCk9XCJkcmFnRW5kZWQodGltZUV2ZW50LCAkZXZlbnQsIGRheUNvbHVtbldpZHRoLCB0cnVlKVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICBjbGFzcz1cImNhbC1yZXNpemUtaGFuZGxlIGNhbC1yZXNpemUtaGFuZGxlLWJlZm9yZS1zdGFydFwiXG4gICAgICAgICAgICAgICAgICAqbmdJZj1cIlxuICAgICAgICAgICAgICAgICAgICB0aW1lRXZlbnQuZXZlbnQ/LnJlc2l6YWJsZT8uYmVmb3JlU3RhcnQgJiZcbiAgICAgICAgICAgICAgICAgICAgIXRpbWVFdmVudC5zdGFydHNCZWZvcmVEYXlcbiAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICBtd2xSZXNpemVIYW5kbGVcbiAgICAgICAgICAgICAgICAgIFtyZXNpemVFZGdlc109XCJ7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogdHJ1ZVxuICAgICAgICAgICAgICAgICAgfVwiXG4gICAgICAgICAgICAgICAgPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwid2Vla0V2ZW50VGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgID48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjd2Vla0V2ZW50VGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICA8bXdsLWNhbGVuZGFyLXdlZWstdmlldy1ldmVudFxuICAgICAgICAgICAgICAgICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXG4gICAgICAgICAgICAgICAgICAgIFt3ZWVrRXZlbnRdPVwidGltZUV2ZW50XCJcbiAgICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBQbGFjZW1lbnRdPVwidG9vbHRpcFBsYWNlbWVudFwiXG4gICAgICAgICAgICAgICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBBcHBlbmRUb0JvZHldPVwidG9vbHRpcEFwcGVuZFRvQm9keVwiXG4gICAgICAgICAgICAgICAgICAgIFt0b29sdGlwRGlzYWJsZWRdPVwiZHJhZ0FjdGl2ZSB8fCB0aW1lRXZlbnRSZXNpemVzLnNpemUgPiAwXCJcbiAgICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBEZWxheV09XCJ0b29sdGlwRGVsYXlcIlxuICAgICAgICAgICAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiZXZlbnRUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgIFtldmVudFRpdGxlVGVtcGxhdGVdPVwiZXZlbnRUaXRsZVRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgW2V2ZW50QWN0aW9uc1RlbXBsYXRlXT1cImV2ZW50QWN0aW9uc1RlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgW2NvbHVtbl09XCJjb2x1bW5cIlxuICAgICAgICAgICAgICAgICAgICBbZGF5c0luV2Vla109XCJkYXlzSW5XZWVrXCJcbiAgICAgICAgICAgICAgICAgICAgKGV2ZW50Q2xpY2tlZCk9XCJcbiAgICAgICAgICAgICAgICAgICAgICBldmVudENsaWNrZWQuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudDogdGltZUV2ZW50LmV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlRXZlbnQ6ICRldmVudC5zb3VyY2VFdmVudFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8L213bC1jYWxlbmRhci13ZWVrLXZpZXctZXZlbnQ+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICBjbGFzcz1cImNhbC1yZXNpemUtaGFuZGxlIGNhbC1yZXNpemUtaGFuZGxlLWFmdGVyLWVuZFwiXG4gICAgICAgICAgICAgICAgICAqbmdJZj1cIlxuICAgICAgICAgICAgICAgICAgICB0aW1lRXZlbnQuZXZlbnQ/LnJlc2l6YWJsZT8uYWZ0ZXJFbmQgJiZcbiAgICAgICAgICAgICAgICAgICAgIXRpbWVFdmVudC5lbmRzQWZ0ZXJEYXlcbiAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICBtd2xSZXNpemVIYW5kbGVcbiAgICAgICAgICAgICAgICAgIFtyZXNpemVFZGdlc109XCJ7XG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBib3R0b206IHRydWVcbiAgICAgICAgICAgICAgICAgIH1cIlxuICAgICAgICAgICAgICAgID48L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAqbmdGb3I9XCJcbiAgICAgICAgICAgICAgICBsZXQgaG91ciBvZiBjb2x1bW4uaG91cnM7XG4gICAgICAgICAgICAgICAgdHJhY2tCeTogdHJhY2tCeUhvdXI7XG4gICAgICAgICAgICAgICAgbGV0IG9kZCA9IG9kZFxuICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICBjbGFzcz1cImNhbC1ob3VyXCJcbiAgICAgICAgICAgICAgW2NsYXNzLmNhbC1ob3VyLW9kZF09XCJvZGRcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8bXdsLWNhbGVuZGFyLXdlZWstdmlldy1ob3VyLXNlZ21lbnRcbiAgICAgICAgICAgICAgICAqbmdGb3I9XCJcbiAgICAgICAgICAgICAgICAgIGxldCBzZWdtZW50IG9mIGhvdXIuc2VnbWVudHM7XG4gICAgICAgICAgICAgICAgICB0cmFja0J5OiB0cmFja0J5SG91clNlZ21lbnRcbiAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgIFtzdHlsZS5oZWlnaHQucHhdPVwiaG91clNlZ21lbnRIZWlnaHRcIlxuICAgICAgICAgICAgICAgIFtzZWdtZW50XT1cInNlZ21lbnRcIlxuICAgICAgICAgICAgICAgIFtzZWdtZW50SGVpZ2h0XT1cImhvdXJTZWdtZW50SGVpZ2h0XCJcbiAgICAgICAgICAgICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXG4gICAgICAgICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImhvdXJTZWdtZW50VGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIFtkYXlzSW5XZWVrXT1cImRheXNJbldlZWtcIlxuICAgICAgICAgICAgICAgIChtd2xDbGljayk9XCJcbiAgICAgICAgICAgICAgICAgIGhvdXJTZWdtZW50Q2xpY2tlZC5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZTogc2VnbWVudC5kYXRlLFxuICAgICAgICAgICAgICAgICAgICBzb3VyY2VFdmVudDogJGV2ZW50XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgW2NsaWNrTGlzdGVuZXJEaXNhYmxlZF09XCJcbiAgICAgICAgICAgICAgICAgIGhvdXJTZWdtZW50Q2xpY2tlZC5vYnNlcnZlcnMubGVuZ3RoID09PSAwXG4gICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICBtd2xEcm9wcGFibGVcbiAgICAgICAgICAgICAgICBbZHJhZ092ZXJDbGFzc109XCJcbiAgICAgICAgICAgICAgICAgICFkcmFnQWN0aXZlIHx8ICFzbmFwRHJhZ2dlZEV2ZW50cyA/ICdjYWwtZHJhZy1vdmVyJyA6IG51bGxcbiAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgIGRyYWdBY3RpdmVDbGFzcz1cImNhbC1kcmFnLWFjdGl2ZVwiXG4gICAgICAgICAgICAgICAgKGRyb3ApPVwiZXZlbnREcm9wcGVkKCRldmVudCwgc2VnbWVudC5kYXRlLCBmYWxzZSlcIlxuICAgICAgICAgICAgICAgIChkcmFnRW50ZXIpPVwiZGF0ZURyYWdFbnRlcihzZWdtZW50LmRhdGUpXCJcbiAgICAgICAgICAgICAgICBbaXNUaW1lTGFiZWxdPVwiZGF5c0luV2VlayA9PT0gMVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPC9td2wtY2FsZW5kYXItd2Vlay12aWV3LWhvdXItc2VnbWVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhcldlZWtWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCB2aWV3IGRhdGVcbiAgICovXG4gIEBJbnB1dCgpIHZpZXdEYXRlOiBEYXRlO1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBldmVudHMgdG8gZGlzcGxheSBvbiB2aWV3XG4gICAqIFRoZSBzY2hlbWEgaXMgYXZhaWxhYmxlIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tYXR0bGV3aXM5Mi9jYWxlbmRhci11dGlscy9ibG9iL2M1MTY4OTk4NWY1OWEyNzE5NDBlMzBiYzRlMmM0ZTFmZWUzZmNiNWMvc3JjL2NhbGVuZGFyVXRpbHMudHMjTDQ5LUw2M1xuICAgKi9cbiAgQElucHV0KCkgZXZlbnRzOiBDYWxlbmRhckV2ZW50W10gPSBbXTtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgZGF5IGluZGV4ZXMgKDAgPSBzdW5kYXksIDEgPSBtb25kYXkgZXRjKSB0aGF0IHdpbGwgYmUgaGlkZGVuIG9uIHRoZSB2aWV3XG4gICAqL1xuICBASW5wdXQoKSBleGNsdWRlRGF5czogbnVtYmVyW10gPSBbXTtcblxuICAvKipcbiAgICogQW4gb2JzZXJ2YWJsZSB0aGF0IHdoZW4gZW1pdHRlZCBvbiB3aWxsIHJlLXJlbmRlciB0aGUgY3VycmVudCB2aWV3XG4gICAqL1xuICBASW5wdXQoKSByZWZyZXNoOiBTdWJqZWN0PGFueT47XG5cbiAgLyoqXG4gICAqIFRoZSBsb2NhbGUgdXNlZCB0byBmb3JtYXQgZGF0ZXNcbiAgICovXG4gIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgcGxhY2VtZW50IG9mIHRoZSBldmVudCB0b29sdGlwXG4gICAqL1xuICBASW5wdXQoKSB0b29sdGlwUGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheSA9ICdhdXRvJztcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciB0aGUgZXZlbnQgdG9vbHRpcHNcbiAgICovXG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogV2hldGhlciB0byBhcHBlbmQgdG9vbHRpcHMgdG8gdGhlIGJvZHkgb3IgbmV4dCB0byB0aGUgdHJpZ2dlciBlbGVtZW50XG4gICAqL1xuICBASW5wdXQoKSB0b29sdGlwQXBwZW5kVG9Cb2R5OiBib29sZWFuID0gdHJ1ZTtcblxuICAvKipcbiAgICogVGhlIGRlbGF5IGluIG1pbGxpc2Vjb25kcyBiZWZvcmUgdGhlIHRvb2x0aXAgc2hvdWxkIGJlIGRpc3BsYXllZC4gSWYgbm90IHByb3ZpZGVkIHRoZSB0b29sdGlwXG4gICAqIHdpbGwgYmUgZGlzcGxheWVkIGltbWVkaWF0ZWx5LlxuICAgKi9cbiAgQElucHV0KCkgdG9vbHRpcERlbGF5OiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAvKipcbiAgICogVGhlIHN0YXJ0IG51bWJlciBvZiB0aGUgd2Vlay5cbiAgICogVGhpcyBpcyBpZ25vcmVkIHdoZW4gdGhlIGBkYXlzSW5XZWVrYCBpbnB1dCBpcyBhbHNvIHNldCBhcyB0aGUgYHZpZXdEYXRlYCB3aWxsIGJlIHVzZWQgYXMgdGhlIHN0YXJ0IG9mIHRoZSB3ZWVrIGluc3RlYWQuXG4gICAqIE5vdGUsIHlvdSBzaG91bGQgYWxzbyBwYXNzIHRoaXMgdG8gdGhlIGNhbGVuZGFyIHRpdGxlIHBpcGUgc28gaXQgc2hvd3MgdGhlIHNhbWUgZGF5czoge3sgdmlld0RhdGUgfCBjYWxlbmRhckRhdGU6KHZpZXcgKyAnVmlld1RpdGxlJyk6bG9jYWxlOndlZWtTdGFydHNPbiB9fVxuICAgKiBJZiB1c2luZyB0aGUgbW9tZW50IGRhdGUgYWRhcHRlciB0aGlzIG9wdGlvbiB3b24ndCBkbyBhbnl0aGluZyBhbmQgeW91J2xsIG5lZWQgdG8gc2V0IGl0IGdsb2JhbGx5IGxpa2Ugc286XG4gICAqIGBgYFxuICAgKiBtb21lbnQudXBkYXRlTG9jYWxlKCdlbicsIHtcbiAgICogICB3ZWVrOiB7XG4gICAqICAgICBkb3c6IDEsIC8vIHNldCBzdGFydCBvZiB3ZWVrIHRvIG1vbmRheSBpbnN0ZWFkXG4gICAqICAgICBkb3k6IDAsXG4gICAqICAgfSxcbiAgICogfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgQElucHV0KCkgd2Vla1N0YXJ0c09uOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSB0byByZXBsYWNlIHRoZSBoZWFkZXJcbiAgICovXG4gIEBJbnB1dCgpIGhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIHdlZWsgdmlldyBldmVudHNcbiAgICovXG4gIEBJbnB1dCgpIGV2ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3IgZXZlbnQgdGl0bGVzXG4gICAqL1xuICBASW5wdXQoKSBldmVudFRpdGxlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3IgZXZlbnQgYWN0aW9uc1xuICAgKi9cbiAgQElucHV0KCkgZXZlbnRBY3Rpb25zVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIFRoZSBwcmVjaXNpb24gdG8gZGlzcGxheSBldmVudHMuXG4gICAqIGBkYXlzYCB3aWxsIHJvdW5kIGV2ZW50IHN0YXJ0IGFuZCBlbmQgZGF0ZXMgdG8gdGhlIG5lYXJlc3QgZGF5IGFuZCBgbWludXRlc2Agd2lsbCBub3QgZG8gdGhpcyByb3VuZGluZ1xuICAgKi9cbiAgQElucHV0KCkgcHJlY2lzaW9uOiAnZGF5cycgfCAnbWludXRlcycgPSAnZGF5cyc7XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGRheSBpbmRleGVzICgwID0gc3VuZGF5LCAxID0gbW9uZGF5IGV0YykgdGhhdCBpbmRpY2F0ZSB3aGljaCBkYXlzIGFyZSB3ZWVrZW5kc1xuICAgKi9cbiAgQElucHV0KCkgd2Vla2VuZERheXM6IG51bWJlcltdO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIHNuYXAgZXZlbnRzIHRvIGEgZ3JpZCB3aGVuIGRyYWdnaW5nXG4gICAqL1xuICBASW5wdXQoKSBzbmFwRHJhZ2dlZEV2ZW50czogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgb2Ygc2VnbWVudHMgaW4gYW4gaG91ci4gTXVzdCBkaXZpZGUgZXF1YWxseSBpbnRvIDYwLlxuICAgKi9cbiAgQElucHV0KCkgaG91clNlZ21lbnRzOiBudW1iZXIgPSAyO1xuXG4gIC8qKlxuICAgKiBUaGUgaGVpZ2h0IGluIHBpeGVscyBvZiBlYWNoIGhvdXIgc2VnbWVudFxuICAgKi9cbiAgQElucHV0KCkgaG91clNlZ21lbnRIZWlnaHQ6IG51bWJlciA9IDMwO1xuXG4gIC8qKlxuICAgKiBUaGUgZGF5IHN0YXJ0IGhvdXJzIGluIDI0IGhvdXIgdGltZS4gTXVzdCBiZSAwLTIzXG4gICAqL1xuICBASW5wdXQoKSBkYXlTdGFydEhvdXI6IG51bWJlciA9IDA7XG5cbiAgLyoqXG4gICAqIFRoZSBkYXkgc3RhcnQgbWludXRlcy4gTXVzdCBiZSAwLTU5XG4gICAqL1xuICBASW5wdXQoKSBkYXlTdGFydE1pbnV0ZTogbnVtYmVyID0gMDtcblxuICAvKipcbiAgICogVGhlIGRheSBlbmQgaG91cnMgaW4gMjQgaG91ciB0aW1lLiBNdXN0IGJlIDAtMjNcbiAgICovXG4gIEBJbnB1dCgpIGRheUVuZEhvdXI6IG51bWJlciA9IDIzO1xuXG4gIC8qKlxuICAgKiBUaGUgZGF5IGVuZCBtaW51dGVzLiBNdXN0IGJlIDAtNTlcbiAgICovXG4gIEBJbnB1dCgpIGRheUVuZE1pbnV0ZTogbnVtYmVyID0gNTk7XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSB0byByZXBsYWNlIHRoZSBob3VyIHNlZ21lbnRcbiAgICovXG4gIEBJbnB1dCgpIGhvdXJTZWdtZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIFRoZSBncmlkIHNpemUgdG8gc25hcCByZXNpemluZyBhbmQgZHJhZ2dpbmcgb2YgaG91cmx5IGV2ZW50cyB0b1xuICAgKi9cbiAgQElucHV0KCkgZXZlbnRTbmFwU2l6ZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIHRoZSBhbGwgZGF5IGV2ZW50cyBsYWJlbCB0ZXh0XG4gICAqL1xuICBASW5wdXQoKSBhbGxEYXlFdmVudHNMYWJlbFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIG9mIGRheXMgaW4gYSB3ZWVrLiBDYW4gYmUgdXNlZCB0byBjcmVhdGUgYSBzaG9ydGVyIG9yIGxvbmdlciB3ZWVrIHZpZXcuXG4gICAqIFRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsgd2lsbCBhbHdheXMgYmUgdGhlIGB2aWV3RGF0ZWAgYW5kIGB3ZWVrU3RhcnRzT25gIGlmIHNldCB3aWxsIGJlIGlnbm9yZWRcbiAgICovXG4gIEBJbnB1dCgpIGRheXNJbldlZWs6IG51bWJlcjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciB0aGUgY3VycmVudCB0aW1lIG1hcmtlclxuICAgKi9cbiAgQElucHV0KCkgY3VycmVudFRpbWVNYXJrZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYSBoZWFkZXIgd2VlayBkYXkgaXMgY2xpY2tlZC4gQWRkaW5nIGEgYGNzc0NsYXNzYCBwcm9wZXJ0eSBvbiBgJGV2ZW50LmRheWAgd2lsbCBhZGQgdGhhdCBjbGFzcyB0byB0aGUgaGVhZGVyIGVsZW1lbnRcbiAgICovXG4gIEBPdXRwdXQoKSBkYXlIZWFkZXJDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjx7XG4gICAgZGF5OiBXZWVrRGF5O1xuICAgIHNvdXJjZUV2ZW50OiBNb3VzZUV2ZW50O1xuICB9PigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgZXZlbnQgdGl0bGUgaXMgY2xpY2tlZFxuICAgKi9cbiAgQE91dHB1dCgpIGV2ZW50Q2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIGV2ZW50OiBDYWxlbmRhckV2ZW50O1xuICAgIHNvdXJjZUV2ZW50OiBNb3VzZUV2ZW50IHwgYW55O1xuICB9PigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhbiBldmVudCBpcyByZXNpemVkIG9yIGRyYWdnZWQgYW5kIGRyb3BwZWRcbiAgICovXG4gIEBPdXRwdXQoKSBldmVudFRpbWVzQ2hhbmdlZCA9XG4gICAgbmV3IEV2ZW50RW1pdHRlcjxDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIEFuIG91dHB1dCB0aGF0IHdpbGwgYmUgY2FsbGVkIGJlZm9yZSB0aGUgdmlldyBpcyByZW5kZXJlZCBmb3IgdGhlIGN1cnJlbnQgd2Vlay5cbiAgICogSWYgeW91IGFkZCB0aGUgYGNzc0NsYXNzYCBwcm9wZXJ0eSB0byBhIGRheSBpbiB0aGUgaGVhZGVyIGl0IHdpbGwgYWRkIHRoYXQgY2xhc3MgdG8gdGhlIGNlbGwgZWxlbWVudCBpbiB0aGUgdGVtcGxhdGVcbiAgICovXG4gIEBPdXRwdXQoKSBiZWZvcmVWaWV3UmVuZGVyID1cbiAgICBuZXcgRXZlbnRFbWl0dGVyPENhbGVuZGFyV2Vla1ZpZXdCZWZvcmVSZW5kZXJFdmVudD4oKTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYW4gaG91ciBzZWdtZW50IGlzIGNsaWNrZWRcbiAgICovXG4gIEBPdXRwdXQoKSBob3VyU2VnbWVudENsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHtcbiAgICBkYXRlOiBEYXRlO1xuICAgIHNvdXJjZUV2ZW50OiBNb3VzZUV2ZW50O1xuICB9PigpO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBkYXlzOiBXZWVrRGF5W107XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHZpZXc6IFdlZWtWaWV3O1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICByZWZyZXNoU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGFsbERheUV2ZW50UmVzaXplczogTWFwPFdlZWtWaWV3QWxsRGF5RXZlbnQsIFdlZWtWaWV3QWxsRGF5RXZlbnRSZXNpemU+ID1cbiAgICBuZXcgTWFwKCk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRpbWVFdmVudFJlc2l6ZXM6IE1hcDxDYWxlbmRhckV2ZW50LCBSZXNpemVFdmVudD4gPSBuZXcgTWFwKCk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGV2ZW50RHJhZ0VudGVyQnlUeXBlID0ge1xuICAgIGFsbERheTogMCxcbiAgICB0aW1lOiAwLFxuICB9O1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBkcmFnQWN0aXZlID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGRyYWdBbHJlYWR5TW92ZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdmFsaWRhdGVEcmFnOiBWYWxpZGF0ZURyYWc7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHZhbGlkYXRlUmVzaXplOiAoYXJnczogYW55KSA9PiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBkYXlDb2x1bW5XaWR0aDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBjYWxlbmRhcklkID0gU3ltYm9sKCdhbmd1bGFyIGNhbGVuZGFyIHdlZWsgdmlldyBpZCcpO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBsYXN0RHJhZ2dlZEV2ZW50OiBDYWxlbmRhckV2ZW50O1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB0cmFja0J5V2Vla0RheUhlYWRlckRhdGUgPSB0cmFja0J5V2Vla0RheUhlYWRlckRhdGU7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRyYWNrQnlIb3VyU2VnbWVudCA9IHRyYWNrQnlIb3VyU2VnbWVudDtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdHJhY2tCeUhvdXIgPSB0cmFja0J5SG91cjtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdHJhY2tCeVdlZWtBbGxEYXlFdmVudCA9IHRyYWNrQnlXZWVrQWxsRGF5RXZlbnQ7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRyYWNrQnlXZWVrVGltZUV2ZW50ID0gdHJhY2tCeVdlZWtUaW1lRXZlbnQ7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHByaXZhdGUgbGFzdERyYWdFbnRlckRhdGU6IERhdGU7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByb3RlY3RlZCB1dGlsczogQ2FsZW5kYXJVdGlscyxcbiAgICBASW5qZWN0KExPQ0FMRV9JRCkgbG9jYWxlOiBzdHJpbmcsXG4gICAgcHJvdGVjdGVkIGRhdGVBZGFwdGVyOiBEYXRlQWRhcHRlclxuICApIHtcbiAgICB0aGlzLmxvY2FsZSA9IGxvY2FsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB0cmFja0J5SG91ckNvbHVtbiA9IChpbmRleDogbnVtYmVyLCBjb2x1bW46IFdlZWtWaWV3SG91ckNvbHVtbikgPT5cbiAgICBjb2x1bW4uaG91cnNbMF0gPyBjb2x1bW4uaG91cnNbMF0uc2VnbWVudHNbMF0uZGF0ZS50b0lTT1N0cmluZygpIDogY29sdW1uO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB0cmFja0J5SWQgPSAoaW5kZXg6IG51bWJlciwgcm93OiBXZWVrVmlld0FsbERheUV2ZW50Um93KSA9PiByb3cuaWQ7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlZnJlc2gpIHtcbiAgICAgIHRoaXMucmVmcmVzaFN1YnNjcmlwdGlvbiA9IHRoaXMucmVmcmVzaC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlZnJlc2hBbGwoKTtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KTogdm9pZCB7XG4gICAgY29uc3QgcmVmcmVzaEhlYWRlciA9XG4gICAgICBjaGFuZ2VzLnZpZXdEYXRlIHx8XG4gICAgICBjaGFuZ2VzLmV4Y2x1ZGVEYXlzIHx8XG4gICAgICBjaGFuZ2VzLndlZWtlbmREYXlzIHx8XG4gICAgICBjaGFuZ2VzLmRheXNJbldlZWsgfHxcbiAgICAgIGNoYW5nZXMud2Vla1N0YXJ0c09uO1xuXG4gICAgY29uc3QgcmVmcmVzaEJvZHkgPVxuICAgICAgY2hhbmdlcy52aWV3RGF0ZSB8fFxuICAgICAgY2hhbmdlcy5kYXlTdGFydEhvdXIgfHxcbiAgICAgIGNoYW5nZXMuZGF5U3RhcnRNaW51dGUgfHxcbiAgICAgIGNoYW5nZXMuZGF5RW5kSG91ciB8fFxuICAgICAgY2hhbmdlcy5kYXlFbmRNaW51dGUgfHxcbiAgICAgIGNoYW5nZXMuaG91clNlZ21lbnRzIHx8XG4gICAgICBjaGFuZ2VzLndlZWtTdGFydHNPbiB8fFxuICAgICAgY2hhbmdlcy53ZWVrZW5kRGF5cyB8fFxuICAgICAgY2hhbmdlcy5leGNsdWRlRGF5cyB8fFxuICAgICAgY2hhbmdlcy5ob3VyU2VnbWVudEhlaWdodCB8fFxuICAgICAgY2hhbmdlcy5ldmVudHMgfHxcbiAgICAgIGNoYW5nZXMuZGF5c0luV2VlaztcblxuICAgIGlmIChyZWZyZXNoSGVhZGVyKSB7XG4gICAgICB0aGlzLnJlZnJlc2hIZWFkZXIoKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5ldmVudHMpIHtcbiAgICAgIHZhbGlkYXRlRXZlbnRzKHRoaXMuZXZlbnRzKTtcbiAgICB9XG5cbiAgICBpZiAocmVmcmVzaEJvZHkpIHtcbiAgICAgIHRoaXMucmVmcmVzaEJvZHkoKTtcbiAgICB9XG5cbiAgICBpZiAocmVmcmVzaEhlYWRlciB8fCByZWZyZXNoQm9keSkge1xuICAgICAgdGhpcy5lbWl0QmVmb3JlVmlld1JlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZWZyZXNoU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdGltZUV2ZW50UmVzaXplU3RhcnRlZChcbiAgICBldmVudHNDb250YWluZXI6IEhUTUxFbGVtZW50LFxuICAgIHRpbWVFdmVudDogV2Vla1ZpZXdUaW1lRXZlbnQsXG4gICAgcmVzaXplRXZlbnQ6IFJlc2l6ZUV2ZW50XG4gICk6IHZvaWQge1xuICAgIHRoaXMudGltZUV2ZW50UmVzaXplcy5zZXQodGltZUV2ZW50LmV2ZW50LCByZXNpemVFdmVudCk7XG4gICAgdGhpcy5yZXNpemVTdGFydGVkKGV2ZW50c0NvbnRhaW5lcik7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdGltZUV2ZW50UmVzaXppbmcodGltZUV2ZW50OiBXZWVrVmlld1RpbWVFdmVudCwgcmVzaXplRXZlbnQ6IFJlc2l6ZUV2ZW50KSB7XG4gICAgdGhpcy50aW1lRXZlbnRSZXNpemVzLnNldCh0aW1lRXZlbnQuZXZlbnQsIHJlc2l6ZUV2ZW50KTtcbiAgICBjb25zdCBhZGp1c3RlZEV2ZW50cyA9IG5ldyBNYXA8Q2FsZW5kYXJFdmVudCwgQ2FsZW5kYXJFdmVudD4oKTtcblxuICAgIGNvbnN0IHRlbXBFdmVudHMgPSBbLi4udGhpcy5ldmVudHNdO1xuXG4gICAgdGhpcy50aW1lRXZlbnRSZXNpemVzLmZvckVhY2goKGxhc3RSZXNpemVFdmVudCwgZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IG5ld0V2ZW50RGF0ZXMgPSB0aGlzLmdldFRpbWVFdmVudFJlc2l6ZWREYXRlcyhcbiAgICAgICAgZXZlbnQsXG4gICAgICAgIGxhc3RSZXNpemVFdmVudFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGFkanVzdGVkRXZlbnQgPSB7IC4uLmV2ZW50LCAuLi5uZXdFdmVudERhdGVzIH07XG4gICAgICBhZGp1c3RlZEV2ZW50cy5zZXQoYWRqdXN0ZWRFdmVudCwgZXZlbnQpO1xuICAgICAgY29uc3QgZXZlbnRJbmRleCA9IHRlbXBFdmVudHMuaW5kZXhPZihldmVudCk7XG4gICAgICB0ZW1wRXZlbnRzW2V2ZW50SW5kZXhdID0gYWRqdXN0ZWRFdmVudDtcbiAgICB9KTtcblxuICAgIHRoaXMucmVzdG9yZU9yaWdpbmFsRXZlbnRzKHRlbXBFdmVudHMsIGFkanVzdGVkRXZlbnRzLCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB0aW1lRXZlbnRSZXNpemVFbmRlZCh0aW1lRXZlbnQ6IFdlZWtWaWV3VGltZUV2ZW50KSB7XG4gICAgdGhpcy52aWV3ID0gdGhpcy5nZXRXZWVrVmlldyh0aGlzLmV2ZW50cyk7XG4gICAgY29uc3QgbGFzdFJlc2l6ZUV2ZW50ID0gdGhpcy50aW1lRXZlbnRSZXNpemVzLmdldCh0aW1lRXZlbnQuZXZlbnQpO1xuICAgIGlmIChsYXN0UmVzaXplRXZlbnQpIHtcbiAgICAgIHRoaXMudGltZUV2ZW50UmVzaXplcy5kZWxldGUodGltZUV2ZW50LmV2ZW50KTtcbiAgICAgIGNvbnN0IG5ld0V2ZW50RGF0ZXMgPSB0aGlzLmdldFRpbWVFdmVudFJlc2l6ZWREYXRlcyhcbiAgICAgICAgdGltZUV2ZW50LmV2ZW50LFxuICAgICAgICBsYXN0UmVzaXplRXZlbnRcbiAgICAgICk7XG4gICAgICB0aGlzLmV2ZW50VGltZXNDaGFuZ2VkLmVtaXQoe1xuICAgICAgICBuZXdTdGFydDogbmV3RXZlbnREYXRlcy5zdGFydCxcbiAgICAgICAgbmV3RW5kOiBuZXdFdmVudERhdGVzLmVuZCxcbiAgICAgICAgZXZlbnQ6IHRpbWVFdmVudC5ldmVudCxcbiAgICAgICAgdHlwZTogQ2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50VHlwZS5SZXNpemUsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgYWxsRGF5RXZlbnRSZXNpemVTdGFydGVkKFxuICAgIGFsbERheUV2ZW50c0NvbnRhaW5lcjogSFRNTEVsZW1lbnQsXG4gICAgYWxsRGF5RXZlbnQ6IFdlZWtWaWV3QWxsRGF5RXZlbnQsXG4gICAgcmVzaXplRXZlbnQ6IFJlc2l6ZUV2ZW50XG4gICk6IHZvaWQge1xuICAgIHRoaXMuYWxsRGF5RXZlbnRSZXNpemVzLnNldChhbGxEYXlFdmVudCwge1xuICAgICAgb3JpZ2luYWxPZmZzZXQ6IGFsbERheUV2ZW50Lm9mZnNldCxcbiAgICAgIG9yaWdpbmFsU3BhbjogYWxsRGF5RXZlbnQuc3BhbixcbiAgICAgIGVkZ2U6IHR5cGVvZiByZXNpemVFdmVudC5lZGdlcy5sZWZ0ICE9PSAndW5kZWZpbmVkJyA/ICdsZWZ0JyA6ICdyaWdodCcsXG4gICAgfSk7XG4gICAgdGhpcy5yZXNpemVTdGFydGVkKFxuICAgICAgYWxsRGF5RXZlbnRzQ29udGFpbmVyLFxuICAgICAgdGhpcy5nZXREYXlDb2x1bW5XaWR0aChhbGxEYXlFdmVudHNDb250YWluZXIpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBhbGxEYXlFdmVudFJlc2l6aW5nKFxuICAgIGFsbERheUV2ZW50OiBXZWVrVmlld0FsbERheUV2ZW50LFxuICAgIHJlc2l6ZUV2ZW50OiBSZXNpemVFdmVudCxcbiAgICBkYXlXaWR0aDogbnVtYmVyXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnRSZXNpemU6IFdlZWtWaWV3QWxsRGF5RXZlbnRSZXNpemUgPVxuICAgICAgdGhpcy5hbGxEYXlFdmVudFJlc2l6ZXMuZ2V0KGFsbERheUV2ZW50KTtcblxuICAgIGlmICh0eXBlb2YgcmVzaXplRXZlbnQuZWRnZXMubGVmdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnN0IGRpZmY6IG51bWJlciA9IE1hdGgucm91bmQoK3Jlc2l6ZUV2ZW50LmVkZ2VzLmxlZnQgLyBkYXlXaWR0aCk7XG4gICAgICBhbGxEYXlFdmVudC5vZmZzZXQgPSBjdXJyZW50UmVzaXplLm9yaWdpbmFsT2Zmc2V0ICsgZGlmZjtcbiAgICAgIGFsbERheUV2ZW50LnNwYW4gPSBjdXJyZW50UmVzaXplLm9yaWdpbmFsU3BhbiAtIGRpZmY7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcmVzaXplRXZlbnQuZWRnZXMucmlnaHQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zdCBkaWZmOiBudW1iZXIgPSBNYXRoLnJvdW5kKCtyZXNpemVFdmVudC5lZGdlcy5yaWdodCAvIGRheVdpZHRoKTtcbiAgICAgIGFsbERheUV2ZW50LnNwYW4gPSBjdXJyZW50UmVzaXplLm9yaWdpbmFsU3BhbiArIGRpZmY7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGFsbERheUV2ZW50UmVzaXplRW5kZWQoYWxsRGF5RXZlbnQ6IFdlZWtWaWV3QWxsRGF5RXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50UmVzaXplOiBXZWVrVmlld0FsbERheUV2ZW50UmVzaXplID1cbiAgICAgIHRoaXMuYWxsRGF5RXZlbnRSZXNpemVzLmdldChhbGxEYXlFdmVudCk7XG5cbiAgICBpZiAoY3VycmVudFJlc2l6ZSkge1xuICAgICAgY29uc3QgYWxsRGF5RXZlbnRSZXNpemluZ0JlZm9yZVN0YXJ0ID0gY3VycmVudFJlc2l6ZS5lZGdlID09PSAnbGVmdCc7XG4gICAgICBsZXQgZGF5c0RpZmY6IG51bWJlcjtcbiAgICAgIGlmIChhbGxEYXlFdmVudFJlc2l6aW5nQmVmb3JlU3RhcnQpIHtcbiAgICAgICAgZGF5c0RpZmYgPSBhbGxEYXlFdmVudC5vZmZzZXQgLSBjdXJyZW50UmVzaXplLm9yaWdpbmFsT2Zmc2V0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF5c0RpZmYgPSBhbGxEYXlFdmVudC5zcGFuIC0gY3VycmVudFJlc2l6ZS5vcmlnaW5hbFNwYW47XG4gICAgICB9XG5cbiAgICAgIGFsbERheUV2ZW50Lm9mZnNldCA9IGN1cnJlbnRSZXNpemUub3JpZ2luYWxPZmZzZXQ7XG4gICAgICBhbGxEYXlFdmVudC5zcGFuID0gY3VycmVudFJlc2l6ZS5vcmlnaW5hbFNwYW47XG5cbiAgICAgIGxldCBuZXdTdGFydDogRGF0ZSA9IGFsbERheUV2ZW50LmV2ZW50LnN0YXJ0O1xuICAgICAgbGV0IG5ld0VuZDogRGF0ZSA9IGFsbERheUV2ZW50LmV2ZW50LmVuZCB8fCBhbGxEYXlFdmVudC5ldmVudC5zdGFydDtcbiAgICAgIGlmIChhbGxEYXlFdmVudFJlc2l6aW5nQmVmb3JlU3RhcnQpIHtcbiAgICAgICAgbmV3U3RhcnQgPSBhZGREYXlzV2l0aEV4Y2x1c2lvbnMoXG4gICAgICAgICAgdGhpcy5kYXRlQWRhcHRlcixcbiAgICAgICAgICBuZXdTdGFydCxcbiAgICAgICAgICBkYXlzRGlmZixcbiAgICAgICAgICB0aGlzLmV4Y2x1ZGVEYXlzXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdFbmQgPSBhZGREYXlzV2l0aEV4Y2x1c2lvbnMoXG4gICAgICAgICAgdGhpcy5kYXRlQWRhcHRlcixcbiAgICAgICAgICBuZXdFbmQsXG4gICAgICAgICAgZGF5c0RpZmYsXG4gICAgICAgICAgdGhpcy5leGNsdWRlRGF5c1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmV2ZW50VGltZXNDaGFuZ2VkLmVtaXQoe1xuICAgICAgICBuZXdTdGFydCxcbiAgICAgICAgbmV3RW5kLFxuICAgICAgICBldmVudDogYWxsRGF5RXZlbnQuZXZlbnQsXG4gICAgICAgIHR5cGU6IENhbGVuZGFyRXZlbnRUaW1lc0NoYW5nZWRFdmVudFR5cGUuUmVzaXplLFxuICAgICAgfSk7XG4gICAgICB0aGlzLmFsbERheUV2ZW50UmVzaXplcy5kZWxldGUoYWxsRGF5RXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBnZXREYXlDb2x1bW5XaWR0aChldmVudFJvd0NvbnRhaW5lcjogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLmZsb29yKGV2ZW50Um93Q29udGFpbmVyLm9mZnNldFdpZHRoIC8gdGhpcy5kYXlzLmxlbmd0aCk7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgZGF0ZURyYWdFbnRlcihkYXRlOiBEYXRlKSB7XG4gICAgdGhpcy5sYXN0RHJhZ0VudGVyRGF0ZSA9IGRhdGU7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgZXZlbnREcm9wcGVkKFxuICAgIGRyb3BFdmVudDogRHJvcEV2ZW50PHsgZXZlbnQ/OiBDYWxlbmRhckV2ZW50OyBjYWxlbmRhcklkPzogc3ltYm9sIH0+LFxuICAgIGRhdGU6IERhdGUsXG4gICAgYWxsRGF5OiBib29sZWFuXG4gICk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIHNob3VsZEZpcmVEcm9wcGVkRXZlbnQoZHJvcEV2ZW50LCBkYXRlLCBhbGxEYXksIHRoaXMuY2FsZW5kYXJJZCkgJiZcbiAgICAgIHRoaXMubGFzdERyYWdFbnRlckRhdGUuZ2V0VGltZSgpID09PSBkYXRlLmdldFRpbWUoKSAmJlxuICAgICAgKCF0aGlzLnNuYXBEcmFnZ2VkRXZlbnRzIHx8XG4gICAgICAgIGRyb3BFdmVudC5kcm9wRGF0YS5ldmVudCAhPT0gdGhpcy5sYXN0RHJhZ2dlZEV2ZW50KVxuICAgICkge1xuICAgICAgdGhpcy5ldmVudFRpbWVzQ2hhbmdlZC5lbWl0KHtcbiAgICAgICAgdHlwZTogQ2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50VHlwZS5Ecm9wLFxuICAgICAgICBldmVudDogZHJvcEV2ZW50LmRyb3BEYXRhLmV2ZW50LFxuICAgICAgICBuZXdTdGFydDogZGF0ZSxcbiAgICAgICAgYWxsRGF5LFxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMubGFzdERyYWdnZWRFdmVudCA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgZHJhZ0VudGVyKHR5cGU6ICdhbGxEYXknIHwgJ3RpbWUnKSB7XG4gICAgdGhpcy5ldmVudERyYWdFbnRlckJ5VHlwZVt0eXBlXSsrO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGRyYWdMZWF2ZSh0eXBlOiAnYWxsRGF5JyB8ICd0aW1lJykge1xuICAgIHRoaXMuZXZlbnREcmFnRW50ZXJCeVR5cGVbdHlwZV0tLTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBkcmFnU3RhcnRlZChcbiAgICBldmVudHNDb250YWluZXI6IEhUTUxFbGVtZW50LFxuICAgIGV2ZW50OiBIVE1MRWxlbWVudCxcbiAgICBkYXlFdmVudD86IFdlZWtWaWV3VGltZUV2ZW50XG4gICk6IHZvaWQge1xuICAgIHRoaXMuZGF5Q29sdW1uV2lkdGggPSB0aGlzLmdldERheUNvbHVtbldpZHRoKGV2ZW50c0NvbnRhaW5lcik7XG4gICAgY29uc3QgZHJhZ0hlbHBlcjogQ2FsZW5kYXJEcmFnSGVscGVyID0gbmV3IENhbGVuZGFyRHJhZ0hlbHBlcihcbiAgICAgIGV2ZW50c0NvbnRhaW5lcixcbiAgICAgIGV2ZW50XG4gICAgKTtcbiAgICB0aGlzLnZhbGlkYXRlRHJhZyA9ICh7IHgsIHksIHRyYW5zZm9ybSB9KSA9PlxuICAgICAgdGhpcy5hbGxEYXlFdmVudFJlc2l6ZXMuc2l6ZSA9PT0gMCAmJlxuICAgICAgdGhpcy50aW1lRXZlbnRSZXNpemVzLnNpemUgPT09IDAgJiZcbiAgICAgIGRyYWdIZWxwZXIudmFsaWRhdGVEcmFnKHtcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgc25hcERyYWdnZWRFdmVudHM6IHRoaXMuc25hcERyYWdnZWRFdmVudHMsXG4gICAgICAgIGRyYWdBbHJlYWR5TW92ZWQ6IHRoaXMuZHJhZ0FscmVhZHlNb3ZlZCxcbiAgICAgICAgdHJhbnNmb3JtLFxuICAgICAgfSk7XG4gICAgdGhpcy5kcmFnQWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLmRyYWdBbHJlYWR5TW92ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmxhc3REcmFnZ2VkRXZlbnQgPSBudWxsO1xuICAgIHRoaXMuZXZlbnREcmFnRW50ZXJCeVR5cGUgPSB7XG4gICAgICBhbGxEYXk6IDAsXG4gICAgICB0aW1lOiAwLFxuICAgIH07XG4gICAgaWYgKCF0aGlzLnNuYXBEcmFnZ2VkRXZlbnRzICYmIGRheUV2ZW50KSB7XG4gICAgICB0aGlzLnZpZXcuaG91ckNvbHVtbnMuZm9yRWFjaCgoY29sdW1uKSA9PiB7XG4gICAgICAgIGNvbnN0IGxpbmtlZEV2ZW50ID0gY29sdW1uLmV2ZW50cy5maW5kKFxuICAgICAgICAgIChjb2x1bW5FdmVudCkgPT5cbiAgICAgICAgICAgIGNvbHVtbkV2ZW50LmV2ZW50ID09PSBkYXlFdmVudC5ldmVudCAmJiBjb2x1bW5FdmVudCAhPT0gZGF5RXZlbnRcbiAgICAgICAgKTtcbiAgICAgICAgLy8gaGlkZSBhbnkgbGlua2VkIGV2ZW50cyB3aGlsZSBkcmFnZ2luZ1xuICAgICAgICBpZiAobGlua2VkRXZlbnQpIHtcbiAgICAgICAgICBsaW5rZWRFdmVudC53aWR0aCA9IDA7XG4gICAgICAgICAgbGlua2VkRXZlbnQuaGVpZ2h0ID0gMDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGRyYWdNb3ZlKGRheUV2ZW50OiBXZWVrVmlld1RpbWVFdmVudCwgZHJhZ0V2ZW50OiBEcmFnTW92ZUV2ZW50KSB7XG4gICAgY29uc3QgbmV3RXZlbnRUaW1lcyA9IHRoaXMuZ2V0RHJhZ01vdmVkRXZlbnRUaW1lcyhcbiAgICAgIGRheUV2ZW50LFxuICAgICAgZHJhZ0V2ZW50LFxuICAgICAgdGhpcy5kYXlDb2x1bW5XaWR0aCxcbiAgICAgIHRydWVcbiAgICApO1xuICAgIGNvbnN0IG9yaWdpbmFsRXZlbnQgPSBkYXlFdmVudC5ldmVudDtcbiAgICBjb25zdCBhZGp1c3RlZEV2ZW50ID0geyAuLi5vcmlnaW5hbEV2ZW50LCAuLi5uZXdFdmVudFRpbWVzIH07XG4gICAgY29uc3QgdGVtcEV2ZW50cyA9IHRoaXMuZXZlbnRzLm1hcCgoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudCA9PT0gb3JpZ2luYWxFdmVudCkge1xuICAgICAgICByZXR1cm4gYWRqdXN0ZWRFdmVudDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBldmVudDtcbiAgICB9KTtcbiAgICB0aGlzLnJlc3RvcmVPcmlnaW5hbEV2ZW50cyhcbiAgICAgIHRlbXBFdmVudHMsXG4gICAgICBuZXcgTWFwKFtbYWRqdXN0ZWRFdmVudCwgb3JpZ2luYWxFdmVudF1dKSxcbiAgICAgIHRoaXMuc25hcERyYWdnZWRFdmVudHNcbiAgICApO1xuICAgIHRoaXMuZHJhZ0FscmVhZHlNb3ZlZCA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgYWxsRGF5RXZlbnREcmFnTW92ZSgpIHtcbiAgICB0aGlzLmRyYWdBbHJlYWR5TW92ZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGRyYWdFbmRlZChcbiAgICB3ZWVrRXZlbnQ6IFdlZWtWaWV3QWxsRGF5RXZlbnQgfCBXZWVrVmlld1RpbWVFdmVudCxcbiAgICBkcmFnRW5kRXZlbnQ6IERyYWdFbmRFdmVudCxcbiAgICBkYXlXaWR0aDogbnVtYmVyLFxuICAgIHVzZVkgPSBmYWxzZVxuICApOiB2b2lkIHtcbiAgICB0aGlzLnZpZXcgPSB0aGlzLmdldFdlZWtWaWV3KHRoaXMuZXZlbnRzKTtcbiAgICB0aGlzLmRyYWdBY3RpdmUgPSBmYWxzZTtcbiAgICB0aGlzLnZhbGlkYXRlRHJhZyA9IG51bGw7XG4gICAgY29uc3QgeyBzdGFydCwgZW5kIH0gPSB0aGlzLmdldERyYWdNb3ZlZEV2ZW50VGltZXMoXG4gICAgICB3ZWVrRXZlbnQsXG4gICAgICBkcmFnRW5kRXZlbnQsXG4gICAgICBkYXlXaWR0aCxcbiAgICAgIHVzZVlcbiAgICApO1xuICAgIGlmIChcbiAgICAgICh0aGlzLnNuYXBEcmFnZ2VkRXZlbnRzIHx8XG4gICAgICAgIHRoaXMuZXZlbnREcmFnRW50ZXJCeVR5cGVbdXNlWSA/ICd0aW1lJyA6ICdhbGxEYXknXSA+IDApICYmXG4gICAgICBpc0RyYWdnZWRXaXRoaW5QZXJpb2Qoc3RhcnQsIGVuZCwgdGhpcy52aWV3LnBlcmlvZClcbiAgICApIHtcbiAgICAgIHRoaXMubGFzdERyYWdnZWRFdmVudCA9IHdlZWtFdmVudC5ldmVudDtcbiAgICAgIHRoaXMuZXZlbnRUaW1lc0NoYW5nZWQuZW1pdCh7XG4gICAgICAgIG5ld1N0YXJ0OiBzdGFydCxcbiAgICAgICAgbmV3RW5kOiBlbmQsXG4gICAgICAgIGV2ZW50OiB3ZWVrRXZlbnQuZXZlbnQsXG4gICAgICAgIHR5cGU6IENhbGVuZGFyRXZlbnRUaW1lc0NoYW5nZWRFdmVudFR5cGUuRHJhZyxcbiAgICAgICAgYWxsRGF5OiAhdXNlWSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCByZWZyZXNoSGVhZGVyKCk6IHZvaWQge1xuICAgIHRoaXMuZGF5cyA9IHRoaXMudXRpbHMuZ2V0V2Vla1ZpZXdIZWFkZXIoe1xuICAgICAgdmlld0RhdGU6IHRoaXMudmlld0RhdGUsXG4gICAgICB3ZWVrU3RhcnRzT246IHRoaXMud2Vla1N0YXJ0c09uLFxuICAgICAgZXhjbHVkZWQ6IHRoaXMuZXhjbHVkZURheXMsXG4gICAgICB3ZWVrZW5kRGF5czogdGhpcy53ZWVrZW5kRGF5cyxcbiAgICAgIC4uLmdldFdlZWtWaWV3UGVyaW9kKFxuICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLFxuICAgICAgICB0aGlzLnZpZXdEYXRlLFxuICAgICAgICB0aGlzLndlZWtTdGFydHNPbixcbiAgICAgICAgdGhpcy5leGNsdWRlRGF5cyxcbiAgICAgICAgdGhpcy5kYXlzSW5XZWVrXG4gICAgICApLFxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlZnJlc2hCb2R5KCk6IHZvaWQge1xuICAgIHRoaXMudmlldyA9IHRoaXMuZ2V0V2Vla1ZpZXcodGhpcy5ldmVudHMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlZnJlc2hBbGwoKTogdm9pZCB7XG4gICAgdGhpcy5yZWZyZXNoSGVhZGVyKCk7XG4gICAgdGhpcy5yZWZyZXNoQm9keSgpO1xuICAgIHRoaXMuZW1pdEJlZm9yZVZpZXdSZW5kZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBlbWl0QmVmb3JlVmlld1JlbmRlcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kYXlzICYmIHRoaXMudmlldykge1xuICAgICAgdGhpcy5iZWZvcmVWaWV3UmVuZGVyLmVtaXQoe1xuICAgICAgICBoZWFkZXI6IHRoaXMuZGF5cyxcbiAgICAgICAgLi4udGhpcy52aWV3LFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGdldFdlZWtWaWV3KGV2ZW50czogQ2FsZW5kYXJFdmVudFtdKSB7XG4gICAgcmV0dXJuIHRoaXMudXRpbHMuZ2V0V2Vla1ZpZXcoe1xuICAgICAgZXZlbnRzLFxuICAgICAgdmlld0RhdGU6IHRoaXMudmlld0RhdGUsXG4gICAgICB3ZWVrU3RhcnRzT246IHRoaXMud2Vla1N0YXJ0c09uLFxuICAgICAgZXhjbHVkZWQ6IHRoaXMuZXhjbHVkZURheXMsXG4gICAgICBwcmVjaXNpb246IHRoaXMucHJlY2lzaW9uLFxuICAgICAgYWJzb2x1dGVQb3NpdGlvbmVkRXZlbnRzOiB0cnVlLFxuICAgICAgaG91clNlZ21lbnRzOiB0aGlzLmhvdXJTZWdtZW50cyxcbiAgICAgIGRheVN0YXJ0OiB7XG4gICAgICAgIGhvdXI6IHRoaXMuZGF5U3RhcnRIb3VyLFxuICAgICAgICBtaW51dGU6IHRoaXMuZGF5U3RhcnRNaW51dGUsXG4gICAgICB9LFxuICAgICAgZGF5RW5kOiB7XG4gICAgICAgIGhvdXI6IHRoaXMuZGF5RW5kSG91cixcbiAgICAgICAgbWludXRlOiB0aGlzLmRheUVuZE1pbnV0ZSxcbiAgICAgIH0sXG4gICAgICBzZWdtZW50SGVpZ2h0OiB0aGlzLmhvdXJTZWdtZW50SGVpZ2h0LFxuICAgICAgd2Vla2VuZERheXM6IHRoaXMud2Vla2VuZERheXMsXG4gICAgICAuLi5nZXRXZWVrVmlld1BlcmlvZChcbiAgICAgICAgdGhpcy5kYXRlQWRhcHRlcixcbiAgICAgICAgdGhpcy52aWV3RGF0ZSxcbiAgICAgICAgdGhpcy53ZWVrU3RhcnRzT24sXG4gICAgICAgIHRoaXMuZXhjbHVkZURheXMsXG4gICAgICAgIHRoaXMuZGF5c0luV2Vla1xuICAgICAgKSxcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXREcmFnTW92ZWRFdmVudFRpbWVzKFxuICAgIHdlZWtFdmVudDogV2Vla1ZpZXdBbGxEYXlFdmVudCB8IFdlZWtWaWV3VGltZUV2ZW50LFxuICAgIGRyYWdFbmRFdmVudDogRHJhZ0VuZEV2ZW50IHwgRHJhZ01vdmVFdmVudCxcbiAgICBkYXlXaWR0aDogbnVtYmVyLFxuICAgIHVzZVk6IGJvb2xlYW5cbiAgKSB7XG4gICAgY29uc3QgZGF5c0RyYWdnZWQgPSByb3VuZFRvTmVhcmVzdChkcmFnRW5kRXZlbnQueCwgZGF5V2lkdGgpIC8gZGF5V2lkdGg7XG4gICAgY29uc3QgbWludXRlc01vdmVkID0gdXNlWVxuICAgICAgPyBnZXRNaW51dGVzTW92ZWQoXG4gICAgICAgICAgZHJhZ0VuZEV2ZW50LnksXG4gICAgICAgICAgdGhpcy5ob3VyU2VnbWVudHMsXG4gICAgICAgICAgdGhpcy5ob3VyU2VnbWVudEhlaWdodCxcbiAgICAgICAgICB0aGlzLmV2ZW50U25hcFNpemVcbiAgICAgICAgKVxuICAgICAgOiAwO1xuXG4gICAgY29uc3Qgc3RhcnQgPSB0aGlzLmRhdGVBZGFwdGVyLmFkZE1pbnV0ZXMoXG4gICAgICBhZGREYXlzV2l0aEV4Y2x1c2lvbnMoXG4gICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIsXG4gICAgICAgIHdlZWtFdmVudC5ldmVudC5zdGFydCxcbiAgICAgICAgZGF5c0RyYWdnZWQsXG4gICAgICAgIHRoaXMuZXhjbHVkZURheXNcbiAgICAgICksXG4gICAgICBtaW51dGVzTW92ZWRcbiAgICApO1xuICAgIGxldCBlbmQ6IERhdGU7XG4gICAgaWYgKHdlZWtFdmVudC5ldmVudC5lbmQpIHtcbiAgICAgIGVuZCA9IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkTWludXRlcyhcbiAgICAgICAgYWRkRGF5c1dpdGhFeGNsdXNpb25zKFxuICAgICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIsXG4gICAgICAgICAgd2Vla0V2ZW50LmV2ZW50LmVuZCxcbiAgICAgICAgICBkYXlzRHJhZ2dlZCxcbiAgICAgICAgICB0aGlzLmV4Y2x1ZGVEYXlzXG4gICAgICAgICksXG4gICAgICAgIG1pbnV0ZXNNb3ZlZFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4geyBzdGFydCwgZW5kIH07XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVzdG9yZU9yaWdpbmFsRXZlbnRzKFxuICAgIHRlbXBFdmVudHM6IENhbGVuZGFyRXZlbnRbXSxcbiAgICBhZGp1c3RlZEV2ZW50czogTWFwPENhbGVuZGFyRXZlbnQsIENhbGVuZGFyRXZlbnQ+LFxuICAgIHNuYXBEcmFnZ2VkRXZlbnRzID0gdHJ1ZVxuICApIHtcbiAgICBjb25zdCBwcmV2aW91c1ZpZXcgPSB0aGlzLnZpZXc7XG4gICAgaWYgKHNuYXBEcmFnZ2VkRXZlbnRzKSB7XG4gICAgICB0aGlzLnZpZXcgPSB0aGlzLmdldFdlZWtWaWV3KHRlbXBFdmVudHMpO1xuICAgIH1cblxuICAgIGNvbnN0IGFkanVzdGVkRXZlbnRzQXJyYXkgPSB0ZW1wRXZlbnRzLmZpbHRlcigoZXZlbnQpID0+XG4gICAgICBhZGp1c3RlZEV2ZW50cy5oYXMoZXZlbnQpXG4gICAgKTtcbiAgICB0aGlzLnZpZXcuaG91ckNvbHVtbnMuZm9yRWFjaCgoY29sdW1uLCBjb2x1bW5JbmRleCkgPT4ge1xuICAgICAgcHJldmlvdXNWaWV3LmhvdXJDb2x1bW5zW2NvbHVtbkluZGV4XS5ob3Vycy5mb3JFYWNoKChob3VyLCBob3VySW5kZXgpID0+IHtcbiAgICAgICAgaG91ci5zZWdtZW50cy5mb3JFYWNoKChzZWdtZW50LCBzZWdtZW50SW5kZXgpID0+IHtcbiAgICAgICAgICBjb2x1bW4uaG91cnNbaG91ckluZGV4XS5zZWdtZW50c1tzZWdtZW50SW5kZXhdLmNzc0NsYXNzID1cbiAgICAgICAgICAgIHNlZ21lbnQuY3NzQ2xhc3M7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGFkanVzdGVkRXZlbnRzQXJyYXkuZm9yRWFjaCgoYWRqdXN0ZWRFdmVudCkgPT4ge1xuICAgICAgICBjb25zdCBvcmlnaW5hbEV2ZW50ID0gYWRqdXN0ZWRFdmVudHMuZ2V0KGFkanVzdGVkRXZlbnQpO1xuICAgICAgICBjb25zdCBleGlzdGluZ0NvbHVtbkV2ZW50ID0gY29sdW1uLmV2ZW50cy5maW5kKFxuICAgICAgICAgIChjb2x1bW5FdmVudCkgPT5cbiAgICAgICAgICAgIGNvbHVtbkV2ZW50LmV2ZW50ID09PVxuICAgICAgICAgICAgKHNuYXBEcmFnZ2VkRXZlbnRzID8gYWRqdXN0ZWRFdmVudCA6IG9yaWdpbmFsRXZlbnQpXG4gICAgICAgICk7XG4gICAgICAgIGlmIChleGlzdGluZ0NvbHVtbkV2ZW50KSB7XG4gICAgICAgICAgLy8gcmVzdG9yZSB0aGUgb3JpZ2luYWwgZXZlbnQgc28gdHJhY2tCeSBraWNrcyBpbiBhbmQgdGhlIGRvbSBpc24ndCBjaGFuZ2VkXG4gICAgICAgICAgZXhpc3RpbmdDb2x1bW5FdmVudC5ldmVudCA9IG9yaWdpbmFsRXZlbnQ7XG4gICAgICAgICAgZXhpc3RpbmdDb2x1bW5FdmVudFsndGVtcEV2ZW50J10gPSBhZGp1c3RlZEV2ZW50O1xuICAgICAgICAgIGlmICghc25hcERyYWdnZWRFdmVudHMpIHtcbiAgICAgICAgICAgIGV4aXN0aW5nQ29sdW1uRXZlbnQuaGVpZ2h0ID0gMDtcbiAgICAgICAgICAgIGV4aXN0aW5nQ29sdW1uRXZlbnQud2lkdGggPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBhZGQgYSBkdW1teSBldmVudCB0byB0aGUgZHJvcCBzbyBpZiB0aGUgZXZlbnQgd2FzIHJlbW92ZWQgZnJvbSB0aGUgb3JpZ2luYWwgY29sdW1uIHRoZSBkcmFnIGRvZXNuJ3QgZW5kIGVhcmx5XG4gICAgICAgICAgY29uc3QgZXZlbnQgPSB7XG4gICAgICAgICAgICBldmVudDogb3JpZ2luYWxFdmVudCxcbiAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgICAgIHN0YXJ0c0JlZm9yZURheTogZmFsc2UsXG4gICAgICAgICAgICBlbmRzQWZ0ZXJEYXk6IGZhbHNlLFxuICAgICAgICAgICAgdGVtcEV2ZW50OiBhZGp1c3RlZEV2ZW50LFxuICAgICAgICAgIH07XG4gICAgICAgICAgY29sdW1uLmV2ZW50cy5wdXNoKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgYWRqdXN0ZWRFdmVudHMuY2xlYXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRUaW1lRXZlbnRSZXNpemVkRGF0ZXMoXG4gICAgY2FsZW5kYXJFdmVudDogQ2FsZW5kYXJFdmVudCxcbiAgICByZXNpemVFdmVudDogUmVzaXplRXZlbnRcbiAgKSB7XG4gICAgY29uc3QgbWluaW11bUV2ZW50SGVpZ2h0ID0gZ2V0TWluaW11bUV2ZW50SGVpZ2h0SW5NaW51dGVzKFxuICAgICAgdGhpcy5ob3VyU2VnbWVudHMsXG4gICAgICB0aGlzLmhvdXJTZWdtZW50SGVpZ2h0XG4gICAgKTtcbiAgICBjb25zdCBuZXdFdmVudERhdGVzID0ge1xuICAgICAgc3RhcnQ6IGNhbGVuZGFyRXZlbnQuc3RhcnQsXG4gICAgICBlbmQ6IGdldERlZmF1bHRFdmVudEVuZChcbiAgICAgICAgdGhpcy5kYXRlQWRhcHRlcixcbiAgICAgICAgY2FsZW5kYXJFdmVudCxcbiAgICAgICAgbWluaW11bUV2ZW50SGVpZ2h0XG4gICAgICApLFxuICAgIH07XG4gICAgY29uc3QgeyBlbmQsIC4uLmV2ZW50V2l0aG91dEVuZCB9ID0gY2FsZW5kYXJFdmVudDtcbiAgICBjb25zdCBzbWFsbGVzdFJlc2l6ZXMgPSB7XG4gICAgICBzdGFydDogdGhpcy5kYXRlQWRhcHRlci5hZGRNaW51dGVzKFxuICAgICAgICBuZXdFdmVudERhdGVzLmVuZCxcbiAgICAgICAgbWluaW11bUV2ZW50SGVpZ2h0ICogLTFcbiAgICAgICksXG4gICAgICBlbmQ6IGdldERlZmF1bHRFdmVudEVuZChcbiAgICAgICAgdGhpcy5kYXRlQWRhcHRlcixcbiAgICAgICAgZXZlbnRXaXRob3V0RW5kLFxuICAgICAgICBtaW5pbXVtRXZlbnRIZWlnaHRcbiAgICAgICksXG4gICAgfTtcblxuICAgIGlmICh0eXBlb2YgcmVzaXplRXZlbnQuZWRnZXMubGVmdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnN0IGRheXNEaWZmID0gTWF0aC5yb3VuZChcbiAgICAgICAgK3Jlc2l6ZUV2ZW50LmVkZ2VzLmxlZnQgLyB0aGlzLmRheUNvbHVtbldpZHRoXG4gICAgICApO1xuICAgICAgY29uc3QgbmV3U3RhcnQgPSBhZGREYXlzV2l0aEV4Y2x1c2lvbnMoXG4gICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIsXG4gICAgICAgIG5ld0V2ZW50RGF0ZXMuc3RhcnQsXG4gICAgICAgIGRheXNEaWZmLFxuICAgICAgICB0aGlzLmV4Y2x1ZGVEYXlzXG4gICAgICApO1xuICAgICAgaWYgKG5ld1N0YXJ0IDwgc21hbGxlc3RSZXNpemVzLnN0YXJ0KSB7XG4gICAgICAgIG5ld0V2ZW50RGF0ZXMuc3RhcnQgPSBuZXdTdGFydDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld0V2ZW50RGF0ZXMuc3RhcnQgPSBzbWFsbGVzdFJlc2l6ZXMuc3RhcnQ7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcmVzaXplRXZlbnQuZWRnZXMucmlnaHQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zdCBkYXlzRGlmZiA9IE1hdGgucm91bmQoXG4gICAgICAgICtyZXNpemVFdmVudC5lZGdlcy5yaWdodCAvIHRoaXMuZGF5Q29sdW1uV2lkdGhcbiAgICAgICk7XG4gICAgICBjb25zdCBuZXdFbmQgPSBhZGREYXlzV2l0aEV4Y2x1c2lvbnMoXG4gICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIsXG4gICAgICAgIG5ld0V2ZW50RGF0ZXMuZW5kLFxuICAgICAgICBkYXlzRGlmZixcbiAgICAgICAgdGhpcy5leGNsdWRlRGF5c1xuICAgICAgKTtcbiAgICAgIGlmIChuZXdFbmQgPiBzbWFsbGVzdFJlc2l6ZXMuZW5kKSB7XG4gICAgICAgIG5ld0V2ZW50RGF0ZXMuZW5kID0gbmV3RW5kO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3RXZlbnREYXRlcy5lbmQgPSBzbWFsbGVzdFJlc2l6ZXMuZW5kO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcmVzaXplRXZlbnQuZWRnZXMudG9wICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc3QgbWludXRlc01vdmVkID0gZ2V0TWludXRlc01vdmVkKFxuICAgICAgICByZXNpemVFdmVudC5lZGdlcy50b3AgYXMgbnVtYmVyLFxuICAgICAgICB0aGlzLmhvdXJTZWdtZW50cyxcbiAgICAgICAgdGhpcy5ob3VyU2VnbWVudEhlaWdodCxcbiAgICAgICAgdGhpcy5ldmVudFNuYXBTaXplXG4gICAgICApO1xuICAgICAgY29uc3QgbmV3U3RhcnQgPSB0aGlzLmRhdGVBZGFwdGVyLmFkZE1pbnV0ZXMoXG4gICAgICAgIG5ld0V2ZW50RGF0ZXMuc3RhcnQsXG4gICAgICAgIG1pbnV0ZXNNb3ZlZFxuICAgICAgKTtcbiAgICAgIGlmIChuZXdTdGFydCA8IHNtYWxsZXN0UmVzaXplcy5zdGFydCkge1xuICAgICAgICBuZXdFdmVudERhdGVzLnN0YXJ0ID0gbmV3U3RhcnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdFdmVudERhdGVzLnN0YXJ0ID0gc21hbGxlc3RSZXNpemVzLnN0YXJ0O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlc2l6ZUV2ZW50LmVkZ2VzLmJvdHRvbSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnN0IG1pbnV0ZXNNb3ZlZCA9IGdldE1pbnV0ZXNNb3ZlZChcbiAgICAgICAgcmVzaXplRXZlbnQuZWRnZXMuYm90dG9tIGFzIG51bWJlcixcbiAgICAgICAgdGhpcy5ob3VyU2VnbWVudHMsXG4gICAgICAgIHRoaXMuaG91clNlZ21lbnRIZWlnaHQsXG4gICAgICAgIHRoaXMuZXZlbnRTbmFwU2l6ZVxuICAgICAgKTtcbiAgICAgIGNvbnN0IG5ld0VuZCA9IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkTWludXRlcyhcbiAgICAgICAgbmV3RXZlbnREYXRlcy5lbmQsXG4gICAgICAgIG1pbnV0ZXNNb3ZlZFxuICAgICAgKTtcbiAgICAgIGlmIChuZXdFbmQgPiBzbWFsbGVzdFJlc2l6ZXMuZW5kKSB7XG4gICAgICAgIG5ld0V2ZW50RGF0ZXMuZW5kID0gbmV3RW5kO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3RXZlbnREYXRlcy5lbmQgPSBzbWFsbGVzdFJlc2l6ZXMuZW5kO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXdFdmVudERhdGVzO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlc2l6ZVN0YXJ0ZWQoZXZlbnRzQ29udGFpbmVyOiBIVE1MRWxlbWVudCwgbWluV2lkdGg/OiBudW1iZXIpIHtcbiAgICB0aGlzLmRheUNvbHVtbldpZHRoID0gdGhpcy5nZXREYXlDb2x1bW5XaWR0aChldmVudHNDb250YWluZXIpO1xuICAgIGNvbnN0IHJlc2l6ZUhlbHBlcjogQ2FsZW5kYXJSZXNpemVIZWxwZXIgPSBuZXcgQ2FsZW5kYXJSZXNpemVIZWxwZXIoXG4gICAgICBldmVudHNDb250YWluZXIsXG4gICAgICBtaW5XaWR0aFxuICAgICk7XG4gICAgdGhpcy52YWxpZGF0ZVJlc2l6ZSA9ICh7IHJlY3RhbmdsZSB9KSA9PlxuICAgICAgcmVzaXplSGVscGVyLnZhbGlkYXRlUmVzaXplKHsgcmVjdGFuZ2xlIH0pO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG59XG4iXX0=