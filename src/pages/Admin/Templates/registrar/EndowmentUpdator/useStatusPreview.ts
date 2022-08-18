import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { EndowmentUpdateValues } from "pages/Admin/types";
import useDebouncer from "hooks/useDebouncer";
import { useEndowmentStatus } from "./useEndowmentStatus";

export default function useStatusPreview() {
  const { watch, getFieldState, setValue } =
    useFormContext<EndowmentUpdateValues>();
  const inputAddr = watch("endowmentAddr");
  const isInvalid = getFieldState("endowmentAddr").error !== undefined;
  const [debInputAddress, isDebouncing] = useDebouncer<string>(inputAddr, 500);
  const { endowmentStatus, isEndowmentStatusLoading } = useEndowmentStatus(
    debInputAddress,
    //skip async call when field is invalid or still debouncing
    isDebouncing || isInvalid
  );

  useEffect(() => {
    //set prevStatus value to use in send validation
    setValue("prevStatus", endowmentStatus);
    //eslint-disable-next-line
  }, [endowmentStatus]);

  return {
    isPreviewLoading: isDebouncing || isEndowmentStatusLoading,
    //fieldState isDirty, isTouched not working well
    //inputAddr can be both valid and == "" on initial render
    isRenderPreview: !isInvalid && inputAddr !== "",
    endowmentStatus,
  };
}
