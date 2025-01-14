import Delta from "quill-delta";
import type { RichTextContent } from "types/components";

export const parseContent = (content?: string): RichTextContent => {
  if (!content) return { length: 0, value: "" };
  try {
    const ops = JSON.parse(content);
    const delta = new Delta(ops);
    return { value: content, length: delta.length() - 1 };
  } catch (_) {
    return { length: content.length, value: content };
  }
};
