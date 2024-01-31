import char from "assets/images/celebrating-character.png";
import Image from "components/Image";
import { appRoutes } from "constants/routes";
import { confetti } from "helpers/confetti";
import { Link } from "react-router-dom";
import { CryptoResultStep } from "slices/donation";
import Share, { SocialMedia } from "./Share";

export default function Success({
  classes,
  ...state
}: Omit<CryptoResultStep, "status"> & { classes?: string; hash: string }) {
  const { recipient } = state;
  const { id } = recipient;
  return (
    <div className={`grid justify-items-center ${classes}`}>
      <div
        className="mb-6"
        ref={async (node) => {
          if (!node) return;
          await confetti(node);
        }}
      >
        <Image src={char} />
      </div>

      <p className="uppercase mb-2 text-xs text-blue-d1">Donation successful</p>
      <h3 className="text-xl sm:text-2xl mb-2 text-center leading-relaxed text-balance">
        Your generosity knows no bounds! Thank you for making a difference!
      </h3>
      <p className="text-center text-gray-d1">
        The donation process is complete, and we are grateful for your support.
      </p>

      <h2 className="mt-16 border-t border-prim w-full pt-2 text-center font-medium">
        Spread the word!
      </h2>
      <p className="text-center text-gray-d1 text-sm max-w-sm">
        Encourage your friends to join in and contribute, making a collective
        impact through donations.
      </p>
      <div className="flex items-center gap-2 mt-1">
        {socials.map(([type, size]) => (
          <Share key={type} iconSize={size} type={type} recipient={recipient} />
        ))}
      </div>

      <Link
        to={appRoutes.marketplace + `/${id}`}
        className="w-full btn-orange btn-donate normal-case mt-8"
      >
        Back to the platform
      </Link>
    </div>
  );
}

const socials: [SocialMedia, number][] = [
  ["Twitter", 21],
  ["Telegram", 21],
  ["Linkedin", 21],
  ["FacebookCircle", 22],
];
