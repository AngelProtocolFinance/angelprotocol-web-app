import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { date, object } from "yup";
import { FV } from "./types";
import { SchemaShape } from "schemas/types";
import { dateToFormFormat } from "components/form";
import { useLaunchpad } from "slices/launchpad";
import { withStepGuard } from "../withStepGuard";
import Form from "./Form";

export default withStepGuard<4>(function Maturity({ data }) {
  const { update } = useLaunchpad(4);
  const methods = useForm<FV>({
    resolver: yupResolver(
      object().shape<SchemaShape<FV>>({
        date: date()
          .typeError("invalid date")
          .min(new Date(), "must be in the future"),
      })
    ),
    defaultValues: data
      ? { ...data, date: dateToFormFormat(new Date(data.date)) }
      : {
          date: "",
          beneficiaries: [],
        },
  });

  const { handleSubmit } = methods;
  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={handleSubmit(({ date, ...data }) =>
          update({ ...data, date: new Date(date).toISOString() })
        )}
      />
    </FormProvider>
  );
});
