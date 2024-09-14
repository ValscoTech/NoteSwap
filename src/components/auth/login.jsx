// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
// import { BsFacebook } from "react-icons/bs";

// function login() {
//     const navi = useNavigate();
//     const [formdata, setformdata] = useState(
//         {
//             email: "",
//             password: "",
//             remember: false
//         }
//     );
//     function changeHandler(event) {
//         const { name, type, value, checked } = event.target;
//         setformdata(prevformdata => {
//             return {
//                 ...prevformdata,
//                 [name]: type === 'checkbox' ? checked : value
//             }
//         })

//     }
//     function clickHandler() {
//         navi("/signup");
//     }
//     return (
//         <>
//             <div className="text-black bg-white mx-32 my-12 rounded-2xl p-16 px-48 flex flex-col flex-wrap justify-center">
//                 <h2 className="text-center text-4xl font-semibold">LOG IN</h2>
//                 <form className="pt-4">
//                     <label>
//                         <p className="font-medium">Email</p><br />
//                         <input
//                             type="email"
//                             name="email"
//                             value={formdata.email}
//                             onChange={changeHandler}
//                             placeholder="johndoe@gmail.com"
//                             className="border border-black p-3 rounded-md w-full bg-[#FAFAFA]"
//                         />

//                     </label>
//                     <br />
//                     <br />
//                     <label>
//                         <p className="font-medium">Password:</p><br />
//                         <input
//                             type="password"
//                             name="password"
//                             onChange={changeHandler}
//                             value={formdata.password}
//                             placeholder="* * * * *"
//                             className="border border-black p-3 rounded-md w-full bg-[#FAFAFA]"
//                         />
//                     </label>
//                     <br />
//                     <br />
//                     <div className="flex ">
//                         <input
//                             type="checkbox"
//                             name="remember"
//                             checked={formdata.remember}
//                             onChange={changeHandler}
//                             className="mr-4 p-2 border-1"
//                         />
//                         <p className="font-medium">Remember me</p>
//                     </div>
//                     <br />
//                     <p className="text-slate-400 font-medium">Save my login details for next time</p>
//                     <br />
//                     <br />
//                     <Link to="">
//                         <button type="submit"
//                             className="w-full bg-black text-white text-center py-3 rounded-md"
//                         >LOG IN</button>
//                     </Link>
//                     <br />
//                     <br />
//                     <div className="flex">
//                         <div border-1 border-black></div><p className="text-center">or</p><div></div>
//                     </div>
//                     <br />
//                     <br />
//                     <div className="flex justify-center place-items-center gap-x-8">
//                         <div>Don't have a account?</div>
//                         <div>
//                             <button onClick={clickHandler}
//                                 className="text-[#A883C5]"
//                             >
//                                 Sign Up
//                             </button>
//                         </div>
//                     </div>
//                     <br />
//                     <br />
//                     <div className="border  border-black w-full p-5 rounded-md bg-[#FAFAFA] ">
//                         <Link to="">
//                             <div className="  flex justify-center place-items-center gap-x-5">
//                                 <div><FcGoogle size={24} /></div>
//                                 <div> Continue with Google</div>
//                             </div>
//                         </Link>
//                     </div>
//                     <br />
//                     <br />
//                     <div className="border  border-[#1877F2] text-white w-full p-5 rounded-md bg-[#1877F2] " >
//                         <Link to="">
//                             <div className="  flex justify-center place-items-center gap-x-5">
//                                 <div><BsFacebook size={24} className="bg-[#1877F2]" /></div>
//                                 <div> Continue with Facebook</div>
//                             </div>
//                         </Link>
//                     </div>

//                 </form>
//             </div>
//         </>)
// }
// export default login;


// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
// import { BsFacebook } from "react-icons/bs";

// function Login() {
//     const navi = useNavigate();
//     const [formdata, setformdata] = useState({
//         email: "",
//         password: "",
//         remember: false
//     });

//     function changeHandler(event) {
//         const { name, type, value, checked } = event.target;
//         setformdata(prevformdata => ({
//             ...prevformdata,
//             [name]: type === 'checkbox' ? checked : value
//         }));
//     }

