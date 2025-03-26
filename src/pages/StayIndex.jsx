import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadStays } from "../store/stay/stay.actions.js";
import { StayPreview } from "../cmps/stayPreview.jsx";

export function StayIndex() {
  const stays = useSelector((storeState) => storeState.stayModule.stays);
  useEffect(() => {
    loadStays().catch((err) => console.log(err));
  }, []);

  return (
    <section className="stay-index">
      <StayPreview />
    </section>
  );
}
