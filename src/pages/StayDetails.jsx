import { OrderCard } from "../cmps/stayDetails/OrderCard.jsx"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { stayService } from "../services/stay.service.js"

export function StayDetails() {
  const { stayId } = useParams()
  const [stay, setStay] = useState(null)

  useEffect(() => {
    async function loadStay() {
      const fetchedStay = await stayService.getById(stayId)
      setStay(fetchedStay)
    }
    loadStay()
  }, [stayId])

  if (!stay) return <div>Loading...</div>

  return (
    <section className="stay-details">
      <div className="container">
        <div className="img-section">
          {stay.imgUrls.slice(0, 5).map((url, idx) => (
            <img key={idx} className={`img${idx + 1}`} src={url} alt={`stay image ${idx + 1}`} />
          ))}
        </div>

        <div className="middle-section">
          <div className="main-content">
            <div className="stay-main-layout">
              <div className="first-col">
                <div className="place-details">
                  <div className="place">{stay.name} , {stay.loc.country}</div>
                  <div className="guests">
                    {stay.capacity} guests · {stay.bedrooms} bedroom{stay.bedrooms !== 1 ? 's' : ''} · {stay.bathrooms} bath{stay.bathrooms !== 1 ? 's' : ''}
                  </div>
                  <div className="rate" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ height: "16px", width: "16px", fill: "currentcolor" }}>
                      <path d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path>
                    </svg>
                    5.0 · {stay.reviews?.length || 0} reviews
                  </div>
                </div>

                <div className="host-info">
                  <img className="host-avatar" src={stay.host?.pictureUrl} alt={stay.host?.fullname} />
                  <div className="host-text">
                    <div className="hosted-by">Hosted by <strong>{stay.host?.fullname}</strong></div>
                    <div className="host-meta">
                      <span className="superhost">Superhost</span>
                      <span className="dot"> · </span>
                      <span className="months">6 months hosting</span>
                    </div>
                  </div>
                </div>

                {stay.extraInfo?.map((info, idx) => (
                  <div className="extra-info" key={idx}>
                    <div className="key-svg" dangerouslySetInnerHTML={{ __html: info.svg }} />
                    <div>
                      <div className="top-text">{info.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="amenities-section">
              <h2>What this place offers</h2>
              <div className="amenities-grid">
                {stay.amenities.map((amenity, idx) => (
                  <div key={idx} className="amenity-item">
                    <span className="amenity-icon"></span>
                    <span className="amenity-label">{amenity}</span>
                  </div>
                ))}
              </div>
              <button className="show-all-btn">Show all {stay.amenities.length} amenities</button>
            </div>
          </div>

          <div className="order-card-wrapper">
            <OrderCard stay={stay} />
          </div>
        </div>
      </div>
    </section>
  )
}