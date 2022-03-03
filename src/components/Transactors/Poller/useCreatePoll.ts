import useCreatePollEstimate from "./useCreatePollEstimate";

export default function useCreatePoll() {
  const { wallet, maxFee } = useCreatePollEstimate();
}
