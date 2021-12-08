import { UseFormRegister, UseFormReturn } from "react-hook-form";
import { RiArrowDownCircleLine } from "react-icons/ri";
import CurrencyInputPanel from "./CurrencyInputPanel";

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
  onSubmit?: Function;
  onFromAmountChange?: (value: string) => {};
  fromMaxClick?: () => {};
  onToAmountChange?: (value: string) => {};
  error?: string;
  canSubmit?: boolean;
  onReverseAssets?: () => {};
  form?: any;
  register: UseFormRegister<any>;
};

export default function SwapForm({
  onSubmit,
  onFromAmountChange,
  fromMaxClick,
  onToAmountChange,
  form,
  canSubmit,
  onReverseAssets,
}: SwapFormProps) {
  const { register } = form;
  return (
    <div className="w-full bg-white shadow-xl rounded-lg p-5 mt-4">
      <CurrencyInputPanel
        label="From"
        min={form?.fromMin}
        max={form?.fromMax}
        step={form?.fromStep}
        amount={form?.fromAmount}
        required={true}
        maxClick={fromMaxClick}
        usdAmount={form?.fromUSDAmount}
        balanceString={form?.fromBalance}
        assetSymbol={form?.fromAssetSymbol}
        onAmountChange={onFromAmountChange}
        {...register(form.fromAsset)}
      ></CurrencyInputPanel>
      <CurrencyDivider onClickHandler={onReverseAssets}></CurrencyDivider>
      <CurrencyInputPanel
        label="From"
        step={form?.toStep}
        amount={form?.toAmount}
        required={true}
        usdAmount={form?.toUSDAmount}
        balanceString={form?.toBalance}
        assetSymbol={form?.toAssetSymbol}
        onAmountChange={onToAmountChange}
        {...register(form.toAsset)}
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
        disabled={!canSubmit}
        // loading={props.isLoading}
        onHandleClick={onSubmit}
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
