import { LoadedImage } from '../interfaces';
import { CropperSettings } from '../interfaces/cropper.settings';
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
}
