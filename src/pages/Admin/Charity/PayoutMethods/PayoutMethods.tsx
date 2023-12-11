import { useNewBankingApplicationMutation } from "services/aws/banking-applications";
import List from "./List";

export default function PayoutMethods() {
  const [newApplication] = useNewBankingApplicationMutation();
  return (
    <div>
      <button
        type="button"
        onClick={async () => {
          await newApplication({
            wiseRecipientID: window.crypto.randomUUID(),
            bankAccountNumber: "3321",
            bankName: "No coiners fiat bank",
            endowmentID: 32,
            payoutCurrency: "USD",
            bankStatementFile: {
              name: "Bank statement",
              publicUrl: "https://google.com",
            },
          });
        }}
      >
        create new banking record
      </button>
      <List />
    </div>
  );
}
