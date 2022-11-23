import { CategorizedEndowments } from "types/contracts";
import { UNSDG_NUMS } from "types/lists";
import { useCategorizedEndowmentsQuery } from "services/juno/account";
import Head from "components/Head";
import Loader from "components/Loader";
import Banner from "./Banner";
import Index from "./Index";

export default function Market() {
  const { data: endowments = {} as CategorizedEndowments, isLoading } =
    useCategorizedEndowmentsQuery({});

  return (
    <div className="grid content-start padded-container pb-16">
      <Head
        title="Support an impact organization - Angel Protocol"
        description="Angel Protocol provides impact stakeholders with the tools to fundraise, coordinate, and invest capital."
        image="https://charity-profile-images.s3.amazonaws.com/logo/angelprotocol-wings-bl.png"
        website="https://app.angelprotocol.io"
      />
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
