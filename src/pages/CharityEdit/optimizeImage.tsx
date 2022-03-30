import Compress from "compress.js";
// import { useEffect, useRef } from "react";

const compress = new Compress();
export default async function optimizeImage(file: File) {
  if (!compress) return;
  const resizedImage = await compress?.compress([file], {
    size: 1, // the max size in MB, defaults to 2MB
    quality: 1, // the quality of the image, max is 1,
  });
  const img = resizedImage[0];
  const base64str = img.data;
  const imgExt = img.ext;
  const resizedFiile = Compress.convertBase64ToFile(base64str, imgExt);
  return resizedFiile;
}
