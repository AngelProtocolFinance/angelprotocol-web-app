import { useFormContext } from "react-hook-form";
import {
  RegistrarConfigUpdateMeta,
  RegistrarConfigValues,
} from "pages/Admin/types";
import { RegistrarConfigPayload } from "types/server/contracts";
import { invalidateJunoTags } from "services/juno";
import { adminTags, junoTags } from "services/juno/tags";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import Popup from "components/Popup";
import TransactionPrompt from "components/Transactor/TransactionPrompt";
import { useSetter } from "store/accessors";
import { sendCosmosTx } from "slices/transaction/transactors";
import Admin from "contracts/Admin";
import Registrar from "contracts/Registrar";
import { cleanObject, getPayloadDiff } from "helpers";
import genDiffMeta from "../genDiffMeta";
import genProposalsLink from "../genProposalsLink";

type Key = keyof RegistrarConfigPayload;
type Value = RegistrarConfigPayload[Key];
export default function useConfigureRegistrar() {
  const { wallet } = useGetWallet();
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext<RegistrarConfigValues>();
  const { showModal } = useModalContext();
  const dispatch = useSetter();

  async function configureRegistrar({
    title,
    description,
    initialConfigPayload,
    ...data //registrarConfig
  }: RegistrarConfigValues) {
    //check for changes
    const diff = getPayloadDiff(initialConfigPayload, data);
    const diffEntries = Object.entries(diff) as [Key, Value][];
    if (diffEntries.length <= 0) {
      showModal(Popup, { message: "no changes detected" });
      return;
    }
    //convert presentational decimal to floating point string
    const finalPayload: RegistrarConfigPayload = {
      ...diff,
      tax_rate: diff.tax_rate && `${+diff.tax_rate / 100}`,
      split_default: diff.split_default && `${+diff.split_default / 100}`,
      split_max: diff.split_max && `${+diff.split_max / 100}`,
      split_min: diff.split_min && `${+diff.split_min / 100}`,
    };

    const registrarContract = new Registrar(wallet);
    const configUpdateMsg = registrarContract.createEmbeddedConfigUpdateMsg(
      cleanObject(finalPayload)
    );

    const configUpdateMeta: RegistrarConfigUpdateMeta = {
      type: "registrar-update-config",
      data: genDiffMeta(diffEntries, initialConfigPayload),
    };

    const adminContract = new Admin(wallet, "apTeam");
    const proposalMsg = adminContract.createProposalMsg(
      title,
      description,
      [configUpdateMsg],
      JSON.stringify(configUpdateMeta)
    );

    dispatch(
      sendCosmosTx({
        wallet,
        msgs: [proposalMsg],
        tagPayloads: [
          invalidateJunoTags([
            { type: junoTags.admin, id: adminTags.proposals },
          ]),
        ],
        successLink: genProposalsLink("apTeam"),
        successMessage: "Config update proposal submitted",
      })
    );
    showModal(TransactionPrompt, {});
  }

  return {
    configureRegistrar: handleSubmit(configureRegistrar),
    isSubmitDisabled: !isDirty || isSubmitting,
  };
}
