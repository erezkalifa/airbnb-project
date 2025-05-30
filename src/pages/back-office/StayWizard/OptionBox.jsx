export function OptionBox({
  icon,
  title,
  description,
  btnStyle,
  isSelected,
  onClick,
}) {
  console.log(isSelected);
  return (
    <div
      className={`option-box ${isSelected ? "selected" : ""} ${btnStyle}`}
      onClick={onClick}
    >
      <div className="option-content">
        <div className="option-text">
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
        <div className="option-icon">{icon}</div>
      </div>
    </div>
  );
}
