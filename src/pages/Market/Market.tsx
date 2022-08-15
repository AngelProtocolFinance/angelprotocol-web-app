import { useCategorizedEndowmentsQuery } from "services/juno/registrar";
import Loader from "components/Loader";
import Banner from "./Banner";
import Index from "./Index";

export default function Market() {
  const { data: endowments = {}, isLoading } = useCategorizedEndowmentsQuery({
    endow_type: "charity",
    status: "1",
  });

  return (
    <div className="grid content-start padded-container pb-16">
      <Banner />
      {(isLoading && (
        <Loader
          bgColorClass="bg-white-grey/80"
          gapClass="gap-2"
          widthClass="w-4"
        />
      )) || (
        <>
          {Object.entries(endowments).map(([sdg_number, profiles]) => (
            <Index key={sdg_number} id={+sdg_number} profiles={profiles} />
          ))}
        </>
      )}
    </div>
  );
}
