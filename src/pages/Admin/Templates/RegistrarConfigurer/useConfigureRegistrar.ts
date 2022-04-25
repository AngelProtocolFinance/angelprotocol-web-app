import { RegistrarConfigPayload } from "@types-server/contracts";
import { useFormContext } from "react-hook-form";
import { proposalTypes } from "types/routes";
import { ProposalMeta } from "pages/Admin/types";
import { adminTags, terraTags } from "services/terra/tags";
import { terra } from "services/terra/terra";
import { sendTerraTx } from "slices/transaction/transactors/sendTerraTx";
import { useSetter } from "store/accessors";
import { useSetModal } from "components/Modal/Modal";
import Popup from "components/Popup/Popup";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import Admin from "contracts/Admin";
import Registrar from "contracts/Registrar";
import useWalletContext from "hooks/useWalletContext";
import cleanObject from "helpers/cleanObject";
import getPayloadDiff from "helpers/getPayloadDiff";
import genDiffMeta from "../genDiffMeta";
import genProposalsLink from "../genProposalsLink";
import { RegistrarConfigValues } from "./registrarConfigSchema";

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
            { type: terraTags.admin, id: adminTags.proposals },
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
