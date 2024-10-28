import { TriangleAlert } from "lucide-react";
import { DivContainer } from "./TemplateContainer";

export function FormError(props: { errorMessage: string }) {
  return (
    <DivContainer>
      <p className="flex gap-2 text-red-l1 text-sm">
        <TriangleAlert size={20} />
        <span>{props.errorMessage}</span>
      </p>
    </DivContainer>
  );
}
