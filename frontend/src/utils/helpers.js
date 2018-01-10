import { USER_TOKEN_KEY } from "../config/index";

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

const responseErrorHandler = res => {
    if (res.status >= 500) {
        throw Error("Something went wrong on the server");
    } else if (res.status == 401) {
        throw Error("You are not authorized to complete this action");
    } else {
        throw Error(res.data.message || "Something went wrong :(");
    }
};

const getRequestConfig = () => {
    return {
        headers: { authorization: getTheTokenOnStorage() },
        validateStatus: function(status) {
            return status <= 500; // Reject only if the status code is greater than or equal to 500
        }
    };
};
export { setTheTokenOnStorage, getTheTokenOnStorage, isUserAuthorized, responseErrorHandler, getRequestConfig };