import { PropsWithChildren } from "react";
import { useWalletProfileQuery } from "services/aws/aws";
import { useConnectedWallet } from "contexts/WalletGuard";
import Logo from "../Logo";
import Links from "./Links";

export default function MyEndowments() {
  const wallet = useConnectedWallet();
  const { data, isError } = useWalletProfileQuery(wallet.address);

  if (isError) {
    return (
      <Container>
        <Heading />
        <span className="text-sm text-red dark:text-red-l2">
          Failed to load endowments
        </span>
      </Container>
    );
  }

  if (!data?.admin?.length) return null;

  return (
    <Container>
      <Heading />
      {data.admin.map((endowment) => (
        <div
          key={endowment.endowId}
          className="grid grid-cols-[auto_1fr] gap-3"
        >
          <Logo src={endowment.logo} className="w-10 h-10" />

          <div className="grid items-center">
            <Name value={endowment.name} />
            <Links endowmentId={endowment.endowId} />
          </div>
        </div>
      ))}
    </Container>
  );
}

const Name = ({ value }: { value: string }) => (
  <span className="font-heading font-semibold text-sm">{value}</span>
);

function Container({ children }: PropsWithChildren) {
  return <div className="grid p-4 gap-3 border-b border-prim">{children}</div>;
}

function Heading() {
  return (
    <h3 className="font-heading font-bold text-sm text-gray-d1 dark:text-gray">
      My Endowments
    </h3>
  );
}
