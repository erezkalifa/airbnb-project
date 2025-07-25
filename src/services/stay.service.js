import { utilService } from "./util.service.js";
import Axios from "axios";

const axios = Axios.create({
  withCredentials: true,
});

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3030/api/stay/"
    : "https://airbnb-backend-egt6.onrender.com/api/stay/";

export const stayService = {
  query,
  getById,
  remove,
  save,
  addMsg,
  removeMsg,
  getLabels,
  getDefaultFilter,
  getFilterFromParams,
  applyFilter,
  getEmptyStay,
  getRandomLocation,
  getAddressLocation,
};

const API = "/api/stay";
// _createStays();

async function query(filterBy = {}, page = 1, pageSize = 10) {
  try {
    const params = { ...filterBy, page, pageSize };
    const { data: stays } = await axios.get(BASE_URL, { params });

    return stays;
  } catch (err) {
    console.error("Failed to load stays:", err);
    throw err;
  }
}

async function getById(stayId) {
  try {
    const { data: stay } = await axios.get(BASE_URL + stayId);
    console.log(stay);
    return stay;
  } catch (err) {
    console.error(`Failed to get stay ${stayId}:`, err);
    throw err;
  }
}

async function save(stay) {
  console.log(stay);
  const method = stay._id ? "put" : "post";

  const url = BASE_URL + (stay._id || "");
  try {
    const { data: savedStay } = await axios[method](url, stay);
    return savedStay;
  } catch (err) {
    console.error(`Failed to ${method} stay:`, err);
    throw err;
  }
}

async function remove(stayId) {
  try {
    return await axios.delete(BASE_URL + stayId);
  } catch (err) {
    console.error(`Failed to remove stay ${stayId}:`, err);
    throw err;
  }
}

function addMsg(stayId, msg) {
  return axios.post(`${API}/${stayId}/msg`, msg).then((res) => res.data);
}

function removeMsg(stayId, msgId) {
  return axios.delete(`${API}/${stayId}/msg/${msgId}`).then((res) => res.data);
}

function getRandomLocation(id) {
  const locations = [
    {
      country: "Portugal",
      countryCode: "PT",
      city: "Lisbon",
      lat: 38.7169,
      lng: -9.1399,
    },
    {
      country: "Spain",
      countryCode: "ES",
      city: "Barcelona",
      lat: 41.3851,
      lng: 2.1734,
    },
    {
      country: "France",
      countryCode: "FR",
      city: "Paris",
      lat: 48.8566,
      lng: 2.3522,
    },
    {
      country: "Italy",
      countryCode: "IT",
      city: "Rome",
      lat: 41.9028,
      lng: 12.4964,
    },
    {
      country: "Germany",
      countryCode: "DE",
      city: "Berlin",
      lat: 52.52,
      lng: 13.405,
    },
    {
      country: "United Kingdom",
      countryCode: "GB",
      city: "London",
      lat: 51.5074,
      lng: -0.1278,
    },
  ];
  const streets = [
    "Kombo St",
    "Main St",
    "Elm St",
    "Maple Ave",
    "Sunset Blvd",
    "Ocean Dr",
  ];
  const location = locations[id % locations.length];
  const street = streets[id % streets.length];
  return {
    country: location.country,
    countryCode: location.countryCode,
    city: location.city,
    address: `${Math.floor(Math.random() * 1000)} ${street}`,
    lat: location.lat + (Math.random() * 0.1 - 0.05),
    lng: location.lng + (Math.random() * 0.1 - 0.05),
  };
}

function getRandomItems(array, count) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getRandomName(namesArray) {
  const randomIndex = Math.floor(Math.random() * namesArray.length);
  return namesArray[randomIndex];
}

