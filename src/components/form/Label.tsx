export function Label({
  className = "",
  required,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
}) {
  return (
    <label
      {...props}
      className={`${className} block text-sm text-inherit after:ml-1 ${
        required !== undefined
          ? required
            ? "after:content-['*'] after:text-red"
            : "after:content-['(optional)'] after:text-gray-d1 after:dark:text-gray"
          : ""
      }`}
    >
      {props.children}
    </label>
  );
}
