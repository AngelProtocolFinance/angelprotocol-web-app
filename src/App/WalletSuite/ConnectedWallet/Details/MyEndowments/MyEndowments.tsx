import { PropsWithChildren } from "react";
import { useWalletProfileQuery } from "services/aws/aws";
import Logo from "../Logo";
import Links from "./Links";

export default function MyEndowments({ address }: { address: string }) {
  const { data, isError } = useWalletProfileQuery(address);

  if (isError) {
    return (
      <Container>
        <span className="text-sm text-red dark:text-red-l2">
          Failed to load endowments
        </span>
      </Container>
    );
  }

  if (!data?.admin?.length) return null;

  return (
    <Container>
      {data.admin.map(({ id, logo, name }) => (
        <div key={`my-endow-${id}`} className="grid grid-cols-[auto_1fr] gap-3">
          <Logo src={logo} className="w-10 h-10" />

          <div className="grid items-center">
            <Name value={name} />
            <Links endowmentId={id} />
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
  return (
    <div className="grid p-4 gap-3 border-b border-gray-l2 dark:border-bluegray">
      <h3 className="font-heading font-bold text-sm text-gray-d1 dark:text-gray">
        My Endowments
      </h3>
      {children}
    </div>
  );
}
