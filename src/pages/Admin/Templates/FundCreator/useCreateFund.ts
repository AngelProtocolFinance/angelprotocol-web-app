import { Dec } from "@terra-money/terra.js";
import { useConnectedWallet } from "@terra-money/use-wallet";
import { useFormContext } from "react-hook-form";
import TransactionPrompt from "components/TransactionStatus/TransactionPrompt";
import { useSetModal } from "components/Modal/Modal";
import { sendTerraTx } from "services/transaction/sendTerraTx";
import Admin from "contracts/Admin";
import Indexfund from "contracts/IndexFund";
import { FundDetails } from "contracts/types";
import { useSetter } from "store/accessors";
import { INIT_SPLIT } from "./FundCreator";
import { FundCreatorValues } from "./fundCreatorSchema";

export default function useCreateFund() {
  const { trigger, getValues } = useFormContext<FundCreatorValues>();
  const dispatch = useSetter();
  const wallet = useConnectedWallet();
  const { showModal } = useSetModal();

  async function createFund() {
    //validate select fields
    const isValid = await trigger([
      "title",
      "description",
      "fundName",
      "fundDescription",
      "expiryHeight",
      "expiryTime",
    ]);

    if (!isValid) return;

    const title = getValues("title");
    const description = getValues("description");
    const fundName = getValues("fundName");
    const fundDescription = getValues("fundDescription");
    const expiryHeight = getValues("expiryHeight");
    const expiryTime = getValues("expiryTime");
    const splitToLiquid = getValues("splitToLiquid");
    const isFundRotating = getValues("isFundRotating");

    //create embedded execute msg
    const indexFundContract = new Indexfund(wallet);

    //get next fundId
    const fundsListRes = await indexFundContract.getFundList();
    const maxFundId = fundsListRes.funds.reduce(
      (result, fund) => (fund.id > result ? fund.id : result),
      0
    );

    const newFundDetails: FundDetails = {
      id: maxFundId + 1,
      name: fundName,
      description: fundDescription,
      members: [],
      rotating_fund: isFundRotating,
      split_to_liquid:
        splitToLiquid === INIT_SPLIT
          ? undefined
          : new Dec(splitToLiquid).div(100).toNumber(),
      expiry_time:
        expiryTime === "" ? undefined : new Date(expiryTime).getTime() / 1000,
      expiry_height: expiryHeight === "" ? undefined : +expiryHeight,
    };

    //remove undefined fields
    const cleanedNewFundDetails = removeUndefined(newFundDetails);

    const embeddedExecuteMsg = indexFundContract.createEmbeddedCreateFundMsg(
      cleanedNewFundDetails
    );

    //create proposal msg
    const adminContract = new Admin(wallet);
    const proposalMsg = adminContract.createProposalMsg(title, description, [
      embeddedExecuteMsg,
    ]);

    dispatch(sendTerraTx({ msgs: [proposalMsg], wallet }));
    showModal(TransactionPrompt, {});
  }

  return { createFund };
}

function removeUndefined<T extends object>(obj: T) {
  const cleanedObj: Partial<T> = {};
  for (const key in obj) {
    if (obj[key] !== undefined) {
      cleanedObj[key] = obj[key];
    }
  }
  return cleanedObj as T;
}
