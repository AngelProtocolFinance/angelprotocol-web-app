import Header from 'components/Layout/Header';
import Footer from 'components/Layout/Footer';
import CharityCategory from 'components/CharityCategory';

const fixtureData = require('components/CharityCategory/CharityCategory.fixture.json');

const Dashboard = () => {
	const charityCategories = Array(6).fill(fixtureData);
	return (
		<>
			<Header onConnect={() => {}} onDisconnect={() => {}} />
			<section className="container mx-auto flex-auto px-4">
				{charityCategories.map((category) => {
					return <CharityCategory {...category} key={category.title} />;
				})}
			</section>
			<Footer />
		</>
	);
};

export default Dashboard;
