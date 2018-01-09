import { USER_TOKEN_KEY } from "../config.js/index";

const setTheTokenOnStorage = token => {
    localStorage.setItem(USER_TOKEN_KEY, token);
};

const getTheTokenOnStorage = () => {
    return localStorage.getItem(USER_TOKEN_KEY);
}

const isUserAuthorized = () => {
    const token = getTheTokenOnStorage();
    if (token && token.length > 3) {
        return true;
    }
    return false;
}

export { setTheTokenOnStorage, getTheTokenOnStorage, isUserAuthorized };