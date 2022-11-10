enum routes {
  index = "",
  contactDetails = "contact-details",
  dashboard = "dashboard",
  confirmEmail = "confirm-email",
  verifyEmail = "verify/:token",
  wallet = "wallet",
  profile = "profile",
  documentation = "documentation",
  additionalInformation = "additional-information",
  steps = "steps",
}

export enum steps {
  contact = "1",
  doc = "2",
  profile = "3",
  wallet = "4",
  summary = "5",
}

export default routes;
