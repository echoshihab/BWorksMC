import React, { useContext } from "react";
import { Container, Item } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import BloodWorkListItem from "./BloodWorksListItem";
import { IBloodWork } from "../../models/bloodWork";

const BloodWorksList = () => {
  const rootStore = useContext(RootStoreContext);
  const { bloodWorks } = rootStore.bloodWorksStore;

  return (
    <Container>
      <Item.Group divided>
        {bloodWorks.map((bloodWork: IBloodWork) => (
          <BloodWorkListItem key={bloodWork.id} bloodWork={bloodWork} />
        ))}
      </Item.Group>
    </Container>
  );
};

export default observer(BloodWorksList);
