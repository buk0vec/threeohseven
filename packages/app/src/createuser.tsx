import * as React from "react";
import logo from "./images/bush2.png";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography, Grid } from "@mui/material";
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
  const navigate = useNavigate();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [b_color, setB_color] = React.useState<string>("None");
  const [p_color, setP_color] = React.useState<string>("None");
  const [s_color, setS_color] = React.useState<string>("None");
  const [buss_color, setBuss_color] = React.useState<string>("None");
  const [other_color, setOther_color] = React.useState<string>("None");
  const [image, setImage] = React.useState<string>("None");
  const [user, setUser] = React.useState<IUserData>({
    username: "",
    password: "",
    avatar: "",
    color: "",
    categories: [],
  });
  const [currentButtonVariant, setCurrentButtonVariant] = React.useState<
    ("contained" | "outlined")[]
  >([
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
  const [bussiness, setBussiness] = React.useState<
    ("contained" | "outlined")[]
  >([
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

  function handleButtonVariantChange(s: string, y: number) {
    if (b_color !== "None" && b_color !== s) {
      setB_color(s);
      let setter: ("outlined" | "contained")[] = [];
      for (let i = 0; i < 8; i++) {
        if (y === i) {
          setter.push("outlined");
        } else {
          setter.push("contained");
        }
      }
      setCurrentButtonVariant(setter);
    } else {
      if (b_color === s) {
        setB_color("None");
        setCurrentButtonVariant([
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
        setB_color(s);
        let setter: ("outlined" | "contained")[] = [];
        for (let i = 0; i < 8; i++) {
          if (y === i) {
            setter.push("outlined");
          } else {
            setter.push("contained");
          }
        }
        setCurrentButtonVariant(setter);
      }
    }
  }
  const itemData = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
    },
    {
      img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      title: "Burger",
    },
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      title: "Camera",
    },
    {
      img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
      title: "Coffee",
    },
    {
      img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      title: "Hats",
    },
    {
      img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
      title: "Honey",
    },
    {
      img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
      title: "Basketball",
    },
    {
      img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
      title: "Fern",
    },
    {
      img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
      title: "Mushrooms",
    },
    {
      img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
      title: "Tomato basil",
    },
    {
      img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
      title: "Sea star",
    },
    {
      img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
      title: "Bike",
    },
  ];

  function handleButtonVariantpersonal(s: string, y: number) {
    if (p_color !== "None" && p_color !== s) {
      setP_color(s);
      let setter: ("outlined" | "contained")[] = [];
      for (let i = 0; i < 8; i++) {
        if (y === i) {
          setter.push("outlined");
        } else {
          setter.push("contained");
        }
      }
      setpersonal(setter);
    } else {
      if (p_color === s) {
        setP_color("None");
        setpersonal([
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
        setP_color(s);
        let setter: ("outlined" | "contained")[] = [];
        for (let i = 0; i < 8; i++) {
          if (y === i) {
            setter.push("outlined");
          } else {
            setter.push("contained");
          }
        }
        setpersonal(setter);
      }
    }
  }

  function handleButtonVariantsocial(s: string, y: number) {
    if (s_color !== "None" && s_color !== s) {
      setS_color(s);
      let setter: ("outlined" | "contained")[] = [];
      for (let i = 0; i < 8; i++) {
        if (y === i) {
          setter.push("outlined");
        } else {
          setter.push("contained");
        }
      }
      setSocial(setter);
    } else {
      if (s_color === s) {
        setS_color("None");
        setSocial([
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
        setS_color(s);
        let setter: ("outlined" | "contained")[] = [];
        for (let i = 0; i < 8; i++) {
          if (y === i) {
            setter.push("outlined");
          } else {
            setter.push("contained");
          }
        }
        setSocial(setter);
      }
    }
  }
  function handleButtonVariantbussiness(s: string, y: number) {
    if (buss_color !== "None" && buss_color !== s) {
      setBuss_color(s);
      let setter: ("outlined" | "contained")[] = [];
      for (let i = 0; i < 8; i++) {
        if (y === i) {
          setter.push("outlined");
        } else {
          setter.push("contained");
        }
      }
      setBussiness(setter);
    } else {
      if (buss_color === s) {
        setBuss_color("None");
        setBussiness([
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
        setBuss_color(s);
        let setter: ("outlined" | "contained")[] = [];
        for (let i = 0; i < 8; i++) {
          if (y === i) {
            setter.push("outlined");
          } else {
            setter.push("contained");
          }
        }
        setBussiness(setter);
      }
    }
  }

  function handleButtonVariantother(s: string, y: number) {
    if (other_color !== "None" && other_color !== s) {
      setOther_color(s);
      let setter: ("outlined" | "contained")[] = [];
      for (let i = 0; i < 8; i++) {
        if (y === i) {
          setter.push("outlined");
        } else {
          setter.push("contained");
        }
      }
      setOther(setter);
    } else {
      if (other_color === s) {
        setOther_color("None");
        setOther([
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
        setOther_color(s);
        let setter: ("outlined" | "contained")[] = [];
        for (let i = 0; i < 8; i++) {
          if (y === i) {
            setter.push("outlined");
          } else {
            setter.push("contained");
          }
        }
        setOther(setter);
      }
    }
  }
  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };
  function handleImage(e: string) {
    console.log(e);
    setImage(e);
  }
  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };
  async function submitHandler() {
    {
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
          "http://localhost:3000/user/signup",
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
          navigate("/login");
        } else if (responce.status === 400) {
          alert("Sorry your username or password doesnt look long enough");
        } else if (responce.status === 409) {
          alert("Sory username is taken please select a new one");
        } else if (responce.status === 503) {
          console.log("I dont know chief somethings broken");
        }
        console.log(responce);
      }
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
          <div>
            <h1>Choose a background color</h1>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={currentButtonVariant[0]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#FF0000" }}
                  onClick={() => handleButtonVariantChange("#FF0000", 0)}
                >
                  Red
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={currentButtonVariant[1]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#00FFFF	" }}
                  onClick={() => handleButtonVariantChange("#00FFFF", 1)}
                >
                  Cyan
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={currentButtonVariant[2]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#0000FF" }}
                  onClick={() => handleButtonVariantChange("#0000FF", 2)}
                >
                  Blue
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={currentButtonVariant[3]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#00008B" }}
                  onClick={() => handleButtonVariantChange("#00008B", 3)}
                >
                  Dark-Blue
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={currentButtonVariant[4]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#ADD8E6" }}
                  onClick={() => handleButtonVariantChange("#ADD8E6", 4)}
                >
                  LightBlue
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={currentButtonVariant[5]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#800080	" }}
                  onClick={() => handleButtonVariantChange("#800080", 5)}
                >
                  Purple
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={currentButtonVariant[6]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#FFFF00" }}
                  onClick={() => handleButtonVariantChange("#FFFF00", 6)}
                >
                  Yellow
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={currentButtonVariant[7]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#00FF00" }}
                  onClick={() => handleButtonVariantChange("#00FF00", 7)}
                >
                  Lime
                </Button>
              </Grid>
            </Grid>
          </div>
          <div>
            <h1>Choose a Personal Link Color</h1>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={personal[0]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#FF0000" }}
                  onClick={() => handleButtonVariantpersonal("#FF0000", 0)}
                >
                  Red
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={personal[1]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#00FFFF	" }}
                  onClick={() => handleButtonVariantpersonal("#00FFFF", 1)}
                >
                  Cyan
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={personal[2]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#0000FF" }}
                  onClick={() => handleButtonVariantpersonal("#0000FF", 2)}
                >
                  Blue
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={personal[3]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#00008B" }}
                  onClick={() => handleButtonVariantpersonal("#00008B", 3)}
                >
                  Dark-Blue
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={personal[4]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#ADD8E6" }}
                  onClick={() => handleButtonVariantpersonal("#ADD8E6", 4)}
                >
                  LightBlue
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={personal[5]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#800080	" }}
                  onClick={() => handleButtonVariantpersonal("#800080", 5)}
                >
                  Purple
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={personal[6]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#FFFF00" }}
                  onClick={() => handleButtonVariantpersonal("#FFFF00", 6)}
                >
                  Yellow
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={personal[7]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#00FF00" }}
                  onClick={() => handleButtonVariantpersonal("#00FF00", 7)}
                >
                  Lime
                </Button>
              </Grid>
            </Grid>
          </div>
          <div>
            <h1>Choose a Social Link Color</h1>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={social[0]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#FF0000" }}
                  onClick={() => handleButtonVariantsocial("#FF0000", 0)}
                >
                  Red
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={social[1]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#00FFFF	" }}
                  onClick={() => handleButtonVariantsocial("#00FFFF", 1)}
                >
                  Cyan
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={social[2]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#0000FF" }}
                  onClick={() => handleButtonVariantsocial("#0000FF", 2)}
                >
                  Blue
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={social[3]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#00008B" }}
                  onClick={() => handleButtonVariantsocial("#00008B", 3)}
                >
                  Dark-Blue
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={social[4]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#ADD8E6" }}
                  onClick={() => handleButtonVariantsocial("#ADD8E6", 4)}
                >
                  LightBlue
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={social[5]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#800080	" }}
                  onClick={() => handleButtonVariantsocial("#800080", 5)}
                >
                  Purple
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={social[6]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#FFFF00" }}
                  onClick={() => handleButtonVariantsocial("#FFFF00", 6)}
                >
                  Yellow
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={social[7]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#00FF00" }}
                  onClick={() => handleButtonVariantsocial("#00FF00", 7)}
                >
                  Lime
                </Button>
              </Grid>
            </Grid>
          </div>
          <div>
            <h1>Choose a Bussiness Link Color</h1>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={bussiness[0]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#FF0000" }}
                  onClick={() => handleButtonVariantbussiness("#FF0000", 0)}
                >
                  Red
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={bussiness[1]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#00FFFF	" }}
                  onClick={() => handleButtonVariantbussiness("#00FFFF", 1)}
                >
                  Cyan
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={bussiness[2]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#0000FF" }}
                  onClick={() => handleButtonVariantbussiness("#0000FF", 2)}
                >
                  Blue
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={bussiness[3]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#00008B" }}
                  onClick={() => handleButtonVariantbussiness("#00008B", 3)}
                >
                  Dark-Blue
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={bussiness[4]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#ADD8E6" }}
                  onClick={() => handleButtonVariantbussiness("#ADD8E6", 4)}
                >
                  LightBlue
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={bussiness[5]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#800080	" }}
                  onClick={() => handleButtonVariantbussiness("#800080", 5)}
                >
                  Purple
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={bussiness[6]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#FFFF00" }}
                  onClick={() => handleButtonVariantbussiness("#FFFF00", 6)}
                >
                  Yellow
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={bussiness[7]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#00FF00" }}
                  onClick={() => handleButtonVariantbussiness("#00FF00", 7)}
                >
                  Lime
                </Button>
              </Grid>
            </Grid>
          </div>
          <div>
            <h1>Choose a Other Link Color</h1>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={other[0]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#FF0000" }}
                  onClick={() => handleButtonVariantother("#FF0000", 0)}
                >
                  Red
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={other[1]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#00FFFF	" }}
                  onClick={() => handleButtonVariantother("#00FFFF", 1)}
                >
                  Cyan
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={other[2]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#0000FF" }}
                  onClick={() => handleButtonVariantother("#0000FF", 2)}
                >
                  Blue
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={other[3]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#00008B" }}
                  onClick={() => handleButtonVariantother("#00008B", 3)}
                >
                  Dark-Blue
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={other[4]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#ADD8E6" }}
                  onClick={() => handleButtonVariantother("#ADD8E6", 4)}
                >
                  LightBlue
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={other[5]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#800080	" }}
                  onClick={() => handleButtonVariantother("#800080", 5)}
                >
                  Purple
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={other[6]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#FFFF00" }}
                  onClick={() => handleButtonVariantother("#FFFF00", 6)}
                >
                  Yellow
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  sx={{}}
                  variant={other[7]}
                  size="large"
                  color="primary"
                  style={{ backgroundColor: "#00FF00" }}
                  onClick={() => handleButtonVariantother("#00FF00", 7)}
                >
                  Lime
                </Button>
              </Grid>
            </Grid>
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
                    alt={item.title}
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
