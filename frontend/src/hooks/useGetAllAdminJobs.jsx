import { setAllAdminJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant.js';
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';
const usegetAllAdminJobs = () => {
    const dispatch=useDispatch();
 useEffect(()=>{
    const fetchAllAdminJobs=async (req,res)=>{
        try {
            const res=await axios.get(`${JOB_API_END_POINT}/getadminJobs`,{withCredentials:true});
         
            if(res.data.success)
            {
dispatch(setAllAdminJobs(res.data.jobs));
            }
        } catch (error) {
            console.log(error);
        }
    }
    fetchAllAdminJobs();
 },[])
}

export default usegetAllAdminJobs
