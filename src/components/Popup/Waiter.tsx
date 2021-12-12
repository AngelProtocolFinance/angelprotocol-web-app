import Loader from "components/Loader/Loader";
import Popup, { Content } from "./Popup";
export type Props = { url?: string; desc: string };
export default function Waiter(props: Props) {
  return (
    <Popup accent="bg-angel-blue">
      <Content>
        <div className="flex flex-col items-center my-auto p-4 ">
          <Loader
            bgColorClass="bg-angel-grey"
            gapClass="gap-2"
            widthClass="w-4"
          />
          <p className="text-center text-angel-grey mt-4">{props.desc}</p>
          {props.url && (
            <a
              href={props.url}
              target="_blank"
              rel="noreferrer noopener"
              className="text-center text-angel-blue cursor-pointer"
            >
              view transaction status
            </a>
          )}
        </div>
      </Content>
    </Popup>
  );
}
