import { IconType } from "react-icons/lib";
import { useEndowmentHoldingsState } from "services/terra/account/states";
import { useApprovedVaultsRateState } from "services/terra/registrar/states";
import { getIcon } from "components/Icons/Icons";

export default function PageMeta(props: { address: string }) {
  const { isVaultsRateError, isVaultsRateLoading } =
    useApprovedVaultsRateState();
  const { isHoldingsError, isHoldingsLoading } = useEndowmentHoldingsState(
    props.address
  );

  const isLoading = isVaultsRateLoading || isHoldingsLoading;
  const isError = isVaultsRateError || isHoldingsError;

  const info = isLoading ? (
    <Info
      Icon={getIcon("Loading")}
      message="loading account data"
      iconClass="animate-spin"
    />
  ) : isError ? (
    <Info
      Icon={getIcon("ExclamationCircle")}
      message="failed to load account data"
      iconClass="mt-0.5"
    />
  ) : null;

  return <div className="col-span-2 h-4">{info}</div>;
}

function Info(props: { message: string; Icon: IconType; iconClass?: string }) {
  return (
    <p className="flex items-center text-white/80 gap-2">
      <props.Icon className={props.iconClass} />
      <span>{props.message}</span>
    </p>
  );
}
