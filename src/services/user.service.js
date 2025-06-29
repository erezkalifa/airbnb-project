import Axios from "axios";
import CryptoJS from "crypto-js";

var axios = Axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  validateStatus: function (status) {
    return status >= 200 && status < 300;
  },
});

const STORAGE_KEY_LOGGEDIN_USER = "loggedinUser";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3030/api/"
    : "https://airbnb-backend-egt6.onrender.com/api/";

const BASE_USER_URL = BASE_URL + "user/";
const BASE_AUTH_URL = BASE_URL + "auth/";

const ENCRYPTION_KEY = "your-secret-key";

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  saveLocalUser,
  getUsers,
  getById,
  remove,
  update,
  getEmptyUser,
};

window.userService = userService;

async function getUsers() {
  const { data: users } = await axios.get(BASE_USER_URL);
  return users;
}

async function getById(userId) {
  const { data: user } = await axios.get(BASE_USER_URL + userId);
  return user;
}

async function remove(userId) {
  return await axios.remove(BASE_USER_URL + userId);
}

async function update(userToUpdate) {
  const updatedUser = await axios.put(BASE_USER_URL, userToUpdate);
  if (getLoggedinUser().id === updatedUser.id) saveLocalUser(updatedUser);
  return updatedUser;
}

function hashPassword(password) {
  const hashedPassword = CryptoJS.HmacSHA256(password, ENCRYPTION_KEY);
  return hashedPassword.toString();
}

function clearSensitiveData(credentials) {
  if (credentials) {
    if (credentials.password) credentials.password = null;
    if (credentials.token) credentials.token = null;
  }
}

async function login(credentials) {
  try {
    if (!credentials.username || !credentials.password) {
      throw new Error("Username and password are required");
    }

    const secureCredentials = {
      username: credentials.username,
      password: hashPassword(credentials.password),
      timestamp: Date.now(),
    };

    const { data: user } = await axios.post(
      BASE_AUTH_URL + "login",
      secureCredentials,
      {
        headers: {
          "X-Auth-Type": "login",
          "X-Client-Version": "1.0",
          "X-Request-Timestamp": secureCredentials.timestamp,
        },
      }
    );

    if (user) {
      clearSensitiveData(credentials);
      clearSensitiveData(secureCredentials);
      return saveLocalUser(user);
    }
    throw new Error("Login failed");
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
}

async function signup(credentials) {
  try {
    if (!credentials.username || !credentials.password) {
      throw new Error("Username and password are required");
    }
    if (credentials.password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }
    if (!/[A-Z]/.test(credentials.password)) {
      throw new Error("Password must contain at least one uppercase letter");
    }
    if (!/[0-9]/.test(credentials.password)) {
      throw new Error("Password must contain at least one number");
    }

    const secureCredentials = {
      username: credentials.username,
      fullname: credentials.fullname,
      password: hashPassword(credentials.password),
      timestamp: Date.now(),
    };

    const { data: user } = await axios.post(
      BASE_AUTH_URL + "signup",
      secureCredentials,
      {
        headers: {
          "X-Auth-Type": "signup",
          "X-Client-Version": "1.0",
          "X-Request-Timestamp": secureCredentials.timestamp,
        },
      }
    );

    clearSensitiveData(credentials);
    clearSensitiveData(secureCredentials);
    return saveLocalUser(user);
  } catch (error) {
    console.error("Signup error:", error.message);
    throw error;
  }
}

async function logout() {
  try {
    await axios.post(BASE_AUTH_URL + "logout");
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
    localStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
  } catch (error) {
    console.error("Logout error:", error.message);
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
    localStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
    throw error;
  }
}

function getEmptyUser() {
  return {
    username: "",
    fullname: "",
    password: "",
    imgUrl: "",
  };
}

function saveLocalUser(user) {
  const userToSave = {
    _id: user._id,
    fullname: user.fullname,
    isAdmin: user.isAdmin,
  };
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave));
  return userToSave;
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER));
}

function signupDemoUsers() {
  return storageService
    .query(USER_KEY)
    .then((users) => !users.length || Promise.reject("Too Many Demo Users!"))
    .then(() =>
      userService.signup({
        username: "erez",
        password: "erez",
        fullname: "Erez Kalifa",
      })
    )
    .then(() =>
      userService.signup({
        username: "romi",
        password: "romi",
        fullname: "Romi Shoval",
      })
    )
    .then(() =>
      userService.signup({
        username: "ben",
        password: "ben",
        fullname: "Ben Fisher",
      })
    );
}
