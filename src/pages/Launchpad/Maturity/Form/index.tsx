import { useFormContext } from "react-hook-form";
import { FV } from "../types";
import Toggle from "components/Toggle";
import { Field } from "components/form";
import Form, { Desc, FormProps, Title } from "../../common/Form";
import NavButtons from "../../common/NavButtons";
import Beneficiaries from "./Beneficiaries";

export default function MaturityForm(props: FormProps) {
  const { watch } = useFormContext<FV>();
  const willMature = watch("willMature");
  return (
    <Form {...props} className="grid content-start">
      <Title className="mb-2">Maturity</Title>
      <Desc className="mb-8">
        You can set the maturity date of your AST. Upon reaching maturity, all
        funds from both Liquid account and Locked account can be withdrawn by a
        list of addresses set in advance.
      </Desc>
      <Toggle<FV>
        name="willMature"
        classes={{ label: "text-sm", container: "mb-6" }}
      >
        Set maturity
      </Toggle>
      {willMature ? (
        <>
          <Field<FV, "date">
            type="date"
            name="date"
            label="Maturity date"
            placeholder="DD/MM/YYYY"
            required
            classes={{ container: "mb-8", input: "date-input uppercase" }}
          />

          <Beneficiaries classes="mb-8" />
        </>
      ) : null}
      <NavButtons curr={4} classes="self-end" />
    </Form>
  );
}
