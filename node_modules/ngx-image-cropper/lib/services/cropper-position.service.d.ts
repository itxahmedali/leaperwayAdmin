import { ElementRef } from '@angular/core';
import { CropperPosition, Dimensions, MoveStart } from '../interfaces';
import { CropperSettings } from '../interfaces/cropper.settings';
import * as ɵngcc0 from '@angular/core';
export declare class CropperPositionService {
    resetCropperPosition(sourceImage: ElementRef, cropperPosition: CropperPosition, settings: CropperSettings): void;
    move(event: any, moveStart: MoveStart, cropperPosition: CropperPosition): void;
    resize(event: any, moveStart: MoveStart, cropperPosition: CropperPosition, maxSize: Dimensions, settings: CropperSettings): void;
    checkAspectRatio(position: string, cropperPosition: CropperPosition, maxSize: Dimensions, settings: CropperSettings): void;
    getClientX(event: any): number;
    getClientY(event: any): number;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<CropperPositionService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDeclaration<CropperPositionService>;
}

//# sourceMappingURL=cropper-position.service.d.ts.map