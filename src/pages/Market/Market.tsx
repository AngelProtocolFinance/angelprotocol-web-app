import { useCategorizedEndowments } from "services/terra/registrar/queriers";
import Loader from "components/Loader";
import useDonater from "components/Transactors/Donater/useDonater";
import Banner from "./Banner";
import Index from "./Index";

export default function Market() {
  const { endowments, isEndowmentsLoading } = useCategorizedEndowments();

  const showDonater = useDonater({
    to: "charity",
    receiver: "123",
    isKycDonorOnly: true, //TODO: get from useProfileState
  });
  return (
    <div className="grid content-start padded-container pb-16">
      <Banner />
      <button onClick={showDonater}>donate</button>
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
