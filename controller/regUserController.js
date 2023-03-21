import { getCollection } from "../DB/mongoDB.js";
import bcrypt from "bcrypt";

export async function regUser(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let user = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      admin: false,
      hasVoted: false,
    };
    getCollection("users")
      .insertOne(user)
      .then(() => {
        res.redirect("/login");
      });
  } catch {
    res.redirect("/register");
  }
}
