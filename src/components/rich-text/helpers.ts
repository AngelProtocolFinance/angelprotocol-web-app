import Delta from "quill-delta";
import type { RichTextContent } from "types/components";

export const to_delta = (json: string): Delta => {
  try {
    return new Delta(JSON.parse(json));
  } catch (_) {
    return new Delta([{ insert: json }]);
  }
};

export const to_content = (json: string | undefined): RichTextContent => {
  const delta = to_delta(json || "");
  return {
    length: delta.length() - 1,
    value: json || "",
  };
};

export function toText(json: string | undefined) {
  return to_delta(json ?? "").ops.reduce((text, op) => {
    if (typeof op.insert === "string") {
      return text + op.insert;
    }
    if (typeof op.insert === "object" && op.insert.text) {
      return text + op.insert.text;
    }
    if (typeof op.insert === "object" && op.insert.image) {
      return text + (op.attributes?.alt || "");
    }
    return text;
  }, "");
}
