export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const RECEIVE_USER = "RECEIVE_USER";

export function setAuthedUser(user) {
  return {
    type: SET_AUTHED_USER,
    user,
  };
}

export function receiveUser(user) {
  return {
    type: RECEIVE_USER,
    user,
  };
}
