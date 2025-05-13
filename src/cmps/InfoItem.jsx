export function InfoItem({ icon, title, description }) {
  return (
    <div className="extra-info">
      <div className="key-svg">{icon}</div>
      <div>
        <div className="top-text">{title}</div>
        <div className="bottom-text">{description}</div>
      </div>
    </div>
  );
}
