import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  memberUpdatorSchema,
  MemberUpdatorValues,
} from "./memberUpdatorSchema";
import MemberUpdateForm from "./MemberUpdaterForm";
import { CWContracts } from "contracts/Admin";

export default function MemberUpdator() {
  const methods = useForm<MemberUpdatorValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      addr: "",
      weight: "1",
    },
    resolver: yupResolver(memberUpdatorSchema),
  });

  return (
    <FormProvider {...methods}>
      <MemberUpdateForm />
    </FormProvider>
  );
}
