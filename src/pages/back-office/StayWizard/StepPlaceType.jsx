import { OptionBox } from "./OptionBox";
export function StepPlaceType({ selectedType }) {
  const placeTypes = ["Entire place", "Private room", "Shared room"];

  return (
    <section className="step-place-type">
      <h2>Which of these best describes your place?</h2>
      <div className="place-type-options">
        <div className="option-grid">
          <OptionBox
            icon={<img src="/icons/home.svg" />}
            title="House"
            description="Guests have the entire place"
            isSelected={selectedType === "house"}
            onClick={() => onSelect("house")}
          />
          <OptionBox
            icon={<img src="/icons/apartment.svg" />}
            title="Apartment"
            description="Private area in a building"
            isSelected={selectedType === "apartment"}
            onClick={() => onSelect("apartment")}
          />
          {/* וכו' */}
        </div>
      </div>
    </section>
  );
}
