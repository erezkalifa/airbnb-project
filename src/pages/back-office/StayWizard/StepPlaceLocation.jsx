import { MapView } from "../../../cmps/MapView.jsx";

export function StepPlaceLocation() {
  return (
    <section className="step-place-location">
      <h2>Where's your place located?</h2>
      <h3>
        Your address is only shared with guests after they’ve made a
        reservation.
      </h3>
      <MapView style={{ width: "630px", height: "500px" }} />
    </section>
  );
}
