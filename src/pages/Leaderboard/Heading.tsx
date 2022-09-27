type Props = { text: string };

export default function Heading(props: Props) {
  return (
    <th className="text-left uppercase font-heading text-md p-2 pl-0 text-gray-d2">
      {props.text}
    </th>
  );
}
