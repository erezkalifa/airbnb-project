import { StayPreview } from "./stayPreview";

export function StayList({ stays }) {
  return (
    <ul className="stay-list">
      {stays.map((stay, idx) => {
        return (
          <li className="stay-preview" key={idx}>
            <StayPreview stay={stay} />
          </li>
        );
      })}
    </ul>
  );
}
