import Axios from "axios";

const axios = Axios.create({
  withCredentials: true,
});

const BASE_URL =
  process.env.NODE_ENV !== "development"
    ? "/api/reservation/"
    : "http://localhost:3030/api/reservation/";

export const reservationService = {
  query,
  getById,
  save,
  remove,
  getDefaultFilter,
};

async function query(filterBy = {}) {
  try {
    const { data: reservations } = await axios.get(BASE_URL, {
      params: filterBy,
    });
    return reservations;
  } catch (err) {
    console.error("Failed to load reservations:", err);
    throw err;
  }
}

async function getById(reservationId) {
  try {
    const { data: reservation } = await axios.get(BASE_URL + reservationId);
    return reservation;
  } catch (err) {
    console.error(`Failed to get reservation ${reservationId}:`, err);
    throw err;
  }
}

async function save(reservation) {
  const method = reservation._id ? "put" : "post";
  const url = BASE_URL + (reservation._id || "");
  try {
    const { data: savedReservation } = await axios[method](url, reservation);
    return savedReservation;
  } catch (err) {
    console.error(`Failed to ${method} reservation:`, err);
    throw err;
  }
}

async function remove(reservationId) {
  try {
    return await axios.delete(BASE_URL + reservationId);
  } catch (err) {
    console.error(`Failed to remove reservation ${reservationId}:`, err);
    throw err;
  }
}

function getDefaultFilter() {
  return {
    userId: "",
    stayId: "",
    from: null,
    to: null,
    guests: 1,
    status: "", // e.g., 'pending', 'approved', 'cancelled'
  };
}
