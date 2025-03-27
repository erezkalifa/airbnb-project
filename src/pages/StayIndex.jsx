import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadStays } from "../store/stay/stay.actions.js";
import { StayPreview } from "../cmps/stayPreview.jsx";

// Importing _createLoggedInUser for the sole purpose of creating the logged-in user if none exists ( demo data creation )
// You can delete this line if someone else call one of the functions of user.service.js
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
