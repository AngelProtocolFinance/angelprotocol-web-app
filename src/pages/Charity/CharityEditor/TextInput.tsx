export default function TextInput() {
  return (
    <div className="grid content-start text-white-grey text-opacity-80 mb-8">
      <label className="text-xs font-heading font-semibold">label</label>
      <input
        type="text"
        className="text-opacity-100 bg-transparent border-b border-opacity-40 focus:outline-none focus:border-opacity-80 py-1 "
      />
    </div>
  );
}
