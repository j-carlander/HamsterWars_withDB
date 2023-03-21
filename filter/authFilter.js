export function authenticate(request, response, next) {
  if (request.session.username == undefined) {
    response.redirect("/login");
  } else {
    next();
  }
}

export function authAdmin(request, response, next) {
  if (request.session.admin == false || request.session.admin == undefined) {
    response.redirect("/login");
  } else {
    console.log("Authenticated as admin: " + request.session.admin);
    next();
  }
}
