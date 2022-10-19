import Portion from "./Portion";
import Slider from "./Slider";

export default function Split() {
  return (
    <div className="grid ml-1">
      <p className="text-angel-grey uppercase text-sm font-bold mt-2 mb-1">
        Split
      </p>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <Portion
          type="locked"
          border_class="border-green-500/80"
          text_class="text-green-500 uppercase"
          title="Locked"
          action="Compounded forever"
        />
        <Portion
          type="liquid"
          border_class="border-angel-blue/80"
          text_class="text-blue-accent uppercase"
          title="Liquid"
          action="Instantly available"
        >
          <Slider />
        </Portion>
      </div>
      <p className="text-xs text-angel-grey text-center">
        Note: Donations into the Endowment provide sustainable financial runaway
        and allow your gift to give forever
      </p>
    </div>
  );
}
