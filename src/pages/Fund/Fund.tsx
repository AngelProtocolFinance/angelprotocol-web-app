import Donater from "components/Donater/Donater";
import DappHead from "components/Headers/DappHead";
import { useSetModal } from "components/Nodal/Nodal";
import ShareModal from "components/ShareModal";
import DonateSuite from "components/TransactionSuite/DonateSuite";
import { unsdgs } from "pages/Fund/unsdgs";
import useProfiles from "pages/Market/useProfiles";
import { RouteComponentProps } from "react-router-dom";
import Banner from "./Banner";
import ButtonSection from "./ButtonSection";
import CharitiesList from "./CharitiesList";
import FundVid from "./FundVid";
import Overview from "./Overview";

type FundProps = { fund_id: number };

function FundForm(props: FundProps) {
  return (
    <Donater to="fund" receiver={props.fund_id}>
      <DonateSuite inModal />
    </Donater>
  );
}

export default function Fund(props: RouteComponentProps<{ id?: string }>) {
  const { showModal, hideModal } = useSetModal();

  const id_param = props.match.params?.id;
  const fund_id =
    //if user goes to fund page with param not in ["1"..."17"], set id to 1
    (id_param && sdg_ids.includes(id_param) && Number(id_param)) || 1;
  const profiles = useProfiles(fund_id);
  const sdg = unsdgs[fund_id];

  const openDonationForm = () => showModal(FundForm, { fund_id });
  const openShareModal = () => showModal(ShareModal, { onClose: hideModal });

  return (
    <div className="flex flex-col pb-12 lg:pb-24">
      <DappHead />
      <div className="padded-container w-screen">
        <div className="grid lg:grid-rows-fund lg:grid-cols-1a gap-4">
          {/* Components have specific 'className' props so that the parent (this component)
            can decide how the component fits into it */}
          <Banner
            icon={sdg.icon}
            title={sdg.title}
            fund_id={fund_id}
            className={`${sdg.bg} flex-1 order-1`}
          />
          <FundVid url={sdg.youtube} className="hidden lg:block order-2" />
          <ButtonSection
            onDonate={openDonationForm}
            onShare={openShareModal}
            className="order-3 lg:order-4"
          />
          <Overview fund_id={fund_id} className="order-4 lg:order-3" />
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
