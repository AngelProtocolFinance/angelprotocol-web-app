interface incrementConfig {
  increment: any;
}

interface get_countConfig {
  get_count: any;
}

interface addressesConfig {
  [key: string]: string;
}

interface handleMessagesConfig {
  depositDonor: incrementConfig;
}

interface queryMessagesConfig {
  getBalance: get_countConfig;
}

interface AngelProtocolIndexFundConfig {
  AngelProtocolIndexFund: {
    address: addressesConfig;
    handleMessages: handleMessagesConfig;
    queryMessages: queryMessagesConfig;
  };
}

const contracts: AngelProtocolIndexFundConfig = {
  AngelProtocolIndexFund: {
    address: {
      localterra: "terra18vd8fpwxzck93qlwghaj6arh4p7c5n896xzem5",
    },
    handleMessages: {
      depositDonor: { increment: {} },
    },
    queryMessages: {
      getBalance: { get_count: {} },
    },
  },
};

export default contracts;
