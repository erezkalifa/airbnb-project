import { stayService } from "../../services/stay.service.js";
import { SET_STAYS } from "../stay/stay.reducers.js";
import { store } from "../store.js";

export function loadStays() {
  const filterBy = "";
  return stayService
    .query(filterBy)
    .then((stays) => {
      store.dispatch({ type: SET_STAYS, stays });
    })
    .catch((err) => {
      console.log("stay action -> Cannot load stays", err);
      throw err;
    });
}
