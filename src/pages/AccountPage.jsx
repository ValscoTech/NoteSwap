import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "Your Name",
    roomNo: "Your Room No",
    department: "Your Department",
    specialization: "Your Specialization",
    block: "",
    additionalRoomNo: "",
    additionalDeptSpec: "",
    profilePic: "/src/assets/images/userProfilePhoto.png",
  });

  // Retrieve the data from localStorage when AccountPage loads
  useEffect(() => {
    const savedDetails = localStorage.getItem("userDetails");
    if (savedDetails) {
      setUserDetails(JSON.parse(savedDetails));
    }
  }, []);

  const handleChange = () => {
    navigate("/edit-account"); // Navigate to edit account page
  };

  return (
    <>
      <div className="bg-backgound-color w-full md:w-dvh">
        {/* Edit and Darkmode button */}
        <div className="justify-end items-center flex">
          <button
            onClick={handleChange}
            className="text-white bg-[#A883C5] text-xl md:text-3xl h-max text-center cursor-pointer rounded-xl my-5 mx-5 px-8 md:px-16 font-semibold py-3"
          >
            Edit
          </button>
          <img
            src="/src/assets/images/darkmodebutton.png"
            alt="darkmode btn"
            className="h-12 md:h-20 my-5 mr-5 cursor-pointer"
          />
        </div>

        {/* Profile Photo and User Details */}
        <div className="text-white md:flex">
          {/* profile photo  */}
          <div className="max-w-3xl w-full md:w-1/2 flex justify-center">
            <img
              src={userDetails.profilePic}
              alt="profilephoto"
              className="w-2/3 h-auto object-contain"
            />
          </div>

          {/* User Details */}
          <div className="w-auto md:w-1/3 mx-10 my-5">
            <div className="py-5 flex md:block">
              <div className="pb-3 text-xl">Name: </div>
              <div className="md:border-b-2 ml-5 md:ml-0 text-xl">
                {userDetails.name}
              </div>
            </div>
            <div className="py-5 flex md:block">
              <div className="pb-3 text-xl">Room No: </div>
              <div className="md:border-b-2 ml-5 md:ml-0 text-xl">
                {userDetails.roomNo}
              </div>
            </div>
            <div className="py-5 flex md:block">
              <div className="pb-3 text-xl">Department: </div>
              <div className="md:border-b-2 ml-5 md:ml-0 text-xl">
                {userDetails.department}
              </div>
            </div>
            <div className="py-5 flex md:block">
              <div className="pb-3 text-xl">Specialization: </div>
              <div className="md:border-b-2 ml-5 md:ml-0 text-xl">
                {userDetails.specialization}
              </div>
            </div>
          </div>
        </div>

        {/* More User Details */}
        <div className="text-white text-2xl mx-10 md:mx-40 md:w-96">
          <h1 className="py-5">Block: {userDetails.block}</h1>
          <h1 className="py-5">Room no: {userDetails.additionalRoomNo}</h1>
          <h1 className="py-5">
            Department and Specialization: {userDetails.additionalDeptSpec}
          </h1>
        </div>
      </div>
    </>
  );
}
