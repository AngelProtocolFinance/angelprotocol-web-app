import { APIs } from "constants/urls";
import { createAuthToken } from "./createAuthToken";

const SPACES = /\s+/g;
export async function uploadFiles(
  files: File[],
  bucket: "endow-profiles" | "endow_reg"
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
          fileName: `${timeStamp}-$_${f.name.replace(SPACES, "_")}`,
        }),
        headers: { authorization },
      })
    )
  );

  //return baseURL and let consumer build file path
  return `https://${bucket}.s3.amazonaws.com/${timeStamp}`;
}

export function getFullURL(baseURL: string, fileName: string) {
  return `${baseURL}-${fileName.replace(SPACES, "_")}`;
}

function toDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}
