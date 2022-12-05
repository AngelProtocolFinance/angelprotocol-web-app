import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Navigate, useLocation } from "react-router-dom";
import { FormValues } from "./types";
import { routes } from "../routes";
import Form from "./Form";
import { schema } from "./schema";

export default function Mailer({ classes = "" }) {
  const methods = useForm<FormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { recipient: { name: "", email: "" }, message: "" },
    resolver: yupResolver(schema),
  });

  // const { state } = useLocation();
  // let _state = state as { secret: string } | null;

  // if (!_state) {
  //   return <Navigate to={routes.index} />;
  // }

  return (
    <FormProvider {...methods}>
      <Form classes={classes} />
    </FormProvider>
  );
}
