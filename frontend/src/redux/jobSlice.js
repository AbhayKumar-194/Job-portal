import { createSlice } from "@reduxjs/toolkit";

const jobSlice=createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        singleJob:null,
        allAdminJobs:[],
        searchJobByText:"",
        allappliedjobs:[],
        searchedQuery:""
    },
    reducers:{
        setAllJobs:(state,action)=>{
            state.allJobs=action.payload
        },
        setSingleJob:(state,action)=>{
state.singleJob=action.payload
        },
        setAllAdminJobs:(state,action)=>{
             state.allAdminJobs=action.payload;
        },
        setsearchJobByText:(state,action)=>{
            state.searchJobByText=action.payload;
        },
        setallappliedjobs:(state,action)=>{
            state.allappliedjobs=action.payload;
        },
        setSearchedQuery:(state,action)=>{
            state.searchedQuery=action.payload;
        }
    }
});

export const {setAllJobs,setSingleJob,setAllAdminJobs,setsearchJobByText,setallappliedjobs,setSearchedQuery}=jobSlice.actions;
export default jobSlice.reducer;