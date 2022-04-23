import { memo } from "react";
import { useFormContext } from "react-hook-form";
import {
  ControlProps,
  MenuProps,
  OptionProps,
  ValueContainerProps,
} from "react-select";
import { useGetTerraTokensQuery } from "services/apes/currencies";
import Icon from "components/Icons/Icons";
import { Selector } from "components/Selector";
import { DonateValues } from "components/Transactors/Donater/types";
import useWalletContext from "hooks/useWalletContext";
import { currency_icons, currency_text, denoms } from "constants/currency";

export type TokenOption = {
  value: string;
  label: string;
};

function CurrencySelector() {
  const { wallet } = useWalletContext();
  const isTestnet = wallet?.network.name === "testnet";
  const { setValue, register, control, watch } = useFormContext<DonateValues>();
  const { data = [], isLoading } = useGetTerraTokensQuery("");
  const selectedCurrency = watch("currency");

  const CustomOption = (props: OptionProps<TokenOption>) => {
    const { data: option, innerRef, innerProps, isSelected } = props;

    const token = data.find(
      (t) => t.native_denom === option.value || t.symbol === option.value
    );

    return (
      <div ref={innerRef} {...innerProps} className="w-full">
        <button
          disabled={isSelected}
          className="uppercase flex items-center gap-3 p-1 text-sm cursor-pointer disabled:bg-angel-blue disabled:text-white hover:bg-angel-blue disabled:bg-opacity-50 group w-full"
        >
          <img src={token?.logo} alt="" className="w-4 h-4 object-contain" />
          <p className="text-angel-grey font-semibold text-md group-hover:text-white">
            {option.label}
          </p>
        </button>
      </div>
    );
  };

  const CustomMenu = (props: MenuProps<TokenOption>) => {
    const { children, innerRef, innerProps } = props;

    return (
      <div
        ref={innerRef}
        {...innerProps}
        className="absolute top-100 left-0 w-115 bg-white scroll-hidden p-2 rounded-lg"
      >
        <h1 className="text-sm font-bold mb-2">Select token</h1>
        {children}
      </div>
    );
  };

  const ValueContainer = (props: ValueContainerProps) => {
    const { children, innerProps } = props;

    return (
      <div
        {...innerProps}
        className="bg-transparent flex flex-row gap-1 items-center justify-evenly outline-none border-none text-sm"
      >
        <img
          src={currency_icons[selectedCurrency]}
          alt={`${selectedCurrency} icon`}
          className="w-5 h-5 object-contain mr-0.5"
        />
        {children}
        <Icon
          type="ChevronDown"
          width={15}
          className="font-bold text-md cursor-pointer"
        />
      </div>
    );
  };

  const ControlContainer = (props: ControlProps) => {
    const { children, innerProps, innerRef } = props;

    return (
      <div
        ref={innerRef}
        {...innerProps}
        className="bg-transparent flex items-center justify-end outline-none border-none"
      >
        {children}
      </div>
    );
  };

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
        }))}
        control={control}
        register={register}
        menuPlacement="bottom"
        isOptionSelected={isOptionSelected}
        customComponents={true}
        Option={CustomOption}
        Menu={CustomMenu}
        IndicatorSeparator={() => null}
        IndicatorsContainer={() => null}
        ValueContainer={ValueContainer}
        Control={ControlContainer}
      />
    </div>
  );
}

export default memo(CurrencySelector);
