import { BankingApplicationStatus, PayoutMethod } from "types/aws";
import { useUpdateBankingApplicationMutation } from "services/aws/banking-applications";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import TableSection, { Cells } from "components/TableSection";
import DeletePrompt from "./DeletePrompt";

type Props = {
  methods: PayoutMethod[];
  classes?: string;
};

export default function Table({ methods, classes = "" }: Props) {
  return (
    <table
      className={`${classes} w-full text-sm rounded border border-separate border-spacing-0 border-prim`}
    >
      <TableSection
        type="thead"
        rowClass="bg-orange-l6 dark:bg-blue-d7 divide-x divide-prim"
      >
        <Cells
          type="th"
          cellClass="px-3 py-4 text-xs uppercase font-semibold text-left first:rounded-tl last:rounded-tr"
        >
          <></>
          <>Account</>
          <th className="text-center">Status</th>
          <>default</>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="even:bg-orange-l6 dark:odd:bg-blue-d6 dark:even:bg-blue-d7 divide-x divide-prim"
        selectedClass="bg-orange-l5 dark:bg-blue-d4"
      >
        {methods.map((row) => (
          <Cells
            key={row.wiseRecipientID}
            type="td"
            cellClass="p-3 border-t border-prim max-w-[256px] truncate first:rounded-bl last:rounded-br"
          >
            <DeleteBtn {...row} />
            <>{row.bankSummary}</>
            <td className="text-center">
              <Status status={row.status} />
            </td>
            <SetDefaultBtn {...row} />
          </Cells>
        ))}
      </TableSection>
    </table>
  );
}

function SetDefaultBtn({
  wiseRecipientID,
  status,
  thisPriorityNum,
  topPriorityNum,
}: PayoutMethod) {
  const [update, { isLoading }] = useUpdateBankingApplicationMutation();

  if (status !== "approved") return <></>;
  if (topPriorityNum === thisPriorityNum) {
    return <Icon type="CheckCircle" size={18} className="text-green-d1" />;
  }

  if (isLoading) {
    return <Icon type="Loading" className="animate-spin" />;
  }

  return (
    <button
      title="set default payout method"
      type="button"
      onClick={() => update({ type: "prioritize", uuid: wiseRecipientID })}
    >
      <Icon
        type="CheckCircle"
        size={18}
        className="text-gray hover:text-green active:text-green-d1"
      />
    </button>
  );
}

function DeleteBtn({
  wiseRecipientID,
  thisPriorityNum,
  heirPriorityNum = 0,
  topPriorityNum,
}: PayoutMethod) {
  const { showModal } = useModalContext();

  async function handleClick() {
    const APPROVED_PRIORITY_NUM = 2;
    const isDefault = topPriorityNum === thisPriorityNum;
    const isWithHeir = heirPriorityNum >= APPROVED_PRIORITY_NUM;

    const [canProceed, message] =
      isDefault && isWithHeir
        ? [false, "Kindly set another payout method as default before deleting"]
        : isDefault
        ? [
            true,
            "Your Nonprofit must have at least one banking connection approved in order to receive payouts. Banking connections that are 'Under Review' do not count towards this and are not eligible to receive payouts until approved. Do you want to proceed with this deletion?",
          ]
        : [true, "Are you sure you want to delete this payment method?"];

    showModal(DeletePrompt, {
      canProceed,
      uuid: wiseRecipientID,
      message,
    });
  }

  return (
    <button title="delete payout method" type="button" onClick={handleClick}>
      <Icon type="Dash" size={18} className="text-red hover:text-red-d1" />
    </button>
  );
}

const bg: { [key in BankingApplicationStatus]: string } = {
  approved: "bg-green",
  "under-review": "bg-gray-d1",
  rejected: "bg-red",
};

const text: { [key in BankingApplicationStatus]: string } = {
  "under-review": "Under review",
  rejected: "Rejected",
  approved: "Approved",
};

function Status({ status }: { status: BankingApplicationStatus }) {
  return (
    <p
      className={`${bg[status]} rounded px-3 py-1 inline-block uppercase text-xs text-white`}
    >
      {text[status]}
    </p>
  );
}