import { useFormContext } from "react-hook-form";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import Popup from "components/Popup/Popup";
import { useSetModal } from "components/Modal/Modal";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import { terra } from "services/terra/terra";
import { admin, tags } from "services/terra/tags";
import { useSetter } from "store/accessors";
import Admin from "contracts/Admin";
import getPayloadDiff from "helpers/getPayloadDiff";
import cleanObject from "helpers/cleanObject";
import genProposalsLink from "../genProposalsLink";
import useWalletContext from "hooks/useWalletContext";
import { RegistrarConfigValues } from "./registrarConfigSchema";
import Registrar from "contracts/Registrar";
import { RegistrarConfigPayload } from "contracts/types";
import { ProposalMeta } from "pages/Admin/types";
import { proposalTypes } from "constants/routes";
import genDiffMeta from "../genDiffMeta";

type Key = keyof RegistrarConfigPayload;
type Value = RegistrarConfigPayload[Key];
export default function useConfigureRegistrar() {
  const { wallet } = useWalletContext();
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext<RegistrarConfigValues>();
  const { showModal } = useSetModal();
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

    const configUpdateMeta: ProposalMeta = {
      type: proposalTypes.registrar_updateConfig,
      data: genDiffMeta(diffEntries, initialConfigPayload),
    };

    const adminContract = new Admin("apTeam", wallet);
    const proposalMsg = adminContract.createProposalMsg(
      title,
      description,
      [configUpdateMsg],
      JSON.stringify(configUpdateMeta)
    );

    dispatch(
      sendTerraTx({
        msgs: [proposalMsg],
        wallet,
        tagPayloads: [
          terra.util.invalidateTags([
            { type: tags.admin, id: admin.proposals },
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
