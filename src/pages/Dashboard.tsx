import CharityCategory from "components/CharityCategory";
import fixtureData from "components/CharityCategory/CharityCategory.fixture.json";

const charityCategories = Array(6)
  .fill(fixtureData)
  .map((data, i) => ({ ...data, id: i }));

const Dashboard = () => {
  const title = "17 UNTIED NATIONS SUSTAINABLE DEVELOPMENT GOALS (UNSDGs)";

  return (
    <div className="grid grid-rows-dashboard pt-24">
      <div className="grid content-center justify-items-center text-center text-white bg-no-repeat bg-banner-charity bg-cover h-72">
        <p className="uppercase text-2xl xl:text-4xl">
          we categorize our charities based on the
        </p>
        <p className="font-extrabold text-2xl xl:text-4xl my-2">{title}</p>
        <button
          className="w-48 uppercase bg-yellow-blue p-1.5 rounded-lg font-bold mt-5"
          onClick={() => alert("click learn more button")}
        >
          learn more
        </button>
      </div>
      <section className="flex-auto container mx-auto px-5 mt-5">
        {charityCategories.map((category) => {
          return <CharityCategory {...category} key={category.id} />;
        })}
      </section>
    </div>
  );
};

export default Dashboard;
