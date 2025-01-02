import { useEffect } from "react";
import { toast } from "sonner";
import { type ActionData, isData, isErr } from "types/action";

export const useActionToast = (result: ActionData | undefined) => {
  useEffect(() => {
    if (!result) return;
    if (isData(result)) {
      toast.success(result.__ok);
      return;
    }

    if (isErr(result)) {
      toast.error(result.__err);
    }
  }, [result]);
};
