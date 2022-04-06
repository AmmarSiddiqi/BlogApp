import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import HomeImage from "./homeImage";

class Login extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit() {
    console.log("Login Submitted");
  }

  render() {
    return (
      <div>
        <HomeImage />
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          <button
            className="btn btn-outline-primary"
            disabled={this.validate() ? true : false}
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
