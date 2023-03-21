import { getCollection } from "../DB/mongoDB.js";

export async function hasVoted(request, response, next) {
  let user = await getCollection("users").findOne(
    { email: request.session.username },
    { hasVoted: 1 }
  );
  if (user.hasVoted == true) {
    request.session.hasVoted = user.hasVoted;
    response.redirect("/thankyou");
  } else {
    next();
  }
}
