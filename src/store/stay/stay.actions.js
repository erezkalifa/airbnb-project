import { stayService } from "../../services/stay.service.js";
import { userService } from "../../services/user.service.js";
import {
  SET_STAYS,
  SET_FILTER_BY,
  APPEND_STAYS,
} from "../stay/stay.reducers.js";

import { store } from "../store.js";

export function loadStays(filterBy = {}, page = 1, pageSize = 12) {
  return async (dispatch) => {
    try {
      const stays = await stayService.query(filterBy, page, pageSize);
      console.log(stays);
      if (page === 1) {
        console.log("set");
        dispatch({ type: SET_STAYS, stays });
      } else {
        console.log("append");
        dispatch({ type: APPEND_STAYS, stays });
      }

      // dispatch({ type: SET_FILTER_BY, filterBy });
      // console.log(
      //   "🚀 ~ Loaded stays with filters:",
      //   filterBy,
      //   "and page:",
      //   page
      // );
      return stays;
    } catch (err) {
      console.error("stay action -> Cannot load stays:", err);
      throw err;
    }
  };
}
