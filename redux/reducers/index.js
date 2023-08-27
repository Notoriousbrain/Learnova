import { LOGIN_USER } from "../constants";


export const userReducer = (state, action) => {
    switch(action.type){
        case LOGIN_USER:
            return action.payload;
        default :
            return state;
    }
}

// export const profileReducer = (state = initialUserState, action) => {
//     switch(action.type){
//         case REGISTER_USER:
//                 return action.payload;
//         default :
//                 return state;
//     }
// }