export default function GroupTitle(props: { title: string }) {
  return (
    <p className="mb-2 uppercase font-semibold text-xs text-white font-heading ">
      {props.title}
    </p>
  );
}
