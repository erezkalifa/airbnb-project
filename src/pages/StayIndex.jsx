import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { loadStays } from "../store/stay/stay.actions.js";
import { StayPreview } from "../cmps/stayPreview.jsx";
import {LabelsScrollerBar} from "../cmps/LabelsScrollerBar.jsx"

export function StayIndex() {
  const [selectedLabel,setSelectedLabel] = useState("Countryside")
  const stays = useSelector((storeState) => storeState.stayModule.stays);
  useEffect(() => {
    loadStays()
    .catch((err) => console.log(err));
  }, []);

  return (
    <section className="stay-index">
      <LabelsScrollerBar selectedLabel={selectedLabel} onLabelSelect={(label) => {
          console.log(label.name)
          setSelectedLabel(label)
          }} />
      <StayPreview />
    </section>
  );
}
