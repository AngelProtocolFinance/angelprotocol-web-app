import { PropsWithChildren, ReactNode, useEffect } from "react";
import { Charity } from "types/aws";
import { useRegistrationQuery } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import RegLoader from "../common/RegLoader";
import { GENERIC_ERROR_MESSAGE } from "../constants";

export type GuardLogicFunc = (
  charity: Charity,
  children?: ReactNode | undefined
) => JSX.Element;

type Props = PropsWithChildren<{
  guardLogic: GuardLogicFunc;
}>;

export function CommonGuard(props: Props) {
  const { charity, isLoading, isFetching, isError, error } =
    useRegistrationQuery();
  const { handleError } = useErrorContext();

  useEffect(() => {
    if (!isLoading && !isFetching && isError) {
      handleError(error, GENERIC_ERROR_MESSAGE);
    }
  }, [isLoading, isFetching, isError, error, handleError]);

  if (isLoading || isFetching) {
    return <RegLoader />;
  }

  // Error popup will be displayed, so render nothing
  if (isError) {
    return null;
  }

  return props.guardLogic(charity, props.children);
}
