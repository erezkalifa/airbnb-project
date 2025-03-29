import { ImageSlider } from "./ImageSlider"

export function StayPreview({ stay }) {


  if (stay == null || stay.imgUrls.length == 0)
    return (<div>Loading ...</div>)

  console.log("URL not null: " + JSON.stringify(stay))

  return (
    <div className="stay-preview">

      <ImageSlider urls={stay.imgUrls}/>
      <div style={{ fontSize: "12px", padding: "3px 10px", fontWeight: "bold" }}>
        Bat Yam, Israel
      </div>
      <div style={{ fontSize: "12px", padding: "0px 10px"}}>Near Promenade Bat Yam</div>
      <div style={{ fontSize: "12px", padding: "0px 10px"}}>Apr 5 - 10</div>
      <div style={{ fontSize: "12px", padding: "0px 10px"}}>₪{stay.price}</div>
    </div>
  );
}
