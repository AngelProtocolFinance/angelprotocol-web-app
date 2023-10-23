import { useCallback } from "react";
import { WiseRequest } from "services/types";
import { useWiseMutation } from "services/aws/aws";
import { useErrorContext } from "contexts/ErrorContext";

export default function useTypedWiseMutation(): [
  <T>(request: WiseRequest) => Promise<T>,
  ReturnType<typeof useWiseMutation>[1],
] {
  const { handleError } = useErrorContext();
  const [sendRequest, requestState] = useWiseMutation();

  const send = useCallback(
    async function <T>(request: WiseRequest): Promise<T> {
      return sendRequest(request)
        .unwrap()
        .then((res) => res as T);
    },
    [handleError, sendRequest]
  );

  return [send, requestState];
}
