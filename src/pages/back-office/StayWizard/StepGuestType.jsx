import { OptionBox } from "./OptionBox";

export function StepGuestType({ selectedType, onSelect, isMulti = false }) {
  const guestTypes = [
    {
      key: "entireplace",
      title: "An Entire Place",
      description: "Guests have the whole place for themselves.",
      icon: (
        <svg
          viewBox="0 0 45 45"
          width="45"
          height="45"
          preserveAspectRatio="xMidYMid meet"
          style={{
            width: "100%",
            height: "100%",
            transform: "translate3d(0px, 0px, 0px)",
            contentVisibility: "visible",
          }}
        >
          <defs>
            <clipPath id="clip-building">
              <rect width="45" height="45" x="0" y="0" />
            </clipPath>
          </defs>
          <g clipPath="url(#clip-building)">
            <g transform="translate(0.875,8)">
              <g transform="translate(16,14.5)">
                <path
                  fill="#222"
                  d="M1.954 -13.719C1.954 -13.719 2.129 -13.555 2.129 -13.555C2.129 -13.555 15.201 -0.713 15.201 -0.713C15.201 -0.713 13.799 0.713 13.799 0.713C13.799 0.713 11.999 -1.055 11.999 -1.055C11.999 -1.055 12 12.5 12 12.5C12 13.554 11.184 14.418 10.149 14.494C10.149 14.494 10 14.5 10 14.5C10 14.5 -10 14.5 -10 14.5C-11.054 14.5 -11.918 13.684 -11.995 12.649C-11.995 12.649 -12 12.5 -12 12.5C-12 12.5 -12.001 -1.054 -12.001 -1.054C-12.001 -1.054 -13.799 0.713 -13.799 0.713C-13.799 0.713 -15.201 -0.713 -15.201 -0.713C-15.201 -0.713 -2.143 -13.542 -2.143 -13.542C-1.03 -14.678 0.765 -14.741 1.954 -13.719ZM-0.632 -12.215C-0.632 -12.215 -0.728 -12.128 -0.728 -12.128C-0.728 -12.128 -10.001 -3.019 -10.001 -3.019C-10.001 -3.019 -10 12.5 -10 12.5C-10 12.5 -5.001 12.499 -5.001 12.499C-5.001 12.499 -5 2.5 -5 2.5C-5 1.446 -4.184 0.582 -3.149 0.505C-3.149 0.505 -3 0.5 -3 0.5C-3 0.5 3 0.5 3 0.5C4.054 0.5 4.918 1.316 4.995 2.351C4.995 2.351 5 2.5 5 2.5C5 2.5 4.999 12.499 4.999 12.499C4.999 12.499 10 12.5 10 12.5C10 12.5 9.999 -3.02 9.999 -3.02C9.999 -3.02 0.7 -12.156 0.7 -12.156C0.336 -12.513 -0.232 -12.535 -0.632 -12.215ZM3 2.5C3 2.5 -3 2.5 -3 2.5C-3 2.5 -3.001 12.499 -3.001 12.499C-3.001 12.499 2.999 12.499 2.999 12.499C2.999 12.499 3 2.5 3 2.5Z"
                />
              </g>
            </g>
          </g>
        </svg>
      ),
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
      <h2>What type of place will guests have?</h2>
      <div className="grid">
        {guestTypes.map(({ key, title, description, icon }) => (
          <OptionBox
            icon={
              <svg
                viewBox="0 0 45 45"
                width="45"
                height="45"
                preserveAspectRatio="xMidYMid meet"
                style={{
                  width: "100%",
                  height: "100%",
                  transform: "translate3d(0px, 0px, 0px)",
                  contentVisibility: "visible",
                }}
              >
                <defs>
                  <clipPath id="clip-building">
                    <rect width="45" height="45" x="0" y="0" />
                  </clipPath>
                </defs>
                <g clipPath="url(#clip-building)">
                  <g transform="translate(0.875,8)">
                    <g transform="translate(16,14.5)">
                      <path
                        fill="#222"
                        d="M1.954 -13.719C1.954 -13.719 2.129 -13.555 2.129 -13.555C2.129 -13.555 15.201 -0.713 15.201 -0.713C15.201 -0.713 13.799 0.713 13.799 0.713C13.799 0.713 11.999 -1.055 11.999 -1.055C11.999 -1.055 12 12.5 12 12.5C12 13.554 11.184 14.418 10.149 14.494C10.149 14.494 10 14.5 10 14.5C10 14.5 -10 14.5 -10 14.5C-11.054 14.5 -11.918 13.684 -11.995 12.649C-11.995 12.649 -12 12.5 -12 12.5C-12 12.5 -12.001 -1.054 -12.001 -1.054C-12.001 -1.054 -13.799 0.713 -13.799 0.713C-13.799 0.713 -15.201 -0.713 -15.201 -0.713C-15.201 -0.713 -2.143 -13.542 -2.143 -13.542C-1.03 -14.678 0.765 -14.741 1.954 -13.719ZM-0.632 -12.215C-0.632 -12.215 -0.728 -12.128 -0.728 -12.128C-0.728 -12.128 -10.001 -3.019 -10.001 -3.019C-10.001 -3.019 -10 12.5 -10 12.5C-10 12.5 -5.001 12.499 -5.001 12.499C-5.001 12.499 -5 2.5 -5 2.5C-5 1.446 -4.184 0.582 -3.149 0.505C-3.149 0.505 -3 0.5 -3 0.5C-3 0.5 3 0.5 3 0.5C4.054 0.5 4.918 1.316 4.995 2.351C4.995 2.351 5 2.5 5 2.5C5 2.5 4.999 12.499 4.999 12.499C4.999 12.499 10 12.5 10 12.5C10 12.5 9.999 -3.02 9.999 -3.02C9.999 -3.02 0.7 -12.156 0.7 -12.156C0.336 -12.513 -0.232 -12.535 -0.632 -12.215ZM3 2.5C3 2.5 -3 2.5 -3 2.5C-3 2.5 -3.001 12.499 -3.001 12.499C-3.001 12.499 2.999 12.499 2.999 12.499C2.999 12.499 3 2.5 3 2.5Z"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            }
            key={key}
            title={title}
            description={description}
            isSelected={isSelected(key)}
            btnStyle="wide-btn"
            onClick={() => handleSelect(key)}
            // style={{ "--btn-width": "100%", "--btn-border": "2px" }}
          />
        ))}
      </div>
    </section>
  );
}
