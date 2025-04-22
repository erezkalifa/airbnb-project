import {useState,useRef, useEffect} from "react";
import {CalendarRangePicker} from "../CalendarRangePicker.jsx"
import {GuestPicker} from "../GuestPicker.jsx"
import Modal from "../Modal.jsx"

export function OrderCard(){
  const [checkIn, setCheckIn] = useState(null)
  const [checkOut, setCheckOut] = useState(null)
  const [openModal, setOpenModal] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [dateFieldsWidth, setDateFieldsWidth] = useState(0);
  // const checkInRef = useRef(null);
  // const checkOutRef = useRef(null);
  const guestRef = useRef(null);
  const dateFieldsRef = useRef(null);
  // const handleDateChange = (date, index) => {
  //   if (index === 0) setCheckIn(date);
  //   else setCheckOut(date);
  // }
  const closeModal = () => setOpenModal(null);

  const handleClick = (type) => {
    let targetRef;
    if (type === "checkIn" || type === "checkOut") {
      targetRef = dateFieldsRef;
    } else if (type === "guests") {
      targetRef = guestRef;
    }
    console.log(targetRef.current)
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      console.log(rect)
      const modalWidth = rect.width +500; 
      console.log(modalWidth)
      setModalPosition({
        top: rect.bottom + window.scrollY +12,
        left: rect.left + window.scrollX,
      });
      setDateFieldsWidth(modalWidth);
    }
    setOpenModal(type);
  };

  useEffect(() => {
      const updateWidth = () => {
        if (dateFieldsRef.current) {
          setDateFieldsWidth(dateFieldsRef.current.getBoundingClientRect().width);
        }
      };
      updateWidth();
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }, []);

  return (
    <div className="order-card-wrapper">
    <div className="sticky" >
      <div className="price">
        ₪362 <span>night</span>
      </div>

      <div className="selectors">
        <div className="date-range-group" ref={dateFieldsRef}>
        <div
          className="date-field" onClick={() => handleClick("checkIn")} >
          <div className="label" >CHECK-IN</div>
          <div className="value">
            {checkIn ? checkIn.toLocaleDateString() : "Add date"}
          </div>
        </div>
        <div
          className="date-field" onClick={() => handleClick("checkOut")} >
          <div className="label">CHECKOUT</div>
          <div className="value">
            {checkOut ? checkOut.toLocaleDateString() : "Add date"}
          </div>
        </div>
        </div>
        <div className="guest-field" onClick={() => handleClick("guests")} ref={guestRef}>
          <div className="label">GUESTS</div>
          <div className="value">1 guest</div>
        </div>
      </div>
      <button className="reserve-btn">Reserve</button>
      <p className="note">You won't be charged yet</p>

      <div className="fees">
        <div className="fee-row">
          <span>₪362 x 5 nights</span>
          <span>₪1,810</span>
        </div>
        <div className="fee-row">
          <span>Cleaning fee</span>
          <span>₪199</span>
        </div>
        <div className="fee-row">
          <span>Airbnb service fee</span>
          <span>₪284</span>
        </div>
        <hr />
        <div className="fee-row total">
          <span>Total</span>
          <span>₪2,293</span>
        </div>
      </div>
    </div>
    {openModal === "checkIn" && (
      <div className="calendar-popup">
          <Modal
            title="Select Check In Date"
            onClose={closeModal}
            position={modalPosition}
            width={`${dateFieldsWidth}px`}
            height="500px"
          >
            <CalendarRangePicker
              onChange={(date, calendarIndex) =>
                console.log("Check-in:", date, "Calendar:", calendarIndex)
              }
            />
          </Modal>
          </div>
        )}
    
        {openModal === "checkOut" && (
          <div>
          <Modal
            title="Select Check Out Date"
            onClose={closeModal}
            position={modalPosition}
            width={`${dateFieldsWidth}px`}
            height="500px"
          >
            <CalendarRangePicker
              onChange={(date, calendarIndex) =>
                console.log("Check-out:", date, "Calendar:", calendarIndex)
              }
            />
          </Modal>
          </div>
        )}

       {openModal === "guests" && (
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
  </div>
  );
}

