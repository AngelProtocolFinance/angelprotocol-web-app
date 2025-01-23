import type { SubmissionResult } from "@conform-to/dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { type ActionData, isData, isErr, isFormErr, isOk } from "types/action";

interface Cbs<T> {
  onData?: (data: T) => void;
  onErr?: (err: string) => void;
}

export const useActionResult = <T>(
  result: ActionData<T> | undefined,
  cbs?: Cbs<T>
): SubmissionResult | undefined => {
  // biome-ignore lint: make sure cbs is the same
  useEffect(() => {
    if (!result) return;
    if (isData<T>(result)) {
      cbs?.onData?.(result);
      if (isOk(result)) {
        toast.success(result.__ok);
      }
      return;
    }

    if (isErr(result)) {
      cbs?.onErr?.(result.__err);
      toast.error(result.__err);
    }
  }, [result]);

  if (isFormErr(result)) {
    return result;
  }
};
