import { Route, Switch } from "react-router";
import Registration from "pages/registration/Registration";

const Register = () => {
  return (
    <section className="container mx-auto my-auto flex-auto my-10 lg:w-1/4 w-1/2 h-fixed-content-height">
      <div className="absolute min-w-dm inset-1/2 bottom-auto right-auto rounded-3xl transform -translate-x-1/2 -translate-y-1/2 w-96 sm:w-4/5 max-w-6xl p-10 text-center text-white">
        <Switch>
          <Route path="/" component={Registration} />
        </Switch>
      </div>
    </section>
  );
};

export default Register;
