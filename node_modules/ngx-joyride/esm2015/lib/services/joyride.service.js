import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { JoyrideStepService } from './joyride-step.service';
import { JoyrideOptionsService } from './joyride-options.service';
import { of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { JoyrideStepInfo } from '../models/joyride-step-info.class';
import { isPlatformBrowser } from '@angular/common';
export class JoyrideService {
    constructor(platformId, stepService, optionsService) {
        this.platformId = platformId;
        this.stepService = stepService;
        this.optionsService = optionsService;
        this.tourInProgress = false;
    }
    startTour(options) {
        if (!isPlatformBrowser(this.platformId)) {
            return of(new JoyrideStepInfo());
        }
        if (!this.tourInProgress) {
            this.tourInProgress = true;
            if (options) {
                this.optionsService.setOptions(options);
            }
            this.tour$ = this.stepService.startTour().pipe(finalize(() => (this.tourInProgress = false)));
            this.tour$.subscribe();
        }
        return this.tour$;
    }
    closeTour() {
        if (this.isTourInProgress())
            this.stepService.close();
    }
    isTourInProgress() {
        return this.tourInProgress;
    }
}
JoyrideService.decorators = [
    { type: Injectable }
];
JoyrideService.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: JoyrideStepService },
    { type: JoyrideOptionsService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam95cmlkZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWpveXJpZGUvc3JjL2xpYi9zZXJ2aWNlcy9qb3lyaWRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRWxFLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUdwRCxNQUFNLE9BQU8sY0FBYztJQUl2QixZQUNpQyxVQUFrQixFQUM5QixXQUErQixFQUMvQixjQUFxQztRQUZ6QixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQzlCLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUMvQixtQkFBYyxHQUFkLGNBQWMsQ0FBdUI7UUFObEQsbUJBQWMsR0FBWSxLQUFLLENBQUM7SUFPckMsQ0FBQztJQUVKLFNBQVMsQ0FBQyxPQUF3QjtRQUM5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3JDLE9BQU8sRUFBRSxDQUFDLElBQUksZUFBZSxFQUFFLENBQUMsQ0FBQztTQUNwQztRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1lBQzNCLElBQUksT0FBTyxFQUFFO2dCQUNULElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzNDO1lBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5RixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQzFCO1FBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxTQUFTO1FBQ0wsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzFELENBQUM7SUFFRCxnQkFBZ0I7UUFDWixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDL0IsQ0FBQzs7O1lBaENKLFVBQVU7OztZQU1zQyxNQUFNLHVCQUE5QyxNQUFNLFNBQUMsV0FBVztZQWRsQixrQkFBa0I7WUFDbEIscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBKb3lyaWRlU3RlcFNlcnZpY2UgfSBmcm9tICcuL2pveXJpZGUtc3RlcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSm95cmlkZU9wdGlvbnNTZXJ2aWNlIH0gZnJvbSAnLi9qb3lyaWRlLW9wdGlvbnMuc2VydmljZSc7XHJcbmltcG9ydCB7IEpveXJpZGVPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL2pveXJpZGUtb3B0aW9ucy5jbGFzcyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGZpbmFsaXplIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBKb3lyaWRlU3RlcEluZm8gfSBmcm9tICcuLi9tb2RlbHMvam95cmlkZS1zdGVwLWluZm8uY2xhc3MnO1xyXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBKb3lyaWRlU2VydmljZSB7XHJcbiAgICBwcml2YXRlIHRvdXJJblByb2dyZXNzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIHRvdXIkOiBPYnNlcnZhYmxlPEpveXJpZGVTdGVwSW5mbz47XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBzdGVwU2VydmljZTogSm95cmlkZVN0ZXBTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgb3B0aW9uc1NlcnZpY2U6IEpveXJpZGVPcHRpb25zU2VydmljZVxyXG4gICAgKSB7fVxyXG5cclxuICAgIHN0YXJ0VG91cihvcHRpb25zPzogSm95cmlkZU9wdGlvbnMpOiBPYnNlcnZhYmxlPEpveXJpZGVTdGVwSW5mbz4ge1xyXG4gICAgICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gb2YobmV3IEpveXJpZGVTdGVwSW5mbygpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLnRvdXJJblByb2dyZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG91ckluUHJvZ3Jlc3MgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zU2VydmljZS5zZXRPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudG91ciQgPSB0aGlzLnN0ZXBTZXJ2aWNlLnN0YXJ0VG91cigpLnBpcGUoZmluYWxpemUoKCkgPT4gKHRoaXMudG91ckluUHJvZ3Jlc3MgPSBmYWxzZSkpKTtcclxuICAgICAgICAgICAgdGhpcy50b3VyJC5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG91ciQ7XHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2VUb3VyKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmlzVG91ckluUHJvZ3Jlc3MoKSkgdGhpcy5zdGVwU2VydmljZS5jbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzVG91ckluUHJvZ3Jlc3MoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG91ckluUHJvZ3Jlc3M7XHJcbiAgICB9XHJcbn1cclxuIl19