import { FileObject } from "types/aws";
import { FileDropzoneAsset } from "types/components";
import { isEmpty } from "helpers/isEmpty";
import { getFullURL, uploadFiles } from "../uploadFiles";

export async function getFilePreviews<
  T extends { [index: string]: FileDropzoneAsset },
>(fields: T): Promise<{ [key in keyof T]: FileObject[] }> {
  const files = Object.entries(fields).flatMap<File>(
    ([, asset]) => asset.files,
  );

  const baseURL = await uploadFiles(files, "endow-reg");
  const result: any = {};

  for (const key in fields) {
    const asset = fields[key];
    if (!isEmpty(asset.files) && baseURL) {
      result[key] = asset.files.map<FileObject>((f) => ({
        name: f.name,
        publicUrl: getFullURL(baseURL, f.name),
      }));
    } else {
      result[key] = asset.previews;
    }
  }
  return result;
}
