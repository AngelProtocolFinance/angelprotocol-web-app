export default function Heading({ text }: { text: string }) {
  return (
    <th className="text-left uppercase font-heading text-md p-2 pl-0 text-angel-grey">
      {text}
    </th>
  );
}