function _createStay(id) {
  const amenitiesList = [
    "TV",
    "Wifi",
    "Kitchen",
    "Smoking allowed",
    "Pets allowed",
    "Cooking basics",
    "Air conditioning",
    "Pool",
    "Gym",
    "Parking",
    "Breakfast included",
  ];
  const labelsList = [
    "Top of the world",
    "Trending",
    "Play",
    "Tropical",
    "Cozy",
    "Luxury",
    "Budget",
    "Seaside",
    "Mountain View",
    "Downtown",
  ];
  const fullNames = [
    "Davit Pok",
    "Alexandra Mendez",
    "Johnathan Brooks",
    "Sophie Richards",
    "Maria Vasquez",
    "Ethan Clark",
    "Isabella Tan",
    "David Fisher",
    "Charlotte Evans",
    "Oliver Harris",
    "Grace Turner",
    "Maximilian Lee",
    "Emma Foster",
    "Lucas Martin",
    "Sophia Wang",
    "Benjamin Wright",
    "Mia Johnson",
    "Henry Kim",
    "Chloe Stewart",
    "William Scott",
  ];

  return {
    _id: utilService.makeId(),
    name: `Stay ${id}`,
    type: "House",
    imgUrls: testImages[Math.floor(Math.random() * 6)],
    price: Math.floor(Math.random() * 200) + 50, // Random price between 50-250
    summary: "Fantastic duplex apartment...",
    capacity: Math.floor(Math.random() * 6) + 2, // Random capacity between 2-8
    amenities: getRandomItems(amenitiesList, Math.floor(Math.random() * 5) + 3),
    labels: getRandomItems(labelsList, Math.floor(Math.random() * 3) + 2),
    host: {
      _id: `hostUser-${id}`,
      fullname: getRandomName(fullNames),
      imgUrl: `https://i.pravatar.cc/150?img=${(id % 10) + 1}`,
    },
    loc: getRandomLocation(id),
    reviews: [
      {
        id: `r10${id}`,
        txt: "Very helpful hosts. Cooked traditional...",
        rate: Math.floor(Math.random() * 5) + 1, // Random rate between 1-5
        by: {
          _id: `u10${id + 1}`,
          fullname: `user${id + 1}`,
          imgUrl: `https://i.pravatar.cc/150?img=${((id + 5) % 10) + 1}`, // Different avatar for the reviewer
        },
      },
    ],
    likedByUsers: ["mini-user"],
  };
}

function _createStays() {
  let stays = utilService.loadFromStorage(STAY_KEY);

  if (!stays || !stays.length) {
    stays = [];
    for (let i = 0; i < 20; i++) {
      stays.push(_createStay(i));
    }

    utilService.saveToStorage(STAY_KEY, stays);
  }
}

function getLabels() {
  return [
    {
      img: "https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg",
      name: "Countryside",
    },
    {
      img: "https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg",
      name: "OMG",
    },
    {
      img: "https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg",
      name: "Cabins",
    },
    {
      img: "https://a0.muscache.com/pictures/ee9e2a40-ffac-4db9-9080-b351efc3cfc4.jpg",
      name: "Tropical",
    },
    {
      img: "https://a0.muscache.com/pictures/248f85bf-e35e-4dc3-a9a1-e1dbff9a3db4.jpg",
      name: "Top of the world",
    },
    {
      img: "https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
      name: "Amazing views",
    },
    {
      img: "https://a0.muscache.com/pictures/c0a24c04-ce1f-490c-833f-987613930eca.jpg",
      name: "National parks",
    },
    {
      img: "https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg",
      name: "Amazing pools",
    },
    {
      img: "https://a0.muscache.com/pictures/3271df99-f071-4ecf-9128-eb2d2b1f50f0.jpg",
      name: "Tiny homes",
    },
    {
      img: "https://a0.muscache.com/pictures/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg",
      name: "Rooms",
    },
    {
      img: "https://a0.muscache.com/pictures/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg",
      name: "Beach",
    },
    {
      img: "https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg",
      name: "Farms",
    },
    {
      img: "https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg",
      name: "Beachfront",
    },
    {
      img: "https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg",
      name: "Castles",
    },
    {
      img: "https://a0.muscache.com/pictures/4d4a4eba-c7e4-43eb-9ce2-95e1d200d10e.jpg",
      name: "Treehouses",
    },
    {
      img: "https://a0.muscache.com/pictures/78ba8486-6ba6-4a43-a56d-f556189193da.jpg",
      name: "Mansions",
    },
    {
      img: "https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg",
      name: "Design",
    },
    {
      img: "https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg",
      name: "Lakefront",
    },
    {
      img: "https://a0.muscache.com/pictures/9a2ca4df-ee90-4063-b15d-0de7e4ce210a.jpg",
      name: "Off-the-grid",
    },
    {
      img: "https://a0.muscache.com/pictures/ed8b9e47-609b-44c2-9768-33e6a22eccb2.jpg",
      name: "Iconic cities",
    },
    {
      img: "https://a0.muscache.com/pictures/60ff02ae-d4a2-4d18-a120-0dd274a95925.jpg",
      name: "Vineyards",
    },
    {
      img: "https://a0.muscache.com/pictures/a4634ca6-1407-4864-ab97-6e141967d782.jpg",
      name: "Lakes",
    },
    {
      img: "https://a0.muscache.com/pictures/c8bba3ed-34c0-464a-8e6e-27574d20e4d2.jpg",
      name: "Skiing",
    },
    {
      img: "https://a0.muscache.com/pictures/8e507f16-4943-4be9-b707-59bd38d56309.jpg",
      name: "Islands",
    },
    {
      img: "https://a0.muscache.com/pictures/33dd714a-7b4a-4654-aaf0-f58ea887a688.jpg",
      name: "Historical homes",
    },
  ];
}