//     function clickHandler() {
//         navi("/signup");
//     }

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-white p-4">
//             <div className="max-w-md w-full bg-white text-black mx-auto rounded-2xl p-6 shadow-md">
//                 <h2 className="text-center text-3xl font-semibold mb-4">LOG IN</h2>
//                 <form>
//                     <label className="block mb-4">
//                         <p className="font-medium">Email</p>
//                         <input
//                             type="email"
//                             name="email"
//                             value={formdata.email}
//                             onChange={changeHandler}
//                             placeholder="johndoe@gmail.com"
//                             className="border border-black p-3 rounded-md w-full bg-[#FAFAFA]"
//                         />
//                     </label>
//                     <label className="block mb-4">
//                         <p className="font-medium">Password:</p>
//                         <input
//                             type="password"
//                             name="password"
//                             onChange={changeHandler}
//                             value={formdata.password}
//                             placeholder="* * * * *"
//                             className="border border-black p-3 rounded-md w-full bg-[#FAFAFA]"
//                         />
//                     </label>
//                     <div className="flex items-center mb-4">
//                         <input
//                             type="checkbox"
//                             name="remember"
//                             checked={formdata.remember}
//                             onChange={changeHandler}
//                             className="mr-2"
//                         />
//                         <p className="font-medium">Remember me</p>
//                     </div>
//                     <p className="text-slate-400 font-medium mb-4">Save my login details for next time</p>
//                     <Link to="">
//                         <button type="submit" className="w-full bg-black text-white py-3 rounded-md mb-4">LOG IN</button>
//                     </Link>
//                     <div className="flex items-center mb-4">
//                         <div className="flex-1 border-t border-black"></div>
//                         <p className="mx-4">or</p>
//                         <div className="flex-1 border-t border-black"></div>
//                     </div>
//                     <div className="flex flex-col items-center mb-4">
//                         <p className="mb-2">Don't have an account?</p>
//                         <button onClick={clickHandler} className="text-[#A883C5]">Sign Up</button>
//                     </div>
//                     <div className="border border-black w-full p-4 rounded-md bg-[#FAFAFA] mb-4">
//                         <Link to="">
//                             <div className="flex items-center justify-center gap-x-3">
//                                 <FcGoogle size={24} />
//                                 <p>Continue with Google</p>
//                             </div>
//                         </Link>
//                     </div>
//                     <div className="border border-[#1877F2] text-white w-full p-4 rounded-md bg-[#1877F2]">
//                         <Link to="">
//                             <div className="flex items-center justify-center gap-x-3">
//                                 <BsFacebook size={24} />
//                                 <p>Continue with Facebook</p>
//                             </div>
//                         </Link>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }
// export default Login;


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";

function Login() {
    const navi = useNavigate();
    const [formdata, setformdata] = useState({
        email: "",
        password: "",
        remember: false
    });

    function changeHandler(event) {
        const { name, type, value, checked } = event.target;
        setformdata(prevformdata => ({
            ...prevformdata,
            [name]: type === 'checkbox' ? checked : value
        }));
    }

    function clickHandler() {
        navi("/signup");
    }

    return (
        <div className="text-black bg-white mx-4 md:mx-8 lg:mx-32 my-12 rounded-2xl p-6 md:p-12 lg:p-16 px-4 md:px-8 lg:px-48 flex flex-col flex-wrap justify-center">
            <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold">LOG IN</h2>
            <form className="pt-4">
                <label className="block mb-4">
                    <p className="font-medium">Email</p>
                    <input
                        type="email"
                        name="email"
                        value={formdata.email}
                        onChange={changeHandler}
                        placeholder="johndoe@gmail.com"
                        className="border border-black p-3 rounded-md w-full bg-[#FAFAFA]"
                    />
                </label>
                <label className="block mb-4">
                    <p className="font-medium">Password:</p>
                    <input
                        type="password"
                        name="password"
                        onChange={changeHandler}
                        value={formdata.password}
                        placeholder="* * * * *"
                        className="border border-black p-3 rounded-md w-full bg-[#FAFAFA]"
                    />
                </label>
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        name="remember"
                        checked={formdata.remember}
                        onChange={changeHandler}
                        className="mr-2"
                    />
                    <p className="font-medium">Remember me</p>
                </div>
                <p className="text-slate-400 font-medium mb-6">Save my login details for next time</p>
                <Link to="">
                    <button type="submit" className="w-full bg-black text-white text-center py-3 rounded-md">LOG IN</button>
                </Link>
                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-black"></div>
                    <p className="px-4 text-center">or</p>
                    <div className="flex-grow border-t border-black"></div>
                </div>
                <div className="flex justify-center items-center gap-x-8 mb-6">
                    <div>Don't have an account?</div>
                    <button onClick={clickHandler} className="text-[#A883C5]">Sign Up</button>
                </div>
                <div className="border border-black w-full p-4 rounded-md bg-[#FAFAFA] mb-4">
                    <Link to="">
                        <div className="flex justify-center items-center gap-x-5">
                            <FcGoogle size={24} />
                            <div>Continue with Google</div>
                        </div>
                    </Link>
                </div>
                <div className="border border-[#1877F2] text-white w-full p-4 rounded-md bg-[#1877F2]">
                    <Link to="">
                        <div className="flex justify-center items-center gap-x-5">
                            <BsFacebook size={24} />
                            <div>Continue with Facebook</div>
                        </div>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
