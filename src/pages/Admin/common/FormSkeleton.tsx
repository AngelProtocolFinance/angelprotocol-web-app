import ContentLoader from "components/ContentLoader";
import { DivContainer } from "./TemplateContainer";

export default function FormSkeleton() {
  return (
    <DivContainer>
      <ContentLoader className="h-12 w-full rounded-md opacity-20" />
      <ContentLoader className="h-30 w-full rounded-md opacity-20" />
      <ContentLoader className="h-12 w-full rounded-md opacity-20" />
      <ContentLoader className="h-12 w-full rounded-md opacity-20" />
      <ContentLoader className="h-12 w-full rounded-md opacity-20" />
      <ContentLoader className="h-12 w-full rounded-md opacity-20" />
      <ContentLoader className="h-12 w-24 rounded-md opacity-20 justify-self-center" />
    </DivContainer>
  );
}
