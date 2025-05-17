import { stayService } from "../../services/stay.service.js";
import { SET_STAYS , SET_FILTER_BY } from "../stay/stay.reducers.js";
import { store } from "../store.js";

export function loadStays(filterBy = {}) {
  return async (dispatch) => {
    try {
      const stays = await stayService.query(filterBy)
      dispatch({ type: SET_STAYS, stays })
      dispatch({ type: SET_FILTER_BY, filterBy })
      console.log("🚀 ~ Loading stays with filters:", filterBy)
      return stays
    } catch (err) {
      console.log("stay action -> Cannot load stays", err)
      throw err
    }
  }
}

