import React from "react";
import axios from "axios";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const history = useHistory();
  const paperStyle = {
    padding: 20,
    height: "55vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const [message, setMessage] = useState();

  const handleLogin = async () => {
    setMessage(null);
    try {
      const result = await axios.post("http://localhost:5000/login", {
        email: username,
        password: password,
      });
      if (result.data?.user) {
        localStorage.setItem("token", result.data.user);
        history.push("./dashboard");
      } else {
        setMessage(result.data?.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <TextField
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          label="Username"
          placeholder="Enter Username"
          fullWidth
          required
        />
        <TextField
          value={password}
          onChange={(e) => setPassWord(e.target.value)}
          label="Password"
          placeholder="Enter Password"
          type="password"
          fullWidth
          required
        />
        <br />
        <br />
        <Button
          type="submit"
          onClick={handleLogin}
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
        >
          Sign in
        </Button>
        <br />
        {message?.length && (
          <Typography style={{ color: "red" }}>{message}</Typography>
        )}
        <Typography>
          Do you have an account? &nbsp;
          <Button onClick={() => history.push("./register")}>Sign Up</Button>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
