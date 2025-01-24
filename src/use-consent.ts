import { useEffect } from "react";
import * as cc from "vanilla-cookieconsent";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const cat = {
  necessary: "necessary",
  analytics: "analytics",
  advertisement: "advertisement",
  functionality: "functionality",
  security: "security",
  tracking: "tracking",
};

const gas = {
  ad_storage: "ad_storage",
  ad_user_data: "ad_user_data",
  ad_personalization: "ad_personalization",
  analytics_storage: "analytics_storage",
  functionality_storage: "functionality_storage",
  personalization_storage: "personalization_storage",
  security_storage: "security_storage",
};

const categories: { [name: string]: cc.Category } = {
  [cat.necessary]: {
    enabled: true,
    readOnly: true,
  },
  [cat.analytics]: {
    autoClear: {
      cookies: [
        {
          name: /^_ga/,
        },
        {
          name: "_gid",
        },
      ],
    },
    services: {
      [gas.analytics_storage]: {
        label:
          "Enables storage (such as cookies) related to analytics e.g. visit duration.",
      },
    },
  },
  [cat.advertisement]: {
    services: {
      [gas.ad_storage]: {
        label: "Enables storage (such as cookies) related to advertising.",
      },
      [gas.ad_user_data]: {
        label:
          "Sets consent for sending user data related to advertising to Google.",
      },
      [gas.ad_personalization]: {
        label: "Sets consent for personalized advertising.",
      },
    },
  },
  [cat.functionality]: {
    services: {
      [gas.functionality_storage]: {
        label:
          "Enables storage that supports the functionality of the website or app e.g. language settings.",
      },
      [gas.personalization_storage]: {
        label:
          "Enables storage related to personalization e.g. video recommendations.",
      },
    },
  },
  [cat.security]: {
    services: {
      [gas.security_storage]: {
        label:
          "Enables storage related to security such as authentication functionality, fraud prevention, and other user protection.",
      },
    },
  },
  [cat.tracking]: {},
};

const sections: cc.Section[] = [
  {
    title: "Cookie usage",
    description:
      "We use cookies to ensure the basic functionalities of the website and to enhance your online experience.",
  },
  {
    title: "Strictly necessary cookies",
    description:
      "These cookies are essential for the proper functioning of the website, for example for user authentication.",
    linkedCategory: cat.necessary,
  },
  {
    title: "Analytics",
    description:
      "Cookies used for analytics help collect data that allows services to understand how users interact with a particular service. These insights allow services both to improve content and to build better features that improve the user’s experience.",
    linkedCategory: cat.analytics,
    cookieTable: {
      headers: {
        name: "Name",
        domain: "Service",
        description: "Description",
        expiration: "Expiration",
      },
      body: [
        {
          name: "_ga",
          domain: "Google Analytics",
          description:
            'Cookie set by <a href="https://business.safety.google/adscookies/">Google Analytics</a>',
          expiration: "Expires after 12 days",
        },
        {
          name: "_gid",
          domain: "Google Analytics",
          description:
            'Cookie set by <a href="https://business.safety.google/adscookies/">Google Analytics</a>',
          expiration: "Session",
        },
      ],
    },
  },
  {
    title: "Advertising",
    description:
      'Google uses cookies for advertising, including serving and rendering ads, personalizing ads (depending on your ad settings at <a href="https://g.co/adsettings">g.co/adsettings</a>), limiting the number of times an ad is shown to a user, muting ads you have chosen to stop seeing, and measuring the effectiveness of ads.',
    linkedCategory: cat.advertisement,
  },
  {
    title: "Functionality",
    description:
      "Cookies used for functionality allow users to interact with a service or site to access features that are fundamental to that service. Things considered fundamental to the service include preferences like the user’s choice of language, product optimizations that help maintain and improve a service, and maintaining information relating to a user’s session, such as the content of a shopping cart.",
    linkedCategory: cat.functionality,
  },
  {
    title: "Security",
    description:
      "Cookies used for security authenticate users, prevent fraud, and protect users as they interact with a service.",
    linkedCategory: cat.security,
  },
  {
    title: "Tracking",
    description:
      "These cookies are used to track visitor information and analyze activities on our site. They can be used to create a profile of your actions and preferences to make the site more relevant to you.",
    linkedCategory: cat.tracking,
  },
];

const consent: cc.ConsentModalOptions = {
  title: "We use cookies",
  description:
    "This website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent.",
  acceptAllBtn: "Accept all",
  acceptNecessaryBtn: "Reject all",
  showPreferencesBtn: "Manage Individual preferences",
};
const preference: cc.PreferencesModalOptions = {
  title: "Manage cookie preferences",
  acceptAllBtn: "Accept all",
  acceptNecessaryBtn: "Reject all",
  savePreferencesBtn: "Accept current selection",
  closeIconLabel: "Close modal",
  sections: sections,
};

const load = (url: string) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

export const useConsent = () => {
  useEffect(() => {
    //init data layer
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }

    gtag("consent", "default", {
      [gas.ad_storage]: "denied",
      [gas.ad_user_data]: "denied",
      [gas.ad_personalization]: "denied",
      [gas.analytics_storage]: "denied",
      [gas.functionality_storage]: "denied",
      [gas.personalization_storage]: "denied",
      [gas.security_storage]: "denied",
    });

    const onConsent = async () => {
      //necessary
      await load("/scripts/intercom.js");

      if (cc.acceptedCategory(cat.tracking)) {
        await load("/scripts/twitter-conversion-tracking.js");
        await load("/scripts/meta-pixel.js");
        await load("/scripts/linkedin-tracking.js");
        await load("/scripts/hotjar-tracking.js");
        await load("//js-eu1.hs-scripts.com/24900163.js");
      }

      //enable gtm if analytics is accepted
      if (cc.acceptedCategory(cat.analytics)) {
        await load("/scripts/gtm-init.js");
      }

      //consent for each service
      gtag("consent", "update", {
        [gas.ad_storage]: cc.acceptedService(gas.ad_storage, cat.advertisement)
          ? "granted"
          : "denied",
        [gas.ad_user_data]: cc.acceptedService(
          gas.ad_user_data,
          cat.advertisement
        )
          ? "granted"
          : "denied",
        [gas.ad_personalization]: cc.acceptedService(
          gas.ad_personalization,
          cat.advertisement
        )
          ? "granted"
          : "denied",
        [gas.analytics_storage]: cc.acceptedService(
          gas.analytics_storage,
          cat.analytics
        )
          ? "granted"
          : "denied",
        [gas.functionality_storage]: cc.acceptedService(
          gas.functionality_storage,
          cat.functionality
        )
          ? "granted"
          : "denied",
        [gas.personalization_storage]: cc.acceptedService(
          gas.personalization_storage,
          cat.functionality
        )
          ? "granted"
          : "denied",
        [gas.security_storage]: cc.acceptedService(
          gas.security_storage,
          cat.security
        )
          ? "granted"
          : "denied",
      });
    };

    if (import.meta.env.VITE_ENVIRONMENT !== "production") return;
    if (window.location.pathname.startsWith("/donate-widget")) return;

    cc.run({
      onConsent,
      categories,
      language: {
        default: "en",
        translations: {
          en: {
            consentModal: consent,
            preferencesModal: preference,
          },
        },
      },
    });
  }, []);
};
