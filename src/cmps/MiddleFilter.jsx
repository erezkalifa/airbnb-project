import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import Modal from "./Modal.jsx";
import { SearchLocation } from "./SearchLocation.jsx";
import { CalendarRangePicker } from "./CalendarRangePicker.jsx";
import { GuestPicker } from "./GuestPicker.jsx";

import { SET_FILTER_BY } from "../store/stay/stay.reducers.js";
import { stayService } from "../services/stay.service.js";
import { applyFilter } from "../services/stay.service.js";

export function MiddleFilter() {
  const [openModal, setOpenModal] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [searchBoxWidth, setSearchBoxWidth] = useState(0);

  const firstArgRef = useRef(null);
  const thirdArgRef = useRef(null);
  const searchBoxRef = useRef(null);

  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterBy, setFilterBy] = useState(stayService.getFilterFromParams(searchParams));

  //const filterBy = stayService.getFilterFromParams(searchParams);

  const closeModal = () => setOpenModal(null);

  const onSetFilter = (newFilter) => {
    applyFilter(newFilter,setSearchParams,dispatch,setFilterBy)
  }
  
  
    
  useEffect(() => {
    setFilterBy(stayService.getFilterFromParams(searchParams))
  }, [searchParams])

  useEffect(() => {
    const updateWidth = () => {
      if (searchBoxRef.current) {
        setSearchBoxWidth(searchBoxRef.current.getBoundingClientRect().width);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleClick = (type) => {
    const targetRef = type === "who" ? thirdArgRef : firstArgRef;
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setOpenModal(type);
  };

  const handleSearch = () => {
    const totalGuests =
      Number(filterBy.guests?.adults || 0) +
      Number(filterBy.guests?.children || 0);

    const filterToSend = {
      ...filterBy,
      capacity: totalGuests,
    };
    onSetFilter(filterToSend);
    setOpenModal(null);
  };

  return (
    <>
      <section className="middle-filter">
        <div className="search-box" ref={searchBoxRef}>
          <div
            className="search-box-arg"
            ref={firstArgRef}
            onClick={() => handleClick("where")}
          >
            Where
            <span>{filterBy.city || "Search destinations"}</span>
          </div>

          <div
            className="search-box-arg"
            onClick={() => handleClick("checkin")}
          >
            Check in
            <span>
              {filterBy.checkIn
                ? new Date(filterBy.checkIn).toLocaleDateString()
                : "Add dates"}
            </span>
          </div>

          <div
            className="search-box-arg"
            onClick={() => handleClick("checkin")}
          >
            Check out
            <span>
              {filterBy.checkOut
                ? new Date(filterBy.checkOut).toLocaleDateString()
                : "Add dates"}
            </span>
          </div>

          <div
            className="search-box-arg"
            ref={thirdArgRef}
            onClick={() => handleClick("who")}
          >
            Who
            <span>
              {filterBy.guests
                ? `${Number(filterBy.guests.adults || 0) + Number(filterBy.guests.children || 0)} guest${Number(filterBy.guests.adults || 0) + Number(filterBy.guests.children || 0) !== 1 ? "s" : ""}`
                : "Add guests"}
            </span>
          </div>

          <button className="search-button" onClick={handleSearch}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style={{
                display: "block",
                fill: "none",
                height: "16px",
                width: "16px",
                stroke: "currentColor",
                strokeWidth: 4,
                overflow: "visible",
              }}
            >
              <path
                fill="none"
                d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"
              />
            </svg>
          </button>
        </div>
      </section>

      {openModal === "where" && (
        <Modal
          title="Choose Destination"
          onClose={closeModal}
          position={modalPosition}
          width={`${searchBoxWidth / 2}px`}
          height="500px"
        >
          <div className="modal-scrollable-list">
            <div className="searches-sub-title">Recent searches</div>
            {["Paris"].map((destination, i) => (
              <SearchLocation
                location={destination}
                filterBy={filterBy}
                onSetFilter={onSetFilter}
                closeModal={closeModal}
                key={i}
              />
            ))}
            <div className="searches-sub-title">Suggested Destinations</div>
            {[
              "Berlin",
              "London",
              "Rome",
              "New York",
              "Tokyo",
              "Barcelona",
              "Amsterdam",
              "Dubai",
              "Bangkok",
              "Lisbon",
              "Athens",
            ].map((destination, i) => (
              <SearchLocation
                location={destination}
                filterBy={filterBy}
                onSetFilter={onSetFilter}
                closeModal={closeModal}
                key={i}
              />
            ))}
          </div>
        </Modal>
      )}

      {openModal === "checkin" && (
        <Modal
          title="Select Check In Date"
          onClose={closeModal}
          position={modalPosition}
          width={`${searchBoxWidth}px`}
          height="500px"
        >
           <CalendarRangePicker
            filterBy={filterBy}
            onSetFilter={(newFilter) => {
              if (newFilter.checkIn && newFilter.checkOut) {
                onSetFilter({
                  ...filterBy,
                  checkIn: newFilter.checkIn,
                  checkOut: newFilter.checkOut,
                });
                closeModal();
              }
            }}
          />
        </Modal>
      )}

      {/* {openModal === "checkout" && (
        <Modal
          title="Select Check Out Date"
          onClose={closeModal}
          position={modalPosition}
          width={`${searchBoxWidth}px`}
          height="500px"
        >
          <CalendarRangePicker
            filterBy={filterBy}
            onSetFilter={onSetFilter} // ✅ Directly pass the original onSetFilter!
          />
        </Modal>
      )} */}

      {openModal === "who" && (
        <Modal
          title="Add Guests"
          onClose={closeModal}
          position={modalPosition}
          width="500px"
          height="500px"
        >
          <GuestPicker
            initialGuests={filterBy.guests}
            onGuestsChange={(guests) => {
              const prevGuests = filterBy.guests || {};
              const isSame =
                prevGuests.adults === guests.adults &&
                prevGuests.children === guests.children &&
                prevGuests.infants === guests.infants &&
                prevGuests.pets === guests.pets;
              if (!isSame) {
                onSetFilter({ ...filterBy, guests });
              }
            }}
          />
        </Modal>
      )}
    </>
  );
}
