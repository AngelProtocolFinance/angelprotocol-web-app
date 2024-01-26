import Quill from "quill";

export function richTextToHTML(richTextJson: string) {
  const tempCont = document.createElement("div");
  const quill = new Quill(tempCont);
  quill.setContents(JSON.parse(richTextJson));
  return tempCont.getElementsByClassName("ql-editor")[0].innerHTML;
}
