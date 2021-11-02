type Props = { closeHandler: () => void };
export default function Backdrop(props: Props) {
  return (
    <div
      onClick={props.closeHandler}
      className="z-10 fixed top-0 right-0 left-0 bottom-0"
    ></div>
  );
}
