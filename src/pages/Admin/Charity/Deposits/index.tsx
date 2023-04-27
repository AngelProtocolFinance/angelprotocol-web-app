import Content from "../../../Donate/Content";
import { useAdminResources } from "../../Guard";

export default function Deposits() {
  const { id } = useAdminResources<"charity">();
  const container = "dark:bg-blue-d6 border border-prim rounded max-w-lg  p-8";

  return (
    <div className="grid gap-8 justify-items-center">
      <h2 className="text-center font-bold text-3xl -mb-2">Deposit</h2>
      <div className={container}>
        <Content
          name={"your AST"}
          id={id}
          isKYCRequired={false}
          skipKycStep={false}
        />
      </div>
    </div>
  );
}
