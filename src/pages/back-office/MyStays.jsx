import { useEffect, useState } from "react";
import { stayService } from "../../services/stay.service.js";
import { useDispatch, useSelector } from "react-redux";
import { userService } from "../../services/user.service.js";
import { SET_FILTER_BY } from "../../store/stay/stay.reducers.js";
import { UpperHeader } from "../../cmps/UpperHeader.jsx";

export function MyStays() {
  const dispatch = useDispatch();
  const [userStays, setUserStays] = useState([]);
  const loggedInUser = useSelector((storeState) => storeState.userModule.user);
  const filterBy = useSelector((storeState) => storeState.stayModule.filterBy);

  useEffect(() => {
    getUserStays();
  }, []);

  async function getUserStays() {
    if (!loggedInUser?._id) return;
    const userId = loggedInUser?._id;
    // console.log(userId);
    if (!userId) return;

    const updatedFilter = {
      ...filterBy,
      ownerId: userId,
    };

    dispatch({ type: SET_FILTER_BY, filterBy: updatedFilter });

    try {
      const userStays = await stayService.query(updatedFilter);
      // console.log("User stays:", userStays);
      setUserStays(userStays);
    } catch (err) {
      console.error("Failed to load user stays", err);
    }
  }

  const sampleStay = {
    _id: "622f337a75c7d36e498aaafb",
    name: "Fresh and modern 1BR in Bed-Stuy",
    imgUrls: [
      "https://res.cloudinary.com/dmtlr2viw/image/upload/v1663436912/xle8ueqxjeazbs4bp09p.jpg",
    ],
    price: 79,
    isActive: true,
    loc: {
      city: "New York",
      country: "United States",
    },
    reviews: [
      { txt: "Amazing place!" },
      { txt: "Super clean." },
      { txt: "Great location." },
    ],
  };

  return (
    <section className="my-stays-page">
      <UpperHeader />
      <h2 className="section-title">My Stays</h2>
      <div className="stays-grid">
        {userStays.map((stay) => (
          <div className="stay-card" key={stay._id}>
            <div className="img">
              <img
                src={stay.imgUrls?.[0] || "https://via.placeholder.com/300"}
                alt="Stay preview"
                className="stay-img"
              />
            </div>
            <div className="stays-details">
              <div className="stay-header">
                <h3 className="stay-title">{stay.name}</h3>
                <p className="stay-location">
                  {stay.loc?.city}, {stay.loc?.country}
                </p>
              </div>
              <div className="stay-info">
                <p className="stay-price">${stay.price} / night</p>
                <p
                  className={`stay-status ${
                    stay.isActive ? "active" : "inactive"
                  }`}
                >
                  {stay.isActive ? "Active" : "Inactive"}
                </p>
                <p className="stay-orders">
                  {stay.reviews?.length || 0} Orders
                </p>
              </div>
              <div className="stay-actions">
                <button className="primary-btn">Update</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
