import { LoadedImage } from '../interfaces';
import { CropperSettings } from '../interfaces/cropper.settings';
import * as ɵngcc0 from '@angular/core';
export declare class LoadImageService {
    private autoRotateSupported;
    loadImageFile(file: File, cropperSettings: CropperSettings): Promise<LoadedImage>;
    private loadImage;
    private isValidImageType;
    loadImageFromURL(url: string, cropperSettings: CropperSettings): Promise<LoadedImage>;
    loadBase64Image(imageBase64: string, cropperSettings: CropperSettings): Promise<LoadedImage>;
    private transformImageBase64;
    transformLoadedImage(loadedImage: Partial<LoadedImage>, cropperSettings: CropperSettings): Promise<LoadedImage>;
    private loadImageFromBase64;
    private getTransformedSize;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<LoadImageService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDeclaration<LoadImageService>;
}

//# sourceMappingURL=load-image.service.d.ts.map