import usePhantom from "./usePhantom";

export default function Sender() {
  const { connect, disconnect, loading } = usePhantom();
  return (
    <div>
      <p>{loading ? "loading" : "done"}</p>
      <button onClick={connect}>connect</button>
      <button onClick={disconnect}>disconnect</button>
    </div>
  );
}
