import { createSlice } from "@reduxjs/toolkit";
const companySlice=createSlice({
    name:"company",
    initialState:{
        singleCompany:null,
        companies:[],
        searchCompanyByText:""
    },
    reducers:{
        setSingleCompany:(state,action)=>{
            state.singleCompany=action.payload;
        },
        setCompanies:(state,action)=>{
state.companies=action.payload;
        },
        setSearchCompanyBytext:(state,action)=>
        {
            state.searchCompanyByText=action.payload;
        }
    }
});
export const {setSingleCompany,setCompanies,setSearchCompanyBytext}=companySlice.actions;
export default companySlice.reducer;