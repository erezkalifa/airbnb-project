import { MapView } from "../../../cmps/MapView.jsx";
import { useState, useEffect } from "react";

export function StepPlaceLocation({ address = {}, onChange }) {
  const [mapAddress, setMapAddress] = useState(null);

  useEffect(() => {
    if (address.street || address.city || address.postalCode) {
      const fullAddress = buildAddressString(address);
      setMapAddress(fullAddress);
    }
  }, [address]);

  const buildAddressString = ({ street, city, postalCode }) => {
    return [street, city, postalCode].filter(Boolean).join(", ");
  };

  const handleInputChange = (field, value) => {
    onChange({ ...address, [field]: value });
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
            value={address.street || ""}
            onChange={(e) => handleInputChange("street", e.target.value)}
          />
        </div>
        <div className="input-row">
          <input
            type="text"
            className="input-field"
            placeholder="City/Town"
            value={address.city || ""}
            onChange={(e) => handleInputChange("city", e.target.value)}
          />
        </div>
        <div className="input-row">
          <input
            type="text"
            className="input-field"
            placeholder="Postal code"
            value={address.postalCode || ""}
            onChange={(e) => handleInputChange("postalCode", e.target.value)}
          />
        </div>
        <div className="input-row">
          <input
            type="text"
            className="input-field"
            placeholder="Entrance (if applicable)"
            value={address.entrance || ""}
            onChange={(e) => handleInputChange("entrance", e.target.value)}
          />
        </div>
      </div>

      <button
        className="option-box wide-btn"
        style={{ "--btn-width": "550px" }}
        onClick={() => setMapAddress(buildAddressString(address))}
      >
        Search
      </button>
    </section>
  );
}
