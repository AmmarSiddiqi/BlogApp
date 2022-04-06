import http from "../services/httpService.js";

const blogs = [
  {
    _id: "62445078e09cabc538701e65",
    title: "First Blog",
    detail: "Lorem ipsum doller sit amet",
    publishDate: "March 31, 2022",
    liked: false,
    file: {
      filePath:
        "https://cdn.pixabay.com/photo/2012/12/27/19/40/chain-link-72864_960_720.jpg",
    },
  },
  {
    _id: "62445078e09cabc538701e67",
    title: "Second Blog",
    detail: "Lorem ipsum doller sit amet",
    publishDate: "April 1, 2022",
    liked: true,
    file: {
      filePath:
        "https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_960_720.jpg",
    },
  },
  {
    _id: "62445078e09cabc534701e65",
    title: "3rd Blog",
    detail: "Lorem ipsum doller sit amet",
    publishDate: "June 1, 2022",
    liked: false,
    file: {
      filePath:
        "https://cdn.pixabay.com/photo/2016/02/28/12/55/boy-1226964_960_720.jpg",
    },
  },
];

export function getBlogs() {
  return blogs;
}
