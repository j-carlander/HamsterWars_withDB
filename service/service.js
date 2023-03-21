import { getCollection } from "../DB/mongoDB.js";

export function getHamsters() {
  return getCollection("hamsters").find().toArray();
}

export function getUsers() {
  return getCollection("users").find().toArray();
}
