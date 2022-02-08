import { useConnectedWallet } from "@terra-money/wallet-provider";
import { chainIDs } from "constants/chainIDs";
import { useAccountsQuery } from "services/aws/endowments/endowments";
import { charity_details } from "services/aws/endowments/placeholders";
import { app, site } from "types/routes";

type Props = { address: string };

export default function Description(props: Props) {
  const wallet = useConnectedWallet();
  const is_test = wallet?.network.chainID === chainIDs.testnet;
  const { data: accounts = {} } = useAccountsQuery(is_test);
  const details = accounts[props.address] || charity_details;

  return (
    <div className="grid grid-cols-a1">
      <img
        src={details.icon || charity_details.icon}
        alt=""
        className={`self-center row-span-2 w-32 h-24 bg-white ${
          details.iconLight ? "bg-angel-blue" : ""
        } p-3 rounded-sm object-contain mr-4 m-1`}
      />

      <a
        href={`${site.app}/${app.charity}/${props.address}`}
        className="col-start-2 text-lg text-angel-grey hover:text-angel-blgue active:text-angel-blue font-bold pt-2 mb-1"
      >
        {details.name}
      </a>
      <p className="relative pr-16 text-sm text-angel-grey  leading-normal mb-2 line-clamp-3">
        {details.description}
      </p>
    </div>
  );
}
