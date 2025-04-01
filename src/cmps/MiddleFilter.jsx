import React, { useState, useRef, useEffect } from "react";
import Modal from "./Modal.jsx";

export function MiddleFilter() {
  const [openModal, setOpenModal] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [searchBoxWidth, setSearchBoxWidth] = useState(0);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const firstArgRef = useRef(null);
  const thirdArgRef = useRef(null);
  const searchBoxRef = useRef(null);

  const closeModal = () => setOpenModal(null);

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
          <div
            className="search-box-arg"
            onClick={() => handleClick("who")}
          >
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
        width={`${searchBoxWidth}px`}
        height="500px"
      >
        <div className="modal-scrollable-list">
          {[
            "Paris",
            "London",
            "Rome",
            "New York",
            "Tokyo",
            "Barcelona",
            "Berlin",
            "Amsterdam",
            "Dubai",
            "Bangkok",
            "Lisbon",
            "Athens",
          ].map((destination, i) => (
            <div
              key={i}
              className={`destination-item ${
                selectedDestination === destination ? "selected" : ""
              }`}
              onClick={() => setSelectedDestination(destination)}
            >
              {destination}
            </div>
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
          <p>Check-in modal content</p>
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
          <p>Check-out modal content</p>
        </Modal>
      )}
      {openModal === "who" && (
        <Modal
          title="Add Guests"
          onClose={closeModal}
          position={modalPosition}
          width={`${searchBoxWidth}px`}
          height="500px"
        >
          <p>Guests modal content</p>
        </Modal>
      )}
    </>
  );
}
