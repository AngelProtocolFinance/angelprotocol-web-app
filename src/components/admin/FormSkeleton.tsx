import ContentLoader from "components/ContentLoader";
import { DivContainer } from "./TemplateContainer";

export function FormSkeleton(props: { classes?: string }) {
  return (
    <DivContainer classes={props.classes}>
      <ContentLoader className="h-12 w-full" />
      <ContentLoader className="h-30 w-full" />
      <ContentLoader className="h-12 w-full" />
      <ContentLoader className="h-12 w-full" />
      <ContentLoader className="h-12 w-full" />
      <ContentLoader className="h-12 w-full" />
      <ContentLoader className="h-12 w-24 justify-self-center" />
    </DivContainer>
  );
}
