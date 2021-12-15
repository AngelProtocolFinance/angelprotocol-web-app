/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  currency_text,
  denoms,
  NATIVE_TOKEN_DECIMALS,
  NATIVE_TOKEN_SYMBOLS,
} from "constants/currency";
import { Pair, PairResult } from "contracts/types";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { RiArrowDownCircleLine } from "react-icons/ri";
import { nativeTokenFromPair, saleAssetFromPair } from "./assetPairs";
import CurrencyInputPanel from "./CurrencyInputPanel";
import { TokenResult } from "./usePair";
import { Dec } from "@terra-money/terra.js";
import { useConnectedWallet, useWallet } from "@terra-dev/use-wallet";
import { useBalances, useHaloBalance } from "services/terra/hooks";
import debounce from "lodash/debounce";
import { useLBPContract, useBuildSwapMsg } from "services/terra/hooks";

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
  fromBalance?: string;
  fromMin?: number;
  fromMax?: number;
  fromStep?: number;
  toAmount?: number;
  toUSDAmount?: number;
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
  ustPrice: Dec;
};

function SwapInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="usd-price text-xs text-gray-600 uppercase">{value}</p>
    </div>
  );
}

export default function SwapForm({
  pair,
  saleTokenInfo,
  loading,
  ustPrice,
}: SwapFormProps) {
  const form = useForm({
    defaultValues: {
      [Key.fromAmount]: "",
      [Key.toAmount]: "",
      [Key.fromAsset]: "native_token",
      [Key.toAsset]: "token",
      [Key.feeValue]: "",
      [Key.feeSymbol]: currency_text[denoms.uusd],
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

  const { register, watch, setValue, setFocus } = form;
  const [isReversed, setIsReversed] = useState(false);
  const [usingMaxNativeAmount, setUsingMaxNativeAmount] = useState(false);
  const [balances, setBalances] = useState<any>({});
  const [tx, setTx] = useState<any>({ msgs: [], fee: null });
  const [lastTx, setLastTx] = useState<{ state: string }>();
  const [pendingSimulation, setPendingSimulation] = useState<{ type: string }>({
    type: "",
  });
  const [simulating, setSimulating] = useState(false);
  const [priceImpact, setPriceImpact] = useState<any>();
  const [error, setError] = useState("");
  const wallet = useConnectedWallet();
  const { contract: lbpContract } = useLBPContract();
  const { buildSwapFromContractTokenMsg, buildSwapFromNativeTokenMsg } =
    useBuildSwapMsg();

  const ustExchangeRate = 1;

  const decimals: any = {
    native_token: NATIVE_TOKEN_DECIMALS,
    token: saleTokenInfo?.decimals,
  };

  const nativeTokenDenom: string =
    pair?.asset_infos &&
    nativeTokenFromPair(pair?.asset_infos).info.native_token.denom;

  const symbols: Record<string, any> = useMemo(
    () => ({
      native_token: NATIVE_TOKEN_SYMBOLS[nativeTokenDenom],
      token: saleTokenInfo?.symbol,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pair, saleTokenInfo]
  );

  const { main: UST_balance } = useBalances(denoms.uusd);
  const haloBalance = useHaloBalance();

  const formData = watch();

  let maxFromAmount: string = "";
  if (balances[formData.fromAsset]) {
    maxFromAmount = balances[formData.fromAsset];
  }

  function updateSimulatedAmount(value: string, type: string) {
    if (type === "forward") {
      setValue(Key.toAmount, value);
    } else {
      setValue(Key.fromAmount, value);
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetPendingSimulation = useCallback(
    debounce(setPendingSimulation, 300),
    []
  );

  function nullifyTx() {
    setTx({ msgs: null, fee: null });
  }

  async function buildTx(fromAmount: string, fromAsset: string) {
    const builders: Record<string, any> = {
      native_token: buildSwapFromNativeTokenMsg,
      token: buildSwapFromContractTokenMsg,
    };

    const intAmount = new Dec(fromAmount || 0)
      .mul(10 ** decimals[fromAsset])
      .toInt();
    const msg = builders[fromAsset]({
      pair,
      intAmount,
    });

    // Fetch fees unless the user selected "max" for the native amount
    // (that logic already calculated the fee by backing it out of the wallet balance)
    console.log("build: ", { ...tx, msgs: [msg] });
    return { ...tx, msgs: [msg] };
  }

  useEffect(() => {
    if (!pendingSimulation.type) return;
    setSimulating(true);

    async function simulate() {
      setError("");
      const { type } = pendingSimulation;
      let simulationFn,
        decInputAmount,
        inputAmountString,
        simulationInputAsset,
        simulationOutputAsset;

      if (type === "forward") {
        simulationFn = lbpContract.getSimulation;
        inputAmountString = formData.fromAmount;
        [simulationInputAsset, simulationOutputAsset] = [
          formData.fromAsset,
          formData.toAsset,
        ];
      } else {
        simulationFn = lbpContract.getReverseSimulation;
        inputAmountString = formData.toAmount;
        [simulationInputAsset, simulationOutputAsset] = [
          formData.toAsset,
          formData.fromAsset,
        ];
      }

      const requestAsset =
        simulationInputAsset === "native_token"
          ? nativeTokenFromPair(pair?.asset_infos)
          : saleAssetFromPair(pair?.asset_infos);

      try {
        decInputAmount = new Dec(inputAmountString);
      } catch {
        updateSimulatedAmount("", type);
        resetSimulationState();
        return;
      }

      // Don't run simulation when from amount is below minimum
      if (
        type === "forward" &&
        decInputAmount.lessThan(smallestDecOfAsset(formData.fromAsset))
      ) {
        updateSimulatedAmount("", type);
        resetSimulationState();
        return;
      }
      console.log("simulate: ", type, requestAsset, decInputAmount.toNumber());
      try {
        const simuationArgs = {
          amount: decInputAmount
            .mul(10 ** decimals[simulationInputAsset])
            .toInt(),
          contract_addr:
            requestAsset?.info[simulationInputAsset]?.contract_addr,
        };
        const simulation = await simulationFn(
          simuationArgs.amount.toString(),
          simuationArgs.contract_addr
        );

        const decOutputAmount = Dec.withPrec(
          simulation[type === "forward" ? "return_amount" : "offer_amount"],
          decimals[simulationOutputAsset]
        );

        // update output amount
        updateSimulatedAmount(
          decOutputAmount.toFixed(decimals[simulationOutputAsset]),
          type
        );

        console.log("output", decOutputAmount.toNumber(), maxFromAmount);
        // Calculate and set price impact
        let simulatedPrice;
        if (simulationInputAsset === "native_token") {
          simulatedPrice = decInputAmount.div(decOutputAmount);
        } else {
          simulatedPrice = decOutputAmount.div(decInputAmount);
        }

        setPriceImpact(
          simulatedPrice.sub(ustPrice).div(ustPrice).toFixed(2).toString()
        );

        if (
          (type === "forward" ? decInputAmount : decOutputAmount).greaterThan(
            parseInt(maxFromAmount)
          )
        ) {
          setError(`Not enough ${symbols[formData.fromAsset]}`);
          console.log("Not enough ", symbols[formData.fromAsset]);
          nullifyTx();
        } else {
          // A successful simulation is a pre-req to building the tx

          let fromAmount;
          if (type === "forward") {
            fromAmount = decInputAmount;
          } else {
            fromAmount = decOutputAmount;
          }

          try {
            setTx(await buildTx(fromAmount.toString(), formData.fromAsset));
          } catch {
            setError("Failed to estimate fees");
          }
        }
      } catch (e) {
        console.log("simulateError: ", e);
        // setError();
        // report error;
      } finally {
        setSimulating(false);
      }
    }

    simulate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingSimulation]);

  function usdExchangeRateForAsset(asset: string) {
    if (asset === "native_token") {
      return new Dec(ustExchangeRate);
    } else {
      return ustPrice.mul(ustExchangeRate);
    }
  }

  function calculateHaloToUst() {
    return new Dec(1).div(ustPrice).toFixed(2);
  }

  function convertAmountToUSD(amountStr: string, asset: string) {
    let decAmount;

    try {
      decAmount = new Dec(amountStr);
    } catch {
      return 0;
    }

    const rate = usdExchangeRateForAsset(asset);
    // const rate = 0.99; // use as temporary rate till the usdExchange function is implemented
    return decAmount.mul(rate);
  }

  const fromUSDAmount = convertAmountToUSD(
    formData.fromAmount,
    formData.fromAsset
  );
  const toUSDAmount = convertAmountToUSD(formData.toAmount, formData.toAsset);

  const updateBalances = useCallback(async () => {
    if (wallet?.walletAddress) {
      setBalances({
        native_token: UST_balance,
        token: haloBalance,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet?.walletAddress, pair]);

  useEffect(() => {
    updateBalances();
  }, [updateBalances]);

  function resetSimulationState() {
    // setPriceImpact(null);
    // nullifyTx();
    setSimulating(false);
  }

  async function executeSwap() {
    // const feeEstimate = await lbpContract.estimateFee([tx.msg]);
    // console.log("fee ", feeEstimate);

    try {
      setLastTx({ state: "pending" });
      console.log("broadcast: ", tx);
      const response = await wallet?.post(tx);
      if (response?.success) {
        // show modal
        console.log("success ", response);
      } else {
        // display terra error
        console.log("err: ", response);
      }
    } catch (e) {
      console.log("error: ", e);
      // display good error feedback
    }
  }

  function smallestDecOfAsset(asset: string) {
    return new Dec(1).div(10 ** decimals[asset]);
  }
  function fromAmountChanged(amount: string) {
    // If the from amount changes from an input event,
    // we're no longer using the calculated max amount
    // setUsingMaxNativeAmount(false);

    setValue(Key.fromAmount, amount);

    // debouncedSetPendingSimulation({ type: "forward" });
  }

  function toAmountChanged(amount: string) {
    setValue(Key.toAmount, amount);
  }

  const handleFromAssetSelect = (token: string) => {
    setValue(Key.fromAsset, token);
  };

  const handletoAssetSelect = (token: string) => {
    setValue(Key.toAsset, token);
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
    setValue(key, value);
    debouncedSetPendingSimulation({ type: "forward" });
  }

  const pairSwitchable = useMemo(
    () =>
      formData.fromAsset &&
      formData.toAsset &&
      formData.fromAsset !== formData.toAsset,
    [formData]
  );

  const canSubmit = () => {
    return (
      !!pair &&
      !!error &&
      formData.fromAmount &&
      formData.toAmount &&
      tx.msgs.length > 0
    );
  };

  return (
    <div className="w-full bg-white shadow-xl rounded-lg p-5 mt-4">
      <CurrencyInputPanel
        label="From"
        min={smallestDecOfAsset(formData.fromAsset)}
        max={maxFromAmount}
        step={smallestDecOfAsset(formData.fromAsset)}
        amount={formData?.fromAmount}
        required={true}
        // maxClick={fromMaxClick}
        usdAmount={fromUSDAmount}
        balanceString={balances[formData.fromAsset]}
        assetSymbol={symbols[formData.fromAsset]}
        onAmountChange={fromAmountChanged}
        disable={!pair || loading}
        {...register(Key.fromAsset)}
      ></CurrencyInputPanel>
      <CurrencyDivider
        onClickHandler={() => pairSwitchable && handleSwitchToken()}
      ></CurrencyDivider>
      <CurrencyInputPanel
        label="To"
        amount={formData.toAmount}
        min={smallestDecOfAsset(formData.toAsset)}
        step={smallestDecOfAsset(formData.toAsset)}
        required={true}
        usdAmount={toUSDAmount}
        balanceString={balances[formData.toAsset]}
        assetSymbol={symbols[formData.toAsset]}
        onAmountChange={toAmountChanged}
        disable={!pair || loading}
        {...register(Key.toAsset)}
      ></CurrencyInputPanel>
      <div className="swap-effect flex flex-col justify-between font-heading my-5 gap-3">
        {error && (
          <p className="text-red-500 font-semibold text-md text-center">
            {error}
          </p>
        )}
        {symbols.native_token && symbols.token && (
          <SwapInfo
            label="Price"
            value={`1 ${symbols.native_token} = ${calculateHaloToUst()} ${
              symbols.token
            }`}
          />
        )}
        {priceImpact && (
          <SwapInfo label="Price Impact" value={`${priceImpact}%`} />
        )}
      </div>
      <SwapButton
        disabled={!canSubmit() || !!wallet}
        // loading={props.isLoading}
        onHandleClick={executeSwap}
      ></SwapButton>
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

export const SwapButton = ({
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
      onClick={() => !disabled && onHandleClick()}
      disabled={disabled}
      className="disabled:bg-grey-accent bg-angel-blue hover:bg-thin-blue focus:bg-thin-blue text-center w-full h-12 rounded-3xl tracking-widest uppercase text-md font-bold font-heading text-white shadow-sm focus:outline-none"
    >
      Swap
    </button>
  );
};
