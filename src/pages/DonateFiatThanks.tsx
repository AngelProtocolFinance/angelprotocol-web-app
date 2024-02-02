import char from "assets/images/celebrating-character.png";
import Image from "components/Image";
import { appRoutes } from "constants/routes";
import { confetti } from "helpers/confetti";
import { Link } from "react-router-dom";

export default function DonateFiatThanks() {
  return (
    <div className="grid justify-self-center m-auto max-w-[35rem] px-4 py-8 sm:py-20 scroll-mt-6 font-work">
      <div
        className="mb-6 justify-self-center"
        ref={async (node) => {
          if (!node) return;
          await confetti(node);
        }}
      >
        <Image src={char} />
      </div>
      <p className="uppercase mb-2 text-xs text-blue-d1 text-center">
        Donation successful
      </p>
      <h3 className="text-xl sm:text-2xl mb-2 text-center leading-relaxed text-balance">
        Your generosity knows no bounds! Thank you for making a difference!
      </h3>
      <p className="text-center text-gray-d1">
        We'll process your donation to the nonprofit you specified as soon as
        the payment has cleared. You can safely navigate away using the button
        below.
      </p>
      <p className="text-center text-gray-d1 mt-8 text-[15px]">
        If you need a receipt for your donation, please fill out the KYC form
        for this transaction on your{" "}
        <Link to={appRoutes.donations}>My donations</Link> page.
      </p>
      <Link
        to={appRoutes.marketplace}
        className="w-full btn-orange btn-donate normal-case mt-8"
      >
        Back to the platform
      </Link>
    </div>
  );
}
