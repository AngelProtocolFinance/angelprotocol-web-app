import { DivContainer } from "./TemplateContainer";

function Loader({ className = "" }: { className?: string }) {
  return (
    <div
      className={className + " bg-gray-l4 dark:bg-bluegray-d1 animate-pulse"}
    />
  );
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
