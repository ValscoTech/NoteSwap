import React, { useState } from "react";
import img3 from "../../assets/images/image3.png";
import ImageViewer from "react-simple-image-viewer";
import img4 from "../../assets/images/image4.png";


{/*Temporarily storing values locally */}
const data = [  
  {
    id: 1,
    title: "Computation of Science",
    type: "class notes",
    price: 15.0,
    image1: img3,
    image2: img4,
    modulesCovered: 9,
    department: "SCI2005",
    school: "SCOPE",
    link: "/notes/computation-of-science",
  },
  {
    id: 2,
    title: "Computation of Social",
    type: "class notes",
    price: 20.0,
    image1: img3,
    image2: img4,
    modulesCovered: 4,
    department: "SOC2005",
    school: "SCOPE",
    link: "/notes/computation-of-social",
  },
  {
    id: 3,
    title: "Computation of English",
    type: "lecture notes",
    price: 10.0,
    image1: img3,
    image2: img4,
    modulesCovered: 7,
    department: "ENG2005",
    school: "SCOPE",
    link: "/notes/computation-of-english",
  },
  {
    id: 4,
    title: "Computation of Mathematics",
    type: "lecture notes",
    price: 25.0,
    image1: img3,
    image2: img4,
    modulesCovered: 6,
    department: "MAT2005",
    school: "SCOPE",
    link: "/notes/computation-of-mathematics",
  },

];

export default function NotesView() {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);

  const openImageViewer = (index, item) => {
    setImages([item.image1, item.image2]);
    setCurrentImageIndex(index);
    setIsViewerOpen(true);
  };

  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };

  return (
    <div className="font-clash overflow-hidden">

      {/* Displaying Filtered Results */}
      <div className="flex justify-center">
            {/* Notes Display Section */}
            <div className="w-[60rem]">
              <div className="  grid justify-items-center sm:grid-cols-3 grid-cols-2 md:gap-y-14 lg:grid-cols-3 md:gap-x-[1rem] lg:gap-x-3 sm:gap-x-1 mobile:gap-y-10 mobile:gap-x-72 gap-x-[18rem] gap-y-[3rem] ">
                {data.map((item, index) => (
                  <a
                    key={item.id}
                    className="bg-white text-black p-3 rounded-2xl w-[18rem] h-[18rem] md:scale-100">
                    {/* Component Part */}
                    <div className="flex justify-normal gap-x-4 items-center">
                      {/* Department + Year, Respective School */}
                      <div className="pt-1 pl-2 font-[400] text-lg">
                        {item.department}
                      </div>
                      <div className="bg-[#a883c5] px-5 py-0 h-4 rounded-[0.225rem] font-[500] text-sm flex flex-col justify-center">
                        <div className="font-[525]">{item.school}</div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-x-2 pb-4 pl-0">
                      {/* Course and Modules Covered */}
                      <div className="text-[1.15rem] font-[425] w-[8.7rem]">
                        {item.title}
                      </div>
                      <div className="flex justify-normal border-[1.25px] border-black rounded-[0.7rem] w-fit items-center p-2 gap-x-1">
                        <div className="text-sm leading-4">
                          Modules
                          <br /> Covered
                        </div>
                        <div className="text-4xl">{item.modulesCovered}</div>
                      </div>
                    </div>
                    <div className="flex justify-normal">
                      {/* Images Part */}
                      <div>
                        <img
                          className="w-32 cursor-pointer"
                          src={item.image1}
                          onClick={() => openImageViewer(0, item)}
                        />
                      </div>
                      <div>
                        <img
                          className="w-32 cursor-pointer"
                          src={item.image2}
                          onClick={() => openImageViewer(1, item)}
                        />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          {isViewerOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          style={{
            width: "100vw", // Cover the entire screen width
            height: "100vh", // Cover the entire screen height
          }}>
          <ImageViewer
            src={images}
            className="min-w-full"
            currentIndex={currentImageIndex}
            disableScroll={true}
            closeOnClickOutside={true}
            onClose={closeImageViewer}
            backgroundStyle={{
              backgroundColor: "rgba(0, 0, 0, 0.9)", // Dark background
              zIndex: 9999,
              width: "100%", // Full width for the background
              height: "100", // Full height for the background
            }}
          />
        </div>
      )}
      {/*The footer part */}
    </div>
  );
}
