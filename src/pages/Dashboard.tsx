import CharityCategory from "components/CharityCategory";
import fixtureData from "components/CharityCategory/CharityCategory.fixture.json";
import AppHead from "components/Headers/AppHead";

const charityCategories = Array(6)
  .fill(fixtureData)
  .map((data, i) => ({ ...data, id: i }));

const Dashboard = () => {
  return (
    <div className="grid grid-rows-dashboard">
      <div className="grid grid-rows-a1 items-center justify-items-center text-center text-white bg-no-repeat bg-banner-charity bg-cover h-80 pt-5">
        <AppHead />
        <div>
          <p className="uppercase text-2xl xl:text-4xl">
            we categorize our charities based on the
          </p>
          <p className="font-extrabold text-2xl xl:text-4xl my-2">
            17 UNITED NATIONS SUSTAINABLE DEVELOPMENT GOALS (UNSDGs)
          </p>
          <button
            className="w-48 uppercase bg-yellow-blue p-1.5 rounded-lg font-bold mt-5"
            onClick={() => alert("click learn more button")}
          >
            learn more
          </button>
        </div>
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
