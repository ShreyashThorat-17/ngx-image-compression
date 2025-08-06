// src/index.ts
async function compressImage(file, options = {}) {
  const {
    maxWidth = 1024,
    maxHeight = 1024,
    quality = 0.7,
    format = "webp",
    returnType = "file",
    fileName = "compressed"
  } = options;
  const dataUrl = await readFileAsDataURL(file);
  const img = await loadImage(dataUrl);
  const { width, height } = resizeDimensions(img.width, img.height, maxWidth, maxHeight);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height);
  const mimeType = `image/${format}`;
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) return reject(new Error("Compression failed"));
        if (returnType === "blob") {
          resolve(blob);
        } else if (returnType === "base64") {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
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
function resizeDimensions(width, height, maxW, maxH) {
  let ratio = Math.min(maxW / width, maxH / height);
  ratio = ratio < 1 ? ratio : 1;
  return {
    width: Math.round(width * ratio),
    height: Math.round(height * ratio)
  };
}
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
function loadImage(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataUrl;
  });
}
export {
  compressImage
};
