import { setallappliedjobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedjob=()=>{
    const dispatch=useDispatch();
    useEffect(()=>{
        
        const fetchAppliedJobs=async ()=>{
            try {
    const res=await axios.get(`${APPLICATION_API_END_POINT}/get`,{withCredentials:true})
    console.log(res.data)
            if(res.data.success)
            {
                dispatch(setallappliedjobs(res.data.application))
            }
} catch (error) {
    console.log(error);
}
}
fetchAppliedJobs()   
    },[])
};
export default useGetAppliedjob; 