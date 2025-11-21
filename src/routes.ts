import type { RouteConfig } from "@react-router/dev/routes";
import { index, layout, route as r } from "@react-router/dev/routes";

class Path {
  private value: string;
  constructor(path: string) {
    this.value = path;
  }
  $(path: string) {
    return new Path(`${this.value}/${path}`);
  }
  get _() {
    return this.value;
  }
}

const pages = new Path("./pages");
const donate_fund = pages.$("donate-fund");
const landing = pages.$("landing");
const widget = pages.$("widget");
const admin = pages.$("admin");
const user = pages.$("user-dashboard");
const layouts = new Path("./layout");
const sign_up = pages.$("sign-up");
const info = pages.$("informational");
const blog = pages.$("blog");
const marketplace = pages.$("marketplace");
const profile = pages.$("profile");
const funds = pages.$("funds");
const legal = pages.$("legal");
const reg = pages.$("registration");
const bank_apps = pages.$("banking-applications");
const bank_app = pages.$("banking-application");
const reg_apps = pages.$("applications");
const reg_app = pages.$("application");
const donation_calculator = pages.$("donation-calculator");
const donate_widget = pages.$("donate-widget");

export default [
  index("./pages/home/home.tsx"),
  r("donate/:id", pages.$("donate/index.tsx")._),
  r("donate-fund/:fundId", donate_fund.$("redirect.ts")._),
  r("fundraisers/:fundId/donate", donate_fund.$("index.tsx")._),
  r("donations/:id", pages.$("donation/index.tsx")._),
  r("referral-program", landing.$("referrals/index.tsx")._),
  r("nonprofits/:slug", landing.$("ntee/index.tsx")._),
  r("see-what-youre-losing", landing.$("don-calculator/index.tsx")._),
  r(
    "simplify-fundraising-maximize-impact",
    landing.$("us-nonprofits/index.tsx")._,
    { id: "page-a" }
  ),
  r(
    "simplify-fundraising-maximize-impacts",
    landing.$("us-nonprofits/index.tsx")._,
    { id: "page-a2" }
  ),
  r(
    "the-smart-move-to-make-for-accepting-crypto-donations",
    landing.$("tgb-attack/index.tsx")._
  ),

  r("form-builder", widget.$("form-builder-layout.tsx")._, [
    index(widget.$("index.tsx")._, { id: "public-form-builder" }),
  ]),

  layout(layouts.$("landing/layout.tsx")._, [
    r("donation-forms", landing.$("donation-forms/index.tsx")._),
    r("fund-management", landing.$("fund-management/index.tsx")._),
    r("fiscal-sponsorship", landing.$("fiscal-sponsorship/index.tsx")._),
    r("giving-tuesday", landing.$("giving-tuesday/index.tsx")._),
  ]),

  r("admin/:id", admin.$("layout.tsx")._, { id: "admin" }, [
    index(admin.$("redirect.ts")._),
    r("donations", admin.$("donations/index.tsx")._, [
      r("edit-alloc", admin.$("donations/allocation-edit/index.tsx")._),
    ]),
    r("programs", admin.$("programs/index.tsx")._),
    r("funds", admin.$("funds/index.tsx")._),
    r("integrations", admin.$("integrations/index.tsx")._),
    r("program-editor/:programId", admin.$("program-editor/index.tsx")._),
    r("members", admin.$("members/members.tsx")._, { id: "endow-admins" }, [
      r("add", admin.$("members/add-form.tsx")._),
    ]),
    r("settings", admin.$("settings/index.tsx")._),
    r("edit-profile", admin.$("edit-profile/index.tsx")._),
    r("banking", admin.$("banking/payout-methods/index.tsx")._),
    r("banking/new", admin.$("banking/banking.tsx")._),
    r("banking/:bankId", admin.$("banking/payout-method/payout-method.tsx")._, [
      r("delete", admin.$("banking/payout-method/delete-prompt.tsx")._),
    ]),
    r("form-builder", widget.$("index.tsx")._, {
      id: "admin-form-builder",
    }),
    r("media", admin.$("media/media.tsx")._, [
      r("new", admin.$("media/video-new.ts")._, { id: "media-new" }),
      r(":mediaId", admin.$("media/video-edit.ts")._, {
        id: "media-edit",
      }),
    ]),
    r("media/videos", admin.$("media/videos/videos.tsx")._, [
      r("new", admin.$("media/video-new.ts")._, { id: "videos-new" }),
      r(":mediaId", admin.$("media/video-edit.ts")._, {
        id: "videos-edit",
      }),
    ]),
    r("dashboard", admin.$("dashboard/dashboard.tsx")._, { id: "dashboard" }, [
      r("payout-min", admin.$("dashboard/payout-min.tsx")._),
      r("withdraw", admin.$("dashboard/withdraw.tsx")._),
      r("transfer", admin.$("dashboard/transfer.tsx")._),
    ]),
    r("referrals", admin.$("referrals/index.tsx")._),
    r("investments", admin.$("investments/index.tsx")._, [
      r("withdraw", admin.$("investments/withdraw.tsx")._),
      r("transfer", admin.$("investments/transfer.tsx")._),
    ]),
    r("savings", admin.$("savings/index.tsx")._, [
      r("withdraw", admin.$("savings/withdraw.tsx")._),
      r("transfer", admin.$("savings/transfer.tsx")._),
    ]),
    r("dashboard/payouts", admin.$("dashboard/payouts.tsx")._),
    r("dashboard/grants", admin.$("dashboard/grants-history.tsx")._),
    r("referrals/earnings", admin.$("referrals/earnings-history/index.tsx")._),
    r("referrals/payouts", admin.$("referrals/payout-history/index.tsx")._),
    r("assets", admin.$("assets/index.tsx")._),
  ]),

  r(
    "fund-mgmt",
    pages.$("fund-management/layout.tsx")._,
    { id: "fund-management" },
    [
      index(pages.$("fund-management/redirect.ts")._),
      r("investments", pages.$("fund-management/investments/index.tsx")._, [
        r(
          "rebalance",
          pages.$("fund-management/investments/rebalance/index.tsx")._
        ),
      ]),
      r(
        "investments/nav-history",
        pages.$("fund-management/investments/history/index.tsx")._
      ),
      r(
        "redeem-requests",
        pages.$("fund-management/redeem-requests/index.tsx")._,
        [
          r(
            ":tx_id/approve",
            pages.$(
              "fund-management/redeem-requests/verdict/verdict-approve.tsx"
            )._
          ),
          r(
            ":tx_id/reject",
            pages.$(
              "fund-management/redeem-requests/verdict/verdict-reject.tsx"
            )._
          ),
        ]
      ),
      r("savings", pages.$("fund-management/savings/index.tsx")._, [
        r(
          "log-interest",
          pages.$("fund-management/savings/log-interest/index.tsx")._
        ),
      ]),
      r(
        "savings/balance-history",
        pages.$("fund-management/savings/history-balance/index.tsx")._
      ),
      r(
        "savings/interest-history",
        pages.$("fund-management/savings/history-interest/index.tsx")._
      ),
    ]
  ),

  r("dashboard", user.$("layout.tsx")._, [
    index(user.$("index-route.ts")._),
    r("edit-profile", user.$("edit-profile/index.tsx")._),
    r("settings", user.$("settings/index.tsx")._),
    r("donations", user.$("donations/layout.tsx")._, [
      index(user.$("donations/redirect.ts")._),
      r("received", user.$("donations/final/index.tsx")._, [
        r(":id", user.$("donations/final/kyc-form/index.tsx")._),
      ]),
      r("pending", user.$("donations/onhold/index.tsx")._),
    ]),
    r("subscriptions", user.$("subscriptions/index.tsx")._, [
      r("cancel/:sub_id", user.$("subscriptions/cancel/index.tsx")._),
    ]),
    r("funds", user.$("funds/funds.tsx")._),
    r("referrals", user.$("referrals/index.tsx")._, [
      r("payout-min", user.$("referrals/payout-min/index.tsx")._),
      r("w-form", user.$("referrals/w-forms/index.tsx")._),
      r("w-form-signed", user.$("referrals/w-form-signed/index.tsx")._),
    ]),
    r("referrals/payout", user.$("referrals/payout/index.tsx")._),
    r("referrals/earnings", user.$("referrals/earnings-history/index.tsx")._),
    r("referrals/payouts", user.$("referrals/payout-history/index.tsx")._),
  ]),

  layout(layouts.$("app/layout.tsx")._, [
    r("login", pages.$("signin.tsx")._),
    r("signup", sign_up.$("layout.tsx")._, [
      index(sign_up.$("signup-form/signup-form.tsx")._),
      r("confirm", sign_up.$("confirm-form/index.tsx")._),
      r("success", sign_up.$("success.tsx")._),
    ]),
    r("login/reset", pages.$("reset-password/index.tsx")._),
    r("logout", pages.$("logout.ts")._),
    r("nonprofit", info.$("nonprofit-info/index.tsx")._),
    r("donor", info.$("donor-info/index.tsx")._),
    r("wp-plugin", info.$("wp-plugin.tsx")._),
    r("zapier-integration", info.$("zapier-integration/index.tsx")._),
    r("about-us", info.$("about/index.tsx")._),
    r("blog", blog.$("posts.tsx")._),
    r("blog/:slug", blog.$("post.tsx")._),
    r("marketplace", marketplace.$("index.tsx")._, [
      r("filter", marketplace.$("filter/index.ts")._),
    ]),
    r("marketplace/:id", profile.$("index.tsx")._, [
      index(profile.$("body/general-info/index.tsx")._),
      r("program/:programId", profile.$("body/program/index.tsx")._),
    ]),
    r("profile/:id", profile.$("profile-redirect.ts")._),
    r("funds/*", funds.$("redirect.ts")._),
    r("fundraisers", funds.$("funds.tsx")._),
    r("fundraisers/:fundId", funds.$("fund/index.tsx")._),
    r("fundraisers/:fundId/edit", funds.$("fund-edit/index.tsx")._),
    r("fundraisers/new", funds.$("fund-create/index.tsx")._),
    r("privacy-policy", legal.$("privacy-policy.tsx")._),
    r("terms-of-use-npo", legal.$("terms-nonprofits.tsx")._),
    r("terms-of-use", legal.$("terms-donors.tsx")._),
    r("terms-of-use-referrals", legal.$("terms-referrals.tsx")._),
    r("banking-applications", bank_apps.$("index.tsx")._),
    r("banking-applications/:id", bank_app.$("index.tsx")._, [
      r("approve", bank_app.$("verdict-approve.tsx")._),
      r("reject", bank_app.$("verdict-reject.tsx")._),
      r("success", bank_app.$("success-prompt.tsx")._),
    ]),
    r("register", reg.$("layout.tsx")._, [
      index(reg.$("sign-up.tsx")._),
      r("success", reg.$("success.tsx")._),
      r("welcome", reg.$("welcome.tsx")._),
      r("resume", reg.$("resume/index.tsx")._),
      r(":regId", reg.$("steps/layout.ts")._, { id: "reg$Id" }, [
        r("sign-result", reg.$("signing-result/index.ts")._),
        layout(reg.$("steps/steps-layout.tsx")._, [
          index(reg.$("steps/steps-index.ts")._),
          r("1", reg.$("steps/contact-details/index.tsx")._),
          r("2", reg.$("steps/org-details/index.tsx")._),
          r("3", reg.$("steps/fsa-inquiry/index.tsx")._),
          r("4", reg.$("steps/documentation/index.tsx")._, [
            r("fsa", reg.$("data/fsa-action.ts")._),
          ]),
          r("5", reg.$("steps/banking/index.tsx")._),
          r("6", reg.$("steps/dashboard/index.tsx")._),
        ]),
      ]),
    ]),
    r("applications", reg_apps.$("index.tsx")._),
    r("applications/:id", reg_app.$("index.tsx")._, [
      r(":verdict", reg_app.$("review-route.tsx")._),
      r("success", reg_app.$("success-prompt.tsx")._),
    ]),
    r("donation-calculator", donation_calculator.$("index.tsx")._),
    r("irs-npos", pages.$("irs-npos/index.tsx")._),
  ]),

  r("donate-widget/:id", donate_widget.$("index.tsx")._),
  r("donate-widget/donations/:id", pages.$("donation/index.tsx")._, {
    id: "donation-widget",
  }),

  r(
    "donation-calculator-export",
    donation_calculator.$("pdf-export/index.tsx")._
  ),

  r("api/anvil-doc/:eid", "./routes/anvil-doc/index.ts"),
  r("api/anvil-webhook", "./routes/anvil-webhook/index.ts"),
  r("api/balances/liq", "./routes/balances-liq.ts"),
  r("api/balances", "./routes/balances.ts"),
  r("api/chariot-webhook", "./routes/chariot-webhook/index.ts"),
  r("api/crypto-intents/:id", "./routes/crypto-intents.ts"),
  r("api/currencies", "./routes/currencies.ts"),
  r("api/donation-intents/:type", "./routes/donation-intents/index.ts"),
  r("api/file-upload", "./routes/file-upload.ts"),
  r("api/nav-txs", "./routes/nav-txs.ts"),
  r("api/nowpayments-webhook/:stage", "./routes/nowpayments-webhook/index.ts"),
  r("api/nowpayments/*", "./routes/nowpayments.ts"),
  r("api/npo/:id/donors", "./routes/npo-donors.ts"),
  r("api/npo/:id/payouts", "./routes/npo-payouts.ts"),
  r("api/npo/:id/programs", "./routes/npo-programs.ts"),
  r("api/npo/:id/sf-metrics", "./routes/npo-sf-metrics.ts"),
  r("api/npos/:id", "./routes/npos-by-id.ts"),
  r("api/npos/ein/:id", "./routes/npos-ein.ts"),
  r("api/npos", "./routes/npos.ts"),
  r("api/stripe-webhook/:stage", "./routes/stripe-webhook/index.ts"),
  r("api/paypal-webhook", "./routes/paypal-webhook/index.ts"),
  r("api/top-countries", "./routes/top-countries.ts"),
  r("api/wise/*", "./routes/wise.ts"),
  r("api/zapier/generate/:id", "./routes/zapier-generate.ts"),
  r("api/zapier/me", "./routes/zapier-me.ts"),
  r(
    "api/zapier/triggers/new-donation",
    "./routes/zapier-triggers-new-donation.ts"
  ),
  r("api/npos/interest-log-simul", "./routes/npo-interest-log-simul.ts"),
  r("api/irs-npos-aggregates/:type", "./routes/irs-npos-aggregates.ts"),
  r("api/irs-npos/export", "./routes/irs-npos-export.ts"),
  r(
    "api/alchemy-webhook/:chain_id/:signing_key",
    "./routes/alchemy-webhook/index.ts"
  ),
  r("api/tokens/:code/min-usd", "./routes/token-min-usd.ts"),
  r("q/final-recorder", "./routes/final-recorder/index.ts"),
  r("utils/calendar", "./routes/calendar.tsx"),
  r("robots.txt", "./routes/robots.ts"),
  r("sitemap.xml", "./routes/sitemap.ts"),

  r("crons/grants-processor", "./crons/grants-processor/index.ts"),
  r("crons/currencies-map", "./crons/currencies-map.ts"),
  r("crons/stripe-prices", "./crons/stripe-prices.ts"),
  r("crons/commissions-processor", "./crons/commissions-processor/index.ts"),
] satisfies RouteConfig;
