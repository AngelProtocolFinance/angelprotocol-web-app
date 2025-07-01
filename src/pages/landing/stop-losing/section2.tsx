import { ClockIcon, TrendingDownIcon, TriangleAlertIcon } from "lucide-react";

interface Props {
  classes?: string;
}

export function Section2({ classes = "" }: Props) {
  return (
    <div className={`${classes} py-26`}>
      <h2 className="text-center text-4.5xl @6xl:text-5xl @6xl:leading-tight capitalize text-gray-d4 text-balance mb-4 ">
        Why <span className="text-red">pay $3,000</span> to accept $100,000?
      </h2>
      <p className="text-xl @6xl:text-2xl mb-6 font-heading @6xl:leading-tight capitalize text-gray-d1 font-medium text-center text-balance">
        Every donation shouldn't cost you money.
      </p>
      <div className="grid @6xl:grid-cols-3 gap-4">
        <div className="grid grid-rows-subgrid row-span-3 shadow-xl p-6 rounded-xl max-w-sm w-full justify-self-center">
          <TriangleAlertIcon className="text-blue justify-self-center" />
          <h4 className="capitalize text-center">
            High fees steal your impact
          </h4>
          <p className="text-center">
            You{" "}
            <span className="text-red font-medium">
              lose $500 - $700 annually
            </span>{" "}
            to processing fees. That's an entire arts program. Gone.
          </p>
        </div>
        <div className="grid grid-rows-subgrid row-span-3 shadow-xl p-6 rounded-xl max-w-sm w-full justify-self-center">
          <ClockIcon className="text-blue justify-self-center" />
          <h4 className="capitalize text-center">
            Admin works devours your time
          </h4>
          <p className="text-center">
            <span className="text-red font-medium">10+ hours weekly</span> on
            donation tracking, receipts, reports. Time stolen from your mission.
          </p>
        </div>
        <div className="grid grid-rows-subgrid row-span-3 shadow-xl p-6 rounded-xl max-w-sm w-full justify-self-center">
          <TrendingDownIcon className="text-blue justify-self-center" />
          <h4 className="capitalize text-center">Dead money earns nothing</h4>
          <p className="text-center">
            Your reserves sit in{" "}
            <span className="text-red font-medium">0.1% savings</span> while
            inflation kills your buying power. Lost opportunity cost you
            thousands.
          </p>
        </div>
      </div>
      <div className="text-balance text-center bg-red-l5 mt-16 p-8 border-l-8 border-red rounded-xl rounded-tl-none rounded-bl-none max-w-3xl mx-auto">
        <p>
          The brutal truth: While you're drowning in paperwork and bleeding
          fees, your community programs suffer. Every dollar lost to fees is a
          student who can't take art classes. A show that can't be produced. A
          dream deferred.
        </p>
        <p className="text-center text-xl @6xl:text-2xl @6xl:leading-tight text-red mt-4 font-semibold">
          How much longer can you afford this?
        </p>
      </div>
    </div>
  );
}
