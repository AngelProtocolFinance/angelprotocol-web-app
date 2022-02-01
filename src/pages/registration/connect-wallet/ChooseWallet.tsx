import { Link } from "react-router-dom";

export default function ChooseWallet() {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-3xl font-semibold">Register your wallet</h2>
      <div style={{ height: 400 }}>Torus</div>
      <Link to="" className="uppercase underline text-angel-blue">
        Register your terra station wallet
      </Link>
    </div>
  );
}
