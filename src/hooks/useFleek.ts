import fleekStorage from "@fleekhq/fleek-storage-js";
import { useState } from "react";

const API_KEY = process.env.REACT_APP_FLEEK_API_KEY;
const API_SECRET = process.env.REACT_APP_FLEEK_API_SECRET;

export default function useFleek() {
  const [isUploading, setIsUploading] = useState(false);

  async function upload(key: string, file: File) {
    try {
      setIsUploading(true);
      const uploadedFile = await fleekStorage.upload({
        key,
        apiKey: API_KEY!,
        apiSecret: API_SECRET!,
        data: file,
      });
      setIsUploading(false);
      return uploadedFile.publicUrl;
    } catch (e) {
      setIsUploading(false);
      console.log("Error uploading file: ", e);
      return;
    }
  }

  return { isUploading, upload };
}
