import React, { Component } from "react";
import axios from "axios";
import HomeImage from "./homeImage";
import { Link } from "react-router-dom";
import { getBlogs, deleteBlog } from "../services/blogService";
import { Container, Typography } from "@material-ui/core";
import Like from "./common/like";

class Blogs extends Component {
  state = {
    blogs: [],
  };

  async componentDidMount() {
    const { data } = await axios.get("http://localhost:3300/api/articles");
    alert(data);
  }

  handleLike = (blog) => {
    const blogs = [...this.state.blogs];
    const index = blogs.indexOf(blog);
    blogs[index] = { ...blog };
    blogs[index].liked = !blogs[index].liked;
    this.setState({ blogs });
  };

  handleDelete = (blog) => {
    const originalBlogs = this.state.blogs;
    const blogs = originalBlogs.filter((b) => b._id !== blog._id);
    this.setState({ blogs });
    try {
      deleteBlog(blog._id);
    } catch (ex) {
      if (ex.response && ex.response === 404)
        console.log("Blog already deleted");
      this.setState({ blogs: originalBlogs });
    }
  };

  render() {
    return (
      <div>
        <div>
          <HomeImage />
        </div>
        <Container>
          <Typography variant="h4">Blogs</Typography>
        </Container>
        {this.state.blogs.map((blog) => (
          <div key={blog._id} className="media mb-4">
            <div className="pull-left">
              <img src={blog.file.filePath} height={200} width={200} />
            </div>
            <div className="">
              <h2 className="media-heading">{blog.title}</h2>
              <p className="text-right">{blog.detail}</p>
              <ul className="list-inline list-unstyled">
                <li>
                  <span>{blog.publishDate}</span>
                </li>
                <li>
                  <Link
                    to={{
                      pathname: "http://facebook.com",
                    }}
                    target="_blank"
                    className="mr-2"
                  >
                    <i className="fa fa-facebook-square"></i>
                  </Link>
                  <Link
                    to={{
                      pathname: "http://twitter.com",
                    }}
                    target="_blank"
                    className="mr-2"
                  >
                    <i className="fa fa-twitter-square"></i>
                  </Link>
                  <Link
                    to={{
                      pathname: "http://google.com",
                    }}
                    target="_blank"
                    className="mr-2"
                  >
                    <i className="fa fa-google-plus-square"></i>
                  </Link>
                </li>
              </ul>
              <Like liked={blog.liked} onClick={() => this.handleLike(blog)} />
              <button
                onClick={() => this.handleDelete(blog)}
                className="btn btn-outline-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Blogs;
