import express from "express";
import { authAdmin, authenticate } from "../filter/authFilter.js";
import { loginUser, logoutUser } from "../controller/authController.js";
import { regUser } from "../controller/regUserController.js";
import renderController from "../controller/renderController.js";
import { manageUser } from "../controller/manageUserController.js";
import { hasVoted } from "../filter/hasVotedFilter.js";

export const router = express.Router();

router.get("/", renderController.renderIndex);

router.get("/login", (req, res) => {
  res.render("login.html");
});

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/register", (req, res) => {
  res.render("register.html");
});

router.post("/register", regUser);

router.get("/vote", authenticate, hasVoted, renderController.renderVotePage);

router.get("/thankyou", renderController.renderThankYouPage);

router.post("/rateHamster", authenticate, renderController.rateHamster);

router.get("/showResults", renderController.renderResultPage);

router.get("/manage", authAdmin, manageUser);

router.get("*", (req, res) => {
  let error = new Error();
  error.serverInfo = "Path not resolved";
  error.clientInfo = "The url that you used is not valid";
  throw error; // Kasta felet till express
});
