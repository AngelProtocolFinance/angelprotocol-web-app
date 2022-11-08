import { renderHook } from "@testing-library/react";
import { PLACEHOLDER_WALLET } from "test/constants";
import useSubmit from "../useSubmit";

const mockShowModal = jest.fn();
jest.mock("contexts/ModalContext", () => ({
  __esModule: true,
  useModalContext: () => ({ showModal: mockShowModal }),
}));

const mockSubmitMutation = jest.fn();
jest.mock("services/aws/registration", () => ({
  __esModule: true,
  useSubmitMutation: () => mockSubmitMutation(),
}));

const mockUseGetWallet = jest.fn();
jest.mock("contexts/WalletContext", () => ({
  __esModule: true,
  useGetWallet: () => mockUseGetWallet(),
}));

const mockDispatch = jest.fn();
const mockUseGetter = jest.fn();
jest.mock("store/accessors", () => ({
  __esModule: true,
  useGetter: (..._: any[]) => mockUseGetter(),
  useSetter: () => mockDispatch,
}));

describe("useSubmit tests", () => {
  it("initializes correctly", () => {
    mockSubmitMutation.mockReturnValue([(_: any) => ({})]);
    mockUseGetter.mockReturnValue({ form_loading: false });
    mockUseGetWallet.mockReturnValue({ wallet: PLACEHOLDER_WALLET });
    const { result } = renderHook(() => useSubmit());
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.submit).toBeDefined();
  });

  it("assigns 'isSubmitting' value correctly", () => {
    mockSubmitMutation.mockReturnValue([(_: any) => ({})]);
    mockUseGetter.mockReturnValue({ form_loading: true });
    mockUseGetWallet.mockReturnValue({ wallet: PLACEHOLDER_WALLET });
    const { result } = renderHook(() => useSubmit());
    expect(result.current.isSubmitting).toBe(true);
  });
});
