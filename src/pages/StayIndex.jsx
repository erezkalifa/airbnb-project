import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadStays } from "../store/stay/stay.actions.js";
import { StayPreview } from "../cmps/stayPreview.jsx";

// Demo data creation
import { _createLoggedInUser } from "../services/user.service.js";
import { _createOrders } from "../services/order.service.js";


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
