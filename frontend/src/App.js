import React, { Component } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Blogs from "./components/blogs";
import Favorites from "./components/favorites";
import NotFound from "./components/notFound";
import Profile from "./components/profile";
import Navbar from "./components/navbar";
import BlogForm from "./components/blogForms";
import Login from "./components/login";
import Signup from "./components/signup";
import Logout from "./components/logout";

class App extends Component {
  render() {
    return (
      <main className="container">
        <Navbar />
        <Switch>
          <Route path="/blogs" exact component={Blogs} />
          <Route path="/blogs/new" component={BlogForm} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/profile" component={Profile} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/logout" component={Logout} />
          <Route path="not-found" component={NotFound} />
          <Redirect from="/" to="/blogs" exact />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    );
  }
}

export default App;
