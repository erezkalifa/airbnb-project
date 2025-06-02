import { OptionBox } from "./OptionBox.jsx";
import { placeTypes } from "./placeTypes.jsx";

export function StepPlaceType({ selectedType, onSelect, isMulti = false }) {
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
      <div className="place-type-options">
        <div className="title"> Which of these best describes your place?</div>
        <div className="option-grid">
          {placeTypes.map(({ key, svg }) => (
            <OptionBox
              key={key}
              icon={svg}
              title={key.charAt(0).toUpperCase() + key.slice(1)}
              description=""
              isSelected={isSelected(key)}
              onClick={() => handleSelect(key)}
              style={{ "--btn-width": "220px", "--btn-border": "2px" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
