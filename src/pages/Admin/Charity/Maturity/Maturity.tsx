import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { mixed, object, string, date as yupDate } from "yup";
import { FV } from "./types";
import { SchemaShape } from "schemas/types";
import { EndowmentSettingsUpdate } from "types/contracts";
import { SimulContractTx } from "types/evm";
import { useModalContext } from "contexts/ModalContext";
import { TxPrompt } from "components/Prompt";
import { dateToFormFormat } from "components/form";
import { createTx, encodeTx } from "contracts/createTx/createTx";
import useTxSender from "hooks/useTxSender";
import { isEmpty } from "helpers";
import {
  blockTime,
  fromBlockTime,
  getPayloadDiff,
  getTagPayloads,
} from "helpers/admin";
import { useAdminResources } from "../../Guard";
import Form from "./Form";

export default function Maturity() {
  const {
    allowlistedBeneficiaries,
    allowlistedContributors,
    id,
    donationMatchActive,
    splitToLiquid,
    ignoreUserSplits,
    maturityTime,
    maturityAllowlist,
    checkSubmit,
    multisig,
  } = useAdminResources<"charity">();
  const { showModal } = useModalContext();
  const sendTx = useTxSender();

  const initial: EndowmentSettingsUpdate = {
    id,
    donationMatchActive,
    maturityTime,
    allowlistedBeneficiaries,
    allowlistedContributors,
    maturity_allowlist_add: [], //not included in form
    maturity_allowlist_remove: [], //not included in form
    splitToLiquid,
    ignoreUserSplits,
  };

  const willMature = maturityTime !== 0;
  const methods = useForm<FV>({
    resolver: yupResolver(
      object().shape<SchemaShape<FV>>({
        date: mixed().when("willMature", {
          is: true,
          then: yupDate()
            .typeError("invalid date")
            .min(new Date(), "must be in the future"),
          otherwise: string(),
        }),
      })
    ),
    defaultValues: {
      willMature,
      beneficiaries: maturityAllowlist,
      //date is valid date-string, when data.willMature is true
      date: willMature ? dateToFormFormat(fromBlockTime(maturityTime)) : "",
      initial,
    },
  });

  const onSubmit: SubmitHandler<FV> = async ({
    initial,
    beneficiaries,
    willMature,
    date,
  }) => {
    try {
      const result = checkSubmit(["maturityAllowlist", "maturityTime"]);
      if (typeof result === "function") return result();

      const prev = new Set(maturityAllowlist);
      const curr = new Set(beneficiaries);
      const add = beneficiaries.filter((b) => !prev.has(b));
      const remove = maturityAllowlist.filter((b) => !curr.has(b));

      const update: EndowmentSettingsUpdate = {
        ...initial,
        maturityTime: willMature ? blockTime(date) : 0,
        maturity_allowlist_add: add,
        maturity_allowlist_remove: remove,
      };

      const diff = getPayloadDiff(initial, update);
      if (isEmpty(diff)) {
        return showModal(TxPrompt, { error: "No changes detected" });
      }

      const [data, dest, meta] = encodeTx(
        "accounts.update-settings",
        update,
        diff
      );

      const { wallet, txMeta, isDelegated } = result;
      const tx: SimulContractTx = isDelegated
        ? { from: wallet.address, to: dest, data }
        : createTx(wallet.address, "multisig.submit-transaction", {
            multisig,
            title: `Update whitelists settings`,
            description: `Update whitelists settings for endowment id:${id} by member:${wallet?.address}`,
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

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)} />
    </FormProvider>
  );
}
