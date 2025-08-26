import { flatRoutes } from "@remix-run/fs-routes";
import type { RouteConfig } from "@remix-run/route-config";
import { index, layout, route } from "@remix-run/route-config";

export default [
  ...(await flatRoutes({ rootDirectory: "fs-routes" })),

  index("./pages/home/home.tsx"),

  route("donate/:id", "./pages/donate/index.tsx"),
  route("donate-fund/:fundId", "./pages/donate-fund/redirect.ts"),
  route("fundraisers/:fundId/donate", "./pages/donate-fund/index.tsx"),
  route("donate-thanks", "./pages/donate-thanks.tsx"),
  route("referral-program", "./pages/landing/referrals/index.tsx"),
  route("nonprofits/:slug", "./pages/landing/ntee/index.tsx"),
  route("see-what-youre-losing", "./pages/landing/don-calculator/index.tsx"),
  route(
    "simplify-fundraising-maximize-impact",
    "./pages/landing/us-nonprofits/index.tsx",
    { id: "page-a" }
  ),
  route(
    "simplify-fundraising-maximize-impacts",
    "./pages/landing/us-nonprofits/index.tsx",
    { id: "page-a2" }
  ),
  route(
    "the-smart-move-to-make-for-accepting-crypto-donations",
    "./pages/landing/tgb-attack/index.tsx"
  ),

  route("form-builder", "./pages/widget/form-builder-layout.tsx", [
    index("./pages/widget/index.ts", { id: "public-form-builder" }),
  ]),

  route("admin/:id", "./pages/admin/layout.tsx", [
    index("./pages/admin/redirect.ts"),
    route("donations", "./pages/admin/donations/donations.tsx"),
    route("programs", "./pages/admin/programs/programs.tsx"),
    route("funds", "./pages/admin/funds/funds.tsx"),
    route("integrations", "./pages/admin/integrations/index.tsx"),
    route(
      "program-editor/:programId",
      "./pages/admin/program-editor/program-editor.tsx"
    ),
    route(
      "members",
      "./pages/admin/members/members.tsx",
      { id: "endow-admins" },
      [route("add", "./pages/admin/members/add-form.tsx")]
    ),
    route("settings", "./pages/admin/settings/form.tsx"),
    route("edit-profile", "./pages/admin/edit-profile/index.tsx"),
    route("banking", "./pages/admin/banking/payout-methods/payout-methods.tsx"),
    route("banking/new", "./pages/admin/banking/banking.tsx"),
    route(
      "banking/:bankId",
      "./pages/admin/banking/payout-method/payout-method.tsx",
      [route("delete", "./pages/admin/banking/payout-method/delete-prompt.tsx")]
    ),
    route("form-builder", "./pages/widget/index.ts", {
      id: "admin-form-builder",
    }),
    route("media", "./pages/admin/media/media.tsx", [
      route("new", "./pages/admin/media/video-new.ts", { id: "media-new" }),
      route(":mediaId", "./pages/admin/media/video-edit.ts", {
        id: "media-edit",
      }),
    ]),
    route("media/videos", "./pages/admin/media/videos/videos.tsx", [
      route("new", "./pages/admin/media/video-new.ts", { id: "videos-new" }),
      route(":mediaId", "./pages/admin/media/video-edit.ts", {
        id: "videos-edit",
      }),
    ]),
    route(
      "dashboard",
      "./pages/admin/dashboard/dashboard.tsx",
      { id: "dashboard" },
      [
        route("edit-alloc", "./pages/admin/dashboard/schedule/edit.tsx"),
        route("move-funds", "./pages/admin/dashboard/move-fund-form.tsx"),
      ]
    ),
    route("referrals", "./pages/admin/referrals/index.tsx"),
    route(
      "referrals/earnings",
      "./pages/admin/referrals/earnings-history/index.tsx"
    ),
    route(
      "referrals/payouts",
      "./pages/admin/referrals/payout-history/index.tsx"
    ),
  ]),

  route("dashboard", "./pages/user-dashboard/layout.tsx", [
    index("./pages/user-dashboard/index-route.ts"),
    route("edit-profile", "./pages/user-dashboard/edit-profile/index.ts"),
    route("settings", "./pages/user-dashboard/settings/settings.tsx"),
    route("donations", "./pages/user-dashboard/donations/index.tsx", [
      route(":id", "./components/kyc-form/index.tsx"),
    ]),
    route("subscriptions", "./pages/user-dashboard/subscriptions/index.tsx", [
      route(
        "cancel/:sub_id",
        "./pages/user-dashboard/subscriptions/cancel/index.tsx"
      ),
    ]),
    route("funds", "./pages/user-dashboard/funds/funds.tsx"),
    route("referrals", "./pages/user-dashboard/referrals/index.tsx", [
      route(
        "payout-min",
        "./pages/user-dashboard/referrals/payout-min/index.tsx"
      ),
      route("w-form", "./pages/user-dashboard/referrals/w-forms/index.tsx"),
      route(
        "w-form-signed",
        "./pages/user-dashboard/referrals/w-form-signed/index.tsx"
      ),
    ]),
    route(
      "referrals/payout",
      "./pages/user-dashboard/referrals/payout/index.tsx"
    ),
    route(
      "referrals/earnings",
      "./pages/user-dashboard/referrals/earnings-history/index.tsx"
    ),
    route(
      "referrals/payouts",
      "./pages/user-dashboard/referrals/payout-history/index.tsx"
    ),
  ]),

  layout("./layout/app/layout.tsx", [
    route("login", "./pages/signin.tsx"),
    route("signup", "./pages/sign-up/layout.tsx", [
      index("./pages/sign-up/signup-form/signup-form.tsx"),
      route("confirm", "./pages/sign-up/confirm-form/confirm-form.tsx"),
      route("success", "./pages/sign-up/success.tsx"),
    ]),
    route("login/reset", "./pages/reset-password/reset-password.tsx"),
    route("logout", "./pages/logout.ts"),
    route("nonprofit", "./pages/informational/nonprofit-info/index.ts"),
    route("donor", "./pages/informational/donor-info/index.ts"),
    route("wp-plugin", "./pages/informational/wp-plugin.tsx"),
    route(
      "zapier-integration",
      "./pages/informational/zapier-integration/index.tsx"
    ),
    route("about-us", "./pages/informational/about/index.tsx"),
    route("blog", "./pages/blog/posts.tsx"),
    route("blog/:slug", "./pages/blog/post.tsx"),
    route("marketplace", "./pages/marketplace/index.tsx", [
      route("filter", "./pages/marketplace/filter/index.ts"),
    ]),
    route("marketplace/:id", "./pages/profile/profile.tsx", [
      layout("./pages/profile/body/body.tsx", [
        index("./pages/profile/body/general-info/index.ts"),
        route("program/:programId", "./pages/profile/body/program/index.ts"),
      ]),
    ]),
    route("profile/:id", "./pages/profile/profile-redirect.ts"),
    route("funds/*", "./pages/funds/redirect.ts"),
    route("fundraisers", "./pages/funds/funds.tsx"),
    route("fundraisers/:fundId", "./pages/funds/fund/index.tsx"),
    route("fundraisers/:fundId/edit", "./pages/funds/edit-fund/index.ts"),
    route("fundraisers/new", "./pages/funds/create-fund/index.ts"),
    route("privacy-policy", "./pages/legal/privacy-policy.tsx"),
    route("terms-of-use", "./pages/legal/terms-donors.tsx"),
    route("terms-of-use-npo", "./pages/legal/terms-nonprofits.tsx"),
    route("terms-of-use-referrals", "./pages/legal/terms-referrals.tsx"),
    route("banking-applications", "./pages/banking-applications/index.ts"),
    route(
      "banking-applications/:id",
      "./pages/banking-application/banking-application.tsx",
      [
        route("approve", "./pages/banking-application/verdict-approve.tsx"),
        route("reject", "./pages/banking-application/verdict-reject.tsx"),
        route("success", "./pages/banking-application/success-prompt.tsx"),
      ]
    ),
    route("register", "./pages/registration/layout.tsx", [
      index("./pages/registration/sign-up/index.ts"),
      route("success", "./pages/registration/success.tsx"),
      route("welcome", "./pages/registration/welcome.tsx"),
      route("resume", "./pages/registration/resume/form.tsx"),
      route(
        ":regId",
        "./pages/registration/steps/layout.ts",
        { id: "reg$Id" },
        [
          route("sign-result", "./pages/registration/signing-result/index.ts"),
          layout("./pages/registration/steps/steps-layout.tsx", [
            index("./pages/registration/steps/steps-index.ts"),
            route("1", "./pages/registration/steps/contact-details/index.tsx"),
            route("2", "./pages/registration/steps/org-details/index.tsx"),
            route("3", "./pages/registration/steps/fsa-inquiry/index.ts"),
            route("4", "./pages/registration/steps/documentation/index.ts", [
              route("fsa", "./pages/registration/data/fsa-action.ts"),
            ]),
            route("5", "./pages/registration/steps/banking/index.ts"),
            route("6", "./pages/registration/steps/dashboard/index.tsx"),
          ]),
        ]
      ),
    ]),
    route("applications", "./pages/applications/index.ts"),
    route("applications/:id", "./pages/application/application.tsx", [
      route(":verdict", "./pages/application/review-route.tsx"),
      route("success", "./pages/application/success-prompt.tsx"),
    ]),
    route("donation-calculator", "./pages/donation-calculator/index.tsx"),
  ]),

  route("donate-widget", "./pages/donate-widget/widget-context.tsx", [
    route(":id", "./pages/donate-widget/index.ts"),
    route("donate-thanks", "./pages/donate-thanks.tsx", {
      id: "widget-donate-thanks",
    }),
  ]),

  route(
    "donation-calculator-export",
    "./pages/donation-calculator/pdf-export/index.tsx"
  ),
] satisfies RouteConfig;
