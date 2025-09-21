import { valibotResolver } from "@hookform/resolvers/valibot";
import { Field, Form } from "components/form";
import { useForm } from "react-hook-form";
import { type FV, fv } from "./types";

interface Props {
  classes?: string;
  on_submit: (fv: FV, shares: Record<string, number>) => void;
}

export function LogForm({ classes = "", on_submit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FV>({
    resolver: valibotResolver(fv),
    defaultValues: {},
  });

  const submit = async (x: FV) => {
    const res = await fetch("/api/npos/interest-log-simul", {
      method: "POST",
      body: JSON.stringify(x),
    });
    if (!res.ok) throw res;
    const shares = await res.json();
    on_submit(x, shares);
  };

  return (
    <Form
      disabled={isSubmitting}
      id="log-interest-form"
      onSubmit={handleSubmit(submit)}
      className={`${classes} grid p-4`}
    >
      <Field
        {...register("date_created")}
        label="Date"
        type="date"
        error={errors.date_start?.message}
      />
      <Field
        {...register("total")}
        label="Amount"
        error={errors.date_start?.message}
      />
      <div className="grid gap-x-[1.125rem] grid-cols-2 mt-4">
        <label className="col-span-full text-sm mb-2">Accrual period</label>
        <Field
          {...register("date_start")}
          label=""
          type="date"
          error={errors.date_start?.message}
        />
        <Field
          {...register("date_end")}
          label=""
          type="date"
          error={errors.date_end?.message}
        />
      </div>
      <button type="submit" className="btn btn-blue">
        Reviews
      </button>
    </Form>
  );
}
