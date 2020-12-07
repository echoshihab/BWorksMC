import React from "react";
import { Item, Button, Segment, List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IBloodWork } from "../../models/bloodWork";
import BloodWorksSearch from "./BloodWorksSearch";

const ActivityListItems: React.FC<{ bloodWork: IBloodWork }> = ({
  bloodWork,
}) => {
  return (
    <Segment.Group style={{ border: "1px solid black" }}>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header>
                <List horizontal relaxed="very">
                  <List.Item>
                    {" "}
                    Exam Date:{" "}
                    {new Date(bloodWork.examDate).toISOString().split("T")[0]}
                  </List.Item>
                  <List.Item>
                    Result Date:{" "}
                    {
                      new Date(bloodWork.resultsDate)
                        .toISOString()
                        .split("T")[0]
                    }
                  </List.Item>
                  <List.Item>
                    Record Added:{" "}
                    {
                      new Date(bloodWork.dateCreated)
                        .toISOString()
                        .split("T")[0]
                    }
                  </List.Item>
                </List>
              </Item.Header>

              <Item.Description>
                <List celled horizontal>
                  <List.Item> Hemoglobin: {bloodWork.hemoglobin}</List.Item>
                  <List.Item> Hemotacrit: {bloodWork.hematocrit}</List.Item>
                  <List.Item>
                    {" "}
                    White Blood Cells: {bloodWork.wbCellsCount}
                  </List.Item>
                  <List.Item>
                    {" "}
                    Red Blood Cells: {bloodWork.rbCellsCount}
                  </List.Item>
                </List>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment secondary></Segment>

      <Segment clearing>
        <span>{bloodWork.description}</span>

        <Button
          floated="right"
          content="View"
          color="green"
          as={Link}
          to={`/bloodwork/${bloodWork.id}`}
        />
      </Segment>
    </Segment.Group>
  );
};

export default ActivityListItems;
