import * as React from "react";
import logo from "./images/bush2.png";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };
  async function submitHandler() {
    const responce = await axios.post("http://localhost:3000/user/signin", {
      username: email,
      password,
    });
    if (responce.status === 200) {
      navigate("/edit");
    } else if (responce.status === 400) {
      alert("Sorry I did something wrong");
    } else if (responce.status === 401) {
      alert("Sorry your username or password is wrong");
    } else if (responce.status === 503) {
      console.log("I dont know chief somethings broken");
    }
  }
  return (
    <div>
      <h1>Link Bush</h1>
      <img src={logo} alt="logo" />
      <form>
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={800}
          maxHeight={800}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={0}
          padding={5}
          borderRadius={10}
          boxShadow={"10px 10px 20px #ccc"}
          sx={{
            ":hoover": {
              boxShadow: "15px 15px 25px #ccc",
            },
          }}
        >
          <Typography>Login</Typography>
          <TextField
            margin="normal"
            type={"email"}
            variant="outlined"
            placeholder="username"
            value={email}
            onChange={handleEmail}
          />
          <TextField
            margin="normal"
            type={"password"}
            variant="outlined"
            placeholder="password"
            value={password}
            onChange={handlePassword}
          />
          <Button
            sx={{ marginTop: 3, borderRadius: 3 }}
            variant="contained"
            color="primary"
            onClick={(e: any) => {
              e.preventDefault();
              submitHandler();
            }}
          >
            Login
          </Button>
          <Button
            sx={{ marginTop: 3, borderRadius: 3 }}
            variant="contained"
            color="warning"
            component={Link}
            to={"/create"}
          >
            Sign Up
          </Button>
        </Box>
      </form>
    </div>
  );
}
