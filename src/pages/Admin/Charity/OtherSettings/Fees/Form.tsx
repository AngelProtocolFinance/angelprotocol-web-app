import FeesTable from "components/ast";

export default function FeesForm(props: React.HTMLAttributes<HTMLFormElement>) {
  return (
    <form {...props}>
      <h3 className="mb-2">Fees</h3>
      <p className="mb-8">
        Fees of 2% on balances and 1.5% on withdrawals are automatically sent to
        the protocol's treasury. Here, you can set additional fees that will be
        distributed to the address of your choice
      </p>
      <FeesTable />
    </form>
  );
}
