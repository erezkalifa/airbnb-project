import { userService } from "../../services/user.service.js";
import { store } from "../store.js";

// import { showErrorMsg } from "../services/event-bus.service";
// import { LOADING_DONE, LOADING_START } from "./system.reducer";
import { REMOVE_USER, SET_USER, SET_USERS } from "./user.reducer";

export async function loadUsers() {
  try {
    // store.dispatch({ type: LOADING_START });
    const users = await userService.getUsers();
    console.log(users);
    store.dispatch({ type: SET_USERS, users });
  } catch (err) {
    console.log("UserActions: err in loadUsers", err);
  } finally {
    // store.dispatch({ type: LOADING_DONE });
  }
}

export async function removeUser(userId) {
  try {
    await userService.remove(userId);
    store.dispatch({ type: REMOVE_USER, userId });
  } catch (err) {
    console.log("UserActions: err in removeUser", err);
  }
}

export async function login(credentials) {
  try {
    const user = await userService.login(credentials);
    console.log(user);
    store.dispatch({
      type: SET_USER,
      user,
    });
    return user;
  } catch (err) {
    console.log("Cannot login", err);
    throw err;
  }
}

export async function signup(credentials) {
  try {
    console.log(credentials);
    const user = await userService.signup(credentials);
    store.dispatch({
      type: SET_USER,
      user,
    });

    return user;
  } catch (err) {
    console.log("Cannot signup", err);
    throw err;
  }
}

export async function logout() {
  try {
    await userService.logout();
    store.dispatch({
      type: SET_USER,
      user: null,
    });
    // socketService.logout();
  } catch (err) {
    console.log("Cannot logout", err);
    throw err;
  }
}

export async function loadUser(userId) {
  try {
    const user = await userService.getById(userId);
    // store.dispatch({ type: SET_WATCHED_USER, user });
  } catch (err) {
    showErrorMsg("Cannot load user");
    console.log("Cannot load user", err);
  }
}
