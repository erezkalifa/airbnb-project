import { ImageSlider } from "./ImageSlider"

export function StayPreview({ stay }) {


  if (stay == null || stay.imgUrls.length == 0)
    return (<div>Loading ...</div>)

  console.log("URL not null: " + JSON.stringify(stay.imgUrls))

  return (
    <div className="stay-preview">

      <ImageSlider urls={stay.imgUrls}/>
      {/* <img src={stay.imgUrls[0]} alt={stay.name} className="stay-preview-img" />
      <div className="stay-details">
        <h2 className="stay-location">{stay.loc.city}</h2>
        <p className="stay-description">{stay.description}</p>
        <p className="stay-dates">{stay.dates}</p>
        <div className="stay-price">
          <span>{stay.price} ₪ night</span>
        </div>
        <div className="stay-rating">
          <span>⭐ {stay.rating}</span>
        </div>
      </div> */}
    </div>
  );
}
