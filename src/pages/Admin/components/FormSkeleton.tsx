import ContentLoader from "components/ContentLoader/ContentLoader";
import FormContainer from "./FormContainer";

export default function FormSkeleton() {
  return (
    <FormContainer>
      <ContentLoader className="h-12 w-full rounded-md opacity-20" />
      <ContentLoader className="h-30 w-full rounded-md opacity-20" />
      <ContentLoader className="h-12 w-full rounded-md opacity-20" />
      <ContentLoader className="h-12 w-full rounded-md opacity-20" />
      <ContentLoader className="h-12 w-full rounded-md opacity-20" />
      <ContentLoader className="h-12 w-full rounded-md opacity-20" />
      <ContentLoader className="h-12 w-24 rounded-md opacity-20 justify-self-center" />
    </FormContainer>
  );
}
