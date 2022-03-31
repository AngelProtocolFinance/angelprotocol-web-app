import Index from "./Index";
import Loader from "components/Loader/Loader";
import { useCategorizedProfiles } from "services/aws/endowments/queriers";
import Banner from "./Banner";

export default function Market() {
  const { categorizedProfiles, isProfilesLoading } = useCategorizedProfiles();

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
