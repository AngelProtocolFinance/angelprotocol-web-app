import Portion from "./Portion";
import Slider from "./Slider";
export default function Split() {
  return (
    <>
      <p className="text-angel-grey uppercase font-bold mb-2 mt-4">Split</p>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <Portion
          type="locked"
          border_class="border-green-500"
          text_class="text-green-500"
          title="Compounded forever"
        />
        <Portion
          type="liquid"
          border_class="border-angel-blue"
          text_class="text-blue-accent"
          title="Instantly available"
        >
          <Slider />
        </Portion>
      </div>
    </>
  );
}
