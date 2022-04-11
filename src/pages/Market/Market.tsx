import Index from "./Index";
import Loader from "components/Loader/Loader";
import { useCategorizedProfiles } from "services/aws/endowments/queriers";
import Banner from "./Banner";
import { useEndowmentLists } from "services/terra/registrar/queriers";

export default function Market() {
  const { categorizedProfiles, isProfilesLoading } = useCategorizedProfiles();
  const { endowments } = useEndowmentLists(); // (doesn't return un_sdg number for categorization)

  return (
    <div className="grid content-start padded-container pb-16">
      <Banner />
      {(isProfilesLoading && (
        <Loader
          bgColorClass="bg-white-grey/80"
          gapClass="gap-2"
          widthClass="w-4"
        />
      )) || (
        <>
          {Object.entries(categorizedProfiles).map(([sdg_number, profiles]) => (
            <Index key={sdg_number} id={+sdg_number} profiles={profiles} />
          ))}
        </>
      )}
    </div>
  );
}
