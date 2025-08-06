export interface CompressOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'jpeg' | 'webp' | 'png';
  returnType?: 'blob' | 'file' | 'base64';
  fileName?: string;
}

export async function compressImage(
  file: File,
  options: CompressOptions = {}
): Promise<Blob | File | string> {
  const {
    maxWidth = 1024,
    maxHeight = 1024,
    quality = 0.6,
    format = 'webp',
    returnType = 'file',
    fileName = 'compressed'
  } = options;

  const dataUrl = await readFileAsDataURL(file);
  const img = await loadImage(dataUrl);

  const { width, height } = resizeDimensions(img.width, img.height, maxWidth, maxHeight);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0, width, height);

  const mimeType = `image/${format}`;

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => {
        if (!blob) return reject(new Error('Compression failed'));

        if (returnType === 'blob') {
          resolve(blob);
        } else if (returnType === 'base64') {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        } else {
          const compressedFile = new File([blob], `${fileName}.${format}`, { type: mimeType });
          resolve(compressedFile);
        }
      },
      mimeType,
      quality
    );
  });
}

function resizeDimensions(width: number, height: number, maxW: number, maxH: number) {
  let ratio = Math.min(maxW / width, maxH / height);
  ratio = ratio < 1 ? ratio : 1;
  return {
    width: Math.round(width * ratio),
    height: Math.round(height * ratio),
  };
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function loadImage(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataUrl;
  });
}
