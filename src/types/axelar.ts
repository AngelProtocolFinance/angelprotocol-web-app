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

export interface ApiResponse {
  method: string;
  params: {
    method: string;
    sourceChain: string;
    destinationChain: string;
    gasLimit: string;
    gasMultiplier: string;
    minGasPrice: string;
    sourceTokenSymbol: string;
    showDetailedFees: boolean;
  };
  result: {
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
}

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

export type GasFeeEstimationParams = {
  method: "estimateGasFee";
  sourceChain: string;
  destinationChain: string;
  gasLimit?: number;
  gasMultiplier?: number;
  minGasPrice?: number;
  showDetailedFees?: boolean;
  sourceTokenSymbol?: string;
  sourceTokenAddress?: string;
  sourceContractAddress?: string;
  destinationContractAddress?: string;
  symbol?: string;
  amount?: number;
  amountInUnits?: number;
};
