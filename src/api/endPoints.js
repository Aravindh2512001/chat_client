// AUTH API Routes
const AUTH_ROUTES = "/api/v1/auth";

export const LOGIN = `${AUTH_ROUTES}/login`;
export const REGISTER = `${AUTH_ROUTES}/register`;
export const LOGOUT = `${AUTH_ROUTES}/logout`;
export const CHECK_AUTH = `${AUTH_ROUTES}/check-auth`;


// USER API Routes
const USER_ROUTES = "/api/v1/user";
export const PROFILE_UPDATE = `${USER_ROUTES}/profile-update`;
export const GET_USERS = `${USER_ROUTES}/`;


//MESSAGE API Routes
export const MESSAGE_ROUTES = '/api/v1/message'
export const GET_MESSAGE = `${MESSAGE_ROUTES}/messages`
export const SEND_MESSAGE = `${MESSAGE_ROUTES}/sendmessage`
