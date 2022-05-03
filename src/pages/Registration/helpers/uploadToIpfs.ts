import fleekStorage from "@fleekhq/fleek-storage-js";
import { FileObject } from "services/aws/types";
import { Folders } from "../constants";

async function uploadToIpfs(file: File, folder?: Folders): Promise<FileObject> {
  try {
    const encodedName = encodeURIComponent(file.name);
    const relativePath = folder ? [folder, encodedName].join("/") : encodedName;

    const result = await fleekStorage.upload({
      key: relativePath,
      apiKey: process.env.REACT_APP_FLEEK_API_KEY!,
      apiSecret: process.env.REACT_APP_FLEEK_API_SECRET!,
      data: file,
    });

    return {
      name: file.name,
      publicUrl: result.publicUrl,
    };
  } catch (e) {
    console.log(`Error uploading file ${file?.name}`, e);
    return {
      name: "",
      publicUrl: "",
    };
  }
}

export default uploadToIpfs;
