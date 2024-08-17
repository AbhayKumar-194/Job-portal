import React, { useEffect, useState } from "react";
import {
  Table,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
} from "../ui/table";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Eye, MoreHorizontal } from "lucide-react";
import { Edit2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const AdminJobsTable = () => {

  
  const {allAdminJobs,searchJobByText}=useSelector(store=>store.job)
  const [filterJobs,setFilterJobs]=useState(allAdminJobs);
  const navigate=useNavigate();

  useEffect(()=>{
    const filteredJob=allAdminJobs.length>=0 && allAdminJobs.filter((job)=>{
      if(!searchJobByText)
      {
        return true;
      }
return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())
     || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
    })
    setFilterJobs(filteredJob);
  },[allAdminJobs,searchJobByText])
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent posted Jobs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {
              filterJobs?.map((job)=>(
               
                <tr>
                 
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div 
                      onClick={()=>navigate(`/admin/companies/${job._id}`)}
                      className="flex items-center  gap-2 w-fit cursor-pointer">
                        <Edit2 />
                        <span>Edit</span>
                      </div>
                      <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center w-fit gap-2 cursor-pointer mt-2">
                        <Eye className="w-4"/>
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
               
                </tr>
              ))
            }
        
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;