import { useFormContext } from "react-hook-form";
import { Reset, Submit, Tooltip } from "components/admin";
import FeesTable from "components/ast";
import { Form as Frm } from "../common/Form";
import { SubHeading } from "../common/SubHeading";

export default function FeesForm({
  tooltip,
  ...props
}: React.HTMLAttributes<HTMLFormElement> & { tooltip?: string }) {
  const {
    formState: { isDirty },
  } = useFormContext();

  return (
    <Frm {...props}>
      <SubHeading>Fees</SubHeading>
      {tooltip && <Tooltip tooltip={tooltip} />}
      <p>
        Fees of 2% on balances and 1.5% on withdrawals are automatically sent to
        the protocol's treasury. Here, you can set additional fees that will be
        distributed to the address of your choice
      </p>
      <FeesTable />
      {!tooltip && (
        <div className="flex justify-start gap-3 w-full">
          <Reset disabled={!isDirty}>Reset changes</Reset>
          <Submit>Submit changes</Submit>
        </div>
      )}
    </Frm>
  );
}
