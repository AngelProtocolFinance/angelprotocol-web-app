import Compress from "compress.js";

const compress = new Compress();
export default async function optimizeImage(file: File) {
  if (!compress) throw new Error("Image compressor is not initialized");
  const resizedImage = await compress.compress([file], {
    size: 0.4, // the max size in MB, defaults to 2MB
    quality: 0.8, // the quality of the image, max is 1,
  });
  const img = resizedImage[0];
  const base64str = img.data;
  const imgExt = img.ext;
  const resizedFiile = Compress.convertBase64ToFile(base64str, imgExt);
  return resizedFiile;
}
