import { FV } from "./types";
import Addresses from "components/Addresses";
import Form, { Desc, FormProps, Title } from "../common/Form";
import NavButtons from "../common/NavButtons";

export default function WhitelistsForm(props: FormProps) {
  return (
    <Form {...props}>
      <Title className="mb-2">Whitelists</Title>
      <Desc className="mb-8">
        Here you can set who is able to deposit (contributors) or withdraw
        (beneficiaries) from your AST. You will be able to make changes to those
        lists in the future.
      </Desc>
      <div className="mb-8 p-4 md:p-8 border border-prim rounded">
        <h4 className="text-xl font-bold mb-8">Contributors</h4>
        <Addresses<FV, "contributors">
          memberName="contributor"
          name="contributors"
          title="Contributors"
          emptyMsg="Anyone can contribute to your AST."
        />
      </div>
      <div className="mb-8 p-4 md:p-8 border border-prim rounded">
        <h4 className="text-xl font-bold mb-8">Beneficiaries</h4>
        <Addresses<FV, "beneficiaries">
          memberName="beneficiary"
          name="beneficiaries"
          title="Beneficiaries"
          emptyMsg="Only the multisig wallet is allowed to withdraw funds"
        />
      </div>

      <NavButtons classes="mt-8" curr={3} />
    </Form>
  );
}
