import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import HomeImage from "./homeImage";
import { signup } from "../services/signupService";

class Signup extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    name: Joi.string().required().trim().label("Name"),
    email: Joi.string().email().required().trim().label("Email"),
    password: Joi.string().required().trim().label("Password"),
  };

  doSubmit = async () => {
    try {
      await signup(this.state.data);
    } catch (ex) {
      console.log(ex);
    }
  };

  render() {
    return (
      <div>
        <HomeImage />
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          <button
            className="btn btn-outline-secondary"
            disabled={this.validate() ? true : false}
          >
            Signup
          </button>
        </form>
      </div>
    );
  }
}

export default Signup;
