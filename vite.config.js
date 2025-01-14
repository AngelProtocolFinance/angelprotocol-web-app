import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { vitePlugin as remix } from "@remix-run/dev";
import { vercelPreset } from "@vercel/remix/vite";

const rmx = remix({
  presets: [vercelPreset()],
  appDirectory: "src",
  future: {
    v3_fetcherPersist: true,
    v3_relativeSplatPath: true,
    v3_throwAbortReason: true,
    v3_singleFetch: true,
    v3_lazyRouteDiscovery: true,
  },
  routes(defineRoutes) {
    return defineRoutes((r) => {
      r("", "./pages/Home/index.ts", { index: true });
      r("donate/:id", "./pages/Donate/index.tsx");
      r("donate-thanks", "./pages/DonateThanks.tsx");
      r("form-builder", "./pages/Widget/form-builder-layout.tsx", () => {
        r("", "./pages/Widget/index.ts", {
          index: true,
          id: "public-form-builder",
        });
      });
      r("admin/:id", "./pages/Admin/layout.tsx", () => {
        r("", "./pages/Admin/Charity/redirect.ts", { index: true });
        r("donations", "./pages/Admin/Charity/Donations/index.ts");
        r("programs", "./pages/Admin/Charity/Programs/index.ts");
        r("funds", "./pages/Admin/Charity/Funds/index.ts");
        r(
          "program-editor/:programId",
          "./pages/Admin/Charity/ProgramEditor/index.ts"
        );
        r("members", "./pages/Admin/Charity/Members/Members.tsx", () => {
          r("add", "./pages/Admin/Charity/Members/AddForm.tsx");
        });
        r("settings", "./pages/Admin/Charity/Settings/index.ts");
        r("edit-profile", "./pages/Admin/Charity/EditProfile/index.tsx");
        r("banking", "./pages/Admin/Charity/Banking/PayoutMethods/index.ts");
        r("banking/new", "./pages/Admin/Charity/Banking/Banking.tsx");
        r(
          "banking/:bankId",
          "./pages/Admin/Charity/Banking/PayoutMethod/PayoutMethod.tsx",
          () => {
            r(
              "delete",
              "./pages/Admin/Charity/Banking/PayoutMethod/DeletePrompt.tsx"
            );
          }
        );
        r("form-builder", "./pages/Widget/index.ts", {
          id: "admin-form-builder",
        });
        r("media", "./pages/Admin/Charity/Media/Media.tsx", () => {
          r("new", "./pages/Admin/Charity/Media/video-new.ts", {
            id: "media-new",
          });
          r(":mediaId", "./pages/Admin/Charity/Media/video-edit.ts", {
            id: "media-edit",
          });
        });
        r("media/videos", "./pages/Admin/Charity/Media/Videos/index.ts", () => {
          r("new", "./pages/Admin/Charity/Media/video-new.ts", {
            id: "videos-new",
          });
          r(":mediaId", "./pages/Admin/Charity/Media/video-edit.ts", {
            id: "videos-edit",
          });
        });
        r(
          "dashboard",
          "./pages/Admin/Charity/Dashboard/Dashboard.tsx",
          { id: "dashboard" },
          () => {
            r(
              "edit-alloc",
              "./pages/Admin/Charity/Dashboard/Schedule/Edit.tsx"
            );
            r("move-funds", "./pages/Admin/Charity/Dashboard/MoveFundForm.tsx");
          }
        );
      });
      r("", "./App/Layout.tsx", () => {
        r("login", "./pages/Signin.tsx");
        r("signup", "./pages/SignUp/layout.tsx", () => {
          r("", "./pages/SignUp/SignupForm/index.ts", { index: true });
          r("confirm", "./pages/SignUp/confirm-form/index.ts");
          r("success", "./pages/SignUp/Success.tsx");
        });
        r("login/reset", "./pages/ResetPassword/index.ts");
        r("dashboard", "./pages/UserDashboard/layout.tsx", () => {
          r("", "./pages/UserDashboard/index-route.ts", { index: true });
          r("edit-profile", "./pages/UserDashboard/EditProfile/index.ts");
          r("settings", "./pages/UserDashboard/Settings/index.ts");
          r("donations", "./pages/UserDashboard/Donations/index.tsx", () => {
            r(":id", "./components/KYCForm/index.tsx");
          });
          r("funds", "./pages/UserDashboard/Funds/index.ts");
        });
        r("logout", "./pages/logout.ts");
        r("nonprofit", "./pages/informational/NonprofitInfo/index.ts");
        r("donor", "./pages/informational/DonorInfo/index.ts");
        r("wp-plugin", "./pages/informational/WpPlugin.tsx");
        r("about", "./pages/informational/about/index.tsx");
        r("blog", "./pages/Blog/Posts.tsx");
        r("blog/:slug", "./pages/Blog/Post.tsx");
        r("marketplace", "./pages/Marketplace/index.tsx", () => {
          r("filter", "./pages/Marketplace/Filter/index.ts");
        });
        r("marketplace/:id", "./pages/Profile/Profile.tsx", () => {
          r("", "./pages/Profile/Body/Body.tsx", () => {
            r("", "./pages/Profile/Body/GeneralInfo/index.ts", {
              index: true,
            });
            r("program/:programId", "./pages/Profile/Body/Program/index.ts");
          });
        });
        r("funds", "./pages/Funds/Funds.tsx");
        r("funds/:fundId", "./pages/Funds/Fund/index.tsx");
        r("funds/:fundId/edit", "./pages/Funds/EditFund/index.ts");
        r("funds/new", "./pages/Funds/CreateFund/index.ts");
        r("privacy-policy", "./pages/Legal/PrivacyPolicy.tsx");
        r("terms-of-use-npo", "./pages/Legal/TermsNonprofits.tsx");
        r("terms-of-use", "./pages/Legal/TermsDonors.tsx");
        r("banking-applications", "./pages/BankingApplications/index.ts");
        r(
          "banking-applications/:id",
          "./pages/BankingApplication/BankingApplication.tsx",
          () => {
            r("approve", "./pages/BankingApplication/verdict-approve.tsx");
            r("reject", "./pages/BankingApplication/verdict-reject.tsx");
            r("success", "./pages/BankingApplication/success-prompt.tsx");
          }
        );
        r("register", "./pages/Registration/layout.tsx", () => {
          r("welcome", "./pages/Registration/Welcome.tsx");
        });
        r("applications", "./pages/Applications/index.ts");
        r("applications/:id", "./pages/Application/Application.tsx", () => {
          r(":verdict", "./pages/Application/review-route.tsx");
          r("success", "./pages/Application/success-prompt.tsx");
        });
      });
      r("donate-widget", "./pages/DonateWidget/widget-context.tsx", () => {
        r(":id", "./pages/DonateWidget/index.ts");
        r("donate-thanks", "./pages/DonateThanks.tsx", {
          id: "widget-donate-thanks",
        });
      });
    });
  },
});

export default defineConfig({
  base: "/",
  build: { outDir: "build" },
  server: { port: 4200 },
  plugins: [process.env.NODE_ENV === "test" ? undefined : rmx, tsconfigPaths()],
  test: {
    setupFiles: ["./src/setupTests.ts"],
    environment: "jsdom",
    globals: true,
  },
});
