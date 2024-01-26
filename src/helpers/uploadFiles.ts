import { APIs } from "constants/urls";
import { isEmpty } from "./isEmpty";
import { jwtToken } from "./jwt-token";

export type Bucket = "endow-profiles" | "endow-reg";
export const bucketURL = "s3.amazonaws.com";

const SPACES = /\s+/g;
export async function uploadFiles(
  files: File[],
  bucket: Bucket,
): Promise<string | null> {
  if (isEmpty(files)) return null;

  const dataURLs = await Promise.all(files.map((f) => toDataURL(f)));
  const timeStamp = Date.now();

  const token = await jwtToken();

  await Promise.all(
    files.map((f, idx) =>
      fetch(APIs.aws + "/v1/file-upload", {
        method: "POST",
        body: JSON.stringify({
          bucket,
          dataUri: dataURLs[idx],
          fileName: `${timeStamp}-${f.name.replace(SPACES, "_")}`,
        }),
        headers: { authorization: `Bearer ${token}` },
      }),
    ),
  );

  //return baseURL and let consumer build file path
  return `https://${bucket}.${bucketURL}/${timeStamp}`;
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
