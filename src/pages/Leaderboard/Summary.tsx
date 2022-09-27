import { Dialog } from "@headlessui/react";
import { useModalContext } from "contexts/ModalContext";
import { humanize } from "helpers";

type SummaryProps = { type: string; principal: number; impact: number };
export default function Summary(props: SummaryProps) {
  const { closeModal } = useModalContext();
  return (
    <Dialog.Panel className="bg-white fixed-center z-20 p-8 rounded-2xl shadow-lg max-w-md grid content-start">
      <Amount title="principal" value={props.principal} />
      <Amount title="impact" value={props.impact} />
      <button
        onClick={closeModal}
        className="my-4 bg-angel-blue hover:bg-angel-blue/90 text-white font-bold font-heading w-32 py-1.5 rounded-md uppercase text-sm justify-self-center"
      >
        ok
      </button>

      <Text type={props.type} title="Principal" />
      <Text type={props.type} title="Impact" />
    </Dialog.Panel>
  );
}

function Text(props: { type: string; title: string }) {
  let textBlob;
  if (props.type === "10years") {
    if (props.title === "Principal") {
      textBlob =
        "Assuming no further donations were received than in the TOTAL column at this date, this is how much will have been donated into the Principal. Plus 25% of the yield earned with both compounded over the year.";
    }
    if (props.title === "Impact") {
      textBlob =
        "The Impact is the cumulative total of direct donations to the Current Account plus the funds distributed from the Principal. Assuming these funds were used immediately, the Impact is how much the Charity will have been able to use day to day over 10 years without touching the Principal.";
    }
  } else {
    if (props.title === "Principal") {
      textBlob =
        "The Principal is how much has been donated and earned from yield at this date, less that transferred to the Current Account for immediate use. Of the yield, 75% goes to the Current Account, 25% reinvested.";
    }
    if (props.title === "Impact") {
      textBlob =
        "The Impact is the cumulative total of direct donations to the Current Account plus the funds distributed from the Principal. Assuming these funds were used immediately, the Impact is how much the Charity has been able to use day to day without touching the Principal.";
    }
  }

  return (
    <p className="font-semibold text-xs text-grey-accent leading-snug mb-2">
      <span className="font-bold">{props.title} :</span> {textBlob}
    </p>
  );
}

function Amount(props: { title: string; value: number }) {
  return (
    <p className="font-heading grid grid-cols-2 items-center gap-10 uppercase font-bold text-2xl text-angel-blue">
      <span className="text-base text-right justify-self-end ">
        {props.title}
      </span>
      <span>$ {humanize(props.value, 0)}</span>
    </p>
  );
}
