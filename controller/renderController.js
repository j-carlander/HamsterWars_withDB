import { getCollection } from "../DB/mongoDB.js";
import { getHamsters } from "../service/service.js";

function renderIndex(request, response) {
  const model = {
    name: req.session.name,
    session: req.session.name,
    admin: req.session.admin,
  };
  response.render("index", model);
}

function renderVotePage(request, response) {
  getHamsters().then((hamsters) => {
    response.render("vote", {
      hamsters,
      session: request.session.username,
      admin: request.session.admin,
    });
  });
}
function renderThankYouPage(request, response) {
  let mssg = request.session.hasVoted
    ? "You have already voted"
    : "Thank you for your vote!";
  getHamsters().then((hamsters) => {
    response.render("thankyou", { hamsters, msg: mssg });
  });
}

async function rateHamster(request, response) {
  if (request.body.votedOn) {
    await getCollection("users").updateOne(
      { email: request.session.username },
      { $set: { hasVoted: true } }
    );
    await getCollection("hamsters").updateOne(
      { name: request.body.votedOn },
      { $inc: { votes: 1 } }
    );

    response.redirect("/thankyou");

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
      model.admin = request.session.admin;
      model.session = request.session.username;
      model.total = model.hamsters[0].votes + model.hamsters[1].votes;
      response.render("results", model);
    });
}

export default {
  renderIndex,
  renderVotePage,
  rateHamster,
  renderResultPage,
  renderThankYouPage,
};
