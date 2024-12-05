import { APIs } from "constants/urls";
import { version as v } from "services/helpers";
import { toast } from "sonner";
import { jwtToken } from "./jwt-token";
import { logger } from "./logger";

export type Bucket = "endow-profiles" | "endow-reg" | "bg-user" | "bg-funds";
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
  const id = toast.loading(`Uploading ${file.name}..`);
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
  if (!res.ok) {
    logger.error(await res.text());
    toast.dismiss(id); //handled by caller
    return null;
  }

  toast.success(`Uploaded ${file.name}`, { id });
  return {
    publicUrl: `https://${bucket}.${bucketURL}/${key}`,
    name: file.name,
  };
}
