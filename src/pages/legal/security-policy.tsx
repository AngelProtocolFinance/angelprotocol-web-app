import { APP_NAME } from "constants/env";
import { metas } from "helpers/seo";
import { Link, type MetaFunction, href } from "react-router";

export const meta: MetaFunction = () =>
  metas({ title: `Security policy - ${APP_NAME}` });

export default function SecurityPolicy() {
  return (
    <div className="xl:container xl:mx-auto px-5 min-h-screen pb-6 prose pt-24">
      <h1 className="text-center">
        <strong>{APP_NAME} Security Policy</strong>
      </h1>
      <p className="text-center">
        <em>Last updated: December 2025</em>
      </p>
      <p>
        At {APP_NAME}, safeguarding donor and member data is central to our
        mission. As a nonprofit ourselves, we treat every record with the same
        care we expect for our own. The trust of the communities we serve
        depends on it.
      </p>

      <h2>Our Commitment</h2>
      <p>
        {APP_NAME} operates as a U.S. 501(c)(3) public charity with a Candid
        Platinum Seal of Transparency. We provide donation processing, savings,
        and investment services to fellow nonprofits and faith organizations,
        and we take data protection seriously at every layer of that work.
      </p>
      <p>
        We never sell, rent, or monetize user or donor data. Information is
        collected only for legitimate operational purposes—such as completing
        donations, providing statements, and maintaining member accounts.
      </p>

      <h2>Data Security</h2>

      <h3>Hosting &amp; Infrastructure</h3>
      <p>
        We run on secure, certified cloud infrastructure: the majority of our
        application is hosted on Vercel (SOC 2 Type II + ISO 27001) with
        built-in global redundancy, while our database is hosted on Amazon Web
        Services (AWS) with SOC 1/2/3, ISO 27001, and FedRAMP Moderate
        authorisations. All systems include geographic redundancy and strict
        physical/environmental controls.
      </p>

      <h3>Encryption</h3>
      <p>
        All data is <strong>encrypted in transit (TLS 1.2+)</strong> and{" "}
        <strong>encrypted at rest (AES-256)</strong>. No plaintext card or
        banking data ever passes through or is stored on {APP_NAME} servers.
      </p>

      <h3>Access Controls</h3>
      <p>
        Staff access follows a{" "}
        <strong>least-privilege, role-based model</strong>. Multi-factor
        authentication (MFA) is required for all administrative accounts. Access
        reviews occur regularly and are logged.
      </p>

      <h3>Payment Security</h3>
      <p>
        {APP_NAME} never stores or processes raw cardholder data. All donations
        are handled by <strong>Stripe</strong>, a{" "}
        <strong>PCI DSS Level 1–certified</strong> processor. We complete the
        required <strong>PCI Self-Assessment Questionnaire A</strong> each year
        and retain Stripe's Attestation of Compliance on file.
      </p>

      <h3>Savings &amp; Investment Custody</h3>
      <p>
        Savings balances are held in <strong>FDIC-insured accounts</strong>{" "}
        (limits apply). Investment assets are custodied with regulated partners
        and protected by <strong>SIPC</strong> coverage where applicable.
      </p>

      <h3>Backups &amp; Continuity</h3>
      <p>
        Database snapshots are taken daily and stored in encrypted form across
        multiple AWS regions to protect against data loss or regional outages.
      </p>

      <h3>Incident Response</h3>
      <p>
        {APP_NAME} maintains an <strong>incident-response plan</strong> that
        includes rapid containment, root-cause analysis, and timely notification
        to affected partners in accordance with applicable law.
      </p>

      <h2>Privacy &amp; Data Use</h2>
      <ul>
        <li>
          We collect only the minimum data necessary to provide services and
          meet reporting obligations.
        </li>
        <li>
          Donor and member information is used solely for the purpose for which
          it was provided.
        </li>
        <li>
          We do <strong>not</strong> sell or exchange personal data with third
          parties.
        </li>
        <li>
          Data access is logged, monitored, and reviewed for unusual activity.
        </li>
      </ul>
      <p>
        For details on how information is collected and used, see our{" "}
        <Link to={href("/privacy-policy")}>Privacy Policy</Link>.
      </p>

      <h2>Compliance &amp; Transparency</h2>
      <ul>
        <li>
          <strong>PCI DSS 4.0 (SAQ A)</strong> — maintained through Stripe
          integration.
        </li>
        <li>
          <strong>Annual financial review</strong> — published via Form 990.
        </li>
        <li>
          <strong>Candid Platinum transparency seal</strong> — active and
          publicly viewable.
        </li>
      </ul>
    </div>
  );
}
