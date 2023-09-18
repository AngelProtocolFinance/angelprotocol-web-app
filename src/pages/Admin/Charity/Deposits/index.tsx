import { adminRoutes } from "constants/routes";
import Content from "../../../Donate/Content";
import { useAdminContext } from "../../Context";
import Seo from "../Seo";

export default function Deposits() {
  const { id } = useAdminContext<"charity">();
  const container = "dark:bg-blue-d6 border border-prim rounded max-w-lg  p-8";

  return (
    <div className="grid gap-8 justify-items-center">
      <Seo title="Deposit to your AST" url={adminRoutes.deposits} />
      <h2 className="text-center font-bold text-3xl -mb-2">Deposit</h2>
      <div className={container}>
        <Content
          name={"your AST"}
          id={id}
          isKYCRequired={false}
          endowType={"ast"}
          isFiscalSponsored={false}
        />
      </div>
    </div>
  );
}
