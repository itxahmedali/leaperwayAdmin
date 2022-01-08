import { RendererFactory2 } from '@angular/core';
import { Subject } from 'rxjs';
import { DomRefService } from './dom.service';
export declare class Scroll {
    scrollX: number;
    scrollY: number;
}
export declare class EventListenerService {
    private readonly rendererFactory;
    private readonly DOMService;
    private renderer;
    private scrollUnlisten;
    private resizeUnlisten;
    scrollEvent: Subject<Scroll>;
    resizeEvent: Subject<number>;
    constructor(rendererFactory: RendererFactory2, DOMService: DomRefService);
    startListeningScrollEvents(): void;
    startListeningResizeEvents(): void;
    stopListeningScrollEvents(): void;
    stopListeningResizeEvents(): void;
}
