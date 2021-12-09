import Donater from "components/Donater/Donater";
import DonateSuite from "components/DonateSuite/DonateSuite";
// import AppHead from "components/Headers/AppHead";
import DappHead from "components/Headers/DappHead";
import { useSetModal } from "components/Nodal/Nodal";

export default function Test() {
  const { showModal } = useSetModal();
  function showTca() {
    showModal(TcaForm, {});
  }

  //get fund_id when Test is rendered via params
  //get split config example in pages/Fund/useFund
  let example_fund_id = 3;
  let example_min_split_liq = 20; //%
  let example_max_split_liq = 80; //%
  function showFundForm() {
    showModal<FundProps>(FundForm, {
      fund_id: example_fund_id,
      min_liq: example_min_split_liq,
      max_liq: example_max_split_liq,
    });
  }

  let example_charity_addr = "terra129381";
  function showCharityForm() {
    showModal<CharityProps>(CharityForm, {
      charity_addr: example_charity_addr,
    });
  }

  return (
    <div className="pb-16 grid grid-rows-a1">
      <DappHead />
      <div className="grid place-items-center content-center">
        <p className="text-white font-bold">tca form not modal</p>
        <Donater to="tca">
          <DonateSuite />
        </Donater>
        <button
          onClick={showTca}
          className="bg-angel-blue shadow-md px-4 py-1 my-4"
        >
          show tca form
        </button>
        <button
          onClick={showFundForm}
          className="bg-angel-blue shadow-md px-4 py-1 mb-2"
        >
          show fund form
        </button>
        <button
          onClick={showCharityForm}
          className="bg-angel-blue shadow-md px-4 py-1 mb-2"
        >
          show charity form
        </button>
      </div>
    </div>
  );
}

function TcaForm() {
  return (
    <Donater to="tca">
      <DonateSuite inModal />
    </Donater>
  );
}

type FundProps = { fund_id: number; min_liq: number; max_liq: number };
function FundForm(props: FundProps) {
  return (
    <Donater
      to="fund"
      receiver={props.fund_id}
      min_liq={props.min_liq}
      max_liq={props.max_liq}
    >
      <DonateSuite inModal />
    </Donater>
  );
}

type CharityProps = { charity_addr: string };
function CharityForm(props: CharityProps) {
  return (
    <Donater to="charity" receiver={props.charity_addr}>
      <DonateSuite inModal />
    </Donater>
  );
}
