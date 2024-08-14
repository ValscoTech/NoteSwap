import { GoArrowUp } from "react-icons/go";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io";
import { GoArrowDownRight } from "react-icons/go";

export default function Footer(){

   
    return(
        <div className="bg-black pt-10 text-white px-8 pb-[9rem]">
            <hr className=" h-[4px]  bg-white  "></hr>
            <div className="flex pt-6 pb-14 justify-between items-start ">
                <span className=" text-2xl font-bold pt-0.5">NoteSwap</span>
                <span className=""><span onClick={()=>{window.scroll(0,0)}}>Back to top <GoArrowUp className="inline" /></span></span> {/*href to page top */}
            </div>
            <div className="flex justify-between items-start pb-3 ">
                <div>
                    <span className="font-medium">Social Media</span>
                    <div className="flex justify-start space-x-4 pt-4 pb-6 ">
                        <FaTwitter className="inline justify-self-start"  />
                        <FaInstagram className="inline" onClick={()=>{window.open("https://www.instagram.com/vals.co_tech?igshid=NTc4MTIwNjQ2YQ%3D%3D")}}/>
                        <IoLogoFacebook className="inline" onClick={()=>{window.open("https://www.facebook.com/people/Jurident/61550764448476/?mibextid=ZbWKwL","_blank");}} />
                    </div>
                    <div className="flex flex-col ">
                        <span>Phone</span>
                        <span>+91 63861 89089</span>
                        <span>+91 78400 99836</span>
                    </div>
                </div>
                <div className="mt-5 space-y-6 pb-4">
                    <div className="flex flex-col">
                        <span>E-mail</span>
                        <a href="mailto:jurudentyi@gmail.com">jurudentyi@gmail.com</a>
                    </div>
                    <div className="flex flex-col">
                        <span>Support</span>
                        <a href="mailto:Connect@valscotech.com">Connect@valscotech.com</a>
                    </div>
                </div>
            </div>
            <hr className=" h-[0.01rem] bg-white mx-auto"></hr>
            <div className="flex justify-between mt-4 ">
                <span>Copyrights</span>
                <span className="font-bold">India</span>
            </div>
            <center><buton className="bg-[#2A4ECA] rounded-[30px] w-[22rem] h-[2rem] p-[0.2rem]" onClick={()=>{window.open("https://www.valscotech.com/")}}><GoArrowDownRight className="inline mr-2"/>Check out  more Services by Valsco Tech</buton></center>
        </div>
    )
}
