import React, { useState } from 'react'
import { Table, TableBody, TableCell,TableCaption,TableHeader,TableHead,TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import { SpaceIcon } from 'lucide-react'

const AppliedJobTable = () => {
  const {allappliedjobs}=useSelector(store=>store.job)
  
  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
           <TableHead>Date</TableHead> 
           <TableHead>Job Role</TableHead>
           <TableHead>Company</TableHead>  
           <TableHead className="text-right">Status</TableHead> 
        </TableHeader>
        <TableBody>
            {
               allappliedjobs.length<=0 ?<span>You haven't applied any job yet</span> :allappliedjobs.map((appliedjob)=>(
                   <TableRow key={appliedjob._id}>
                    <TableCell>{appliedjob?.createdAt.split("T")[0]}</TableCell>
                    <TableCell>{appliedjob.job.title}</TableCell>
                    <TableCell>{appliedjob.job.company.name}</TableCell>
                    <TableCell className="text-right"><Badge className={`${appliedjob?.status==="rejected"?'bg-red-400':appliedjob.status==="pending"?'bg-gray-400':'bg-green-400'}`}>{appliedjob.status.toUpperCase()}</Badge></TableCell>
                   </TableRow>  
                ))
            } 
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable
