import axios from "axios";
import { useEffect, useState } from "react";


export default function useGetTestimonials() {
    const [testimonials, setTestimonials] = useState([
        {
        review : "We are in love with the easy process Better Giving has created to start an endowment. We always focused on recurring giving with donors. This takes it to the next level.",
        reviewer : "Amber Olive",
        // reviewer : "Anurag Yadav",
        reviewer_profession : "Associate director, Australia Aid",
        // reviewer_logo : "/reviewer_logo_1.png"
        reviewer_logo : "/Aid.png"
        //reviewer_logo : "/a.svg"
    },{
        review : "We are in love with the easy process Better Giving has created to start an endowment. We always focused on recurring giving with donors. This takes it to the next level. I think we can grow our endowment to preserve our efforts through time.",
        reviewer : "Daniel Carranza",
        reviewer_profession : "Associate director, Australia Aid",
        // reviewer_logo : "/reviewer_logo_2.png"
        reviewer_logo : "/testimonial2Img.png"
    },{
        review : "Having an untied, passive income stream from an endowment is highly appealing to complement our other revenue streams",
        reviewer : "Sarah Hornby",
        reviewer_profession : "Associate director, Australia Aid",
        // reviewer_logo : "/reviewer_logo_3.png"
        reviewer_logo : "/testi3Img.png"
    },
    {
        review : "We are in love with the easy process Better Giving has created to start an endowment. We always focused on recurring giving with donors. This takes it to the next level.",
        reviewer : "Amber Olive",
        // reviewer : "Anurag Yadav",
        reviewer_profession : "Associate director, Australia Aid",
        // reviewer_logo : "/reviewer_logo_1.png"
        reviewer_logo : "/Aid.png"
        //reviewer_logo : "/a.svg"
    },{
        review : "We are in love with the easy process Better Giving has created to start an endowment. We always focused on recurring giving with donors. This takes it to the next level. I think we can grow our endowment to preserve our efforts through time.",
        reviewer : "Daniel Carranza",
        reviewer_profession : "Associate director, Australia Aid",
        // reviewer_logo : "/reviewer_logo_2.png"
        reviewer_logo : "/testimonial2Img.png"
    },{
        review : "Having an untied, passive income stream from an endowment is highly appealing to complement our other revenue streams",
        reviewer : "Sarah Hornby",
        reviewer_profession : "Associate director, Australia Aid",
        // reviewer_logo : "/reviewer_logo_3.png"
        reviewer_logo : "/testi3Img.png"
    },
    {
        review : "We are in love with the easy process Better Giving has created to start an endowment. We always focused on recurring giving with donors. This takes it to the next level.",
        reviewer : "Amber Olive",
        // reviewer : "Anurag Yadav",
        reviewer_profession : "Associate director, Australia Aid",
        // reviewer_logo : "/reviewer_logo_1.png"
        reviewer_logo : "/Aid.png"
        //reviewer_logo : "/a.svg"
    },{
        review : "We are in love with the easy process Better Giving has created to start an endowment. We always focused on recurring giving with donors. This takes it to the next level. I think we can grow our endowment to preserve our efforts through time.",
        reviewer : "Daniel Carranza",
        reviewer_profession : "Associate director, Australia Aid",
        // reviewer_logo : "/reviewer_logo_2.png"
        reviewer_logo : "/testimonial2Img.png"
    },{
        review : "Having an untied, passive income stream from an endowment is highly appealing to complement our other revenue streams",
        reviewer : "Sarah Hornby",
        reviewer_profession : "Associate director, Australia Aid",
        // reviewer_logo : "/reviewer_logo_3.png"
        reviewer_logo : "/testi3Img.png"
    },
    {
        review : "We are in love with the easy process Better Giving has created to start an endowment. We always focused on recurring giving with donors. This takes it to the next level.",
        reviewer : "Amber Olive",
        // reviewer : "Anurag Yadav",
        reviewer_profession : "Associate director, Australia Aid",
        // reviewer_logo : "/reviewer_logo_1.png"
        reviewer_logo : "/Aid.png"
        //reviewer_logo : "/a.svg"
    },{
        review : "We are in love with the easy process Better Giving has created to start an endowment. We always focused on recurring giving with donors. This takes it to the next level. I think we can grow our endowment to preserve our efforts through time.",
        reviewer : "Daniel Carranza",
        reviewer_profession : "Associate director, Australia Aid",
        // reviewer_logo : "/reviewer_logo_2.png"
        reviewer_logo : "/testimonial2Img.png"
    },{
        review : "Having an untied, passive income stream from an endowment is highly appealing to complement our other revenue streams",
        reviewer : "Sarah Hornby",
        reviewer_profession : "Associate director, Australia Aid",
        // reviewer_logo : "/reviewer_logo_3.png"
        reviewer_logo : "/testi3Img.png"
    },])

    //    console.log(testimonials)

    return testimonials;
}


// export default function useGetTestimonials(initial) {
//     const [testimonials, setTestimonials] = useState(initial)

//     useEffect(() => {
//         const fetchTestimonials = async() => {
//             const res = await axios({
//                 method : "get",
//                 url : "/api/testimonials"
//             })
//             // console.log(res)
//             if (res.data.success === true) {
//                 setTestimonials(res.data.Testimonials)
//             }
//             else {
//                 alert("Could not get Testimonials")
//             }
//         }

//         fetchTestimonials()
//     }, [])

//     return [testimonials, setTestimonials]
// }