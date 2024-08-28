import { ErrorMessage } from "@hookform/error-message";
import Icon from "components/Icon";
import { Info } from "components/Status";
import { Field } from "components/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { FormValues as FV } from "./types";

export default function Increments({ classes = "" }) {
  const {
    formState: { errors },
  } = useFormContext();
  const { fields, remove, append } = useFieldArray<FV, "increments">({
    name: "increments",
  });

  return (
    <div className={`${classes} grid`}>
      <div className="flex items-center gap-2">
        <p className="font-bold text-base">Donation increments</p>
        <button type="button" className="text-base font-bold text-green">
          <Icon
            type="Plus"
            size={17}
            strokeWidth={3}
            onClick={() => append({ value: "0" })}
          />
        </button>
      </div>
      <ErrorMessage
        as="p"
        errors={errors}
        name="increments"
        className="text-xs text-red"
      />
      <div className="mt-4 grid gap-y-6">
        {fields.length === 0 ? (
          <Info>Default preset $40, $100, $200 are used </Info>
        ) : (
          fields.map((f, idx) => {
            return (
              <div key={f.id} className="flex items-center gap-2">
                <Field<FV>
                  placeholder="$"
                  label=""
                  name={`increments.${idx}.value`}
                  classes={{ label: "hidden" }}
                />
                <button
                  tabIndex={-1}
                  className="text-red"
                  type="button"
                  onClick={() => remove(idx)}
                >
                  <Icon strokeWidth={3} type="Dash" size={18} />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
