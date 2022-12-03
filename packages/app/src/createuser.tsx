import * as React from "react";
import logo from "./images/bush2.png";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography, Grid, ListItem, List } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ListSubheader from "@mui/material/ListSubheader";
import axios from "axios";

interface IUserData {
  username: string;
  password: string;
  avatar: string;
  color: string;
  categories: string[];
}

const CreteUser = () => {
  const colors_map = [
    "Red",
    "Cyan",
    "Blue",
    "Dark Blue",
    "Light Blue",
    "Purple",
    "Yellow",
    "Line",
  ];

  type ButtonGridProps = {
    colors: Array<string>;
    variants: Array<"text" | "outlined" | "contained" | undefined>;
    handleClick: (color: string, index: number) => void;
  };
  const ButtonGrid = ({ colors, variants, handleClick }: ButtonGridProps) => (
    <Grid container spacing={3}>
      {colors.map((color, index) => (
        <Grid item xs={3} key={index}>
          <Button
            sx={{}}
            variant={variants[index]}
            size="large"
            color="primary"
            style={{ backgroundColor: color }}
            onClick={() => handleClick(color, index)}
          >
            {colors_map[index]}
          </Button>
        </Grid>
      ))}
    </Grid>
  );

  const navigate = useNavigate();
  //all variables for login
  const [length, setLength] = React.useState<string>("#FF0000");
  const [special, setSpecial] = React.useState<string>("#FF0000");
  const [capital, setcapital] = React.useState<string>("#FF0000");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [image, setImage] = React.useState<string>("None");
  const [user, setUser] = React.useState<IUserData>({
    username: "",
    password: "",
    avatar: "",
    color: "",
    categories: [],
  });
  //all variables that controll the link highlight buttons and backgound
  const [b_color, setB_color] = React.useState<string>("None");
  const [p_color, setP_color] = React.useState<string>("None");
  const [s_color, setS_color] = React.useState<string>("None");
  const [buss_color, setBuss_color] = React.useState<string>("None");
  const [other_color, setOther_color] = React.useState<string>("None");
  const color_list = [
    "#FF0000",
    "#00FFFF",
    "#0000FF",
    "#00008B",
    "#ADD8E6",
    "#800080",
    "#FFFF00",
    "#00FF00",
  ];
  const [back, setBack] = React.useState<("contained" | "outlined")[]>([
    "contained",
    "contained",
    "contained",
    "contained",
    "contained",
    "contained",
    "contained",
    "contained",
  ]);

  const [personal, setpersonal] = React.useState<("contained" | "outlined")[]>([
    "contained",
    "contained",
    "contained",
    "contained",
    "contained",
    "contained",
    "contained",
    "contained",
  ]);

  const [social, setSocial] = React.useState<("contained" | "outlined")[]>([
    "contained",
    "contained",
    "contained",
    "contained",
    "contained",
    "contained",
    "contained",
    "contained",
  ]);
  const [buss, setBuss] = React.useState<("contained" | "outlined")[]>([
    "contained",
    "contained",
    "contained",
    "contained",
    "contained",
    "contained",
    "contained",
    "contained",
  ]);
  const [other, setOther] = React.useState<("contained" | "outlined")[]>([
    "contained",
    "contained",
    "contained",
    "contained",
    "contained",
    "contained",
    "contained",
    "contained",
  ]);
  //list of images for photo selector
  const itemData = [
    {
      img: "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80",
      title: "Cat1",
    },
    {
      img: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
      title: "cat2",
    },
    {
      img: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80",
      title: "cat3",
    },
    {
      img: "https://images.unsplash.com/photo-1491485880348-85d48a9e5312?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      title: "cat4",
    },
    {
      img: "https://images.unsplash.com/photo-1513245543132-31f507417b26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      title: "cat5",
    },
    {
      img: "https://images.unsplash.com/photo-1511275539165-cc46b1ee89bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      title: "cat6",
    },
  ];
  //changes all the colors of the link buttons
  function handleLinkHighlightButtons(
    s: string,
    y: number,
    color: string,
    set_color: any,
    new_setter: any
  ) {
    if (color !== "None" && color !== s) {
      set_color(s);
      let setter: ("outlined" | "contained")[] = [];
      for (let i = 0; i < 8; i++) {
        if (y === i) {
          setter.push("outlined");
        } else {
          setter.push("contained");
        }
      }
      new_setter(setter);
    } else {
      if (color === s) {
        set_color("None");
        new_setter([
          "contained",
          "contained",
          "contained",
          "contained",
          "contained",
          "contained",
          "contained",
          "contained",
        ]);
      } else {
        set_color(s);
        let setter: ("outlined" | "contained")[] = [];
        for (let i = 0; i < 8; i++) {
          if (y === i) {
            setter.push("outlined");
          } else {
            setter.push("contained");
          }
        }
        new_setter(setter);
      }
    }
  }
  //work on handling email password and password stregth
  function containsUppercase(str: string) {
    return /[A-Z]/.test(str);
  }

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };
  function handleImage(e: string) {
    console.log(e);
    setImage(e);
  }
  //password strength indicator
  const handlePassword = (e: any) => {
    setPassword(e.target.value);
    if (e.target.value.length >= 8) {
      setLength("#00FF00");
    }
    if (e.target.value.length < 8) {
      setLength("#FF0000");
    }
    if (
      e.target.value.includes("?") ||
      e.target.value.includes("!") ||
      e.target.value.includes("/") ||
      e.target.value.includes("&") ||
      e.target.value.includes("*")
    ) {
      setSpecial("#00FF00");
    }
    if (
      !e.target.value.includes("?") &&
      !e.target.value.includes("!") &&
      !e.target.value.includes("/") &&
      !e.target.value.includes("&") &&
      !e.target.value.includes("*")
    ) {
      setSpecial("#FF0000");
    }
    if (containsUppercase(e.target.value)) {
      setcapital("#00FF00");
    }
    if (containsUppercase(e.target.value) == false) {
      setcapital("#FF0000");
    }
  };
  //submits it to the backend if everything is good
  async function submitHandler() {
    {
      if (capital == "#00FF00" && length == "#00FF00" && special == "#00FF00") {
        if (
          b_color == "None" ||
          p_color == "None" ||
          s_color == "None" ||
          buss_color == "None" ||
          other_color == "None" ||
          image == "None" ||
          email == "" ||
          password == ""
        ) {
          alert("Your missing some info");
        } else {
          setUser({
            username: email,
            password: password,
            avatar: image,
            color: b_color,
            categories: [s_color, buss_color, p_color, other_color],
          });

          console.log({
            username: email,
            password: password,
            avatar: image,
            color: b_color,
            categories: [s_color, buss_color, p_color, other_color],
          });
          console.log(user);
          const responce = await axios.post(
            "https://linkbush-api.azurewebsites.net/user/signup",
            {
              username: email,
              password: password,
              avatar: image,
              color: b_color,
              categories: [s_color, buss_color, p_color, other_color],
            },
            { validateStatus: (status) => status < 504 }
          );
          if (responce.status === 200) {
            alert("Wooooo account created");
            navigate("/edit");
          } else if (responce.status === 400) {
            alert("Sorry your username or password doesnt look long enough");
          } else if (responce.status === 409) {
            alert("Sory username is taken please select a new one");
          } else if (responce.status === 503) {
            console.log("I dont know chief somethings broken");
          }
          console.log(responce);
        }
      } else {
        alert("plz check that you have completed all password requirements");
      }
    }
  }
  //is the meet of what shows up on the webpage
  return (
    <div>
      <h1>Link Bush</h1>
      <img src={logo} alt="logo" />
      <form>
        <Box
          display="flex"
          flexDirection={"column"}
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
          <Typography>Enter an Username</Typography>
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
          <List sx={{ listStyleType: "disc" }}>
            <ListSubheader
              sx={{
                fontWeight: 700,
                lineHeight: "24px",
                fontSize: "16px",
                color: "black",
              }}
            >
              Password Requirements
            </ListSubheader>
            <ListItem sx={{ display: "list-item", color: length }}>
              More than 8 characters
            </ListItem>
            <ListItem sx={{ display: "list-item", color: special }}>
              Must contain a ?,!,/,&,*
            </ListItem>
            <ListItem sx={{ display: "list-item", color: capital }}>
              Contain a capital letter
            </ListItem>
          </List>
          <div>
            <h1>Choose a Background Link Color</h1>
            <ButtonGrid
              colors={color_list}
              variants={back}
              handleClick={(color, index) =>
                handleLinkHighlightButtons(
                  color,
                  index,
                  b_color,
                  setB_color,
                  setBack
                )
              }
            />
          </div>
          <div>
            <h1>Choose a Personal Link Color</h1>
            <ButtonGrid
              colors={color_list}
              variants={personal}
              handleClick={(color, index) =>
                handleLinkHighlightButtons(
                  color,
                  index,
                  p_color,
                  setP_color,
                  setpersonal
                )
              }
            />
          </div>
          <div>
            <h1>Choose a Social Media Link Color</h1>
            <ButtonGrid
              colors={color_list}
              variants={social}
              handleClick={(color, index) =>
                handleLinkHighlightButtons(
                  color,
                  index,
                  s_color,
                  setS_color,
                  setSocial
                )
              }
            />
          </div>
          <div>
            <h1>Choose a Bussiness Link Color</h1>
            <ButtonGrid
              colors={color_list}
              variants={buss}
              handleClick={(color, index) =>
                handleLinkHighlightButtons(
                  color,
                  index,
                  buss_color,
                  setBuss_color,
                  setBuss
                )
              }
            />
          </div>
          <div>
            <h1>Choose a Other Link Color</h1>
            <ButtonGrid
              colors={color_list}
              variants={other}
              handleClick={(color, index) =>
                handleLinkHighlightButtons(
                  color,
                  index,
                  other_color,
                  setOther_color,
                  setOther
                )
              }
            />
          </div>

          <div>
            <h1>Choose a Profile Photo </h1>
            <ImageList sx={{ width: 500, height: 450 }}>
              <ImageListItem key="Subheader" cols={2}>
                <ListSubheader component="div">Images</ListSubheader>
              </ImageListItem>
              {itemData.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    src={`${item.img}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.img}
                    loading="lazy"
                  />
                  <Button onClick={() => handleImage(item.img)}>Select </Button>
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </Box>
        <Button
          sx={{ marginTop: 3, borderRadius: 3 }}
          variant="contained"
          color="primary"
          onClick={(e: any) => {
            e.preventDefault();
            submitHandler();
          }}
        >
          SignUp
        </Button>
      </form>
    </div>
  );
};

export default CreteUser;
