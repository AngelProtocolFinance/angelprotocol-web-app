import { memo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useGetTerraTokensQuery } from "services/apes/currencies";
import Icon from "components/Icons/Icons";
import Loader from "components/Loader/Loader";
import { DonateValues } from "components/Transactors/Donater/types";
import useWalletContext from "hooks/useWalletContext";
import { Token, denoms } from "constants/currency";

type Props = {
  closeHandler: () => void;
};

function CurrencySelector(props: Props) {
  const { wallet } = useWalletContext();
  const isTestnet = wallet?.network.name === "testnet";
  const { watch, setValue } = useFormContext<DonateValues>();
  const { data = [], isLoading } = useGetTerraTokensQuery("");
  const [filter, setFilter] = useState("");

  const selectedToken = watch("currency");

  function getCurrency(token: Token, index: number) {
    const s = token.native_denom ?? token.symbol;
    const sym = denoms[s];
    const active = selectedToken === sym;

    const updateCurrency = () => {
      setValue("currency", sym);
      if (isTestnet) setValue("cw20_contract", token?.testnet_cw20_contract);
    };

    return (
      <button
        key={index}
        disabled={active}
        onClick={updateCurrency}
        className="uppercase flex items-center gap-3 p-1 text-sm cursor-pointer disabled:bg-angel-blue disabled:text-white hover:bg-angel-blue disabled:bg-opacity-50 group w-full"
      >
        <img src={token.logo} alt="" className="w-4 h-4 object-contain" />
        <p
          className={`${
            active ? "text-white" : "text-angel-grey"
          } font-semibold text-md group-hover:text-white`}
        >
          {token.symbol}
        </p>
      </button>
    );
  }

  const filtered = filter
    ? data.filter((token) => token.symbol.toLowerCase().includes(filter))
    : data;

  return (
    <div className="w-120 absolute top-0 right-0 flex flex-col gap-3 bg-white p-4 pt-4 mt-2 rounded-md shadow-2xl z-50">
      <div className="w-full">
        <div className="flex justify-between items-center gap-4 mb-2">
          <p className="capitalize font-heading text-angel-grey font-semibold text-sm">
            Select token
          </p>
          <Icon
            onClick={props.closeHandler}
            type="Close"
            className="text-angel-grey text-lg cursor-pointer"
          />
        </div>
        <input
          type="text"
          placeholder="search"
          className="p-1 w-full focus:outline-none text-sm border-b focus:border-black"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="overflow-hidden overflow-y-scroll pt-5">
        {isLoading ? (
          <Loader
            bgColorClass="bg-angel-blue"
            gapClass="gap-2"
            widthClass="w-4"
          />
        ) : (
          filtered.map(getCurrency)
        )}
      </div>
    </div>
  );
}

export default memo(CurrencySelector);
