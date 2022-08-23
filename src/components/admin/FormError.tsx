import Icon from "components/Icon";
import { DivContainer } from "./TemplateContainer";

export function FormError(props: { errorMessage: string }) {
  return (
    <DivContainer>
      <p className="flex gap-2 font-mono text-red-400 font-semibold text-sm">
        <Icon type="Warning" size={20} />
        <span>{props.errorMessage}</span>
      </p>
    </DivContainer>
  );
}
