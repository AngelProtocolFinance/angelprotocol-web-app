import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckPreviousRegistrationMutation } from "services/aws/registration";
import { useSetter } from "store/accessors";
import useHandleError from "../useHandleError";

export default function useResume() {
  const [checkData] = useCheckPreviousRegistrationMutation();
  const dispatch = useSetter();
  const navigate = useNavigate();
  const handleError = useHandleError();

  const resume = useCallback(
    async (values: { refer: string }) => {
      const result = await checkData(values.refer);

      if ("error" in result) {
        return handleError(
          result.error,
          "No active charity application found with this registration reference"
        );
      }
    },
    [checkData, dispatch, handleError, navigate]
  );

  return resume;
}
