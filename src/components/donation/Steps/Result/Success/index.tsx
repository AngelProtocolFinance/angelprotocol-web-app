import char from "assets/images/celebrating-character.png";
import Image from "components/Image";
import Signup from "components/Signup";
import { appRoutes } from "constants/routes";
import { confetti } from "helpers/confetti";
import { Link } from "react-router-dom";
import { useGetter } from "store/accessors";
import { userIsSignedIn } from "types/auth";
import type { GuestDonor } from "types/aws";
import type { DonationRecipient } from "../../types";
import Share, { type SocialMedia } from "./Share";

type Props = {
  classes?: string;
  recipient: DonationRecipient;
  guestDonor: GuestDonor | undefined;
};

export default function Success({ classes, guestDonor, recipient }: Props) {
  const user = useGetter((state) => state.auth.user);
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
      <p className="text-center text-navy-l1">
        The donation process is complete, and we are grateful for your support.
      </p>

      <h2 className="mt-2 w-full pt-2 text-center font-medium text-blue-d2">
        Spread the word!
      </h2>
      <p className="text-center text-navy-l1 text-sm max-w-sm">
        Encourage your friends to join in and contribute, making a collective
        impact through donations.
      </p>
      <div className="flex items-center gap-2 mt-1 mb-2">
        {socials.map(([type, size]) => (
          <Share key={type} iconSize={size} type={type} recipient={recipient} />
        ))}
      </div>

      {!userIsSignedIn(user) && guestDonor && (
        <Signup
          classes="max-w-96 w-full mt-6 justify-self-center"
          donor={((d) => {
            const [firstName, lastName] = d.fullName.split(" ");
            return { firstName, lastName, email: d.email };
          })(guestDonor)}
        />
      )}

      <Link
        to={appRoutes.marketplace + `/${recipient.id}`}
        className="w-full max-w-96 rounded-full btn-outline normal-case mt-4"
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
