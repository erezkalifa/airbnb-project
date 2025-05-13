import React from "react";

export function SearchLocation({
  location,
  index,
  icon = "src/assets/img/icons/search-location-icon-1.webp",
}) {
  function handleClick(location) {
    console.log(location);
  }

  return (
    <div key={index} className="search-location">
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
