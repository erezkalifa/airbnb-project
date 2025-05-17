import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadStays } from "../store/stay/stay.actions.js"
import { StayList } from "../cmps/StayList.jsx"
import { Filters } from "../cmps/Filters"
import { LabelsScrollerBar } from "../cmps/LabelsScrollerBar.jsx"
// Demo data creation
import { _createLoggedInUser } from "../services/user.service.js"
import { _createOrders } from "../services/order.service.js"
import { SET_FILTER_BY } from "../store/stay/stay.reducers.js"

export function StayIndex() {
  const dispatch = useDispatch()
  const [selectedLabel, setSelectedLabel] = useState("Countryside")
  const stays = useSelector((storeState) => storeState.stayModule.stays)
  const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)

  function onSetFilter(filterBy) {
    dispatch({ type: SET_FILTER_BY, filterBy })
  }

  useEffect(() => {
    console.log('StayIndex : ',filterBy)
    dispatch(loadStays(filterBy))
    .catch((err) => console.log(err))
  }, [filterBy])

  return (
    <section className="stay-index">
      <Filters filterBy={filterBy} onSetFilter={onSetFilter} />
      <LabelsScrollerBar
        selectedLabel={selectedLabel}
        onLabelSelect={(label) => {
          setSelectedLabel(label)
          console.log(label)
          onSetFilter({ ...filterBy, labels: label })
        }}
      />
      {stays.length ? <StayList stays={stays} /> : 
          <p className="no-stays-msg">No stays found</p>}
    </section>
  )
}
