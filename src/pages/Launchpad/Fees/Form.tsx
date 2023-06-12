import { FV } from "./types";
import FeesTable from "components/ast/FeesTable/FeesTable";
import { Field } from "components/form";
import Form, { Desc, FormProps, Title } from "../common/Form";
import NavButtons from "../common/NavButtons";

export default function FeesForm(props: FormProps) {
  return (
    <Form {...props}>
      <Title className="mb-2">Fees</Title>
      <Desc className="mb-8">
        Fees of 2% on balances and 1.5% on withdrawals are automatically sent to
        the protocol's treasury. Here, you can set additional fees that will be
        distributed to the address of your choice
      </Desc>
      <FeesTable />
      <Field<FV>
        label="Provide the ID of an AST that you control if you are setting up ASTs for third parties and would like to benefit from our 20% revenue share program."
        name="referral_id"
        classes={{ container: "my-8" }}
      />
      <NavButtons curr={6} />
    </Form>
  );
}
