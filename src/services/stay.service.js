import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";
import Axios from "axios";

const axios = Axios.create({
  withCredentials: true,
});

const BASE_URL =
  process.env.NODE_ENV !== "development"
    ? "/api/stay/"
    : "http://localhost:3030/api/stay/";

export const stayService = {
  query,
  getById,
  remove,
  save,
  addMsg,
  removeMsg,
  getLabels,
  getDefaultFilter,
};

const testImages = [
  [
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-644734357315485435/original/cbcddebb-daab-4d4e-9ed4-a47c9629850b.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-644734357315485435/original/7d56e27f-a107-4b88-a69c-d4bf94af6c95.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-644734357315485435/original/8c25a06d-daff-46d3-a03b-c89d31daf341.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-644734357315485435/original/20d13543-afde-41c6-9ed0-958b8c013627.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-644734357315485435/original/9e2452cc-cff8-4755-a176-47148b357f93.jpeg?im_w=720",
  ],
  [
    "https://a0.muscache.com/im/pictures/miso/Hosting-986181871372571758/original/97bb637c-e484-44fa-baf4-5240ff932438.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-986181871372571758/original/822de8a0-61d2-4d7d-86b9-bd7cd9f532cf.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/miso/Hosting-986181871372571758/original/9ed6f46e-6f5c-4b40-b1fe-2be1bafbdaa2.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/miso/Hosting-986181871372571758/original/0739ef6f-324f-4dc5-8c3b-044fa93d98c2.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/miso/Hosting-986181871372571758/original/3641658a-10f1-4ae1-bf9c-aa4c4541f7f5.jpeg?im_w=720",
  ],
  [
    "https://a0.muscache.com/im/pictures/miso/Hosting-9611320/original/7c1a3f39-e97c-4692-a26b-558b7d0810c8.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-9611320/original/4cf8f984-a28a-4e89-8f82-7bcc1ab85ea0.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/miso/Hosting-9611320/original/08353147-caee-423b-a389-377b664b45df.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/miso/Hosting-9611320/original/cffc704a-0c20-4ca3-bfc6-53fcf1c8f398.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/miso/Hosting-9611320/original/9be590f3-b27f-4ad2-8ebe-58fc06d13bb6.jpeg?im_w=720",
  ],
  [
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1079700256762624927/original/96a14516-69b0-4c8d-9229-77ebc85647f6.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1079700256762624927/original/1bf35ffc-9900-47af-8749-4c9b0cc6def2.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1079700256762624927/original/370fa0fb-6562-402a-8159-10d63d3162c0.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1079700256762624927/original/2716f61a-88ab-4136-b4c9-c90ab44a2a8d.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1079700256762624927/original/5370006a-16d1-456e-929b-41c43590c949.jpeg?im_w=720",
  ],
  [
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-1051370198732772949/original/99fb9e1d-f9c4-4fd7-a107-6a6640a97848.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-1051370198732772949/original/bcdf40ba-2e65-4845-8a05-a1593b1b40df.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-1051370198732772949/original/35aa1b0f-b24a-45f7-bb79-1d79930e6102.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-1051370198732772949/original/35aa1b0f-b24a-45f7-bb79-1d79930e6102.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-1051370198732772949/original/6e76a4e7-67bb-47de-ae72-6945e3f79e4c.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-1051370198732772949/original/bdca753e-096d-4313-b4c9-b1a7a2952289.jpeg?im_w=720",
  ],
  [
    "https://a0.muscache.com/im/pictures/9ade72ce-78c5-43de-948d-2c9d93981b9f.jpg?im_w=1200",
    "https://a0.muscache.com/im/ml/photo_enhancement/pictures/ff7dfbf1-a58a-4195-a282-f2d87b1afe07.jpg?im_w=720",
    "https://a0.muscache.com/im/ml/photo_enhancement/pictures/miso/Hosting-28933518/original/a0b5c479-9c37-4a69-a8ed-de916f7dac2b.jpeg?im_w=720",
    "https://a0.muscache.com/im/ml/photo_enhancement/pictures/6fec1995-f042-4902-83a8-9795821b6204.jpg?im_w=720",
    "https://a0.muscache.com/im/ml/photo_enhancement/pictures/0771ea1d-148a-4bd2-8069-713149c9b6d5.jpg?im_w=720",
  ],
];

const API = "/api/stay";
// _createStays();

async function query(filterBy = {}) {
  try {
    const { data: stays } = await axios.get(BASE_URL, { params: filterBy });
    return stays;
  } catch (err) {
    console.error("Failed to load stays:", err);
    throw err;
  }
}

async function getById(stayId) {
  try {
    const { data: stay } = await axios.get(BASE_URL + stayId);
    return stay;
  } catch (err) {
    console.error(`Failed to get stay ${stayId}:`, err);
    throw err;
  }
}

async function save(stay) {
  const method = stay._id ? "put" : "post";
  const url = BASE_URL + (stay._id || "");
  try {
    const { data: savedStay } = await axios[method](url, stay);
    return savedStay;
  } catch (err) {
    console.error(`Failed to ${method} stay:`, err);
    throw err;
  }
  // if (stay.id) {
  //   return storageService.put(STAY_KEY, stay);
  // } else {
  //   return storageService.post(STAY_KEY, stay);
  // }
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
