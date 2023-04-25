export default function ContributorVerification() {
  return (
    <div className="grid gap-8">
      <h2 className="font-bold text-3xl">Other settings</h2>

      <div className="flex flex-col items-start gap-8 p-8 border border-prim rounded dark:bg-blue-d6">
        <span className="font-bold text-2xl">Contributor Verification</span>
        <div className="flex justify-between items-center w-full px-4 py-3 border border-prim rounded bg-gray-l6 dark:bg-blue-d5">
          <span>
            Contributors <b>aren't</b> able to donate anonymously. Contributor
            verification <b>is</b> enforced.
          </span>
          <button
            type="button"
            className="btn-outline-filled w-32 h-10 text-sm"
          >
            Change
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button type="reset" className="btn-outline-gray w-44 h-12 text-sm">
            Reset changes
          </button>
          <button type="submit" className="btn-outline-gray w-44 h-12 text-sm">
            Submit changes
          </button>
        </div>
      </div>
    </div>
  );
}
