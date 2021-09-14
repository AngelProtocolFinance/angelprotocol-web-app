export interface Icons {
  [index: string]: React.FC<{ className: string }>;
}

export interface Colors {
  accentBg: string;
  textColor: string;
}

export interface Styles {
  [index: string]: Colors;
}

export type Handler = () => void;

export interface Props {
  heading: string;
  message: string;
  acknowledge: Handler;
  //must get unified with consumer Status types
  //maybe better to let component user style the popup??
  type: "error" | "success";
}
