import { SchemaShape } from "schemas/types";
import { object, string } from "yup";

type Donor = {
  email: string;
  firstName: string;
  lastName: string;
};

const shape: SchemaShape<Donor> = {
  email: string().required().email(),
  firstName: string().required(),
  lastName: string().required(),
};

const storageKey = "___persisted_donor";
export const persistDonor = (donor: Donor) => {
  window.localStorage.setItem(storageKey, JSON.stringify(donor));
};

export const persistedDonor = (): Donor | null => {
  try {
    return object(shape).cast(
      JSON.parse(window.localStorage.getItem(storageKey) ?? "")
    ) as Donor;
  } catch (_) {
    return null;
  }
};
