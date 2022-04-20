import { useEffect } from "react";

export default function useAttachKeyPressHandler(
  targetKey: string,
  keyPressHandler: () => void
) {
  const handleKeyDown = ({ key }: KeyboardEvent) => {
    if (key === targetKey) keyPressHandler();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
