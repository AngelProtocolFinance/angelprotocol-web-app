import { RouteComponentProps } from "react-router-dom";
import useDetails from "./useDetails";

export default function Details(props: RouteComponentProps<{ id: string }>) {
  const data = useDetails(props.match.params.id);

  return (
    <div className="padded-container grid content-start gap-4">
      <div className="bg-white bg-opacity-10 p-6 rounded-md shadow-lg text-white text-opacity-70 overflow-hidden">
        <div className="flex text-sm">
          <p className="mr-6">ID: {data.id}</p>
          <p>TEXT PROPOSAL</p>
        </div>
        <p className="text-sm mt-4 mb-2">{data.status}</p>
        <div className="border-b border-b-2 border-opacity-40 pb-2 flex justify-between mb-6">
          <h3 className="text-xl font-bold text-opacity-100">{data.title}</h3>
          <button className="text-xs font-bold uppercase font-heading px-6 py-1 rounded-md bg-white text-angel-grey">
            Vote
          </button>
        </div>
        <div className="grid grid-cols-2 gap-6 mb-10">
          <Item title="Creator" value={data.creator} />
          <Item title="Amount" value={`${data.amount} HALO`} />
          <Item title="End time" value={`block height: ${data.end_height}`} />
          <Item title="Link" value={data.link} />
        </div>
        <div className="break-words">
          <p className="font-heading font-semibold text-sm mb-2">Description</p>
          <p className="">{data.description}</p>
        </div>
      </div>
      <div className="bg-white bg-opacity-10 p-6 rounded-md shadow-lg text-white text-opacity-70">
        <h3 className="uppercase text-sm text-opacity-100 font-semibold mb-4">
          Vote details
        </h3>
        <div className="grid grid-cols-3 justify-items-center mb-4">
          <Count
            title="voted"
            percent={data.voted_pct}
            value={data.quorum_val}
          />
          <Count
            title="yes"
            percent={data.yes_pct}
            value={data.yes_val}
            colorClass="text-green-500"
          />
          <Count
            title="no"
            percent={data.no_pct}
            value={data.no_val}
            colorClass="text-red-400"
          />
        </div>
      </div>
    </div>
  );
}

function Count(props: {
  title: string;
  percent: string;
  value: string;
  colorClass?: string;
}) {
  return (
    <div className="grid place-items-center aspect-square p-8 gap-2 border-2 border-opacity-10 rounded-full">
      <h4 className="text-sm uppercase">{props.title}</h4>
      <p className={`text-3xl font-bold ${props.colorClass}`}>
        {props.percent}
      </p>
      <p className="text-sm">{props.value}</p>
    </div>
  );
}

function Item(props: { title: string; value: string }) {
  return (
    <div className="text-opacity-100 break-words">
      <h4 className="text-sm font-semibold mb-1">{props.title}</h4>
      <p className="">{props.value}</p>
    </div>
  );
}
