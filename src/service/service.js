import { getCollection } from "../../db.js";

export function getHamsters() {
  return getCollection("hamsters").find().toArray();
}
