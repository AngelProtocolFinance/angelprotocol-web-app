import Popup, { Actions, Content } from "./Popup";

export type Props = {
  desc: string;
  url: string;
};
export default function Result(props: Props) {
  return (
    <Popup accent="bg-angel-blue">
      <Content>
        <div className="flex flex-col items-center my-auto p-4">
          <p className="text-angel-blue mb-4 uppercase font-heading text-center font-bold">
            {props.desc}
          </p>
          <a
            className="text-thin-blue mt-2"
            href={props.url}
            target="_blank"
            rel="noreferrer"
          >
            transaction details
          </a>
        </div>
        <Actions></Actions>
      </Content>
    </Popup>
  );
}
