import { useCategorizedEndowments } from "services/terra/registrar/queriers";
import Loader from "components/Loader";
import Banner from "./Banner";
import Index from "./Index";

export default function Market() {
  const { endowments, isEndowmentsLoading } = useCategorizedEndowments();

  return (
    <div className="grid content-start padded-container pb-16">
      <Banner />
      {(isEndowmentsLoading && (
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
