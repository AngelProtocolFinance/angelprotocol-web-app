import { useEffect } from "react";

export default function useAttachKeyPressHandler(
  targetKey: string,
  keyPressHandler: () => void
) {
  useEffect(() => {
    const handleKeyDown = ({ key }: KeyboardEvent) => {
      if (key === targetKey) keyPressHandler();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [keyPressHandler, targetKey]);
}
