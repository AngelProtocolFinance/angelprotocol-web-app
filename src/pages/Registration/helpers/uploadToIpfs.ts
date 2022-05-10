import fleekStorage from "@fleekhq/fleek-storage-js";
import { FileObject } from "services/aws/types";

const API_KEY = process.env.REACT_APP_FLEEK_API_KEY!;
const API_SECRET = process.env.REACT_APP_FLEEK_API_SECRET!;

async function uploadToIpfs(file: File, folder: string): Promise<FileObject> {
  try {
    const relativePath = [folder, encodeURIComponent(file.name)].join("");

    const result = await fleekStorage.upload({
      key: relativePath,
      apiKey: API_KEY,
      apiSecret: API_SECRET,
      data: file,
    });

    return {
      name: file.name,
      publicUrl: result.publicUrl,
    };
  } catch (e) {
    // console.log("Error uploading file: ", filename);
    // throw new Error("Error uploading file to ipfs");
    return { name: "", publicUrl: "" };
  }
}

export default uploadToIpfs;
