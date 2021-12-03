import { useSetter } from "store/accessors";
import { setStage } from "services/donation/donationSlice";
import { Step } from "services/donation/types";

export default function useErrorHandler() {
  const dispatch = useSetter();
  return function handleError(message: string, url?: string) {
    dispatch(setStage({ step: Step.error, content: { message, url } }));
  };
}
