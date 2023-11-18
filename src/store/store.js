import { configureStore } from "@reduxjs/toolkit"

const user = localStorage.getItem("myuser") === null ? null : JSON.parse(localStorage.getItem("myuser"));
const token = localStorage.getItem("token") === null ? "" : localStorage.getItem("token");
const initialData = { token: token, user: user, carts: [] };

const reducer = (state = initialData, action) => {
    if (action.type === "login") {
        localStorage.setItem("token", action.user.token);
        localStorage.setItem("myuser", JSON.stringify(action.user));
        return { ...state, user: action.user, token: action.user.token };
    }
    
    if (action.type == "cart") {
        let temp = [...state.carts];
        temp.push(action.item);
        return { ...state, carts: temp };
    }

    if (action.type == "deleteCartItem") {
        let temp = state.carts.filter(e => e !== action.item);
        return { ...state, carts: temp };
    }
    if (action.type == "updateCart") {
        let index = state.carts.findIndex(e => e === action.item);
        let temp = [...state.carts];
        temp[index] = action.newItem;
        return { ...state, carts: temp };
    }

    if (action.type ===  "logout") {
        localStorage.setItem("token", null);
        localStorage.setItem("myuser", null);
        return {...state, user: null, token: ""}
    }

    return state;
}

const store = configureStore({ reducer: reducer });

export default store;