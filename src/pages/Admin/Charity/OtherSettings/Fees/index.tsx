import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { object, string } from "yup";
import { FV } from "./types";
import { SchemaShape } from "schemas/types";
import { TFee, TFees } from "slices/launchpad/types";
import { Fee } from "types/ast";
import { Fee as ContractFee, FeeSettingsUpdate } from "types/contracts";
import { SimulContractTx } from "types/evm";
import { useAdminResources } from "pages/Admin/Guard";
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
    getWallet,
  } = useAdminResources<"charity">();

  const { showModal } = useModalContext();
  const sendTx = useTxSender();

  const initial: FeeSettingsUpdate = {
    id,
    earlyLockedWithdrawFee,
    withdrawFee,
    depositFee,
    balanceFee,
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
    defaultValues: {
      earlyWithdraw: formFee(earlyLockedWithdrawFee),
      deposit: formFee(depositFee),
      withdrawal: formFee(withdrawFee),
      balance: formFee(balanceFee),
      initial,
    },
  });

  const onSubmit: SubmitHandler<FV> = async (fees) => {
    try {
      const wallet = getWallet([
        "earlyLockedWithdrawFee",
        "withdrawFee",
        "depositFee",
        "balanceFee",
      ]);
      if (typeof wallet === "function") return wallet();

      const update: FeeSettingsUpdate = {
        ...initial,
        earlyLockedWithdrawFee: contractFee(fees.earlyWithdraw),
        withdrawFee: contractFee(fees.withdrawal),
        depositFee: contractFee(fees.deposit),
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

      const tx: SimulContractTx = wallet.isDelegated
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
        ...wallet.meta,
        tagPayloads: getTagPayloads(wallet.meta.willExecute && meta.id),
      });
    } catch (err) {
      showModal(TxPrompt, {
        error: err instanceof Error ? err.message : "Unknown error occured",
      });
    }
  };

  const { handleSubmit } = methods;
  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)} />
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
