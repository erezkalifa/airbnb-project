import { reservationService } from "../services/reservation.service";
import { useState, useEffect } from "react";

export function Reservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    async function loadReservations() {
      try {
        const res = await reservationService.query();
        if (res && Array.isArray(res)) {
          setReservations(res);
        }
      } catch (error) {
        console.error("Error loading reservations:", error);
      }
    }

    loadReservations();
  }, []);

  return (
    <section className="reservations">
      <h2>{reservations.length} Reservations</h2>
      <table className="reservations-table">
        <thead>
          <tr>
            <th>Guest</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Guests</th>
            <th>Total Price</th>
            <th className="action">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res, idx) => (
            <tr key={idx}>
              <td className="host-cell">
                {res.host?.pictureUrl ? (
                  <img
                    src={res.host.pictureUrl}
                    alt="Host Avatar"
                    className="avatar"
                  />
                ) : (
                  <div className="avatar-placeholder">
                    {res.host?.fullname?.charAt(0) || "?"}
                  </div>
                )}
                <span>{res.host?.fullname || "Unknown"}</span>
              </td>
              <td>{new Date(res.checkIn).toLocaleDateString("en-GB")}</td>
              <td>{new Date(res.checkOut).toLocaleDateString("en-GB")}</td>
              <td>{res.guests}</td>
              <td>${res.totalPrice}</td>
              <td>
                <button className="btn-approve">Approve</button>
                <button className="btn-reject">Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
