import type { IForm } from "@better-giving/forms";
import { funddb, npodb } from "../aws/db";

export interface IRecipient {
  name: string;
  members: string[];
  program?: { id: string; name: string };
  hide_bg_tip?: boolean;
}

export const recipient_fn = async (
  id: string,
  type: IForm["recipient_type"],
  owner: string
): Promise<IRecipient | undefined> => {
  if (type === "fund") {
    const x = await funddb.fund(id);
    if (!x) return;
    return {
      name: x.name,
      members: x.members.map((x) => x.toString()),
    };
  }

  if (type === "npo") {
    const x = await npodb.npo(+id, ["name", "hide_bg_tip"]);
    if (!x) return;
    return { name: x.name, members: [], hide_bg_tip: x.hide_bg_tip };
  }

  if (type === "program") {
    // program owner is npo
    const npo = await npodb.npo(+owner, ["name", "id", "hide_bg_tip"]);
    if (!npo) return;
    const p = await npodb.npo_program(id, npo.id);
    return {
      name: npo.name,
      members: [],
      program: p ? { id: p.id, name: p.title } : undefined,
      hide_bg_tip: npo.hide_bg_tip,
    };
  }
};
