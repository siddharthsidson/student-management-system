import React, { useEffect, useState } from "react";
import { Grid, TextField, Typography, Radio, Button } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import axios from "axios";

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

const EditStudent = (props) => {
  const { readOnly, getStudentList } = props;
  const [formValues, setFormValues] = useState(defaultValues);
  const [status, setStatus] = useState();

  useEffect(() => {
    async function getStudent() {
      try {
        let res = await axios.get(
          `http://localhost:5000/getStudentData?email=${props?.email}`,
          {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          }
        );
        setFormValues(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getStudent();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    setStatus(null);
    e.preventDefault();
    const result = await axios.post(
      `http://localhost:5000/editStudent?email=${props?.email}`,
      formValues,
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );
    getStudentList();
    setStatus(result.data?.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid>
        <Grid>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <label>
                <Typography>First Name</Typography>
              </label>
              <TextField
                placeholder="Enter First Name"
                id="firstName"
                disabled={readOnly}
                variant="outlined"
                name="firstName"
                value={formValues?.firstName}
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
                disabled={readOnly}
                value={formValues?.lastName}
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
                disabled={readOnly}
                value={formValues?.email}
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
                disabled={readOnly}
                value={formValues?.phone}
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
                disabled={readOnly}
                value={formValues?.password}
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
                value={formValues?.gender}
                onChange={handleInputChange}
                row
              >
                <FormControlLabel
                  key="male"
                  value="male"
                  control={<Radio size="small" disabled={readOnly} />}
                  label="Male"
                />
                <FormControlLabel
                  key="female"
                  value="female"
                  control={<Radio size="small" disabled={readOnly} />}
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
                disabled={readOnly}
                value={formValues?.batch}
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
                disabled={readOnly}
                value={formValues?.department}
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
                disabled={readOnly}
                value={formValues?.registerNumber}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <br />
          {!readOnly && (
            <Button
              type="submit"
              color="primary"
              variant="contained"
            >
              Update
            </Button>
          )}
        </Grid>
        {status?.length && (
          <Typography style={{ color: "red" }}>{status}</Typography>
        )}
      </Grid>
    </form>
  );
};

export default EditStudent;
