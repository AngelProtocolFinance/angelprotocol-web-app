import { Link } from "@remix-run/react";
import { Footer } from "components/footer";
import { NavDropdown, UserAvatar } from "components/header";
import { DappLogo } from "components/image";
import { appRoutes } from "constants/routes";
import { metas } from "helpers/seo";
import { useRootData } from "hooks/use-root-data";
import { Bottom } from "./bottom";
import { Faq } from "./faq";
import { Feature } from "./feature";
import { Feature2 } from "./feature-2";
import { Top } from "./top";

export const meta = metas({
  title: "Referral Program | Better Giving",
  description:
    "Support nonprofits and earn rewards by sharing Better Giving. Join our referral program to make an impact, earn effortlessly, and grow a community of changemakers. Sign up for your unique link and start sharing today!",
});

export default function Referrals() {
  const user = useRootData();
  const to = `${appRoutes.user_dashboard}/referrals`;
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
        <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 xl:container xl:mx-auto px-5 py-2">
          <DappLogo classes="h-12" />
          {user && <UserAvatar avatar={user.avatar} classes="max-sm:hidden" />}
          {!user && (
            <Link
              to={{
                pathname: appRoutes.signup,
                search: `?redirect=${to}`,
              }}
              className="btn btn-blue max-xl:text-sm normal-case text-nowrap px-6 py-2 rounded-full"
            >
              Sign up
            </Link>
          )}
          {user && <NavDropdown auth_links={undefined} user={user} />}
        </div>
      </div>

      <div className="bg-gradient-to-br from-50% from-transparent to-peach/50">
        <Top />
      </div>
      <div className="bg-gradient-to-bl from-peach/50 via-transparent via-50% to-lilac/50">
        <Feature className="xl:container xl:mx-auto px-10" />
      </div>
      <div className="bg-gradient-to-br from-lilac/50 via-transparent via-50% to-transparent">
        <Feature2 className="xl:container xl:mx-auto px-10" />
      </div>
      <Faq classes="xl:container xl:mx-auto px-10 mt-10" />

      <Bottom classes="xl:container xl:mx-auto px-10 mx-4 my-10 xl:my-30" />
      <Footer classes="xl:container xl:mx-auto px-10" />
    </div>
  );
}
