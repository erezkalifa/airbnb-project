import { OptionBox } from "./OptionBox";
export function StepPlaceType({ selectedType, onSelect }) {
  const placeTypes = ["Entire place", "Private room", "Shared room"];

  return (
    <section className="step-place-type">
      <h2>Which of these best describes your place?</h2>
      <div className="place-type-options">
        <div className="option-grid">
          <OptionBox
            icon={""}
            title="House"
            description=""
            isSelected={selectedType === "house"}
            onClick={() => onSelect("house")}
          />
          <OptionBox
            icon={<img src="/icons/apartment.svg" />}
            title="Apartment"
            description=""
            isSelected={selectedType === "apartment"}
            onClick={() => onSelect("apartment")}
          />
          <OptionBox
            icon={<img src="/icons/apartment.svg" />}
            title="Barn"
            description=""
            isSelected={selectedType === "barn"}
            onClick={() => onSelect("barn")}
          />
          <OptionBox
            icon={<img src="/icons/apartment.svg" />}
            title="Bed & Breakfest"
            description=""
            isSelected={selectedType === "bed&breakfest"}
            onClick={() => onSelect("bed&breakfest")}
          />
          <OptionBox
            icon={<img src="/icons/apartment.svg" />}
            title="Boat"
            description=""
            isSelected={selectedType === "boat"}
            onClick={() => onSelect("boat")}
          />
          <OptionBox
            icon={<img src="/icons/apartment.svg" />}
            title="Cabin"
            description=""
            isSelected={selectedType === "cabin"}
            onClick={() => onSelect("cabin")}
          />
          <OptionBox
            icon={<img src="/icons/apartment.svg" />}
            title="Castle"
            description=""
            isSelected={selectedType === "castlee"}
            onClick={() => onSelect("castle")}
          />
          <OptionBox
            icon={<img src="/icons/apartment.svg" />}
            title="Cave"
            description=""
            isSelected={selectedType === "cave"}
            onClick={() => onSelect("cave")}
          />
          <OptionBox
            icon={<img src="/icons/apartment.svg" />}
            title="Dome"
            description=""
            isSelected={selectedType === "dome"}
            onClick={() => onSelect("dome")}
          />
        </div>
      </div>
    </section>
  );
}
