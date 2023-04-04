import { configureStore } from "@reduxjs/toolkit";

// import reducers
import userDataReducer from "../reducers/userDataSlice";
import allBlogsReducer from "../reducers/allBlogsSlice";

const store = configureStore({
    reducer:{
        userDataReducer,
        allBlogsReducer,
    }
})

export default store