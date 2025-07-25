import { useEffect, useState } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { stayService } from "../services/stay.service.js";

export function MapView({ stay, style, address }) {
  const [location, setLocation] = useState({
    lat: 32.0835416152454,
    lng: 34.78832515996161,
  });

  useEffect(() => {
    if (address) {
      handleLocationByAddress();
    } else {
      handleLocationByStay();
    }
  }, [address, stay]);

  function handleLocationByStay() {
    if (!stay?.loc) return;
    setLocation({
      lat: stay.loc.lan,
      lng: stay.loc.lat,
    });
  }

  async function handleLocationByAddress() {
    if (!address) return;

    try {
      const locationData = await stayService.getAddressLocation(address);
      if (locationData) {
        setLocation({
          lat: locationData.lat,
          lng: locationData.lng,
        });
      }
    } catch (err) {
      console.error("Error getting location:", err);
    }
  }

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
      <Map
        center={location}
        defaultZoom={13}
        mapId="2bd328edb13e41cede0051a4"
        mapOptions={{
          disableDefaultUI: false,
          zoomControl: true,
        }}
        style={style || { width: "100%", height: "500px" }}
      >
        <AdvancedMarker position={location}>
          <div
            style={{
              background: "#fff",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "14px",
              overflow: "hidden",
            }}
          >
            <span role="img" aria-label="home" style={{ fontSize: "20px" }}>
              🏠
            </span>
          </div>
        </AdvancedMarker>
      </Map>
    </APIProvider>
  );
}
