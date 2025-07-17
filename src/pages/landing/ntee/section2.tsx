import { ClockIcon, TrendingDownIcon, TriangleAlertIcon } from "lucide-react";

interface Props {
  classes?: string;
  copy: string;
}

export function Section2({ classes = "", copy }: Props) {
  return (
    <div className={`${classes}`}>
      <h2 className="text-center text-4.5xl @6xl:text-5xl @6xl:leading-tight capitalize text-gray-d4 text-balance mb-4 ">
        You could be <span className="text-red">losing $3,000+</span> every
        year.
      </h2>
      <p className="text-xl @6xl:text-2xl @6xl:leading-tight font-heading mb-6 capitalize text-gray-d1 font-medium text-center text-balance">
        Every donation shouldn't cost you money.
      </p>
      <div className="grid @6xl:grid-cols-3 gap-4">
        <div className="grid grid-rows-subgrid row-span-3 bg-white shadow-xl shadow-black/10 p-6 rounded-xl max-w-sm w-full justify-self-center">
          <TriangleAlertIcon
            size={30}
            className="text-blue justify-self-center"
          />
          <h4 className="text-lg capitalize text-center">High fees</h4>
          <p className="text-center">
            <span className="text-red font-medium">Thousands</span> are lost to
            processing fees every year.
          </p>
        </div>
        <div className="grid grid-rows-subgrid row-span-3 bg-white shadow-xl shadow-black/10 p-6 rounded-xl max-w-sm w-full justify-self-center">
          <ClockIcon size={30} className="text-blue justify-self-center" />
          <h4 className="text-lg capitalize text-center">Time waste</h4>
          <p className="text-center">
            <span className="text-red font-medium">10+ hours weekly</span> on
            admin work.
          </p>
        </div>
        <div className="grid grid-rows-subgrid row-span-3 bg-white shadow-xl shadow-black/10 p-6 rounded-xl max-w-sm w-full justify-self-center">
          <TrendingDownIcon
            size={30}
            className="text-blue justify-self-center"
          />
          <h4 className="text-lg capitalize text-center">Donors denied!</h4>
          <p className="text-center">
            Donors leave as they{" "}
            <span className="text-red font-medium">can't donate</span> in the
            way they want!
          </p>
        </div>
      </div>
      <div className="text-balance text-center bg-red-l5 mt-16 p-8 border-l-8 border-red rounded-xl rounded-tl-none rounded-bl-none max-w-3xl mx-auto">
        <p className="text-xl @6xl:text-2xl @6xl:leading-tight font-heading">
          {copy}
        </p>
        <p className="text-center text-xl @6xl:text-2xl @6xl:leading-tight text-red mt-4 font-semibold">
          How much longer can you afford this?
        </p>
      </div>
    </div>
  );
}
