import { useEffect } from "react";
import { toast } from "sonner";
import {
  type ActionData,
  type IFormInvalid,
  is_data,
  is_err,
  is_form_err,
  is_ok,
} from "types/action";

interface Cbs<T> {
  on_data?: (data: T) => void;
  on_err?: (err: string) => void;
}

export const use_action_result = <T>(
  result: ActionData<T> | undefined,
  cbs?: Cbs<T>
): IFormInvalid | undefined => {
  // biome-ignore lint: make sure cbs is the same
  useEffect(() => {
    if (!result) return;
    if (is_data<T>(result)) {
      cbs?.on_data?.(result);
      if (is_ok(result)) {
        toast.success(result.__ok);
      }
      return;
    }

    if (is_err(result)) {
      cbs?.on_err?.(result.__err);
      toast.error(result.__err);
    }
  }, [result]);

  if (is_form_err(result)) {
    return result;
  }
};
