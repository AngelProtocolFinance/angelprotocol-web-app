const CustomButton = (props: any) => {
  const className = `disabled:bg-gray-300 bg-${props.activeColor} w-${props.width} h-${props.height} rounded-xl uppercase text-base font-bold text-white ${props.margin}`;
  return (
    <div>
      {props.type === "submit" ? (
        <button
          className={props.classNames}
          type={props.type}
          disabled={props.isDisabled}
        >
          {props.title}
        </button>
      ) : (
        <button
          className={props.classNames}
          disabled={props.isDisabled}
          onClick={() => props.onClickEvent()}
        >
          {props.title}
        </button>
      )}
    </div>
  );
};

export default CustomButton;
