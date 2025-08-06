interface CompressOptions {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    format?: 'jpeg' | 'webp' | 'png';
    returnType?: 'blob' | 'file' | 'base64';
    fileName?: string;
}
declare function compressImage(file: File, options?: CompressOptions): Promise<Blob | File | string>;

export { type CompressOptions, compressImage };
