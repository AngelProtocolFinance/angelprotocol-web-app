import { useUseCategorizedProfilesQuery } from "services/aws/endowments";
import Loader from "components/Loader";
import Banner from "./Banner";
import Index from "./Index";

export default function Market() {
  const is_test = false;
  const { data = {}, isLoading } = useUseCategorizedProfilesQuery(is_test);

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
          {Object.entries(data).map(([sdg_number, profiles]) => (
            <Index key={sdg_number} id={+sdg_number} profiles={profiles} />
          ))}
        </>
      )}
    </div>
  );
}
