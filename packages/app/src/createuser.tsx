import * as React from "react";
import logo from "./images/bush2.png";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";


const CreteUser = () => {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };
  React.useEffect(() => console.log(email), []);
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
          <h2>Sign Up</h2>
          <Typography>Enter an Email Address</Typography>
          <TextField
            margin="normal"
            type={"email"}
            variant="outlined"
            placeholder="Email"
            value={email}
            onChange={handleEmail}
          />
          <Typography>Enter an Password</Typography>
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
            component={Link}
            to={"/backgroundselector"}
          >
            Next
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default CreteUser;
