import { useState } from "react";
import AppHead from "components/Headers/AppHead";
import CharityInfoNav from "./CharityInfoNav";
import CharityInfoTab from "./CharityInfoTab";
import { DonationInfo } from "./DonationInfo";
import { useGetCharityDataQuery } from "services/aws/charity";
import Loader from "components/Loader/Loader";
import Donater from "components/Donater/Donater";
import DonateSuite from "components/DonateSuite/DonateSuite";
import { useSetModal } from "components/Nodal/Nodal";

const Charity = () => {
  const [activeTab, setActiveTab] = useState("endowment");

  const { error, isLoading } = useGetCharityDataQuery(
    "a98bd3e3-836d-492c-8817-6a3a7f9ad52d"
  ); // hardcoded uuid to return data from api.
  const { showModal } = useSetModal();

  const showDonationForm = () => {
    showModal(CharityForm, {
      charity_addr: "terra129381",
    });
  };

  const loaded = !isLoading && !error;
  return (
    <section className="container mx-auto grid pb-16 content-start gap-0">
      <AppHead />
      {isLoading && (
        <Loader
          gapClass="gap-4"
          widthClass="w-4"
          bgColorClass="bg-angel-grey"
        />
      )}
      {error && <div>An error occurred, refresh your page to try again!!!</div>}
      {loaded && (
        <div className="flex flex-col-reverse 2xl:flex-row items-start w-full md:mx-auto md:container min-h-r15 gap-2 lg:mt-3 p-5">
          <DonationInfo openModal={showDonationForm} />
          <div className="flex-grow w-full items-center text-center bg-indigo 2xl:mb-0">
            <img
              className="rounded-2xl 2xl:-mt-6 shadow-md mb-1"
              style={{ width: "100%", maxHeight: "350px" }}
              src="/static/media/home-banner.73980c69.jpg"
              alt=""
            />
            {/* charity info */}
            <CharityInfoNav
              activeTab={activeTab}
              onTabChange={(tab: string) => setActiveTab(tab)}
            ></CharityInfoNav>
            {/* charity info */}
            {/* Information tabs  */}
            <CharityInfoTab activeTab={activeTab}></CharityInfoTab>
            {/* Information tabs  */}
          </div>
        </div>
      )}
    </section>
  );
};

type CharityProps = { charity_addr: string };
function CharityForm(props: CharityProps) {
  return (
    <Donater to="charity" receiver={props.charity_addr}>
      <DonateSuite inModal />
    </Donater>
  );
}

export default Charity;
