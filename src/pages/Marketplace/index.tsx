import { useEndowmentsQuery } from "services/juno/account";

export default function Marketplace() {
  const { data } = useEndowmentsQuery({});
  return (
    <div className="grid content-start padded-container pb-16">marketplace</div>
  );
}
