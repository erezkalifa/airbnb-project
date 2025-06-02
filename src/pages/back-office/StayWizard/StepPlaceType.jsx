import { OptionBox } from "./OptionBox";

export function StepPlaceType({ selectedType, onSelect, isMulti = false }) {
  const placeTypes = [
    "house",
    "apartment",
    "barn",
    "bed&breakfest",
    "boat",
    "cabin",
    "castle",
    "cave",
    "dome",
  ];

  const handleSelect = (type) => {
    if (isMulti) {
      onSelect((prev) =>
        prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
      );
    } else {
      onSelect(type);
    }
  };

  const isSelected = (type) =>
    isMulti ? selectedType.includes(type) : selectedType === type;

  return (
    <section className="step-place-type">
      <h2>Which of these best describes your place?</h2>
      <div className="place-type-options">
        <div className="option-grid">
          {placeTypes.map((type) => (
            <OptionBox
              key={type}
              icon={<img src="/icons/apartment.svg" />}
              title={type.charAt(0).toUpperCase() + type.slice(1)}
              description=""
              isSelected={isSelected(type)}
              onClick={() => handleSelect(type)}
              style={{ "--btn-width": "220px", "--btn-border": "2px" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
