import { ElementRef } from '@angular/core';
import { CropperSettings } from '../interfaces/cropper.settings';
import { CropperPosition, ImageCroppedEvent, LoadedImage } from '../interfaces';
import * as ɵngcc0 from '@angular/core';
export declare class CropService {
    crop(sourceImage: ElementRef, loadedImage: LoadedImage, cropper: CropperPosition, settings: CropperSettings): ImageCroppedEvent | null;
    private getImagePosition;
    private getOffsetImagePosition;
    getResizeRatio(width: number, height: number, settings: CropperSettings): number;
    getQuality(settings: CropperSettings): number;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<CropService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDeclaration<CropService>;
}

//# sourceMappingURL=crop.service.d.ts.map