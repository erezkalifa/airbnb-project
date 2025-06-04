import React from "react"
// import { useDispatch, useSelector } from "react-redux"

export function SearchLocation({
  location,
  index,
  icon = "/img/icons/search-location-icon-1.webp",
  filterBy,
  onSetFilter,
  closeModal,
}) {

  //const dispatch = useDispatch()
  //const filterBy = useSelector(storeState => storeState.stayModule.filterBy)

  function handleClick() {
    //console.log(location)
    const updatedFilter = { ...filterBy, city: location }
    onSetFilter(updatedFilter)
    closeModal?.()
  }

  return (
    <div key={index} className="search-location" onClick={() => handleClick()}>
      <img src={icon} className="icon" />
      <div className="search-location-info">
        <div className="title" onClick={() => handleClick(location)}>
          {location}
        </div>
        <div className="text">Find what's around you</div>
      </div>
    </div>
  );
}
