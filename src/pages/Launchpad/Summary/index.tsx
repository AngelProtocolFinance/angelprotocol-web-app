import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Completed, TFee, isCompleted } from "slices/launchpad/types";
import { EndowmentFee, NewAIF } from "types/contracts";
import { useSaveAIFMutation } from "services/aws/aws";
import { useModalContext } from "contexts/ModalContext";
import { useGetWallet } from "contexts/WalletContext";
import { TxPrompt } from "components/Prompt";
import { useGetter } from "store/accessors";
import Account from "contracts/Account";
import useCosmosTxSender, { Tx } from "hooks/useCosmosTxSender";
import { getWasmAttribute, isEmpty, roundDown, roundDownToNum } from "helpers";
import { EMAIL_SUPPORT, GENERIC_ERROR_MESSAGE } from "constants/common";
import { appRoutes } from "constants/routes";
import { routes } from "../constants";
import About from "./About";
import Fees from "./Fees";
import Management from "./Management";
import Maturity from "./Maturity";
import Splits from "./Splits";
import Whitelists from "./Whitelists";

export default function Summary() {
  const { wallet } = useGetWallet();
  const sendTx = useCosmosTxSender();
  const [saveAIF] = useSaveAIFMutation();
  const { showModal, closeModal } = useModalContext();
  const navigate = useNavigate();
  const state = useGetter((state) => state.launchpad);
  if (!isCompleted(state)) return <Navigate to={`../${state.progress}`} />;

  const { progress, ...completed } = state;

  const {
    1: about,
    2: management,
    3: whitelists,
    4: maturity,
    5: splits,
    6: fees,
  } = completed;

  async function submit() {
    if (!wallet) {
      return showModal(TxPrompt, { error: "Wallet is not connected" });
    }
    if (!(wallet.providerId === "keplr" || wallet.providerId === "keplr-wc")) {
      return showModal(TxPrompt, {
        error: "Only Keplr wallet support this transaction",
      });
    }

    const contract = new Account(wallet);
    const msg = contract.createNewAIFmsg(toAIF(completed, wallet.address));
    await sendTx({
      msgs: [msg],
      isAuthorized: true /** anyone can send this msg */,
      async onSuccess(res, chain) {
        try {
          const id = getWasmAttribute("endow_id", res.rawLog);

          showModal(
            TxPrompt,
            { loading: "Saving endowment info.." },
            { isDismissible: false }
          );

          const result = await saveAIF({
            chainId: chain.chain_id,
            id: +id!,
            registrant: wallet.address,
            tagline: about.tagline,
          });

          const tx: Tx = { hash: res.transactionHash, chainID: chain.chain_id };
          if ("error" in result) {
            return showModal(TxPrompt, {
              error: `Failed to save created endowment. Please contact us at ${EMAIL_SUPPORT}`,
              tx,
            });
          }

          closeModal();
          navigate(`${appRoutes.register}/success`, { state: id });
        } catch (err) {
          showModal(TxPrompt, { error: GENERIC_ERROR_MESSAGE });
        }
      },
    });
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-8">
        You're ready to create your AIF! Here's a summary:
      </h2>
      <About {...about} title="About" step={1} disabled={false} />
      <Management
        {...management}
        title="AIF Management"
        step={2}
        disabled={false}
      />
      <Whitelists
        {...whitelists}
        title="Whitelists"
        step={3}
        disabled={false}
      />
      <Maturity {...maturity} title="Maturity" step={4} disabled={false} />
      <Splits
        {...splits}
        title="Split of Contributions"
        step={5}
        disabled={false}
      />
      <Fees fees={fees} title="Fees" step={6} disabled={false} />
      <div className="grid grid-cols-2 sm:flex gap-2 border-t border-prim pt-8">
        <Link
          to={`../${routes[6]}`}
          className="text-sm px-8 btn-outline-filled"
        >
          Back
        </Link>
        <button
          type="button"
          className="text-sm px-8 btn-orange"
          onClick={submit}
        >
          Create my AIF
        </button>
      </div>
    </div>
  );
}

function toAIF(
  {
    1: about,
    2: management,
    3: whitelists,
    4: maturity,
    5: splits,
    6: fees,
  }: Completed,
  creator: string
): NewAIF {
  return {
    owner: creator,
    maturity_time: new Date(maturity.date).getTime() / 1000,
    name: about.name,
    categories: { sdgs: [], general: [] },
    endow_type: "normal",
    cw4_members: isEmpty(management.members)
      ? [{ addr: creator, weight: 1 }]
      : management.members.map((m) => ({ addr: m.addr, weight: +m.weight })),
    kyc_donors_only: false, //default
    cw3_threshold: {
      absolute_percentage: {
        percentage: roundDown(+management.proposal.threshold / 100, 2),
      },
    },
    cw3_max_voting_period: roundDownToNum(
      +management.proposal.duration * 60 * 60,
      0
    ),
    beneficiaries_allowlist: whitelists.beneficiaries,
    contributors_allowlist: whitelists.contributors,
    split_to_liquid: {
      min: toPct(splits.min),
      max: toPct(splits.max),
      default: toPct(splits.default),
    },
    ignore_user_splits: !splits.isCustom,
    earnings_fee: fees.earnings.isActive
      ? toEndowFee(fees.earnings)
      : undefined,
    deposit_fee: fees.deposit.isActive ? toEndowFee(fees.deposit) : undefined,
    withdraw_fee: fees.withdrawal.isActive
      ? toEndowFee(fees.withdrawal)
      : undefined,
  };
}

function toPct(num: string | number): string {
  return roundDown(+num / 100, 2);
}

function toEndowFee(fee: TFee): EndowmentFee {
  return {
    payout_address: fee.receiver,
    fee_percentage: roundDown(+fee.rate / 100, 2),
    active: fee.isActive,
  };
}
