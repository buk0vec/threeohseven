import React, { useState } from "react";
import logo from "./images/bush2.png";
import { Button, Typography, Grid, Box, TextField } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import "./link_home.css";
import axios, {AxiosResponse} from "axios";
import { useLoaderData } from "react-router-dom";
import {CreateLinkResponse, GetPageResponse, Link} from "./types";

export interface ICategory {
  name: string;
  color: string;
  _id: string;
}

export interface ILink {
  name: string;
  url: string;
  category: string | null;
  _id: string;
}

export interface IPage {
  owner: string;
  categories: Array<ICategory>;
  color: string;
  avatar: string;
  title: string;
  links: Array<ILink>;
}

export interface APIResponse<T> {
  error: boolean;
  message: string;
  data: T;
}

const Linkedit = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };
  const [links, setLinks] = useState<Link[]>([]);
  const pageData = useLoaderData() as AxiosResponse<GetPageResponse>;
  React.useEffect(() => {
    console.log(pageData);
    setLinks(pageData.data.data?.links ?? []);
  }, [pageData]);

  const [linkName, setLinkName] = useState("");
  const [linkURL, setLinkURL] = useState("");
  const [linkCategory, setLinkCategory] = useState(null);

  const handleLinkName = (e: any) => {
    setLinkName(e.target.value);
  };
  const handleLinkURL = (e: any) => {
    setLinkURL(e.target.value);
  };
  const handleLinkCategory = (e: any) => {
    setLinkCategory(e.target.value);
  };

  async function addLink(){
    console.log(linkName, linkURL, linkCategory);
    // const res = await axios.post<CreateLinkResponse>(
    //   "https://linkbush-api.azurewebsites.net/page/links",
    //   {
    //     name: linkName,
    //     url: linkURL,
    //     category: linkCategory
    //   },
    //   { validateStatus: (status) => status < 504 }
    // )
    const link = {
      _id: Date.now().toString(),
      name: linkName,
      url: linkURL,
      category: linkCategory
    };
    setLinks(s => [...s, link]);
    // if (res.status === 200){
    //   //setLinks(s => [...s, res.data.data]);
    //   console.log(res.data.data);
    // }
    // else if(res.status === 400){
    //   alert("Parameters given not working");
    // }
    // else{
    //   console.log("HERE");
    //   alert("Adding link did not work");
    // }
  }
  async function deleteLink(linkId: String){
    console.log(linkId);
    // const res = await axios.post<CreateLinkResponse>(
    //   "https://linkbush-api.azurewebsites.net/page/links",
    //   {
    //     name: linkName,
    //     url: linkURL,
    //     category: linkCategory
    //   },
    //   { validateStatus: (status) => status < 504 }
    // )
    setLinks(s => s.filter(l => l._id !== linkId))
    // if (res.status === 200){
    //   //setLinks(s => [...s, res.data.data]);
    //   console.log(res.data.data);
    // }
    // else if(res.status === 400){
    //   alert("Parameters given not working");
    // }
    // else{
    //   console.log("HERE");
    //   alert("Adding link did not work");
    // }
  }
  return (
    <div>
      <nav className="navBar">
        <button onClick={handleToggle}>
          {navbarOpen ? (
            <Grid item xs={8}>
              <MenuOpenIcon />
            </Grid>
          ) : (
            <Grid item xs={8}>
              <MenuIcon />
            </Grid>
          )}
        </button>
        <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
        {pageData.data.data?.categories &&
        pageData.data.data.categories.map((categ: ICategory) => {
          return (
            <li>
            <Box className="categorylinks">
              <p style = {{color: categ.color}}>{categ.name}</p>
            </Box>
            </li>
          );
        })}
        </ul>
      </nav>
      <img
        style={{ height: 100, width: 100, borderRadius: 100 / 2 }}
        src={
          (pageData.data.data?.avatar.startsWith("/") || pageData.data.data?.avatar.startsWith("http"))
            ? pageData.data.data?.avatar
            : "/" + pageData.data.data?.avatar
        }
      ></img>
      <h3>{pageData.data.data?.title}</h3>

      {links && links.map((l: ILink) => {
          return (
            <Box className="links">
              <a
                href={
                  l.url.startsWith("http://") || l.url.startsWith("https://")
                    ? l.url
                    : "https://" + l.url
                }
                target="_blank"
                rel="noreferrer"
              >
                {l.name}
              </a>
              <Button
            sx={{borderRadius: 3 }}
            variant="contained"
            color="warning"
            onClick={(e: any) => {
              e.preventDefault();
              deleteLink(l._id);
            }}
          >
            Delete
          </Button>
            </Box>
          );
        })}


        <Box className="links"
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off">
          <div>
          <TextField
          margin="normal"
          multiline
          type={"linkName"}
          variant="outlined"
          placeholder="link name"
          value={linkName}
          onChange={handleLinkName}
        />
        <TextField
          margin="normal"
          multiline
          type={"linkURL"}
          variant="outlined"
          placeholder="link url"
          value={linkURL}
          onChange={handleLinkURL}
        />
        {/* <TextField
          margin="normal"
          multiline
          type={"linkCategory"}
          variant="outlined"
          placeholder="link category"
          value={linkCategory}
          onChange={handleLinkCategory}
        /> */}
        <Button
            sx={{borderRadius: 3 }}
            variant="contained"
            color="primary"
            onClick={(e: any) => {
              e.preventDefault();
              addLink();
              setLinkName("");
              setLinkURL("");
            }}
          >
            Add Link
          </Button>
        </div>
          </Box>
    </div>
  );
};

export default Linkedit;
