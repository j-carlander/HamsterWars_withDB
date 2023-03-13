import { getCollection } from "../../db.js";
import { getHamsters } from "../service/service.js";

function renderIndex(request, response) {
  response.render("index");
}

function renderVotePage(request, response) {
  getHamsters().then((hamsters) => {
    console.log(hamsters);
    response.render("vote", { hamsters });
  });
}

function rateHamster(request, response) {
  if (request.body.votedOn) {
    getCollection("hamsters")
      .updateOne({ name: request.body.votedOn }, { $inc: { votes: 1 } })
      .then(() => response.redirect("/showResults"));

    // db.find((hamster) => hamster.name === request.body.votedOn).votes += 1;
  } else {
    response.redirect("/vote");
  }
}

function renderResultPage(request, response) {
  const model = { hamsters: [] };
  getCollection("hamsters")
    .find()
    .forEach((hamster) => model.hamsters.push(hamster))
    .then(() => {
      model.total = model.hamsters[0].votes + model.hamsters[1].votes;
      response.render("results", model);
    });
}

export default { renderIndex, renderVotePage, rateHamster, renderResultPage };
