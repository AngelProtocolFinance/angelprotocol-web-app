import * as v from "valibot";
import { donateMethod } from "./components";
import { donateMethodId } from "./lists";

const str = v.pipe(v.string(), v.trim());

const incrementVal = v.pipe(
  str,
  v.nonEmpty("required"),
  v.transform((x) => +x),
  v.number("must be a number"),
  v.minValue(0, "must be greater than 0"),
  //parsed output
  v.transform((x) => x.toString())
);

export const incrementLabelMaxChars = 30;
const incrementLabel = v.pipe(
  str,
  v.maxLength(incrementLabelMaxChars, "cannot exceed 30 characters")
);

const increment = v.object({
  value: incrementVal,
  label: incrementLabel,
});

export type Increment = { value: number; label: string };

const increments = v.array(increment);

const title = v.pipe(str, v.maxLength(100, "cannot exceed 100 characters"));
const description = v.pipe(
  str,
  v.maxLength(300, "cannot exceed 300 characters")
);

export const widgetConfig = v.object({
  title: v.optional(title),
  isTitleShown: v.boolean(),
  description: v.optional(description),
  //from dropdown
  endowment: v.object({
    id: v.number(),
    name: str,
  }),
  //from dropdown
  program: v.object({
    label: str,
    value: str,
  }),
  isDescriptionTextShown: v.boolean(),
  methods: v.pipe(
    v.array(donateMethod),
    v.filterItems((m) => !m.disabled),
    v.minLength(1, "at least one payment option should be active")
  ),
  accentPrimary: v.optional(str),
  accentSecondary: v.optional(str),
  increments,
});

export type WidgetConfig = v.InferInput<typeof widgetConfig>;

const toBool = v.pipe(
  v.picklist(["true", "false"] as const),
  v.transform((x) => x === "true")
);

export const widgetUrlSearchParams = v.object({
  isDescriptionTextShown: toBool,

  // v2.3 params //
  methods: v.optional(
    v.pipe(
      str, //csv of method ids
      v.transform((x) => x.split(",")),
      v.everyItem((x) => v.safeParse(donateMethodId, x).success)
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
      v.everyItem((x) => v.safeParse(incrementVal, x).success)
    )
  ),
  descriptions: v.optional(
    v.pipe(
      str,
      //csv of descriptions,
      v.transform((x) => x.split(",")),
      // bring back commas replaced in snippet generation
      v.mapItems((x) => x.replace(/_/g, ",")),
      v.everyItem((x) => v.safeParse(incrementLabel, x).success)
    )
  ),
});

export type WidgetURLSearchParams = v.InferInput<typeof widgetUrlSearchParams>;
export type ParsedWidgetURLSearchParams = v.InferOutput<
  typeof widgetUrlSearchParams
>;
