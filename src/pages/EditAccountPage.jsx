import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "./ThemeContext"; // Import ThemeContext

export default function EditAccountPage() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext); // Get the current theme

  // Initialize state for user details
  const [name, setName] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [department, setDepartment] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [block, setBlock] = useState("");
  const [additionalRoomNo, setAdditionalRoomNo] = useState("");
  const [additionalDeptSpec, setAdditionalDeptSpec] = useState("");
  const defaultProfilePic = "/src/assets/images/userProfilePhoto.png";
  const [profilePic, setProfilePic] = useState(defaultProfilePic);
  const [isProfilePicCustom, setIsProfilePicCustom] = useState(false);

  // Load existing data from localStorage
  useEffect(() => {
    const savedDetails = localStorage.getItem("userDetails");
    if (savedDetails) {
      const parsedDetails = JSON.parse(savedDetails);
      setName(parsedDetails.name);
      setRoomNo(parsedDetails.roomNo);
      setDepartment(parsedDetails.department);
      setSpecialization(parsedDetails.specialization);
      setBlock(parsedDetails.block);
      setAdditionalRoomNo(parsedDetails.additionalRoomNo);
      setAdditionalDeptSpec(parsedDetails.additionalDeptSpec);
      const profilePicUrl = parsedDetails.profilePic || defaultProfilePic;
      setProfilePic(profilePicUrl);
      setIsProfilePicCustom(profilePicUrl !== defaultProfilePic);
    }
  }, []);

  // Handle save action
  const handleSave = () => {
    localStorage.setItem(
      "userDetails",
      JSON.stringify({
        name,
        roomNo,
        department,
        specialization,
        block,
        additionalRoomNo,
        additionalDeptSpec,
        profilePic,
      })
    );
    navigate("/account");
  };

  // Handle log out action
  const handleLogOut = () => {
    navigate("/login");
  };

  // Handle profile picture upload
  const handleProfilePicClick = () => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = "image/*";
    inputElement.onchange = handleProfilePicChange;
    inputElement.click();
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        setIsProfilePicCustom(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProfilePic = () => {
    setProfilePic(defaultProfilePic);
    setIsProfilePicCustom(false);
  };

  const handleChangePhoto = () => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = "image/*";
    inputElement.onchange = handleProfilePicChange;
    inputElement.click();
  };

  return (
    <div className={`w-full md:w-dvh ${theme} min-h-screen`}>
      <div className={`text-current md:flex ${theme === "dark" ? " text-white" : "bg-white text-black"} p-10`}>
        {/* Profile Photo Section */}
        <div className="max-w-3xl w-full md:w-1/2 flex flex-col justify-center items-center">
          <img
            src={profilePic}
            alt="profilephoto"
            className="w-2/3 h-auto object-contain cursor-pointer"
            onClick={handleProfilePicClick}
          />
          <button
            onClick={handleChangePhoto}
            className="bg-blue-500 text-white text-xl cursor-pointer rounded-xl mt-5 font-semibold"
            style={{ width: "200px", height: "50px" }}
          >
            Change Photo
          </button>
          {isProfilePicCustom && (
            <button
              onClick={handleRemoveProfilePic}
              className="bg-red-500 text-white text-xl cursor-pointer rounded-xl mt-5 font-semibold"
              style={{ width: "200px", height: "50px" }}
            >
              Remove Photo
            </button>
          )}
        </div>

        {/* User Details Section */}
        <div className="w-auto md:w-1/3 mx-10 my-5">
          <div className="py-5 flex md:block">
            <div className="pb-3 text-xl">Name: </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="md:border-b-2 ml-5 md:ml-0 text-xl bg-transparent border-b-2 w-full"
            />
          </div>
          <div className="py-5 flex md:block">
            <div className="pb-3 text-xl">Room No: </div>
            <input
              type="text"
              value={roomNo}
              onChange={(e) => setRoomNo(e.target.value)}
              className="md:border-b-2 ml-5 md:ml-0 text-xl bg-transparent border-b-2 w-full"
            />
          </div>
          <div className="py-5 flex md:block">
            <div className="pb-3 text-xl">Department: </div>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="md:border-b-2 ml-5 md:ml-0 text-xl bg-transparent border-b-2 w-full"
            />
          </div>
          <div className="py-5 flex md:block">
            <div className="pb-3 text-xl">Specialization: </div>
            <input
              type="text"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="md:border-b-2 ml-5 md:ml-0 text-xl bg-transparent border-b-2 w-full"
            />
          </div>
        </div>
      </div>

      {/* Additional Details Section */}
      <div className={`text-current mx-10 md:mx-40 md:w-96 ${theme === "dark" ? "text-white" : "text-black"}`}>
        <div className="py-5 flex md:block">
          <div className="pb-3 text-xl">Block: </div>
          <input
            type="text"
            value={block}
            onChange={(e) => setBlock(e.target.value)}
            className="md:border-b-2 ml-5 md:ml-0 text-xl bg-transparent border-b-2 w-full"
          />
        </div>
        <div className="py-5 flex md:block">
          <div className="pb-3 text-xl">Room No: </div>
          <input
            type="text"
            value={additionalRoomNo}
            onChange={(e) => setAdditionalRoomNo(e.target.value)}
            className="md:border-b-2 ml-5 md:ml-0 text-xl bg-transparent border-b-2 w-full"
          />
        </div>
        <div className="py-5 flex md:block">
          <div className="pb-3 text-xl">Department and Specialization: </div>
          <input
            type="text"
            value={additionalDeptSpec}
            onChange={(e) => setAdditionalDeptSpec(e.target.value)}
            className="md:border-b-2 ml-5 md:ml-0 text-xl bg-transparent border-b-2 w-full"
          />
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col justify-center items-center my-10">
        <button
          onClick={handleSave}
          className="bg-[#A883C5] text-white text-xl cursor-pointer rounded-xl mx-5 font-semibold"
          style={{ width: "500px", height: "100px" }}
        >
          Save
        </button>
        <button
          onClick={handleLogOut}
          className="bg-[#A883C5] text-white text-xl cursor-pointer rounded-xl mx-5 mt-5 font-semibold"
          style={{ width: "500px", height: "100px" }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
