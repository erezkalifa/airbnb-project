import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";

export const stayService = {
  query,
};

const STORAGE_KEY = "stayDB";
_createStays();

function query(filterBy = {}) {
  return storageService.query(STORAGE_KEY);
}

function _createStays() {
  let stays = utilService.loadFromStorage(STORAGE_KEY);

  if (!stays || !stays.length) {
    stays = [
      {
        _id: "s101",
        name: "Ribeira Charming Duplex",
        type: "House",
        imgUrls: ["https://e26e9b.jpg", "otherImg.jpg"],
        price: 80.0,
        summary: "Fantastic duplex apartment...",
        capacity: 8,
        amenities: [
          "TV",
          "Wifi",
          "Kitchen",
          "Smoking allowed",
          "Pets allowed",
          "Cooking basics",
        ],
        labels: ["Top of the world", "Trending", "Play", "Tropical"],
        host: {
          _id: "u101",
          fullname: "Davit Pok",
          imgUrl:
            "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
        },
        loc: {
          country: "Portugal",
          countryCode: "PT",
          city: "Lisbon",
          address: "17 Kombo st",
          lat: -8.61308,
          lng: 41.1413,
        },
        reviews: [
          {
            id: "madeId",
            txt: "Very helpful hosts. Cooked traditional...",
            rate: 4,
            by: {
              _id: "u102",
              fullname: "user2",
              imgUrl: "/img/img2.jpg",
            },
          },
        ],
        likedByUsers: ["mini-user"],
      },
    ];
    utilService.saveToStorage(STORAGE_KEY, stays);
  }
}
