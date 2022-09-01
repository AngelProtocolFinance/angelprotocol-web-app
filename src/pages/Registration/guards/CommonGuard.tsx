import { PropsWithChildren, ReactNode, useEffect } from "react";
import { Charity } from "types/aws";
import {
  placeholderCharity,
  useRegistrationQuery,
} from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import RegLoader from "../common/RegLoader";
import { GENERIC_ERROR_MESSAGE } from "../constants";
import { getSavedRegistrationReference } from "../registrationReferenceHelpers";

type Props = PropsWithChildren<{
  guardLogic: (
    charity: Charity,
    children?: ReactNode | undefined
  ) => JSX.Element;
}>;

export function CommonGuard(props: Props) {
  const regRef = getSavedRegistrationReference();
  console.log("regRef", regRef, !regRef);
  const {
    data: charity = placeholderCharity,
    isLoading,
    isFetching,
    isError,
    error,
  } = useRegistrationQuery(regRef, { skip: !regRef });
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
