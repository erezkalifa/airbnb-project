//* Stays
export const SET_STAYS = "SET_STAYS"
export const SET_FILTER_BY = "SET_FILTER_BY"

const initialState = {
  stays: [],
  filterBy : {
    checkIn: '',
    checkOut: '',
    guests: 0,
    labels: '',},
}

export function stayReducer(state = initialState, cmd = {}) {
  switch (cmd.type) {
    case SET_STAYS:
      return {
        ...state,
        stays: cmd.stays,
      }
      case SET_FILTER_BY:
        return {
          ...state,
          filterBy: cmd.filterBy,
        }

    default:
      return state;
  }
}
