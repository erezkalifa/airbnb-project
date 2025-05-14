import { OrderCard } from "../cmps/stayDetails/OrderCard.jsx"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { stayService } from "../services/stay.service.js"

export function StayDetails() {
  const { stayId } = useParams()
  const [stay, setStay] = useState(null)
  const [showAllAmenities, setShowAllAmenities] = useState(false)

  useEffect(() => {
    async function loadStay() {
      const fetchedStay = await stayService.getById(stayId)
      setStay(fetchedStay)
    }
    loadStay()
  }, [stayId])

  if (!stay) return <div>Loading...</div>

  const amenitiesToShow = showAllAmenities ? stay.amenities : stay.amenities.slice(0, 10)

  return (
    <section className="stay-details">
      <div className="container">
        <div className="img-wrapper">
          <div className="img-section">
            {stay.imgUrls.slice(0, 5).map((url, idx) => (
              <img key={idx} className={`img${idx + 1}`} src={url} alt={`stay image ${idx + 1}`} />
            ))}
          </div>
        </div>

        <div className="middle-section">
          <div className="main-content">
            <div className="stay-main-layout">
              <div className="first-col">
                <div className="place-details">
                  <div className="place">{stay.name} in {stay.loc.city}, {stay.loc.country}</div>
                  <div className="guests">
                    {stay.capacity} guests · {stay.bedrooms} bedroom{stay.bedrooms !== 1 ? 's' : ''} · {stay.bathrooms} bath{stay.bathrooms !== 1 ? 's' : ''}
                  </div>
                  <div className="rate">
                    <span>★ 5.0 · {stay.reviews?.length || 0} reviews</span>
                  </div>
                </div>

                <div className="host-info">
                  <img className="host-avatar" src={stay.host?.pictureUrl} alt={stay.host?.fullname} />
                  <div className="host-text">
                    <div className="hosted-by">Hosted by <strong>{stay.host?.fullname}</strong></div>
                    <div className="host-meta">
                      <span className="superhost">Superhost</span>
                      <span className="dot">·</span>
                      <span className="months">6 months hosting</span>
                    </div>
                  </div>
                </div>

                {stay.extraInfo && stay.extraInfo.map((info, idx) => (
                  <div className="extra-info" key={idx}>
                    <div className="key-svg" dangerouslySetInnerHTML={{ __html: info.svg }} />
                    <div className="top-text">{info.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="amenities-section">
              <h2>What this place offers</h2>
              <div className="amenities-grid">
                {amenitiesToShow.map((amenity, idx) => (
                  <div key={idx} className="amenity-item">
                    <span className="amenity-icon"></span>
                    <span className="amenity-label">{amenity}</span>
                  </div>
                ))}
              </div>
              {stay.amenities.length > 10 && (
                <button
                  className="show-all-btn"
                  onClick={() => setShowAllAmenities(!showAllAmenities)}
                >
                  {showAllAmenities ? 'Hide some amenities' : `Show all ${stay.amenities.length} amenities`}
                </button>
              )}
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
