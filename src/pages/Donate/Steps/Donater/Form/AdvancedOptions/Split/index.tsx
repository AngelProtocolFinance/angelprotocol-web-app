import Icon from "components/Icon";
import Portion from "./Portion";
import Slider from "./Slider";

export default function Split() {
  return (
    <div className="grid p-6 pt-4 font-heading border-t border-gray-l2 dark:border-bluegray-d1">
      <p className="text-xs uppercase font-bold mb-2">Split</p>
      <div className="grid grid-cols-2 gap-2 mb-6">
        <Portion type="locked" title="Endowment" action="Compounded forever" />
        <Portion type="liquid" title="Current" action="Instantly available">
          <Slider classes="my-2.5" />
        </Portion>
      </div>
      <div className="flex items-center gap-4 px-4 py-3 text-center dark:bg-blue-d7 border border-gray-l2 dark:border-bluegray-d1 rounded">
        <Icon type="Info" size={44} />
        <p className="text-xs leading-normal text-left">
          Donations into the Endowment provide sustainable financial runaway and
          allow your gift to give forever
        </p>
      </div>
    </div>
  );
}
