import { WithdrawValues as WV } from "./types";
import { TxTypes } from "contracts/createTx/types";
import { EndowmentDetails as ED } from "types/contracts";
import { SimulContractTx } from "types/evm";
import { chainIds } from "constants/chainIds";
import { constructTx } from "./constructTx";

//mock so not to deal with encoded strings
jest.mock("contracts/createTx/createTx", () => ({
  __esModule: true,
  encodeTx: (type: TxTypes) => [type, type.split(".")[0]],
  createTx: (sender: string, type: TxTypes, options: any): SimulContractTx => ({
    from: sender,
    to: type.split(".")[0],
    data: type === "multisig.submit-transaction" ? options.data : type,
  }),
}));

afterAll(() => jest.clearAllMocks());

describe("Charity withdraw transactions", () => {
  test("withdraw locked to polygon wallet", () => {
    const endow = endowDetails();
    const fv = formValues();

    const { tx, isPolygon } = constructTx("sender", 0, endow, fv);

    expect(tx.data).toBe("locked-withdraw.propose");
    expect(tx.to).toBe("multisig");
    expect(isPolygon).toBe(true);
  });
  test("withdraw liquid to polygon wallet", () => {
    const endow = endowDetails();
    const fv = formValues([["type", "liquid"]]);

    const { tx, isPolygon } = constructTx("sender", 0, endow, fv);

    expect(tx.data).toBe("accounts.withdraw");
    expect(tx.to).toBe("multisig");
    expect(isPolygon).toBe(true);
  });
  test("withdraw locked/liquid to other network ( not polygon )", () => {
    const endow = endowDetails();
    const fv = formValues([["network", chainIds.ethereum]]);
    const { isPolygon } = constructTx("sender", 0, endow, fv);
    expect(isPolygon).toBe(false);
  });
});

describe("AST withdraw transactions", () => {
  test("withdraw locked to polygon wallet", () => {
    const endow = endowDetails([["endow_type", "normal"]]);
    const fv = formValues();

    const { tx, isPolygon, isDirect } = constructTx("sender", 0, endow, fv);

    expect(tx.data).toBe("accounts.withdraw");
    expect(tx.to).toBe("multisig");
    expect(isPolygon).toBe(true);
    expect(isDirect).toBe(false);
  });
  test("withdraw liquid to polygon wallet", () => {
    const endow = endowDetails([["endow_type", "normal"]]);
    const fv = formValues([["type", "liquid"]]);

    const { tx, isPolygon, isDirect } = constructTx("sender", 0, endow, fv);

    expect(tx.data).toBe("accounts.withdraw");
    expect(tx.to).toBe("multisig");
    expect(isPolygon).toBe(true);
    expect(isDirect).toBe(false);
  });
  test("withdraw locked/liquid to other network ( not polygon )", () => {
    const endow = endowDetails([["endow_type", "normal"]]);
    const fv = formValues([["network", chainIds.ethereum]]);

    const { isPolygon, isDirect } = constructTx("sender", 0, endow, fv);

    expect(isPolygon).toBe(false);
    expect(isDirect).toBe(false);
  });
  test("withdraw locked: sender in maturity whitelist", () => {
    const endow = endowDetails([
      ["maturityAllowlist", ["sender"]],
      ["endow_type", "normal"],
    ]);
    const fv = formValues();
    const { tx, isDirect } = constructTx("sender", 0, endow, fv);

    expect(tx.to).toBe("accounts");
    expect(tx.data).toBe("accounts.withdraw");
    expect(isDirect).toBe(true);
  });
  test("withdraw liquid: sender in beneficiary whitelist", () => {
    const endow = endowDetails([
      ["whitelistedBeneficiaries", ["sender"]],
      ["endow_type", "normal"],
    ]);

    const fv = formValues([["type", "liquid"]]);
    const { tx, isDirect } = constructTx("sender", 0, endow, fv);

    expect(tx.to).toBe("accounts");
    expect(tx.data).toBe("accounts.withdraw");
    expect(isDirect).toBe(true);
  });
});

type FVOverride<T extends keyof WV> = [T, WV[T]];
function formValues<T extends keyof WV>(overrides?: FVOverride<T>[]): WV {
  return {
    amounts: [],
    network: chainIds.polygon,
    beneficiary: "0x51d0e5cffb5748dD17f1E133C72E48fa94685bEc",
    reason: "reason",
    _amounts: "",
    endowType: "charity",
    type: "locked",
    ...(overrides || []).reduce(
      (prev, curr) => ({ ...prev, [curr[0]]: curr[1] }),
      {}
    ),
  };
}

type Override<T extends keyof ED> = [T, ED[T]];
function endowDetails<T extends keyof ED>(overrides?: Override<T>[]): ED {
  return {
    owner: "multisig",
    categories: { sdgs: [], general: [] },
    endow_type: "charity",
    status: "approved",
    maturityTime: 1000,
    whitelistedBeneficiaries: [],
    maturityAllowlist: [],
    kycDonorsOnly: false,
    settingsController: {} as any, //not relevant to this test
    ...(overrides || []).reduce(
      (prev, curr) => ({ ...prev, [curr[0]]: curr[1] }),
      {}
    ),
  };
}
