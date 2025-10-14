import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ExtLink } from "components/ext-link";
import { DrawerIcon } from "components/icon";
import { INTERCOM_HELP } from "constants/env";
import { ArrowRight } from "lucide-react";
import { Fragment } from "react";

export function FAQ({ classes = "" }) {
  return (
    <section
      className={`${classes} grid divide-y divide-gray-l3 pb-48`}
      aria-labelledby="faq-heading"
    >
      <h2
        id="faq-heading"
        className="col-span-full text-center section-heading mb-10 border-b-0"
      >
        Got questions? We've got answers.
      </h2>
      {faqs.map((faq) => (
        <Disclosure as="article" key={faq.id} className="p-4">
          <DisclosureButton className="group flex items-center justify-between gap-2 w-full">
            <span className="text-left group-data-open:font-semibold">
              {faq.question}
            </span>
            <DrawerIcon
              size={18}
              is_open={false}
              className="shrink-0 group-data-open:rotate-180"
            />
          </DisclosureButton>
          <DisclosurePanel as="div" className="grid gap-3 data-open:mt-4">
            {faq.paragraphs.map((p, idx) => (
              <Fragment key={idx}>{p}</Fragment>
            ))}
          </DisclosurePanel>
        </Disclosure>
      ))}
      <footer className="grid pt-8">
        <ExtLink
          href={INTERCOM_HELP}
          className="justify-self-center flex items-center gap-x-2 text-blue hover:text-blue-d1 md:text-lg font-semibold"
        >
          <span>Complete FAQs</span>
          <ArrowRight size={15} />
        </ExtLink>
        <button
          type="button"
          onClick={() => {
            if ((window as any).Intercom) {
              return (window as any).Intercom("show");
            }
            window.open(INTERCOM_HELP, "_blank");
          }}
          className="mt-4 justify-self-center flex items-center gap-x-2 text-blue hover:text-blue-d1 md:text-lg font-semibold"
        >
          Need additional support? Live Chat.
        </button>
      </footer>
    </section>
  );
}
const faqs = [
  {
    id: 1,
    question:
      "Are Better Giving’s fundraising solutions really free? How do you sustain your operations?",
    paragraphs: [
      <p>
        Yes, Better Giving’s fundraising solutions and donation processing are
        completely free: we grant out 100% of all donations, and you pay no
        costs at any time. We rely on optional donor contributions during
        checkout for support, allowing us to provide free services to nonprofits
        while remaining sustainable. We believe in nonprofit optionality, and
        you may opt out of this donor contribution model in favor of a 1.5%
        platform fee if you prefer.
      </p>,
      <p className="italic">
        Maximize your impact without worrying about fees eating into donations.
      </p>,
    ],
  },
  {
    id: 2,
    question: "What types of donations can I accept?",
    paragraphs: [
      <p>
        Our platform supports traditional methods like credit/debit card and
        bank transfers, and enables you to benefit from modern options like
        crypto, stock, donor-advised funds (DAF), checks, and digital wallets.
        We provide localized and express checkout options to ensure a seamless
        donation experience. This flexibility ensures you never miss an
        opportunity to receive a donation, regardless of how your donors prefer
        to give.
      </p>,
      <p className="italic">
        More donation options mean more opportunities to engage donors and
        increase contributions.
      </p>,
    ],
  },
  {
    id: 3,
    question: "How quickly can I start fundraising with Better Giving?",
    paragraphs: [
      <p>
        With Better Giving, you can start accepting donations almost
        immediately. Our setup process is quick and user-friendly—many
        nonprofits are up and running within a day. Easily add your donation
        form to your website or share your custom fundraising page to start
        receiving donations from day one.
      </p>,
      <p className="italic">
        Start raising funds fast without the hassle of complex setup processes.
      </p>,
    ],
  },
  {
    id: 4,
    question: "How easy is it to embed your donation forms on our website?",
    paragraphs: [
      <p>
        Our donation forms are designed to be easily embeddable on any website,
        with no technical expertise required. Whether you use WordPress, Wix, or
        a custom-built site, our forms integrate seamlessly with just a few
        clicks. We provide step-by-step guides, and if you need additional
        support, our team is always available to help.
      </p>,
      <p className="italic">
        Start accepting donations quickly, with no tech headaches or lengthy
        setup processes.
      </p>,
    ],
  },
  {
    id: 5,
    question: "How does your platform reduce administrative burdens?",
    paragraphs: [
      <p>
        Better Giving takes care of all the heavy lifting when it comes to tax
        reporting, donor receipts, and compliance. Once your donations are
        processed, we automatically send receipts to donors, simplifying your
        record-keeping. Additionally, our embeddable forms integrate seamlessly
        with your website, meaning there’s no need for extra development work.
        You get a fully operational donation system without adding
        administrative overhead.
      </p>,
      <p className="italic">
        Save your organization valuable time and resources, letting you focus on
        your mission rather than paperwork.
      </p>,
    ],
  },
];
