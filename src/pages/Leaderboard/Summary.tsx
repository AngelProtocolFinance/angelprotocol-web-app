import { useSetModal } from "components/Nodal/Nodal";
import toCurrency from "helpers/toCurrency";
import { ReactText } from "react";
export type SummaryProps = { principal: number; impact: number };
export default function Summary(props: SummaryProps) {
  const { hideModal } = useSetModal();
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md grid content-start">
      <Amount title="principal" value={props.principal} />
      <Amount title="impact" value={props.impact} />
      <button
        onClick={hideModal}
        className="my-4 bg-angel-blue hover:bg-opacity-90 text-white font-bold font-heading w-32 py-1.5 rounded-md uppercase text-sm justify-self-center"
      >
        ok
      </button>
      <Text title="Principal">
        The Principal is how much has been donated and earned from yield at this
        date, less that transferred to the Current Account for immediate use. Of
        the 20% yield, 75% goes to the Current Account, 25% reinvested
      </Text>
      <Text title="Impact">
        The Impact is the cumulative total of direct donations to the Current
        Account plus the funds distributed from the Principal. Assuming these
        funds were used immediately, the Impact is how much the Charity has been
        able to use day to day without touching the Principal.
      </Text>
    </div>
  );
}

function Text(props: { title: string; children: ReactText }) {
  return (
    <p className="font-semibold text-xs text-grey-accent leading-snug mb-2">
      <span className="font-bold">{props.title} :</span> {props.children}
    </p>
  );
}

function Amount(props: { title: string; value: number }) {
  return (
    <p className="font-heading grid grid-cols-2 items-center gap-10 uppercase font-bold text-2xl text-angel-blue">
      <span className="text-base text-right justify-self-end ">
        {props.title}
      </span>
      <span className="">$ {toCurrency(props.value, 0)}</span>
    </p>
  );
}
