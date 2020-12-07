import React, { useState, useContext, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { Segment, Form, Button, Grid, Label } from "semantic-ui-react";
import { BloodWorkFormValues } from "../../../app/models/bloodWork";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import DateInput from "../../../app/common/form/DateInput";

import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan,
  isNumeric,
  createValidator,
} from "revalidate";
import { RootStoreContext } from "../../../app/stores/rootStore";

const isFloatingNumber = createValidator(
  (message) => (value) => {
    if (value && !/^[+-]?\d+(\.\d+)?$/.test(value)) {
      return message;
    }
  },
  (field) => `${field} must be a number`
);

const validate = combineValidators({
  examDate: isRequired({ message: "Exam Date is required" }),
  resultsDate: isRequired({ message: "Results Date is required" }),
  hemoglobin: composeValidators(
    isRequired("hemoglobin"),
    isFloatingNumber("hemoglobin")
  )(),
  hematocrit: composeValidators(
    isRequired("hematocrit"),
    isFloatingNumber("hematocrit")
  )(),
  wbCellsCount: composeValidators(
    isRequired({
      message: "White Blood Cell Count is required",
    }),
    isFloatingNumber("wbCellsCount")
  )(),
  rbCellsCount: composeValidators(
    isRequired({ message: "Red Blood Cell Count is required" }),
    isFloatingNumber("rbCellsCount")
  )(),
  description: composeValidators(
    isRequired("Description"),
    hasLengthGreaterThan(4)({
      message: "Description needs to be atleast 5 characters",
    })
  )(),
});

interface DetailsParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailsParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    submitting,
    createBloodWork,
    loadBloodWork,
    editBloodWork,
  } = rootStore.bloodWorksStore;

  const [bloodWork, setBloodWork] = useState(new BloodWorkFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadBloodWork(match.params.id)
        .then((bloodWork) => setBloodWork(new BloodWorkFormValues(bloodWork)))
        .finally(() => setLoading(false));
    }
  }, [loadBloodWork, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const { ...bloodWork } = values;

    if (!bloodWork.id) {
      let newBloodWork = {
        ...bloodWork,
        dateCreated: new Date(),
        id: uuid(),
      };

      createBloodWork(newBloodWork);
    } else {
      editBloodWork(bloodWork);
    }
  };

  return (
    <Segment
      style={{ margin: "10vh", width: "60vw", border: "1px solid black" }}
    >
      <Grid>
        <Grid.Column width={10}>
          <Segment clearing>
            <FinalForm
              validate={validate}
              initialValues={bloodWork}
              onSubmit={handleFinalFormSubmit}
              render={({ handleSubmit, invalid, pristine }) => (
                <Form onSubmit={handleSubmit} loading={loading}>
                  <Label>Description</Label>
                  <Field
                    placeholder="Description"
                    name="description"
                    value={bloodWork.description}
                    component={TextInput}
                  />
                  <Label>Exam Date</Label>
                  <Field
                    component={DateInput}
                    placeholder="Exam Date"
                    date={true}
                    name="examDate"
                    value={bloodWork.examDate}
                  />
                  <Label>Results Date</Label>
                  <Field
                    component={DateInput}
                    placeholder="Results Date"
                    date={true}
                    name="resultsDate"
                    value={bloodWork.resultsDate}
                  />

                  <Label>Hemoglobin</Label>
                  <Field
                    component={TextInput}
                    placeholder="hemoglobin"
                    name="hemoglobin"
                    value={bloodWork.hemoglobin}
                  />
                  <Label>Hematocrit</Label>
                  <Field
                    component={TextInput}
                    placeholder="hematocrit"
                    name="hematocrit"
                    value={bloodWork.hematocrit}
                  />

                  <Label>White Blood Cells Count</Label>
                  <Field
                    component={TextInput}
                    placeholder="Red Blood Cell Count"
                    name="rbCellsCount"
                    value={bloodWork.rbCellsCount}
                  />
                  <Label>Red Blood Cells Count</Label>
                  <Field
                    component={TextInput}
                    placeholder="White Blood Cell Count"
                    name="wbCellsCount"
                    value={bloodWork.wbCellsCount}
                  />

                  <Button
                    loading={submitting}
                    floated="right"
                    positive
                    type="submit"
                    content="Submit"
                    disabled={loading || invalid || pristine}
                  />
                  <Button
                    onClick={
                      bloodWork.id
                        ? () => history.push(`/bloodWork/${bloodWork.id}`)
                        : () => history.push("/dashboard")
                    }
                    floated="right"
                    type="button"
                    content="Cancel"
                    disabled={loading}
                  />
                </Form>
              )}
            />
          </Segment>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(ActivityForm);
