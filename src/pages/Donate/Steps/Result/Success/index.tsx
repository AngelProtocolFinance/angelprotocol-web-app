import Icon from "components/Icon";
import { BtnPrimary, BtnSec } from "components/donation";
import { TxStep } from "slices/donation";
import { getTxUrl, humanize } from "helpers";
import { appRoutes } from "constants/routes";
import Share from "./Share";

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
        <BtnSec className="flex items-center justify-center gap-3.5">
          <Icon type="FileDownload" size={22} />
          <span>Download tax receipt</span>
        </BtnSec>
        <BtnSec
          as="a"
          href={getTxUrl(chainId, hash)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3.5"
        >
          <Icon type="ExternalLink" size={22} />
          <span>View transaction</span>
        </BtnSec>
      </div>
      <div className="p-5 flex items-center my-12 dark:bg-blue-d7 rounded border border-gray-l2 dark:border-bluegray w-full gap-2">
        <span className="uppercase font-bold mr-auto">
          Share on social media
        </span>
        <Share iconSize={16} type="Facebook" />
        <Share iconSize={24} type="Twitter" />
        <Share iconSize={24} type="Instagram" />
        <Share iconSize={21} type="Telegram" />
        <Share iconSize={22} type="Discord" />
      </div>

      <BtnPrimary as="link" to={appRoutes.profile + `/${id}`}>
        Back to the platform
      </BtnPrimary>
    </div>
  );
}
