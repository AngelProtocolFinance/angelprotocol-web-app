import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import ExtLink from "components/ExtLink";
import { DrawerIcon } from "components/Icon";
import { appRoutes } from "constants/routes";
import { Fragment, type PropsWithChildren } from "react";
import { Link } from "react-router-dom";

interface Props {
  classes?: string;
  endowId: number;
}

export default function FAQ({ classes = "", endowId }: Props) {
  return (
    <div
      className={
        classes +
        " md:bg-white md:border md:border-gray-l4 md:p-4 md:rounded-lg grid gap-2 md:gap-4"
      }
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
                <DrawerIcon
                  isOpen={open}
                  className="shrink-0 -mt-0.5 text-xl"
                />
              </DisclosureButton>
              {open && (
                <DisclosurePanel
                  as="div"
                  static
                  className="text-sm grid gap-3 text-navy-l1 mb-6"
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

const faqs = (endowId: number) => [
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
        <Link to={appRoutes.signup} className="text-blue hover:text-blue-l1">
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
      <p>
        For fiscally sponsored accounts (mainly non-US charities), there is a
        fiscal sponsorship fee of 2.9%.
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
        <Em classes="text-navy-d4">
          Altruistic Partners Empowering Society Inc
        </Em>
        ,<br /> write{" "}
        <Em classes="text-navy-d4 text-xs font-mono bg-blue-l4 p-0.5 mr-2">
          endowment:{endowId}
        </Em>
        <Em classes="text-navy-d4 text-xs font-mono bg-blue-l4 p-0.5">
          donation&nbsp;split:__%
        </Em>{" "}
        in the memo section of the check, and send it to:{" "}
        <Em intensity={1} classes="text-navy-d4 block mt-2">
          Miscellaneous Account Services
          <br /> PNC Bank
          <br /> P.O. Box 8108
          <br /> Philadelphia, PA 19101-8108
        </Em>
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
            : "font-semibold text-navy-d4"
      } ${classes}`}
    >
      {children}
    </span>
  );
}
