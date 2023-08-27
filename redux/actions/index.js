import { LOGIN_USER } from "../constants";

export const loginUser = (data) => ({
    type: LOGIN_USER,
    payload: data
})

// export const registerUser = (data) => ({
//     type: REGISTER_USER,
//     payload: data
// })