const TestimonialCard = (props: any) => {
  return (
    <div
      className={`relative md:w-full md:min-h-[450px] lg:w-full lg:min-h-[450px] w-full min-h-[430px] p-3 pt-16 border border-[#dbdada] rounded-3xl flex flex-col justify-between bg-white font-body overflow ${props.className}`}
    >
      <div className=" w-32 h-32 absolute top-[-10%] left-5">
        <img
          src={props.reviewer_logo}
          alt="logo"
          className="size-full object-contain"
        />
      </div>
      <p className="md:text-lg text-[17px] h-[270px] mt-8 text-ellipsis overflow-x-hidden font-normal w-full break-words opacity-[.8]">
        {props.review ||
          "We are in love with the easy process Better Giving has created to start an endowment. We always focused on recurring giving with donors. This takes it to the next level."}
      </p>
      <span className="h-[84px]">
        <p className="text-lg opacity-90 font-bold">{props.reviewer}</p>
        <p className="md:text-lg font-medium opacity-75">
          {props.reviewer_profession}
        </p>
      </span>
    </div>
  );
};

export default TestimonialCard;
