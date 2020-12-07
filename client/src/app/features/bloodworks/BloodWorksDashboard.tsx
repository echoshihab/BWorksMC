import React from "react";
import { Grid } from "semantic-ui-react";

import { observer } from "mobx-react-lite";


interface IProps {
  view: string;
}

const ShiftDashboard: React.FC<IProps> = ({ view }) => {

  

  return (
    <Grid>
      <Grid.Column width={11} floated="right">
    
      
      </Grid.Column>
    </Grid>
  );
};

export default observer(ShiftDashboard);
