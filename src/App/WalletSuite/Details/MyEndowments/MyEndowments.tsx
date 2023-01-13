import { PropsWithChildren } from "react";
import { useProfileQuery, useWalletProfileQuery } from "services/aws/aws";
import { useConnectedWallet } from "contexts/WalletGuard";
import Logo from "../Logo";
import Links from "./Links";

export default function MyEndowments() {
  const wallet = useConnectedWallet();
  const { data, isLoading, isFetching, isError } = useWalletProfileQuery(
    wallet.address
  );

  if (isLoading || isFetching) {
    return (
      <Container>
        <Heading />
        <span>....</span>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <Heading />
        <span>Failed to load endowments</span>
      </Container>
    );
  }

  if (!data?.admin?.length) return null;

  return (
    <Container>
      <Heading />
      {data?.admin?.map((id) => (
        <Portal key={id} id={id} />
      ))}
    </Container>
  );
}

const Name = ({ value }: { value: string }) => (
  <span className="font-heading font-semibold text-sm">{value}</span>
);

function Portal({ id }: { id: number }) {
  const { data: profile } = useProfileQuery(id);
  return (
    <div className="grid grid-cols-[auto_1fr] gap-3">
      <Logo src={profile?.logo || ""} className="w-10 h-10" />
      <div className="grid items-center">
        <Name value={profile?.name ?? "Endowment"} />
        <Links endowmentId={id} />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <h3 className="font-heading font-bold text-sm text-gray-d1 dark:text-gray">
      My Endowments
    </h3>
  );
}
function Container({ children }: PropsWithChildren) {
  return (
    <div className="grid p-4 gap-3 border-b border-gray-l2 dark:border-bluegray">
      {children}
    </div>
  );
}
