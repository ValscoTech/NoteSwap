import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";

function SignUp(){
    const navi =useNavigate();
    const [formdata,setformdata]= useState(
        {
            email:"",
            password:"",
            remember:false,
            fname:""
        }
    );
    function changeHandler(event){
        const {name,type,value,checked}=event.target;
        setformdata(prevformdata=>{
          return{
            ...prevformdata,
            [name]:type==='checkbox'?checked:value
          }
        })
  
      }
    function clickHandler(){
        navi("/login");
    }
    return(
        <>
            <div className="text-black bg-white mx-32 my-12 rounded-2xl p-16 px-48 flex flex-col flex-wrap justify-center">
                <h2 className="text-center text-4xl font-semibold">Sign Up</h2>
                <form className="pt-4">
                    <label>
                    <p className="font-medium">Email:</p><br/>
                    <input 
                        type="email" 
                        name="email" 
                        value={formdata.email} 
                        onChange={changeHandler}
                        placeholder="johndoe@gmail.com"  
                        className="border border-black p-3 rounded-md w-full bg-[#FAFAFA]"  
                        />    
                    
                    </label>
                    <br/>
                    <br/>   
                    <label>
                        <p className="font-medium">Password:</p><br/>
                        <input
                            type="password"
                            name="password"
                            onChange={changeHandler}
                            value={formdata.password}
                            placeholder="* * * *"
                             className="border border-black p-3 rounded-md w-full bg-[#FAFAFA]"
                        />
                    </label>
                    <br/>
                    <br/>
                    <label>
                        <p className="font-medium" >Name</p><br/>
                        <input
                            type="text"
                            name="fname"
                            onChange={changeHandler}
                            value={formdata.fname}
                             className="border border-black p-3 rounded-md w-full bg-[#FAFAFA]"
                        />
                    </label>
                    <br/>
                    <br/>
                    <Link to="">
                        <button type="submit"
                             className="w-full bg-black text-white text-center py-3 rounded-md"
                        >SIGN UP</button>   
                    </Link>
                    <br/>
                    <br/>
                    <span></span>or<span></span>
                    <br/>
                    <br/>
                    <div className="flex justify-center place-items-center gap-x-8">
                        <div>Don't have a account?</div>
                        <div>
                            <button onClick={clickHandler}
                            className="text-[#A883C5]"
                            >
                                Log In
                            </button>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div className="border  border-black w-full p-5 rounded-md bg-[#FAFAFA] ">
                        <Link to="">
                            <div className="  flex justify-center place-items-center gap-x-5">
                            <div><FcGoogle size={24}/></div>
                            <div> Continue with Google</div>
                            </div>
                        </Link>
                    </div>
                    <br/>
                    <br/>
                    <div className="border  border-[#1877F2] text-white w-full p-5 rounded-md bg-[#1877F2] " >
                        <Link to="">
                            <div className="  flex justify-center place-items-center gap-x-5">
                            <div><BsFacebook size={24} className="bg-[#1877F2]" /></div>
                            <div> Continue with Facebook</div>
                            </div>
                        </Link>
                    </div>
                </form>
            </div>
        </>)
}
export default SignUp;