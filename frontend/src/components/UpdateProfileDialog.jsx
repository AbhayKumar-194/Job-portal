import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import axios from "axios"
import { Loader2 } from "lucide-react";
const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading,setLoading]=useState(false);
    const {user}=useSelector(store=>store.auth)
    const [input,setInput]=useState({
        fullname:user?.fullname ||"",
        email:user?.email || "",
        phoneNumber:user?.phoneNumber || "",
        bio:user?.profile?.bio || "",
        skills:user?.profile?.skills?.map(skill=>skill)  || "",
        file:user?.profile.resume|| ""
    });
 const dispatch=useDispatch();
  const changeEventHandler=(e)=>{
    setInput({...input,[e.target.name]:e.target.value});
  }
  const fileChangeHandler=(e)=>{
    const file=e.target.files?.[0];
    setInput({...input,file})
  }
  const submitHandler=async (e)=>{
    e.preventDefault();
    console.log(input.fullname,input.email,input.bio,input.phoneNumber)
    const formdata=new FormData();
    formdata.append("fullname",input.fullname)
    formdata.append("email",input.email);
    formdata.append("phoneNumber",input.phoneNumber)
    formdata.append("bio",input.bio)
    formdata.append("skills",input.skills)
     if(input.file)
     {
        formdata.append("file",input.file);
     }
     try {
        setLoading(true);
        const res=await axios.post(`${USER_API_END_POINT}/profile/update`,formdata,{headers:{
            'Content-Type':'multipart/form-data'
        },
        withCredentials:true

        })
        if(res.data.success)

            {
dispatch(setUser(res.data.user));
toast.success(res.data.message);
            }
     } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
     }
     finally{
        setLoading(false);
     }
     setOpen(false);
    console.log(input);
  }
  return (
    <div>
      <Dialog open={open}>
        <DialogContent className="sm:max-w-[425px]" onInteractOutside={()=>setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" 
                value={input.fullname}
                onChange={changeEventHandler}
                type="text"
                className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" 
                value={input.email}
                onChange={changeEventHandler}
                type="email"
                className="col-span-3" />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="number">Number</Label>
                <Input id="number" name="number" 
                value={input.phoneNumber}
                onChange={changeEventHandler}
                className="col-span-3" />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio" name="bio"
                value={input.bio} 
                onChange={changeEventHandler}
                className="col-span-3" />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills">Skills</Label>
                <Input id="skills" name="skills" 
                value={input.skills}
                onChange={changeEventHandler}className="col-span-3" />
              </div>

              <div className='grid grid-cols-4 items-center gap-4'>

<Label htmlFor="file" >
  Resume

</Label>
<Input id="file"
name="file"
type="file"
accept="application/pdf"

onChange={fileChangeHandler}
className='col-span-3'
/>
</div>
            </div>
            <DialogFooter>
            {
loading?<Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</Button>: <Button type="submit" className="w-full my-4">Update</Button>
          }
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