function getDefaultFilter() {
  return {
    txt: "",
    city: "",
    minPrice: 0,
    maxPrice: 1000,
    bathrooms: 0,
    bedrooms: 0,
    capacity: 0,
    roomType: "",
    sortField: "",
    sortDir: 1,
    pageIdx: 0,
  };
}

function getFilterFromParams(searchParams) {
  const filterBy = {};
  searchParams.forEach((value, key) => {
    if (key.includes(".")) {
      const [parentKey, nestedKey] = key.split(".");
      filterBy[parentKey] = filterBy[parentKey] || {};

      // Convert to number if possible
      const numValue = Number(value);
      filterBy[parentKey][nestedKey] =
        !isNaN(numValue) && value.trim() !== "" ? numValue : value;
    } else {
      // Convert to number if possible
      const numValue = Number(value);
      filterBy[key] =
        !isNaN(numValue) && value.trim() !== "" ? numValue : value;
    }
  });

  return {
    city: filterBy.city || "",
    checkIn: filterBy.checkIn || "",
    checkOut: filterBy.checkOut || "",
    guests: filterBy.guests || {
      adults: 0,
      children: 0,
      infants: 0,
      pets: 0,
    },
    capacity:
      filterBy.capacity !== undefined && filterBy.capacity !== ""
        ? filterBy.capacity
        : null, // ✅ default to null
    labels: filterBy.labels || "",
  };
}

export function applyFilter(newFilter, setSearchParams, dispatch, setFilterBy) {
  const params = {};
  for (const key in newFilter) {
    const val = newFilter[key];
    if (typeof val === "object" && val !== null) {
      for (const nestedKey in val) {
        const nestedVal = val[nestedKey];
        if (nestedVal !== "" && nestedVal !== null) {
          params[`${key}.${nestedKey}`] = nestedVal;
        }
      }
    } else {
      if (val !== "" && val !== null) {
        params[key] = val;
      }
    }
  }

  if (Object.keys(params).length > 0) {
    setSearchParams(params);
  } else {
    setSearchParams({});
  }

  dispatch({ type: "SET_FILTER_BY", filterBy: newFilter });
  setFilterBy(newFilter);
  console.log("Final filterBy:", newFilter);
}

async function getAddressLocation(address) {
  try {
    const response = await axios.get(
      `${BASE_URL}stay/geocode?address=${encodeURIComponent(address)}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting location from address:", error);
    throw error;
  }
}

function getEmptyStay() {
  return {
    name: "",
    type: "",
    imgUrls: [],
    price: 0,
    summary: "",
    capacity: 0,
    amenities: [],
    roomType: "",
    loc: {
      country: "",
      countryCode: "",
      city: "",
      address: "",
      lat: 0,
      lng: 0,
    },
    reviews: [],
    likedByUsers: [],
    host: {
      _id: "",
      fullname: "",
      imgUrl: "",
    },
  };
}
