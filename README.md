# 📦 ngx-image-compression

A **lightweight image compression and conversion library** for Angular. Ideal for optimizing large images (like 10MB+) **before uploading to S3 or a server**. Supports format conversion (e.g., JPG → WebP), resizing, quality tuning, and base64 or Blob output.

---

## 🚀 Features

- 🔧 Compress images using canvas
- 📐 Resize to desired dimensions
- 🎯 Convert to different formats (`webp`, `jpeg`, `png`)
- 🧠 Works with File, Blob, or base64 outputs
- 📦 Lightweight and framework-friendly
- 🟢 Built for Angular 16+ standalone architecture

---

## 📥 Installation

```
npm install ngx-image-lite
```

---

## 🛠️ Usage

```
import { compressImage } from 'ngx-image-lite';

const result = await compressImage(file, {
  maxWidth: 800,
  maxHeight: 800,
  quality: 0.7,
  format: 'webp',         // optional: 'jpeg', 'png', or 'webp'
  returnType: 'file',     // 'file' | 'base64' | 'blob'
  fileName: 'output'      // only for returnType: 'file'
});
```

---

## 📘 Parameters

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `maxWidth` | `number` | `800` | Max width of output image |
| `maxHeight` | `number` | `800` | Max height of output image |
| `quality` | `number` | `0.7` | Compression quality (0 to 1) |
| `format` | `string` | `'webp'` | Output format: 'webp', 'jpeg', 'png' |
| `returnType` | `string` | `'file'` | 'file', 'base64', or 'blob' |
| `fileName` | `string` | `'output'` | File name (if returnType is file) |

---

## 📦 Returns

- If `returnType = 'file'` → returns a `File` object
- If `returnType = 'blob'` → returns a `Blob`
- If `returnType = 'base64'` → returns a `string` (base64)

---

## 🖼️ Example with Angular

```
const result = await compressImage(file, {
  maxWidth: 1024,
  maxHeight: 1024,
  quality: 0.6,
  format: 'jpeg',
  returnType: 'base64'
});
this.previewUrl = result; // Display in 
```

---

## 📌 Use Cases

- Upload large images to AWS S3 with smaller payload
- Resize user-uploaded profile or gallery images
- Convert formats (e.g., PNG → WebP) for optimized delivery
- Reduce load on backend image processing

---

## 🔖 License

[MIT](LICENSE)

---

## 🔍 Keywords

angular, image compression, image conversion, webp, optimize image, resize, compress, image, s3 upload, ngx, frontend compression
```