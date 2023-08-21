//www.useanvil.com/docs/api/e-signatures/#redirecturl

type BaseQueryParams = {
  signerStatus: string;
  signerEid: string;
  documentGroupStatus: "completed" | "partial" | "sent";
  documentGroupEid: string;
  etchPacketEid: string;
};

type SignerCompleteQueryParams = BaseQueryParams & { action: "signerComplete" };

type ErrorQueryParams = BaseQueryParams & {
  action: "signerError";
  errorType: "tokenExpired" | "tokenInvalid" | "notFound" | "unknown";
  error: string;
  message: string;
};

type QueryParams = SignerCompleteQueryParams | ErrorQueryParams;

const isSuccess = (params: QueryParams): params is SignerCompleteQueryParams =>
  params.action === "signerComplete";

export default function SignResult({ classes = "" }) {
  //continue registration
  return (
    <div className={classes}>
      <h3>Signing successful!</h3>
      <button>continue registration</button>
    </div>
  );
}
