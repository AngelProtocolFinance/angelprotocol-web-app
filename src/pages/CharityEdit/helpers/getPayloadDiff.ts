import { EditableProfileAttr } from "services/aws/endowments/types";

export default function getPayloadDiff(
  prev: EditableProfileAttr,
  next: EditableProfileAttr
) {
  const diff: any = {};
  for (const key in prev) {
    const _key = key as keyof EditableProfileAttr;
    if (prev[_key] !== next[_key]) {
      diff[_key] = next[_key];
    }
  }
  return diff as Partial<EditableProfileAttr>;
}
