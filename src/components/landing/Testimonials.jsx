import axios from "axios";
import { useNavigate } from "react-router-dom";
import useGetTestimonials from "../../constants/useGetTestimonials";
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  const [testimonials] = useGetTestimonials([]);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const res = await axios({
      method: "delete",
      url: `/api/testimonials/${id}`,
    });
    if (res.data.success === true) {
      alert("Testimonial Deleted");
    } else {
      alert("Could not delete Testimonial");
    }
  };

  return (
    <div className="p-[30px] lg:p-[100px] flex gap-5 flex-wrap">
      <div
        className="min-w-[350px] min-h-[444px] border border-solid flex items-center justify-center pb-6 rounded-[18px] mt-4 cursor-pointer"
        onClick={() => navigate("/dashboard/create-testimonial")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
      {testimonials.map((ele) => {
        return (
          //biome-ignore lint: TODO: fix incorrect props role
          <TestimonialCard
            review={ele.review}
            reviewer={ele.reviewer}
            reviewer_profession={ele.reviewer_profession}
            reviewer_logo={ele.reviewer_logo}
            role={"ADMIN"}
            handleDelete={handleDelete}
            id={ele._id}
            className="mt-4"
          />
        );
      })}
    </div>
  );
};

export default Testimonials;
