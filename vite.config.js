import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { vitePlugin as remix } from "@remix-run/dev";
import { vercelPreset } from "@vercel/remix/vite";
import tailwind from "@tailwindcss/vite";

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
      r("", "./pages/home/home.tsx", { index: true });
      r("donate/:id", "./pages/donate/index.tsx");
      r("donate-fund/:fundId", "./pages/donate-fund/index.tsx");
      r("donate-thanks", "./pages/donate-thanks.tsx");
      r("form-builder", "./pages/widget/form-builder-layout.tsx", () => {
        r("", "./pages/widget/index.ts", {
          index: true,
          id: "public-form-builder",
        });
      });
      // no robots
      r("admin/:id", "./pages/admin/layout.tsx", () => {
        r("", "./pages/admin/charity/redirect.ts", { index: true });
        r("donations", "./pages/admin/charity/donations/donations.tsx");
        r("programs", "./pages/admin/charity/programs/programs.tsx");
        r("funds", "./pages/admin/charity/funds/funds.tsx");
        r(
          "program-editor/:programId",
          "./pages/admin/charity/program-editor/program-editor.tsx"
        );
        r(
          "members",
          "./pages/admin/charity/members/members.tsx",
          { id: "endow-admins" },
          () => {
            r("add", "./pages/admin/charity/members/add-form.tsx");
          }
        );
        r("settings", "./pages/admin/charity/settings/form.tsx");
        r("edit-profile", "./pages/admin/charity/edit-profile/index.tsx");
        r(
          "banking",
          "./pages/admin/charity/banking/payout-methods/payout-methods.tsx"
        );
        r("banking/new", "./pages/admin/charity/banking/banking.tsx");
        r(
          "banking/:bankId",
          "./pages/admin/charity/banking/payout-method/payout-method.tsx",
          () => {
            r(
              "delete",
              "./pages/admin/charity/banking/payout-method/delete-prompt.tsx"
            );
          }
        );
        r("form-builder", "./pages/widget/index.ts", {
          id: "admin-form-builder",
        });
        r("media", "./pages/admin/charity/media/media.tsx", () => {
          r("new", "./pages/admin/charity/media/video-new.ts", {
            id: "media-new",
          });
          r(":mediaId", "./pages/admin/charity/media/video-edit.ts", {
            id: "media-edit",
          });
        });
        r(
          "media/videos",
          "./pages/admin/charity/media/videos/videos.tsx",
          () => {
            r("new", "./pages/admin/charity/media/video-new.ts", {
              id: "videos-new",
            });
            r(":mediaId", "./pages/admin/charity/media/video-edit.ts", {
              id: "videos-edit",
            });
          }
        );
        r(
          "dashboard",
          "./pages/admin/charity/dashboard/dashboard.tsx",
          { id: "dashboard" },
          () => {
            r(
              "edit-alloc",
              "./pages/admin/charity/dashboard/schedule/edit.tsx"
            );
            r(
              "move-funds",
              "./pages/admin/charity/dashboard/move-fund-form.tsx"
            );
          }
        );
      });
      r("", "./layout/app/layout.tsx", () => {
        r("login", "./pages/signin.tsx");
        r("signup", "./pages/sign-up/layout.tsx", () => {
          r("", "./pages/sign-up/signup-form/signup-form.tsx", { index: true });
          r("confirm", "./pages/sign-up/confirm-form/confirm-form.tsx");
          r("success", "./pages/sign-up/success.tsx");
        });
        r("login/reset", "./pages/reset-password/reset-password.tsx");
        // no robots
        r("dashboard", "./pages/user-dashboard/layout.tsx", () => {
          r("", "./pages/user-dashboard/index-route.ts", { index: true });
          r("edit-profile", "./pages/user-dashboard/edit-profile/index.ts");
          r("settings", "./pages/user-dashboard/settings/settings.tsx");
          r("donations", "./pages/user-dashboard/donations/index.tsx", () => {
            r(":id", "./components/kyc-form/index.tsx");
          });
          r("funds", "./pages/user-dashboard/funds/funds.tsx");
        });
        r("logout", "./pages/logout.ts");
        r("nonprofit", "./pages/informational/nonprofit-info/index.ts");
        r("donor", "./pages/informational/donor-info/index.ts");
        r("wp-plugin", "./pages/informational/wp-plugin.tsx");
        r("about-us", "./pages/informational/about/index.tsx");
        r("blog", "./pages/blog/posts.tsx");
        r("blog/:slug", "./pages/blog/post.tsx");
        r("marketplace", "./pages/marketplace/index.tsx", () => {
          r("filter", "./pages/marketplace/filter/index.ts");
        });
        r("marketplace/:id", "./pages/profile/profile.tsx", () => {
          r("", "./pages/profile/body/body.tsx", () => {
            r("", "./pages/profile/body/general-info/index.ts", {
              index: true,
            });
            r("program/:programId", "./pages/profile/body/program/index.ts");
          });
        });
        r("profile/:id", "./pages/profile/profile-redirect.ts");
        r("funds", "./pages/funds/funds.tsx");
        r("funds/:fundId", "./pages/funds/fund/index.tsx");
        r("funds/:fundId/edit", "./pages/funds/edit-fund/index.ts");
        r("funds/new", "./pages/funds/create-fund/index.ts");
        r("privacy-policy", "./pages/legal/privacy-policy.tsx");
        r("terms-of-use-npo", "./pages/legal/terms-nonprofits.tsx");
        r("terms-of-use", "./pages/legal/terms-donors.tsx");
        // no robots
        r("banking-applications", "./pages/banking-applications/index.ts");
        r(
          "banking-applications/:id",
          "./pages/banking-application/banking-application.tsx",
          () => {
            r("approve", "./pages/banking-application/verdict-approve.tsx");
            r("reject", "./pages/banking-application/verdict-reject.tsx");
            r("success", "./pages/banking-application/success-prompt.tsx");
          }
        );
        r("register", "./pages/registration/layout.tsx", () => {
          r("", "./pages/registration/sign-up/index.ts", { index: true });
          r("success", "./pages/registration/success.tsx");
          r("welcome", "./pages/registration/welcome.tsx");
          r("resume", "./pages/registration/resume/form.tsx");
          r(
            ":regId",
            "./pages/registration/steps/layout.ts",
            { id: "reg$Id" },
            () => {
              r("sign-result", "./pages/registration/signing-result/index.ts");
              r("", "./pages/registration/steps/steps-layout.tsx", () => {
                r("", "./pages/registration/steps/steps-index.ts", {
                  index: true,
                });
                r("1", "./pages/registration/steps/contact-details/index.tsx");
                r("2", "./pages/registration/steps/org-details/index.tsx");
                r("3", "./pages/registration/steps/fsa-inquiry/index.ts");
                r(
                  "4",
                  "./pages/registration/steps/documentation/index.ts",
                  () => {
                    r("fsa", "./pages/registration/data/fsa-action.ts");
                  }
                );
                r("5", "./pages/registration/steps/banking/index.ts");
                r("6", "./pages/registration/steps/dashboard/index.tsx");
              });
            }
          );
        });
        // no robots
        r("applications", "./pages/applications/index.ts");
        // no robots
        r("applications/:id", "./pages/application/application.tsx", () => {
          r(":verdict", "./pages/application/review-route.tsx");
          r("success", "./pages/application/success-prompt.tsx");
        });
      });
      r("donate-widget", "./pages/donate-widget/widget-context.tsx", () => {
        r(":id", "./pages/donate-widget/index.ts");
        r("donate-thanks", "./pages/donate-thanks.tsx", {
          id: "widget-donate-thanks",
        });
      });
    });
  },
});

export default defineConfig({
  base: "/",
  build: { outDir: "build", target: "es2022" },
  server: { port: 4200 },
  plugins: [
    process.env.NODE_ENV === "test" ? undefined : rmx,
    tsconfigPaths(),
    tailwind(),
  ],
  test: {
    setupFiles: ["./src/setupTests.ts"],
    environment: "jsdom",
    globals: true,
  },
});
