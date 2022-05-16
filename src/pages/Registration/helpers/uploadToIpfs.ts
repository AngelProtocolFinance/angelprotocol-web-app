import fleekStorage from "@fleekhq/fleek-storage-js";

async function uploadToIpfs(uploadPath: string, file: File): Promise<string> {
  try {
    const { publicUrl } = await fleekStorage.upload({
      key: uploadPath,
      apiKey: process.env.REACT_APP_FLEEK_API_KEY!,
      apiSecret: process.env.REACT_APP_FLEEK_API_SECRET!,
      data: file,
    });

    return publicUrl;
  } catch (e) {
    console.log(`Error uploading file ${file?.name}`, e);
    return {
      name: "",
      publicUrl: "",
    };
  }
}

export default uploadToIpfs;
