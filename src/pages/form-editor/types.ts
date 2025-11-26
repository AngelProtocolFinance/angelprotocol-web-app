import { $, increment } from "@better-giving/schemas";
import { target } from "components/goal-selector";
import { donate_method } from "types/components";
import * as v from "valibot";

export const schema = v.object({
  methods: v.pipe(
    v.array(donate_method),
    v.filterItems((m) => !m.disabled),
    v.minLength(1, "at least one payment option should be active")
  ),
  accent_primary: v.optional($),
  accent_secondary: v.optional($),
  increments: v.array(increment),
  target,
  tag: $,
});

export interface FV extends v.InferOutput<typeof schema> {}
