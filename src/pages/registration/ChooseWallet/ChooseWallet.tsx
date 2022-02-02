import { Link } from "react-router-dom";
import Torus from "./Torus";

export default function ChooseWallet() {
  return (
    <div className="flex flex-col gap-5 items-center">
      <h2 className="text-3xl font-semibold">Register your wallet</h2>
      <Torus />
      <Link
        to=""
        className="uppercase text-bright-blue text-sm hover:underline"
      >
        Connect a terra station wallet
      </Link>
    </div>
  );
}
