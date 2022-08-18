import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { EndowmentUpdateValues } from "pages/Admin/types";
import useDebouncer from "hooks/useDebouncer";
import { useEndowmentStatus } from "./useEndowmentStatus";

export default function useStatusPreview() {
  const { watch, getFieldState, setValue } =
    useFormContext<EndowmentUpdateValues>();
  const inputId = watch("id");
  const isInvalid = getFieldState("id").error !== undefined;
  const [debInputId, isDebouncing] = useDebouncer(inputId, 500);
  const { endowmentStatus, isEndowmentStatusLoading } = useEndowmentStatus(
    debInputId, //debInputId is casted to string by textInput
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
    isRenderPreview: !isInvalid && debInputId !== 0,
    endowmentStatus,
  };
}
