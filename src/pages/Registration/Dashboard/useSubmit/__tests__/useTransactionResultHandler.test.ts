import { renderHook } from "@testing-library/react-hooks";
import { Charity, SubmitResult } from "services/aws/types";
import { Stage, Step } from "services/transaction/types";
import useTransactionResultHandler from "../useTransactionResultHandler";

const PK = "7fe792be-5132-4f2b-b37c-4bcd9445b773";

const mockUseSubmitMutation = jest.fn();

jest.mock("services/aws/registration", () => ({
  __esModule: true,
  useSubmitMutation: () => mockUseSubmitMutation(),
}));

const mockShowModal = jest.fn();

jest.mock("components/ModalContext/ModalContext", () => ({
  __esModule: true,
  useModalContext: () => ({ showModal: mockShowModal }),
}));

const mockUseGetter = jest.fn();
const mockUseSetter = jest.fn();

jest.mock("store/accessors", () => ({
  __esModule: true,
  useGetter: (..._: any[]) => mockUseGetter(),
  useSetter: () => mockUseSetter(),
}));

describe("useTransactionResultHandler tests", () => {
  afterAll(() => {
    jest.unmock("services/aws/registration");
    jest.unmock("components/ModalContext/ModalContext");
    jest.unmock("store/accessors");
  });

  test("useTransactionResultHandler does nothing when not in success/error stage", () => {
    function runTest(step: Step) {
      const mockDispatch = jest.fn();
      mockUseGetter.mockReturnValueOnce(getCharity());
      mockUseGetter.mockReturnValueOnce({
        form_loading: false,
        form_error: null,
        fee: 0,
        stage: { step },
      });
      mockUseSetter.mockReturnValue(mockDispatch);
      const mockSubmit = jest.fn((..._: any[]) => ({}));
      mockUseSubmitMutation.mockReturnValue([mockSubmit]);

      renderHook(() => useTransactionResultHandler());

      expect(mockSubmit).not.toHaveBeenCalled();
      expect(mockDispatch).not.toHaveBeenCalled();
      expect(mockShowModal).not.toHaveBeenCalled();
    }

    runTest(Step.form);
    runTest(Step.broadcast);
    runTest(Step.submit);
    runTest(Step.receipt);
  });

  test("useTransactionResultHandler handles error stage", () => {
    const mockDispatch = jest.fn();
    mockUseGetter.mockReturnValueOnce(getCharity());
    mockUseGetter.mockReturnValueOnce({
      form_loading: false,
      form_error: null,
      fee: 0,
      stage: { step: Step.error, message: "error" },
    });
    mockUseSetter.mockReturnValue(mockDispatch);
    const mockSubmit = jest.fn((..._: any[]) => ({}));
    mockUseSubmitMutation.mockReturnValue([mockSubmit]);

    renderHook(() => useTransactionResultHandler());

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(mockShowModal).not.toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalled();
  });

  test("useTransactionResultHandler handles success step with error", async () => {
    const mockDispatch = jest.fn();
    mockUseGetter.mockReturnValueOnce(getCharity());
    mockUseGetter.mockReturnValueOnce({
      form_loading: false,
      form_error: null,
      fee: 0,
      stage: getSuccessStage(),
    });
    mockUseSetter.mockReturnValue(mockDispatch);
    const mockSubmit = jest.fn();
    mockSubmit.mockResolvedValue({
      error: { status: "FETCH_ERROR", error: "error" },
    });
    mockUseSubmitMutation.mockReturnValue([mockSubmit]);

    const { waitFor } = renderHook(() => useTransactionResultHandler());

    await waitFor(() => expect(mockSubmit).toHaveBeenCalled());

    // if 'showModal' call is not await like this, jest tries to somehow
    // assert this before 'mockSubmit' has been called
    await waitFor(() => expect(mockShowModal).toHaveBeenCalled());

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "transaction/setFormLoading",
      payload: false,
    });
  });

  test("useTransactionResultHandler handles success step with data", async () => {
    const charity = getCharity();
    const mockDispatch = jest.fn();
    mockUseGetter.mockReturnValueOnce(charity);
    mockUseGetter.mockReturnValueOnce({
      form_loading: false,
      form_error: null,
      fee: 0,
      stage: getSuccessStage(),
    });
    mockUseSetter.mockReturnValue(mockDispatch);
    const mockSubmit = jest.fn();
    mockSubmit.mockResolvedValue({
      data: {
        RegistrationStatus: "Under Review",
        EndowmentContract: "terra1ke4aktw6zvz2jxsyqx55ejsj7rmxdl9p5xywus",
      } as SubmitResult,
    });
    mockUseSubmitMutation.mockReturnValue([mockSubmit]);

    const { waitFor } = renderHook(() => useTransactionResultHandler());

    await waitFor(() => expect(mockSubmit).toHaveBeenCalled());

    // if 'mockDispatch' call is not await like this, jest tries to somehow
    // assert this before 'mockSubmit' has been called
    await waitFor(() =>
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        type: "charity/updateCharity",
        payload: {
          ...charity,
          Registration: {
            ...charity.Registration,
            RegistrationStatus: "Under Review",
          },
          Metadata: {
            ...charity.Metadata,
            EndowmentContract: "terra1ke4aktw6zvz2jxsyqx55ejsj7rmxdl9p5xywus",
          },
        } as Charity,
      })
    );

    expect(mockDispatch).toHaveBeenNthCalledWith(2, {
      type: "transaction/setFormLoading",
      payload: false,
    });
    expect(mockShowModal).not.toHaveBeenCalled();
  });
});

const getCharity = (): Charity => ({
  ContactPerson: {
    Email: "test@test.com",
    EmailVerified: true,
    FirstName: "first",
    LastName: "last",
    PhoneNumber: "+114323888",
    Role: "ceo",
    PK,
  },
  Registration: {
    CharityName: "charity",
    CharityName_ContactEmail: "CHARITY_test@test.com",
    RegistrationDate: "2022-05-04T10:10:10Z",
    RegistrationStatus: "Inactive",
    Website: "www.test.com",
    UN_SDG: 0,
    ProofOfIdentity: { name: "poi", publicUrl: "https://www.storage.path/poi" },
    ProofOfRegistration: {
      name: "por",
      publicUrl: "https://www.storage.path/por",
    },
    Tier: 1,
    FinancialStatements: [],
    AuditedFinancialReports: [],
    ProofOfIdentityVerified: false,
    ProofOfRegistrationVerified: false,
    FinancialStatementsVerified: false,
    AuditedFinancialReportsVerified: false,
  },
  Metadata: {
    Banner: { name: "banner", publicUrl: "https://www.storage.path/banner" },
    CharityLogo: { name: "logo", publicUrl: "https://www.storage.path/logo" },
    CharityOverview: "some overview",
    EndowmentContract: "",
    TerraWallet: "terra1wf89rf7xeuuk5td9gg2vd2uzytrqyw49l24rek",
  },
});

function getSuccessStage() {
  return {
    step: Step.success,
    txInfo: {
      logs: [
        {
          events: [
            {
              type: "instantiate_contract",
              attributes: [
                {
                  key: "contract_address",
                  value: "terra1ke4aktw6zvz2jxsyqx55ejsj7rmxdl9p5xywus",
                },
              ],
            },
          ],
        },
      ],
    },
  } as Stage;
}
