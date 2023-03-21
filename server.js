// if(process.env.NODE_ENV !== 'production'){}
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mustache from "mustache-express";
import session from "express-session";
import path from "path";
import url from "url";

import { router } from "./router/router.js";

//   (email) => {
//     getCollection("users")
//       .findOne({ email: email })
//       .then((user) => user);
//   }
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.engine("html", mustache());
app.set("view engine", "html");
app.set("views", __dirname + "/views");

app.use("/public", express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(router);

app.listen(process.env.PORT, () => {
  console.log("Server started, listening on port " + process.env.PORT);
});
