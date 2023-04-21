import { FV } from "../types";
import { Field } from "components/form";
import Form, { Desc, FormProps, Title } from "../../common/Form";
import NavButtons from "../../common/NavButtons";
import Beneficiaries from "./Beneficiaries";

export default function MaturityForm(props: FormProps) {
  return (
    <Form {...props}>
      <Title className="mb-2">Maturity</Title>
      <Desc className="mb-8">
        You can set the maturity date of your AST. Upon reaching maturity, all
        funds from both Liquid account and Locked account can be withdrawn by a
        list of addresses set in advance.
      </Desc>
      <Field<FV, "date">
        type="date"
        name="date"
        label="Maturity date"
        placeholder="DD/MM/YYYY"
        required
        classes={{ container: "mb-8", input: "date-input uppercase" }}
      />

      <Beneficiaries classes="mb-8" />
      <NavButtons curr={4} classes="mt-8" />
    </Form>
  );
}
