import { useEffect, useState } from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import { app } from "types/routes";
import useOwnerChecker from "./useOwnerChecker";

export default function WithdrawButton() {
  const { url } = useRouteMatch();
  const [onWithdrawUrl, setWithdrawUrl] = useState(false);
  const { isCharityOwner } = useOwnerChecker();

  useEffect(() => {
    if (url === "/app/withdraw") {
      setWithdrawUrl(true);
    }
  }, [url]);

  return (
    <div>
      {isCharityOwner && (
        <NavLink exact to={onWithdrawUrl ? "#" : `${url}/${app.withdraw}`}>
          <button
            className={
              onWithdrawUrl
                ? `cursor-default uppercase bg-grey-accent rounded-xl w-40 h-6 d-flex justify-center items-center text-sm text-white mb-1`
                : `uppercase hover:bg-angel-blue bg-thin-blue rounded-xl w-40 h-6 d-flex justify-center items-center text-sm text-white mb-1`
            }
          >
            Withdraw
          </button>
        </NavLink>
      )}
    </div>
  );
}
