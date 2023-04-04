import { createSlice } from "@reduxjs/toolkit";

const initialState = []

export const userDataSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        userData:{
            reducer(state,action){
                const newState = {
                    _id: action.payload._id,
                    fullName: action.payload.fullName,
                    email: action.payload.email,
                }
                return newState;
            },
            prepare(_id,fullName,email){
                return{
                    payload:{
                        _id,
                        fullName,
                        email,
                    }
                }
            }
        },
        resetUserData:(state,action)=>{
            const newState = []
            return newState
        }
    }
})

export const {userData,resetUserData} = userDataSlice.actions

export default userDataSlice.reducer