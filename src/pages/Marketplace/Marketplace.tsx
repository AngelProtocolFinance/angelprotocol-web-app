import AppHead from "components/Headers/AppHead";
import CharityCard from "./CharityCard";
import useMarketPlace from "./useMarketplace";

export default function Marketplace() {
  const { endowments } = useMarketPlace();
  return (
    <section className="pb-16 grid grid-rows-a1">
      <AppHead />
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 content-start gap-8 padded-container my-8">
        {endowments
          .filter((endowment) => endowment.status === "Approved")
          .map((endowment) => (
            <CharityCard key={endowment.address} address={endowment.address} />
          ))}
      </ul>
    </section>
  );
}
