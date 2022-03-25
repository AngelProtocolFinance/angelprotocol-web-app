import Compress from "compress.js";
import { useEffect, useRef } from "react";

export default function useImageCompressor() {
  const ref = useRef<Compress>();

  useEffect(() => {
    const compress = new Compress();
    ref.current = compress;
  }, []);

  async function resize(file: File) {
    if (!ref.current) return;
    const resizedImage = await ref.current?.compress([file], {
      size: 2, // the max size in MB, defaults to 2MB
      quality: 1, // the quality of the image, max is 1,
      maxWidth: 300, // the max width of the output image, defaults to 1920px
      maxHeight: 300, // the max height of the output image, defaults to 1920px
      resize: true, // defaults to true, set false if you do not want to resize the image width and height
    });
    const img = resizedImage[0];
    const base64str = img.data;
    const imgExt = img.ext;
    const resizedFiile = Compress.convertBase64ToFile(base64str, imgExt);

    return resizedFiile;
  }

  return resize;
}
