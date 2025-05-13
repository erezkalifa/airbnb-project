import React, { useState, useRef, useEffect } from "react";
import Modal from "./Modal.jsx";
import { SearchLocation } from "./SearchLocation.jsx";
import { CalendarRangePicker } from "./CalendarRangePicker.jsx";
import { GuestPicker } from "./GuestPicker.jsx";
import { useDispatch, useSelector } from "react-redux";

export function MiddleFilter() {
  const [openModal, setOpenModal] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [searchBoxWidth, setSearchBoxWidth] = useState(0);

  const firstArgRef = useRef(null);
  const thirdArgRef = useRef(null);
  const searchBoxRef = useRef(null);

  const dispatch = useDispatch();

  const filterBy = useSelector((storeState) => storeState.stayModule.filterBy);
  const closeModal = () => setOpenModal(null);
  function onSetFilter(filterBy) {
    dispatch({ type: SET_FILTER_BY, filterBy });
  }

  // Get search-box width on load & resize
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
    let targetRef;
    if (type === "who") {
      targetRef = thirdArgRef;
    } else {
      targetRef = firstArgRef;
    }

    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setOpenModal(type);
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
            <span>Search destinations</span>
          </div>
          <div
            className="search-box-arg"
            onClick={() => handleClick("checkin")}
          >
            Check in
            <span>Add dates</span>
          </div>
          <div
            className="search-box-arg"
            ref={thirdArgRef}
            onClick={() => handleClick("checkout")}
          >
            Check out
            <span>Add dates</span>
          </div>
          <div className="search-box-arg" onClick={() => handleClick("who")}>
            Who
            <span>Add guests</span>
          </div>
          <button className="search-button">
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

      {/* Modals */}
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
              <SearchLocation location={destination} key={i} />
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
              <SearchLocation location={destination} key={i} />
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
            onChange={(date, calendarIndex) =>
              console.log("Check-in:", date, "Calendar:", calendarIndex)
            }
          />
        </Modal>
      )}

      {openModal === "checkout" && (
        <Modal
          title="Select Check Out Date"
          onClose={closeModal}
          position={modalPosition}
          width={`${searchBoxWidth}px`}
          height="500px"
        >
          <CalendarRangePicker
            onChange={(date, calendarIndex) =>
              console.log("Check-out:", date, "Calendar:", calendarIndex)
            }
          />
        </Modal>
      )}

      {openModal === "who" && (
        <Modal
          title="Add Guests"
          onClose={closeModal}
          position={modalPosition}
          width="500px"
          height="500px"
        >
          <GuestPicker />
        </Modal>
      )}
    </>
  );
}
