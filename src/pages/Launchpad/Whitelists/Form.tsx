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
      <Addresses<FV, "contributors">
        memberName="contributor"
        name="contributors"
        title="Contributors"
        emptyMsg="Anyone can contribute to your AST."
        classes="mb-8 p-4 md:p-8"
      />
      <Addresses<FV, "beneficiaries">
        memberName="beneficiary"
        name="beneficiaries"
        title="Beneficiaries"
        emptyMsg="Only the multisig wallet is allowed to withdraw funds"
        classes="mb-8 p-4 md:p-8"
      />

      <NavButtons classes="mt-8" curr={3} />
    </Form>
  );
}
