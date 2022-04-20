import fleekStorage from "@fleekhq/fleek-storage-js";
import { FileWrapper } from "components/FileDropzone/types";

const API_KEY = process.env.REACT_APP_FLEEK_API_KEY;
const API_SECRET = process.env.REACT_APP_FLEEK_API_SECRET;

export default async function uploadToIpfs(
  file: FileWrapper,
  folder?: string
): Promise<string> {
  try {
    const uploadedFile = await fleekStorage.upload({
      key: folder ? [folder, file.name].join("") : file.name,
      apiKey: API_KEY!,
      apiSecret: API_SECRET!,
      data: file.file,
    });
    return uploadedFile.publicUrl;
  } catch (e) {
    console.log("Error uploading file: ", e);
    throw new Error("Error uploading file to ipfs");
  }
}
