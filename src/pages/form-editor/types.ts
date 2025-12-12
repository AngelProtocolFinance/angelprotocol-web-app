import { $, $req, https_url, increment } from "@better-giving/schemas";
import { target } from "components/goal-selector";
import { donate_method } from "types/components";
import * as v from "valibot";

export const schema_basic = v.object({
  type: v.literal("basic"),
  methods: v.pipe(
    v.array(donate_method),
    v.filterItems((m) => !m.disabled),
    v.minLength(1, "at least one payment option should be active")
  ),
  accent_primary: v.optional($),
  accent_secondary: v.optional($),
  increments: v.array(increment),
  target,
  tag: $req,
});

export const schema_adv = v.object({
  type: v.literal("adv"),
  success_redirect: v.optional(https_url()),
});

export const schema = v.variant("type", [schema_basic, schema_adv]);

export interface FVBasic extends v.InferOutput<typeof schema_basic> {}
export interface FVAdv extends v.InferOutput<typeof schema_adv> {}
