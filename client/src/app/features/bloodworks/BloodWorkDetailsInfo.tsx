import React, { useContext } from "react";
import {
  Segment,
  Item,
  Header,
  Button,
  Image,
  List,
  Card,
} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { RootStoreContext } from "../../stores/rootStore";
import { IBloodWork } from "../../models/bloodWork";

const activityImageStyle = {
  filter: "brightness(30%)",
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

const BloodWorkDetailsInfo: React.FC<{ bloodWork: IBloodWork }> = ({
  bloodWork,
}) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          Exam Date: {bloodWork.examDate.toString().split("T")[0]}
        </Card.Header>
        <Card.Meta>
          Result Date: {bloodWork.resultsDate.toString().split("T")[0]}
        </Card.Meta>
        <Card.Description>
          Description: {bloodWork.description}
        </Card.Description>
        <Card.Description>Hematocrit: {bloodWork.hematocrit}</Card.Description>
        <Card.Description>Hemoglobin: {bloodWork.hemoglobin}</Card.Description>
        <Card.Description>
          White Blood Cells Count: {bloodWork.wbCellsCount}
        </Card.Description>
        <Card.Description>
          Red Blood Cells Count: {bloodWork.rbCellsCount}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          as={Link}
          to={`/manage/${bloodWork.id}`}
          color="orange"
          floated="right"
        >
          Edit BloodWork
        </Button>
      </Card.Content>
    </Card>
  );
};

export default observer(BloodWorkDetailsInfo);
