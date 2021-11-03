import toCurrency from "helpers/toCurrency";
import Popup, { Actions, Content } from "./Popup";

export type Props = { sent: number; received: number; url: string };
export default function Result(props: Props) {
  return (
    <Popup accent="bg-angel-blue">
      <Content>
        <div className="flex flex-col items-center my-auto p-4">
          <p className="text-angel-blue mb-4 uppercase font-heading text-center font-bold">
            Thank you for your donation!
          </p>
          <Entry title="Amount received" amount={props.sent} />
          <Entry title="Amount deposited" amount={props.received} />
          <a
            className="text-thin-blue mt-2"
            href={props.url}
            target="_blank"
            rel="noreferrer"
          >
            transaction details
          </a>
        </div>
        <Actions></Actions>
      </Content>
    </Popup>
  );
}

function Entry(props: { title: string; amount: number }) {
  return (
    <p className="mb-1 uppercase flex items-center">
      <span className="mr-2 text-xs text-angel-grey ">{props.title} :</span>
      <span className="font-heading text-angel-grey font-semibold align-self-end">
        {toCurrency(props.amount, 2)} UST
      </span>
    </p>
  );
}
