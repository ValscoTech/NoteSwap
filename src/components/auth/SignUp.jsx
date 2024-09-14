import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";

function SignUp() {
    const navi = useNavigate();
    const [formdata, setformdata] = useState({
        email: "",
        password: "",
        remember: false,
        fname: ""
    });

    function changeHandler(event) {
        const { name, type, value, checked } = event.target;
        setformdata(prevformdata => ({
            ...prevformdata,
            [name]: type === 'checkbox' ? checked : value
        }));
    }

    function clickHandler() {
        navi("/login");
    }

    return (
        <div className="text-black bg-white mx-4 md:mx-8 lg:mx-32 my-12 rounded-2xl p-6 md:p-12 lg:p-16 px-4 md:px-8 lg:px-48 flex flex-col flex-wrap justify-center">
            <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold">Sign Up</h2>
            <form className="pt-4">
                <label className="block mb-4">
                    <p className="font-medium">Email:</p>
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
                        placeholder="* * * *"
                        className="border border-black p-3 rounded-md w-full bg-[#FAFAFA]"
                    />
                </label>
                <label className="block mb-4">
                    <p className="font-medium">Name</p>
                    <input
                        type="text"
                        name="fname"
                        onChange={changeHandler}
                        value={formdata.fname}
                        className="border border-black p-3 rounded-md w-full bg-[#FAFAFA]"
                    />
                </label>
                <Link to="">
                    <button type="submit" className="w-full bg-black text-white text-center py-3 rounded-md">SIGN UP</button>
                </Link>
                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-black"></div>
                    <p className="px-4 text-center">or</p>
                    <div className="flex-grow border-t border-black"></div>
                </div>
                <div className="flex justify-center items-center gap-x-8 mb-6">
                    <div>Already have an account?</div>
                    <button onClick={clickHandler} className="text-[#A883C5]">Log In</button>
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

export default SignUp;
