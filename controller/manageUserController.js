import { getUsers } from "../service/service.js";

export function manageUser(req, res) {
  getUsers().then((users) => {
    res.render("manage.html", { users });
  });
}
