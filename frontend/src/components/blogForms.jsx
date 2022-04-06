import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import HomeImage from "./homeImage";
import { postBlog } from "../services/blogService";

class BlogForm extends Form {
  state = {
    data: {
      title: "",
      detail: "",
      file: null,
    },
    errors: {},
  };

  schema = {
    title: Joi.string().max(256).required().label("Title"),
    detail: Joi.string().max(9999).required().label("Detail"),
    file: Joi,
  };

  doSubmit = async () => {
    try {
      await postBlog(this.state.data);
    } catch (ex) {
      console.log(ex);
    }
  };

  handleImageSelector = (e) => {
    console.log(e.target.files[0]);
  };

  render() {
    return (
      <div>
        <HomeImage />
        <form onSubmit={this.handleSubmit}>
          <h4>Publish Your Blog</h4>
          {this.renderInput("title", "Title")}
          {this.renderTextarea("detail", "Detail")}

          <div className="mb-4">
            <label htmlFor="formFile" class="form-label">
              Attach Image
            </label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              onChange={this.handleImageSelector}
            />
          </div>

          <button
            disabled={this.validate() ? true : false}
            className="btn btn-outline-primary btn-md"
          >
            Publish
          </button>
        </form>
      </div>
    );
  }
}

export default BlogForm;
