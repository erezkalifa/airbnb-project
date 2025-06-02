import { stayService } from "../../services/stay.service.js";
import { SET_STAYS , SET_FILTER_BY } from "../stay/stay.reducers.js";
import { store } from "../store.js";

export function loadStays(filterBy = {}, page = 1, pageSize = 10) {
  return async (dispatch) => {
    try {
      const stays = await stayService.query(filterBy, page, pageSize);

      if (page === 1) {
        dispatch({ type: 'SET_STAYS', stays });
      } else {
        dispatch({ type: 'APPEND_STAYS', stays });
      }

      dispatch({ type: SET_FILTER_BY, filterBy });
      console.log("🚀 ~ Loaded stays with filters:", filterBy, "and page:", page);
      return stays;
    } catch (err) {
      console.error("stay action -> Cannot load stays:", err);
      throw err;
    }
  };
}

