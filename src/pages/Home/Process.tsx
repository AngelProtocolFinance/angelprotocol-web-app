import setupIcon from "assets/icons/production_wheel.svg";
import donateIcon from "assets/icons/money_savings.svg";
import growIcon from "assets/icons/market_analytics.svg";

export default function Process() {
  const processes = [
    {
      id: 1,
      icon: setupIcon,
      heading: "Setup",
      toolkit: "Step 1",
      text: "Charities register to be listed on our donation marketplace. Each charity is listed with an alignment to one or more United Nations Sustainable Development Goals (UN SDGs). ​",
    },
    {
      id: 2,
      icon: donateIcon,
      heading: "Donate",
      toolkit: "Step 2",
      text: "Donors that are looking to make a sustainable impact, select an individual charity or group of charities (Angel Protocol Charity Index) to donate to. They select what percent of their donations go to the charity’s endowment versus account for immediate access.",
    },
    {
      id: 3,
      icon: growIcon,
      heading: "Grow",
      toolkit: "Step 3",
      text: "Charity endowments grow at high-yield rates. Each month, a portion of the endowment is released to the charity’s liquid account for immediate access.",
    },
  ];

  return (
    <section className="grid items-center bg-process bg-no-repeat bg-center w-full bg-cover">
      <h3 className="text-4xl font-bold text-center text-white uppercase my-24 ">
        How It Works
      </h3>
      <ul className="grid grid-cols-3 h-full justify-items-center mb-10">
        {processes.map(({ icon, heading, toolkit, text, id }) => {
          return (
            <li
              key={id}
              className="grid content-start justify-items-center max-w-xs"
            >
              <div className="bg-gray-50 bg-opacity-30 relative rounded-full shadow-lg backdrop-blur-xl">
                <img src={icon} alt="" className="w-14 m-8" />
                <span className="text-xs absolute top-1 -right-6 bg-white py-2 px-4 rounded-full shadow-md">
                  {toolkit}
                </span>
              </div>
              <h4 className="font-semibold text-white text-center text-3xl my-8">
                {heading}
              </h4>
              <p className="text-white-grey text-center">{text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
