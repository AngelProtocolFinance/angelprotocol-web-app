import Icon from "components/Icon";
import { BtnPrimary, BtnSec } from "components/donation";
import { TxStep } from "slices/donation";
import { getTxUrl, humanize } from "helpers";
import { appRoutes } from "constants/routes";
import Share, { SocialMedia } from "./Share";

export default function Success({
  classes,
  ...state
}: Omit<TxStep, "status"> & { classes?: string; hash: string }) {
  const {
    hash,
    details: { chainId, token },
    recipient,
  } = state;
  const { name, id } = recipient;
  return (
    <div className={`grid justify-items-center ${classes}`}>
      <Icon type="CheckCircle" size={96} className="text-[#7EC682] mb-8" />
      <h3 className="text-2xl sm:text-3xl mb-4 sm:mb-12 font-bold text-center leading-relaxed">
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

      <BtnSec
        as="a"
        href={getTxUrl(chainId, hash)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-3.5 w-full sm:w-auto"
      >
        <Icon type="ExternalLink" size={22} />
        <span>View transaction</span>
      </BtnSec>

      <div className="p-5 flex flex-col sm:flex-row items-center my-12 dark:bg-blue-d7 rounded border border-gray-l2 dark:border-bluegray w-full gap-2">
        <span className="uppercase font-bold mb-6 mt-1 sm:my-0 sm:mr-auto">
          Share on social media
        </span>
        <div className="flex items-center gap-2">
          {socials.map(([type, size]) => (
            <Share
              key={type}
              iconSize={size}
              type={type}
              recipient={recipient}
            />
          ))}
        </div>
      </div>

      <BtnPrimary
        as="link"
        to={appRoutes.profile + `/${id}`}
        className="w-full text-center sm:w-auto"
      >
        Back to the platform
      </BtnPrimary>
    </div>
  );
}

const socials: [SocialMedia, number][] = [
  ["Twitter", 24],
  ["Telegram", 21],
  ["Linkedin", 22],
  ["Facebook", 16],
];
