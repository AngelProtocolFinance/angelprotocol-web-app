import { useFormContext } from "react-hook-form";
import { DonateValues } from "../types";
import { InitialStage } from "slices/transaction/types";
import Icon from "components/Icon";
import { useGetter, useSetter } from "store/accessors";
import { setStage } from "slices/transaction/transactionSlice";

export default function KYCGuard() {
  const { stage } = useGetter((state) => state.transaction);
  const dispatch = useSetter();
  const { getValues } = useFormContext<DonateValues>();
  const { kycData } = stage as InitialStage;
  const isKycRequired = !!getValues("isKycDonorOnly");
  const isKycCompleted = isKycRequired && !!kycData;

  function showKycForm() {
    dispatch(
      setStage({
        step: "kyc",
        kycData,
      })
    );
  }

  if (!isKycRequired) return null;

  return (
    <div>
      {isKycCompleted ? (
        <button
          onClick={showKycForm}
          className="flex gap-1 items-center text-xs text-green-400 font-semibold"
        >
          <Icon type="CheckCircle" size={15} />
          KYC completed
        </button>
      ) : (
        <p className="flex gap-1 items-center text-xs text-angel-orange">
          <Icon type="Info" size={14} />
          This charity only accepts donations with KYC data
        </p>
      )}
      {!isKycCompleted && (
        <button
          onClick={showKycForm}
          type="button"
          className="text-xs text-angel-grey flex gap-1 items-center p-1 border-2 border-orange/30 hover:bg-orange/30 active:bg-orange/60 active:text-white rounded-md font-heading uppercase mt-1"
        >
          <Icon type="User" size={14} />
          KYC FORM
        </button>
      )}
    </div>
  );
}
