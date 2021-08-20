import { useParams } from "react-router-dom";
import Header from "components/Layout/Header";
import Footer from "components/Layout/Footer";

const Charity = () => {
  let { title }: { title: string } = useParams();
  return (
    <div className="bg-blue-400">
      <Header hasMenu={true} onConnect={() => {}} onDisconnect={() => {}} />
      <h2>Hello from {title}'s Charity Page!</h2>
      <Footer hasMenu={true} />
    </div>
  );
};

export default Charity;
