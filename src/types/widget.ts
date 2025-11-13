import { donate_method_id } from "@better-giving/endowment/schema";
import {
  increment,
  increment_label,
  increment_val,
} from "@better-giving/schemas";
import * as v from "valibot";
import { donate_method } from "./components";

const str = v.pipe(v.string(), v.trim());

const increments = v.array(increment);

const title = v.pipe(str, v.maxLength(100, "cannot exceed 100 characters"));
const description = v.pipe(
  str,
  v.maxLength(300, "cannot exceed 300 characters")
);

export const widget_fv = v.object({
  title: v.optional(title),
  is_title_shown: v.boolean(),
  description: v.optional(description),
  //from dropdown
  program: v.object({
    label: str,
    value: str,
  }),
  is_description_text_shown: v.boolean(),
  methods: v.pipe(
    v.array(donate_method),
    v.filterItems((m) => !m.disabled),
    v.minLength(1, "at least one payment option should be active")
  ),
  accent_primary: v.optional(str),
  accent_secondary: v.optional(str),
  increments,
});

export interface IWidgetFv extends v.InferInput<typeof widget_fv> {}

const bool_str = v.pipe(
  v.picklist(["true", "false"] as const),
  v.transform((x) => x === "true")
);

export const widget_search = v.object({
  isDescriptionTextShown: v.optional(bool_str),

  // v2.3 params //
  methods: v.optional(
    v.pipe(
      str, //csv of method ids
      v.transform((x) => x.split(",")),
      v.everyItem((x) => v.safeParse(donate_method_id, x).success)
    )
  ),
  title: v.optional(title),
  description: v.optional(description),
  isTitleShown: v.optional(bool_str),
  accentPrimary: v.optional(v.pipe(str, v.hexColor())),
  accentSecondary: v.optional(v.pipe(str, v.hexColor())),
  programId: v.optional(v.pipe(str, v.uuid())),
  increments: v.optional(
    v.pipe(
      str, //csv of increments e.g. 40, 100, 500
      v.transform((x) => x.split(",")),
      v.everyItem((x) => v.safeParse(increment_val, x).success)
    )
  ),
  descriptions: v.optional(
    v.pipe(
      str,
      //csv of descriptions,
      v.transform((x) => x.split(",")),
      // bring back commas replaced in snippet generation
      v.mapItems((x) => x.replace(/_/g, ",")),
      v.everyItem((x) => v.safeParse(increment_label, x).success)
    )
  ),
});

export interface IWidgetSearch extends v.InferInput<typeof widget_search> {}
export interface IWidgetSearchObj extends v.InferOutput<typeof widget_search> {}
