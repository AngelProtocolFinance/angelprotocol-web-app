import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { EndowmentUpdateValues } from "pages/Admin/types";
import { useEndowmentStatus } from "services/juno/registrar/queriers";
import useDebouncer from "hooks/useDebouncer";

export default function useStatusPreview() {
  const { watch, getFieldState, setValue } =
    useFormContext<EndowmentUpdateValues>();
  const inputAddr = watch("endowmentAddr");
  const { invalid } = getFieldState("endowmentAddr");
  const [debInputAddress, isDebouncing] = useDebouncer<string>(inputAddr, 500);
  const { endowmentStatus, isEndowmentStatusLoading } = useEndowmentStatus(
    debInputAddress,
    //skip async call when field is invalid or still debouncing
    isDebouncing || invalid
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
    isRenderPreview: !invalid && inputAddr !== "",
    endowmentStatus,
  };
}
