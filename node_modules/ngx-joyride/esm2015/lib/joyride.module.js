import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoyrideDirective } from './directives/joyride.directive';
import { JoyrideService } from './services/joyride.service';
import { JoyrideStepComponent } from './components/step/joyride-step.component';
import { JoyrideButtonComponent } from './components/button/button.component';
import { JoyrideCloseButtonComponent } from './components/close-button/close-button.component';
import { JoyrideStepService } from './services/joyride-step.service';
import { JoyrideBackdropService } from './services/joyride-backdrop.service';
import { JoyrideArrowComponent } from './components/arrow/arrow.component';
import { EventListenerService } from './services/event-listener.service';
import { JoyrideStepsContainerService } from './services/joyride-steps-container.service';
import { DocumentService } from './services/document.service';
import { JoyrideOptionsService } from './services/joyride-options.service';
import { StepDrawerService } from './services/step-drawer.service';
import { DomRefService } from './services/dom.service';
import { LoggerService } from './services/logger.service';
import { RouterModule } from '@angular/router';
import { TemplatesService } from './services/templates.service';
export const routerModuleForChild = RouterModule.forChild([]);
export class JoyrideModule {
    static forRoot() {
        return {
            ngModule: JoyrideModule,
            providers: [
                JoyrideService,
                JoyrideStepService,
                JoyrideStepsContainerService,
                JoyrideBackdropService,
                EventListenerService,
                DocumentService,
                JoyrideOptionsService,
                StepDrawerService,
                DomRefService,
                LoggerService,
                TemplatesService,
            ],
        };
    }
    static forChild() {
        return {
            ngModule: JoyrideModule,
            providers: [],
        };
    }
}
JoyrideModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, routerModuleForChild],
                declarations: [
                    JoyrideDirective,
                    JoyrideStepComponent,
                    JoyrideArrowComponent,
                    JoyrideButtonComponent,
                    JoyrideCloseButtonComponent,
                ],
                exports: [JoyrideDirective],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam95cmlkZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtam95cmlkZS9zcmMvbGliL2pveXJpZGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDaEYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDOUUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDL0YsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDckUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDN0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDM0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDekUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDMUYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzlELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRWhFLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUE2QixZQUFZLENBQUMsUUFBUSxDQUMvRSxFQUFFLENBQ0wsQ0FBQztBQWFGLE1BQU0sT0FBTyxhQUFhO0lBQ3RCLE1BQU0sQ0FBQyxPQUFPO1FBQ1YsT0FBTztZQUNILFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFNBQVMsRUFBRTtnQkFDUCxjQUFjO2dCQUNkLGtCQUFrQjtnQkFDbEIsNEJBQTRCO2dCQUM1QixzQkFBc0I7Z0JBQ3RCLG9CQUFvQjtnQkFDcEIsZUFBZTtnQkFDZixxQkFBcUI7Z0JBQ3JCLGlCQUFpQjtnQkFDakIsYUFBYTtnQkFDYixhQUFhO2dCQUNiLGdCQUFnQjthQUNuQjtTQUNKLENBQUM7SUFDTixDQUFDO0lBQ0QsTUFBTSxDQUFDLFFBQVE7UUFDWCxPQUFPO1lBQ0gsUUFBUSxFQUFFLGFBQWE7WUFDdkIsU0FBUyxFQUFFLEVBQUU7U0FDaEIsQ0FBQztJQUNOLENBQUM7OztZQW5DSixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLG9CQUFvQixDQUFDO2dCQUM3QyxZQUFZLEVBQUU7b0JBQ1YsZ0JBQWdCO29CQUNoQixvQkFBb0I7b0JBQ3BCLHFCQUFxQjtvQkFDckIsc0JBQXNCO29CQUN0QiwyQkFBMkI7aUJBQzlCO2dCQUNELE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDO2FBQzlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgSm95cmlkZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9qb3lyaWRlLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IEpveXJpZGVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9qb3lyaWRlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBKb3lyaWRlU3RlcENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdGVwL2pveXJpZGUtc3RlcC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBKb3lyaWRlQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2J1dHRvbi9idXR0b24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgSm95cmlkZUNsb3NlQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Nsb3NlLWJ1dHRvbi9jbG9zZS1idXR0b24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgSm95cmlkZVN0ZXBTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9qb3lyaWRlLXN0ZXAuc2VydmljZSc7XHJcbmltcG9ydCB7IEpveXJpZGVCYWNrZHJvcFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2pveXJpZGUtYmFja2Ryb3Auc2VydmljZSc7XHJcbmltcG9ydCB7IEpveXJpZGVBcnJvd0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9hcnJvdy9hcnJvdy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBFdmVudExpc3RlbmVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZXZlbnQtbGlzdGVuZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEpveXJpZGVTdGVwc0NvbnRhaW5lclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2pveXJpZGUtc3RlcHMtY29udGFpbmVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBEb2N1bWVudFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2RvY3VtZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBKb3lyaWRlT3B0aW9uc1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2pveXJpZGUtb3B0aW9ucy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3RlcERyYXdlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3N0ZXAtZHJhd2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBEb21SZWZTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9kb20uc2VydmljZSc7XHJcbmltcG9ydCB7IExvZ2dlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2xvZ2dlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgVGVtcGxhdGVzU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvdGVtcGxhdGVzLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJvdXRlck1vZHVsZUZvckNoaWxkOiBNb2R1bGVXaXRoUHJvdmlkZXJzPGFueT4gPSBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoXHJcbiAgICBbXVxyXG4pO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIHJvdXRlck1vZHVsZUZvckNoaWxkXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEpveXJpZGVEaXJlY3RpdmUsXHJcbiAgICAgICAgSm95cmlkZVN0ZXBDb21wb25lbnQsXHJcbiAgICAgICAgSm95cmlkZUFycm93Q29tcG9uZW50LFxyXG4gICAgICAgIEpveXJpZGVCdXR0b25Db21wb25lbnQsXHJcbiAgICAgICAgSm95cmlkZUNsb3NlQnV0dG9uQ29tcG9uZW50LFxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtKb3lyaWRlRGlyZWN0aXZlXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIEpveXJpZGVNb2R1bGUge1xyXG4gICAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxKb3lyaWRlTW9kdWxlPiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmdNb2R1bGU6IEpveXJpZGVNb2R1bGUsXHJcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgICAgICAgICAgSm95cmlkZVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBKb3lyaWRlU3RlcFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBKb3lyaWRlU3RlcHNDb250YWluZXJTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgSm95cmlkZUJhY2tkcm9wU2VydmljZSxcclxuICAgICAgICAgICAgICAgIEV2ZW50TGlzdGVuZXJTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgRG9jdW1lbnRTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgSm95cmlkZU9wdGlvbnNTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgU3RlcERyYXdlclNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBEb21SZWZTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgTG9nZ2VyU2VydmljZSxcclxuICAgICAgICAgICAgICAgIFRlbXBsYXRlc1NlcnZpY2UsXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBmb3JDaGlsZCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEpveXJpZGVNb2R1bGU+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZ01vZHVsZTogSm95cmlkZU1vZHVsZSxcclxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==