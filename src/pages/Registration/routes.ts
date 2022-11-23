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
  wallet = "3",
  summary = "4",
}

export default routes;
