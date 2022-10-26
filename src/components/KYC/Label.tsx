export default function Label({
  className = "",
  required,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & {
  required?: true;
}) {
  return (
    <label {...props} className={`${className} block text-sm text-inherit`}>
      <span>{props.children}</span>
      {required && <span className="ml-1 text-red-l1 dark:text-red-l2">*</span>}
    </label>
  );
}
