export const URLS = {
  rootUrl: "https://api.sandbox.transferwise.tech",
  createQuote: {
    method: "POST",
    // url: () => `/v3/profiles/{{profileId}}/quotes`,
    url: () => `/v3/profiles/${process.env.REACT_APP_WISE_PROFILE_ID}/quotes`,
  },
  getAccountRequirements: {
    method: "GET",
    url: (quoteId: string) => `/v1/quotes/${quoteId}/account-requirements`,
  },
  postAccountRequirements: {
    method: "POST",
    url: (quoteId: string) => `/v1/quotes/${quoteId}/account-requirements`,
  },
  getAccountRequirementsForRoute: {
    method: "GET",
    url: (targetCurrency: string, sourceAmount: number) =>
      `/v1/account-requirements?source=USD&target=${targetCurrency}&sourceAmount=${sourceAmount}`,
  },
};
