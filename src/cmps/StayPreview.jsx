export function StayPreview({ stay }) {
  return (
    <div className="stay-card">
      <div className="stay-card-img-container">
        <img
          src="https://a0.muscache.com/im/pictures/miso/Hosting-5264493/original/10d2c21f-84c2-46c5-b20b-b51d1c2c971a.jpeg?im_w=720"
          alt="Windmill"
          className="stay-card-img"
        />
      </div>
      <div className="stay-card-info">
        <div className="stay-card-title-row">
          <span className="stay-card-location">{`${stay.loc.country}, ${stay.loc.city}`}</span>
          <span className="stay-card-rating">{`${4}`}</span>
        </div>
        <div className="stay-card-distance">5000 kilometers away</div>
        <div className="stay-card-dates">jan 15-29</div>
        <div className="stay-card-price">
          <span className="night">{`${stay.price}€`}</span>
        </div>
      </div>
    </div>
  );
}
