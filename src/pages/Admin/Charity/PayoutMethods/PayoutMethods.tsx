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
            bankAccountNumber: "1231",
            bankName: "Solana 10dPERyear",
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
