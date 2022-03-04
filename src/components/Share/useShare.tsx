import { useSetModal } from "components/Modal/Modal";
import SharePrompt from "./SharePrompt";

export default function useShare() {
  const { showModal } = useSetModal();

  function showShare() {
    showModal(SharePrompt, {});
  }

  return showShare;
}
