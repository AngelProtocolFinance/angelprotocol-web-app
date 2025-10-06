import { APP_NAME } from "constants/env";
import { metas } from "helpers/seo";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () =>
  metas({ title: "Referral Program Terms of Use" });

export default function TermsReferrals() {
  return (
    <div className="xl:container xl:mx-auto px-5 prose lg:prose-lg py-20">
      <h2 className="text-center">{APP_NAME} Referral Program Terms of Use</h2>
      <p>
        <strong>Effective Date:</strong> May 21, 2025
      </p>
      <p>
        These Referral Program Terms of Use ("Terms") govern your participation
        in the {APP_NAME} Referral Program (the "Program"), offered by Better
        Giving, Inc., a Delaware nonprofit organization recognized as tax-exempt
        under IRC 501(c)(3) ("{APP_NAME}", "we", or "us").
      </p>
      <ol>
        <li>
          <h3>Program Overview</h3>
          <p>
            The Program allows eligible users of {APP_NAME} to earn rewards by
            referring nonprofit organizations to {APP_NAME}. By participating in
            the Program, you agree to these Terms, as well as
            {APP_NAME}'s General Terms of Use and Privacy Policy.
          </p>
        </li>
        <li>
          <h3>Eligibility</h3>
          <p>
            The Program is open to individuals and organizations who have an
            active {APP_NAME} account and are in good standing. Participation is
            subject to {APP_NAME}'s discretion.
          </p>
        </li>
        <li>
          <h3>How Referral Rewards Work</h3>
          <p>
            If a nonprofit signs up for {APP_NAME} using your referral link or
            code, and begins accepting donations via {APP_NAME}, you will earn a
            referral reward equal to 30% of the platform revenue generated from
            that nonprofit for a period of three (3) years.
          </p>
          <p>Platform revenue is defined as:</p>
          <ul>
            <li>
              Voluntary donor contributions to {APP_NAME} (default model), or
            </li>
            <li>
              A flat 1.5% platform fee if the nonprofit opts out of donor
              contributions.
            </li>
          </ul>
          <p>
            {APP_NAME} uses a first-click attribution model and tracks referrals
            via:
          </p>
          <ul>
            <li>Your unique referral link or code</li>
            <li>A 90-day cookie window</li>
            <li>Manual attribution upon review by {APP_NAME}</li>
          </ul>
        </li>
        <li>
          <h3>Payment Terms</h3>
          <p>
            Referral payments are calculated monthly and issued after a 30-day
            hold to account for refunds and chargebacks. You must submit a valid
            W-9 (U.S.) or W-8BEN (non-U.S.) before any payments can be made.
            Referral earnings are subject to a minimum payout threshold of $25.
            U.S.-based referrers will receive a 1099-MISC if earnings exceed
            $600 in a calendar year.
          </p>
        </li>
        <li>
          <h3>Annual Earnings Cap</h3>
          <p>
            To comply with nonprofit regulatory and reasonable compensation
            guidelines, the total amount of referral rewards paid to any one
            participant shall not exceed $100,000 in any 12-month period. This
            cap applies regardless of the number of referred nonprofits or
            platform revenue generated.
          </p>
        </li>
        <li>
          <h3>Prohibited Conduct</h3>
          <p>Participants must not:</p>
          <ul>
            <li>Use spam, bots, or misleading marketing</li>
            <li>Misrepresent {APP_NAME}</li>
            <li>{`Use paid search targeting ${APP_NAME} brand keywords`}</li>
          </ul>
          <p>
            Violation of these terms may result in forfeiture of earnings and
            removal from the Program.
          </p>
        </li>
        <li>
          <h3>No Guarantee of Acceptance</h3>
          <p>
            {APP_NAME} reserves full discretion to accept or reject any referred
            nonprofit. Participation in the Program does not constitute
            employment, partnership, or agency.
          </p>
        </li>
        <li>
          <h3>Confidentiality</h3>
          <p>
            You may receive confidential or proprietary information during the
            course of your participation. You agree not to disclose or use any
            such information outside the scope of the Program.
          </p>
        </li>
        <li>
          <h3>Termination</h3>
          <p>
            {APP_NAME} may suspend or terminate your participation at any time,
            for any reason, including abuse of the Program. Termination will not
            affect any referral rewards already earned through the termination
            date, unless such earnings were obtained in violation of these
            Terms.
          </p>
        </li>
        <li>
          <h3>Modifications</h3>
          <p>
            {APP_NAME} reserves the right to modify these Terms at any time.
            Continued participation after any changes constitutes acceptance of
            the new Terms.
          </p>
        </li>
        <li>
          <h3>Governing Law</h3>
          <p>These Terms are governed by the laws of the State of Delaware.</p>
        </li>
      </ol>
    </div>
  );
}
