import { OptionBox } from "./OptionBox";

export function StepPlaceOffer({ selectedTypes, onSelect, isMulti }) {
  const handleSelect = (type) => {
    if (isMulti) {
      onSelect((prev) =>
        prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
      );
    } else {
      onSelect(type);
    }
  };

  const placeOptions = [
    {
      key: "tv",
      title: "TV",
      icon: "https://res.cloudinary.com/du1jrse2t/image/upload/v1699361364/tv.441434c387d8fb9c6982d90f26feba65_b3rmem.svg",
    },
    {
      key: "wifi",
      title: "Wifi",
      icon: "https://res.cloudinary.com/du1jrse2t/image/upload/v1699361382/wifi.a4f1f08a649bfc3f0a5ed5993e394ece_itkucp.svg",
    },
    {
      key: "airconditioner",
      title: "Airconditioner",
      icon: "https://res.cloudinary.com/du1jrse2t/image/upload/v1699361399/air-conditioning.8f69fec65c1dfee252332bf7dda4470a_xxgrmr.svg",
    },
    {
      key: "kitchen",
      title: "Kitchen",
      icon: "https://res.cloudinary.com/du1jrse2t/image/upload/v1699361373/kitchen.6fc00f29bc23d885e8dbc278de45d01f_prv0go.svg",
    },
    {
      key: "paid",
      title: "Paid parking off premises",
      icon: "https://res.cloudinary.com/du1jrse2t/image/upload/v1699361404/paid-parking-off-premises.501b8f07d5fde69557bd8c3e5f1de4c0_f0iyv9.svg",
    },
    { key: "cabin", title: "Cabin", icon: "/icons/apartment.svg" },
    { key: "castle", title: "Castle", icon: "/icons/apartment.svg" },
    { key: "cave", title: "Cave", icon: "/icons/apartment.svg" },
    { key: "dome", title: "Dome", icon: "/icons/apartment.svg" },
  ];

  return (
    <section className="step-place-offer">
      <div className="option-grid">
        {placeOptions.map((place) => (
          <OptionBox
            key={place.key}
            icon={place.icon ? <img src={place.icon} /> : ""}
            title={place.title}
            description=""
            isSelected={
              isMulti
                ? selectedTypes.includes(place.key)
                : selectedTypes === place.key
            }
            onClick={() => handleSelect(place.key)}
            style={{ "--btn-width": "220px", "--btn-border": "2px" }}
          />
        ))}
      </div>
    </section>
  );
}
