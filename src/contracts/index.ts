interface Iincrement {
  increment: any;
}

interface Iget_count {
  get_count: any;
}

interface Iaddresses {
  [key: string]: string;
}

interface IhandleMessages {
  depositDonor: Iincrement;
}

interface IqueryMessages {
  getBalance: Iget_count;
}

interface IAngelProtocolIndexFund {
  AngelProtocolIndexFund: {
    address: Iaddresses;
    handleMessages: IhandleMessages;
    queryMessages: IqueryMessages;
  };
}

const contracts: IAngelProtocolIndexFund = {
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
