import { useFormContext } from "react-hook-form";
import FeesTable from "components/ast";
import { Reset, Submit } from "../common/Btn";
import { SubHeading } from "../common/SubHeading";

export default function FeesForm(props: React.HTMLAttributes<HTMLFormElement>) {
  const {
    formState: { isDirty },
  } = useFormContext();
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
      <div className="flex justify-start gap-3 w-full">
        <Reset disabled={!isDirty}>Reset changes</Reset>
        <Submit>Submit changes</Submit>
      </div>
    </form>
  );
}
