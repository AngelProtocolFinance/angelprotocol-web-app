export default function GroupTitle(props: {
  title: string;
  colorClass: string;
}) {
  return (
    <p
      className={`mb-2 uppercase font-semibold text-sm font-heading ${props.colorClass}`}
    >
      {props.title}
    </p>
  );
}
