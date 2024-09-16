import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EditAccountPage() {
  const navigate = useNavigate();

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
  const [isProfilePicCustom, setIsProfilePicCustom] = useState(false); // State for button visibility

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
      setIsProfilePicCustom(profilePicUrl !== defaultProfilePic); // Update button visibility state
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
    navigate("/account"); // Navigate back to AccountPage
  };

  // Handle log out action
  const handleLogOut = () => {
    navigate("/login"); // Navigate to LoginPage
  };

  // Handle profile picture upload when user clicks on the profile image
  const handleProfilePicClick = () => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = "image/*";
    inputElement.onchange = handleProfilePicChange;
    inputElement.click();
  };

  // Handle profile picture change
  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result); // Set the new profile picture URL
        setIsProfilePicCustom(true); // Show the remove button
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle removing the profile picture
  const handleRemoveProfilePic = () => {
    setProfilePic(defaultProfilePic); // Reset to default placeholder image
    setIsProfilePicCustom(false); // Hide the remove button
  };

  // Handle profile picture upload when user clicks the "Change Photo" button
  const handleChangePhoto = () => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = "image/*";
    inputElement.onchange = handleProfilePicChange;
    inputElement.click();
  };

  return (
    <>
      {/* Profile Photo and User Details */}
      <div className="bg-backgound-color w-full md:w-dvh">
        <div className="text-white md:flex">
          {/* Profile Photo */}
          <div className="max-w-3xl w-full md:w-1/2 flex flex-col justify-center items-center">
            <img
              src={profilePic}
              alt="profilephoto"
              className="w-2/3 h-auto object-contain cursor-pointer"
              onClick={handleProfilePicClick}
            />
            <button
              onClick={handleChangePhoto}
              className="text-white bg-blue-500 text-xl cursor-pointer rounded-xl mt-5 font-semibold"
              style={{ width: "200px", height: "50px" }}
            >
              Change Photo
            </button>
            {isProfilePicCustom && (
              <button
                onClick={handleRemoveProfilePic}
                className="text-white bg-red-500 text-xl cursor-pointer rounded-xl mt-5 font-semibold"
                style={{ width: "200px", height: "50px" }}
              >
                Remove Photo
              </button>
            )}
          </div>

          {/* User Details */}
          <div className="w-auto md:w-1/3 mx-10 my-5">
            <div className="py-5 flex md:block">
              <div className="pb-3 text-xl">Name: </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="md:border-b-2 ml-5 md:ml-0 text-xl bg-black text-white border-b-2 border-white w-full"
              />
            </div>
            <div className="py-5 flex md:block">
              <div className="pb-3 text-xl">Room No: </div>
              <input
                type="text"
                value={roomNo}
                onChange={(e) => setRoomNo(e.target.value)}
                className="md:border-b-2 ml-5 md:ml-0 text-xl bg-black text-white border-b-2 border-white w-full"
              />
            </div>
            <div className="py-5 flex md:block">
              <div className="pb-3 text-xl">Department: </div>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="md:border-b-2 ml-5 md:ml-0 text-xl bg-black text-white border-b-2 border-white w-full"
              />
            </div>
            <div className="py-5 flex md:block">
              <div className="pb-3 text-xl">Specialization: </div>
              <input
                type="text"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="md:border-b-2 ml-5 md:ml-0 text-xl bg-black text-white border-b-2 border-white w-full"
              />
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="text-white mx-10 md:mx-40 md:w-96">
          <div className="py-5 flex md:block">
            <div className="pb-3 text-xl">Block: </div>
            <input
              type="text"
              value={block}
              onChange={(e) => setBlock(e.target.value)}
              className="md:border-b-2 ml-5 md:ml-0 text-xl bg-black text-white border-b-2 border-white w-full"
            />
          </div>
          <div className="py-5 flex md:block">
            <div className="pb-3 text-xl">Room No: </div>
            <input
              type="text"
              value={additionalRoomNo}
              onChange={(e) => setAdditionalRoomNo(e.target.value)}
              className="md:border-b-2 ml-5 md:ml-0 text-xl bg-black text-white border-b-2 border-white w-full"
            />
          </div>
          <div className="py-5 flex md:block">
            <div className="pb-3 text-xl">Department and Specialization: </div>
            <input
              type="text"
              value={additionalDeptSpec}
              onChange={(e) => setAdditionalDeptSpec(e.target.value)}
              className="md:border-b-2 ml-5 md:ml-0 text-xl bg-black text-white border-b-2 border-white w-full"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col justify-center items-center my-10">
          <button
            onClick={handleSave}
            className="text-white bg-[#A883C5] text-xl cursor-pointer rounded-xl mx-5 font-semibold"
            style={{ width: "500px", height: "100px" }}
          >
            Save
          </button>
          <button
            onClick={handleLogOut}
            className="text-white bg-[#A883C5] text-xl cursor-pointer rounded-xl mx-5 mt-5 font-semibold"
            style={{ width: "500px", height: "100px" }}
          >
            Log Out
          </button>
        </div>
      </div>
    </>
  );
}
