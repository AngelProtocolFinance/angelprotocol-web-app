import { SimulContractTx } from "types/evm";
import { Fee, NewAIF, SettingsPermission } from "types/polygon/account";
import {
  EVMWallet,
  isConnected,
  useWalletContext,
} from "contexts/WalletContext";
import { createEndowment as createEndowData } from "contracts/IAccount";
import { ADDRESS_ZERO, EIPMethods } from "constants/ethereum";

export default function Test() {
  const wallet = useWalletContext();

  if (!isConnected(wallet)) {
    return <div className="mt-36">evm wallet not connected</div>;
  }

  if (wallet.type !== "evm") {
    return <div className="mt-36">evm wallet not connected</div>;
  }

  async function createEndowment(w: EVMWallet) {
    try {
      const data = createMsg(w);
      const tx: SimulContractTx = {
        from: w.address,
        to: "0x09266441B8Dc93EE70Dbe27A3612eA6e1116f1F3",
        data: createEndowData.encode(data),
      };

      const [nonce, gas, gasPrice] = await Promise.all([
        w.provider.request<string>({
          method: EIPMethods.eth_getTransactionCount,
          params: [w.address, "latest"],
        }),

        //for display in summary only but not
        w.provider.request<string>({
          method: EIPMethods.eth_estimateGas,
          params: [tx],
        }),
        w.provider.request<string>({
          method: EIPMethods.eth_gasPrice,
        }),
      ]);

      console.log(nonce, gas, gasPrice);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="mt-36">
      <button type="button" onClick={() => createEndowment(wallet)}>
        create endowment
      </button>
    </div>
  );
}
const future = Math.floor(Date.now() / 1000) + 2000;

function createMsg(wallet: EVMWallet): NewAIF {
  return {
    // owner: string;
    owner: wallet.address,
    // withdrawBeforeMaturity: true; //not specified in launchpad design
    withdrawBeforeMaturity: true,
    // maturityTime: number;
    maturityTime: Math.floor(Date.now() / 1000) + 1000,
    // maturityHeight: 0; //not used in endowment  creation
    maturityHeight: 0,
    name: "Test endowment",
    // name: string;
    categories: { sdgs: [1], general: [] },
    // categories: Categories;
    tier: 0,
    // tier: EndowTier; //not specified in launchpad design
    endow_type: 1,
    // endow_type: EndowType; //not used in endowment creation
    logo: "",
    // logo: "";
    image: "",
    // image: "";
    cw4_members: [wallet.address],
    // cw4_members: string[]; // in launchpad design, weight is specified for each member
    kycDonorsOnly: false,
    cw3Threshold: {
      enumData: 1,
      data: {
        weight: 0,
        percentage: 50,
        threshold: 0,
        quorum: 0,
      },
    },
    cw3MaxVotingPeriod: {
      enumData: 1,
      data: {
        height: 0,
        time: Math.floor(Date.now() / 1000) + 1000,
      },
    },
    // cw3MaxVotingPeriod: Duration;

    // whitelistedBeneficiaries: string[];
    whitelistedBeneficiaries: [],
    whitelistedContributors: [],
    // whitelistedContributors: string[];
    maturityWhitelist: [],
    // maturityWhitelist: string[];

    // //splits
    // ignoreUserSplits: boolean;
    ignoreUserSplits: false,
    splitMin: 0,
    splitMax: 100,
    splitDefault: 50,
    splitToLiquid: {
      min: 0,
      max: 100,
      defaultSplit: 50,
    },

    // //fees
    earningsFee: defaultFee,
    withdrawFee: defaultFee,
    depositFee: defaultFee,
    aumFee: defaultFee, //not included in launchpad, for edit later

    // //dao
    dao: {
      quorum: 10,
      threshold: 10,
      votingPeriod: 10,
      timelockPeriod: 10,
      expirationPeriod: 10,
      proposalDeposit: 10,
      snapshotPeriod: 10,
      token: {
        token: 0,
        data: {
          existingCw20Data: ADDRESS_ZERO,
          newCw20InitialSupply: 0,
          newCw20Name: "",
          newCw20Symbol: "",
          bondingCurveCurveType: {
            curve_type: 0,
            data: {
              value: 0,
              scale: 0,
              slope: 0,
              power: 0,
            },
          },
          bondingCurveName: "",
          bondingCurveSymbol: "",
          bondingCurveDecimals: 0,
          bondingCurveReserveDenom: ADDRESS_ZERO,
          bondingCurveReserveDecimals: 0,
          bondingCurveUnbondingPeriod: 0,
        },
      },
    },
    // dao: DaoSetup; //just set to placeholder - overriden by creatDao:bool
    createDao: false,
    // createDao: false; //not included in launchpad, for edit later

    settingsController: {
      endowmentController: defaultPermission,
      strategies: defaultPermission,
      whitelistedBeneficiaries: defaultPermission,
      whitelistedContributors: defaultPermission,
      maturityWhitelist: defaultPermission,
      maturityTime: defaultPermission,
      profile: defaultPermission,
      earningsFee: defaultPermission,
      withdrawFee: defaultPermission,
      depositFee: defaultPermission,
      aumFee: defaultPermission,
      kycDonorsOnly: defaultPermission,
      name: defaultPermission,
      image: defaultPermission,
      logo: defaultPermission,
      categories: defaultPermission,
      splitToLiquid: defaultPermission,
      ignoreUserSplits: defaultPermission,
    },
    // settingsController: SettingsController; //not included in launchpad, for edit later
    parent: 0,
  };
}

const defaultFee: Fee = {
  payoutAddress: ADDRESS_ZERO,
  feePercentage: 0,
  active: false,
};
const defaultPermission: SettingsPermission = {
  ownerControlled: true,
  govControlled: true,
  modifiableAfterInit: true,
  delegate: {
    Addr: ADDRESS_ZERO,
    expires: future, // datetime int of delegation expiry
  },
};
