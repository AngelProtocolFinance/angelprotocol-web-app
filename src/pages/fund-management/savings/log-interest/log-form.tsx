import { valibotResolver } from "@hookform/resolvers/valibot";
import { Field, Form, toYYYMMDD } from "components/form";
import { useForm } from "react-hook-form";
import { type FV, fv } from "./types";

interface Props {
  classes?: string;
  init?: FV;
  on_submit: (fv: FV, shares: Record<string, number>) => void;
}

export function LogForm({ classes = "", on_submit, init }: Props) {
  const now = new Date();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FV>({
    resolver: valibotResolver(fv),
    defaultValues: {
      date_created: init?.date_created
        ? toYYYMMDD(new Date(init.date_created))
        : toYYYMMDD(now),
      date_start: init?.date_start ? toYYYMMDD(new Date(init.date_start)) : "",
      date_end: init?.date_end
        ? toYYYMMDD(new Date(init.date_end))
        : toYYYMMDD(now),
      total: init?.total || "",
    },
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
        error={errors.date_created?.message}
        classes={{ container: "mb-4", label: " font-medium" }}
      />
      <Field
        {...register("total")}
        label="Amount ($)"
        placeholder="e.g. 100"
        error={errors.total?.message}
        classes={{ container: "mb-4", label: " font-medium" }}
      />
      <div className="grid gap-x-[1.125rem] grid-cols-2">
        <label className="col-span-full text-sm  font-medium">
          Accrual period
        </label>
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
    </Form>
  );
}
