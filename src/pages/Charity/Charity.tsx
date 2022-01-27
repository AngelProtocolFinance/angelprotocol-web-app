import { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import CharityInfoNav from "./CharityInfoNav";
import CharityInfoTab from "./CharityInfoTab";
import { DonationInfo } from "./DonationInfo";
import Donater from "components/Donater/Donater";
import DonateSuite from "components/TransactionSuite/DonateSuite";
import { useSetModal } from "components/Nodal/Nodal";
import { RiPencilFill } from "react-icons/ri";
import CharityProfileEditForm from "./CharityProfileEditForm";
import { Profile } from "services/aws/endowments/types";
import CharityUpdateSuite from "components/CharityForm/CharityUpdateSuite";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { ToastContainer } from "react-toastify";
import { profile as profile_placeholder } from "services/aws/endowments/placeholders";
import { useProfileQuery } from "services/aws/endowments/endowments";
import ImageWrapper from "components/ImageWrapper/ImageWrapper";
import useQueryEndowmentBal from "./useQueryEndowmentBal";
import { CharityParam } from "./types";

const Charity = (props: RouteComponentProps<CharityParam>) => {
  const endowment_addr = props.match.params.address;

  const { data: profile = profile_placeholder } =
    useProfileQuery(endowment_addr);
  const [activeTab, setActiveTab] = useState("endowment");
  const { showModal } = useSetModal();
  const endowmentBalanceData = useQueryEndowmentBal(
    endowment_addr,
    profile.is_placeholder
  );

  const wallet = useConnectedWallet();
  const isCharityOwner =
    wallet && wallet.walletAddress === profile.charity_owner;

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
  console.log("profile", profile.charity_image);
  const openModal = (type: "edit" | "donation") =>
    type === "edit" ? showEditForm() : showDonationForm();

  return (
    <section className="container mx-auto grid pb-16 content-start gap-0">
      <div className="flex flex-col grid-rows-1 lg:grid-rows-2 lg:flex-row items-start w-full md:mx-auto md:container min-h-r15 gap-2 lg:mt-3 p-5">
        <DonationInfo openModal={openModal} />
        <div className="flex-grow w-full items-center text-center bg-indigo 2xl:mb-0">
          <div className="relative group">
            <ImageWrapper
              height="300"
              src={profile.charity_image}
              alt="charity image"
              classes={`max-h-modal w-full bg-gray-400 rounded-2xl 2xl:-mt-6 shadow-md mb-1 object-cover object-center ${
                isCharityOwner &&
                "filter group-hover:brightness-50 transition ease-in-out"
              }`}
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
          <CharityInfoNav
            activeTab={activeTab}
            onTabChange={(tab: string) => setActiveTab(tab)}
          />
          <CharityInfoTab
            activeTab={activeTab}
            endowmentBalanceData={endowmentBalanceData}
          />
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

function CharityForm(props: { charity_addr: string }) {
  return (
    <Donater to="charity" receiver={props.charity_addr}>
      <DonateSuite inModal />
    </Donater>
  );
}

function CharityProfileForm(props: { profile: Profile }) {
  return (
    <CharityUpdateSuite inModal profile={props.profile}>
      <CharityProfileEditForm {...props} />
    </CharityUpdateSuite>
  );
}

export default Charity;
