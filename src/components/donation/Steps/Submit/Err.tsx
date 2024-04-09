import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Icon from "components/Icon";
import { GENERIC_ERROR_MESSAGE } from "constants/common";
import { logger } from "helpers";
import { useEffect } from "react";

type Props = {
  error: FetchBaseQueryError | SerializedError | undefined;
};

export default function Err({ error }: Props) {
  useEffect(() => {
    logger.error(error);
  }, [error]);

  return (
    <div className="grid place-items-center content-center gap-6 p-4 @md/steps:p-8">
      <Icon type="ExclamationCircleFill" size={60} className="text-red" />
      <p className="text-center">{GENERIC_ERROR_MESSAGE}</p>
    </div>
  );
}
