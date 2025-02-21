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
} as const;

const gas = {
  ad_storage: "ad_storage",
  analytics_storage: "analytics_storage",
  functionality_storage: "functionality_storage",
  personalization_storage: "personalization_storage",
  security_storage: "security_storage",
  ad_user_data: "ad_user_data",
  ad_personalization: "ad_personalization",
} as const;

const categories: { [name: string]: cc.Category } = {
  [cat.necessary]: {
    enabled: true,
    readOnly: true,
  },
  [cat.analytics]: {
    autoClear: {
      cookies: [{ name: /^_ga/ }, { name: "_gid" }],
    },
    services: {
      [gas.analytics_storage]: {
        label:
          "Controls storage for audience measurement and behavioral modeling",
      },
    },
  },
  [cat.advertisement]: {
    services: {
      [gas.ad_storage]: {
        label: "Controls cookie storage for advertising measurement purposes",
      },
      [gas.ad_user_data]: {
        label: "Controls user data collection for advertising measurement",
      },
      [gas.ad_personalization]: {
        label: "Controls personalized advertising and audience remarketing",
      },
    },
  },
  [cat.functionality]: {
    services: {
      [gas.functionality_storage]: {
        label:
          "Controls storage for website functionality and user preferences",
      },
      [gas.personalization_storage]: {
        label: "Controls storage for personalized content and recommendations",
      },
    },
  },
  [cat.security]: {
    services: {
      [gas.security_storage]: {
        label: "Controls storage for security features and fraud prevention",
      },
    },
  },
  [cat.tracking]: {},
};

const sections: cc.Section[] = [
  {
    title: "Cookie usage",
    description:
      "We use cookies and similar technologies to provide, protect, and improve our services.",
  },
  {
    title: "Strictly necessary cookies",
    description:
      "These cookies are essential for the proper functioning of the website and cannot be disabled.",
    linkedCategory: cat.necessary,
  },
  {
    title: "Google Analytics",
    description: `These cookies help us understand how users interact with our service:
      • User and event reporting
      • Behavioral modeling to improve our service
      • Measurement of user engagement`,
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
            'Cookie set by <a href="https://business.safety.google/adscookies/">Google Analytics</a> for audience measurement',
          expiration: "Expires after 12 days",
        },
        {
          name: "_gid",
          domain: "Google Analytics",
          description:
            'Cookie set by <a href="https://business.safety.google/adscookies/">Google Analytics</a> for session tracking',
          expiration: "Session",
        },
      ],
    },
  },
  {
    title: "Google Ads",
    description: `These cookies are used for advertising purposes:
      • Ad measurement and conversion tracking
      • Demographics insights
      • Audience remarketing`,
    linkedCategory: cat.advertisement,
  },
  {
    title: "Functionality & Preferences",
    description: `These cookies enable website functionality:
      • Language preferences
      • User interface customization
      • Session management`,
    linkedCategory: cat.functionality,
  },
  {
    title: "Security",
    description: `These cookies help protect you and our service:
      • Authentication
      • Fraud prevention
      • User protection`,
    linkedCategory: cat.security,
  },
  {
    title: "Third-Party Tracking",
    description: `Optional tracking scripts from our partners:
      • Meta Pixel
      • Twitter Conversion
      • LinkedIn Insight
      • HotJar
      • HubSpot`,
    linkedCategory: cat.tracking,
  },
];

const consent: cc.ConsentModalOptions = {
  title: "Cookie Preferences",
  description:
    "We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. Please select your preferences below.",
  acceptAllBtn: "Accept all",
  acceptNecessaryBtn: "Reject all",
  showPreferencesBtn: "Manage preferences",
};

const preference: cc.PreferencesModalOptions = {
  title: "Manage Cookie Preferences",
  acceptAllBtn: "Accept all",
  acceptNecessaryBtn: "Reject all",
  savePreferencesBtn: "Save preferences",
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
    if (import.meta.env.VITE_ENVIRONMENT !== "production") return;
    if (window.location.pathname.startsWith("/donate-widget")) return;

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];

    const onConsentChange = async () => {
      // Push consent update to dataLayer for GTM
      window.dataLayer.push({
        event: "consent_update",
        cookie_consent: {
          analytics: cc.acceptedService(gas.analytics_storage, cat.analytics),
          advertising: cc.acceptedService(gas.ad_storage, cat.advertisement),
          ad_user_data: cc.acceptedService(gas.ad_user_data, cat.advertisement),
          ad_personalization: cc.acceptedService(
            gas.ad_personalization,
            cat.advertisement
          ),
          functionality: cc.acceptedService(
            gas.functionality_storage,
            cat.functionality
          ),
          security: cc.acceptedService(gas.security_storage, cat.security),
          personalization: cc.acceptedService(
            gas.personalization_storage,
            cat.functionality
          ),
        },
      });

      await load("/scripts/intercom.js");

      if (cc.acceptedCategory(cat.tracking)) {
        await load("/scripts/twitter-conversion-tracking.js");
        await load("/scripts/meta-pixel.js");
        await load("/scripts/linkedin-tracking.js");
        await load("/scripts/hotjar-tracking.js");
        await load("//js-eu1.hs-scripts.com/24900163.js");
      }

      if (cc.acceptedCategory(cat.analytics)) {
        await load("/scripts/gtm-init.js");
      }
    };

    cc.run({
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
      onFirstConsent: onConsentChange,
      onConsent: onConsentChange,
      autoShow: true,
    });
  }, []);
};
