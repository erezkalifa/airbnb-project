import { MapView } from "../../../cmps/MapView.jsx";
import { useState } from "react";
export function StepPlaceLocation() {
  const [placeDetails, setPlaceDetails] = useState({});
  const [mapAddress, setMapAddress] = useState(null);

  //   console.log(placeDetails);

  function handleSearchBtn() {
    const { street, city, postalCode, entrance } = placeDetails;

    const fullAddress = buildAddressString({
      street,
      city,
      postalCode,
      entrance,
    });

    setMapAddress(fullAddress);
  }

  const buildAddressString = (addressObj) => {
    return [addressObj.street, addressObj.city, addressObj.postalCode]
      .filter(Boolean)
      .join(", ");
  };

  return (
    <section className="step-place-location">
      <div className="txt">
        <div className="where">Where's your place located?</div>
        <span>
          Your address is only shared with guests after they’ve made a
          reservation.
        </span>
      </div>
      <MapView
        style={{ width: "630px", height: "500px" }}
        address={mapAddress}
      />
      <div className="airbnb-input-group">
        <div className="input-row">
          <input
            type="text"
            className="input-field"
            placeholder="Street address"
            onChange={(event) =>
              setPlaceDetails((prev) => ({
                ...prev,
                street: event.target.value,
              }))
            }
          />
        </div>
        <div className="input-row">
          <input
            type="text"
            className="input-field"
            placeholder="City/Town"
            onChange={(event) =>
              setPlaceDetails((prev) => ({ ...prev, city: event.target.value }))
            }
          />
        </div>

        <div className="input-row">
          <input
            type="text"
            className="input-field"
            placeholder="Postal code"
            onChange={(event) =>
              setPlaceDetails((prev) => ({
                ...prev,
                postalCode: event.target.value,
              }))
            }
          />
        </div>
        <div className="input-row">
          <input
            type="text"
            className="input-field"
            placeholder="Entrance (if applicable)"
            onChange={(event) =>
              setPlaceDetails((prev) => ({
                ...prev,
                entrance: event.target.value,
              }))
            }
          />
        </div>
      </div>
      <button
        className="option-box wide-btn"
        style={{ "--btn-width": "550px" }}
        onClick={handleSearchBtn}
      >
        Search
      </button>
    </section>
  );
}
