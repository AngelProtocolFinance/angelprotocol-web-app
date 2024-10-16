import { yupResolver } from "@hookform/resolvers/yup";
import { DonateMethods } from "components/DonateMethods";
import { ProgramSelector } from "components/donation";
import {
  NativeCheckField as CheckField,
  NativeField as Field,
  Form,
} from "components/form";
import type { Dispatch, SetStateAction } from "react";
import {
  type SubmitHandler,
  useController,
  useFieldArray,
  useForm,
} from "react-hook-form";
import type { WidgetConfig } from "types/widget";
import { EndowmentSelector } from "./EndowmentSelector";
import Increments from "./Increments";
import { schema } from "./schema";
import type { FormValues } from "./types";

type Props = {
  classes?: string;
  config: WidgetConfig;
  setConfig: Dispatch<SetStateAction<WidgetConfig>>;
  programDonationAllowed?: boolean;
};

export default function Configurer({
  classes = "",
  config,
  setConfig,
  programDonationAllowed,
}: Props) {
  const {
    handleSubmit,
    reset: hookFormReset,
    formState: { isDirty, errors, isSubmitting },
    setValue,
    watch,
    register,
    control,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    //set new config as default, so user would need to make a change to be able to update again
    values: config,
  });

  const { field: donateMethods } = useController({
    control: control,
    name: "methods",
  });

  const { field: program } = useController({
    control: control,
    name: "program",
  });

  const increments = useFieldArray({
    control,
    name: "increments",
  });

  const { field: endowment } = useController({
    control: control,
    name: "endowment",
  });

  const isDescriptionTextShown = watch("isDescriptionTextShown");
  const isTitleShown = watch("isTitleShown");

  const submit: SubmitHandler<FormValues> = async (fv) => {
    setConfig(fv);
  };

  return (
    <Form
      disabled={isSubmitting}
      className={`${classes} @container/configurer`}
      onSubmit={handleSubmit(submit)}
      onReset={(e) => {
        e.preventDefault();
        hookFormReset();
      }}
    >
      <h2 className="text-lg @4xl/widget:text-2xl text-center @4xl/widget:text-left mb-3">
        Donation Form Builder
      </h2>

      <div className="grid content-start text-sm">
        <label className="mt-2 mb-2 font-medium text-base">
          Nonprofit name:
        </label>
        <EndowmentSelector
          onChange={endowment.onChange}
          value={endowment.value}
          error={errors.endowment?.id?.message}
        />

        {programDonationAllowed && (
          <ProgramSelector
            classes={{ container: "mt-6", label: "text-base font-medium" }}
            onChange={program.onChange}
            program={program.value}
            endowId={config.endowment.id}
          />
        )}

        <Field
          {...register("title")}
          type="textarea"
          label="Custom title"
          classes={{ container: "mt-8", label: "font-medium text-base" }}
          disabled={!isTitleShown}
          error={errors.title?.message}
        />

        <CheckField
          {...register("isTitleShown")}
          classes="mt-3"
          onChange={(checked) => !checked && setValue("title", "")}
        >
          Show title
        </CheckField>

        <Field
          {...register("description")}
          type="textarea"
          label="Custom description"
          classes={{ container: "mt-8", label: "font-medium text-base" }}
          disabled={!isDescriptionTextShown}
          error={errors.description?.message}
        />
        <CheckField
          {...register("isDescriptionTextShown")}
          classes="mt-4"
          onChange={(checked) => !checked && setValue("description", "")}
        >
          Show description
        </CheckField>

        <DonateMethods
          classes={{
            container: "mt-16",
            tooltip: "italic",
            label: "font-medium text-base",
          }}
          values={donateMethods.value}
          onChange={donateMethods.onChange}
          error={
            <p className="text-red text-sm mb-1 empty:hidden">
              {errors.methods?.message}
            </p>
          }
        />

        <h4 className="font-bold text-base mt-8">Style settings</h4>
        <div className="flex items-center gap-2 mt-3">
          <input
            id="__accent-prim"
            type="color"
            {...register("accentPrimary")}
          />
          <label htmlFor="__accent-prim"> Accent primary</label>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <input
            id="__accent-sec"
            type="color"
            {...register("accentSecondary")}
          />
          <label htmlFor="__accent-sec">Accent secondary</label>
        </div>

        <Increments
          classes="mt-8 mb-10"
          fields={increments.fields}
          onAdd={(val) => {
            if (increments.fields.length >= 4) {
              return alert("You can only have 4 increments");
            }
            increments.append({ value: val });
          }}
          onRemove={(idx) => increments.remove(idx)}
          countError={errors.increments?.root?.message}
          field={(idx) => (
            <Field
              {...register(`increments.${idx}.value`)}
              placeholder="$"
              label=""
              classes={{ label: "hidden" }}
              error={errors.increments?.[idx]?.value?.message}
            />
          )}
        />

        <div className="flex gap-3 w-full @max-xl/configurer:justify-center mt-8">
          <button
            disabled={!isDirty}
            type="reset"
            className="btn-outline-filled @max-sm/configurer:mx-auto w-40"
          >
            Reset Changes
          </button>
          <button
            disabled={!isDirty}
            type="submit"
            className="btn-blue @max-sm/configurer:mx-auto w-40"
          >
            {isSubmitting ? "Updating.." : "Update Form"}
          </button>
        </div>
      </div>
    </Form>
  );
}
