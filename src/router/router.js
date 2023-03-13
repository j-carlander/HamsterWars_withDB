import express from "express";
import controller from "../controller/controller.js";
const router = express.Router();

router.get("/", controller.renderIndex);

router.get("/vote", controller.renderVotePage);

router.post("/rateHamster", controller.rateHamster);

router.get("/showResults", controller.renderResultPage);

export default router;
