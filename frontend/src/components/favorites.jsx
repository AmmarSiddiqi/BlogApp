import { Container, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../services/fakeBlogs";
import HomeImage from "./homeImage";
import Like from "./common/like";

class Favorites extends Component {
  state = {
    blogs: [],
  };

  componentDidMount() {
    let blogs = getBlogs();
    blogs = blogs.filter((blog) => blog.liked === true);
    this.setState({ blogs });
  }

  handleLike = (blog) => {
    const blogs = [...this.state.blogs];
    const index = blogs.indexOf(blog);
    blogs[index] = { ...blog };
    blogs[index].liked = !blogs[index].liked;
    this.setState({ blogs });
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
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Favorites;
