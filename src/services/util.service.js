export const utilService = {
  makeId,
  saveToStorage,
  loadFromStorage,
  debounce,
  animateCSS,
  normalizeStay,
  mapCustomFieldsToStay,
};

function makeId(length = 5) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function saveToStorage(key, value) {
  localStorage[key] = JSON.stringify(value);
}

function loadFromStorage(key, defaultValue = null) {
  var value = localStorage[key] || defaultValue;
  return JSON.parse(value);
}

function animateCSS(el, animation, options = {}) {
  const { isRemoveClass = true } = options;

  const prefix = "animate__";
  return new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    el.classList.add(`${prefix}animated`, animationName);

    function handleAnimationEnd(event) {
      event.stopPropagation();
      if (isRemoveClass)
        el.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    el.addEventListener("animationend", handleAnimationEnd, { once: true });
  });
}

export function debounce(func, delay) {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export function getExistingProperties(obj) {
  const truthyObj = {};
  for (const key in obj) {
    const val = obj[key];
    if (val || typeof val === "boolean") {
      truthyObj[key] = val;
    }
  }
  return truthyObj;
}

export function normalizeStay(stay) {
  const defaultStay = {
    name: "",
    type: "",
    imgUrls: [],
    price: 0,
    summary: "",
    capacity: 0,
    amenities: [],
    bathrooms: 1,
    bedrooms: 0,
    roomType: "Entire home/apt",
    host: {
      _id: "",
      fullname: "",
      location: "",
      about: "",
      thumbnailUrl: "",
      pictureUrl: "",
      isSuperhost: false,
      id: "",
    },
    loc: {
      country: "",
      countryCode: "",
      city: "",
      address: "",
      lat: 0,
      lan: 0,
    },
    reviews: [],
    likedByUsers: [],
    labels: [],
    extraInfo: [],
    availableFrom: "",
    availableTo: "",
    rate: 0,
  };

  const normalized = { ...defaultStay, ...stay };

  if (typeof normalized.capacity !== "number") {
    normalized.capacity = defaultStay.capacity;
  }

  if (!Array.isArray(normalized.imgUrls) || normalized.imgUrls.length === 0) {
    normalized.imgUrls = [
      "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437021/cw6mtrxza5fzmmgxen4j.jpg",
      "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436334/nqgdwv3ljfkrbvynoetv.jpg",
      "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436410/shdfxkcohvm8beh5rkar.jpg",
      "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436928/ouvft4oeavr7ceeha4gk.jpg",
      "http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436897/iz1ik9nibj3sobzrqomf.jpg",
    ];
  }

  normalized.host = { ...defaultStay.host, ...(stay.host || {}) };
  normalized.loc = { ...defaultStay.loc, ...(stay.loc || {}) };

  normalized.reviews = Array.isArray(stay.reviews) ? stay.reviews : [];
  normalized.likedByUsers = Array.isArray(stay.likedByUsers)
    ? stay.likedByUsers
    : [];
  normalized.labels = Array.isArray(stay.labels) ? stay.labels : [];
  normalized.extraInfo = Array.isArray(stay.extraInfo) ? stay.extraInfo : [];

  return normalized;
}

export function mapCustomFieldsToStay(stay) {
  const normalized = { ...stay };

  if (stay.basics) {
    if (!("capacity" in stay) && typeof stay.basics.guests === "number")
      normalized.capacity = stay.basics.guests;

    if (!("bedrooms" in stay) && typeof stay.basics.bedrooms === "number")
      normalized.bedrooms = stay.basics.bedrooms;

    if (!("bathrooms" in stay) && typeof stay.basics.bathrooms === "number")
      normalized.bathrooms = stay.basics.bathrooms;
  }

  if (stay.address && !stay.loc) {
    normalized.loc = {
      address: stay.address.street || "",
      city: stay.address.city || "",
      country: "Israel",
      countryCode: "IL",
      lat: 0,
      lan: 0,
    };
  }

  if (stay.listing) {
    if (!("name" in stay)) normalized.name = stay.listing.title || "";
    if (!("summary" in stay))
      normalized.summary = stay.listing.description || "";
    if (!("price" in stay)) normalized.price = stay.listing.price || 0;
  }

  if (stay.guestType && !stay.roomType) {
    normalized.roomType =
      stay.guestType === "entireplace"
        ? "Entire home/apt"
        : stay.guestType === "room"
        ? "Private room"
        : "Shared room";
  }

  return normalized;
}
