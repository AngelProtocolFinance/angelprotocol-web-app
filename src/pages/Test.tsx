import AppHead from "components/Headers/AppHead";
import { useSetKeplr } from "wallets/Keplr";

export default function Test() {
  const { connect } = useSetKeplr();
  return (
    <div className="pb-16 grid grid-rows-a1">
      <AppHead />
      <div className="grid place-items-center">
        <button onClick={connect}>connect cosmos</button>
      </div>
    </div>
  );
}
