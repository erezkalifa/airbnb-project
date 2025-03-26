export function StayPreview() {
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
          <span className="stay-card-location">location</span>
          <span className="stay-card-rating">Rating</span>
        </div>
        <div className="stay-card-distance">Distance</div>
        <div className="stay-card-dates">Dates</div>
        <div className="stay-card-price">
          <span className="night">Price</span>
        </div>
      </div>
    </div>
  );
}
