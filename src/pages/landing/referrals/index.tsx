import { Link } from "@remix-run/react";
import { DappLogo } from "components/image";
import { appRoutes } from "constants/routes";
import { Feature } from "./feature";
import { Top } from "./top";

export default function Referrals() {
  return (
    <div className="w-full grid content-start pb-16 @container">
      <div
        className="sticky top-[-1px] z-50"
        ref={(node) => {
          if (!node) return;
          const observer = new IntersectionObserver(
            ([e]) => {
              const isIntersecting = e.intersectionRatio < 1;
              e.target.classList.toggle("bg-white", isIntersecting);
              e.target.classList.toggle("shadow-lg", isIntersecting);
            },
            { threshold: [1] }
          );
          observer.observe(node);
        }}
      >
        <div className="xl:container xl:mx-auto px-10 py-4 flex justify-between gap-x-4 items-center">
          <DappLogo classes="h-12" />
          <Link
            to={{
              pathname: appRoutes.signup,
              search: `?redirect=${appRoutes.user_dashboard}/referrals`,
            }}
            className="btn btn-blue max-xl:text-sm normal-case text-nowrap px-6 py-2 rounded-full"
          >
            Sign up
          </Link>
        </div>
      </div>

      <div className="bg-gradient-to-br from-50% from-transparent to-peach/50">
        <Top classes="-mt-24" />
      </div>
      <div className="bg-gradient-to-br from-lilac/50 via-transparent via-50% to-transparent">
        <Feature className="xl:container xl:mx-auto px-10" />
      </div>

      <section>
        <h2>Why Share Better Giving?</h2>

        <article>
          <h3>Make an Impact</h3>
          <p>
            Every nonprofit you refer can access free, powerful fundraising
            tools.
          </p>
        </article>

        <article>
          <h3>Earn Effortlessly</h3>
          <p>
            Share your unique link and earn whenever your nonprofits receive
            donations.
          </p>
        </article>

        <article>
          <h3>Be Part of a Movement</h3>
          <p>
            Join a growing community of supporters, fundraisers, and
            changemakers.
          </p>
        </article>

        <a href="#start">Start Sharing Today</a>
      </section>

      <section>
        <h2>How It Works - Simple Steps</h2>

        <ol>
          <li>
            <h3>Get Your Unique Link</h3>
            <p>
              Sign up for a free Better Giving account and access your referral
              link.
            </p>
          </li>
          <li>
            <h3>Share with Your Network</h3>
            <p>
              Send your link to nonprofits, consultants, or anyone who could
              benefit.
            </p>
          </li>
          <li>
            <h3>Earn Rewards</h3>
            <p>
              Whenever your referred nonprofits receive donations, you earn.
            </p>
          </li>
        </ol>

        <a href="#getlink">Get Your Link Now</a>
      </section>

      <section>
        <h2>Frequently Asked Questions:</h2>

        <dl>
          <dt>Who can join?</dt>
          <dd>
            Anyone with a Better Giving account - donors, consultants,
            influencers, nonprofits.
          </dd>

          <dt>How do I earn rewards?</dt>
          <dd>
            Share your link, and you earn whenever a referred nonprofit receives
            donations.
          </dd>

          <dt>When will I get paid?</dt>
          <dd>We process payouts monthly, directly to your account.</dd>

          <dt>What if a nonprofit forgets to use my link?</dt>
          <dd>They can manually enter your referral code during signup.</dd>
        </dl>
      </section>

      <section>
        <h2>Join Us - Start Making an Impact Today!</h2>
        <p>
          Whether you're a consultant, a fundraiser, or simply someone who loves
          making a difference, Better Giving lets you turn your connections into
          a force for good.
        </p>
        <a href="#referral">Get Your Referral Link Now</a>
      </section>
    </div>
  );
}
