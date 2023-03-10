export default function WithdrawButton({ disabled }: { disabled: boolean }) {
  return (
    <button type="submit" disabled={disabled} className="btn-orange py-3">
      Withdraw
    </button>
  );
}
