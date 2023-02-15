export function Submitter(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    _classes?: string;
  }
) {
  const { _classes } = props;
  return (
    <button
      {...props}
      className={`justify-self-center text-blue-d1 dark:text-blue-l2 hover:text-blue hover:dark:text-blue-l3 disabled:text-gray disabled:dark:text-gray
      uppercase  font-extrabold ${_classes || ""}`}
    />
  );
}
