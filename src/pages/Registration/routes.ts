enum routes {
  index = "",
  resume = "resume",
  confirmEmail = "confirm-email",
  verifyEmail = "verify/:token",
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
