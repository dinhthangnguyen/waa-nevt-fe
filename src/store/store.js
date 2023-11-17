import { configureStore } from "@reduxjs/toolkit"

const initialData = {token: "", user: {token: "", email: "", firstName: "", lastName: ""}, shoppingCart: []};

const reducer = (state = initialData, action) => {
    if (action.type === "login") {
        return {...state, user: action.user, token: action.user.token};
    }

    return state;
}

const store = configureStore({reducer: reducer});

export default store;