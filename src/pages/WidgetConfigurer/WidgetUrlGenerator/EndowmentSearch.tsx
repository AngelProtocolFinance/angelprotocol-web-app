import Search from "components/Search";

export default function EndowmentSearch() {
  return (
    <Search
      classes="my-2 h-12"
      placeholder="Search organizations..."
      onChange={(query) => console.log(query)}
    />
  );
}
