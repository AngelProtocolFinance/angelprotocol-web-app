import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import ExtLink from "components/ext-link";
import { DrawerIcon } from "components/icon";
import { INTERCOM_HELP } from "constants/env";
import { ArrowRight } from "lucide-react";
import { Fragment } from "react";

export default function FAQ({ classes = "" }) {
  return (
    <div className={classes + " grid divide-y divide-gray-l4"}>
      <h2 className="col-span-full text-center text-3xl md:text-4xl leading-snug mb-10">
        Frequently Asked Questions
      </h2>
      {faqs.map((faq) => (
        <Disclosure as="div" key={faq.id} className="p-4">
          <DisclosureButton className="group flex items-center justify-between gap-2 w-full">
            <span className="text-left group-data-open:font-semibold">
              {faq.question}
            </span>
            <DrawerIcon
              size={18}
              isOpen={false}
              className="shrink-0 group-data-open:rotate-180"
            />
          </DisclosureButton>
          <DisclosurePanel
            as="div"
            className="grid gap-3 text-navy-l1 data-open:mt-4"
          >
            {faq.paragraphs.map((p, idx) => (
              <Fragment key={idx}>{p}</Fragment>
            ))}
          </DisclosurePanel>
        </Disclosure>
      ))}
      <div className="grid pt-8">
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
      </div>
    </div>
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
    question: "Can I customize my donation forms?",
    paragraphs: [
      <p>
        Yes, Better Giving offers fully customizable donation forms that allow
        you to align them with your nonprofit’s branding. You can adjust the
        form’s appearance, set donation types, and even let donors choose to
        support specific programs or projects. These forms can be embedded
        anywhere on your website, creating a seamless experience for donors.
      </p>,
      <p className="italic">
        Customization builds trust with your donors, making them feel more
        connected to your mission.
      </p>,
    ],
  },
  {
    id: 6,
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
  {
    id: 7,
    question: "How does the high-yield savings account work?",
    paragraphs: [
      <p>
        Our high-yield savings account provides a secure, low-risk way for
        nonprofits to grow their donations. Donated funds are automatically
        placed in a US Treasury yield money market account with Fidelity
        Investments to earn steady interest as soon as possible, helping you
        build financial stability without risking your principal. As a nonprofit
        ourselves, we use the same savings services to manage our own funds,
        ensuring reliability and trust.
      </p>,
      <p className="italic">
        Simple, hassle-free way to grow donations without extra overhead.
      </p>,
    ],
  },
  {
    id: 8,
    question:
      "How do the managed investment funds work, and how do they benefit nonprofits?",
    paragraphs: [
      <p>
        Our flagship Sustainability Fund is a high-yield investment fund
        averaging 24% returns annually over the past five years. It’s designed
        to help nonprofits achieve long-term financial stability by growing
        their donations over time. Unlike one-time donations that are used up
        quickly, the Sustainability Fund allows your contributions to keep
        working for your organization. The growth is reinvested until you
        request funds granted out, ensuring your nonprofit has a reliable source
        of funding well into the future.
      </p>,
      <p className="italic">
        Turn today’s donations into long-term financial security for your
        nonprofit.
      </p>,
    ],
  },
  {
    id: 9,
    question: "Can I track my donation and fund performance?",
    paragraphs: [
      <p>
        Yes, we offer real-time donation tracking, so you can monitor
        contributions as they come in. Alongside this, quarterly reports detail
        your fund performance, including the growth of your savings account and
        Sustainability Fund. These reports help you track your financial
        progress and make informed decisions about future fundraising and
        investment strategies.
      </p>,
      <p className="italic">
        Stay informed with transparent, regular updates on your financial
        performance.
      </p>,
    ],
  },
  {
    id: 10,
    question:
      "Are there any fees for using Better Giving’s fund management solutions?",
    paragraphs: [
      <p>
        Our optional fund management solutions are provided with no setup costs
        or minimum entry barriers. To cover expenses, we charge a cost-leading
        0.8% AUM fee, with a 12.5% performance fee over 5% returns: we only win
        when you win, and as a nonprofit any income generated from our fees is
        reinvested to further our mission.
      </p>,
      <p className="italic">
        Grow funds securely with a nonprofit partner rather than overpaying
        for-profit third parties.
      </p>,
    ],
  },
  {
    id: 11,
    question: "Can international nonprofits and NGOs use Better Giving?",
    paragraphs: [
      <p>
        Yes, Better Giving supports charitable organizations all around the
        world. Our platform offers fiscal sponsorship to help organizations
        outside the U.S. access U.S. grants and donations while also simplifying
        tax compliance. With our global reach, you can accept donations from
        anywhere in the world in multiple currencies. As a nonprofit, we charge
        a cost-leading 2.9% for these services to keep them affordable for
        organizations of all sizes.
      </p>,
      <p className="italic">
        Global nonprofits can access U.S. funding and donors with ease.
      </p>,
    ],
  },
  {
    id: 12,
    question: "How do I ensure my donations are safe?",
    paragraphs: [
      <p>
        Better Giving is a nonprofit ourselves, committed to financial
        transparency. Our platform is integrated with trusted financial partners
        such as Fidelity Investments and is fully compliant with regulatory
        standards, ensuring that all donations are processed securely. For
        nonprofits using our savings and investment services, we offer detailed,
        transparent reporting so you always know where your funds are and how
        they are performing.
      </p>,
      <p className="italic">
        Security and transparency build trust, ensuring your donations are safe,
        and your donors feel confident.
      </p>,
    ],
  },
];
