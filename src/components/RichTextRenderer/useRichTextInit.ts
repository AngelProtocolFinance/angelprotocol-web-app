import { useEffect, useRef } from "react";
import { EditorState, convertFromRaw, ContentState } from "draft-js";

//init rich text with edge case - content not in rt format
export default function useRichTextInit(
  content: string,
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>
) {
  const parseStatusRef = useRef<"init" | "error" | "success">("init");

  useEffect(() => {
    (async () => {
      try {
        if (
          parseStatusRef.current === "error" ||
          parseStatusRef.current === "success"
        ) {
          return;
        }
        const rawContent = JSON.parse(content);
        //if parsing is successful, "charity_overview" saved in db is already rich text
        parseStatusRef.current = "success";
        const contentState = convertFromRaw(rawContent);
        setEditorState(EditorState.createWithContent(contentState));
      } catch (err) {
        if (err instanceof SyntaxError) {
          parseStatusRef.current = "error";
          setEditorState(
            EditorState.createWithContent(
              //TODO: remove this || when `endowments/info` properly returns correct
              //status code on error
              ContentState.createFromText(content || "")
            )
          );
        }
      }
    })();
    //eslint-disable-next-line
  }, [content]);
}
