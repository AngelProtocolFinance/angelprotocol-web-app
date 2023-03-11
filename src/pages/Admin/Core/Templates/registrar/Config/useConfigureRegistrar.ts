import { useFormContext } from "react-hook-form";
import {
  RegistrarConfigUpdateMeta,
  RegistrarConfigValues,
} from "pages/Admin/types";
import { RegistrarConfigPayload } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import Popup from "components/Popup";
import CW3 from "contracts/CW3";
import Registrar from "contracts/Registrar";
import useCosmosTxSender from "hooks/useCosmosTxSender/useCosmosTxSender";
import { genDiffMeta, getPayloadDiff } from "helpers/admin";
import { cleanObject } from "helpers/cleanObject";

type Key = keyof RegistrarConfigPayload;
type Value = RegistrarConfigPayload[Key];
export default function useConfigureRegistrar() {
  const { cw3, propMeta, getWallet } = useAdminResources();
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext<RegistrarConfigValues>();
  const { showModal } = useModalContext();
  const sendTx = useCosmosTxSender();

  async function configureRegistrar({
    title,
    description,
    initialConfigPayload,
    ...data //registrarConfig
  }: RegistrarConfigValues) {
    //check for changes
    const diff = getPayloadDiff(initialConfigPayload, data);
    const diffEntries = Object.entries(diff) as [Key, Value][];
    if (diffEntries.length === 0) {
      showModal(Popup, { message: "no changes detected" });
      return;
    }

    //convert presentational decimal to floating point string
    const finalPayload: RegistrarConfigPayload = {
      ...diff,
      split_default: diff.split_default && `${+diff.split_default / 100}`,
      split_max: diff.split_max && `${+diff.split_max / 100}`,
      split_min: diff.split_min && `${+diff.split_min / 100}`,
    };

    const wallet = getWallet();
    if (typeof wallet === "function") return wallet();

    const registrarContract = new Registrar(wallet);
    const configUpdateMsg = registrarContract.createEmbeddedConfigUpdateMsg(
      cleanObject(finalPayload)
    );

    const configUpdateMeta: RegistrarConfigUpdateMeta = {
      type: "reg_config",
      data: genDiffMeta(diffEntries, initialConfigPayload),
    };

    const adminContract = new CW3(wallet, cw3);
    const proposalMsg = adminContract.createProposalMsg(
      title,
      description,
      [configUpdateMsg],
      JSON.stringify(configUpdateMeta)
    );

    await sendTx({
      msgs: [proposalMsg],
      ...propMeta,
    });
  }

  return {
    configureRegistrar: handleSubmit(configureRegistrar),
    isSubmitDisabled: !isDirty || isSubmitting,
  };
}
