import { Link } from "react-router-dom";
import ExtLink from "components/ExtLink";
import Icon from "components/Icon";
import { CryptoResultStep } from "slices/donation";
import { getTxUrl, humanize } from "helpers";
import { appRoutes } from "constants/routes";
import Share, { SocialMedia } from "./Share";

export default function Success({
  classes,
  ...state
}: Omit<CryptoResultStep, "status"> & { classes?: string; hash: string }) {
  const {
    hash,
    details: { chainId, token },
    recipient,
  } = state;
  const { name, id } = recipient;
  return (
    <div className={`grid justify-items-center ${classes}`}>
      <Icon type="CheckCircle" size={96} className="text-green mb-8" />
      <h3 className="text-2xl sm:text-3xl mb-4 sm:mb-12 text-center leading-relaxed">
        Thank you for your donation of{" "}
        <span className="font-extrabold">
          {token.symbol}{" "}
          {humanize(token.amount, parseFloat(token.amount) < 0.01 ? 4 : 2)}
        </span>{" "}
        to <span className="font-extrabold">{name}</span>!
      </h3>

      <ExtLink
        href={getTxUrl(chainId.value, hash)}
        className="gap-3.5 w-full sm:w-auto btn-outline-filled btn-donate"
      >
        <Icon type="ExternalLink" size={22} />
        <span>View transaction</span>
      </ExtLink>

      <div className="p-5 flex flex-col sm:flex-row items-center my-12 dark:bg-blue-d7 rounded border border-prim w-full gap-2">
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

      <Link
        to={appRoutes.marketplace + `/${id}`}
        className="w-full sm:w-auto btn-orange btn-donate"
      >
        Back to the platform
      </Link>
    </div>
  );
}

const socials: [SocialMedia, number][] = [
  ["Twitter", 24],
  ["Telegram", 21],
  ["Linkedin", 22],
  ["Facebook", 16],
];
