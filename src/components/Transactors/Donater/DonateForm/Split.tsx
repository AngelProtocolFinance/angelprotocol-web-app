import Portion from "./Portion";
import Slider from "./Slider";
export default function Split() {
  return (
    <div className="border grid p-3 rounded-md shadow-inner bg-gray-50">
      <p className="text-angel-grey uppercase font-bold mb-2">Split</p>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <Portion
          type="locked"
          border_class="border-green-500"
          text_class="text-green-500 uppercase"
          title="Endowment"
          action="Compounded forever"
        />
        <Portion
          type="liquid"
          border_class="border-angel-blue"
          text_class="text-blue-accent uppercase"
          title="Liquid"
          action="Instantly available"
        >
          <Slider />
        </Portion>
      </div>
      <span className="text-grey-accent font-normal text-sm">
        Note: Donations into the endowment provide sustainable financial runaway
        and allow your gift to give forever
      </span>
    </div>
  );
}
