import { OptionType, RichTextContent } from "types/components";
import type { TokenWithAmount as TWA } from "types/tx";
import { lazy, mixed, object, string } from "yup";
import { tokenConstraint } from "./number";
import { requiredString } from "./string";
import { SchemaShape } from "./types";

type Key = keyof TWA;
type Min = TWA["min_donation_amnt"];
const minKey: Key = "min_donation_amnt";

export const tokenShape = (withMin = true): SchemaShape<TWA> => ({
	token_id: string().required("select token"),
	amount: lazy((amount: string) =>
		amount === ""
			? requiredString
			: tokenConstraint.when([minKey], (values, schema) => {
					const [minAmount] = values as [Min];
					return withMin && !!minAmount
						? schema.min(minAmount || 0, `amount must be at least ${minAmount}`)
						: schema;
			  }),
	),
});

export const optionType = ({ required } = { required: false }) =>
	object<any, SchemaShape<OptionType<string>>>({
		label: required ? requiredString : string(),
		value: required ? requiredString : string(),
	});

export function richTextContent(
	options: {
		maxChars?: number;
		required?: boolean;
	} = {},
) {
	const { maxChars, required = false } = options;

	let schema = mixed<RichTextContent>();

	if (maxChars != null) {
		schema = schema.test({
			name: "must be below character limit",
			message: `max length is ${maxChars} chars`,
			test: (descr) => (descr?.length || 0) <= maxChars,
		});
	}
	if (required) {
		schema = schema.test({
			name: "required",
			message: "required",
			test: (descr) => !!descr?.value,
		});
	}

	return schema;
}
