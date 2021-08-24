import CharityCategory from "components/CharityCategory";
import fixtureData from "components/CharityCategory/CharityCategory.fixture.json";
const charityCategories = Array(6)
  .fill(fixtureData)
  .map((data, i) => ({ ...data, id: i }));

const Dashboard = () => {
  return (
    <div className="container mx-auto grid grid-rows-dashboard px-5">
      <section className="flex-auto">
        {charityCategories.map((category) => {
          return <CharityCategory {...category} key={category.id} />;
        })}
      </section>
    </div>
  );
};

export default Dashboard;
