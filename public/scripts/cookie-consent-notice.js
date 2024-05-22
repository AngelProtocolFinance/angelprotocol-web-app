(function (c, d, o, g) {
  c.cdogSettings = { version: "1.0.0" };
  o = d.getElementsByTagName("head")[0];
  g = d.createElement("script");
  g.async = 1;
  g.src = "/scripts/complydog-sans-quill.min.js";
  g.setAttribute("cdog-campaign", c.cdogSettings.campaignId);
  !c.cdogInit ? o.appendChild(g) : "";
})(window, document);
window.cdogLocalSettings = {
  campaign: {
    design: {
      theme: {
        buttons: {
          color: "#FFFFFF",
          backgroundColor: "#2d89c8",
          borderRadius: "3px",
        },
        cookieWidget: {
          color: "#3d5361",
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
          maxWidth: "380px",
        },
        globalPrimaryText: { color: "#3d5361" },
        globalBodyBackground: { backgroundColor: "#FFFFFF" },
      },
    },
    cookieWindow: {
      privacyPreferenceCenterText: "Control Your Privacy",
      disclaimerText:
        "Websites may store or retrieve information on your browser, mostly in the form of cookies. This information is used to personalize your experience and is not usually linked to your identity. You can choose not to allow certain types of cookies, but it may affect your website experience. Learn more and change settings by clicking on the different categories.",
      manageConsentPreferencesText: "Choose Which Cookies To Enable",
      confirmMyChoicesText: "Confirm My Choices",
      cookiesTypeStrictlyNecessary: "Strictly Necessary",
      cookiesTypeStrictlyNecessaryText:
        "Strictly necessary cookies enable website functionality and cannot be turned off. They are typically set in response to actions you take, like setting privacy preferences, logging in, or filling in forms. You can block or receive alerts about these cookies, but some website features may not work. These cookies do not store personal information.",
      cookiesTypePerformance: "Performance",
      cookiesTypePerformanceText:
        "Performance cookies track site visits and traffic sources to measure and improve site performance. They provide information on popular pages and visitor behavior. The information collected is anonymous. If you do not allow these cookies, we will not know when you have visited the site and cannot monitor its performance.",
      cookiesTypeTargeting: "Targeting",
      cookiesTypeTargetingText:
        "Targeting cookies are cookies that our advertising partners may set on our site. They use them to create a profile of your interests and show relevant ads on other sites. They do not store personal information, but use your browser and internet device's unique ID. Without these cookies, you will see less targeted ads.",
      cookiesTypeFunctional: "Functional",
      cookiesTypeFunctionalText:
        "Functional cookies improve your website experience through enhanced functionality and personalization. They are set by us or third-party providers. Without them, some or all of these services may not work properly.",
    },
    cookieWidget: {
      placement: "bl",
      icon: "default",
      description: "We use cookies as an essential part of our website.",
      customizeSettingsText: "Customize Settings",
      allowAllText: "Allow All",
      allowOnlyNecessaryText: "Allow Only Necessary",
      manageSettingsText: "Manage Settings",
      iconImageUrl:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'%3E%3Cpath d='m12.078 0c6.587.042 11.922 5.403 11.922 12 0 6.623-5.377 12-12 12s-12-5.377-12-12c3.887 1.087 7.388-2.393 6-6 4.003.707 6.786-2.722 6.078-6zm1.422 17c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm-6.837-3c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm11.337-3c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm-6-1c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-9-3c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm13.5-2c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm-15-2c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm6-2c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm-3.5-1c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z' fill='%23b9926b' fill-rule='evenodd'/%3E%3C/svg%3E",
    },
  },
  cookieTool: true,
};
