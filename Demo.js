useEffect(() => {
  dispatch(loadStays(filterBy)).catch((err) => console.log(err));
}, [filterBy]);

export function loadStays(filterBy = {}, page = 1, pageSize = 12) {
  return async (dispatch) => {
    try {
      const stays = await stayService.query(filterBy, page, pageSize);

      if (page === 1) {
        dispatch({ type: "SET_STAYS", stays });
      } else {
        dispatch({ type: "APPEND_STAYS", stays });
      }

      dispatch({ type: SET_FILTER_BY, filterBy });
      console.log(
        "🚀 ~ Loaded stays with filters:",
        filterBy,
        "and page:",
        page
      );
      return stays;
    } catch (err) {
      console.error("stay action -> Cannot load stays:", err);
      throw err;
    }
  };
}

async function query(filterBy = {}, page = 1, pageSize = 10) {
  try {
    const params = { ...filterBy, page, pageSize };
    const { data: stays } = await axios.get(BASE_URL, { params });
    console.log("stay service:", params);

    return stays;
  } catch (err) {
    console.error("Failed to load stays:", err);
    throw err;
  }
}

async function query(filterBy = {}) {
  try {
    const criteria = _buildCriteria(filterBy);

    const sort = _buildSort(filterBy);

    const collection = await dbService.getCollection("stay");

    const skip = (filterBy.page - 1) * filterBy.pageSize;

    // 🔎 Get the total number of matching stays
    const totalMatches = await collection.countDocuments(criteria);
    // console.log("Total stays matching criteria:", totalMatches);

    // 🔎 Check if the requested page has results
    if (skip >= totalMatches) {
      console.log(
        "Requested page exceeds available data. Returning empty array."
      );
      return [];
    }

    // ⚡ Get the paginated stays
    const stays = await collection
      .find(criteria)
      .sort(sort)
      .skip(skip)
      .limit(filterBy.pageSize)
      .toArray();

    // console.log("Paginated stays:", stays);
    return stays;
  } catch (err) {
    logger.error("cannot find stays", err);
    throw err;
  }
}

function _buildCriteria(filterBy) {
  const criteria = {};

  if (filterBy.txt) {
    criteria.name = { $regex: filterBy.txt, $options: "i" };
  }

  if (filterBy.city) {
    criteria["loc.city"] = { $regex: filterBy.city, $options: "i" };
  }

  if (filterBy.bathrooms !== undefined) {
    criteria.bathrooms = { $gte: +filterBy.bathrooms };
  }

  if (filterBy.bedrooms !== undefined) {
    criteria.bedrooms = { $gte: +filterBy.bedrooms };
  }

  if (filterBy.minPrice !== undefined || filterBy.maxPrice !== undefined) {
    criteria.price = {};
    if (filterBy.minPrice !== undefined)
      criteria.price.$gte = +filterBy.minPrice;
    if (filterBy.maxPrice !== undefined)
      criteria.price.$lte = +filterBy.maxPrice;
  }

  if (filterBy.capacity !== undefined) {
    criteria.capacity = { $gte: +filterBy.capacity };
  }

  if (filterBy.guests) {
    const totalGuests =
      (filterBy.guests.adults || 0) + (filterBy.guests.children || 0);
    if (totalGuests > 0) {
      criteria.capacity = { $gte: totalGuests };
    }
  }

  if (filterBy.roomType) {
    criteria.roomType = filterBy.roomType;
  }

  if (filterBy.labels && filterBy.labels.length > 0) {
    const labels = Array.isArray(filterBy.labels)
      ? filterBy.labels
      : [filterBy.labels];
    criteria.labels = { $in: labels };
  }

  if (filterBy.checkIn && filterBy.checkOut) {
    criteria.availableFrom = { $lte: new Date(filterBy.checkIn) };
    criteria.availableTo = { $gte: new Date(filterBy.checkOut) };
  }

  if (filterBy.ownerId) {
    criteria["owner._id"] = filterBy.ownerId;
  }

  return criteria;
}
