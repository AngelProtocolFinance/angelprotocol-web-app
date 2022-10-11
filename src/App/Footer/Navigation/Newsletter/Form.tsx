export default function Form() {
  return (
    <form
      className="flex items-start gap-3 xl:gap-6"
      onSubmit={(e) => console.log("submitted", e)}
    >
      <input
        className="flex items-center py-2 px-3 border border-gray-l2 rounded-lg"
        placeholder="Enter your email address here"
      />
      <button type="submit" className="btn-primary uppercase">
        Subscribe
      </button>
    </form>
  );
}
