import Icon from "components/Icon";
import { BtnPrimary, BtnSec } from "components/donation";
import { TxStep } from "slices/donation";
import { getTxUrl, humanize } from "helpers";
import { appRoutes } from "constants/routes";

export default function Success({
  classes,
  ...state
}: Omit<TxStep, "status"> & { classes?: string; hash: string }) {
  const {
    hash,
    details: { chainId, token },
    recipient: { id, name },
  } = state;

  return (
    <div className={`grid justify-items-center ${classes}`}>
      <Icon type="CheckCircle" size={80} className="text-[#7EC682] mb-8" />
      <h3 className="text-3xl mb-12 font-bold text-center leading-relaxed">
        Thank you for your donation of{" "}
        <span className="font-extrabold">
          {token.symbol} {humanize(token.amount)}
        </span>{" "}
        to <span className="font-extrabold">{name}</span>!
      </h3>
      <p className="text-center mb-8">
        If you requested it, a tax receipt has been sent to the email address
        provided.
      </p>
      <div className="grid grid-cols-2 gap-5 w-full">
        <BtnSec as="btn">Download receipt</BtnSec>
        <BtnSec as="link" to={getTxUrl(chainId, hash)}>
          View transaction
        </BtnSec>
      </div>
      <div className="h-20 grid place-items-center my-12 dark:bg-blue-d7 rounded border dark:border-bluegray w-full">
        socials
      </div>

      <BtnPrimary as="link" to={appRoutes.profile + `/${id}`}>
        Back to the platform
      </BtnPrimary>
    </div>
  );
}
