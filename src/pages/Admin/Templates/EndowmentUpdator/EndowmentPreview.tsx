import { useEndowmentList } from "services/terra/registrar/queriers";

export default function EndowmentPreview() {
  const { isEndowmentsLoading, endowments } = useEndowmentList();

  return <div>hello world</div>;
}
