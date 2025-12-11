import { Dialog, DialogBackdrop } from "@headlessui/react";
import { useNavigate } from "react-router";
import { Panel } from "./panel";
import type { Props } from "./types";

export function Form(props: Props) {
  const navigate = useNavigate();

  function close() {
    navigate("..", { replace: true, preventScrollReset: true });
  }

  return (
    <Dialog open={true} onClose={close} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30 data-closed:opacity-0" />
      <Panel {...props} onClose={close} />
    </Dialog>
  );
}
