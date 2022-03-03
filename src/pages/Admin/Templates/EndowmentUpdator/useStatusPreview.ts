import { useEffect } from "react";
import useDebouncer from "hooks/useDebouncer";
import { useFormContext } from "react-hook-form";
import { useEndowmentStatus } from "services/terra/registrar/queriers";
import { EndowmentUpdateValues } from "./endowmentUpdateSchema";

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
  }, [endowmentStatus]);

  return {
    isPreviewLoading: isDebouncing || isEndowmentStatusLoading,
    //fieldState isDirty, isTouched not working well
    //inputAddr can be both valid and == "" on initial render
    isRenderPreview: !invalid && inputAddr !== "",
    endowmentStatus,
  };
}
