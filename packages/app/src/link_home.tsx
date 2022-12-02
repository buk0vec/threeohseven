import React, { useState } from "react";
import logo from "./images/bush2.png";
import { Button, Typography, Grid, Box, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import "./link_home.css";
import axios, {AxiosResponse} from "axios";
import { useLoaderData } from "react-router-dom";
import {GetPageResponse} from "./types";

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

const Linkhome = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };
  const pageData = useLoaderData() as AxiosResponse<GetPageResponse>;
  React.useEffect(() => {
    console.log(pageData);
  }, [pageData]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
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
                    <Button
                    onClick= {() => activeCategory === categ._id ? setActiveCategory(null) : setActiveCategory(categ._id)}>{categ.name}</Button>
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

      {pageData.data.data?.links &&
        pageData.data.data?.links.filter((l: ILink) => activeCategory ? l.category === activeCategory : true).map((l: ILink) => {
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
            </Box>
          );
        })}
    </div>
  );
};

export default Linkhome;
