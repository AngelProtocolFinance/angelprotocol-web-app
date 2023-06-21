import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { object, string } from "yup";
import { FV } from "./types";
import { SchemaShape } from "schemas/types";
import { TFee, TFees } from "slices/launchpad/types";
import { Fee } from "types/ast";
import { Fee as ContractFee, FeeSettingsUpdate } from "types/contracts";
import { SimulContractTx } from "types/evm";
import { useModalContext } from "contexts/ModalContext";
import { TxPrompt } from "components/Prompt";
import { feeKeys } from "components/ast";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { getPayloadDiff, getTagPayloads } from "helpers/admin";
import { positiveNumber, requiredPercent } from "schemas/number";
import { requiredWalletAddr } from "schemas/string";
import { chainIds } from "constants/chainIds";
import { ADDRESS_ZERO } from "constants/evm";
import { isTooltip, useAdminContext } from "../../../Context";
import Form from "./Form";

const fee: SchemaShape<TFee> = {
  receiver: string().when(feeKeys.isActive, (v, schema) =>
    v ? requiredWalletAddr(chainIds.polygon) : schema.optional()
  ),
  rate: string().when(feeKeys.isActive, (v, schema) =>
    v ? requiredPercent : schema.optional()
  ),
};

export default function Fees() {
  const {
    id,
    multisig,
    earlyLockedWithdrawFee,
    withdrawFee,
    depositFee,
    balanceFee,
    txResource,
  } = useAdminContext<"charity">([
    "earlyLockedWithdrawFee",
    "withdrawFee",
    "depositFee",
    "balanceFee",
  ]);

  const { showModal } = useModalContext();
  const sendTx = useTxSender();

  const initial: FeeSettingsUpdate = {
    id,
    earlyLockedWithdrawFee,
    withdrawFee,
    depositFee,
    balanceFee,
  };

  const defaultValues: FV = {
    earlyWithdraw: formFee(earlyLockedWithdrawFee),
    deposit: formFee(depositFee),
    withdrawal: formFee(withdrawFee),
    balance: formFee(balanceFee),
    initial,
  };

  const methods = useForm<FV>({
    mode: "onChange",
    resolver: yupResolver(
      object().shape<SchemaShape<TFees>>({
        earlyWithdraw: object().shape(fee),
        deposit: object().shape(fee),
        withdrawal: object().shape(fee),
        balance: object().shape(fee),
        referral_id: positiveNumber,
      })
    ),
    defaultValues,
  });

  const onSubmit: SubmitHandler<FV> = async (fees) => {
    try {
      if (isTooltip(txResource)) throw new Error(txResource);

      const update: FeeSettingsUpdate = {
        id,
        earlyLockedWithdrawFee: contractFee(fees.earlyWithdraw),
        depositFee: contractFee(fees.deposit),
        withdrawFee: contractFee(fees.withdrawal),
        balanceFee: contractFee(fees.balance),
      };

      const diff = getPayloadDiff(initial, update);

      if (Object.entries(diff).length <= 0) {
        return showModal(TxPrompt, { error: "No changes detected" });
      }

      const [data, dest, meta] = encodeTx(
        "accounts.update-fee-settings",
        update,
        diff
      );

      const { wallet, txMeta, isDelegated } = txResource;
      const tx: SimulContractTx = isDelegated
        ? { from: wallet.address, to: dest, data }
        : createTx(wallet.address, "multisig.submit-transaction", {
            multisig,
            title: `Update fee settings`,
            description: `Update fee settings for endowment id:${id} by member:${wallet?.address}`,
            destination: dest,
            value: "0",
            data,
            meta: meta.encoded,
          });

      await sendTx({
        content: { type: "evm", val: tx },
        ...txMeta,
        tagPayloads: getTagPayloads(txMeta.willExecute && meta.id),
      });
    } catch (err) {
      showModal(TxPrompt, {
        error: err instanceof Error ? err.message : "Unknown error occured",
      });
    }
  };

  const { handleSubmit, reset } = methods;
  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        onReset={(ev) => {
          ev.preventDefault();
          reset(defaultValues);
        }}
      />
    </FormProvider>
  );
}

function formFee({ bps, payoutAddress }: ContractFee): Fee {
  return {
    rate: bps === 0 ? "" : (bps / 100).toFixed(2),
    receiver: payoutAddress === ADDRESS_ZERO ? "" : payoutAddress,
    isActive: !(bps === 0 && payoutAddress === ADDRESS_ZERO),
  };
}

function contractFee({ rate, receiver, isActive }: Fee): ContractFee {
  return {
    payoutAddress: isActive ? receiver : ADDRESS_ZERO,
    bps: isActive ? Math.floor(+rate * 100) : 0,
  };
}
