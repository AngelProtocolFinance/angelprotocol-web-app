export default function Poll() {
  return (
    <div className="border-2 border-opacity-30 border-angel-grey hover:bg-white hover:bg-opacity-30 hover:shadow-md rounded-md p-6 text-angel-grey">
      <div className="flex justify-between text-sm mb-4">
        <p>ID: 1</p>
        <p className="font-bold text-angel-grey">EXECUTED</p>
      </div>
      <h4 className="text-angel-grey font-bold text-lg mt-1 border-b-2 border-angel-grey border-opacity-20 mb-1 pb-1">
        Register Liquidation Queue Contract
      </h4>
      <div className="flex gap-4 mb-4">
        <Figure title="voted" percent={48.73} colorClass="mr-auto" />
        <Figure title="yes" percent={48.73} colorClass="text-green-700" />
        <Figure title="no" percent={0} colorClass="text-red-600" />
      </div>
      <div>
        <p>Estimated end time</p>
        <p>Sat, Nov 6, 2021, 12:02:05 AM</p>
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
