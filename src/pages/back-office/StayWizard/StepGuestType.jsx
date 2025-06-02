import { OptionBox } from "./OptionBox";

export function StepGuestType({ selectedType, onSelect, isMulti = false }) {
  const guestTypes = [
    {
      key: "entireplace",
      title: "An Entire Place",
      description: "Guests have the whole place for themselves.",
    },
    {
      key: "room",
      title: "A room",
      description:
        "Guests have their own room in a home, plus access to shared spaces.",
    },
    {
      key: "sharedroom",
      title: "A shared room in a hostel",
      description: "Guests sleep in a shared room.",
    },
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
    <section className="step-guest-type">
      <div className="title">What type of place will guests have?</div>
      <div className="guest-grid">
        {guestTypes.map(({ key, title, description, icon }) => (
          <OptionBox
            icon={icon}
            key={key}
            title={title}
            description={description}
            isSelected={isSelected(key)}
            btnStyle="wide-btn"
            onClick={() => handleSelect(key)}
          />
        ))}
      </div>
    </section>
  );
}
