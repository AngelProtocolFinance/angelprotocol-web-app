import AppFoot from "./AppFoot";
import DappHead from "./DappHead";
import Views from "./Views";

export default function App() {
  return (
    <div className="grid grid-rows-a1a bg-gradient-to-b from-blue-accent to-black-blue bg-fixed">
      <p className="transition-shadow flex z-20 items-center justify-center font-heading font-bold bg-angel-orange w-full p-2 text-center text-angel-grey text-xs">
        Please note: Donations are currently disabled. V2 coming soon!
      </p>
      <DappHead />
      <Views />
      <AppFoot />
    </div>
  );
}
