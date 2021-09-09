import { Route } from "react-router-dom";
import Registration from "pages/registration/Registration";
import ContactDetails from "pages/registration/ContactDetails";
import ConfirmEmail from "pages/registration/ConfirmEmail";

const Register = () => {
  return (
    <section className="container mx-auto my-auto flex-auto my-10 lg:w-1/4 w-1/2 h-fixed-content-height">
      <div className="relative sm:absolute min-w-dm inset-1/2 bottom-auto right-auto rounded-3xl transform -translate-x-1/2 -translate-y-1/2 w-96 sm:w-4/5 max-w-6xl p-10 text-center text-white">
        <Route path="/register/detail" component={ContactDetails} />
        <Route exact path="/register/verify" component={ConfirmEmail} />
        <Route exact path="/register" component={Registration} />
      </div>
    </section>
  );
};

export default Register;
