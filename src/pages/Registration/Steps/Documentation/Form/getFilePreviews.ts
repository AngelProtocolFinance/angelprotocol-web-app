import { FileObject } from "types/aws";
import { Asset } from "components/registration";
import { uploadToIpfs } from "helpers";

export async function getFilePreviews<T extends { [index: string]: Asset }>(
  fields: T
): Promise<{ [key in keyof T]: FileObject[] }> {
  const positions: { [index: string]: [number, number] } = {};
  let pos = 0;
  let files: File[] = [];
  for (const [key, asset] of Object.entries(fields)) {
    const numFiles = asset.files.length;
    positions[key] = [pos, pos + asset.files.length];
    files.push(...asset.files);
    pos += numFiles;
  }
  const urls = await uploadToIpfs(files);
  //map file names to urls
  const previews: FileObject[] = files.map(({ name }, i) => ({
    name,
    publicUrl: urls[i],
  }));

  //rebuild object with preview urls
  const result: any = {};
  for (const [key, [start, end]] of Object.entries(positions)) {
    const _previews = previews.slice(start, end);
    //return previous previews if no new urls
    result[key] = _previews.length <= 0 ? fields[key].previews : _previews;
  }

  return result;
}
