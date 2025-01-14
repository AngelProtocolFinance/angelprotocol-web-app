import Quill, { Delta } from "quill/core";
import type { RichTextContent } from "types/components";

const quill = new Quill(document.createElement("div"));

export const toDelta = (content: RichTextContent): Delta => {
  try {
    return new Delta(JSON.parse(content.value));
  } catch (_) {
    return new Delta([{ insert: content.value }]);
  }
};

export const toText = (content: RichTextContent): string => {
  try {
    quill.setContents(toDelta(content));
    return quill.getText();
  } catch (_) {
    return content.value;
  }
};
