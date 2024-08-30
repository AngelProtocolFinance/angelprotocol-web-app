import { appRoutes } from "constants/routes";
import type { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

const B = ({ children }: PropsWithChildren) => (
  <span className="font-bold">{children}</span>
);
const U = ({ children }: PropsWithChildren) => (
  <span className="underline">{children}</span>
);

export function Component() {
  return (
    <div className="padded-container min-h-screen pb-6 pt-8 grid gap-y-4">
      <p className="text-navy-l1 text-sm italic text-right">
        Effective August 30, 2024
      </p>
      <h2 className="text-center">
        <span className="block">Better Giving</span>
        <span className="block">Nonprofit Organization</span>
        <span>Terms of Use</span>
      </h2>

      <p>
        These Terms of Use (the “<B>Terms</B>”) are a binding contract (“
        <B>Agreement</B>”) by and between you and Altruistic Partners Empowering
        Society, Inc., d/b/a Better Giving (“<B>Better Giving</B>,” “<B>we</B>,”
        “<B>us</B>,” or “<B>our</B>”). Better Giving is a public charity
        recognized by the Internal Revenue Service (the “<B>IRS</B>”) under
        Section 501(c)(3) of the Internal Revenue Code (Federal Tax ID #
        87-3758939). Better Giving provides and offers a charitable giving
        platform (the “<B>Platform</B>”) through which we accept and receive
        charitable contributions from donors (“<B>Donors</B>”) and make grants
        to qualified participating nonprofit organizations (“<B>NPOs</B>”, “
        <B>you</B>” or “<B>your</B>”) to advance their charitable missions. The
        Platform enables Donors to make donations of fiat currency,
        cryptocurrencies and securities, and make grant recommendations to NPOs.
      </p>

      <p>
        In furtherance of its charitable mission, Better Giving (1) receives
        donations from Donors and makes follow-on grants to NPO’s based upon
        Donor recommendations; (2) provides fiscal sponsorship services to
        qualifying NPOs, and accepts donations and grants on their behalf; and
        (3) maintains and manages a board designated endowment fund (or
        quasi-endowment) (hereinafter the “<B>Fund</B>”) to accept unrestricted
        donations from Donors, to support NPOs with sustainable grant funding,
        at Better Giving’s sole discretion. Please read this Agreement carefully
        as these Terms explain our commitments to you and our requirements of
        you as a NPO.
      </p>

      <p>
        By using the Platform and/or registering your account, you acknowledge
        and represent that you are at least eighteen (18) years of age and have
        read, understand and agree to be bound by the Terms. If you are agreeing
        to these Terms on behalf of an organization or legal entity, you
        represent and warrant that you are authorized to agree to these Terms on
        that organization’s or entity’s behalf and bind them to these Terms (in
        which case, the references to “you” and “your'' in these Terms, except
        for in this sentence, refer to that organization or entity). You further
        represent that you have the full authority to enter into and comply with
        the Terms of this Agreement and have obtained the required
        organizational approval to use the Platform. You further represent that
        your access and use of the Platform will fully comply with all
        applicable laws and regulations, as well as any and all internal
        policies, including but not limited to, gift acceptance, investment and
        fundraising policies. You agree that you will not access or use the
        Platform to conduct, execute, promote, or otherwise engage in any
        illegal activity.
      </p>

      <p>
        We may revise and update these Terms from time to time in our sole
        discretion. All changes are effective immediately when we post them.
      </p>

      <p>
        Your continued use of the Platform following the posting of revised
        Terms means that you accept and agree to the changes. You are expected
        to check this page from time to time so you are aware of any changes, as
        they are binding on you.
      </p>

      <p>
        The headings and subheadings are for reference only and do not limit the
        terms or application of the applicable section. Your trust is very
        important to us. If you have questions about this Agreement please
        contact, support@better.giving.
      </p>

      <ol type="1" className="list-inside mt-4 grid gap-y-4">
        <li>
          <B>1. Our relationship with You</B>
          <ol
            type="a"
            className="list-inside pl-6 indent-4 mt-2 grid gap-y-2 [&>li]:first-letter:font-bold"
          >
            <li>
              a. We register vetted NPOs and provide information about them to
              Donors that are interested in donating assets to Better Giving and
              disburse grants to NPOs based on grant recommendations made by
              Donors.
            </li>
            <li>
              b. We accept donations of fiat currency, securities,
              cryptocurrency and digital assets to make grants to NPOs. When
              Donors donate to Better Giving, they may either (i) recommend a
              specific qualified NPO to receive a one-time grant from Better
              Giving, or (ii) may direct their contribution to the Fund and
              recommend an NPO to be supported by the principal of that
              contribution in perpetuity.
              <U>
                Better Giving retains the ultimate authority and discretion to
                approve and disburse any grants in accordance with this
                Agreement and any applicable laws and regulations.
              </U>
              <ol className="list-inside pl-8 indent-4 mt-4 grid gap-y-4">
                <li>
                  1. <U>Donation for Immediate Grant</U>. Donors may make a
                  one-time donation to the Better Giving Fund and recommend an
                  NPO to receive a grant from Better Giving, which will be
                  disbursed to the NPO on a rolling basis.
                </li>
                <li>
                  2. <U>Donation to the Fund</U>. Donors may direct their
                  charitable contribution to the Fund, which is a board
                  designated endowment created and maintained by Better Giving
                  to support NPOs in perpetuity. When making contributions to
                  the Fund, Donors may recommend NPOs to be supported by income
                  generated from the principal of their contribution(s) in
                  perpetuity, with grant disbursements issued to NPOs on a
                  quarterly basis. All contributions made by Donors to the Fund
                  are unrestricted contributions and Donors understand that both
                  principal and income are available for expenditure by Better
                  Giving at the discretion of its board of directors. Although
                  the Fund allows for the withdrawal of principal, the Better
                  Giving board of directors views contributions to the Fund as
                  long term investments with principal remaining intact to
                  support NPOs, as part of Better Giving’s charitable mission.
                </li>
              </ol>
            </li>
            <li>
              c. We facilitate the issuance of tax receipts showing the donation
              transaction between the Donor and Better Giving. It is the sole
              responsibility of the Donor to ensure that their contribution
              qualifies for tax relief, if tax relief is sought, as permitted by
              applicable tax law.
            </li>
          </ol>
        </li>
        <li>
          <B>2. Grant Eligibility</B>
          <ol
            type="a"
            className="list-inside pl-6 indent-4 mt-2 grid gap-y-2 [&>li]:first-letter:font-bold"
          >
            <li>
              a. We take steps to confirm that each NPO is a qualified nonprofit
              organization in good standing.
              <ol className="list-inside pl-8 indent-4 mt-4 grid gap-y-4">
                <li>
                  1. <U>US Charities</U>. If you are legally registered in the
                  United States, we take steps to confirm that you are
                  recognized by the Internal Revenue Service as exempt from
                  federal income tax under Internal Revenue Code 501(c)(3), and
                  have public charity status under section 509(a)(1) or
                  509(a)(2), and that such recognition is not currently revoked.{" "}
                </li>
                <li>
                  2. <U>Non-US Charities</U>. If you are legally registered
                  outside of the United States, we take steps to confirm that
                  you are recognized as the equivalent of the charitable
                  organization by the relevant regulatory and/or governmental
                  agencies in your jurisdiction, and that such recognition is
                  not currently revoked. If you are registered outside of the
                  United States and wish to receive grants from Better Giving,
                  you are required to enter into and comply with the terms and
                  conditions of the Fiscal Sponsorship and Grant Agreement,
                  which is incorporated by reference herein. In the event that
                  there is any conflict between this Agreement and any term or
                  condition in the Fiscal Sponsorship and Grant Agreement, the
                  Fiscal Sponsorship and Grant Agreement shall control.
                </li>
                <li>
                  3. You must promptly update and notify us in case of any
                  changes to your status as a NPO, and/or if the Internal
                  Revenue Service or any state, local or national government
                  agency initiates an inquiry into your status. You agree to
                  provide any information that we may reasonably request related
                  to your status as a NPO. NPOs may be required to submit
                  information to us which allows us to validate their continued
                  eligibility to use the Platform. We reserve the right to deny
                  or revoke NPO status to any organization that fails, in our
                  sole discretion and determination, to meet these standards.
                </li>
              </ol>
            </li>
            <li>
              b. To be eligible to receive grants from us you must provide us
              with information which includes, but is not limited to the
              following:
              <ol className="list-inside pl-8 indent-4 mt-4 grid gap-y-4">
                <li>
                  1. Your organization’s current legal name (or d/b/a) and, if
                  you have one, an electronic version of your logo that meets
                  our technical requirements;
                </li>
                <li>
                  2. A written statement that describes your charitable
                  purposes;
                </li>
                <li>
                  3. A valid form of personal identification. (Only for Non-US
                  NPOs);
                </li>
                <li>
                  4. Your organization’s registration/organizing documents, and
                  any certificates and/or other official documents issued by any
                  regulatory/governmental agencies evidencing charitable status
                  in the jurisdiction in which you are organized. (Only for
                  Non-US NPOs).
                </li>
                <li>
                  5. Bank account information for a current bank account held
                  solely in the name of your organization;
                </li>
                <li>
                  6. Bank account verification letter. (Only for Non-US NPOs);
                </li>
                <li>
                  7. If you are registered in the U.S., your organization’s
                  Employer Identification Number (EIN) or the relevant NPO
                  registration number for your jurisdiction;
                </li>
                <li>
                  8. A signed copy of the Fiscal Sponsorship and Grant Agreement
                  (Only for Non-US NPOs)
                </li>
                <li>9. A valid, working email address; and</li>
                <li>
                  10. Completion of the Better Giving registration form and
                  process.
                </li>
              </ol>
            </li>
            <li>
              c. You will be eligible to receive grants in accordance with this
              Agreement only after we have reviewed your submitted information
              and materials and approved you as a NPO.
            </li>
            <li>
              d. We reserve the right to request any additional information we
              may require to assess your eligibility as a qualified NPO, on an
              ongoing basis and at our sole discretion.
            </li>
          </ol>
        </li>
        <li>
          <B>3. Your Obligations</B>
          <ol type="a" className="list-inside pl-6 indent-4 mt-2 grid gap-y-2">
            <li>
              a. You hereby grant Better Giving a non-exclusive license to use
              your name and logo during the term of this Agreement. We
              acknowledge that you retain ownership of your trademarks, trade
              names and service marks and any associated goodwill.
            </li>
            <li>
              b. NPOs bear sole responsibility for complying with all laws,
              rules and regulations applicable to your activities under this
              Agreement and to your status as a NPO and public charity. You
              understand that you may have obligations to register under state
              charitable solicitation laws. You agree that we have no liability
              for your failure to register properly. You agree to bear all costs
              associated with your compliance with such requirements. You agree
              that, for purposes of state charitable solicitation laws or
              regulations, nothing in this Agreement is intended to cause Better
              Giving in any way to act as a professional fundraiser or
              fundraising counsel on your behalf.
            </li>
            <li>
              c. You hereby agree to promptly notify Better Giving in the event
              there is any change to your status as a NPO, or ability to carry
              out the charitable purposes for which you have received grant
              disbursements.
            </li>
          </ol>
        </li>
        <li>
          <B>4. Receiving Grants from Better Givings</B>
          <ol
            type="a"
            className="list-inside pl-6 indent-4 mt-2 grid gap-y-2 [&>li]:first-letter:font-bold"
          >
            <li>
              a. You acknowledge that we make no promise that you will receive
              any grants from us as a result of your status as a NPO.
            </li>
            <li>
              b. You understand that Donors make their donations to Better
              Giving and not to NPOs. Better Giving retains exclusive legal
              control over all donations received from Donors, and exercises
              sole discretion in making any and all grants to NPOs. We make
              grant distributions to qualified NPOs based upon recommendations
              made by Donors, and consequently any grants received in accordance
              with this Agreement will be received by you from Better Giving.
            </li>
            <li>
              c. Pursuant to our{" "}
              <Link to={appRoutes.privacy_policy} className="text-blue">
                Privacy Policy
              </Link>
              , we may disclose to you information about Donors, including name
              and contact information. You agree that we disclose this
              information to you only for the purpose of enabling you to
              acknowledge donations and to provide a reasonable amount of
              information about your charitable work. You become the data
              controller of the Donor’s personal information that we provide to
              you for this limited purpose. You must not use the Donor’s
              personal information for any other purpose without the Donor’s
              further consent, including but not limited to for marketing
              purposes. You agree that you will obtain consent from Donors to
              use the information we provide to you for any purpose beyond what
              is contained in this clause.
            </li>
            <li>
              d. On an ongoing basis, all grant recommendations made by Donors
              are reviewed and approved by Better Giving. All grant
              disbursements we may make to you, will be made by direct bank
              transfer. As a condition of receiving grants in accordance with
              the Agreement, you hereby represent and warrant that all bank
              account information provided to Better Giving pertains to bank
              account(s) held solely in the name of your NPO, and managed and
              maintained by duly authorized legal representatives in accordance
              with any and all applicable state, federal and national laws.
            </li>
            <li>
              e. All grant disbursements made by Better Giving to you may only
              be used for charitable purposes in accordance with any and all
              applicable local, state, federal or national laws. Such donations
              may not confer impermissible private benefit(s), and may also not
              be used to engage in, support, or promote hate, violence,
              terrorist activity, related training of any kind, money
              laundering, or other illegal activities, or be used for any
              impermissible political activities.
            </li>
            <li>
              f. In the event you lose your status as an NPO, cease your
              charitable operations or breach these Terms, Better Giving, in its
              sole discretion may select another NPO to receive any grants or
              use the donation(s) in any manner consistent with our charitable
              purpose.
            </li>
            <li>
              g. Fees: Use of the Platform as well as Better Giving’s services
              are free for NPOs. We do not charge you a fee for registering on
              the Platform nor for receiving grants from Better Giving. There
              are no hidden fees or recurring charges.
              <ol className="list-inside pl-8 indent-4 mt-4 grid gap-y-4">
                <li>
                  1. <U>Fund Management Fees</U>. Better Giving maintains a fee
                  structure for the operation and maintenance of the Fund, as
                  follows: (1) Assets Under Management Fee assessed quarterly
                  equal to .2125% of the Fund balance; and (2) Annual
                  Performance Fee equal to 12.5% over a 5% hurdle rate.
                </li>
                <li>
                  2. <U>Donor Fees</U>. NPOs may elect to have Donor Fees set as
                  either (1) an optional donation to Better Giving at the
                  Donor’s sole discretion; or (2) a flat 1.5% fee on all
                  donations made.
                </li>
              </ol>
            </li>
          </ol>
        </li>
        <li>
          <B>5. Warranties and Disclaimers.</B>
          <ol
            type="a"
            className="list-inside pl-6 indent-4 mt-2 grid gap-y-2 [&>li]:first-letter:font-bold"
          >
            <li>
              a. You represent and warrant to us that: (i) you are, and at all
              times during the term of this Agreement will remain, a eligible
              NPO as described in Section 2(a); (ii) you will utilize grants
              received from Better Giving solely in a manner that is consistent
              with such status; (iii) you will at all times be in compliance
              with all applicable laws, rules and regulations, including any
              requirements governing charitable status and solicitation of
              charitable donations in your jurisdiction; (iv) all information
              you have provided to us is true and accurate at all times; (v) you
              have the right to enter into this Agreement on behalf of your
              organization; (vi) you have the right to grant the licenses to
              Better Giving hereunder; and our use, as contemplated by this
              Agreement, of materials or rights licensed hereunder, will not
              infringe the intellectual property rights or similar rights of any
              third party; (vii) you will at all times comply with the terms and
              conditions of this Agreement.
            </li>
            <li>
              b. You agree and acknowledge that all Donors who make grant
              recommendations to support you have not and will receive any goods
              or services of value in return of their Donation to Better Giving,
              except where such goods or services are disregarded in accordance
              with guidance provided by the Internal Revenue Service.
            </li>
            <li>
              c. You agree, represent and warrant that you shall remain
              compliant at all times with all laws, statutes, and regulations
              restricting U.S. persons from dealing with any individuals,
              entities or groups subject to sanctions imposed or administered by
              the Office of Foreign Assets Control of the United States
              Department of Treasury (“OFAC”). On an ongoing basis, Better
              Giving will perform compliance testing to ensure that you are not
              subject to sanctions by OFAC.
            </li>
            <li>
              d. Executive Orders and Laws of many countries, including those of
              the United States, prohibit transactions with, and the provision
              of resources and support to, individuals and organizations
              associated with terrorism. You hereby represent and warrant that
              you are compliant with all applicable provisions of such Executive
              Orders and Laws, and that you have not provided, and will take all
              reasonable steps to ensure that you do not and will not knowingly
              provide, material support or resources to any individual or entity
              that commits, attempts to commit, advocates, facilitates, or
              participates in terrorist acts, or has committed, attempted to
              commit, facilitate, or participated in terrorist acts.
            </li>
            <li>
              e. You agree to indemnify, hold harmless, and, at our option,
              defend Better Giving and its directors, employees, licensees,
              agents and vendors from and against all claims, costs, losses,
              damages, expenses (including attorneys’ fees and court costs) and
              liabilities arising from your breach or alleged breach of any
              obligation, covenant, representation or warranty under this
              Agreement. If Better Giving requires you to provide defense of any
              matter for which indemnity is or may be due hereunder, Better
              Giving may participate in such defense by counsel of its choice at
              its own expense. You will not settle any claim for which indemnity
              is due hereunder unless such settlement completely and forever
              releases Better Giving and the other indemnified parties with
              respect to such claim, or unless Better Giving provides its prior
              written consent. Any settlement imposing or requiring Better
              Giving to take or refrain from taking any action will require the
              prior written consent of Better Giving.
            </li>
            <li>
              f. YOU ACKNOWLEDGE THAT THE PLATFORM AND OUR PERFORMANCE HEREUNDER
              ARE PROVIDED ON AN “AS IS” BASIS, AND WE DISCLAIM ALL
              REPRESENTATIONS AND WARRANTIES UNDER THIS AGREEMENT, WHETHER
              EXPRESS, IMPLIED OR STATUTORY, INCLUDING, WITHOUT LIMITATION, ANY
              WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
              TITLE, NON-INFRINGEMENT, QUIET ENJOYMENT, DATA ACCURACY OR SYSTEM
              INTEGRATION. NO WARRANTY IS MADE BY US ON THE BASIS OF TRADE
              USAGE, COURSE OF DEALING, OR COURSE OF PERFORMANCE. YOU
              ACKNOWLEDGE THAT WE MAKE NO REPRESENTATIONS OR WARRANTIES
              REGARDING THE PERFORMANCE, EFFICIENCY OR AVAILABILITY OF THE
              PLATFORM. NO REPRESENTATION OR WARRANTY IS MADE THAT OPERATION OF
              THE PLATFORM WILL BE UNINTERRUPTED OR ERROR-FREE, OR THAT THE
              PLATFORM WILL OPERATE AS EXPECTED OR WILL MEET YOUR PARTICULAR
              NEEDS OR PURPOSES. YOU ACKNOWLEDGE THAT WE MAKE NO REPRESENTATIONS
              OR WARRANTIES REGARDING ANY LEGAL REQUIREMENTS TO WHICH YOUR
              ORGANIZATION MAY BE SUBJECT, SUCH AS, BY WAY OF EXAMPLE, ANY
              REGISTRATION REQUIREMENTS RELATED TO CHARITABLE SOLICITATIONS; NOR
              DO WE MAKE ANY REPRESENTATIONS OR WARRANTIES REGARDING THE
              APPLICABILITY OF TAX LAWS TO YOUR ORGANIZATION OR TO ANY DONOR,
              SUCH AS, BY WAY OF EXAMPLE, ANY DONOR’S ABILITY TO OBTAIN TAX
              DEDUCTIONS OR OTHER TAX BENEFITS IN CONNECTION WITH DONATIONS MADE
              THROUGH THE PLATFORM. YOU ACKNOWLEDGE THAT WE MAKE NO
              REPRESENTATIONS OR WARRANTIES TO YOU THAT YOU WILL RECEIVE ANY
              MINIMUM AMOUNT OF DONATIONS OR ANY DONATIONS AT ALL UNDER THIS
              AGREEMENT.
            </li>
            <li>
              g. IN NO EVENT SHALL WE OR ANY OF OUR OFFICERS, DIRECTORS,
              EMPLOYEES, CONTRACTORS OR AFFILIATES BE LIABLE TO YOU FOR ANY
              INCIDENTAL, INDIRECT, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES,
              REGARDLESS OF THE NATURE OF THE CLAIM, INCLUDING, WITHOUT
              LIMITATION, LOST REVENUES, COSTS OF DELAY, ANY FAILURE OF
              DELIVERY, BUSINESS INTERRUPTION, COSTS OF LOST OR DAMAGED DATA OR
              DOCUMENTATION OR LIABILITIES TO THIRD PARTIES ARISING FROM ANY
              SOURCE, NOR WILL WE BE RESPONSIBLE FOR ANY DAMAGE, LOSS, OR INJURY
              RESULTING FROM HACKING, TAMPERING, OR OTHER UNAUTHORIZED ACCESS OR
              USE OF THE PLATFORM OR THE INFORMATION CONTAINED WITHIN IT. EVEN
              IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR
              CUMULATIVE LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR
              RELATING TO THIS AGREEMENT, INCLUDING, WITHOUT LIMITATION, ANY
              CAUSE OF ACTION SOUNDING IN CONTRACT, TORT OR STRICT LIABILITY,
              SHALL NOT EXCEED THE AMOUNT YOU PAID TO US TO USE THE PLATFORM, OR
              $100, WHICHEVER IS GREATER. THE FOREGOING LIMITATIONS AND
              EXCLUSIONS OF LIABILITY ARE INTENDED TO APPLY WITHOUT REGARD TO
              WHETHER OTHER PROVISIONS OF THIS AGREEMENT HAVE BEEN BREACHED OR
              HAVE PROVEN INEFFECTIVE. IF YOU HAVE AUTHORIZED ANY THIRD PARTY TO
              ENTER THIS AGREEMENT ON YOUR BEHALF (e.g., AN ASSOCIATION OF
              NONPROFIT ORGANIZATIONS OR AGENT), OR TO PERFORM ON YOUR BEHALF
              (e.g., TO RECEIVE AND PROCESS ANY DONATIONS MADE TO YOU), YOU
              UNDERSTAND AND AGREE THAT YOU ARE RESPONSIBLE FOR THE ACTS AND
              OMISSIONS OF THAT THIRD PARTY, AND WE HAVE NO RESPONSIBILITY UNDER
              THIS AGREEMENT OR ANY LIABILITY TO YOU ARISING DIRECTLY OR
              INDIRECTLY FROM OR IN CONNECTION WITH THAT THIRD PARTY’S ACTS OR
              OMISSIONS. YOU ACKNOWLEDGE THAT THE PROVISIONS OF THIS PARAGRAPH
              AND THE PRECEDING PARAGRAPH FORM AN ESSENTIAL BASIS OF THE
              ARRANGEMENT BETWEEN YOU AND US, AND ABSENT THE DISCLAIMERS,
              LIMITATIONS AND EXCLUSIONS OF OUR LIABILITY SET FORTH ABOVE, THE
              TERMS OF THIS AGREEMENT WOULD BE SUBSTANTIALLY DIFFERENT.
            </li>
          </ol>
        </li>
        <li>
          <B>6. Taxes.</B> Notwithstanding your status as a NPO, you will be
          solely responsible for any and all taxes, duties, levies, charges or
          assessments applicable or payable in connection with any and all
          charitable grants made to you pursuant to this Agreement.
        </li>
        <li>
          <B>7. No Professional Advice.</B> All information provided by Better
          Giving and the Platform is for informational purposes only and should
          not be construed as professional advice. Before accepting these Terms
          and using the Platform, you should seek independent professional
          advice from an individual who is licensed and qualified in the area
          for which such advice would be appropriate. We do not offer any tax,
          accounting or legal advice. Please consider engaging the appropriate
          professional to address any questions you may have concerning the
          impact of utilizing the Platform and receiving charitable grants in
          accordance with these Terms.
        </li>
        <li>
          <B>8. Term and Termination.</B>
          <ol
            type="a"
            className="list-inside pl-6 indent-4 mt-2 grid gap-y-2 [&>li]:first-letter:font-bold"
          >
            <li>
              a. This Agreement becomes effective when you have accepted it by
              following the instructions to register as a NPO on the Platform.
              Once in effect, this Agreement will continue until terminated by
              either you or us.
            </li>
            <li>
              b. This Agreement may be terminated at any time by either you or
              Better Giving, with or without cause, with notice provided by one
              party to the other.
            </li>
            <li>
              c. If you breach this Agreement at any time, you will not be
              considered to be in good standing and we may suspend and/or
              withhold any grants in our sole discretion. We may terminate this
              Agreement at any time and for any reason by providing notice to
              you in accordance with this Agreement.
            </li>
            <li>
              d. Upon termination, we will deactivate the donation function to
              your NPO on the Platform, as well as on any donation widgets and
              Donors will no longer be able to donate to you. Better Giving
              will, subject to the terms and conditions of this Agreement, grant
              any donations made to you up until the date of termination.
            </li>
            <li>
              e. Once this Agreement is terminated, Better Giving will no longer
              disburse any grants to you from the Fund, as of the date of
              termination.
            </li>
            <li>
              f. Neither you nor Better Giving shall have any obligation to each
              other following the termination of this Agreement, except those
              obligations that survive this Agreement, as set forth in Section
              9(e).
            </li>
            <li>
              g. The obligations of Sections 3(b), 5, 7, 8, 9, and 10 will
              survive the termination of this Agreement.
            </li>
          </ol>
        </li>
        <li>
          <B>9. Miscellaneous Terms and Conditions.</B>
          <ol
            type="a"
            className="list-inside pl-6 indent-4 mt-2 grid gap-y-2 [&>li]:first-letter:font-bold"
          >
            <li>
              a. This Agreement, together with any other documents incorporated
              herein by reference constitutes the entire Agreement between us
              and supersedes all previous negotiation, understandings and
              agreements between us in relation to its subject matter.
            </li>
            <li>
              b. You acknowledge that nothing in this Agreement creates a
              partnership, joint venture, or employer-employee relationship, and
              neither party is acting as an agent of the other party. For
              purposes of clarity, neither party has any authority to make any
              commitments on behalf of the other party or to purport to bind the
              other party in any manner or to any extent.
            </li>
            <li>
              c. We may give notice pursuant to this Agreement by any means of
              contact you have provided us and notice will be effective when
              sent. If you fail to provide valid and current contact information
              as required, you waive your right to receive notices under this
              Agreement during the period of such failure.
            </li>
            <li>
              d. We may amend this Agreement at any time by posting amended
              terms. We will send a message to the email address used to
              register as a NPO, alerting you of such amendments. Except as
              otherwise expressly stated in such a posting, all amended terms
              shall automatically be effective and legally binding upon you
              seven (7) days after having been posted. Your continuation as a
              NPO will constitute your complete consent and acceptance to all
              such amended terms. If you do not accept the amended terms you may
              terminate this Agreement as set forth in Section 9 of this
              Agreement. Apart from such posting by us, this Agreement may not
              otherwise be amended except in a written document (i) that
              expressly references this Agreement and/or any affected amended
              terms as posted by us and (ii) that is executed by both you and
              us.
            </li>
            <li>
              e. Should any provision of this Agreement be held by a court or
              other tribunal of competent jurisdiction to be void, illegal,
              invalid, inoperative, or unenforceable, the remaining provisions
              of this Agreement shall not be affected and shall continue in
              effect, and the invalid provision shall be deemed modified to the
              least degree necessary to remedy such invalidity.
            </li>
            <li>
              f. You may not assign this Agreement without our prior written
              consent; any attempted assignment in violation of the foregoing
              will be null and void. We may assign this Agreement to any third
              party without your consent. All the terms and provisions of this
              Agreement shall be binding upon, shall inure to the benefit of,
              and shall be enforceable by the respective successors and
              permitted assigns of you and us.
            </li>
            <li>
              g. Our failure to partially or fully exercise any right will not
              be considered a waiver of that right unless we so state in writing
              to you. The waiver of any breach shall not prevent a subsequent
              exercise of such right or be deemed a waiver of any subsequent
              breach of the same or any other term of this Agreement. Any
              remedies made available to us by the terms of this Agreement are
              cumulative and are without prejudice to any other remedies that
              may be available to us in law or equity.
            </li>
            <li>
              h. <U>Dispute Resolution</U>. Any dispute between you and Better
              Giving which cannot be resolved by negotiation shall be submitted
              to mediation or arbitration, under the rules of the American
              Arbitration Association (“<B>AAA</B>”) or any entity that you and
              we may subsequently agree upon in writing. Any arbitration award
              issued by the arbitrator shall be final, binding, and enforceable
              in any court of competent jurisdiction. Notwithstanding the
              foregoing, you acknowledge that unauthorized use of our
              proprietary materials, information or technology may cause
              irreparable harm to Better Giving for which monetary damages would
              be an inadequate remedy. Accordingly, we have the right, without
              the necessity of posting bond, to seek injunctive or other
              equitable relief from any court of competent jurisdiction to
              protect our rights in intellectual property or confidential
              information.
            </li>
            <li>
              i. <U>Governing Law</U>. This Agreement will be governed by and
              construed in accordance with the substantive laws of the State of
              Delaware without regard to conflicts of laws and all disputes
              arising under and relating to this Agreement shall be brought and
              resolved exclusively in the State of Delaware.
            </li>
          </ol>
        </li>
      </ol>
    </div>
  );
}
