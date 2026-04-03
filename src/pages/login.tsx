import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Sun, Moon, CheckCircle2Icon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import type LoginData from "@/models/LoginData";
import toast from "react-hot-toast";
import { loginUser } from "@/services/AuthService";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { set } from "date-fns";
import useAuth from "@/auth/store";
import OAuth2Buttons from "@/components/ui/OAuth2Buttons";

function login() {
    const [loginData, setLoginData] = useState<LoginData>({
        email: "",
        password: "",
    });
    const [loading,setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);
    const [dark, setDark] = useState(true);

    const navigate = useNavigate();
    const login = useAuth((state) => state.login);

    //   const navigate = useNavigate();
    //   const login = useAuth((state) => state.login);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value,
        })
    };

    const  handleFormSubmit =async (event: FormEvent)=>{
       event.preventDefault();
        //validation  
        if(loginData.email.trim()==" "){
            toast.error("Email is required!");
            return;
        }   
        if(loginData.password.trim()==" "){
            toast.error("Password is required!");
            return;
        }
        //server call for login
        // console.log(event.target);
        // console.log(loginData);   
        try{
            setLoading(true);
            // const userinfo= await loginUser(loginData);
            //login function: useAuth
            await login(loginData);
            toast.success("Login successful!");
            navigate("/dashboard");
            //save the current user logged in informations in current storage

        }catch(error:any){
            console.log(error);
            // toast.error("Login failed. Please check your credentials and try again.");
            if(error.status==400){
                setError(error);
            }else{
                setError(error);
            }
        }finally{
            setLoading(false);
        }
    };

    return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white transition-colors duration-500 px-4 py-10">

        {/* Theme Toggle */}
        <div className="absolute top-6 right-6">
          <Button variant="outline" size="icon" onClick={() => setDark(!dark)}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
        </div>

        {/* Login Card */}
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
                Welcome Back
              </motion.h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Login securely to continue your journey
              </p>
            </div>
            {/*error section*/}
            {error && (
                <div className="mt-4">
                <Alert variant={'destructive'}>
                    <CheckCircle2Icon/>
                    <AlertTitle>{
                        error?.response ? error.response.data.message : error?.message
                    }</AlertTitle>
                </Alert>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="space-y-5">

              <div className="space-y-1">
                <Label className="text-sm">Email</Label>
                <Input
                  type="email"
                  className="h-11"
                  placeholder="Enter your email"
                  name="email"
                  value={loginData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-1">
                <Label className="text-sm">Password</Label>
                <Input
                  type="password"
                  className="h-11"
                  placeholder="Enter your password"
                  name="password"
                  value={loginData.password}
                  onChange={handleInputChange}
                />
              </div>

              <Button disabled={loading} className="w-full h-11 cursor-pointer text-base">
                {loading? <><Spinner/>Loading..</> : "Login"}
                </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-300 dark:bg-white/10" />
              <span className="text-xs text-gray-500">OR</span>
              <div className="flex-1 h-px bg-gray-300 dark:bg-white/10" />
            </div>

            {/* Google Auth */}
            <OAuth2Buttons />

            {/* Footer */}
            <p className="text-center text-sm text-gray-500">
              Don’t have an account? {" "}
                <Link to="/signup" className="text-primary font-medium hover:underline"> SignUp </Link>
            </p>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default login
