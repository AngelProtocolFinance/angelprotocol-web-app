import { RegistrationState } from "./types";

/**
 * any page
 * /contact
 * /docs
 * /profile
 * /wallet
 *
 * can access registration state and need to decide if state is
 * complete for that specific page
 */

const state = {} as RegistrationState;
function getContextValue<T extends RegistrationState["step"]>(): Extract<
  RegistrationState,
  { step: T; data: any }
> {
  return {} as any;
}

const x = getContextValue<0>();
