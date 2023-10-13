export const URLS = {
  rootUrl: "https://api.sandbox.transferwise.tech",
  createQuote: {
    method: "POST",
    url: () => `/v3/profiles/{{profileId}}/quotes`,
  },
  getAccountRequirements: {
    method: "GET",
    url: (quoteId: string) => `/v1/quotes/${quoteId}/account-requirements`,
  },
  postAccountRequirements: {
    method: "POST",
    url: (quoteId: string) => `/v1/quotes/${quoteId}/account-requirements`,
  },
};
