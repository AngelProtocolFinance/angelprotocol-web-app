export const routes = {
  index: "",
  resume: "resume",
  steps: "steps",
  confirmEmail: "confirm-email",
  /** temp route only - will be moved in overall wiring */
  contact: "contact",
} as const;

export const steps = {
  contact: 1,
  doc: 2,
  profile: 3,
  wallet: 4,
  summary: 5,
} as const;
