import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import axios from "axios";

const StudentStatus = (props) => {
  const { email, studentStatus, setModalStatus, getStudentList } = props;
  const [status, setStatus] = useState(studentStatus);
  const changeStatus = async () => {
    try {
      const result = await axios.post(
        `http://localhost:5000/changeStatus?email=${email}`,
        { status: status },
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      if (!result.data?.error) setModalStatus(false);
      else {
        alert(result.data.error);
        setModalStatus(false);
      }
      getStudentList();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid container spacing={1}>
      <Typography variant="h6">Student Id : {email}</Typography>
      <Grid item xs={12}>
        <RadioGroup
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          row
        >
          <FormControlLabel
            key="active"
            value="active"
            control={<Radio size="small" />}
            label="Active"
          />
          <FormControlLabel
            key="disabled"
            value="disabled"
            control={<Radio size="small" />}
            label="Disabled"
          />
        </RadioGroup>
      </Grid>
      <Grid item>
        <Button
          color="primary"
          variant="outlined"
          autoFocus
          onClick={changeStatus}
        >
          Update
        </Button>
        <Button
          color="primary"
          variant="outlined"
          autoFocus
          style={{ marginLeft: "2vh" }}
          onClick={() => setModalStatus(false)}
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
};

export default StudentStatus;
