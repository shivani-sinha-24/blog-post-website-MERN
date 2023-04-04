import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const allBlogsSlice = createSlice({
    name:'blogs',
    initialState,
    reducers:{
        allBlogs:{
            reducer(state,action){
                state.push(action.payload)
            },
            prepare(_id,userId,userName,title,image,content,date,comments){
                return{
                    payload:{
                        _id,userId,userName,title,image,content,date,comments
                    }
                }
            }
        },
        resetAllBlogs:(state,action)=>{
            const newState = []
            return newState
        }
    }
})

export const {allBlogs,resetAllBlogs} = allBlogsSlice.actions

export default allBlogsSlice.reducer