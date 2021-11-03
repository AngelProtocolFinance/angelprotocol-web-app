import toCurrency from "helpers/toCurrency";
import Popup, { Actions, Content } from "./Popup";

export type Props = { fee: number; amount: number; resume: any; cancel: any };
export default function Estimates(props: Props) {
  return (
    <Popup>
      <Content>
        <div className="flex flex-col items-center my-auto p-4 ">
          <Entry title="Amount" amount={props.amount} />
          <Entry title="Tx fee" amount={props.fee} />
          <Entry title="Total" amount={props.fee + props.amount} />
        </div>
        <Actions>
          <Action
            title="Cancel"
            onClick={props.cancel}
            classes="bg-red-400 hover:bg-red-500"
          />
          <Action
            title="Proceed"
            onClick={props.resume}
            classes="bg-angel-orange hover:bg-yellow-500"
          />
        </Actions>
      </Content>
    </Popup>
  );
}

function Entry(props: { title: string; amount: number }) {
  return (
    <p className="w-full mb-1 uppercase grid grid-cols-2 items-center font-heading text-angel-blue font-semibold">
      <span className="mr-2 text-xs">{props.title} :</span>
      <span className="font-semibold">{toCurrency(props.amount, 2)} UST</span>
    </p>
  );
}

function Action(props: { title: string; onClick: any; classes: string }) {
  return (
    <button
      onClick={props.onClick}
      className={`${props.classes} w-28 text-center py-1  rounded-md shadow-sm font-bold font-heading text-white text-sm uppercase`}
    >
      {props.title}
    </button>
  );
}
