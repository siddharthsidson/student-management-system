import React from "react";
import { Paper, Grid, Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router";
const paperStyle = {
  padding: 20,
  height: "50vh",
  width: 280,
  margin: "20px auto",
};
const hStyle = { color: "#3b00ba" };

const Student = (props) => {
  const { studentData } = props;
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("token");
    history.replace("/login");
  };

  return (
    <div>
      <Grid container spacing={1} justifyContent="flex-end" style={hStyle}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Dashboard
          </Typography>
        </Grid>

        <Grid item xs={2}>
          <Button
            color="primary"
            variant="contained"
            style={{ marginBottom: "5vh" }}
            onClick={logout}
          >
            logout
          </Button>
        </Grid>
      </Grid>
      <div>
        <Paper elevation={8} style={paperStyle}>
          <Typography variant="h4" align="center" spacing={3}>
            My Profile
          </Typography>
          <br />
          <Typography variant="h5" spacing={5}>
            Name: {studentData?.firstName} {studentData?.lastName}
            <br />
            Email: {studentData?.email}
            <br />
            Phone: {studentData?.phone}
            <br />
            Gender: {studentData?.gender}
            <br />
            Batch: {studentData?.batch}
            <br />
            Department: {studentData?.department}
            <br />
            Register No: {studentData?.registerNumber}
          </Typography>
        </Paper>
      </div>
    </div>
  );
};
export default Student;
