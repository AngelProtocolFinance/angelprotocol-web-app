// vite.config.js
import { defineConfig } from "file:///Users/justin/projects/web-app/node_modules/.pnpm/vite@5.2.0_@types+node@18.18.13_lightningcss@1.29.1/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///Users/justin/projects/web-app/node_modules/.pnpm/vite-tsconfig-paths@5.1.4_typescript@5.7.3_vite@5.2.0_@types+node@18.18.13_lightningcss@1.29.1_/node_modules/vite-tsconfig-paths/dist/index.js";
import { vitePlugin as remix } from "file:///Users/justin/projects/web-app/node_modules/.pnpm/@remix-run+dev@2.15.2_@remix-run+react@2.15.2_react-dom@18.2.0_react@18.2.0__react@18.2_be5910e8bdd6ca5737d4d5113d4d544f/node_modules/@remix-run/dev/dist/index.js";
import { vercelPreset } from "file:///Users/justin/projects/web-app/node_modules/.pnpm/@vercel+remix@2.15.2_@remix-run+dev@2.15.2_@remix-run+react@2.15.2_react-dom@18.2.0_rea_fad236d9e31eefcf28e848f949b1fa65/node_modules/@vercel/remix/vite.js";
import tailwind from "file:///Users/justin/projects/web-app/node_modules/.pnpm/@tailwindcss+vite@4.0.0_vite@5.2.0_@types+node@18.18.13_lightningcss@1.29.1_/node_modules/@tailwindcss/vite/dist/index.mjs";
var rmx = remix({
  presets: [vercelPreset()],
  appDirectory: "src",
  future: {
    v3_fetcherPersist: true,
    v3_relativeSplatPath: true,
    v3_throwAbortReason: true,
    v3_singleFetch: true,
    v3_lazyRouteDiscovery: true
  },
  routes(defineRoutes) {
    return defineRoutes((r) => {
      r("", "./pages/home/home.tsx", { index: true });
      r("donate/:id", "./pages/donate/index.tsx");
      r("donate-fund/:fundId", "./pages/donate-fund/redirect.ts");
      r("fundraisers/:fundId/donate", "./pages/donate-fund/index.tsx");
      r("donate-thanks", "./pages/donate-thanks.tsx");
      r("referral-program", "./pages/landing/referrals/index.tsx");
      r("see-what-youre-losing", "./pages/landing/don-calculator/index.tsx");
      r(
        "simplify-fundraising-maximize-impact",
        "./pages/landing/us-nonprofits/index.tsx",
        {
          id: "page-a"
        }
      );
      r(
        "simplify-fundraising-maximize-impacts",
        "./pages/landing/us-nonprofits/index.tsx",
        { id: "page-a2" }
      );
      r(
        "the-smart-move-to-make-for-accepting-crypto-donations",
        "./pages/landing/tgb-attack/index.tsx"
      );
      r("form-builder", "./pages/widget/form-builder-layout.tsx", () => {
        r("", "./pages/widget/index.ts", {
          index: true,
          id: "public-form-builder"
        });
      });
      r("admin/:id", "./pages/admin/layout.tsx", () => {
        r("", "./pages/admin/redirect.ts", { index: true });
        r("donations", "./pages/admin/donations/donations.tsx");
        r("programs", "./pages/admin/programs/programs.tsx");
        r("funds", "./pages/admin/funds/funds.tsx");
        r("integrations", "./pages/admin/integrations/index.tsx");
        r(
          "program-editor/:programId",
          "./pages/admin/program-editor/program-editor.tsx"
        );
        r(
          "members",
          "./pages/admin/members/members.tsx",
          { id: "endow-admins" },
          () => {
            r("add", "./pages/admin/members/add-form.tsx");
          }
        );
        r("settings", "./pages/admin/settings/form.tsx");
        r("edit-profile", "./pages/admin/edit-profile/index.tsx");
        r("banking", "./pages/admin/banking/payout-methods/payout-methods.tsx");
        r("banking/new", "./pages/admin/banking/banking.tsx");
        r(
          "banking/:bankId",
          "./pages/admin/banking/payout-method/payout-method.tsx",
          () => {
            r(
              "delete",
              "./pages/admin/banking/payout-method/delete-prompt.tsx"
            );
          }
        );
        r("form-builder", "./pages/widget/index.ts", {
          id: "admin-form-builder"
        });
        r("media", "./pages/admin/media/media.tsx", () => {
          r("new", "./pages/admin/media/video-new.ts", {
            id: "media-new"
          });
          r(":mediaId", "./pages/admin/media/video-edit.ts", {
            id: "media-edit"
          });
        });
        r("media/videos", "./pages/admin/media/videos/videos.tsx", () => {
          r("new", "./pages/admin/media/video-new.ts", {
            id: "videos-new"
          });
          r(":mediaId", "./pages/admin/media/video-edit.ts", {
            id: "videos-edit"
          });
        });
        r(
          "dashboard",
          "./pages/admin/dashboard/dashboard.tsx",
          { id: "dashboard" },
          () => {
            r("edit-alloc", "./pages/admin/dashboard/schedule/edit.tsx");
            r("move-funds", "./pages/admin/dashboard/move-fund-form.tsx");
          }
        );
        r("referrals", "./pages/admin/referrals/index.tsx");
        r(
          "referrals/earnings",
          "./pages/admin/referrals/earnings-history/index.tsx"
        );
        r(
          "referrals/payouts",
          "./pages/admin/referrals/payout-history/index.tsx"
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
        r("dashboard", "./pages/user-dashboard/layout.tsx", () => {
          r("", "./pages/user-dashboard/index-route.ts", { index: true });
          r("edit-profile", "./pages/user-dashboard/edit-profile/index.ts");
          r("settings", "./pages/user-dashboard/settings/settings.tsx");
          r("donations", "./pages/user-dashboard/donations/index.tsx", () => {
            r(":id", "./components/kyc-form/index.tsx");
          });
          r(
            "subscriptions",
            "./pages/user-dashboard/subscriptions/index.tsx",
            () => {
              r(
                "cancel/:sub_id",
                "./pages/user-dashboard/subscriptions/cancel/index.tsx"
              );
            }
          );
          r("funds", "./pages/user-dashboard/funds/funds.tsx");
          r("referrals", "./pages/user-dashboard/referrals/index.tsx", () => {
            r(
              "payout-min",
              "./pages/user-dashboard/referrals/payout-min/index.tsx"
            );
            r("w-form", "./pages/user-dashboard/referrals/w-forms/index.tsx");
            r(
              "w-form-signed",
              "./pages/user-dashboard/referrals/w-form-signed/index.tsx"
            );
          });
          r(
            "referrals/payout",
            "./pages/user-dashboard/referrals/payout/index.tsx"
          );
          r(
            "referrals/earnings",
            "./pages/user-dashboard/referrals/earnings-history/index.tsx"
          );
          r(
            "referrals/payouts",
            "./pages/user-dashboard/referrals/payout-history/index.tsx"
          );
        });
        r("logout", "./pages/logout.ts");
        r("nonprofit", "./pages/informational/nonprofit-info/index.ts");
        r("donor", "./pages/informational/donor-info/index.ts");
        r("wp-plugin", "./pages/informational/wp-plugin.tsx");
        r(
          "zapier-integration",
          "./pages/informational/zapier-integration/index.tsx"
        );
        r("about-us", "./pages/informational/about/index.tsx");
        r("blog", "./pages/blog/posts.tsx");
        r("blog/:slug", "./pages/blog/post.tsx");
        r("marketplace", "./pages/marketplace/index.tsx", () => {
          r("filter", "./pages/marketplace/filter/index.ts");
        });
        r("marketplace/:id", "./pages/profile/profile.tsx", () => {
          r("", "./pages/profile/body/body.tsx", () => {
            r("", "./pages/profile/body/general-info/index.ts", {
              index: true
            });
            r("program/:programId", "./pages/profile/body/program/index.ts");
          });
        });
        r("profile/:id", "./pages/profile/profile-redirect.ts");
        r("funds/*", "./pages/funds/redirect.ts");
        r("fundraisers", "./pages/funds/funds.tsx");
        r("fundraisers/:fundId", "./pages/funds/fund/index.tsx");
        r("fundraisers/:fundId/edit", "./pages/funds/edit-fund/index.ts");
        r("fundraisers/new", "./pages/funds/create-fund/index.ts");
        r("privacy-policy", "./pages/legal/privacy-policy.tsx");
        r("terms-of-use-npo", "./pages/legal/terms-nonprofits.tsx");
        r("terms-of-use", "./pages/legal/terms-donors.tsx");
        r("terms-of-use-referrals", "./pages/legal/terms-referrals.tsx");
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
                  index: true
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
        r("applications", "./pages/applications/index.ts");
        r("applications/:id", "./pages/application/application.tsx", () => {
          r(":verdict", "./pages/application/review-route.tsx");
          r("success", "./pages/application/success-prompt.tsx");
        });
        r("donation-calculator", "./pages/donation-calculator/index.tsx");
      });
      r("donate-widget", "./pages/donate-widget/widget-context.tsx", () => {
        r(":id", "./pages/donate-widget/index.ts");
        r("donate-thanks", "./pages/donate-thanks.tsx", {
          id: "widget-donate-thanks"
        });
      });
      r(
        "donation-calculator-export",
        "./pages/donation-calculator/pdf-export/index.tsx"
      );
    });
  }
});
var vite_config_default = defineConfig({
  base: "/",
  build: { outDir: "build", target: "es2022" },
  server: { port: 4e3 },
  plugins: [
    process.env.NODE_ENV === "test" ? void 0 : rmx,
    tsconfigPaths(),
    tailwind()
  ],
  test: {
    setupFiles: ["./src/setup-tests.ts"],
    environment: "jsdom",
    globals: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvanVzdGluL3Byb2plY3RzL3dlYi1hcHBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qdXN0aW4vcHJvamVjdHMvd2ViLWFwcC92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvanVzdGluL3Byb2plY3RzL3dlYi1hcHAvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcbmltcG9ydCB7IHZpdGVQbHVnaW4gYXMgcmVtaXggfSBmcm9tIFwiQHJlbWl4LXJ1bi9kZXZcIjtcbmltcG9ydCB7IHZlcmNlbFByZXNldCB9IGZyb20gXCJAdmVyY2VsL3JlbWl4L3ZpdGVcIjtcbmltcG9ydCB0YWlsd2luZCBmcm9tIFwiQHRhaWx3aW5kY3NzL3ZpdGVcIjtcblxuY29uc3Qgcm14ID0gcmVtaXgoe1xuICBwcmVzZXRzOiBbdmVyY2VsUHJlc2V0KCldLFxuICBhcHBEaXJlY3Rvcnk6IFwic3JjXCIsXG4gIGZ1dHVyZToge1xuICAgIHYzX2ZldGNoZXJQZXJzaXN0OiB0cnVlLFxuICAgIHYzX3JlbGF0aXZlU3BsYXRQYXRoOiB0cnVlLFxuICAgIHYzX3Rocm93QWJvcnRSZWFzb246IHRydWUsXG4gICAgdjNfc2luZ2xlRmV0Y2g6IHRydWUsXG4gICAgdjNfbGF6eVJvdXRlRGlzY292ZXJ5OiB0cnVlLFxuICB9LFxuICByb3V0ZXMoZGVmaW5lUm91dGVzKSB7XG4gICAgcmV0dXJuIGRlZmluZVJvdXRlcygocikgPT4ge1xuICAgICAgcihcIlwiLCBcIi4vcGFnZXMvaG9tZS9ob21lLnRzeFwiLCB7IGluZGV4OiB0cnVlIH0pO1xuICAgICAgcihcImRvbmF0ZS86aWRcIiwgXCIuL3BhZ2VzL2RvbmF0ZS9pbmRleC50c3hcIik7XG4gICAgICByKFwiZG9uYXRlLWZ1bmQvOmZ1bmRJZFwiLCBcIi4vcGFnZXMvZG9uYXRlLWZ1bmQvcmVkaXJlY3QudHNcIik7XG4gICAgICByKFwiZnVuZHJhaXNlcnMvOmZ1bmRJZC9kb25hdGVcIiwgXCIuL3BhZ2VzL2RvbmF0ZS1mdW5kL2luZGV4LnRzeFwiKTtcbiAgICAgIHIoXCJkb25hdGUtdGhhbmtzXCIsIFwiLi9wYWdlcy9kb25hdGUtdGhhbmtzLnRzeFwiKTtcbiAgICAgIHIoXCJyZWZlcnJhbC1wcm9ncmFtXCIsIFwiLi9wYWdlcy9sYW5kaW5nL3JlZmVycmFscy9pbmRleC50c3hcIik7XG4gICAgICByKFwic2VlLXdoYXQteW91cmUtbG9zaW5nXCIsIFwiLi9wYWdlcy9sYW5kaW5nL2Rvbi1jYWxjdWxhdG9yL2luZGV4LnRzeFwiKTtcbiAgICAgIHIoXG4gICAgICAgIFwic2ltcGxpZnktZnVuZHJhaXNpbmctbWF4aW1pemUtaW1wYWN0XCIsXG4gICAgICAgIFwiLi9wYWdlcy9sYW5kaW5nL3VzLW5vbnByb2ZpdHMvaW5kZXgudHN4XCIsXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogXCJwYWdlLWFcIixcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIHIoXG4gICAgICAgIFwic2ltcGxpZnktZnVuZHJhaXNpbmctbWF4aW1pemUtaW1wYWN0c1wiLFxuICAgICAgICBcIi4vcGFnZXMvbGFuZGluZy91cy1ub25wcm9maXRzL2luZGV4LnRzeFwiLFxuICAgICAgICB7IGlkOiBcInBhZ2UtYTJcIiB9XG4gICAgICApO1xuICAgICAgcihcbiAgICAgICAgXCJ0aGUtc21hcnQtbW92ZS10by1tYWtlLWZvci1hY2NlcHRpbmctY3J5cHRvLWRvbmF0aW9uc1wiLFxuICAgICAgICBcIi4vcGFnZXMvbGFuZGluZy90Z2ItYXR0YWNrL2luZGV4LnRzeFwiXG4gICAgICApO1xuICAgICAgcihcImZvcm0tYnVpbGRlclwiLCBcIi4vcGFnZXMvd2lkZ2V0L2Zvcm0tYnVpbGRlci1sYXlvdXQudHN4XCIsICgpID0+IHtcbiAgICAgICAgcihcIlwiLCBcIi4vcGFnZXMvd2lkZ2V0L2luZGV4LnRzXCIsIHtcbiAgICAgICAgICBpbmRleDogdHJ1ZSxcbiAgICAgICAgICBpZDogXCJwdWJsaWMtZm9ybS1idWlsZGVyXCIsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICAvLyBubyByb2JvdHNcbiAgICAgIHIoXCJhZG1pbi86aWRcIiwgXCIuL3BhZ2VzL2FkbWluL2xheW91dC50c3hcIiwgKCkgPT4ge1xuICAgICAgICByKFwiXCIsIFwiLi9wYWdlcy9hZG1pbi9yZWRpcmVjdC50c1wiLCB7IGluZGV4OiB0cnVlIH0pO1xuICAgICAgICByKFwiZG9uYXRpb25zXCIsIFwiLi9wYWdlcy9hZG1pbi9kb25hdGlvbnMvZG9uYXRpb25zLnRzeFwiKTtcbiAgICAgICAgcihcInByb2dyYW1zXCIsIFwiLi9wYWdlcy9hZG1pbi9wcm9ncmFtcy9wcm9ncmFtcy50c3hcIik7XG4gICAgICAgIHIoXCJmdW5kc1wiLCBcIi4vcGFnZXMvYWRtaW4vZnVuZHMvZnVuZHMudHN4XCIpO1xuICAgICAgICByKFwiaW50ZWdyYXRpb25zXCIsIFwiLi9wYWdlcy9hZG1pbi9pbnRlZ3JhdGlvbnMvaW5kZXgudHN4XCIpO1xuICAgICAgICByKFxuICAgICAgICAgIFwicHJvZ3JhbS1lZGl0b3IvOnByb2dyYW1JZFwiLFxuICAgICAgICAgIFwiLi9wYWdlcy9hZG1pbi9wcm9ncmFtLWVkaXRvci9wcm9ncmFtLWVkaXRvci50c3hcIlxuICAgICAgICApO1xuICAgICAgICByKFxuICAgICAgICAgIFwibWVtYmVyc1wiLFxuICAgICAgICAgIFwiLi9wYWdlcy9hZG1pbi9tZW1iZXJzL21lbWJlcnMudHN4XCIsXG4gICAgICAgICAgeyBpZDogXCJlbmRvdy1hZG1pbnNcIiB9LFxuICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIHIoXCJhZGRcIiwgXCIuL3BhZ2VzL2FkbWluL21lbWJlcnMvYWRkLWZvcm0udHN4XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgcihcInNldHRpbmdzXCIsIFwiLi9wYWdlcy9hZG1pbi9zZXR0aW5ncy9mb3JtLnRzeFwiKTtcbiAgICAgICAgcihcImVkaXQtcHJvZmlsZVwiLCBcIi4vcGFnZXMvYWRtaW4vZWRpdC1wcm9maWxlL2luZGV4LnRzeFwiKTtcbiAgICAgICAgcihcImJhbmtpbmdcIiwgXCIuL3BhZ2VzL2FkbWluL2JhbmtpbmcvcGF5b3V0LW1ldGhvZHMvcGF5b3V0LW1ldGhvZHMudHN4XCIpO1xuICAgICAgICByKFwiYmFua2luZy9uZXdcIiwgXCIuL3BhZ2VzL2FkbWluL2JhbmtpbmcvYmFua2luZy50c3hcIik7XG4gICAgICAgIHIoXG4gICAgICAgICAgXCJiYW5raW5nLzpiYW5rSWRcIixcbiAgICAgICAgICBcIi4vcGFnZXMvYWRtaW4vYmFua2luZy9wYXlvdXQtbWV0aG9kL3BheW91dC1tZXRob2QudHN4XCIsXG4gICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgcihcbiAgICAgICAgICAgICAgXCJkZWxldGVcIixcbiAgICAgICAgICAgICAgXCIuL3BhZ2VzL2FkbWluL2JhbmtpbmcvcGF5b3V0LW1ldGhvZC9kZWxldGUtcHJvbXB0LnRzeFwiXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgcihcImZvcm0tYnVpbGRlclwiLCBcIi4vcGFnZXMvd2lkZ2V0L2luZGV4LnRzXCIsIHtcbiAgICAgICAgICBpZDogXCJhZG1pbi1mb3JtLWJ1aWxkZXJcIixcbiAgICAgICAgfSk7XG4gICAgICAgIHIoXCJtZWRpYVwiLCBcIi4vcGFnZXMvYWRtaW4vbWVkaWEvbWVkaWEudHN4XCIsICgpID0+IHtcbiAgICAgICAgICByKFwibmV3XCIsIFwiLi9wYWdlcy9hZG1pbi9tZWRpYS92aWRlby1uZXcudHNcIiwge1xuICAgICAgICAgICAgaWQ6IFwibWVkaWEtbmV3XCIsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcihcIjptZWRpYUlkXCIsIFwiLi9wYWdlcy9hZG1pbi9tZWRpYS92aWRlby1lZGl0LnRzXCIsIHtcbiAgICAgICAgICAgIGlkOiBcIm1lZGlhLWVkaXRcIixcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHIoXCJtZWRpYS92aWRlb3NcIiwgXCIuL3BhZ2VzL2FkbWluL21lZGlhL3ZpZGVvcy92aWRlb3MudHN4XCIsICgpID0+IHtcbiAgICAgICAgICByKFwibmV3XCIsIFwiLi9wYWdlcy9hZG1pbi9tZWRpYS92aWRlby1uZXcudHNcIiwge1xuICAgICAgICAgICAgaWQ6IFwidmlkZW9zLW5ld1wiLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHIoXCI6bWVkaWFJZFwiLCBcIi4vcGFnZXMvYWRtaW4vbWVkaWEvdmlkZW8tZWRpdC50c1wiLCB7XG4gICAgICAgICAgICBpZDogXCJ2aWRlb3MtZWRpdFwiLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcihcbiAgICAgICAgICBcImRhc2hib2FyZFwiLFxuICAgICAgICAgIFwiLi9wYWdlcy9hZG1pbi9kYXNoYm9hcmQvZGFzaGJvYXJkLnRzeFwiLFxuICAgICAgICAgIHsgaWQ6IFwiZGFzaGJvYXJkXCIgfSxcbiAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICByKFwiZWRpdC1hbGxvY1wiLCBcIi4vcGFnZXMvYWRtaW4vZGFzaGJvYXJkL3NjaGVkdWxlL2VkaXQudHN4XCIpO1xuICAgICAgICAgICAgcihcIm1vdmUtZnVuZHNcIiwgXCIuL3BhZ2VzL2FkbWluL2Rhc2hib2FyZC9tb3ZlLWZ1bmQtZm9ybS50c3hcIik7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICByKFwicmVmZXJyYWxzXCIsIFwiLi9wYWdlcy9hZG1pbi9yZWZlcnJhbHMvaW5kZXgudHN4XCIpO1xuICAgICAgICByKFxuICAgICAgICAgIFwicmVmZXJyYWxzL2Vhcm5pbmdzXCIsXG4gICAgICAgICAgXCIuL3BhZ2VzL2FkbWluL3JlZmVycmFscy9lYXJuaW5ncy1oaXN0b3J5L2luZGV4LnRzeFwiXG4gICAgICAgICk7XG4gICAgICAgIHIoXG4gICAgICAgICAgXCJyZWZlcnJhbHMvcGF5b3V0c1wiLFxuICAgICAgICAgIFwiLi9wYWdlcy9hZG1pbi9yZWZlcnJhbHMvcGF5b3V0LWhpc3RvcnkvaW5kZXgudHN4XCJcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgICAgcihcIlwiLCBcIi4vbGF5b3V0L2FwcC9sYXlvdXQudHN4XCIsICgpID0+IHtcbiAgICAgICAgcihcImxvZ2luXCIsIFwiLi9wYWdlcy9zaWduaW4udHN4XCIpO1xuICAgICAgICByKFwic2lnbnVwXCIsIFwiLi9wYWdlcy9zaWduLXVwL2xheW91dC50c3hcIiwgKCkgPT4ge1xuICAgICAgICAgIHIoXCJcIiwgXCIuL3BhZ2VzL3NpZ24tdXAvc2lnbnVwLWZvcm0vc2lnbnVwLWZvcm0udHN4XCIsIHsgaW5kZXg6IHRydWUgfSk7XG4gICAgICAgICAgcihcImNvbmZpcm1cIiwgXCIuL3BhZ2VzL3NpZ24tdXAvY29uZmlybS1mb3JtL2NvbmZpcm0tZm9ybS50c3hcIik7XG4gICAgICAgICAgcihcInN1Y2Nlc3NcIiwgXCIuL3BhZ2VzL3NpZ24tdXAvc3VjY2Vzcy50c3hcIik7XG4gICAgICAgIH0pO1xuICAgICAgICByKFwibG9naW4vcmVzZXRcIiwgXCIuL3BhZ2VzL3Jlc2V0LXBhc3N3b3JkL3Jlc2V0LXBhc3N3b3JkLnRzeFwiKTtcbiAgICAgICAgLy8gbm8gcm9ib3RzXG4gICAgICAgIHIoXCJkYXNoYm9hcmRcIiwgXCIuL3BhZ2VzL3VzZXItZGFzaGJvYXJkL2xheW91dC50c3hcIiwgKCkgPT4ge1xuICAgICAgICAgIHIoXCJcIiwgXCIuL3BhZ2VzL3VzZXItZGFzaGJvYXJkL2luZGV4LXJvdXRlLnRzXCIsIHsgaW5kZXg6IHRydWUgfSk7XG4gICAgICAgICAgcihcImVkaXQtcHJvZmlsZVwiLCBcIi4vcGFnZXMvdXNlci1kYXNoYm9hcmQvZWRpdC1wcm9maWxlL2luZGV4LnRzXCIpO1xuICAgICAgICAgIHIoXCJzZXR0aW5nc1wiLCBcIi4vcGFnZXMvdXNlci1kYXNoYm9hcmQvc2V0dGluZ3Mvc2V0dGluZ3MudHN4XCIpO1xuICAgICAgICAgIHIoXCJkb25hdGlvbnNcIiwgXCIuL3BhZ2VzL3VzZXItZGFzaGJvYXJkL2RvbmF0aW9ucy9pbmRleC50c3hcIiwgKCkgPT4ge1xuICAgICAgICAgICAgcihcIjppZFwiLCBcIi4vY29tcG9uZW50cy9reWMtZm9ybS9pbmRleC50c3hcIik7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcihcbiAgICAgICAgICAgIFwic3Vic2NyaXB0aW9uc1wiLFxuICAgICAgICAgICAgXCIuL3BhZ2VzL3VzZXItZGFzaGJvYXJkL3N1YnNjcmlwdGlvbnMvaW5kZXgudHN4XCIsXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgIHIoXG4gICAgICAgICAgICAgICAgXCJjYW5jZWwvOnN1Yl9pZFwiLFxuICAgICAgICAgICAgICAgIFwiLi9wYWdlcy91c2VyLWRhc2hib2FyZC9zdWJzY3JpcHRpb25zL2NhbmNlbC9pbmRleC50c3hcIlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICAgICAgcihcImZ1bmRzXCIsIFwiLi9wYWdlcy91c2VyLWRhc2hib2FyZC9mdW5kcy9mdW5kcy50c3hcIik7XG4gICAgICAgICAgcihcInJlZmVycmFsc1wiLCBcIi4vcGFnZXMvdXNlci1kYXNoYm9hcmQvcmVmZXJyYWxzL2luZGV4LnRzeFwiLCAoKSA9PiB7XG4gICAgICAgICAgICByKFxuICAgICAgICAgICAgICBcInBheW91dC1taW5cIixcbiAgICAgICAgICAgICAgXCIuL3BhZ2VzL3VzZXItZGFzaGJvYXJkL3JlZmVycmFscy9wYXlvdXQtbWluL2luZGV4LnRzeFwiXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcihcInctZm9ybVwiLCBcIi4vcGFnZXMvdXNlci1kYXNoYm9hcmQvcmVmZXJyYWxzL3ctZm9ybXMvaW5kZXgudHN4XCIpO1xuICAgICAgICAgICAgcihcbiAgICAgICAgICAgICAgXCJ3LWZvcm0tc2lnbmVkXCIsXG4gICAgICAgICAgICAgIFwiLi9wYWdlcy91c2VyLWRhc2hib2FyZC9yZWZlcnJhbHMvdy1mb3JtLXNpZ25lZC9pbmRleC50c3hcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByKFxuICAgICAgICAgICAgXCJyZWZlcnJhbHMvcGF5b3V0XCIsXG4gICAgICAgICAgICBcIi4vcGFnZXMvdXNlci1kYXNoYm9hcmQvcmVmZXJyYWxzL3BheW91dC9pbmRleC50c3hcIlxuICAgICAgICAgICk7XG4gICAgICAgICAgcihcbiAgICAgICAgICAgIFwicmVmZXJyYWxzL2Vhcm5pbmdzXCIsXG4gICAgICAgICAgICBcIi4vcGFnZXMvdXNlci1kYXNoYm9hcmQvcmVmZXJyYWxzL2Vhcm5pbmdzLWhpc3RvcnkvaW5kZXgudHN4XCJcbiAgICAgICAgICApO1xuICAgICAgICAgIHIoXG4gICAgICAgICAgICBcInJlZmVycmFscy9wYXlvdXRzXCIsXG4gICAgICAgICAgICBcIi4vcGFnZXMvdXNlci1kYXNoYm9hcmQvcmVmZXJyYWxzL3BheW91dC1oaXN0b3J5L2luZGV4LnRzeFwiXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcihcImxvZ291dFwiLCBcIi4vcGFnZXMvbG9nb3V0LnRzXCIpO1xuICAgICAgICByKFwibm9ucHJvZml0XCIsIFwiLi9wYWdlcy9pbmZvcm1hdGlvbmFsL25vbnByb2ZpdC1pbmZvL2luZGV4LnRzXCIpO1xuICAgICAgICByKFwiZG9ub3JcIiwgXCIuL3BhZ2VzL2luZm9ybWF0aW9uYWwvZG9ub3ItaW5mby9pbmRleC50c1wiKTtcbiAgICAgICAgcihcIndwLXBsdWdpblwiLCBcIi4vcGFnZXMvaW5mb3JtYXRpb25hbC93cC1wbHVnaW4udHN4XCIpO1xuICAgICAgICByKFxuICAgICAgICAgIFwiemFwaWVyLWludGVncmF0aW9uXCIsXG4gICAgICAgICAgXCIuL3BhZ2VzL2luZm9ybWF0aW9uYWwvemFwaWVyLWludGVncmF0aW9uL2luZGV4LnRzeFwiXG4gICAgICAgICk7XG4gICAgICAgIHIoXCJhYm91dC11c1wiLCBcIi4vcGFnZXMvaW5mb3JtYXRpb25hbC9hYm91dC9pbmRleC50c3hcIik7XG4gICAgICAgIHIoXCJibG9nXCIsIFwiLi9wYWdlcy9ibG9nL3Bvc3RzLnRzeFwiKTtcbiAgICAgICAgcihcImJsb2cvOnNsdWdcIiwgXCIuL3BhZ2VzL2Jsb2cvcG9zdC50c3hcIik7XG4gICAgICAgIHIoXCJtYXJrZXRwbGFjZVwiLCBcIi4vcGFnZXMvbWFya2V0cGxhY2UvaW5kZXgudHN4XCIsICgpID0+IHtcbiAgICAgICAgICByKFwiZmlsdGVyXCIsIFwiLi9wYWdlcy9tYXJrZXRwbGFjZS9maWx0ZXIvaW5kZXgudHNcIik7XG4gICAgICAgIH0pO1xuICAgICAgICByKFwibWFya2V0cGxhY2UvOmlkXCIsIFwiLi9wYWdlcy9wcm9maWxlL3Byb2ZpbGUudHN4XCIsICgpID0+IHtcbiAgICAgICAgICByKFwiXCIsIFwiLi9wYWdlcy9wcm9maWxlL2JvZHkvYm9keS50c3hcIiwgKCkgPT4ge1xuICAgICAgICAgICAgcihcIlwiLCBcIi4vcGFnZXMvcHJvZmlsZS9ib2R5L2dlbmVyYWwtaW5mby9pbmRleC50c1wiLCB7XG4gICAgICAgICAgICAgIGluZGV4OiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByKFwicHJvZ3JhbS86cHJvZ3JhbUlkXCIsIFwiLi9wYWdlcy9wcm9maWxlL2JvZHkvcHJvZ3JhbS9pbmRleC50c1wiKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHIoXCJwcm9maWxlLzppZFwiLCBcIi4vcGFnZXMvcHJvZmlsZS9wcm9maWxlLXJlZGlyZWN0LnRzXCIpO1xuICAgICAgICByKFwiZnVuZHMvKlwiLCBcIi4vcGFnZXMvZnVuZHMvcmVkaXJlY3QudHNcIik7XG4gICAgICAgIHIoXCJmdW5kcmFpc2Vyc1wiLCBcIi4vcGFnZXMvZnVuZHMvZnVuZHMudHN4XCIpO1xuICAgICAgICByKFwiZnVuZHJhaXNlcnMvOmZ1bmRJZFwiLCBcIi4vcGFnZXMvZnVuZHMvZnVuZC9pbmRleC50c3hcIik7XG4gICAgICAgIHIoXCJmdW5kcmFpc2Vycy86ZnVuZElkL2VkaXRcIiwgXCIuL3BhZ2VzL2Z1bmRzL2VkaXQtZnVuZC9pbmRleC50c1wiKTtcbiAgICAgICAgcihcImZ1bmRyYWlzZXJzL25ld1wiLCBcIi4vcGFnZXMvZnVuZHMvY3JlYXRlLWZ1bmQvaW5kZXgudHNcIik7XG4gICAgICAgIHIoXCJwcml2YWN5LXBvbGljeVwiLCBcIi4vcGFnZXMvbGVnYWwvcHJpdmFjeS1wb2xpY3kudHN4XCIpO1xuICAgICAgICByKFwidGVybXMtb2YtdXNlLW5wb1wiLCBcIi4vcGFnZXMvbGVnYWwvdGVybXMtbm9ucHJvZml0cy50c3hcIik7XG4gICAgICAgIHIoXCJ0ZXJtcy1vZi11c2VcIiwgXCIuL3BhZ2VzL2xlZ2FsL3Rlcm1zLWRvbm9ycy50c3hcIik7XG4gICAgICAgIHIoXCJ0ZXJtcy1vZi11c2UtcmVmZXJyYWxzXCIsIFwiLi9wYWdlcy9sZWdhbC90ZXJtcy1yZWZlcnJhbHMudHN4XCIpO1xuICAgICAgICAvLyBubyByb2JvdHNcbiAgICAgICAgcihcImJhbmtpbmctYXBwbGljYXRpb25zXCIsIFwiLi9wYWdlcy9iYW5raW5nLWFwcGxpY2F0aW9ucy9pbmRleC50c1wiKTtcbiAgICAgICAgcihcbiAgICAgICAgICBcImJhbmtpbmctYXBwbGljYXRpb25zLzppZFwiLFxuICAgICAgICAgIFwiLi9wYWdlcy9iYW5raW5nLWFwcGxpY2F0aW9uL2JhbmtpbmctYXBwbGljYXRpb24udHN4XCIsXG4gICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgcihcImFwcHJvdmVcIiwgXCIuL3BhZ2VzL2JhbmtpbmctYXBwbGljYXRpb24vdmVyZGljdC1hcHByb3ZlLnRzeFwiKTtcbiAgICAgICAgICAgIHIoXCJyZWplY3RcIiwgXCIuL3BhZ2VzL2JhbmtpbmctYXBwbGljYXRpb24vdmVyZGljdC1yZWplY3QudHN4XCIpO1xuICAgICAgICAgICAgcihcInN1Y2Nlc3NcIiwgXCIuL3BhZ2VzL2JhbmtpbmctYXBwbGljYXRpb24vc3VjY2Vzcy1wcm9tcHQudHN4XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgcihcInJlZ2lzdGVyXCIsIFwiLi9wYWdlcy9yZWdpc3RyYXRpb24vbGF5b3V0LnRzeFwiLCAoKSA9PiB7XG4gICAgICAgICAgcihcIlwiLCBcIi4vcGFnZXMvcmVnaXN0cmF0aW9uL3NpZ24tdXAvaW5kZXgudHNcIiwgeyBpbmRleDogdHJ1ZSB9KTtcbiAgICAgICAgICByKFwic3VjY2Vzc1wiLCBcIi4vcGFnZXMvcmVnaXN0cmF0aW9uL3N1Y2Nlc3MudHN4XCIpO1xuICAgICAgICAgIHIoXCJ3ZWxjb21lXCIsIFwiLi9wYWdlcy9yZWdpc3RyYXRpb24vd2VsY29tZS50c3hcIik7XG4gICAgICAgICAgcihcInJlc3VtZVwiLCBcIi4vcGFnZXMvcmVnaXN0cmF0aW9uL3Jlc3VtZS9mb3JtLnRzeFwiKTtcbiAgICAgICAgICByKFxuICAgICAgICAgICAgXCI6cmVnSWRcIixcbiAgICAgICAgICAgIFwiLi9wYWdlcy9yZWdpc3RyYXRpb24vc3RlcHMvbGF5b3V0LnRzXCIsXG4gICAgICAgICAgICB7IGlkOiBcInJlZyRJZFwiIH0sXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgIHIoXCJzaWduLXJlc3VsdFwiLCBcIi4vcGFnZXMvcmVnaXN0cmF0aW9uL3NpZ25pbmctcmVzdWx0L2luZGV4LnRzXCIpO1xuICAgICAgICAgICAgICByKFwiXCIsIFwiLi9wYWdlcy9yZWdpc3RyYXRpb24vc3RlcHMvc3RlcHMtbGF5b3V0LnRzeFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcihcIlwiLCBcIi4vcGFnZXMvcmVnaXN0cmF0aW9uL3N0ZXBzL3N0ZXBzLWluZGV4LnRzXCIsIHtcbiAgICAgICAgICAgICAgICAgIGluZGV4OiB0cnVlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHIoXCIxXCIsIFwiLi9wYWdlcy9yZWdpc3RyYXRpb24vc3RlcHMvY29udGFjdC1kZXRhaWxzL2luZGV4LnRzeFwiKTtcbiAgICAgICAgICAgICAgICByKFwiMlwiLCBcIi4vcGFnZXMvcmVnaXN0cmF0aW9uL3N0ZXBzL29yZy1kZXRhaWxzL2luZGV4LnRzeFwiKTtcbiAgICAgICAgICAgICAgICByKFwiM1wiLCBcIi4vcGFnZXMvcmVnaXN0cmF0aW9uL3N0ZXBzL2ZzYS1pbnF1aXJ5L2luZGV4LnRzXCIpO1xuICAgICAgICAgICAgICAgIHIoXG4gICAgICAgICAgICAgICAgICBcIjRcIixcbiAgICAgICAgICAgICAgICAgIFwiLi9wYWdlcy9yZWdpc3RyYXRpb24vc3RlcHMvZG9jdW1lbnRhdGlvbi9pbmRleC50c1wiLFxuICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByKFwiZnNhXCIsIFwiLi9wYWdlcy9yZWdpc3RyYXRpb24vZGF0YS9mc2EtYWN0aW9uLnRzXCIpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcihcIjVcIiwgXCIuL3BhZ2VzL3JlZ2lzdHJhdGlvbi9zdGVwcy9iYW5raW5nL2luZGV4LnRzXCIpO1xuICAgICAgICAgICAgICAgIHIoXCI2XCIsIFwiLi9wYWdlcy9yZWdpc3RyYXRpb24vc3RlcHMvZGFzaGJvYXJkL2luZGV4LnRzeFwiKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIG5vIHJvYm90c1xuICAgICAgICByKFwiYXBwbGljYXRpb25zXCIsIFwiLi9wYWdlcy9hcHBsaWNhdGlvbnMvaW5kZXgudHNcIik7XG4gICAgICAgIC8vIG5vIHJvYm90c1xuICAgICAgICByKFwiYXBwbGljYXRpb25zLzppZFwiLCBcIi4vcGFnZXMvYXBwbGljYXRpb24vYXBwbGljYXRpb24udHN4XCIsICgpID0+IHtcbiAgICAgICAgICByKFwiOnZlcmRpY3RcIiwgXCIuL3BhZ2VzL2FwcGxpY2F0aW9uL3Jldmlldy1yb3V0ZS50c3hcIik7XG4gICAgICAgICAgcihcInN1Y2Nlc3NcIiwgXCIuL3BhZ2VzL2FwcGxpY2F0aW9uL3N1Y2Nlc3MtcHJvbXB0LnRzeFwiKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHIoXCJkb25hdGlvbi1jYWxjdWxhdG9yXCIsIFwiLi9wYWdlcy9kb25hdGlvbi1jYWxjdWxhdG9yL2luZGV4LnRzeFwiKTtcbiAgICAgIH0pO1xuICAgICAgcihcImRvbmF0ZS13aWRnZXRcIiwgXCIuL3BhZ2VzL2RvbmF0ZS13aWRnZXQvd2lkZ2V0LWNvbnRleHQudHN4XCIsICgpID0+IHtcbiAgICAgICAgcihcIjppZFwiLCBcIi4vcGFnZXMvZG9uYXRlLXdpZGdldC9pbmRleC50c1wiKTtcbiAgICAgICAgcihcImRvbmF0ZS10aGFua3NcIiwgXCIuL3BhZ2VzL2RvbmF0ZS10aGFua3MudHN4XCIsIHtcbiAgICAgICAgICBpZDogXCJ3aWRnZXQtZG9uYXRlLXRoYW5rc1wiLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgcihcbiAgICAgICAgXCJkb25hdGlvbi1jYWxjdWxhdG9yLWV4cG9ydFwiLFxuICAgICAgICBcIi4vcGFnZXMvZG9uYXRpb24tY2FsY3VsYXRvci9wZGYtZXhwb3J0L2luZGV4LnRzeFwiXG4gICAgICApO1xuICAgIH0pO1xuICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJhc2U6IFwiL1wiLFxuICBidWlsZDogeyBvdXREaXI6IFwiYnVpbGRcIiwgdGFyZ2V0OiBcImVzMjAyMlwiIH0sXG4gIHNlcnZlcjogeyBwb3J0OiA0MDAwIH0sXG4gIHBsdWdpbnM6IFtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJ0ZXN0XCIgPyB1bmRlZmluZWQgOiBybXgsXG4gICAgdHNjb25maWdQYXRocygpLFxuICAgIHRhaWx3aW5kKCksXG4gIF0sXG4gIHRlc3Q6IHtcbiAgICBzZXR1cEZpbGVzOiBbXCIuL3NyYy9zZXR1cC10ZXN0cy50c1wiXSxcbiAgICBlbnZpcm9ubWVudDogXCJqc2RvbVwiLFxuICAgIGdsb2JhbHM6IHRydWUsXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFEsU0FBUyxvQkFBb0I7QUFDelMsT0FBTyxtQkFBbUI7QUFDMUIsU0FBUyxjQUFjLGFBQWE7QUFDcEMsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxjQUFjO0FBRXJCLElBQU0sTUFBTSxNQUFNO0FBQUEsRUFDaEIsU0FBUyxDQUFDLGFBQWEsQ0FBQztBQUFBLEVBQ3hCLGNBQWM7QUFBQSxFQUNkLFFBQVE7QUFBQSxJQUNOLG1CQUFtQjtBQUFBLElBQ25CLHNCQUFzQjtBQUFBLElBQ3RCLHFCQUFxQjtBQUFBLElBQ3JCLGdCQUFnQjtBQUFBLElBQ2hCLHVCQUF1QjtBQUFBLEVBQ3pCO0FBQUEsRUFDQSxPQUFPLGNBQWM7QUFDbkIsV0FBTyxhQUFhLENBQUMsTUFBTTtBQUN6QixRQUFFLElBQUkseUJBQXlCLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDOUMsUUFBRSxjQUFjLDBCQUEwQjtBQUMxQyxRQUFFLHVCQUF1QixpQ0FBaUM7QUFDMUQsUUFBRSw4QkFBOEIsK0JBQStCO0FBQy9ELFFBQUUsaUJBQWlCLDJCQUEyQjtBQUM5QyxRQUFFLG9CQUFvQixxQ0FBcUM7QUFDM0QsUUFBRSx5QkFBeUIsMENBQTBDO0FBQ3JFO0FBQUEs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
