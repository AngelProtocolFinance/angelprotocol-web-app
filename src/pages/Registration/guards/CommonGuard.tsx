import { PropsWithChildren, ReactNode, useEffect } from "react";
import { Charity } from "types/aws";
import {
  placeholderCharity,
  useRegistrationQuery,
} from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import RegLoader from "../common/RegLoader";

export function CommonGuard(
  props: PropsWithChildren<{
    guardLogic(charity: Charity, children?: ReactNode | undefined): JSX.Element;
  }>
) {
  const {
    data: charity = placeholderCharity,
    isLoading,
    isFetching,
    isError,
    error,
  } = useRegistrationQuery("");
  const { handleError } = useErrorContext();

  useEffect(() => {
    if (!isLoading && !isFetching && isError) {
      handleError(error);
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
