import { configureStore } from "@reduxjs/toolkit"

const initialData = {token: "", shoppingCart: []};

const reducer = (state = initialData, action) => {
    
    return state;
}

const store = configureStore({reducer: reducer});

export default store;