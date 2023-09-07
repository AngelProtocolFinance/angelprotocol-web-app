import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Amount, FV, FormMeta, WithdrawerProps } from "./types";
import { useAdminContext } from "pages/Admin/Context";
import { useGetWallet } from "contexts/WalletContext";
import { condense, roundDown } from "helpers";
import { isEthereumAddress } from "schemas/tests";
import { chainIds } from "constants/chainIds";
import Form from "./Form";
import { schema } from "./schema";

export default function WithdrawForm({
  classes = "",
  balances,
  accountType,
  bridgeFees,
  protocolFeeRates,
  endowmentState,
}: WithdrawerProps & { classes?: string }) {
  const { wallet } = useGetWallet();
  const {
    id,
    endowType,
    earlyLockedWithdrawFee,
    depositFee,
    withdrawFee,
    maturityTime,
  } = useAdminContext<"charity">();

  const amounts: Amount[] = balances.map((c) => ({
    tokenId: c.address,
    balance: roundDown(condense(c.amount)),
    value: "",
  }));

  const meta: FormMeta = {
    _amounts: "",
    endowId: id,
    endowType,
    maturityTime,
    accountType,
    bridgeFees,
    protocolFeeRates,
    endowFeeRates: {
      earlyLockedWithdrawBps: earlyLockedWithdrawFee.bps,
      depositBps: depositFee.bps,
      withdrawBps: withdrawFee.bps,
    },
    endowmentState,
  };

  const { closed, closingBeneficiary } = endowmentState;

  const values: FV = {
    ...meta,
    amounts,
    beneficiaryWallet:
      //prettier-ignore
      closed && (closingBeneficiary.type === "wallet" || closingBeneficiary.type === "treasury")
        ? closingBeneficiary.value //this value won't be changed as UI is read-only on this cases
        : wallet?.address && isEthereumAddress(wallet.address)
        ? wallet.address
        : "",
    beneficiaryEndowment:
      closed && closingBeneficiary.type === "endowment"
        ? {
            id: +closingBeneficiary.value,
            name: "Closing beneficiary endowment",
          }
        : { id: 0, name: "" },

    beneficiaryType: closed
      ? closingBeneficiary.type
      : endowType === "daf"
      ? "endowment"
      : "wallet",
    destinationChainId: chainIds.polygon,
  };

  const methods = useForm<FV, { meta: FormMeta }>({
    mode: "onChange",
    reValidateMode: "onChange",
    values,
    resolver: yupResolver(schema),
    context: { meta },
  });
  return (
    <FormProvider {...methods}>
      <Form classes={classes} />
    </FormProvider>
  );
}
