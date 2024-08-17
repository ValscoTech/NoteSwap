import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditAccountPage() {
  const navigate = useNavigate();

  // Initialize state for user details
  const [name, setName] = useState('Your Name');
  const [roomNo, setRoomNo] = useState('Your Room No');
  const [department, setDepartment] = useState('Your Department');
  const [specialization, setSpecialization] = useState('Your Specialization');
  const [block, setBlock] = useState('');
  const [additionalRoomNo, setAdditionalRoomNo] = useState('');
  const [additionalDeptSpec, setAdditionalDeptSpec] = useState('');
  const [profilePic, setProfilePic] = useState('src/components/images/userProfilePhoto.png');

  // Handle save action
  const handleSave = () => {
    // Save user details and profile pic here
    localStorage.setItem(
      'userDetails',
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
    navigate('/account'); // Navigate back to AccountPage
  };

  // Handle log out action
  const handleLogOut = () => {
    navigate('/login'); // Navigate to LoginPage
  };

  // Handle profile picture upload when user clicks on the profile image
  const handleProfilePicClick = () => {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = 'image/*';
    inputElement.onchange = handleProfilePicChange;
    inputElement.click();
  };

  // Handle profile picture change
  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* Navbar Component to be added */}

      <div className="bg-black w-full md:w-dvh">
        {/* Profile Photo and User Details */}
        <div className="text-white md:flex">
          {/* Profile Photo */}
          <div className="max-w-3xl w-full md:w-1/2 flex justify-center">
            <img
              src={profilePic}
              alt="profilephoto"
              className="w-2/3 h-auto object-contain cursor-pointer"
              onClick={handleProfilePicClick}
            />
          </div>

          {/* User Details */}
          <div className="w-auto md:w-1/3 mx-10 my-5">
            <div className="py-5 flex md:block">
              <div className="pb-3 text-xl">Name: </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="md:border-b-2 ml-5 md:ml-0 text-xl bg-black text-white border-b-2 border-white"
              />
            </div>
            <div className="py-5 flex md:block">
              <div className="pb-3 text-xl">Room No: </div>
              <input
                type="text"
                value={roomNo}
                onChange={(e) => setRoomNo(e.target.value)}
                className="md:border-b-2 ml-5 md:ml-0 text-xl bg-black text-white border-b-2 border-white"
              />
            </div>
            <div className="py-5 flex md:block">
              <div className="pb-3 text-xl">Department: </div>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="md:border-b-2 ml-5 md:ml-0 text-xl bg-black text-white border-b-2 border-white"
              />
            </div>
            <div className="py-5 flex md:block">
              <div className="pb-3 text-xl">Specialization: </div>
              <input
                type="text"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="md:border-b-2 ml-5 md:ml-0 text-xl bg-black text-white border-b-2 border-white"
              />
            </div>
          </div>
        </div>

        {/* Additional User Details */}
        <div className="text-white mx-10 md:mx-40">
          <div className="py-5 flex items-center">
            <label htmlFor="block" className="text-xl w-40">Block:</label>
            <input
              id="block"
              type="text"
              value={block}
              onChange={(e) => setBlock(e.target.value)}
              className="border-b-2 text-xl bg-black text-white border-none flex-1"
              placeholder="          "
            />
          </div>
          <div className="py-5 flex items-center">
            <label htmlFor="additionalRoomNo" className="text-xl w-40">Room No:</label>
            <input
              id="additionalRoomNo"
              type="text"
              value={additionalRoomNo}
              onChange={(e) => setAdditionalRoomNo(e.target.value)}
              className="border-b-2 text-xl bg-black text-white border-none flex-1"
              placeholder="          "
            />
          </div>
          <div className="py-5 items-center">
            <label htmlFor="additionalDeptSpec" className="text-xl w-40">Department and Specialization:</label>
            <input
              id="additionalDeptSpec"
              type="text"
              value={additionalDeptSpec}
              onChange={(e) => setAdditionalDeptSpec(e.target.value)}
              className="border-b-2 text-xl bg-black text-white border-none flex-1"
              placeholder="                  "
            />
          </div>
        </div>

        {/* Save and Log Out Buttons */}
        <div className="flex justify-center my-80">
          <div className="flex flex-col items-center">
            <button
              className="text-white bg-[#A883C5] text-xl md:text-3xl w-[800px] h-[167px] text-center cursor-pointer rounded-xl mb-5 font-semibold py-3"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="text-white bg-[#A883C5] text-xl md:text-3xl w-[800px] h-[167px] text-center cursor-pointer rounded-xl font-semibold py-3"
              onClick={handleLogOut}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>

      {/* Footer Component to be added */}
    </>
  );
}
