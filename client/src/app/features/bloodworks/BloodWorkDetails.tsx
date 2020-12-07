import React, { useContext, useEffect } from "react";
import { Grid, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { RootStoreContext } from "../../stores/rootStore";
import LoadingComponent from "../../layout/LoadingComponent";
import BloodWorkDetailsInfo from "./BloodWorkDetailsInfo";

interface DetailParams {
  id: string;
}

const BloodworkDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    bloodWork,
    loadBloodWork,
    loadingInitial,
  } = rootStore.bloodWorksStore;

  useEffect(() => {
    loadBloodWork(match.params.id);
  }, [loadBloodWork, match.params.id]);

  if (loadingInitial) return <LoadingComponent content="Loading Activity..." />;

  if (!bloodWork) return <h2>Bloodwork not Found!</h2>;

  return (
    <Segment style={{ marginTop: "10vh" }}>
      <Grid>
        <Grid.Column width={10}>
          <BloodWorkDetailsInfo bloodWork={bloodWork} />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(BloodworkDetails);
