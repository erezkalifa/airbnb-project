import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadStays } from "../store/stay/stay.actions.js"
import { StayList } from "../cmps/StayList.jsx"
import { Filters } from "../cmps/Filters"
import { LabelsScrollerBar } from "../cmps/LabelsScrollerBar.jsx"
// Demo data creation
import { _createLoggedInUser } from "../services/user.service.js"
import { _createOrders } from "../services/order.service.js"

export function StayIndex() {
  const dispatch = useDispatch()
  const [selectedLabel, setSelectedLabel] = useState("Countryside")
  const stays = useSelector((storeState) => storeState.stayModule.stays)
  const filterBy = useSelector(storeState => storeState.stayModule.filterBy)

  function onSetFilter(filterBy) {
    dispatch({ type: SET_FILTER_BY, filterBy })
  }

  useEffect(() => {
    loadStays(filterBy)
    .catch((err) => console.log(err))
  }, [filterBy])

  return (
    <section className="stay-index">
      <Filters filterBy={filterBy} onSetFilter={onSetFilter}/>
      <LabelsScrollerBar
        selectedLabel={selectedLabel}
        onLabelSelect={(label) => {
          console.log(label.name)
          setSelectedLabel(label)
          onSetFilter({ ...filterBy, txt: label.name })
        }}
      />
      {stays.length ? <StayList stays={stays} /> : ""}
    </section>
  )
}
