/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  currency_text,
  denoms,
  NATIVE_TOKEN_DECIMALS,
  NATIVE_TOKEN_SYMBOLS,
} from "constants/currency";
import { Pair, PairResult } from "contracts/types";
import { useEffect, useState } from "react";
import { useForm, UseFormRegister, UseFormReturn } from "react-hook-form";
import { RiArrowDownCircleLine } from "react-icons/ri";
import { nativeTokenFromPair } from "./assetPairs";
import CurrencyInputPanel from "./CurrencyInputPanel";
import { TokenResult } from "./usePair";
import { Dec } from "@terra-money/terra.js";

export enum Key {
  fromAsset = "fromAsset",
  toAsset = "toAsset",
  fromAmount = "fromAmount",
  fromUSDAmount = "fromUSDAmount",
  toUSDAmount = "toUSDAmount",
  fromBalance = "fromBalance",
  toBalance = "toBalance",
  toAmount = "toAmount",
  feeValue = "feeValue",
  feeSymbol = "feeSymbol",
  load = "load",
  fromAssetSymbol = "fromAssetSymbol",
  toAssetSymbol = "toAssetSymbol",
  fromMin = "fromMin",
  fromMax = "fromMax",
  toMin = "toMin",
  toMax = "toMax",
  maxFee = "maxFee",
  gasPrice = "gasPrice",
  taxCap = "taxCap",
  taxRate = "taxRate",
  poolLoading = "poolLoading",
}

export type SwapFormKeys = {
  fromAsset: any;
  toAsset: any;
  fromAmount?: number;
  fromUSDAmount?: number;
  fromAssetSymbol?: string;
  fromBalance?: string;
  fromMin?: number;
  fromMax?: number;
  fromStep?: number;
  toAmount?: number;
  toUSDAmount?: number;
  toAssetSymbol?: string;
  toBalance?: string;
  toStep?: number;
  feeValue: any;
  feeSymbol: any;
  load: any;
  toMax: any;
  maxFee: any;
  gasPrice: any;
  taxCap: any;
  taxRate: any;
  poolLoading: any;
};

export type SwapFormProps = {
  pair: PairResult | undefined;
  saleTokenInfo: TokenResult | undefined;
  loading: boolean;
};

