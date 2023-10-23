export default function SubmitBtn() {
  <button
    className="btn-orange btn-donate"
    onClick={
      isNotEstimated
        ? undefined
        : () => {
            submit(estimate.tx);
          }
    }
    disabled={isNotEstimated}
    type="submit"
  >
    Complete
  </button>;
}
