import ContentLoader from "components/content-loader";
import { DivContainer } from "./TemplateContainer";

export function FormSkeleton(props: { classes?: string }) {
  return (
    <DivContainer classes={props.classes}>
      <ContentLoader className="h-12 w-full" />
      <ContentLoader className="h-32 w-full" />
      <ContentLoader className="h-12 w-full" />
      <ContentLoader className="h-12 w-full" />
      <ContentLoader className="h-12 w-full" />
      <ContentLoader className="h-12 w-full" />
      <ContentLoader className="h-12 w-24 justify-self-center" />
    </DivContainer>
  );
}
