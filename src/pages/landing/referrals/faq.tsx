import ExtLink from "components/ext-link";
import { referrals_faq } from "constants/urls";
import { ArrowRight } from "lucide-react";

export function Faq({ classes = "" }) {
  return (
    <section className={`${classes} grid`}>
      <h4 className="text-2xl/tight md:text-3xl/tight text-center mb-6">
        Frequently Asked Questions:
      </h4>

      <ul className="list-disc pl-5 space-y-4 text-lg">
        <li className="">
          <strong className="font-heading">Who can join?</strong>
          <p className="text-gray-d1">
            Anyone with a Better Giving account - donors, consultants,
            influencers, nonprofits.
          </p>
        </li>

        <li className="">
          <strong className="font-heading">How do I earn rewards?</strong>
          <p className="text-gray-d1">
            Share your link, and you earn whenever a referred nonprofit receives
            donations.
          </p>
        </li>

        <li className="">
          <strong className="font-heading">When will I get paid?</strong>
          <p className="text-gray-d1">
            We process payouts monthly, directly to your account.
          </p>
        </li>

        <li>
          <strong className="font-heading">
            What if a nonprofit forgets to use my link?
          </strong>
          <p className="text-gray-d1">
            They can manually enter your referral code during signup.
          </p>
        </li>
      </ul>
      <ExtLink
        href={referrals_faq}
        className="justify-self-center flex mt-8 items-center gap-x-2 text-blue hover:text-blue-d1 md:text-lg font-semibold"
      >
        <span>Complete FAQs</span>
        <ArrowRight size={15} />
      </ExtLink>
    </section>
  );
}
