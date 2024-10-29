import Seo from "components/Seo";
import { appRoutes } from "constants/routes";
import type { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
const U = ({ children }: PropsWithChildren) => (
  <span className="underline">{children}</span>
);
export function Component() {
  return (
    <main className="prose lg:prose-lg padded-container py-20">
      <Seo title="Terms of use (donor)" />
      <i className="text-navy-l1 text-right block">
        Effective October 25, 2024
      </i>
      <h2 className="text-center">
        Donor <br /> Terms of Use
      </h2>

      <p>
        These Terms of Use (the “<b>Terms</b>”) are a binding contract (“
        <b>Agreement</b>”) by and between you (“<b>you.</b>” “<b>your,</b>” or “
        <b>Donors</b>”) and <b>Better Giving</b>, Inc. (“Better Giving,” “
        <b>we</b>,” “<b>us</b>,” or “<b>our</b>”). Better Giving is a public
        charity recognized by the Internal Revenue Service (the “IRS”) under
        Section 501(c)(3) of the Internal Revenue Code (Federal Tax ID #
        87-3758939).
      </p>
      <p>
        Better Giving provides and offers a charitable giving platform (the “
        <b>Platform</b>”) which enables Donors to make charitable contributions
        to Better Giving and make grant recommendations to qualified nonprofit
        organization(s) (“<b>NPOs</b>”) on the Platform to advance their
        missions. Better Giving accepts contributions of fiat currency,
        cryptocurrency and securities from Donors on the Platform and makes
        charitable grants to NPOs.
      </p>
      <p>
        In furtherance of its charitable mission, Better Giving (1) receives
        donations from Donors and makes follow-on grants to NPOs based upon
        Donor recommendations; (2) provides fiscal sponsorship services to
        qualifying NPOs, and accepts donations and grants on their behalf; and
        (3) maintains and manages a board designated endowment fund (or
        quasi-endowment) (hereinafter the “<b>Fund</b>”) to support NPOs with
        sustainable grant funding, at Better Giving’s sole discretion.
      </p>
      <p>
        By making donations to Better Giving, you acknowledge and represent that
        you (i) agree that these Terms are supported by reasonable, valuable and
        sufficient consideration, (ii) acknowledge the receipt of such
        consideration, and (iii) state that you have read and understand, and
        agree to be bound by these Terms.
      </p>
      <p>
        We may revise and update these Terms from time to time at our sole
        discretion. All changes are effective immediately when posted.
      </p>
      <p>
        The headings and subheadings are for reference only and do not limit the
        terms or application of the applicable section. Your trust is very
        important to us. If you have questions about this Agreement, please
        email support@better.giving.
      </p>
      <ol>
        <li>
          <h3>Terms and Conditions for Donations</h3>
          <ol className="list-[lower-alpha]">
            <li>
              <b>Control of Funds</b>. By making a donation, you understand,
              acknowledge and agree that you are making a charitable donation to
              Better Giving, a public charity recognized by the Internal Revenue
              Service as a tax-exempt organization under Internal Revenue Code
              501(c)(3). You understand, acknowledge and agree that all
              donations made to Better Giving are irrevocable, unrestricted and
              non-refundable charitable contributions and that Better Giving has
              full and exclusive legal control over any and all donated funds or
              assets.
            </li>
            <li>
              <b>Authority</b>. By making a donation to Better Giving, you
              hereby represent and warrant that you have the legal authority to
              make a donation and that any and all funds or assets donated to
              Better Giving belong to you and are free and clear of any and all
              encumbrances. Better Giving will provide you with a receipt for
              your donation in accordance with applicable tax laws.
            </li>
            <li>
              <b>Donation Frequency</b>. When you make a donation on the
              Platform, you may do so by either making a one-time donation, or
              by making a recurring donation. If you would like to stop your
              recurring donation, you may do so at any time by logging into the
              Platform and adjusting your donation settings. In the event you
              are making a recurring donation to support an NPO that is no
              longer eligible to receive grants from Better Giving, we will
              issue notification to you and provide the option to either
              recommend another NPO to support with your donations or halt your
              recurring donation.
            </li>
            <li>
              <b>Compliance</b>. All donations made to Better Giving must comply
              with Better Giving’s Gift Acceptance Policy, and Better Giving
              reserves the right in its sole discretion to deny any gift or
              donation made on the Platform. By making a donation to Better
              Giving, you represent and warrant that you are not a restricted
              individual or entity as identified by the Office of Foreign Assets
              Control (OFAC).
            </li>
            <li>
              <b>Grant Recommendations</b>: When you make a donation to Better
              Giving, you may recommend a specific qualified NPO to be supported
              by your donation to Better Giving.{" "}
              <U>
                We retain the ultimate authority and discretion to approve and
                disburse any grants in accordance with this Agreement and any
                applicable laws and regulations.
              </U>
            </li>
            <li>
              <b>NPO Eligibility and Variance Power</b>. On an ongoing basis, we
              will take steps to confirm that each NPO you make grant
              recommendations to, is registered as a public charity in good
              standing under Section 501(c)(3) of the Internal Revenue Code or
              in the case of non-US organizations, recognized as the equivalent
              of a charitable organization by the appropriate regulatory and/or
              governmental agencies in the relevant jurisdiction. If
              circumstances make it impossible or inappropriate to disburse
              funds to the recommended charitable organization, we may, at our
              sole discretion, select an alternate charitable organization to
              receive the grant. You acknowledge that the ultimate discretion in
              fulfilling a grant recommendation rests with Better Giving.
            </li>
            <li>
              <b>Donor Fees</b>. NPOs may elect to have Donor Fees set as either
              (1) an optional donation to Better Giving at the Donor’s sole
              discretion; or (2) a flat 1.5% fee on all donations made. There
              may be additional transaction fees for donations of
              cryptocurrency, over which Better Giving has no control.
            </li>
            <li>
              <b>Charitable Use</b>. Donations made to Better Giving may only be
              used for charitable purposes in accordance with any and all
              applicable local, state, federal or national laws. In compliance
              with the Internal Revenue Code, grants are not permitted to
              individuals; for non-charitable purposes; for political purposes
              or to support political campaign activities; or for any purpose
              that would provide benefits, goods or services to Donors or other
              related parties.
            </li>
          </ol>
        </li>
        <li>
          <h3>NPO Grant and Investment Options.</h3>
          <p>
            As part of the functionality of the Platform and the services we
            provide to NPOs in furtherance of our charitable mission, all NPOs
            have the ability to make certain recommendations for all donations
            contributed to Better Giving for their support. Specifically, NPOs
            may make recommendations from the following allocation options, or
            any combination thereof.
          </p>
          <ol className="list-[lower-alpha]">
            <li>
              <b>Donation for Immediate Grant</b> (“Grant”). Donations allocated
              for Grant are granted to the NPO on a monthly basis at the
              discretion of Better Giving.
            </li>
            <li>
              <b>Money-Market</b> (“Savings”). Donations allocated to Savings
              are maintained in a money-market account to accrue interest until
              the NPO makes a grant request (“Withdrawal”) to Better Giving.
              Unless a different investment recommendation is made by NPO, all
              donations are automatically allocated to Savings.
            </li>
            <li>
              <b>Sustainability Fund</b> (“Investment”). Donations allocated to
              Investment are maintained in the Better Giving Sustainability Fund
              and are invested per Better Giving’s Investment Policy. Assets in
              the Fund are unrestricted contributions and per the Investment
              Policy both principal and income are available for expenditure by
              Better Giving. Although we view contributions in the Fund as
              long-term investments with principal remaining intact to support
              NPO’s in furtherance of our mission, we also believe in an NPO’s
              right to organizational autonomy and allow for Withdrawal at the
              discretion of Better Giving.
            </li>
          </ol>
        </li>
        <li>
          <h3>Privacy</h3>
          <p>
            Your personally identifiable information (“PII”), including your
            name, email address and physical address will be handled in
            accordance with our{" "}
            <Link to={appRoutes.privacy_policy}>Privacy Policy</Link>, and
            unless you have elected to donate anonymously, may be shared with
            the NPO(s). We use commercially reasonable safeguards to preserve
            the integrity and security of your PII. However, we cannot guarantee
            that unauthorized third parties will never be able to obtain or use
            your PII or aggregate data for improper purposes. You acknowledge
            that you provide your PII and aggregate data at your own risk.
          </p>
        </li>
        <li>
          <h3>Indemnity, Warranties and Disclaimers.</h3>
          <ol className="list-[lower-alpha]">
            <li>
              You agree to indemnify, hold harmless, and, defend Better Giving
              and its affiliates and each of its and their officers, directors,
              employees, licensees, agents and vendors from and against all
              claims, costs, losses, damages, expenses (including attorneys’
              fees and court costs) and liabilities arising from (i) your use of
              our services, or activities in connection with making donations in
              accordance with these Terms; or (ii) your violations of these
              Terms. Better Giving reserves the right to assume the exclusive
              defense and control of any matter otherwise subject to
              indemnification by you and, in such case, you agree to cooperate
              with Better Giving’ defense of such claim.
            </li>
            <li>
              YOU ACKNOWLEDGE THAT OUR PERFORMANCE HEREUNDER IS PROVIDED ON AN
              “AS IS” BASIS, AND WE DISCLAIM ALL REPRESENTATIONS AND WARRANTIES
              UNDER THIS AGREEMENT, WHETHER EXPRESS, IMPLIED OR STATUTORY. WE
              MAKE NO REPRESENTATIONS OR WARRANTIES REGARDING ANY LEGAL
              REQUIREMENTS TO WHICH YOU MAY BE SUBJECT; NOR DO WE MAKE ANY
              REPRESENTATIONS OR WARRANTIES REGARDING THE APPLICABILITY OF TAX
              LAWS TO ANY DONOR, SUCH AS, BY WAY OF EXAMPLE, ANY DONOR’S ABILITY
              TO OBTAIN TAX DEDUCTIONS OR OTHER TAX BENEFITS IN CONNECTION WITH
              DONATIONS MADE TO BETTER GIVING.
            </li>
          </ol>
        </li>
        <li>
          <h3 className="inline">No Professional Advice</h3>. Before you make
          any financial, legal, or other decisions regarding any donations made
          to Better Giving and any tax deductions you may be eligible for, you
          should seek independent professional advice from an individual who is
          licensed and qualified in the area for which such advice would be
          appropriate. We do not offer any tax or legal advice. Please consider
          working with a tax professional, account and/or attorney to address
          any questions you may have concerning the impact of using the Platform
          to make donations. You agree and acknowledge that it is your
          responsibility to consult with any tax professionals regarding the
          deductibility and tax consequences of any donation(s) made to Better
          Giving.
        </li>
        <li>
          <h3>Miscellaneous Terms and Conditions</h3>
          <ol className="list-[lower-alpha]">
            <li>
              Should any provision of this Agreement be held by a court or other
              tribunal of competent jurisdiction to be void, illegal, invalid,
              inoperative, or unenforceable, the remaining provisions of this
              Agreement shall not be affected and shall continue in effect, and
              the invalid provision shall be deemed modified to the least degree
              necessary to remedy such invalidity.
            </li>
            <li>
              Our failure to partially or fully exercise any right will not be
              considered a waiver of that right unless we so state in writing to
              you. The waiver of any breach, shall not prevent a subsequent
              exercise of such right or be deemed a waiver of any subsequent
              breach of the same or any other term of this Agreement. Any
              remedies made available to us by the terms of this Agreement are
              cumulative and are without prejudice to any other remedies that
              may be available to us in law or equity.
            </li>
            <li>
              <b>Dispute Resolution</b>. Any dispute between you and Better
              Giving which cannot be resolved by negotiation shall be submitted
              to mediation or arbitration, under the rules of the American
              Arbitration Association (“AAA”) or any entity that you and we may
              subsequently agree upon in writing. Any arbitration award issued
              by the arbitrator shall be final, binding, and enforceable in any
              court of competent jurisdiction. Notwithstanding the foregoing,
              you acknowledge that unauthorized use of our proprietary
              materials, information or technology may cause irreparable harm to
              Better Giving for which monetary damages would be an inadequate
              remedy. Accordingly, we have the right, without the necessity of
              posting bond, to seek injunctive or other equitable relief from
              any court of competent jurisdiction to protect our rights in
              intellectual property or confidential information.
            </li>
            <li>
              <b>Governing Law.</b> This Agreement will be governed by and
              construed in accordance with the substantive laws of the State of
              Delaware without regard to conflicts of laws and all disputes
              arising under and relating to this Agreement shall be brought and
              resolved exclusively in the State of Delaware.
            </li>
          </ol>
        </li>
      </ol>
    </main>
  );
}
