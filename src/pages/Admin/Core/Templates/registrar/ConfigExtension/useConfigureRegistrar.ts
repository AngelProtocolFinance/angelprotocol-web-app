import { useFormContext } from "react-hook-form";
import createCosmosMsg, { embedMsg } from "tx/createCosmosMsg";
import {
  RegistrarConfigExtensionValues as RV,
  RegistrarConfigUpdateMeta,
} from "pages/Admin/types";
import { RegistrarConfigExtensionPayload as RP } from "types/contracts";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import Prompt from "components/Prompt";
import useTxSender from "hooks/useTxSender";
import { genDiffMeta, getPayloadDiff } from "helpers/admin";
import { cleanObject } from "helpers/cleanObject";

type Key = keyof RP;
type Value = RP[Key];

export default function useConfigureRegistrar() {
  const { cw3, propMeta } = useAdminResources();
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext<RV>();
  const { showModal } = useModalContext();
  const sendTx = useTxSender();

  async function configureRegistrar({
    title,
    description,
    initialConfigPayload,
    ...data //registrarConfig
  }: RV) {
    //check for changes
    const diff = getPayloadDiff(initialConfigPayload, data);
    const diffEntries = Object.entries(diff) as [Key, Value][];
    if (diffEntries.length === 0) {
      return showModal(Prompt, {
        type: "error",
        title: "Update Registrar",
        headline: "No Changes Detected",
        children: "Nothing to submit, no changes detected",
      });
    }

    const configUpdateMeta: RegistrarConfigUpdateMeta = {
      type: "reg_config_extension",
      data: genDiffMeta(diffEntries, initialConfigPayload),
    };

    const msg = createCosmosMsg("sender", "cw3.propose", {
      cw3,
      title,
      description,
      msgs: [embedMsg("registrar.update-config-extension", cleanObject(diff))],
      meta: JSON.stringify(configUpdateMeta),
    });

    await sendTx({
      content: { type: "cosmos", val: [msg] },
      ...propMeta,
    });
  }

  return {
    configureRegistrar: handleSubmit(configureRegistrar),
    isSubmitDisabled: !isDirty || isSubmitting,
  };
}
