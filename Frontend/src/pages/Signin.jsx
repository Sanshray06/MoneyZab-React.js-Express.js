import { useState , useEffect } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export const Signin = () => {

  const [username , setUsername] = useState("");
  const [password , setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

    return (

        <div className="bg-slate-300 h-screen flex justify-between">
          
          <div className="flex flex-col justify-center ml-20 pl-20 ">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
              <Heading label={"Sign in"} />
              <SubHeading label={"Enter your credentials to access your account"} />
              <InputBox onChange={(e) =>{
                setUsername(e.target.value)
              }} placeholder="harkirat@gmail.com" label={"Email"} />
              <InputBox onChange={(e)=>{
                setPassword(e.target.value)
              }} placeholder="123456" label={"Password"} />
              <div className="pt-4">
                <Button label={"Sign in"}  onClick={ async ()=>{
                  const response  = await axios.post("http://localhost:3000/api/v1/user/signin", {
                    username,
                    password
                  });
                  localStorage.setItem("token", response.data.token)
                  navigate("/dashboard")
                }} />
              </div>
              <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
            </div>
          </div>
          <div className="w-1/2">
            <img
              src="./public/pexels-alesiakozik-6771985.jpg"
              alt="Background"
              className="object-cover h-full w-full"
            />
          </div>
        </div>
    )
}