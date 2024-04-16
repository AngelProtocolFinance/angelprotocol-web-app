import React, { useState } from "react";
import TestimonialCard from "../../components/TestimonialCard";
import useGetTestimonials from "../../hooks/useGetTestimonials";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import './styles.css';

// import required modules
import { Navigation, Pagination } from "swiper/modules";

const Testimonials = () => {
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);

  const handleSlideChange = (swiper) => {
    setShowPrevButton(!swiper.isBeginning);
    setShowNextButton(!swiper.isEnd);
  };

  // yh phela ka hai in which details come from server folder means from database
  //     const [testimonials, setTestimonials] = useGetTestimonials([{
  //         review : "We are in love with the easy process Better Giving has created to start an endowment. We always focused on recurring giving with donors. This takes it to the next level.",
  //         reviewer : "Amber Olive",
  //         reviewer_profession : "Associate director, Australia Aid",
  //         reviewer_logo : "/reviewer_logo_1.png"
  //     },{
  //         review : "We are in love with the easy process Better Giving has created to start an endowment. We always focused on recurring giving with donors. This takes it to the next level. I think we can grow our endowment to preserve our efforts through time.",
  //         reviewer : "Daniel Carranza",
  //         reviewer_profession : "Associate director, Australia Aid",
  //         reviewer_logo : "/reviewer_logo_2.png"
  //     },{
  //         review : "Having an untied, passive income stream from an endowment is highly appealing to complement our other revenue streams",
  //         reviewer : "Sarah Hornby",
  //         reviewer_profession : "Associate director, Australia Aid",
  //         reviewer_logo : "/reviewer_logo_3.png"
  //     },
  //     ,{
  //         review : "We are in love with the easy process Better Giving has created to start an endowment. We always focused on recurring giving with donors. This takes it to the next level. I think we can grow our endowment to preserve our efforts through time.",
  //         reviewer : "Daniel Carranza",
  //         reviewer_profession : "Associate director, Australia Aid",
  //         reviewer_logo : "/reviewer_logo_2.png"
  //     }

  // ])

  // const [testimonials, setTestimonials] = useState([{
  //     review : "We are in love with the easy process Better Giving has created to start an endowment. We always focused on recurring giving with donors. This takes it to the next level.",
  //     reviewer : "Amber Olive",
  //     // reviewer : "Anurag Yadav",
  //     reviewer_profession : "Associate director, Australia Aid",
  //     // reviewer_logo : "/reviewer_logo_1.png"
  //     reviewer_logo : "/Aid.png"
  // },{
  //     review : "We are in love with the easy process Better Giving has created to start an endowment. We always focused on recurring giving with donors. This takes it to the next level. I think we can grow our endowment to preserve our efforts through time.",
  //     reviewer : "Daniel Carranza",
  //     reviewer_profession : "Associate director, Australia Aid",
  //     // reviewer_logo : "/reviewer_logo_2.png"
  //     reviewer_logo : "/testimonial2Img.png"
  // },{
  //     review : "Having an untied, passive income stream from an endowment is highly appealing to complement our other revenue streams",
  //     reviewer : "Sarah Hornby",
  //     reviewer_profession : "Associate director, Australia Aid",
  //     // reviewer_logo : "/reviewer_logo_3.png"
  //     reviewer_logo : "/testi3Img.png"
  // },
  // // ,{
  // //     review : "We are in love with the easy process Better Giving has created to start an endowment. We always focused on recurring giving with donors. This takes it to the next level. I think we can grow our endowment to preserve our efforts through time.",
  // //     reviewer : "Daniel Carranza",
  // //     reviewer_profession : "Associate director, Australia Aid",
  // //     reviewer_logo : "/reviewer_logo_2.png"
  // // }

  // ])

  const testimonials = useGetTestimonials();

  // console.log("Anurag :- "+testimonials)

  return (
    <div className="lg:px-[60px] pt-5 md:px-[30px] md:py-[100px] flex flex-col gap-[50px]  relative">
      {/* <p className='text-center text-[144px] font-bold text-[#2D89C8] leading-3'>“</p> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="287"
        height="358"
        viewBox="0 0 287 358"
        fill="none"
        className="absolute  hidden lg:block top-[15%] left-0"
      >
        <path
          opacity="0.4"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-186.87 150.179C-171.375 144.719 -154.386 152.856 -148.926 168.354C-113.43 269.088 -3.00679 321.979 97.7107 286.489C198.428 250.999 251.301 140.567 215.805 39.8331C210.344 24.3355 218.478 7.34603 233.973 1.88603C249.468 -3.57398 266.456 4.56309 271.917 20.0607C318.335 151.79 249.194 296.201 117.486 342.611C-14.221 389.021 -158.62 319.856 -205.038 188.126C-210.499 172.629 -202.365 155.639 -186.87 150.179Z"
          fill="#D8E9FD"
        />
      </svg>
      <img
        src="/quotation.svg"
        alt="quotation mark"
        className="h-[100px]  md:scale-[.8] lg:scale-[.9] scale-[.7] w-[100px] m-auto "
      />
      <h2 className="lg:w-full opacity-75 md:mx-auto lg:-mt-4 md:-mt-7 -mt-8 text-center text-[30px] w-full  md:w-full    px-5 leading-10 md:leading-[58px] md:mb-6 mb-6 md:text-[42px] font-bold Quicksand">
      Success Stories: <br className=" " /> Inspiring Change Together
      </h2>
      {/* <div className='hidden bg-slate-400 lg:flex justify-center gap-[18px] md:mt-5 mt-7  relative'>
              {
                  testimonials.map((ele, i)=>{
                      if (i< testimonials.length - 3) {
                          return null
                      }else{
  
                          return <TestimonialCard review={ele.review} reviewer={ele.reviewer} reviewer_profession={ele.reviewer_profession} reviewer_logo={ele.reviewer_logo} />
                      }
                  })
              }
              </div> */}

      <div className="  relative  flex items-center  md:gap-3 xl:gap-4 lg:justify-between w-fit top-0 left-[50%]  translate-x-[-50%] h-full">
        <button
          className="testimonial-prev lg:relative  lg:top-[50%] lg:left-[0%] lg:translate-y-[-50%] lg:p-3 w-fit h-fit md:p-3  bg-white rounded-full border border-solid shadow md:absolute md:top-1/2 md:translate-y-[-50%] md:left-[2%] z-10  top-[50%] translate-y-[-50%]  absolute left-[-5%] left-0 p-3  lg:hidden"
          // style={{ opacity: showPrevButton ? 1 : 0 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="text-[#2D89C8] w-[24px] h-[24px] font-bold"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <Swiper
          slidesPerView={"auto"}
          // spaceBetween={24}
          loop={true}
          breakpoints={{
            768: {
              spaceBetween: 20,
              slidesPerView: 2,
              centeredSlides: true,
              initialSlide: 2,
            },
            300: {
              //   spaceBetween : 20,
              slidesPerView: 1,
              initialSlide: 1,
              centeredSlides: true,
              spaceBetween: 24,
            },
            1100: {
              slidesPerView: 3,
              spaceBetween: 20,
              // initialSlide : 0,
              // centeredSlides : true
            },
          }}
          navigation={{
            nextEl: ".testimonial-next",
            prevEl: ".testimonial-prev",
            clickable: true,
          }}
          onSlideChange={(swiper) => handleSlideChange(swiper)}
          modules={[Navigation]}
          className="testimonial_swiper "
        >
          {testimonials.map((ele, idx) => {
            // if (i< testimonials.length - 3) {
            //     return null
            // }else{

            return (
              <SwiperSlide key={idx}>
                {" "}
                <TestimonialCard
                  review={ele.review}
                  reviewer={ele.reviewer}
                  reviewer_profession={ele.reviewer_profession}
                  reviewer_logo={ele.reviewer_logo}
                />{" "}
              </SwiperSlide>
              
            );
            // }
          })}
        </Swiper>

        {/* yh swipper ka right button ko hide karna ka code hai style={{ display: showNextButton ? "block" : "none" }} */}
        <button
          className="testimonial-next lg:relative lg:top-[50%] lg:right-[0%] lg:translate-y-[-50%] lg:p-3 md:p-3  bg-white rounded-full border border-solid z-[777]  shadow-md md:absolute absolute md:top-1/2 md:right-[2%] top-[50%] translate-y-[-50%]  right-[-5%] p-3  lg:hidden  anurag "
          // style={{ opacity: showNextButton ? 1 : 0 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="text-[#2D89C8] w-[24px] h-[24px] font-bold "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>

    //         <div className='lg:px-[60px] pt-5 md:px-[30px] md:py-[100px] flex flex-col gap-[50px]  relative'>
    //             {/* <p className='text-center text-[144px] font-bold text-[#2D89C8] leading-3'>“</p> */}
    //             <svg xmlns="http://www.w3.org/2000/svg" width="287" height="358" viewBox="0 0 287 358" fill="none" className='absolute top-[15%] left-0'>
    //   <path opacity="0.4" fillRule="evenodd" clipRule="evenodd" d="M-186.87 150.179C-171.375 144.719 -154.386 152.856 -148.926 168.354C-113.43 269.088 -3.00679 321.979 97.7107 286.489C198.428 250.999 251.301 140.567 215.805 39.8331C210.344 24.3355 218.478 7.34603 233.973 1.88603C249.468 -3.57398 266.456 4.56309 271.917 20.0607C318.335 151.79 249.194 296.201 117.486 342.611C-14.221 389.021 -158.62 319.856 -205.038 188.126C-210.499 172.629 -202.365 155.639 -186.87 150.179Z" fill="#D8E9FD"/>
    // </svg>
    //             <img src='/quotation.svg' alt="quotation mark" className='h-[100px]  md:scale-[.8] lg:scale-[.9] scale-[.7] w-[100px] m-auto ' />
    //             <h2 className='lg:max-w-[40%] opacity-75 md:mx-auto lg:-mt-4 md:-mt-7 -mt-8 text-center text-[30px] w-full  md:max-w-[70%]   px-5 leading-10 md:leading-[58px] md:mb-6 mb-6 md:text-[42px] font-bold Quicksand'>Amazing stories from our customers</h2>
    //             {/* <div className='hidden bg-slate-400 lg:flex justify-center gap-[18px] md:mt-5 mt-7  relative'>
    //             {
    //                 testimonials.map((ele, i)=>{
    //                     if (i< testimonials.length - 3) {
    //                         return null
    //                     }else{

    //                         return <TestimonialCard review={ele.review} reviewer={ele.reviewer} reviewer_profession={ele.reviewer_profession} reviewer_logo={ele.reviewer_logo} />
    //                     }
    //                 })
    //             }
    //             </div> */}

    // <button className='lg:p-3  md:p-3 p-2 bg-white rounded-full border border-solid shadow self-center testimonial-prev  absolute top-[64%] left-0 md:top-[63%] md:left-[1%] lg:top-[63%] lg:left-[5.5%] z-10  md:block' style={{ display: showPrevButton ? "block" : "none" }}>
    //             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-[#2D89C8] w-[24px] h-[24px] font-bold">
    //                 <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    //             </svg>
    //             </button>

    //             <Swiper
    //                     slidesPerView={"auto"}
    //                     // spaceBetween={24}
    //                     // loop={true}
    //                     breakpoints={{
    //                         768 : {
    //                        spaceBetween : 20,
    //                       slidesPerView: 2,
    //                       initialSlide : 1,
    //                       centeredSlides : true
    //                         },
    //                         300 : {
    //                     //   spaceBetween : 20,
    //                       slidesPerView: 1,
    //                       initialSlide : 1,
    //                       centeredSlides : true,
    //                       spaceBetween: 24,
    //                         },
    //                         1100 : {
    //                             slidesPerView: 3,
    //                           spaceBetween : 20,
    //                           // initialSlide : 0,
    //                           // centeredSlides : true
    //                         }
    //                       }}

    //                     navigation={{
    //                         nextEl: '.testimonial-next',
    //                         prevEl: '.testimonial-prev',
    //                         clickable: true,
    //                     }}
    //                      onSlideChange={(swiper) => handleSlideChange(swiper)}
    //                     modules={[Navigation]}
    //                     className="testimonial_swiper "
    //                 >
    //                     {
    //                 testimonials.map((ele, idx)=>{
    //                     // if (i< testimonials.length - 3) {
    //                     //     return null
    //                     // }else{

    //                         return <SwiperSlide key={idx}> <TestimonialCard review={ele.review} reviewer={ele.reviewer} reviewer_profession={ele.reviewer_profession} reviewer_logo={ele.reviewer_logo} /> </SwiperSlide>
    //                     // }
    //                 })
    //             }
    //                 </Swiper>

    //                    {/* yh swipper ka right button ko hide karna ka code hai style={{ display: showNextButton ? "block" : "none" }} */}
    //                 <button className='lg:hidden md:p-3 lg:p-3 p-2  bg-white rounded-full border border-solid z-10 shadow self-center testimonial-next absolute top-[64%] right-0 md:top-[63%] md:right-[1%] lg:top-[63%] lg:right-[7%]   md:block' style={{ opacity: showNextButton ? "1" : "0" }} >
    //             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-[#2D89C8] w-[24px] h-[24px] font-bold ">
    //                 <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    //             </svg>
    //             </button>

    //         </div>
  );
};

export default Testimonials;
