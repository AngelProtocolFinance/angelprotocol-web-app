import { AccountRequirements } from "./types";

type Props = {
  targetCurrency: string;
  accountRequirements: AccountRequirements;
};

export default function RecipientDetailsForm({
  accountRequirements,
  targetCurrency,
}: Props) {
  return <div>{JSON.stringify(accountRequirements)}</div>;
}
