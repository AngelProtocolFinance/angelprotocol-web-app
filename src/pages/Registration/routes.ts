import { app, site } from "constants/routes";

enum routes {
  index = "/",
  contactDetails = "contact-details",
  dashboard = "dashboard",
  confirm = "confirm",
  verify = "verify/:token",
  wallet = "wallet",
  charityProfile = "charity-profile",
  documentation = "documentation",
  additionalInformation = "additional-information",
}

export const registerRootPath = `${site.app}/${app.register}`;

export default routes;
