import { yupResolver } from "@hookform/resolvers/yup";
import {
  NativeCheckField as CheckField,
  NativeField as Field,
  Form,
} from "components/form";
import { useController, useForm } from "react-hook-form";
import { schema as schemaFn, stringNumber } from "schemas/shape";
import type { Fund } from "types/aws";
import { string } from "yup";
import { GoalSelector, type TargetType } from "../common";

export interface FV extends Pick<Fund, "name" | "description" | "featured"> {
  targetType: TargetType;
  fixedTarget: string;
}

interface Props {
  init: Fund;
  onSubmit: (fv: FV) => void;
}

const targetTypeKey: keyof FV = "targetType";
const schema = schemaFn<FV>({
  name: string().required("required"),
  description: string().required("required"),
  fixedTarget: stringNumber(
    (str) => {
      return str.when(targetTypeKey, (values, schema) => {
        const [type] = values as [TargetType];
        return type === "fixed" ? schema.required("required") : schema;
      });
    },
    (n) => {
      return n.when(targetTypeKey, (values, schema) => {
        const [type] = values as [TargetType];
        return type === "fixed"
          ? schema.positive("must be greater than 0")
          : schema;
      });
    }
  ),
});

export default function ContentForm({ init, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<FV>({
    resolver: yupResolver(schema),
    values: {
      name: init.name,
      description: init.description,
      featured: init.featured,
      targetType: !init.target
        ? "none"
        : init.target === "smart"
          ? "smart"
          : "fixed",
      fixedTarget: init.target === "smart" ? "" : init.target ?? "",
    },
  });

  const { field: targetType } = useController({
    control,
    name: "targetType",
  });

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      disabled={isSubmitting}
      className="grid my-4 w-full"
    >
      <Field
        {...register("name")}
        label="Name"
        required
        error={errors.name?.message}
        classes={{ label: "font-medium text-base" }}
      />
      <Field
        type="textarea"
        {...register("description")}
        label="Description"
        required
        classes={{
          container: "mt-4",
          label: "font-medium text-base",
          input:
            "whitespace-pre-wrap supports-[field-sizing]:[field-sizing:content]",
        }}
        error={errors.description?.message}
      />

      <label className="block mt-4 font-medium">
        Fundraiser goal <span className="text-red">*</span>
      </label>
      <GoalSelector
        classes="mt-2 mb-2"
        value={targetType.value}
        onChange={targetType.onChange}
      />
      {targetType.value === "fixed" && (
        <Field
          {...register("fixedTarget")}
          label="How much money do you want to raise?"
          classes="mt-2"
          placeholder="$"
          error={errors.fixedTarget?.message}
        />
      )}

      <CheckField
        {...register("featured")}
        classes="col-span-full mt-8 font-medium"
      >
        Featured in funds page
      </CheckField>

      <button
        disabled={!isDirty}
        type="submit"
        className="btn-blue text-sm font-medium px-4 py-2 justify-self-end"
      >
        Update fund
      </button>
    </Form>
  );
}
