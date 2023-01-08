import { FileObject } from "types/aws";
import { Asset } from "components/registration";
import { genPublicUrl, uploadToIpfs } from "helpers/uploadToIpfs";

export async function getFilePreviews<T extends { [index: string]: Asset }>(
  fields: T
): Promise<{ [key in keyof T]: FileObject[] }> {
  const files = Object.entries(fields).flatMap<File>(
    ([, asset]) => asset.files
  );
  const cid = await uploadToIpfs(files);
  const result: any = {};

  for (const key in fields) {
    const asset = fields[key];
    if (asset.files.length > 0 && cid) {
      result[key] = asset.files.map<FileObject>((f) => ({
        name: f.name,
        publicUrl: genPublicUrl(cid, f.name),
      }));
    } else {
      result[key] = asset.previews;
    }
  }
  return result;
}
