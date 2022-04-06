import http from "./httpService";

const apiEndpoint = "http://localhost:3300/api/articles";

export async function getBlogs() {
  const { data } = await http.get(apiEndpoint);
  console.log(data);
  return data;
}

export function postBlog(blog) {
  return http.post("http://localhost:3300/api/articles", blog);
}

export function deleteBlog(id) {
  return http.delete(apiEndpoint + "id");
}
