import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  memberUpdatorSchema,
  MemberUpdatorValues,
} from "./memberUpdatorSchema";
import MemberUpdateForm from "./MemberUpdaterForm";
import { CWContracts } from "contracts/Admin";

export default function MemberUpdator(props: { cwContracts: CWContracts }) {
  const methods = useForm<MemberUpdatorValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      addr: "",
      weight: "1",
      cws: props.cwContracts,
    },
    resolver: yupResolver(memberUpdatorSchema),
  });

  return (
    <FormProvider {...methods}>
      <MemberUpdateForm />
    </FormProvider>
  );
}
