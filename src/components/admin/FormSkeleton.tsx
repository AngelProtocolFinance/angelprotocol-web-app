import { DivContainer } from "./TemplateContainer";

function Loader({ className = "" }: { className?: string }) {
  return <div className={className + " bg-red/10"} />;
}

export function FormSkeleton(props: { classes?: string }) {
  return (
    <DivContainer classes={props.classes}>
      <Loader className="h-12 w-full rounded" />
      <Loader className="h-30 w-full rounded" />
      <Loader className="h-12 w-full rounded" />
      <Loader className="h-12 w-full rounded" />
      <Loader className="h-12 w-full rounded" />
      <Loader className="h-12 w-full rounded" />
      <Loader className="h-12 w-24 rounded justify-self-center" />
    </DivContainer>
  );
}