export default function SwapForm({
  pair,
  saleTokenInfo,
  loading,
}: SwapFormProps) {
  const form = useForm({
    defaultValues: {
      [Key.fromAmount]: "",
      [Key.toAmount]: "",
      [Key.fromAsset]: "native_token",
      [Key.toAsset]: "",
      [Key.feeValue]: "",
      [Key.feeSymbol]: currency_text[denoms.uusd],
      [Key.load]: "",
      [Key.fromAssetSymbol]: "",
      [Key.toAssetSymbol]: "",
      [Key.fromMin]: "",
      [Key.fromMax]: 0,
      [Key.toMin]: "",
      [Key.toMax]: 0,
      [Key.maxFee]: "",
      [Key.gasPrice]: "",
      [Key.poolLoading]: "",
      [Key.fromUSDAmount]: "",
      [Key.toUSDAmount]: "",
      [Key.fromBalance]: "",
      [Key.toBalance]: "",
    },
    mode: "all",
    reValidateMode: "onChange",
  });

  const { register, watch, setValue, setFocus, formState, trigger } = form;
  const [isReversed, setIsReversed] = useState(false);
  const [usingMaxNativeAmount, setUsingMaxNativeAmount] = useState(false);
  const [balances, setBalances] = useState<any>({});
  const formData = watch();

  function convertAmountToUSD(amountStr: string, asset: string) {
    let decAmount;

    try {
      decAmount = new Dec(amountStr);
    } catch {
      return 0;
    }

    // const rate = usdExchangeRateForAsset(asset);
    const rate = 0.99; // use as temporary rate till the usdExchange function is implemented
    return decAmount.mul(rate);
  }

  // const decimals: any = {
  //   native_token: NATIVE_TOKEN_DECIMALS,
  //   token: saleTokenInfo?.decimals,
  // };
  // const sym: string = nativeTokenFromPair(pair?.asset_infos).info.native_token
  //   .denom;

  // const symbols = {
  //   native_token: NATIVE_TOKEN_SYMBOLS[sym],
  //   token: saleTokenInfo?.symbol,
  // };

  // const fromUSDAmount = convertAmountToUSD(
  //   formData.fromAmount,
  //   formData.fromAsset
  // );
  // const toUSDAmount = convertAmountToUSD(formData.toAmount, formData.toAsset);

  // let maxFromAmount;
  // if (balances[formData.fromAsset]) {
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   maxFromAmount = Dec.withPrec(
  //     balances[formData.fromAsset],
  //     decimals[formData.fromAsset]
  //   );
  // }

  function fromAmountChanged(amount: string) {
    console.log("amountchanged: ", amount);
    // If the from amount changes from an input event,
    // we're no longer using the calculated max amount
    setUsingMaxNativeAmount(false);
    setValue(Key.fromAmount, amount);
  }

  function toAmountChanged(amount: string) {
    console.log("amountchanged: ", amount);
    setValue(Key.fromAmount, amount);
  }

  const handleFromAssetSelect = (token: string) => {
    setValue(Key.fromAsset, token);
    if (!formData[Key.fromAmount]) {
      // setFocus(Key.fromAmount);
    }
  };

  const handletoAssetSelect = (token: string) => {
    setValue(Key.toAsset, token);
    if (!formData[Key.toAmount]) {
      // setFocus(Key.toAmount);
    }
  };

  function handleSwitchToken() {
    const fromAsset = formData[Key.fromAsset];
    const toAsset = formData[Key.toAsset];
    const key = isReversed ? Key.fromAmount : Key.toAmount;
    const value = isReversed
      ? formData[Key.toAmount]
      : formData[Key.fromAmount];
    handleFromAssetSelect(toAsset);
    handletoAssetSelect(fromAsset);
    setIsReversed(!isReversed);
    console.log("val: ", key, value);
    setValue(key, value);
  }
  // setValue(Key.fromAmount, "8000");
  return (
    <div className="w-full bg-white shadow-xl rounded-lg p-5 mt-4">
      <CurrencyInputPanel
        label="From"
        min={0}
        // max={formData?.fromMax}
        amount={formData?.fromAmount}
        required={true}
        // maxClick={fromMaxClick}
        usdAmount={formData.fromUSDAmount}
        balanceString={formData.fromBalance}
        assetSymbol={formData.fromAssetSymbol}
        onAmountChange={fromAmountChanged}
        {...register(Key.fromAsset)}
      ></CurrencyInputPanel>
      <CurrencyDivider onClickHandler={handleSwitchToken}></CurrencyDivider>
      <CurrencyInputPanel
        label="From"
        amount={formData.toAmount}
        required={true}
        usdAmount={formData.toUSDAmount}
        balanceString={formData.toBalance}
        assetSymbol={formData.toAssetSymbol}
        onAmountChange={toAmountChanged}
        {...register(Key.toAsset)}
      ></CurrencyInputPanel>
      <div className="swap-effect flex flex-col justify-between font-heading my-5 gap-3">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">Price</p>
          <p className="usd-price text-xs text-gray-400">
            1 UST = 89843.034 HALO
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">Price Impact</p>
          <p className="usd-price text-xs text-gray-400">0.010524%</p>
        </div>
      </div>
      <ConnectButton
        disabled={true}
        // loading={props.isLoading}
        onHandleClick={() => {}}
      ></ConnectButton>
    </div>
  );
}

function CurrencyDivider({ onClickHandler }: { onClickHandler: any }) {
  return (
    <div className="divider flex flex-col items-center my-3">
      <hr className="w-full" />
      <RiArrowDownCircleLine
        className="text-thin-blue bg-white -mt-4 cursor-pointer"
        size="30"
        onClick={onClickHandler}
      />
    </div>
  );
}

export const ConnectButton = ({
  onHandleClick,
  disabled,
  loading,
}: {
  onHandleClick: any;
  disabled: boolean;
  loading?: boolean;
}) => {
  return (
    <button
      onClick={onHandleClick}
      disabled={disabled}
      className="disabled:bg-grey-accent bg-angel-blue hover:bg-thin-blue focus:bg-thin-blue text-center w-full h-12 rounded-3xl tracking-widest uppercase text-md font-bold font-heading text-white shadow-sm focus:outline-none"
    >
      {loading ? "Connecting..." : "Connect wallet"}
    </button>
  );
};
