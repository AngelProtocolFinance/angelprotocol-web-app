import FeesTable from "components/ast";
import { SubHeading } from "../common/SubHeading";

export default function FeesForm(props: React.HTMLAttributes<HTMLFormElement>) {
  return (
    <form
      {...props}
      className="grid content-start gap-8 p-8 border border-prim rounded dark:bg-blue-d6"
    >
      <SubHeading>Fees</SubHeading>
      <p>
        Fees of 2% on balances and 1.5% on withdrawals are automatically sent to
        the protocol's treasury. Here, you can set additional fees that will be
        distributed to the address of your choice
      </p>
      <FeesTable />
    </form>
  );
}
