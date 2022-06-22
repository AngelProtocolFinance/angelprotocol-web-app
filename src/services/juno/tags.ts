type JunoTags = "registrar" | "endowment";

export const junoTags: { [key in JunoTags]: string } = {
  registrar: "registrar",
  endowment: "endowment",
};

export enum registrarTags {
  endowments = "endowments",
}

export enum endowmentTags {
  profile = "profile",
}
