import jwt from "jsonwebtoken";
import "dotenv";

export default function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access Denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_TOKEN);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid Token");
  }
}
