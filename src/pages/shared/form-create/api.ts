import type { IProgramDb } from "@better-giving/endowment";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { resp, search } from "helpers/https";
import type { IForm } from "lib/forms";
import { nanoid } from "nanoid";
import { href, redirect } from "react-router";
import { getValidatedFormData } from "remix-hook-form";
import type { Route as AdminRoute } from "../../admin/forms/+types";
import type { Route as UserRoute } from "../../user-dashboard/forms/+types";
import { type FV, schema } from "./schema";
import { cognito, to_auth } from ".server/auth";
import { formsdb, npodb } from ".server/aws/db";
import { env } from ".server/env";
import { get_npos } from ".server/npos";

export interface INpoOpt {
  id: number;
  name: string;
}

export interface ILoaderData {
  creator: "user" | "admin";
  programs: IProgramDb[];
  /** for user creator */
  npos?: {
    opts: INpoOpt[];
    value: INpoOpt | undefined;
  };
}

interface IActors {
  creator: string;
  recipient: string;
}

export const loader = async ({
  request,
  params,
}: UserRoute.LoaderArgs | AdminRoute.LoaderArgs) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);

  //creating inside admin, form is attributed to :id
  if ("id" in params) {
    const npo_id = +params.id;
    if (!user.endowments.includes(npo_id)) {
      return resp.status(403);
    }
    //load program options
    const progs = await npodb.npo_programs(npo_id);
    return {
      creator: "admin",
      programs: progs,
    } satisfies ILoaderData;
  }

  const { npo_id, q } = search(request);
  const npos = await get_npos({
    claimed: [true],
    published: [true],
    query: q,
  }).then((x) => x.items.map((n) => ({ id: n.id, name: n.name })));

  if (!npo_id) {
    return {
      creator: "user",
      programs: [],
      npos: { opts: npos, value: undefined },
    } satisfies ILoaderData;
  }

  const npo = await npodb.npo(+npo_id, ["name"]);
  if (!npo) return resp.status(404, "npo not found");

  const progs = await npodb.npo_programs(+npo_id);

  return {
    creator: "user",
    programs: progs,
    npos: {
      opts: npos,
      value: { id: +npo_id, name: npo.name },
    },
  } satisfies ILoaderData;
};

export const action = async ({
  request,
  params,
}: UserRoute.ActionArgs | AdminRoute.ActionArgs) => {
  const fvraw = await getValidatedFormData<FV>(
    request,
    valibotResolver(schema)
  );
  if (fvraw.errors) return fvraw;
  const { data: fv } = fvraw;

  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);

  let actors: IActors | undefined;
  const { npo_id: y } = search(request);
  if ("id" in params) {
    const x = params.id;

    if (!user.endowments.includes(+x)) {
      return resp.status(403, "not authorized to create form for this npo");
    }
    actors = { creator: x, recipient: x };
  } else if (y) {
    actors = { creator: y, recipient: y };
  }
  if (!actors) {
    return resp.status(400, "creator and recipient cannot be determined");
  }

  const npo = await npodb.npo(+actors.recipient, ["name"]);
  if (!npo) return resp.status(404, "npo not found");

  const form: IForm = {
    id: nanoid(),
    env: env,
    date_created: new Date().toISOString(),
    tag: fv.tag,
    name: npo.name,
    target: "smart",
    owner: actors.creator,
    recipient: actors.recipient,
    recipient_type: "npo",
    ltd: 0,
    ltd_count: 0,
  };
  if (fv.program) {
    const prog = await npodb.npo_program(fv.program, +actors.recipient);
    if (prog) form.program = { id: prog.id, name: prog.title };
  }
  const res = await formsdb.form_put(form);

  return redirect(href("/forms/:id/edit", { id: res.id }));
};
