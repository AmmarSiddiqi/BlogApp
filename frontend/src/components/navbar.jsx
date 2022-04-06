import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";

class Navbar extends Component {
  render() {
    return (
      <AppBar>
        <Toolbar>
          <Link to="/">
            <Typography variant="h6" color="secondary">
              BlogApp
            </Typography>
          </Link>
          <NavLink to="/blogs">
            <Button color="inherit">Blogs</Button>
          </NavLink>
          <NavLink to="/favorites">
            <Button color="inherit">Favorites</Button>
          </NavLink>
          <NavLink to="/profile">
            <Button color="inherit">Profile</Button>
          </NavLink>
          <NavLink to="/blogs/new">
            <Button color="inherit">Add Blogs</Button>
          </NavLink>
          <NavLink to="/logout">
            <Button color="inherit">Logout</Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
