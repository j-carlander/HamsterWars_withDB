import express from "express";
import path from "path";
import url from "url";
import mustache from "mustache-express";
import router from "./src/router/router.js";
// Working directory path
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Server parameters
const app = express();
const port = 3000;

// Template engine
app.engine("html", mustache());
app.set("view engine", "html");
app.set("views", __dirname + "/views");

// Use built in middleware to encode html form and serve images
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/images", express.static("images"));

// Server db
// const db = [
//   { name: "hamster_1", img: `./images/hamster_1.png`, votes: 0 },
//   { name: "hamster_2", img: "./images/hamster_2.png", votes: 0 },
// ];

// Routes
app.use(router);

// middleware
// function calcTotal(request, response, next) {
//   request.total = database[0].votes + database[1].votes;
//   next();
// }
app.listen(port, () => {
  console.log("server started, listening on port " + port);
});
