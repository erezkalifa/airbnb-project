import { stayService } from "../../services/stay.service.js";
import { SET_STAYS , SET_FILTER_BY } from "../stay/stay.reducers.js";
import { store } from "../store.js";

export function loadStays(filterBy = {}) {
  return stayService
    .query(filterBy)
    .then((stays) => {
      store.dispatch({ type: SET_STAYS, stays })
      store.dispatch({ type: SET_FILTER_BY, filterBy })
      return stays
    })
    .catch((err) => {
      console.log("stay action -> Cannot load stays", err)
      throw err
    })
}
