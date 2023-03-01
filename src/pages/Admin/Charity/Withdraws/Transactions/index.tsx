import List from "./List";
import Table from "./Table";

export default function Transactions() {
  return (
    <>
      <List classes="grid md:hidden" />
      <Table classes="hidden md:table" />
    </>
  );
}
