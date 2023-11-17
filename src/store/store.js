import { configureStore } from "@reduxjs/toolkit"

const user = localStorage.getItem("myuser") === null ? null : JSON.parse(localStorage.getItem("myuser"));
const token = localStorage.getItem("token") === null ? "" : localStorage.getItem("token");
const initialData = { token: token, user: user, shoppingCart: [] };

const reducer = (state = initialData, action) => {
    if (action.type === "login") {
        localStorage.setItem("token", action.user.token);
        localStorage.setItem("myuser", JSON.stringify(action.user));
        return { ...state, user: action.user, token: action.user.token };
    }

    return state;
}

const store = configureStore({ reducer: reducer });

export default store;