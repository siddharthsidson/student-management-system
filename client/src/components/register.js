import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Paper,
  Grid,
  TextField,
  Typography,
  Radio,
  Button,
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import { RegisterUserApi } from "../utils/api";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  gender: "",
  batch: "",
  department: "",
  registerNumber: "",
};

const Register = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const history = useHistory();

  const [status, setStatus] = useState();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);
    const result = await RegisterUserApi(formValues);
    if (!result.data?.error) {
      setStatus("Registered successfully!");
      setTimeout(() => {
        history.push("/login");
      }, 5000);
    } else {
      setStatus(result.data?.error);
    }
  };
  const paperStyle = {
    padding: 20,
    height: "80vh",
    width: 750,
    margin: "20px auto",
  };
  const btnstyle = { margin: "8px 0" };

  return (
    <form onSubmit={handleSubmit}>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid>
            <h2>Student Registration</h2>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <label>
                  <Typography>First Name</Typography>
                </label>
                <TextField
                  placeholder="Enter First Name"
                  id="firstName"
                  variant="outlined"
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <label>
                  <Typography>Last Name</Typography>
                </label>
                <TextField
                  placeholder="Enter Last Name"
                  variant="outlined"
                  id="lastName"
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={6}>
                <label>
                  <Typography>Email</Typography>
                </label>
                <TextField
                  placeholder="Enter Email Address"
                  variant="outlined"
                  id="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <label>
                  <Typography>Phone</Typography>
                </label>
                <TextField
                  placeholder="Enter Phone Number"
                  id="phone"
                  name="phone"
                  value={formValues.phone}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={6}>
                <label>
                  <Typography>Password</Typography>
                </label>
                <TextField
                  placeholder="Enter Password"
                  type="password"
                  variant="outlined"
                  id="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <label>
                  <Typography>Gender</Typography>
                </label>
                <RadioGroup
                  name="gender"
                  value={formValues.gender}
                  onChange={handleInputChange}
                  row
                >
                  <FormControlLabel
                    key="male"
                    value="male"
                    control={<Radio size="small" />}
                    label="Male"
                  />
                  <FormControlLabel
                    key="female"
                    value="female"
                    control={<Radio size="small" />}
                    label="Female"
                  />
                </RadioGroup>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={3}>
                <label>
                  <Typography>Batch</Typography>
                </label>
                <TextField
                  placeholder="Enter Batch"
                  variant="outlined"
                  id="batch"
                  name="batch"
                  value={formValues.batch}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={5}>
                <label>
                  <Typography>Department</Typography>
                </label>
                <TextField
                  placeholder="Enter Department"
                  variant="outlined"
                  id="department"
                  name="department"
                  value={formValues.department}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <label>
                  <Typography>Register Number</Typography>
                </label>
                <TextField
                  placeholder="Enter Register Number"
                  variant="outlined"
                  id="registerNumber"
                  name="registerNumber"
                  value={formValues.registerNumber}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
            <br />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
            >
              Sign Up
            </Button>
          </Grid>
          {status?.length && (
            <Typography style={{ color: "red" }}>{status}</Typography>
          )}
        </Paper>
      </Grid>
    </form>
  );
};

export default Register;
