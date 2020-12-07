import React, { useEffect, useContext } from "react";
import { Container, Grid, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import BloodWorksList from "./BloodWorksList";
import BloodWorksSearch from "./BloodWorksSearch";

const BloodWorksDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadBloodWorks } = rootStore.bloodWorksStore;

  useEffect(() => {
    loadBloodWorks();
  }, [loadBloodWorks]);

  return (
    <Container style={{ marginTop: "4em" }}>
      <Grid>
        <Grid.Column width={10}>
          <BloodWorksList />
        </Grid.Column>
        <Grid.Column width={6}>
          <BloodWorksSearch />
        </Grid.Column>
        <Grid.Column width={10}></Grid.Column>
      </Grid>
    </Container>
  );
};

export default observer(BloodWorksDashboard);
