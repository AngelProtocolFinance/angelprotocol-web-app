import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";

export const useCookieConsent = () => {
  useEffect(() => {
    CookieConsent.run({
      categories: {
        functional: {
          enabled: true,
          readOnly: true,
        },
        analytics: {},
        tracking: {},
      },
      guiOptions: {
        consentModal: {
          layout: "box",
          position: "bottom left",
          flipButtons: false,
          equalWeightButtons: true,
        },
      },
      language: {
        default: "en",
        translations: {
          en: {
            consentModal: {
              description:
                "We use cookies as an essential part of our website.",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject all",
              showPreferencesBtn: "Manage Individual preferences",
            },
            preferencesModal: {
              title: "Control Your Privacy",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject all",
              savePreferencesBtn: "Accept current selection",
              closeIconLabel: "Close modal",
              sections: [
                {
                  description:
                    "Websites may store or retrieve information on your browser, mostly in the form of cookies. This information is used to personalize your experience and is not usually linked to your identity. You can choose not to allow certain types of cookies, but it may affect your website experience. Learn more and change settings by clicking on the different categories.",
                },
                {
                  title: "Functional",
                  description:
                    "These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers (like Intercom) whose services we have added to our pages.",
                  linkedCategory: "functional",
                },
                {
                  title: "Performance and Analytics",
                  description:
                    "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. All information these cookies collect is aggregated and therefore anonymous.",
                  linkedCategory: "analytics",
                },
                {
                  title: "Tracking",
                  description:
                    "These cookies are used to track visitor information and analyze activities on our site. They can be used to create a profile of your actions and preferences to make the site more relevant to you.",
                  linkedCategory: "tracking",
                },
              ],
            },
          },
        },
      },
    });
  }, []);
};
