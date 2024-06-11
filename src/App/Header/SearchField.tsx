import Icon from "components/Icon";

interface ISearchField {
  text: string;
  onChange: (text: string) => void;
  classes?: string;
}
export default function SearchField({
  classes = "",
  text,
  onChange,
}: ISearchField) {
  return (
    <div
      className={`${classes} flex items-center px-4 py-1 text-sm gap-1 font-heading`}
    >
      <label htmlFor="__endow-search">
        <Icon type="Search" className="mr-1 text-2xl text-gray" />
      </label>
      <input
        value={text}
        onChange={(e) => onChange(e.target.value)}
        id="__endow-search"
        type="text"
        placeholder="Search causes..."
        className="focus:outline-none text-lg placeholder:text-gray text-navy-l1 autofill:bg-white"
      />
    </div>
  );
}
