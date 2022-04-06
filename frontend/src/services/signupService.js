import http from "./httpService";

export function signup(data) {
  return http.post("http://localhost:3300/api/signup", data);
}
