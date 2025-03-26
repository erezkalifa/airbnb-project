import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";

export const stayService = {
  query,
};

const STAY_KEY = "stayDB";
_createStays();

function query(filterBy = {}) {
  return storageService.query(STAY_KEY)       
      .then(stays => {
      if (filterBy.txt) {
          const regExp = new RegExp(filterBy.txt, 'i')
          stays = stays.filter(stay => regExp.test(stay.name))
      }

      return stays
  })
}

function save(stay) {
  if (stay.id) {
      return storageService.put(STAY_KEY, stay)
  } else {
      return storageService.post(STAY_KEY, stay)
  }
}

function getRandomLocation(id) {
  const locations = [
    { country: "Portugal", countryCode: "PT", city: "Lisbon", lat: 38.7169, lng: -9.1399 },
    { country: "Spain", countryCode: "ES", city: "Barcelona", lat: 41.3851, lng: 2.1734 },
    { country: "France", countryCode: "FR", city: "Paris", lat: 48.8566, lng: 2.3522 },
    { country: "Italy", countryCode: "IT", city: "Rome", lat: 41.9028, lng: 12.4964 },
    { country: "Germany", countryCode: "DE", city: "Berlin", lat: 52.52, lng: 13.405 },
    { country: "United Kingdom", countryCode: "GB", city: "London", lat: 51.5074, lng: -0.1278 }
  ];
  const streets = ["Kombo St", "Main St", "Elm St", "Maple Ave", "Sunset Blvd", "Ocean Dr"];
  const location = locations[id % locations.length];
  const street = streets[id % streets.length];
  return {
    country: location.country,
    countryCode: location.countryCode,
    city: location.city,
    address: `${Math.floor(Math.random() * 1000)} ${street}`,
    lat: location.lat + (Math.random() * 0.1 - 0.05),
    lng: location.lng + (Math.random() * 0.1 - 0.05)
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
  const amenitiesList = ["TV", "Wifi", "Kitchen", "Smoking allowed", "Pets allowed", "Cooking basics", "Air conditioning", "Pool", "Gym", "Parking", "Breakfast included"];
  const labelsList = ["Top of the world", "Trending", "Play", "Tropical", "Cozy", "Luxury", "Budget", "Seaside", "Mountain View", "Downtown"];
  const fullNames = ["Davit Pok", "Alexandra Mendez", "Johnathan Brooks", "Sophie Richards", "Maria Vasquez", "Ethan Clark", "Isabella Tan", "David Fisher", "Charlotte Evans", "Oliver Harris", "Grace Turner", "Maximilian Lee", "Emma Foster", "Lucas Martin", "Sophia Wang", "Benjamin Wright", "Mia Johnson", "Henry Kim", "Chloe Stewart", "William Scott"];

  return {
    _id: utilService.makeId(),
    name: `Stay ${id}`,
    type: "House",
    imgUrls: [
      "https://picsum.photos/200/300?random=1",
      "https://picsum.photos/200/300?random=2"
    ],
    price: Math.floor(Math.random() * 200) + 50, // Random price between 50-250
    summary: "Fantastic duplex apartment...",
    capacity: Math.floor(Math.random() * 6) + 2, // Random capacity between 2-8
    amenities: getRandomItems(amenitiesList, Math.floor(Math.random() * 5) + 3),
    labels: getRandomItems(labelsList, Math.floor(Math.random() * 3) + 2),
    host: {
      _id: `hostUser-${id}`,
      fullname: getRandomName(fullNames),
      imgUrl: `https://i.pravatar.cc/150?img=${id % 10 + 1}`
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
          imgUrl: `https://i.pravatar.cc/150?img=${(id + 5) % 10 + 1}` // Different avatar for the reviewer
        }
      }
    ],
    likedByUsers: ["mini-user"]
  };
}


function _createStays() {
  let stays = utilService.loadFromStorage(STAY_KEY);

  if (!stays || !stays.length) {
    stays = [];
    for (let i = 0; i < 20; i++) {
      stays.push(_createStay(i))
  }

    utilService.saveToStorage(STAY_KEY, stays);
  }
}
