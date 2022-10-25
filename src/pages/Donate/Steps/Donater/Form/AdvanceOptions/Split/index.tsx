import Portion from "./Portion";
import Slider from "./Slider";

export default function Split() {
  return (
    <div className="grid ml-1">
      <p className="text-gray-d2 uppercase text-sm font-bold mt-2 mb-1">
        Split
      </p>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <Portion type="locked" title="Endowment" action="Compounded forever" />
        <Portion type="liquid" title="Current" action="Instantly available">
          <Slider />
        </Portion>
      </div>
      <p className="text-xs text-gray-d2 text-center">
        Note: Donations into the Locked portion provide sustainable financial
        runaway and allow your gift to give forever
      </p>
    </div>
  );
}
