import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { EndowmentUpdateValues } from "pages/Admin/types";
import { useEndowmentsQuery } from "services/juno/registrar";
import useDebouncer from "hooks/useDebouncer";

export default function useStatusPreview() {
  const { watch, getFieldState, setValue } =
    useFormContext<EndowmentUpdateValues>();
  const inputId = watch("id");
  const isInvalid = getFieldState("id").error !== undefined;
  const [debInputId, isDebouncing] = useDebouncer(inputId, 500);

  const { endowmentStatus, isEndowmentStatusLoading } = useEndowmentsQuery(
    {},
    {
      skip: isDebouncing || isInvalid,
      selectFromResult: ({ data, isLoading, isFetching }) => ({
        endowmentStatus: data?.find((endowment) => endowment.id === debInputId)
          ?.status,
        isEndowmentStatusLoading: isLoading || isFetching,
      }),
    }
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
