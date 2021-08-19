import Header from "components/Layout/Header";
import Footer from "components/Layout/Footer";
import CharityCategory from "components/CharityCategory";
import fixtureData from "components/CharityCategory/CharityCategory.fixture.json";
const charityCategories = Array(6)
  .fill(fixtureData)
  .map((data, i) => ({ ...data, id: i }));

const Dashboard = () => {
  return (
    <div className="grid grid-rows-dashboard bg-gradient-to-b from-thin-blue to-black-blue px-5">
      <Header hasMenu={true} onConnect={() => {}} onDisconnect={() => {}} />

      <section className="flex-auto">
        {charityCategories.map((category) => {
          return <CharityCategory {...category} key={category.id} />;
        })}
      </section>
      <Footer hasMenu={true} />
    </div>
  );
};

export default Dashboard;
