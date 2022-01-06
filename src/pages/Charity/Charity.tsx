import { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import DappHead from "components/Headers/DappHead";
import CharityInfoNav from "./CharityInfoNav";
import CharityInfoTab from "./CharityInfoTab";
import { DonationInfo } from "./DonationInfo";
import Donater from "components/Donater/Donater";
import DonateSuite from "components/TransactionSuite/DonateSuite";
import { useSetModal } from "components/Nodal/Nodal";
import useProfile from "pages/Market/useProfile";

export type CharityParam = { address: string };

const Charity = (props: RouteComponentProps<CharityParam>) => {
  const endowment_addr = props.match.params.address;
  const profile = useProfile(endowment_addr);
  const [activeTab, setActiveTab] = useState("endowment");
  const { showModal } = useSetModal();

  const showDonationForm = () => {
    //the button firing this function is disabled when
    //param address is wrong
    showModal(CharityForm, {
      charity_addr: endowment_addr,
    });
  };

  return (
    <section className="container mx-auto grid pb-16 content-start gap-0">
      <DappHead />
      <div className="flex flex-col-reverse 2xl:flex-row items-start w-full md:mx-auto md:container min-h-r15 gap-2 lg:mt-3 p-5">
        <DonationInfo openModal={showDonationForm} />
        <div className="flex-grow w-full items-center text-center bg-indigo 2xl:mb-0">
          <img
            className="bg-white rounded-2xl 2xl:mt-4 shadow-md mb-1 object-cover object-center"
            style={{ width: "100%", maxHeight: "350px" }}
            src={profile.charity_image}
            alt=""
          />
          {/* charity info */}
          <CharityInfoNav
            activeTab={activeTab}
            onTabChange={(tab: string) => setActiveTab(tab)}
          />
          {/* charity info */}
          {/* Information tabs  */}
          <CharityInfoTab activeTab={activeTab} />
          {/* Information tabs  */}
        </div>
      </div>
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
