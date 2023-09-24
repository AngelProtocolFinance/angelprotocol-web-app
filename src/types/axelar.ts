//https://docs.axelarscan.io/
export type QueryRes<T> = {
  data: T[];
  total: number;
};

export type Transaction = {
  symbol: string;
  amount: number;
  status: string;
  call: {
    transactionHash: string;
  };
};

////https://docs.axelarscan.io/interchain/estimateGasFee
interface SourceToken {
  contract_address: string;
  symbol: string;
  name: string;
  decimals: number;
  id: string;
  token_price: {
    usd: number;
  };
  gas_price: string;
  gas_price_gwei: string;
  gas_price_in_units: {
    value: string;
    decimals: number;
  };
}

interface DestinationNativeToken {
  contract_address: string;
  name: string;
  symbol: string;
  decimals: number;
  token_price: {
    usd: number;
  };
  gas_price: string;
  gas_price_gwei: string;
  gas_price_in_units: {
    value: string;
    decimals: number;
  };
}

interface AxelarToken {
  name: string;
  symbol: string;
  decimals: number;
  token_price: {
    usd: number;
  };
}

interface SourceExpressFee {
  relayer_fee: number;
  relayer_fee_usd: number;
  express_gas_overhead_fee: number;
  express_gas_overhead_fee_usd: number;
  total: number;
  total_usd: number;
}

interface DestinationExpressFee {
  relayer_fee: number;
  relayer_fee_usd: number;
  express_gas_overhead_fee: number;
  express_gas_overhead_fee_usd: number;
  total: number;
  total_usd: number;
}

type DetailedFeeEstimate = {
  base_fee: number;
  base_fee_usd: number;
  execute_gas_multiplier: number;
  source_base_fee: number;
  source_base_fee_string: string;
  source_base_fee_usd: number;
  destination_base_fee: number;
  destination_base_fee_string: string;
  destination_base_fee_usd: number;
  source_confirm_fee: number;
  destination_confirm_fee: number;
  express_supported: boolean;
  express_fee: number;
  express_fee_string: string;
  express_fee_usd: number;
  express_execute_gas_adjustment: number;
  express_execute_gas_adjustment_with_multiplier: number;
  express_execute_gas_multiplier: number;
  source_express_fee: SourceExpressFee;
  destination_express_fee: DestinationExpressFee;
  source_token: SourceToken;
  destination_native_token: DestinationNativeToken;
  axelar_token: AxelarToken;
};

export interface ApiResponse {
  method: any;
  params: any;
  result: DetailedFeeEstimate;
}

export type GasFeeEstimationParams = {
  method: "estimateGasFee";
  sourceChain: string;
  destinationChain: string;
  gasLimit?: number;
  gasMultiplier: 1.5;
  minGasPrice?: number;
  showDetailedFees: true; //always set this to true

  //gas token
  sourceTokenSymbol?: string;
  sourceTokenAddress?: string;
  sourceContractAddress?: string;

  destinationContractAddress?: string;

  //token being sent with the call, based on source chain
  symbol: string;
  amount: number;
  //scaled amount
  amountInUnits?: number; //either scaled or condensed
};

export interface GasEstimateResponse {
  isExpressSupported: boolean;
  baseFee: string;
  expressFee: string;
  executionFee: string;
  executionFeeWithMultiplier: string;
  totalFee: string;
  gasLimit: string;
  gasMultiplier: number;
  minGasPrice: string;
  apiResponse: ApiResponse;
  time_spent: number;
}
