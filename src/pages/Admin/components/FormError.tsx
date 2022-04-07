import Icon from "components/Icons/Icons";
import FormContainer from "./FormContainer";

export default function FormError(props: { errorMessage: string }) {
  return (
    <FormContainer>
      <p className="flex gap-2 font-mono text-red-400 font-semibold text-sm">
        <Icon type="Warning" size={20} />
        <span>{props.errorMessage}</span>
      </p>
    </FormContainer>
  );
}
