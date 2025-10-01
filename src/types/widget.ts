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

export const widget_config = v.object({
  title: v.optional(title),
  isTitleShown: v.boolean(),
  description: v.optional(description),
  //from dropdown
  program: v.object({
    label: str,
    value: str,
  }),
  isDescriptionTextShown: v.boolean(),
  methods: v.pipe(
    v.array(donate_method),
    v.filterItems((m) => !m.disabled),
    v.minLength(1, "at least one payment option should be active")
  ),
  accentPrimary: v.optional(str),
  accentSecondary: v.optional(str),
  increments,
});

export interface WidgetConfig extends v.InferInput<typeof widget_config> {}

const toBool = v.pipe(
  v.picklist(["true", "false"] as const),
  v.transform((x) => x === "true")
);

export const widgetUrlSearchParams = v.object({
  isDescriptionTextShown: v.optional(toBool),

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
  isTitleShown: v.optional(toBool),
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

export type WidgetURLSearchParams = v.InferInput<typeof widgetUrlSearchParams>;
export type ParsedWidgetURLSearchParams = v.InferOutput<
  typeof widgetUrlSearchParams
>;
