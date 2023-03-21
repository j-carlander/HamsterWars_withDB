import { getCollection } from "../DB/mongoDB.js";
import bcrypt from "bcrypt";

export async function loginUser(req, res) {
  const user = await getCollection("users").findOne({
    email: req.body.email,
  });

  if (!user) {
    console.log("No user found");
    res.redirect("/register");
    return;
  }

  const passwordMatch = await bcrypt.compare(req.body.password, user.password);
  if (passwordMatch) {
    req.session.username = user.email;
    req.session.name = user.name;
    req.session.admin = user.admin;
    req.session.hasVoted = user.hasVoted;
    res.redirect("/");
  } else {
    console.log("Password missmatch");
    res.redirect("/login");
  }
}

export function logoutUser(req, res) {
  // req.session.username = undefined;
  // req.session.name = undefined;
  // req.session.admin = undefined;
  req.session.destroy();
  res.redirect("/login");
}
