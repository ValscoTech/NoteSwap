import Footer from "@/components/layout/footer";
import { useNavigate } from "react-router-dom";

export default function AccountPage() {

  const navigate = useNavigate();

  const handleChange = () => {
    navigate('/edit-account'); // Navigate to edit account page
  };

  return (
    <>
      {/* Navbar Component to be added*/}

      <div className="bg-backgound-color w-full md:w-dvh">
        {/* Edit and Darkmode button */}
        <div className="justify-end items-center flex">
          <button onClick={handleChange} className="text-white bg-[#A883C5] text-xl md:text-3xl h-max text-center cursor-pointer rounded-xl my-5 mx-5 px-8 md:px-16 font-semibold py-3">
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
              src="/src/assets/images/userProfilePhoto.png"
              alt="profilephoto"
              className="w-2/3 h-auto object-contain"
            />
          </div>

          {/* User Details */}
          <div className="w-auto md:w-1/3 mx-10 my-5">
            <div className="py-5 flex md:block">
              <div className="pb-3 text-xl">Name: </div>
              <div className="md:border-b-2 ml-5 md:ml-0 text-xl">
                Your Name
              </div>
            </div>
            <div className="py-5 flex md:block">
              <div className="pb-3 text-xl">Room No: </div>
              <div className="md:border-b-2 ml-5 md:ml-0 text-xl">
                Your Room no
              </div>
            </div>
            <div className="py-5 flex md:block">
              <div className="pb-3 text-xl">Department: </div>
              <div className="md:border-b-2 ml-5 md:ml-0 text-xl">
                Your Department
              </div>
            </div>
            <div className="py-5 flex md:block">
              <div className="pb-3 text-xl">Specialization: </div>
              <div className="md:border-b-2 ml-5 md:ml-0 text-xl">
                Your Specialization
              </div>
            </div>
          </div>
        </div>

        {/* More User Details  */}
        <div className="text-white text-2xl mx-10 md:mx-40 md:w-96">
          <h1 className="py-5">Block: </h1>
          <h1 className="py-5">Room no: </h1>
          <h1 className="py-5">Department and Specialization: </h1>
        </div>

        {/* Offers made: */}
        <div className="text-white text-4xl mt-20 mx-10 md:mx-40 md:w-96">
          <h1>Offers Made</h1>
          {/* Notes Components to be added*/}
        </div>

        {/* Notes rented: */}
        <div className="text-white text-4xl mt-20 mx-10 md:mx-40 md:w-96">
          <h1>Notes Rented</h1>
          {/* Notes Components to be added*/}
        </div>
      </div>

      <Footer />
    </>
  );
}
