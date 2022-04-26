import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { DonateValues } from "components/Transactors/Donater/types";
import useWalletContext from "hooks/useWalletContext";
import { currency_text, denoms } from "constants/currency";
import { Selector } from "./Selector";
import {
  ControlContainer,
  CustomMenu,
  CustomOption,
  MenuList,
  ValueContainer,
} from "./SelectorComponents";
import { TokenOption } from "./types";
import useGetTokens from "./useGetTokens";

function TokenSelector() {
  const { wallet } = useWalletContext();
  const isTestnet = wallet?.network.name === "testnet";
  const { setValue, register, control } = useFormContext<DonateValues>();
  const { data = [], isLoading } = useGetTokens();

  const isOptionSelected = (
    option: TokenOption,
    selectValue: TokenOption[]
  ) => {
    return option.value === selectValue[0].value;
  };

  const onChange = (denom: denoms) => {
    const token = data.find(
      (t) => t.native_denom === denom || t.symbol === denom
    );
    setValue("currency", denom);
    setValue(
      "cw20_contract",
      isTestnet ? token?.testnet_cw20_contract : token?.cw20_contract
    );
  };

  return (
    <div className="w-full p-2">
      <Selector
        isLoading={isLoading}
        name="currency"
        className="outline-none border-none bg-transparent"
        onChange={onChange}
        options={data.map((token) => ({
          value: token.native_denom || token.symbol,
          label: currency_text[token.native_denom || token.symbol],
          logo: token.logo,
        }))}
        control={control}
        register={register}
        menuPlacement="bottom"
        isOptionSelected={isOptionSelected}
        Option={CustomOption}
        Menu={CustomMenu}
        MenuList={MenuList}
        IndicatorSeparator={() => null}
        IndicatorsContainer={() => null}
        ValueContainer={ValueContainer}
        Control={ControlContainer}
        placeholder="Loading..."
      />
    </div>
  );
}

export default memo(TokenSelector);
