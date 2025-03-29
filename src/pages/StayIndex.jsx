import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { loadStays } from "../store/stay/stay.actions.js";
import { Filters } from "../cmps/Filters.jsx"
import { StayList } from "../cmps/StayList.jsx"
import { StayPreview } from "../cmps/StayPreview.jsx";
import { LabelsScrollerBar } from "../cmps/LabelsScrollerBar.jsx"

// Demo data creation
import { _createLoggedInUser } from "../services/user.service.js";
import { _createOrders } from "../services/order.service.js";


export function StayIndex() {
  const [selectedLabel,setSelectedLabel] = useState("Countryside")
  const stays = useSelector((storeState) => storeState.stayModule.stays);

  useEffect(() => {
    loadStays()
    .catch((err) => console.log(err));
  }, []);

  // console.log(JSON.stringify(stays[0]))

  return (
    <section className="stay-index">
      <Filters/>
      <LabelsScrollerBar selectedLabel={selectedLabel} onLabelSelect={(label) => {
          console.log(label.name)
          setSelectedLabel(label)
          }} />
      <StayPreview stay={stays[0]}/>
      <StayList stays={stays}/>    
    </section>
  );
}
