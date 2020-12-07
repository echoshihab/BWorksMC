import React, { Fragment, useContext, useEffect } from "react";
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import { RootStoreContext } from "../stores/rootStore";
import LoadingComponent from "./LoadingComponent";
import HomePage from "../features/home/HomePage";
import NotFound from "./NotFound";
import ModalContainer from "../common/modal/ModalContainer";
import PrivateRoute from "./PrivateRoute";
import BloodWorksDashboard from "../features/bloodworks/BloodWorksDashboard";
import NavBar from "../features/navigation/NavBar";
import BloodWorksForm from "../features/bloodworks/BloodWorksForm";
import BloodWorkDetails from "../features/bloodworks/BloodWorkDetails";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);

  if (!appLoaded) return <LoadingComponent content="Loading App..." />;
  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position="bottom-right" />

      <Container fluid>
        <Route exact path="/" component={HomePage} />
        <Route
          path={"/(.+)"}
          render={() => (
            <Fragment>
              <NavBar />
              <Switch>
                <PrivateRoute
                  path="/dashboard"
                  component={BloodWorksDashboard}
                />
                <PrivateRoute
                  path="/bloodWork/:id"
                  component={BloodWorkDetails}
                />

                <PrivateRoute
                  key={location.key} //component reinitializes when the key changes
                  path={["/addBloodWork", "/manage/:id"]}
                  component={BloodWorksForm}
                />

                <Route component={NotFound} />
              </Switch>
            </Fragment>
          )}
        />
      </Container>
    </Fragment>
  );
};

export default withRouter(observer(App));
