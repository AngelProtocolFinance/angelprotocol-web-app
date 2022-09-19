import Allocations from "./Allocations";
import View from "./View";

export default function Strategies() {
  return (
    <div className="grid grid-cols-2 border border-zinc-50/30 divide-x divide-zinc-50/30 rounded-sm">
      <View />
      <Allocations type={"liquid"} />
    </div>
  );
}
