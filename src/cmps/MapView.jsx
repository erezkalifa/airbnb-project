import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

export function MapView({ stay, style }) {
  const center = {
    lat: stay?.loc?.lan || 32.0835416152454,
    lng: stay?.loc?.lat || 34.78832515996161,
  };
  return (
    <APIProvider apiKey="AIzaSyCd6v2whmmM0grZKw0hD5n1ssBatDjzulc">
      <Map
        center={center}
        defaultZoom={13}
        mapId="2bd328edb13e41cede0051a4"
        mapOptions={{
          disableDefaultUI: false,
          zoomControl: true,
        }}
        style={style || { width: "100%", height: "500px" }}
      >
        <AdvancedMarker position={center}>
          <div
            style={{
              background: "#fff",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
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
