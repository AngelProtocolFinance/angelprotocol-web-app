import { useNewBankingApplicationMutation } from "services/aws/banking-applications";

export default function PayoutMethods() {
  const [newApplication] = useNewBankingApplicationMutation();
  return (
    <div>
      <button
        type="button"
        onClick={async () => {
          await newApplication({
            wiseRecipientID: window.crypto.randomUUID(),
            bankAccountNumber: "1234",
            bankName: "Bitcoin bank LTD",
            endowmentId: 1,
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
    </div>
  );
}
