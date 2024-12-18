import { APIs } from "constants/urls";
import { version as v } from "services/helpers";
import type { Bucket } from "types/lists";
import { jwtToken } from "./jwt-token";

export const bucketURL = "s3.amazonaws.com";

const SPACES = /\s+/g;

function toDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export async function uploadFile(file: File, bucket: Bucket) {
  const key = `${Date.now()}_${file.name.replace(SPACES, "_")}`;
  const res = await fetch(APIs.aws + `/${v(2)}/file-upload`, {
    method: "POST",
    body: JSON.stringify({
      bucket,
      dataUri: await toDataURL(file),
      fileName: key,
    }),
    headers: { authorization: `Bearer ${await jwtToken()}` },
  });

  if (!res.ok) throw res;
  return `https://${bucket}.${bucketURL}/${key}`;
}

export function toFileName(url: string) {
  const key = url.split("/").pop();
  return key?.split("_").slice(1).join("");
}
