import CharityHeader from "./CharityHeader";

export default function Header() {
  return (
    <div
      className={`flex flex-col gap-1 w-full py-6 px-5 border-b border-prim`}
    >
      <CharityHeader />
    </div>
  );
}
