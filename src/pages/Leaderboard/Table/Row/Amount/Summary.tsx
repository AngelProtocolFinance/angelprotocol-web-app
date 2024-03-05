import Modal from "components/Modal";
import { useModalContext } from "contexts/ModalContext";
import { humanize } from "helpers";
import { AmountProps } from ".";

export default function Summary({ locked, liquid, type }: AmountProps) {
  const { closeModal } = useModalContext();
  return (
    <Modal className="grid content-start bg-gray-l6 dark:bg-blue-d5 text-gray-d2 border border-gray-l4 dark:text-white fixed-center z-20 p-8 rounded-2xl shadow-lg max-w-md">
      <Amount title="principal" value={locked} />
      <Amount title="impact" value={liquid} />
      <button
        onClick={closeModal}
        className="btn btn-blue py-1 justify-self-center w-24 my-4 rounded-md"
      >
        ok
      </button>
      <Text type={type} title="Principal" />
      <Text type={type} title="Impact" />
    </Modal>
  );
}

function Text(props: {
  type: AmountProps["type"];
  title: "Principal" | "Impact";
}) {
  const baseImpact =
    "The Impact is the cumulative total of direct donations to the Liquid Account plus the funds distributed from the Principal. Assuming these funds were used immediately, the Impact is how much the Nonprofit";

  let textBlob;
  if (props.type === "projected") {
    textBlob =
      props.title === "Principal"
        ? "Assuming no further donations were received than in the TOTAL column at this date, this is how much will have been donated into the Principal. Plus 25% of the yield earned with both compounded over the year."
        : baseImpact +
          " will have been able to use day to day over 10 years without touching the Principal.";
  } else {
    textBlob =
      props.title === "Principal"
        ? "The Principal is how much has been donated and earned from yield at this date, less that transferred to the Liquid Account for immediate use. Of the yield, 75% goes to the Liquid Account, 25% reinvested."
        : baseImpact +
          " has been able to use day to day without touching the Principal.";
  }

  return (
    <p className="text-xs leading-snug mb-2 text-navy-l1 dark:text-gray-l4">
      <span className="font-bold">{props.title} :</span> {textBlob}
    </p>
  );
}

function Amount(props: { title: string; value: number }) {
  return (
    <p className="font-heading grid grid-cols-2 items-center gap-10 uppercase font-bold text-2xl">
      <span className="text-base text-right justify-self-end">
        {props.title}
      </span>
      <span>$ {humanize(props.value, 0)}</span>
    </p>
  );
}
