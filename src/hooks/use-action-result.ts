import { useEffect } from "react";
import { toast } from "sonner";
import { type ActionResult, isSuccess } from "types/action";

export const useActionResult = (result: ActionResult | undefined) => {
  useEffect(() => {
    if (!result) return;
    if (isSuccess(result)) {
      toast.success(result.success);
      return;
    }
    toast.error(result.err);
  }, [result]);
};
