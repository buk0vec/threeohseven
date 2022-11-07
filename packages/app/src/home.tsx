import React from 'react';
import './home.css';
import { Button, Typography, Grid, Box, TextField } from '@mui/material';
import { Link } from 'react-router-dom';



const Home = () => {
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
            ":hoover":{
                boxShadow: "15px 15px 25px #ccc",
            },
        }}
        >
            <h1>Welcome To LinkBush</h1>  
            <h3>Grow your bush, grow your influence</h3> 

            <img src="/src/images/bush2.png"></img>    
          <Button
            sx={{marginTop:3, borderRadius:3 }}
            variant="contained"
            color='warning'
            component={Link} to={'/create'}
            >
            Sign Up
          </Button>    
            <h3>Already have an account?</h3>
          <Button
            sx={{borderRadius:3, marginBottom: 3}}
            variant="contained"
            color='primary'
            component={Link} to={'/login'}
            >
          Log In
          </Button>  

          <a href='/about' >About Us</a>
        </Box>
        
        </div>

      
    );
  };
    
  export default Home;