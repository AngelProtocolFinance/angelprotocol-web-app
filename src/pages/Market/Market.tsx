import { CategorizedEndowments } from "types/contracts";
import { UNSDG_NUMS } from "types/lists";
import { useCategorizedEndowmentsQuery } from "services/juno/account";
import Loader from "components/Loader";
import Index from "./Index";

export default function Market() {
  const { data: endowments = {} as CategorizedEndowments, isLoading } =
    useCategorizedEndowmentsQuery({});

  return (
    <div className="grid content-start padded-container pb-16 mt-4">
      {(isLoading && (
        <Loader bgColorClass="bg-white/80" gapClass="gap-2" widthClass="w-4" />
      )) || (
        <>
          {Object.entries(endowments).map(([sdg_number, profiles]) => (
            <Index
              key={sdg_number}
              id={+sdg_number as UNSDG_NUMS}
              profiles={profiles}
            />
          ))}
        </>
      )}
    </div>
  );
}
