import { Link } from "react-router-dom";
import Icon from "components/Icon";
import { Button } from "../../common";

export default function RegisteredWallet(props: {
  onChange: () => void;
  address: string;
}) {
  return (
    <div className="flex flex-col h-full w-full items-center">
      <div className="flex flex-col items-center gap-4 mb-4">
        <Icon type="Check" size={60} />
      </div>
      <div>
        <p className="text-xl font-extrabold font-heading uppercase mb-2">
          Your wallet is registered
        </p>
        <p className="uppercase text-sm">your wallet address is</p>
        <p className="font-mono my-2 p-2 border-b border-white/20">
          {props.address}
        </p>
      </div>
      <Button
        onClick={props.onChange}
        className="btn-outline-blue uppercase font-heading text-xs px-2 py-1"
      >
        change wallet
      </Button>
      <Link
        className="btn-orange w-80 h-10 mt-8 rounded-xl uppercase font-bold"
        to="5"
      >
        Continue
      </Link>
    </div>
  );
}
