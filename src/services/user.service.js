import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const USER_KEY = 'userDB'
const USER_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    getEmptyCredentials,
    signupDemoUsers
}


function getById(userId) {
    return storageService.get(USER_KEY, userId)
}

function login({ username, password }) {
    return storageService.query(USER_KEY)
        .then(users => {
            const user = users.find(user => user.username === username)
            // if (user && user.password !== password) return _setLoggedinUser(user)
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname }) {
    const user = { username, password, fullname, score: 10000 }
    return storageService.post(USER_KEY, user)
        .then(_setLoggedinUser)
}

function logout() {
    sessionStorage.removeItem(USER_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { id: user.id, fullname: user.fullname }
    sessionStorage.setItem(USER_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}


function signupDemoUsers() {
    return storageService.query(USER_KEY)
        .then(users => !users.length || Promise.reject('Too Many Demo Users!'))
        .then(() => userService.signup({ username: 'erez', password: 'erez', fullname: 'Erez Kalifa' }))
        .then(() => userService.signup({ username: 'romi', password: 'romi', fullname: 'Romi Shoval' }))
        .then(() => userService.signup({ username: 'ben', password: 'ben', fullname: 'Ben Fisher' }))
}

export function _createLoggedInUser() {
    const loggedInUser = getLoggedinUser()
    console.log(JSON.stringify(loggedInUser))
    if (loggedInUser == null)
        _setLoggedinUser({ id: utilService.makeId(),
                            username: 'erez', 
                            password: 'erez',
                            fullname: 'Erez Kalifa'
                         });
}

_createLoggedInUser()

