import type { IFsaSigner } from "@better-giving/reg";
import { format } from "date-fns";
import { anvil_envs, env } from ".server/env";
import { anvil } from ".server/sdks";

interface Eids {
  packet: string;
  signer: string;
}

export const etch_eids = async (
  reg_id: string,
  signer: IFsaSigner,
  redirect_url: string
) => {
  const FILE_ALIAS = "ap-agreement";
  const signer_data = {
    id: reg_id,
    name: signer.first_name + " " + signer.last_name,
    email: signer.email,
    signerType: "embedded",
    enableEmails: ["etchComplete"],
    redirectURL: redirect_url,
    fields: [
      {
        fileId: FILE_ALIAS,
        fieldId: "grantee",
      },
    ],
  };
  const file_data = {
    id: FILE_ALIAS,
    castEid: anvil_envs.fsa_template_id,
    title: "Better Giving Fiscal Sponsorship And Grant Agreement",
    filename: "better-giving-fs-ga.pdf",
    fontSize: 10,
    textColor: "#333333",
  };

  const now = new Date();
  const fill_data = {
    dateDay: format(now, "d"), //day of month
    dateMonth: format(now, "LLLL"), // month name
    dateYear: format(now, "y"), //calendar year
    dateFull: format(now, "PP"), //e.g. Apr 29, 1453
    orgName: signer.org_name,
    orgLegalEntity: signer.docs.o_legal_entity_type,
    orgHq: signer.org_hq_country,
    granteeTitle: signer.role,
    granteeName: {
      firstName: signer.first_name,
      mi: "",
      lastName: signer.last_name,
    },
    projectDescription: signer.docs.o_project_description,
  };

  const res = await anvil.createEtchPacket({
    variables: {
      isDraft: false,
      isTest: env === "staging",
      files: [file_data],
      signers: [signer_data],
      data: {
        payloads: {
          [FILE_ALIAS]: {
            data: fill_data,
          },
        },
      },
    },
  });

  if (res.errors && res.errors.length > 0) {
    throw new Error("Failed to create etch packet");
  }

  return {
    packet: res.data?.data.createEtchPacket.eid,
    signer: res.data?.data.createEtchPacket.documentGroup.signers[0].eid,
  } satisfies Eids;
};
