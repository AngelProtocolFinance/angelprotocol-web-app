import { APIs } from "constants/urls";
import { createAuthToken } from "./createAuthToken";

export async function uploadFiles(
  files: File[],
  bucket: "endow-profiles | endow_reg"
): Promise<string | null> {
  if (files.length <= 0) return null;

  const dataURLs = await Promise.all(files.map((f) => toDataURL(f)));

  const timeStamp = Date.now();
  const authorization = createAuthToken("charity-owner");

  await Promise.all(
    files.map((f, idx) =>
      fetch(APIs.aws + "/v1/file-upload", {
        method: "POST",
        body: JSON.stringify({
          bucket,
          dataUri: dataURLs[idx],
          fileName: getUploadedName(f.name, timeStamp),
        }),
        headers: { authorization },
      })
    )
  );

  //return baseURL and let consumer build file path
  return `https://${bucket}.s3.amazonaws.com/${timeStamp}`;
}

function getUploadedName(name: string, timeStamp: number) {
  return `${timeStamp}-$_${name.replace(/\s+/g, "_")}`;
}

//https://docs.ipfs.tech/concepts/ipfs-gateway/#gateway-providers
export function genPublicUrl(baseURL: string, fileName: string) {
  return `${baseURL}-${fileName.replace(/\s+/g, "_")}`;
}

function toDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}
