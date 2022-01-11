import Action from "components/ActionButton/Action";
import Donater from "components/Donater/Donater";
import DappHead from "components/Headers/DappHead";
import { useSetModal } from "components/Nodal/Nodal";
import DonateSuite from "components/TransactionSuite/DonateSuite";
import { unsdgs } from "pages/Fund/unsdgs";
import useProfiles from "pages/Market/useProfiles";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Banner } from "./Banner";
import { CharitiesList } from "./CharitiesList";
import FundVid from "./FundVid";
import Overview from "./Overview";
import ShareSection from "./ShareSection";

type FundProps = { fund_id: number };

function FundForm(props: FundProps) {
  return (
    <Donater to="fund" receiver={props.fund_id}>
      <DonateSuite inModal />
    </Donater>
  );
}

export default function Fund(props: RouteComponentProps<{ id?: string }>) {
  const [isSharing, setSharing] = useState(false);
  const { showModal } = useSetModal();

  const id_param = props.match.params?.id;
  const fund_id =
    //if user goes to fund page with param not in ["1"..."17"], set id to 1
    (id_param && sdg_ids.includes(id_param) && Number(id_param)) || 1;
  const profiles = useProfiles(fund_id);
  const sdg = unsdgs[fund_id];

  const showDonationForm = () => showModal(FundForm, { fund_id });
  const toggleShare = () => setSharing((prev) => !prev);

  return (
    <div className="flex flex-col pb-24">
      <DappHead />
      <div className="padded-container">
        <div className="grid lg:grid-rows-fund lg:grid-cols-1a gap-4">
          <Banner
            bg={sdg.bg}
            icon={sdg.icon}
            title={sdg.title}
            fund_id={fund_id}
          />
          <FundVid url={sdg.youtube} />
          <div className="order-4 lg:order-3">
            <Overview fund_id={fund_id} />
          </div>
          <div className="flex flex-col order-3 lg:order-4">
            <Action
              title="Donate"
              classes="bg-yellow-blue w-52 h-12"
              onClick={showDonationForm}
            />
            <div className="flex gap-5">
              <Action
                title="Share"
                classes="bg-angel-blue w-52 h-12"
                onClick={toggleShare}
              />
              <ShareSection isOpen={isSharing} />
            </div>
          </div>
        </div>
        <CharitiesList profiles={profiles} />
      </div>
    </div>
  );
}

//array of string id's to check route params against
const sdg_ids: string[] = Array(16)
  .fill(1)
  .map((el, idx) => `${el + idx}`);
