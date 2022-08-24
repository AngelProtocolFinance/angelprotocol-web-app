import { useCategorizedEndowmentsQuery } from "services/juno/registrar";
import Loader from "components/Loader";
import useDonater from "components/Transactors/Donater/useDonater";
import Banner from "./Banner";
import Index from "./Index";

export default function Market() {
  const { data: endowments = {}, isLoading } = useCategorizedEndowmentsQuery({
    endow_type: "charity",
    status: "1",
  });

  const showDonater = useDonater({ to: "charity", receiver: 1 });

  return (
    <div className="grid content-start padded-container pb-16">
      <button onClick={showDonater}>donate</button>
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
