import Axios from "axios";

var axios = Axios.create({
  withCredentials: true,
});

const STORAGE_KEY_LOGGEDIN_USER = "loggedinUser";

const BASE_URL =
  process.env.NODE_ENV == "development" 
  ? "http://localhost:3030/api/"
  : "https://airbnb-backend-egt6.onrender.com/api/" ;

const BASE_USER_URL = BASE_URL + "user/";
const BASE_AUTH_URL = BASE_URL + "auth/";

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
  // const user = await getById(userToUpdate.id)
  // console.log('user', user)

  const updatedUser = await axios.put(BASE_USER_URL, userToUpdate);
  if (getLoggedinUser().id === updatedUser.id) saveLocalUser(updatedUser);
  return updatedUser;
}

async function getUserrStays(userId) {}

async function login(credentials) {
  const { data: user } = await axios.post(BASE_AUTH_URL + "login", credentials);
  console.log("user", user);
  if (user) {
    return saveLocalUser(user);
  }
}

async function signup(credentials) {
  const { data: user } = await axios.post(
    BASE_AUTH_URL + "signup",
    credentials
  );
  return saveLocalUser(user);
}

async function logout() {
  await axios.post(BASE_AUTH_URL + "logout");
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
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
  user = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin };
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
  return user;
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
