import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";

export const orderService = {
    query,
};

const ORDER_KEY = "orderDB";

function query(filterBy = {}) {
    return storageService.query(ORDER_KEY)
    .then((orders) => {
        if (filterBy.txt) {
            const regExp = new RegExp(filterBy.txt, "i");
            orders = orders.filter((order) => regExp.test(order.name));
        }

        return orders;
    });
}

function save(order) {
    if (order.id) {
        return storageService.put(ORDER_KEY, order);
    } else {
        return storageService.post(ORDER_KEY, order);
    }
}

function getRandomDate(start, end) {
    const startDate = new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 5) + 1); // 1-5 days stay

    return {
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
    };
}

function _createOrder(index) {
    const buyers = [
        { _id: "u101", fullname: "Alice Johnson" },
        { _id: "u102", fullname: "Bob Smith" },
        { _id: "u103", fullname: "Charlie Brown" },
    ];

    const stays = [
        { _id: "h101", name: "Cozy Mountain Cabin", price: 120 },
        { _id: "h102", name: "Seaside Retreat", price: 150 },
        { _id: "h103", name: "Urban Loft", price: 100 },
    ];

    const hostIds = ["u201", "u202", "u203"];
    const buyer = buyers[Math.floor(Math.random() * buyers.length)];
    const stay = stays[Math.floor(Math.random() * stays.length)];
    const hostId = hostIds[Math.floor(Math.random() * hostIds.length)];
    const dates = getRandomDate(new Date(2025, 9, 1), new Date(2025, 11, 31)); // Random dates in Oct-Dec 2025

    return {
        _id: `o${utilService.makeId()}`,
        hostId,
        buyer,
        totalPrice: stay.price * (Math.floor(Math.random() * 4) + 1), // 1-4 nights
        startDate: dates.startDate,
        endDate: dates.endDate,
        guests: {
            adults: Math.floor(Math.random() * 3) + 1, // 1-3 adults
            kids: Math.floor(Math.random() * 3), // 0-2 kids
        },
        stay,
        msgs: [],
        status: ["pending", "approved", "rejected"][
            Math.floor(Math.random() * 3)
        ],
    };
}

export function _createOrders() {
    let orders = utilService.loadFromStorage(ORDER_KEY);

    if (!orders || !orders.length) {
        orders = [];
        for (let i = 0; i < 20; i++) {
            orders.push(_createOrder(i));
        }

        utilService.saveToStorage(ORDER_KEY, orders);
    }
}

_createOrders();
