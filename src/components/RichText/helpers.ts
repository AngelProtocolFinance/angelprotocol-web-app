import Delta from "quill-delta";
import type { RichTextContent } from "types/components";

export const toDelta = (json: string): Delta => {
  try {
    return new Delta(JSON.parse(json));
  } catch (_) {
    return new Delta([{ insert: json }]);
  }
};

export const toContent = (json: string | undefined): RichTextContent => {
  const delta = toDelta(json || "");
  return {
    length: delta.length() - 1,
    value: json || "",
  };
};

export function toText(json: string | undefined) {
  return toDelta(json ?? "").ops.reduce((text, op) => {
    if (typeof op.insert === "string") {
      return text + op.insert;
    } else if (typeof op.insert === "object" && op.insert.text) {
      return text + op.insert.text;
    } else if (typeof op.insert === "object" && op.insert.image) {
      return text + (op.attributes?.alt || "");
    }
    return text;
  }, "");
}
