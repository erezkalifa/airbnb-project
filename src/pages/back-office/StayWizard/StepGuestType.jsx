import { OptionBox } from "./OptionBox";

export function StepGuestType({ selectedType, onSelect }) {
  return (
    <section className="step-guest-type">
      <h2>What type of place will guests have?</h2>
      <div className="grid">
        <OptionBox
          icon={""}
          title="An Entire Place"
          description="Guests have the whole place for themselves."
          isSelected={selectedType === "entireplace"}
          btnStyle={"wide-btn"}
          onClick={() => onSelect("entireplace")}
        />{" "}
        <OptionBox
          icon={""}
          title="A room"
          description="Guests have their own room in a home. plus access to shared spaces."
          isSelected={selectedType === "room"}
          btnStyle={"wide-btn"}
          onClick={() => onSelect("room")}
        />{" "}
        <OptionBox
          icon={""}
          title="A shared room in a hostel"
          description="Guests sleep in a shared room"
          isSelected={selectedType === "sharedroom"}
          btnStyle={"wide-btn"}
          onClick={() => onSelect("sharedroom")}
        />{" "}
      </div>
    </section>
  );
}
