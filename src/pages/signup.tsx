import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Sun, Moon, CheckCircle2Icon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { set } from "date-fns";
import toast from "react-hot-toast";
import type RegisterData from "@/models/RegisterData";
import { registerUser } from "@/services/AuthService";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertTitle } from "@/components/ui/alert";
import OAuth2Buttons from "@/components/ui/OAuth2Buttons";


function signup() {
 const [dark, setDark] = useState(true);
 const [data, setData] = useState<RegisterData>({
    name: "",
    email: "",
    password: ""
 });

 const [loading,setLoading] = useState<boolean>(false);
 const [error, setError] = useState<any>(null);

 const navigate=useNavigate();

 //handling form change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
      console.log(event.target.name);
      console.log(event.target.value);
      setData((value)=>({
        ...value,
        [event.target.name]: event.target.value
      }));
 }

 const handleFormSubmit =async (event: React.FormEvent)=>{
    event.preventDefault();
    console.log(data);
    //validation
    if(data.name.trim()==""){
        toast.error("Name is required!");
        return;
    }
    if(data.password.trim()==""){
        toast.error("Password is required");
        return;
    }
    if(data.email.trim()==""){
        toast.error("Email is required!");
        return;
    }

    //form submit for registrations
    try{
         setLoading(true);
        const result= await registerUser(data);
        console.log(result);
        toast.success("Registration successful! Please login to continue.");
        setData({
            name: "",
            email: "",
            password: ""
        });
        //navigate to login page after successful registration
        navigate("/login");
    }catch(err){
        console.log(err);
        toast.error("Registration failed. Please try again.");
         if(error.status==400){
                setError(error);
            }else{
                setError(error);
            }
    }finally{
      setLoading(false);
    }
 }

 return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white transition-colors duration-500 px-4 py-10">

        {/* Theme Toggle */}
        <div className="absolute top-6 right-6">
          <Button variant="outline" size="icon" onClick={() => setDark(!dark)}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
        </div>

        {/* Signup Card */}
        <Card className="w-full max-w-md bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-xl shadow-xl rounded-2xl">
          <CardContent className="p-6 md:p-8 space-y-6">

            {/* Heading */}
            <div className="text-center space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold"
              >
                Create Account
              </motion.h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Join us and experience secure, modern authentication
              </p>
            </div>


            {/* Form */}
            <form onSubmit={handleFormSubmit} className="space-y-5">

              <div className="space-y-1">
                <Label className="text-sm">Name</Label>
                <Input className="h-11" placeholder="Enter your name" name="name" value={data.name} onChange={handleInputChange}/>
              </div>

              <div className="space-y-1">
                <Label className="text-sm">Email</Label>
                <Input type="email" className="h-11" placeholder="Enter your email" name="email" value={data.email} onChange={handleInputChange}/>
              </div>

              <div className="space-y-1">
                <Label className="text-sm">Password</Label>
                <Input type="password" className="h-11" placeholder="Create a password" name="password" value={data.password} onChange={handleInputChange}/>
              </div>

              <Button disabled={loading} className="w-full h-11 text-base">
                {loading ? <><Spinner />Loading..</> : "Sign Up"}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-300 dark:bg-white/10" />
              <span className="text-xs text-gray-500">or</span>
              <div className="flex-1 h-px bg-gray-300 dark:bg-white/10" />
            </div>

            {/* Google Auth */}
              <OAuth2Buttons />

            {/* Footer */}
            <p className="text-center text-sm text-gray-500">
              Already have an account? {" "}
               <Link to="/login" className="text-primary font-medium hover:underline"> Login </Link>
            </p>

          </CardContent>
        </Card>
      </div>
    </div>
  );

}

export default signup
