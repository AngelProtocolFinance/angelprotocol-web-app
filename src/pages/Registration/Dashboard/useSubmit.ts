import { useCallback } from "react";
import { useSubmitMutation } from "services/aws/registration";
import { CharityData } from "../store";

export default function useSubmit() {
  const [submitToAws] = useSubmitMutation();

  const submit = useCallback(async (charity: CharityData) => {}, []);

  return submit;
}
