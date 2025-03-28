import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { loadStays } from "../store/stay/stay.actions.js";
import { StayPreview } from "../cmps/stayPreview.jsx";
import { LabelsScrollerBar } from "../cmps/LabelsScrollerBar.jsx"
import { UpperFilter } from "../cmps/UpperFilter.jsx"
import { MiddleFilter } from "../cmps/MiddleFilter.jsx"
import { MobileFilter } from "../cmps/MobileFilter.jsx"


// Demo data creation
import { _createLoggedInUser } from "../services/user.service.js";
import { _createOrders } from "../services/order.service.js";


export function StayIndex() {
  const [selectedLabel,setSelectedLabel] = useState("Countryside")
  const stays = useSelector((storeState) => storeState.stayModule.stays);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Check if screen width is <= 768px

  useEffect(() => {
    loadStays()
    .catch((err) => console.log(err));

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); // Update state on window resize
  };

  return (
    <section className="stay-index">
      {!isMobile ? (
        <>
          <UpperFilter />
          <MiddleFilter />
        </>
      ) : (
        <MobileFilter />
      )}
      <LabelsScrollerBar selectedLabel={selectedLabel} onLabelSelect={(label) => {
          console.log(label.name)
          setSelectedLabel(label)
          }} />
      <StayPreview />
    </section>
  );
}
