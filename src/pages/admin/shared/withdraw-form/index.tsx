import { Dialog, DialogBackdrop } from "@headlessui/react";
import { useNavigate } from "@remix-run/react";
import { Panel } from "./panel";
import type { Props } from "./types";

export { type SubmitFV, type Schema, schema } from "./types";

export function WithdrawForm(props: Props) {
  const navigate = useNavigate();

  return (
    <Dialog
      open={true}
      onClose={() =>
        navigate("..", { replace: true, preventScrollReset: true })
      }
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 data-closed:opacity-0" />
      <Panel {...props} />
    </Dialog>
  );
}
