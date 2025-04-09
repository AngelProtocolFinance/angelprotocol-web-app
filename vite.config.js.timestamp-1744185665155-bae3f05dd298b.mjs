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
      r("simplify-fundraising-maximize-impact", "./pages/landing-a/index.tsx", {
        id: "page-a"
      });
      r(
        "simplify-fundraising-maximize-impacts",
        "./pages/landing-a/index.tsx",
        { id: "page-a2" }
      );
      r(
        "the-smart-move-to-make-for-accepting-crypto-donations",
        "./pages/landing-b/index.tsx"
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
          r("funds", "./pages/user-dashboard/funds/funds.tsx");
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
      });
      r("donate-widget", "./pages/donate-widget/widget-context.tsx", () => {
        r(":id", "./pages/donate-widget/index.ts");
        r("donate-thanks", "./pages/donate-thanks.tsx", {
          id: "widget-donate-thanks"
        });
      });
    });
  }
});
var vite_config_default = defineConfig({
  base: "/",
  build: { outDir: "build", target: "es2022" },
  server: { port: 4200 },
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvanVzdGluL3Byb2plY3RzL3dlYi1hcHBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qdXN0aW4vcHJvamVjdHMvd2ViLWFwcC92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvanVzdGluL3Byb2plY3RzL3dlYi1hcHAvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcbmltcG9ydCB7IHZpdGVQbHVnaW4gYXMgcmVtaXggfSBmcm9tIFwiQHJlbWl4LXJ1bi9kZXZcIjtcbmltcG9ydCB7IHZlcmNlbFByZXNldCB9IGZyb20gXCJAdmVyY2VsL3JlbWl4L3ZpdGVcIjtcbmltcG9ydCB0YWlsd2luZCBmcm9tIFwiQHRhaWx3aW5kY3NzL3ZpdGVcIjtcblxuY29uc3Qgcm14ID0gcmVtaXgoe1xuICBwcmVzZXRzOiBbdmVyY2VsUHJlc2V0KCldLFxuICBhcHBEaXJlY3Rvcnk6IFwic3JjXCIsXG4gIGZ1dHVyZToge1xuICAgIHYzX2ZldGNoZXJQZXJzaXN0OiB0cnVlLFxuICAgIHYzX3JlbGF0aXZlU3BsYXRQYXRoOiB0cnVlLFxuICAgIHYzX3Rocm93QWJvcnRSZWFzb246IHRydWUsXG4gICAgdjNfc2luZ2xlRmV0Y2g6IHRydWUsXG4gICAgdjNfbGF6eVJvdXRlRGlzY292ZXJ5OiB0cnVlLFxuICB9LFxuICByb3V0ZXMoZGVmaW5lUm91dGVzKSB7XG4gICAgcmV0dXJuIGRlZmluZVJvdXRlcygocikgPT4ge1xuICAgICAgcihcIlwiLCBcIi4vcGFnZXMvaG9tZS9ob21lLnRzeFwiLCB7IGluZGV4OiB0cnVlIH0pO1xuICAgICAgcihcImRvbmF0ZS86aWRcIiwgXCIuL3BhZ2VzL2RvbmF0ZS9pbmRleC50c3hcIik7XG4gICAgICByKFwiZG9uYXRlLWZ1bmQvOmZ1bmRJZFwiLCBcIi4vcGFnZXMvZG9uYXRlLWZ1bmQvcmVkaXJlY3QudHNcIik7XG4gICAgICByKFwiZnVuZHJhaXNlcnMvOmZ1bmRJZC9kb25hdGVcIiwgXCIuL3BhZ2VzL2RvbmF0ZS1mdW5kL2luZGV4LnRzeFwiKTtcbiAgICAgIHIoXCJkb25hdGUtdGhhbmtzXCIsIFwiLi9wYWdlcy9kb25hdGUtdGhhbmtzLnRzeFwiKTtcbiAgICAgIHIoXCJzaW1wbGlmeS1mdW5kcmFpc2luZy1tYXhpbWl6ZS1pbXBhY3RcIiwgXCIuL3BhZ2VzL2xhbmRpbmctYS9pbmRleC50c3hcIiwge1xuICAgICAgICBpZDogXCJwYWdlLWFcIixcbiAgICAgIH0pO1xuICAgICAgcihcbiAgICAgICAgXCJzaW1wbGlmeS1mdW5kcmFpc2luZy1tYXhpbWl6ZS1pbXBhY3RzXCIsXG4gICAgICAgIFwiLi9wYWdlcy9sYW5kaW5nLWEvaW5kZXgudHN4XCIsXG4gICAgICAgIHsgaWQ6IFwicGFnZS1hMlwiIH1cbiAgICAgICk7XG4gICAgICByKFxuICAgICAgICBcInRoZS1zbWFydC1tb3ZlLXRvLW1ha2UtZm9yLWFjY2VwdGluZy1jcnlwdG8tZG9uYXRpb25zXCIsXG4gICAgICAgIFwiLi9wYWdlcy9sYW5kaW5nLWIvaW5kZXgudHN4XCJcbiAgICAgICk7XG4gICAgICByKFwiZm9ybS1idWlsZGVyXCIsIFwiLi9wYWdlcy93aWRnZXQvZm9ybS1idWlsZGVyLWxheW91dC50c3hcIiwgKCkgPT4ge1xuICAgICAgICByKFwiXCIsIFwiLi9wYWdlcy93aWRnZXQvaW5kZXgudHNcIiwge1xuICAgICAgICAgIGluZGV4OiB0cnVlLFxuICAgICAgICAgIGlkOiBcInB1YmxpYy1mb3JtLWJ1aWxkZXJcIixcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIC8vIG5vIHJvYm90c1xuICAgICAgcihcImFkbWluLzppZFwiLCBcIi4vcGFnZXMvYWRtaW4vbGF5b3V0LnRzeFwiLCAoKSA9PiB7XG4gICAgICAgIHIoXCJcIiwgXCIuL3BhZ2VzL2FkbWluL3JlZGlyZWN0LnRzXCIsIHsgaW5kZXg6IHRydWUgfSk7XG4gICAgICAgIHIoXCJkb25hdGlvbnNcIiwgXCIuL3BhZ2VzL2FkbWluL2RvbmF0aW9ucy9kb25hdGlvbnMudHN4XCIpO1xuICAgICAgICByKFwicHJvZ3JhbXNcIiwgXCIuL3BhZ2VzL2FkbWluL3Byb2dyYW1zL3Byb2dyYW1zLnRzeFwiKTtcbiAgICAgICAgcihcImZ1bmRzXCIsIFwiLi9wYWdlcy9hZG1pbi9mdW5kcy9mdW5kcy50c3hcIik7XG4gICAgICAgIHIoXCJpbnRlZ3JhdGlvbnNcIiwgXCIuL3BhZ2VzL2FkbWluL2ludGVncmF0aW9ucy9pbmRleC50c3hcIik7XG4gICAgICAgIHIoXG4gICAgICAgICAgXCJwcm9ncmFtLWVkaXRvci86cHJvZ3JhbUlkXCIsXG4gICAgICAgICAgXCIuL3BhZ2VzL2FkbWluL3Byb2dyYW0tZWRpdG9yL3Byb2dyYW0tZWRpdG9yLnRzeFwiXG4gICAgICAgICk7XG4gICAgICAgIHIoXG4gICAgICAgICAgXCJtZW1iZXJzXCIsXG4gICAgICAgICAgXCIuL3BhZ2VzL2FkbWluL21lbWJlcnMvbWVtYmVycy50c3hcIixcbiAgICAgICAgICB7IGlkOiBcImVuZG93LWFkbWluc1wiIH0sXG4gICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgcihcImFkZFwiLCBcIi4vcGFnZXMvYWRtaW4vbWVtYmVycy9hZGQtZm9ybS50c3hcIik7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICByKFwic2V0dGluZ3NcIiwgXCIuL3BhZ2VzL2FkbWluL3NldHRpbmdzL2Zvcm0udHN4XCIpO1xuICAgICAgICByKFwiZWRpdC1wcm9maWxlXCIsIFwiLi9wYWdlcy9hZG1pbi9lZGl0LXByb2ZpbGUvaW5kZXgudHN4XCIpO1xuICAgICAgICByKFwiYmFua2luZ1wiLCBcIi4vcGFnZXMvYWRtaW4vYmFua2luZy9wYXlvdXQtbWV0aG9kcy9wYXlvdXQtbWV0aG9kcy50c3hcIik7XG4gICAgICAgIHIoXCJiYW5raW5nL25ld1wiLCBcIi4vcGFnZXMvYWRtaW4vYmFua2luZy9iYW5raW5nLnRzeFwiKTtcbiAgICAgICAgcihcbiAgICAgICAgICBcImJhbmtpbmcvOmJhbmtJZFwiLFxuICAgICAgICAgIFwiLi9wYWdlcy9hZG1pbi9iYW5raW5nL3BheW91dC1tZXRob2QvcGF5b3V0LW1ldGhvZC50c3hcIixcbiAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICByKFxuICAgICAgICAgICAgICBcImRlbGV0ZVwiLFxuICAgICAgICAgICAgICBcIi4vcGFnZXMvYWRtaW4vYmFua2luZy9wYXlvdXQtbWV0aG9kL2RlbGV0ZS1wcm9tcHQudHN4XCJcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICByKFwiZm9ybS1idWlsZGVyXCIsIFwiLi9wYWdlcy93aWRnZXQvaW5kZXgudHNcIiwge1xuICAgICAgICAgIGlkOiBcImFkbWluLWZvcm0tYnVpbGRlclwiLFxuICAgICAgICB9KTtcbiAgICAgICAgcihcIm1lZGlhXCIsIFwiLi9wYWdlcy9hZG1pbi9tZWRpYS9tZWRpYS50c3hcIiwgKCkgPT4ge1xuICAgICAgICAgIHIoXCJuZXdcIiwgXCIuL3BhZ2VzL2FkbWluL21lZGlhL3ZpZGVvLW5ldy50c1wiLCB7XG4gICAgICAgICAgICBpZDogXCJtZWRpYS1uZXdcIixcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByKFwiOm1lZGlhSWRcIiwgXCIuL3BhZ2VzL2FkbWluL21lZGlhL3ZpZGVvLWVkaXQudHNcIiwge1xuICAgICAgICAgICAgaWQ6IFwibWVkaWEtZWRpdFwiLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcihcIm1lZGlhL3ZpZGVvc1wiLCBcIi4vcGFnZXMvYWRtaW4vbWVkaWEvdmlkZW9zL3ZpZGVvcy50c3hcIiwgKCkgPT4ge1xuICAgICAgICAgIHIoXCJuZXdcIiwgXCIuL3BhZ2VzL2FkbWluL21lZGlhL3ZpZGVvLW5ldy50c1wiLCB7XG4gICAgICAgICAgICBpZDogXCJ2aWRlb3MtbmV3XCIsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcihcIjptZWRpYUlkXCIsIFwiLi9wYWdlcy9hZG1pbi9tZWRpYS92aWRlby1lZGl0LnRzXCIsIHtcbiAgICAgICAgICAgIGlkOiBcInZpZGVvcy1lZGl0XCIsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByKFxuICAgICAgICAgIFwiZGFzaGJvYXJkXCIsXG4gICAgICAgICAgXCIuL3BhZ2VzL2FkbWluL2Rhc2hib2FyZC9kYXNoYm9hcmQudHN4XCIsXG4gICAgICAgICAgeyBpZDogXCJkYXNoYm9hcmRcIiB9LFxuICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIHIoXCJlZGl0LWFsbG9jXCIsIFwiLi9wYWdlcy9hZG1pbi9kYXNoYm9hcmQvc2NoZWR1bGUvZWRpdC50c3hcIik7XG4gICAgICAgICAgICByKFwibW92ZS1mdW5kc1wiLCBcIi4vcGFnZXMvYWRtaW4vZGFzaGJvYXJkL21vdmUtZnVuZC1mb3JtLnRzeFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICAgIHIoXCJcIiwgXCIuL2xheW91dC9hcHAvbGF5b3V0LnRzeFwiLCAoKSA9PiB7XG4gICAgICAgIHIoXCJsb2dpblwiLCBcIi4vcGFnZXMvc2lnbmluLnRzeFwiKTtcbiAgICAgICAgcihcInNpZ251cFwiLCBcIi4vcGFnZXMvc2lnbi11cC9sYXlvdXQudHN4XCIsICgpID0+IHtcbiAgICAgICAgICByKFwiXCIsIFwiLi9wYWdlcy9zaWduLXVwL3NpZ251cC1mb3JtL3NpZ251cC1mb3JtLnRzeFwiLCB7IGluZGV4OiB0cnVlIH0pO1xuICAgICAgICAgIHIoXCJjb25maXJtXCIsIFwiLi9wYWdlcy9zaWduLXVwL2NvbmZpcm0tZm9ybS9jb25maXJtLWZvcm0udHN4XCIpO1xuICAgICAgICAgIHIoXCJzdWNjZXNzXCIsIFwiLi9wYWdlcy9zaWduLXVwL3N1Y2Nlc3MudHN4XCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgcihcImxvZ2luL3Jlc2V0XCIsIFwiLi9wYWdlcy9yZXNldC1wYXNzd29yZC9yZXNldC1wYXNzd29yZC50c3hcIik7XG4gICAgICAgIC8vIG5vIHJvYm90c1xuICAgICAgICByKFwiZGFzaGJvYXJkXCIsIFwiLi9wYWdlcy91c2VyLWRhc2hib2FyZC9sYXlvdXQudHN4XCIsICgpID0+IHtcbiAgICAgICAgICByKFwiXCIsIFwiLi9wYWdlcy91c2VyLWRhc2hib2FyZC9pbmRleC1yb3V0ZS50c1wiLCB7IGluZGV4OiB0cnVlIH0pO1xuICAgICAgICAgIHIoXCJlZGl0LXByb2ZpbGVcIiwgXCIuL3BhZ2VzL3VzZXItZGFzaGJvYXJkL2VkaXQtcHJvZmlsZS9pbmRleC50c1wiKTtcbiAgICAgICAgICByKFwic2V0dGluZ3NcIiwgXCIuL3BhZ2VzL3VzZXItZGFzaGJvYXJkL3NldHRpbmdzL3NldHRpbmdzLnRzeFwiKTtcbiAgICAgICAgICByKFwiZG9uYXRpb25zXCIsIFwiLi9wYWdlcy91c2VyLWRhc2hib2FyZC9kb25hdGlvbnMvaW5kZXgudHN4XCIsICgpID0+IHtcbiAgICAgICAgICAgIHIoXCI6aWRcIiwgXCIuL2NvbXBvbmVudHMva3ljLWZvcm0vaW5kZXgudHN4XCIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHIoXCJmdW5kc1wiLCBcIi4vcGFnZXMvdXNlci1kYXNoYm9hcmQvZnVuZHMvZnVuZHMudHN4XCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgcihcImxvZ291dFwiLCBcIi4vcGFnZXMvbG9nb3V0LnRzXCIpO1xuICAgICAgICByKFwibm9ucHJvZml0XCIsIFwiLi9wYWdlcy9pbmZvcm1hdGlvbmFsL25vbnByb2ZpdC1pbmZvL2luZGV4LnRzXCIpO1xuICAgICAgICByKFwiZG9ub3JcIiwgXCIuL3BhZ2VzL2luZm9ybWF0aW9uYWwvZG9ub3ItaW5mby9pbmRleC50c1wiKTtcbiAgICAgICAgcihcIndwLXBsdWdpblwiLCBcIi4vcGFnZXMvaW5mb3JtYXRpb25hbC93cC1wbHVnaW4udHN4XCIpO1xuICAgICAgICByKFxuICAgICAgICAgIFwiemFwaWVyLWludGVncmF0aW9uXCIsXG4gICAgICAgICAgXCIuL3BhZ2VzL2luZm9ybWF0aW9uYWwvemFwaWVyLWludGVncmF0aW9uL2luZGV4LnRzeFwiXG4gICAgICAgICk7XG4gICAgICAgIHIoXCJhYm91dC11c1wiLCBcIi4vcGFnZXMvaW5mb3JtYXRpb25hbC9hYm91dC9pbmRleC50c3hcIik7XG4gICAgICAgIHIoXCJibG9nXCIsIFwiLi9wYWdlcy9ibG9nL3Bvc3RzLnRzeFwiKTtcbiAgICAgICAgcihcImJsb2cvOnNsdWdcIiwgXCIuL3BhZ2VzL2Jsb2cvcG9zdC50c3hcIik7XG4gICAgICAgIHIoXCJtYXJrZXRwbGFjZVwiLCBcIi4vcGFnZXMvbWFya2V0cGxhY2UvaW5kZXgudHN4XCIsICgpID0+IHtcbiAgICAgICAgICByKFwiZmlsdGVyXCIsIFwiLi9wYWdlcy9tYXJrZXRwbGFjZS9maWx0ZXIvaW5kZXgudHNcIik7XG4gICAgICAgIH0pO1xuICAgICAgICByKFwibWFya2V0cGxhY2UvOmlkXCIsIFwiLi9wYWdlcy9wcm9maWxlL3Byb2ZpbGUudHN4XCIsICgpID0+IHtcbiAgICAgICAgICByKFwiXCIsIFwiLi9wYWdlcy9wcm9maWxlL2JvZHkvYm9keS50c3hcIiwgKCkgPT4ge1xuICAgICAgICAgICAgcihcIlwiLCBcIi4vcGFnZXMvcHJvZmlsZS9ib2R5L2dlbmVyYWwtaW5mby9pbmRleC50c1wiLCB7XG4gICAgICAgICAgICAgIGluZGV4OiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByKFwicHJvZ3JhbS86cHJvZ3JhbUlkXCIsIFwiLi9wYWdlcy9wcm9maWxlL2JvZHkvcHJvZ3JhbS9pbmRleC50c1wiKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHIoXCJwcm9maWxlLzppZFwiLCBcIi4vcGFnZXMvcHJvZmlsZS9wcm9maWxlLXJlZGlyZWN0LnRzXCIpO1xuICAgICAgICByKFwiZnVuZHMvKlwiLCBcIi4vcGFnZXMvZnVuZHMvcmVkaXJlY3QudHNcIik7XG4gICAgICAgIHIoXCJmdW5kcmFpc2Vyc1wiLCBcIi4vcGFnZXMvZnVuZHMvZnVuZHMudHN4XCIpO1xuICAgICAgICByKFwiZnVuZHJhaXNlcnMvOmZ1bmRJZFwiLCBcIi4vcGFnZXMvZnVuZHMvZnVuZC9pbmRleC50c3hcIik7XG4gICAgICAgIHIoXCJmdW5kcmFpc2Vycy86ZnVuZElkL2VkaXRcIiwgXCIuL3BhZ2VzL2Z1bmRzL2VkaXQtZnVuZC9pbmRleC50c1wiKTtcbiAgICAgICAgcihcImZ1bmRyYWlzZXJzL25ld1wiLCBcIi4vcGFnZXMvZnVuZHMvY3JlYXRlLWZ1bmQvaW5kZXgudHNcIik7XG4gICAgICAgIHIoXCJwcml2YWN5LXBvbGljeVwiLCBcIi4vcGFnZXMvbGVnYWwvcHJpdmFjeS1wb2xpY3kudHN4XCIpO1xuICAgICAgICByKFwidGVybXMtb2YtdXNlLW5wb1wiLCBcIi4vcGFnZXMvbGVnYWwvdGVybXMtbm9ucHJvZml0cy50c3hcIik7XG4gICAgICAgIHIoXCJ0ZXJtcy1vZi11c2VcIiwgXCIuL3BhZ2VzL2xlZ2FsL3Rlcm1zLWRvbm9ycy50c3hcIik7XG4gICAgICAgIC8vIG5vIHJvYm90c1xuICAgICAgICByKFwiYmFua2luZy1hcHBsaWNhdGlvbnNcIiwgXCIuL3BhZ2VzL2JhbmtpbmctYXBwbGljYXRpb25zL2luZGV4LnRzXCIpO1xuICAgICAgICByKFxuICAgICAgICAgIFwiYmFua2luZy1hcHBsaWNhdGlvbnMvOmlkXCIsXG4gICAgICAgICAgXCIuL3BhZ2VzL2JhbmtpbmctYXBwbGljYXRpb24vYmFua2luZy1hcHBsaWNhdGlvbi50c3hcIixcbiAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICByKFwiYXBwcm92ZVwiLCBcIi4vcGFnZXMvYmFua2luZy1hcHBsaWNhdGlvbi92ZXJkaWN0LWFwcHJvdmUudHN4XCIpO1xuICAgICAgICAgICAgcihcInJlamVjdFwiLCBcIi4vcGFnZXMvYmFua2luZy1hcHBsaWNhdGlvbi92ZXJkaWN0LXJlamVjdC50c3hcIik7XG4gICAgICAgICAgICByKFwic3VjY2Vzc1wiLCBcIi4vcGFnZXMvYmFua2luZy1hcHBsaWNhdGlvbi9zdWNjZXNzLXByb21wdC50c3hcIik7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICByKFwicmVnaXN0ZXJcIiwgXCIuL3BhZ2VzL3JlZ2lzdHJhdGlvbi9sYXlvdXQudHN4XCIsICgpID0+IHtcbiAgICAgICAgICByKFwiXCIsIFwiLi9wYWdlcy9yZWdpc3RyYXRpb24vc2lnbi11cC9pbmRleC50c1wiLCB7IGluZGV4OiB0cnVlIH0pO1xuICAgICAgICAgIHIoXCJzdWNjZXNzXCIsIFwiLi9wYWdlcy9yZWdpc3RyYXRpb24vc3VjY2Vzcy50c3hcIik7XG4gICAgICAgICAgcihcIndlbGNvbWVcIiwgXCIuL3BhZ2VzL3JlZ2lzdHJhdGlvbi93ZWxjb21lLnRzeFwiKTtcbiAgICAgICAgICByKFwicmVzdW1lXCIsIFwiLi9wYWdlcy9yZWdpc3RyYXRpb24vcmVzdW1lL2Zvcm0udHN4XCIpO1xuICAgICAgICAgIHIoXG4gICAgICAgICAgICBcIjpyZWdJZFwiLFxuICAgICAgICAgICAgXCIuL3BhZ2VzL3JlZ2lzdHJhdGlvbi9zdGVwcy9sYXlvdXQudHNcIixcbiAgICAgICAgICAgIHsgaWQ6IFwicmVnJElkXCIgfSxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgcihcInNpZ24tcmVzdWx0XCIsIFwiLi9wYWdlcy9yZWdpc3RyYXRpb24vc2lnbmluZy1yZXN1bHQvaW5kZXgudHNcIik7XG4gICAgICAgICAgICAgIHIoXCJcIiwgXCIuL3BhZ2VzL3JlZ2lzdHJhdGlvbi9zdGVwcy9zdGVwcy1sYXlvdXQudHN4XCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICByKFwiXCIsIFwiLi9wYWdlcy9yZWdpc3RyYXRpb24vc3RlcHMvc3RlcHMtaW5kZXgudHNcIiwge1xuICAgICAgICAgICAgICAgICAgaW5kZXg6IHRydWUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcihcIjFcIiwgXCIuL3BhZ2VzL3JlZ2lzdHJhdGlvbi9zdGVwcy9jb250YWN0LWRldGFpbHMvaW5kZXgudHN4XCIpO1xuICAgICAgICAgICAgICAgIHIoXCIyXCIsIFwiLi9wYWdlcy9yZWdpc3RyYXRpb24vc3RlcHMvb3JnLWRldGFpbHMvaW5kZXgudHN4XCIpO1xuICAgICAgICAgICAgICAgIHIoXCIzXCIsIFwiLi9wYWdlcy9yZWdpc3RyYXRpb24vc3RlcHMvZnNhLWlucXVpcnkvaW5kZXgudHNcIik7XG4gICAgICAgICAgICAgICAgcihcbiAgICAgICAgICAgICAgICAgIFwiNFwiLFxuICAgICAgICAgICAgICAgICAgXCIuL3BhZ2VzL3JlZ2lzdHJhdGlvbi9zdGVwcy9kb2N1bWVudGF0aW9uL2luZGV4LnRzXCIsXG4gICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHIoXCJmc2FcIiwgXCIuL3BhZ2VzL3JlZ2lzdHJhdGlvbi9kYXRhL2ZzYS1hY3Rpb24udHNcIik7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByKFwiNVwiLCBcIi4vcGFnZXMvcmVnaXN0cmF0aW9uL3N0ZXBzL2JhbmtpbmcvaW5kZXgudHNcIik7XG4gICAgICAgICAgICAgICAgcihcIjZcIiwgXCIuL3BhZ2VzL3JlZ2lzdHJhdGlvbi9zdGVwcy9kYXNoYm9hcmQvaW5kZXgudHN4XCIpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gbm8gcm9ib3RzXG4gICAgICAgIHIoXCJhcHBsaWNhdGlvbnNcIiwgXCIuL3BhZ2VzL2FwcGxpY2F0aW9ucy9pbmRleC50c1wiKTtcbiAgICAgICAgLy8gbm8gcm9ib3RzXG4gICAgICAgIHIoXCJhcHBsaWNhdGlvbnMvOmlkXCIsIFwiLi9wYWdlcy9hcHBsaWNhdGlvbi9hcHBsaWNhdGlvbi50c3hcIiwgKCkgPT4ge1xuICAgICAgICAgIHIoXCI6dmVyZGljdFwiLCBcIi4vcGFnZXMvYXBwbGljYXRpb24vcmV2aWV3LXJvdXRlLnRzeFwiKTtcbiAgICAgICAgICByKFwic3VjY2Vzc1wiLCBcIi4vcGFnZXMvYXBwbGljYXRpb24vc3VjY2Vzcy1wcm9tcHQudHN4XCIpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgcihcImRvbmF0ZS13aWRnZXRcIiwgXCIuL3BhZ2VzL2RvbmF0ZS13aWRnZXQvd2lkZ2V0LWNvbnRleHQudHN4XCIsICgpID0+IHtcbiAgICAgICAgcihcIjppZFwiLCBcIi4vcGFnZXMvZG9uYXRlLXdpZGdldC9pbmRleC50c1wiKTtcbiAgICAgICAgcihcImRvbmF0ZS10aGFua3NcIiwgXCIuL3BhZ2VzL2RvbmF0ZS10aGFua3MudHN4XCIsIHtcbiAgICAgICAgICBpZDogXCJ3aWRnZXQtZG9uYXRlLXRoYW5rc1wiLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJhc2U6IFwiL1wiLFxuICBidWlsZDogeyBvdXREaXI6IFwiYnVpbGRcIiwgdGFyZ2V0OiBcImVzMjAyMlwiIH0sXG4gIHNlcnZlcjogeyBwb3J0OiA0MjAwIH0sXG4gIHBsdWdpbnM6IFtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJ0ZXN0XCIgPyB1bmRlZmluZWQgOiBybXgsXG4gICAgdHNjb25maWdQYXRocygpLFxuICAgIHRhaWx3aW5kKCksXG4gIF0sXG4gIHRlc3Q6IHtcbiAgICBzZXR1cEZpbGVzOiBbXCIuL3NyYy9zZXR1cC10ZXN0cy50c1wiXSxcbiAgICBlbnZpcm9ubWVudDogXCJqc2RvbVwiLFxuICAgIGdsb2JhbHM6IHRydWUsXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFEsU0FBUyxvQkFBb0I7QUFDelMsT0FBTyxtQkFBbUI7QUFDMUIsU0FBUyxjQUFjLGFBQWE7QUFDcEMsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxjQUFjO0FBRXJCLElBQU0sTUFBTSxNQUFNO0FBQUEsRUFDaEIsU0FBUyxDQUFDLGFBQWEsQ0FBQztBQUFBLEVBQ3hCLGNBQWM7QUFBQSxFQUNkLFFBQVE7QUFBQSxJQUNOLG1CQUFtQjtBQUFBLElBQ25CLHNCQUFzQjtBQUFBLElBQ3RCLHFCQUFxQjtBQUFBLElBQ3JCLGdCQUFnQjtBQUFBLElBQ2hCLHVCQUF1QjtBQUFBLEVBQ3pCO0FBQUEsRUFDQSxPQUFPLGNBQWM7QUFDbkIsV0FBTyxhQUFhLENBQUMsTUFBTTtBQUN6QixRQUFFLElBQUkseUJBQXlCLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDOUMsUUFBRSxjQUFjLDBCQUEwQjtBQUMxQyxRQUFFLHVCQUF1QixpQ0FBaUM7QUFDMUQsUUFBRSw4QkFBOEIsK0JBQStCO0FBQy9ELFFBQUUsaUJBQWlCLDJCQUEyQjtBQUM5QyxRQUFFLHdDQUF3QywrQkFBK0I7QUFBQSxRQUN2RSxJQUFJO0FBQUEsTUFDTixDQUFDO0FBQ0Q7QUFBQSxRQUNFO0FBQUEsUUFDQTtBQUFBLFFBQ0EsRUFBRSxJQUFJLFVBQVU7QUFBQSxNQUNsQjtBQUNBO0FBQUEsUUFDRTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQ0EsUUFBRSxnQkFBZ0IsMENBQTBDLE1BQU07QUFDaEUsVUFBRSxJQUFJLDJCQUEyQjtBQUFBLFVBQy9CLE9BQU87QUFBQSxVQUNQLElBQUk7QUFBQSxRQUNOLENBQUM7QUFBQSxNQUNILENBQUM7QUFF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
