import Quill from "quill";

export function richTextToHTML(inputDelta: any) {
  var tempCont = document.createElement("div");
  const quill = new Quill(tempCont);
  quill.setContents(inputDelta);
  return tempCont.getElementsByClassName("ql-editor")[0].innerHTML;
}
