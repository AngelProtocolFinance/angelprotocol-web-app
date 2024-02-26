import { RichTextContent } from "types/components";

export type FormValues = {
  purchaser: string;
  recipient: { name: string; email: string };
  message: RichTextContent;

  //meta
  secret: string;
};
