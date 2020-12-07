import React, { Fragment, useContext, useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import { RootStoreContext } from "../stores/rootStore";
import LoadingComponent from "./LoadingComponent";
import NavBar from "./NavBar";
import HomePage from "../features/home/HomePage";
import NotFound from "./NotFound";
import BloodWorksList from "../features/bloodworks/BloodWorksList";
import BloodWorksReport from "../features/bloodworks/BloodWorksReport";
import ModalContainer from "../common/modal/ModalContainer";
import PrivateRoute from "./PrivateRoute";


const App = () => {
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
                  path="/bloodworks"
                  component= {BloodWorksList}
                />
                <PrivateRoute
                  path="/report"
                  component={BloodWorksReport}
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

