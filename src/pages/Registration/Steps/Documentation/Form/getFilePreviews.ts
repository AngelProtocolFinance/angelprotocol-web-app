import { FileObject } from "types/aws";
import { Asset } from "components/registration";
import { getFullURL, uploadFiles } from "helpers/uploadFiles";

export async function getFilePreviews<T extends { [index: string]: Asset }>(
  fields: T
): Promise<{ [key in keyof T]: FileObject[] }> {
  const files = Object.entries(fields).flatMap<File>(
    ([, asset]) => asset.files
  );

  const baseURL = await uploadFiles(files, "endow_reg");
  const result: any = {};

  for (const key in fields) {
    const asset = fields[key];
    if (asset.files.length > 0 && baseURL) {
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
