import { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Select, { Options, ThemeConfig } from "react-select";
import { DonateValues } from "components/Transactors/Donater/types";
import useWalletContext from "hooks/useWalletContext";
import { currency_icons, currency_text, denoms } from "constants/currency";
import {
  ControlContainer,
  CustomMenu,
  CustomOption,
  MenuList,
  ValueContainer,
} from "./SelectorComponents";
import useGetTokens from "./useGetTokens";

interface TokenSelectorOption {
  value: string;
  label: string;
}

const defaultClassName = "outline-none border-none w-full";
const colourStyles = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: "transparent",
    border: "0px",
    outline: "none",
    fontSize: "14px",
  }),
  option: (styles: any, { isSelected }: any) => {
    return {
      ...styles,
      backgroundColor: isSelected ? "grey" : "white",
      color: "#222",
      fontSize: "14px",
      cursor: isSelected ? "not-allowed" : "default",
    };
  },
};

function TokenSelector() {
  const { wallet } = useWalletContext();
  const isTestnet = wallet?.network.name === "testnet";
  const { setValue, register, control } = useFormContext<DonateValues>();
  const { data = [] } = useGetTokens();

  const isOptionSelected = (
    option: TokenSelectorOption,
    selectValue: Options<TokenSelectorOption>
  ) => {
    return option.value === selectValue[0].value;
  };

  const onTokenSelected = (denom: denoms) => {
    const token = data.find(
      (t) => t.native_denom === denom || t.symbol === denom
    );
    setValue("currency", denom);
    setValue(
      "cw20_contract",
      isTestnet ? token?.testnet_cw20_contract : token?.cw20_contract
    );
  };

  const options: TokenSelectorOption[] = data.map((token) => ({
    value: token.native_denom || token.symbol,
    label: currency_text[token.native_denom || token.symbol],
    logo: currency_icons[token.native_denom || token.symbol],
  }));

  return (
    <Controller
      {...register("currency")}
      name="currency"
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <Select
            className={defaultClassName}
            placeholder="Loading..."
            value={options.filter((option) => value === option.value)}
            onChange={(option: any) => {
              onChange(option?.value);
              onTokenSelected && onTokenSelected(option?.value);
            }}
            styles={colourStyles}
            isOptionSelected={isOptionSelected}
            isSearchable={true}
            options={options}
            menuPlacement="bottom"
            isMulti={false}
            theme={{ borderRadius: 0 } as ThemeConfig}
            components={{
              Option: CustomOption,
              Menu: CustomMenu,
              ValueContainer: ValueContainer,
              Control: ControlContainer,
              MenuList: MenuList,
              IndicatorSeparator: () => null,
              IndicatorsContainer: () => null,
            }}
          />
        );
      }}
    />
  );
}

export default memo(TokenSelector);
