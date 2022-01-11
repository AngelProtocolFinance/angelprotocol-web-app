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
import { RiPencilFill } from "react-icons/ri";
import CharityProfileEditForm from "./CharityProfileEditForm";
import { Profile } from "services/aws/endowments/types";
import CharityUpdateSuite from "components/CharityForm/CharityUpdateSuite";
import { useConnectedWallet } from "@terra-money/wallet-provider";

export type CharityParam = { address: string };

const Charity = (props: RouteComponentProps<CharityParam>) => {
  const endowment_addr = props.match.params.address;
  const profile = useProfile(endowment_addr);
  const [activeTab, setActiveTab] = useState("endowment");
  const { showModal } = useSetModal();
  const wallet = useConnectedWallet();

  // console.log("profile: ", wallet?.walletAddress, profile);
  const showDonationForm = () => {
    //the button firing this function is disabled when
    //param address is wrong
    showModal(CharityForm, {
      charity_addr: endowment_addr,
    });
  };
  const showEditForm = () => {
    showModal(CharityProfileForm, {
      profile,
    });
  };

  const isCharityOwner = wallet?.walletAddress === profile?.charity_owner;

  return (
    <section className="container mx-auto grid pb-16 content-start gap-0">
      <DappHead />
      <div className="flex flex-col-reverse 2xl:flex-row items-start w-full md:mx-auto md:container min-h-r15 gap-2 lg:mt-3 p-5">
        <DonationInfo openModal={showDonationForm} />
        <div className="flex-grow w-full items-center text-center bg-indigo 2xl:mb-0">
          <div className="relative group">
            <img
              className={`bg-white rounded-2xl 2xl:-mt-6 shadow-md mb-1 object-cover object-center ${
                isCharityOwner &&
                "filter group-hover:brightness-50 transition ease-in-out"
              }`}
              style={{ width: "100%", maxHeight: "350px" }}
              src={profile.charity_image}
              alt=""
            />
            {isCharityOwner && (
              <button
                className="absolute top-1 right-1 p-5 opacity-0 group-hover:opacity-100 transition ease-in-out"
                onClick={showEditForm}
              >
                <RiPencilFill size={40} className="text-white-grey" />
              </button>
            )}
          </div>
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

type CharityEditProps = { profile: Profile };

function CharityForm(props: CharityProps) {
  return (
    <Donater to="charity" receiver={props.charity_addr}>
      <DonateSuite inModal />
    </Donater>
  );
}

function CharityProfileForm(props: CharityEditProps) {
  return (
    <CharityUpdateSuite inModal profile={props.profile}>
      <CharityProfileEditForm {...props} />
    </CharityUpdateSuite>
  );
}

export default Charity;
