import React from "react";
import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
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
          ":hover": {
            boxShadow: "15px 15px 25px #ccc",
          },
        }}
      >
        <h1>About Us</h1>

        <img src="/src/images/bush2.png"></img>

        <h3>
          We&apos;re the little guys going up against the big guys at LinkTree.
          <br></br>Support small businesses
        </h3>
        <Button
          sx={{ marginTop: 3, borderRadius: 3 }}
          variant="contained"
          color="primary"
          component={Link}
          to={"/"}
        >
          Back To Home
        </Button>
      </Box>
    </div>
  );
};

export default About;
