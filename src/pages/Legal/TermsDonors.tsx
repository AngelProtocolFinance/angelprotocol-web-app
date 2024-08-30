import { appRoutes } from "constants/routes";
import type { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

const B = ({ children }: PropsWithChildren) => (
  <span className="font-bold">{children}</span>
);
const I = ({ children }: PropsWithChildren) => (
  <span className="italic">{children}</span>
);
const U = ({ children }: PropsWithChildren) => (
  <span className="underline">{children}</span>
);

export function Component() {
  return (
    <div className="padded-container min-h-screen pb-6">
      <p className="text-sm text-right mb-6 mt-16 italic">
        Effective August 30, 2024
      </p>
      <h1 className="text-center font-bold col-span-full text-2xl lg:text-3xl break-words mt-4">
        Donor
      </h1>
      <h2 className="text-center text-xl mt-4">Terms of Use</h2>

      <section className="pt-8">
        <p className="pt-5">
          These Terms of Use (the "{<B>Terms</B>}") are a binding contract ("
          {<B>Agreement</B>}") by and between you ("{<B>you.</B>}" "
          {<B>your,</B>}" or "{<B>Donors</B>}") and Altruistic Partners
          Empowering Society, Inc., d/b/a Better Giving ("{<B>Better Giving</B>}
          ," "{<B>we</B>}," "{<B>us,</B>}" or "{<B>our</B>}"). Better Giving is
          a public charity recognized by the Internal Revenue Service (the "
          {<B>IRS</B>}") under Section 501(c)(3) of the Internal Revenue Code
          (Federal Tax ID # 87-3758939).
        </p>
        <p className="pt-5">
          Better Giving provides and offers a charitable giving platform (the "
          {<B>Platform</B>}") which enables Donors to make charitable
          contributions to Better Giving and make grant recommendations to
          qualified nonprofit organization(s) ("{<B>NPOs</B>}") on the Platform
          to advance their missions. Better Giving accepts contributions of fiat
          currency, cryptocurrency and securities from Donors on the Platform
          and makes charitable grants to NPOs.
        </p>
        <p className="pt-5">
          In furtherance of its charitable mission, Better Giving (1) receives
          donations from Donors and makes follow-on grants to NPO's based upon
          Donor recommendations; (2) provides fiscal sponsorship services to
          qualifying NPOs, and accepts donations and grants on their behalf; and
          (3) maintains and manages a board designated endowment fund (or
          quasi-endowment) (hereinafter the "{<B>Fund</B>}") to accept
          unrestricted donations from Donors, to support NPOs with sustainable
          grant funding, at Better Giving's sole discretion.
        </p>
        <p className="pt-5">
          By making donations to Better Giving, you acknowledge and represent
          that you (i) agree that these Terms are supported by reasonable,
          valuable and sufficient consideration, (ii) acknowledge the receipt of
          such consideration, and (iii) state that you have read and understand,
          and agree to be bound by these Terms.
        </p>
        <p className="pt-5">
          We may revise and update these Terms from time to time at our sole
          discretion. All changes are effective immediately when posted.
        </p>
        <p className="pt-5">
          The headings and subheadings are for reference only and do not limit
          the terms or application of the applicable section. Your trust is very
          important to us. If you have questions about this Agreement, please
          email support@better.giving.
        </p>
      </section>
      <section className="pt-8">
        <h2 className="text-2xl">
          <B>1. Terms and Conditions for Donations</B>
        </h2>
        <p className="pt-5 indent-6">
          <B>a. Control of Funds</B>. By making a donation, you understand,
          acknowledge and agree that you are making a charitable donation to
          Better Giving, a public charity recognized by the Internal Revenue
          Service as a tax-exempt organization under Internal Revenue Code
          501(c)(3). You understand, acknowledge and agree that all donations
          made to Better Giving are irrevocable, unrestricted and non-refundable
          charitable contributions and that Better Giving has full and exclusive
          legal control over any and all donated funds or assets.
        </p>
        <p className="pt-5 indent-6">
          <B>b. Authority</B>. By making a donation to Better Giving, you hereby
          represent and warrant that you have the legal authority to make a
          donation and that any and all funds or assets donated to Better Giving
          belong to you and are free and clear of any and all encumbrances.
          Better Giving will provide you with a receipt for your donation in
          accordance with applicable tax laws.
        </p>
        <p className="pt-5 indent-6">
          <B>c. Compliance</B>. All donations made to Better Giving must comply
          with Better Giving's Gift Acceptance Policy, and Better Giving
          reserves the right in its sole discretion to deny any gift or donation
          made on the Platform. By making a donation to Better Giving, you
          represent and warrant that you are not a restricted individual or
          entity as identified by the Office of Foreign Assets Control (OFAC).
        </p>
        <p className="pt-5 indent-6">
          <B>d. Donation Options</B>: When you make a donation to Better Giving,
          you may either (i) recommend a specific qualified NPO to receive a
          one-time grant from Better Giving, or (ii) may direct your
          contribution to the Fund and recommend an NPO to be supported by the
          principal of your contribution in perpetuity.{" "}
          <U>
            Better Giving retains the ultimate authority and discretion to
            approve and disburse any grants in accordance with this Agreement
            and any applicable laws and regulations.
          </U>
        </p>
        <p className="pl-12 pt-2 indent-6">
          i. <I>Donation for Immediate Grant</I>. You may make a one-time
          donation to Better Giving and recommend an NPO to receive a grant from
          Better Giving, which will be disbursed to the NPO on a rolling basis.
        </p>
        <p className="pl-12 pt-2 indent-6">
          ii. <I>Donation to the Fund</I>. You may direct your charitable
          contribution to the Fund, which is a board designated endowment
          created and maintained by Better Giving to support NPOs in perpetuity.
          When making contributions to the Fund, Donors may recommend NPOs to be
          supported by income generated from the principal of their
          contribution(s) in perpetuity, with grant disbursements issued to NPOs
          on a quarterly basis. All contributions made by Donors to the Fund are
          unrestricted contributions and Donors understand that both principal
          and income are available for expenditure by Better Giving at the
          discretion of its board of directors. Although the Fund allows for the
          withdrawal of principal, the Better Giving board of directors views
          contributions to the Fund as long term investments with principal
          remaining intact to support NPOs, as part of Better Giving's
          charitable mission.
        </p>
        <p className="pt-5 indent-6">
          <B>e. NPO Eligibility</B>. On an ongoing basis, we will take steps to
          confirm that each NPO you make grant recommendations to, is registered
          as a public charity in good standing under Section 501(c)(3) of the
          Internal Revenue Code or in the case of non-US organizations,
          recognized as the equivalent of a charitable organization by the
          appropriate regulatory and/or governmental agencies in the relevant
          jurisdiction. If circumstances make it impossible or inappropriate to
          disburse funds to the recommended charitable organization, we may, at
          our sole discretion, select an alternate charitable organization to
          receive the grant. You acknowledge that the ultimate discretion in
          fulfilling a grant recommendation rests with Better Giving.
        </p>
        <p className="pt-5 indent-6">
          <B>f. Donor Fees:</B>
        </p>
        <p className="pl-16 pt-2">
          i. NPOs may elect to have Donor Fees set as either (1) an optional
          donation to Better Giving at the Donor's sole discretion; or (2) a
          flat 1.5% fee on all donations made. There may be additional
          transaction fees for donations of cryptocurrency, over which Better
          Giving has no control.
        </p>
        <p className="pl-16 pt-2">
          ii. Better Giving provides fiscal sponsorship services to certain
          qualified NPOs and charitable projects. Donors making contributions to
          Better Giving to support fiscally sponsored NPO's are charged a 2.9%
          fee.
        </p>
        <p className="pt-5 indent-6">
          <B>g. Fund Management Fees</B>. Better Giving maintains a fee
          structure for the operation and maintenance of the Fund, as follows:
          (1) Assets Under Management Fee assessed quarterly equal to .2125% of
          the Fund balance; and (2) Annual Performance Fee equal to 12.5% over a
          5% hurdle rate.
        </p>
        <p className="pt-5 indent-6">
          <B>h. Charitable Use</B>. Donations made to Better Giving may only be
          used for charitable purposes in accordance with any and all applicable
          local, state, federal or national laws. Any grant recommendations may
          not confer an impermissible private benefit.
        </p>
      </section>
      <section className="pt-8">
        <h2 className="text-2xl">
          <B>2. Privacy.</B>
        </h2>
        <p className="pt-5">
          Your personally identifiable information ("{<B>PII</B>}"), including
          your name, email address and physical address will be handled in
          accordance with our{" "}
          <Link
            to={appRoutes.privacy_policy}
            className="hover:text-blue-d1 text-blue"
          >
            Privacy Policy
          </Link>
          , and unless you have elected to donate anonymously, may be shared
          with the NPO(s). We use commercially reasonable safeguards to preserve
          the integrity and security of your PII. However, we cannot guarantee
          that unauthorized third parties will never be able to obtain or use
          your PII or aggregate data for improper purposes. You acknowledge that
          you provide your PII and aggregate data at your own risk.
        </p>
      </section>
      <section className="pt-8">
        <h2 className="text-2xl">
          <B>3. Indemnity, Warranties and Disclaimers</B>.
        </h2>
        <p className="pt-5 indent-6">
          <B>a.</B> You agree to indemnify, hold harmless, and, defend Better
          Giving and its affiliates and each of its and their officers,
          directors, employees, licensees, agents and vendors from and against
          all claims, costs, losses, damages, expenses (including attorneys'
          fees and court costs) and liabilities arising from (i) your use of our
          services, or activities in connection with making donations in
          accordance with these Terms; or (ii) your violations of these Terms.
          Better Giving reserves the right to assume the exclusive defense and
          control of any matter otherwise subject to indemnification by you and,
          in such case, you agree to cooperate with Better Giving' defense of
          such claim.
        </p>
        <p className="pt-5 indent-6">
          <B>b.</B> YOU ACKNOWLEDGE THAT OUR PERFORMANCE HEREUNDER IS PROVIDED
          ON AN "AS IS" BASIS, AND WE DISCLAIM ALL REPRESENTATIONS AND
          WARRANTIES UNDER THIS AGREEMENT, WHETHER EXPRESS, IMPLIED OR
          STATUTORY. WE MAKE NO REPRESENTATIONS OR WARRANTIES REGARDING ANY
          LEGAL REQUIREMENTS TO WHICH YOU MAY BE SUBJECT; NOR DO WE MAKE ANY
          REPRESENTATIONS OR WARRANTIES REGARDING THE APPLICABILITY OF TAX LAWS
          TO ANY DONOR, SUCH AS, BY WAY OF EXAMPLE, ANY DONOR'S ABILITY TO
          OBTAIN TAX DEDUCTIONS OR OTHER TAX BENEFITS IN CONNECTION WITH
          DONATIONS MADE TO BETTER GIVING.
        </p>
      </section>
      <section className="pt-8">
        <h2 className="text-2xl">
          <B>4. No Professional Advice.</B>
        </h2>
        <p className="pt-5">
          Before you make any financial, legal, or other decisions regarding any
          donations made to Better Giving and any tax deductions you may be
          eligible for, you should seek independent professional advice from an
          individual who is licensed and qualified in the area for which such
          advice would be appropriate. We do not offer any tax or legal advice.
          Please consider working with a tax professional, account and/or
          attorney to address any questions you may have concerning the impact
          of using the Platform to make donations. You agree and acknowledge
          that it is your responsibility to consult with any tax professionals
          regarding the deductibility and tax consequences of any donation(s)
          made to Better Giving.
        </p>
      </section>
      <section className="pt-8">
        <h2 className="text-2xl">
          <B>5. Miscellaneous Terms and Conditions</B>
        </h2>
        <p className="pt-5 indent-6">
          <B>a.</B> Should any provision of this Agreement be held by a court or
          other tribunal of competent jurisdiction to be void, illegal, invalid,
          inoperative, or unenforceable, the remaining provisions of this
          Agreement shall not be affected and shall continue in effect, and the
          invalid provision shall be deemed modified to the least degree
          necessary to remedy such invalidity.
        </p>
        <p className="pt-5 indent-6">
          <B>b.</B> Our failure to partially or fully exercise any right will
          not be considered a waiver of that right unless we so state in writing
          to you. The waiver of any breach, shall not prevent a subsequent
          exercise of such right or be deemed a waiver of any subsequent breach
          of the same or any other term of this Agreement. Any remedies made
          available to us by the terms of this Agreement are cumulative and are
          without prejudice to any other remedies that may be available to us in
          law or equity.
        </p>
        <p className="pt-5 indent-6">
          <B>c. Dispute Resolution</B>. Any dispute between you and Better
          Giving which cannot be resolved by negotiation shall be submitted to
          mediation or arbitration, under the rules of the American Arbitration
          Association ("{<B>AAA</B>}") or any entity that you and we may
          subsequently agree upon in writing. Any arbitration award issued by
          the arbitrator shall be final, binding, and enforceable in any court
          of competent jurisdiction. Notwithstanding the foregoing, you
          acknowledge that unauthorized use of our proprietary materials,
          information or technology may cause irreparable harm to Better Giving
          for which monetary damages would be an inadequate remedy. Accordingly,
          we have the right, without the necessity of posting bond, to seek
          injunctive or other equitable relief from any court of competent
          jurisdiction to protect our rights in intellectual property or
          confidential information.
        </p>
        <p className="pt-5 indent-6">
          <B>d. Governing Law.</B> This Agreement will be governed by and
          construed in accordance with the substantive laws of the State of
          Delaware without regard to conflicts of laws and all disputes arising
          under and relating to this Agreement shall be brought and resolved
          exclusively in the State of Delaware.
        </p>
      </section>
    </div>
  );
}
