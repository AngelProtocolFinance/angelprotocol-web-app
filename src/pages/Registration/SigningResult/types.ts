//www.useanvil.com/docs/api/e-signatures/#redirecturl

type BaseQueryParams = {
  signerEid: string;
  documentGroupStatus: "completed" | "partial" | "sent";
  documentGroupEid: string;
  etchPacketEid: string;
};

type SignerCompleteQueryParams = BaseQueryParams & {
  action: "signerComplete";
  signerStatus: "completed";
};

type ErrorQueryParams = BaseQueryParams & {
  action: "signerError";
  signerStatus: "sent";
  errorType: "tokenExpired" | "tokenInvalid" | "notFound" | "unknown";
  error: string;
  message: string;
};

export type QueryParams = SignerCompleteQueryParams | ErrorQueryParams;

const isSuccess = (params: QueryParams): params is SignerCompleteQueryParams =>
  params.action === "signerComplete";
