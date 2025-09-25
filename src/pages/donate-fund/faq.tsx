import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ExtLink } from "components/ext-link";
import { DrawerIcon } from "components/icon";
import { app_routes } from "constants/routes";
import { Fragment, type PropsWithChildren } from "react";
import { Link } from "react-router";

interface Props {
  classes?: string;
  endowId: number;
}

export default function FAQ({ classes = "", endowId }: Props) {
  return (
    <div
      className={`${classes} md:bg-white md:border md:border-gray-l3 md:p-4 md:rounded-lg grid gap-2 md:gap-4`}
    >
      <h2 id="faqs">Frequently asked questions</h2>
      {faqs(endowId).map((faq) => (
        <Disclosure as="div" key={faq.id}>
          {({ open }) => (
            <>
              <DisclosureButton className="flex items-start justify-between gap-2 mb-2 w-full">
                <span
                  className={`text-left text-sm ${open ? "font-semibold" : ""}`}
                >
                  {faq.question}
                </span>
                <DrawerIcon size={18} isOpen={open} className="shrink-0" />
              </DisclosureButton>
              {open && (
                <DisclosurePanel
                  as="div"
                  static
                  className="text-sm grid gap-3 text-gray mb-6"
                >
                  {faq.paragraphs.map((p, idx) => (
                    <Fragment key={idx}>{p}</Fragment>
                  ))}
                </DisclosurePanel>
              )}
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
}

const faqs = (_: number) => [
  {
    id: 1,
    question: "How does my donation work to benefit nonprofits?",
    paragraphs: [
      <p>
        Donations are made to Altruistic Partners Empowering Society, DBA Better
        Giving, a registered charitable 501(c)(3) (EIN 87-3758939).
      </p>,
      <p>
        <Em intensity={2}>For immediate donations</Em>, Better Giving grants out
        the donations to the chosen nonprofit on a weekly basis.
      </p>,
      <p>
        <Em intensity={2}>For Sustainability Fund donations</Em>, these are
        invested as a Board Managed quasi-endowment, and Better Giving grants
        out 75% of the yield every quarter to the nonprofit, investing the other
        25% of the yield into the sustainability fund to mitigate against such
        as inflation. In this way, donors can give today, but see the impact
        continue into the future.
      </p>,
    ],
  },
  {
    id: 2,
    question: "Can I receive a tax receipt?",
    paragraphs: [
      <p>Yes, you can!</p>,
      <p>
        To the extent permitted by law in their own country or state, Donors are
        entitled to a tax receipt for the full amount of their donation, which
        includes any transaction fee they have incurred.
      </p>,
      <p>
        All Donors are encouraged to consult with their tax preparer regarding
        the specific deductibility of their contribution(s).
      </p>,
      <p>
        Donors will need to provide KYD (know your donor) information including
        name and address, and can download an annualized cumulative report of
        all donations provided to nonprofits within Better Giving through their
        'My Donation' page. Donors can also request further copies of their tax
        receipt.
      </p>,
      <p>
        To keep a permanent record of all your donations and print tax receipts,
        create your own personal user account{" "}
        <Link to={app_routes.signup} className="text-blue hover:text-blue-l1">
          here
        </Link>
      </p>,
      <p>
        Here is a short video showing how to do that:{" "}
        <ExtLink
          href="https://youtu.be/74kEk7aQauA"
          className="text-blue hover:text-blue-l1"
        >
          https://youtu.be/74kEk7aQauA
        </ExtLink>
      </p>,
    ],
  },
  {
    id: 3,
    question: "How much does Better Giving charge?",
    paragraphs: [
      <p>
        It is free to set up and use a Better Giving account. No subscriptions.
        No upfront costs. No platform fees (unless a nonprofit has opted out of
        offering donors a voluntary donation to Better Giving).
      </p>,
      <p>Payment processing fees from 3rd parties may apply.</p>,
    ],
  },
  {
    id: 4,
    question: "How do I donate by Check?",
    paragraphs: [
      <p className="leading-normal">
        For gifts by check: Make your check out to{" "}
        <Em classes="text-gray-d4">
          Altruistic Partners Empowering Society Inc
        </Em>
        and send it to:{" "}
        <Em intensity={1} classes="text-gray-d4 block mt-2">
          Miscellaneous Account Services
          <br /> PNC Bank
          <br /> P.O. Box 161019
          <br /> Rocky River, OH 44116-7019
        </Em>
      </p>,
      <p>
        IMPORTANT: Add the name of the Nonprofit you are donating to in the
        memo.
      </p>,
      <p>
        If you would like to add a contribution for Better Giving to help keep
        our services free, you may add that in the memo with{" "}
        <Em
          intensity={1}
          classes="text-gray-d4 text-xs font-mono bg-blue-l4 p-0.5"
        >
          BG:&nbsp;$amount
        </Em>
        .
      </p>,
    ],
  },
];

function Em({
  classes = "",
  children,
  intensity = 1,
}: PropsWithChildren & { intensity?: 1 | 2 | 3; classes?: string }) {
  return (
    <span
      className={`${
        intensity === 1
          ? "font-medium"
          : intensity === 2
            ? "font-semibold"
            : "font-semibold text-gray-d4"
      } ${classes}`}
    >
      {children}
    </span>
  );
}
