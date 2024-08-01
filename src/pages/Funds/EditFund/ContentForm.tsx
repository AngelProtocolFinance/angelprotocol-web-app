import {
  NativeCheckField as CheckField,
  NativeField as Field,
  Form,
} from "components/form";
import { useController, useForm } from "react-hook-form";
import type { Fund } from "types/aws";
import { GoalSelector, type TargetType } from "../common";

interface FV extends Pick<Fund, "name" | "description" | "featured"> {
  targetType: TargetType;
  fixedTarget: string;
}

interface Props {
  onSubmit: (fv: FV) => void;
}
export default function ContentForm(props: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<FV>();

  const { field: targetType } = useController({
    control,
    name: "targetType",
  });

  return (
    <Form
      onSubmit={handleSubmit(props.onSubmit)}
      disabled={isSubmitting}
      className="grid border border-gray-l4 rounded-lg p-6 my-4 w-full"
    >
      <h4 className="font-bold text-xl mb-4">Fund information</h4>
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
        classes={{ container: "mt-4", label: "font-medium text-base" }}
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
        type="submit"
        className="btn-blue text-sm font-medium px-4 py-2 justify-self-end"
      >
        Save
      </button>
    </Form>
  );
}
