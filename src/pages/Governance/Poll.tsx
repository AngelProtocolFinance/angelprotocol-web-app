import { Poll as PollType } from "services/terra/types";

export default function Poll(props: PollType) {
  return (
    <div className="cursor-pointer hover:bg-white hover:bg-opacity-10 border border-opacity-30 rounded-md p-6 text-white-grey text-opacity-80">
      <div className="flex justify-between text-sm mb-4">
        <p>ID: {props.id}</p>
        <p className="text-white bg-white bg-opacity-10 px-2 py-1 rounded-sm">
          {props.status}
        </p>
      </div>
      <h4 className="text-white font-bold text-lg mt-1 border-b-2 border-white-grey border-opacity-20 mb-1 pb-1 overflow-hidden">
        {props.title}
      </h4>
      <div className="flex gap-4 mb-4">
        <Figure title="voted" percent={48.73} colorClass="text-white mr-auto" />
        <Figure title="yes" percent={48.73} colorClass="text-green-400" />
        <Figure title="no" percent={0} colorClass="text-red-200" />
      </div>
      <div>
        <p>Estimated end time</p>
        <p>block height: {props.end_height}</p>
      </div>
    </div>
  );
}

function Figure(props: { title: string; percent: number; colorClass: string }) {
  return (
    <p className={`${props.colorClass}`}>
      <span className="mr-1 uppercase text-xs">{props.title} :</span>
      <span>{props.percent}%</span>
    </p>
  );
}
