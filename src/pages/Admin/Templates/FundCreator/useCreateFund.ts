import { useFormContext } from "react-hook-form";
import { FundCreatorValues } from "./fundCreatorSchema";

export default function useCreateFund() {
  const { trigger, getValues } = useFormContext<FundCreatorValues>();

  async function createFund() {
    const isValid = await trigger([
      "title",
      "description",
      "fundName",
      "fundDescription",
      "expiryHeight",
      "expiryTime",
    ]);

    console.log(getValues("expiryTime"));

    console.log(isValid);
  }

  return { createFund };
}
