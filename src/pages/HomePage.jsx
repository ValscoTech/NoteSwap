import React, { useState, useCallback, useContext } from "react";
import ImageViewer from "react-simple-image-viewer";
import shelf from "../assets/images/shelf.png";
import img3 from "../assets/images/image3.png";
import img4 from "../assets/images/image4.png";
import img1 from "../assets/images/1.png";
import ph from "../assets/images/phone.png";
import { useNavigate } from "react-router-dom";
import { GoArrowDownRight } from "react-icons/go";
import { ThemeContext } from "./ThemeContext";
import "../styles/ThemeContext.css"

{
  /*Storing JSon file temporarily untill integration with backend*/
}
const data = [
  {
    id: 1,
    title: "Computation of Mathematics",
    type: "class notes",
    price: 10.0,
    image1: img3,
    image2: img4,
    modulesCovered: 8,
    department: "CSE2005",
    school: "SCOPE",
    link: "/path-to-note-1", // Link to the note detail page
  },
  {
    id: 2,
    title: "Computation of Mathematics",
    type: "class notes",
    price: 15.0,
    image1: img3,
    image2: img4,
    modulesCovered: 8,
    department: "CSE2005",
    school: "SCOPE",
    link: "/path-to-note-1", // Link to the note detail page
  },
  {
    id: 3,
    title: "Computation of Mathematics",
    type: "lecture notes",
    price: 20.0,
    image1: img3,
    image2: img4,
    modulesCovered: 8,
    department: "CSE2005",
    school: "SCOPE",
    link: "/path-to-note-1",
  },
];

export default function HomePage() {
  const {theme}=useContext(ThemeContext);
  const navigate = useNavigate();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);

  const handleCheckboxChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (minPrice === "" && maxPrice === "" && selectedTypes.length === 0) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter((item) => {
      const meetsPriceCriteria =
        (minPrice === "" || item.price >= parseFloat(minPrice)) &&
        (maxPrice === "" || item.price <= parseFloat(maxPrice));
      const meetsTypeCriteria =
        selectedTypes.length === 0 || selectedTypes.includes(item.type);

      return meetsPriceCriteria && meetsTypeCriteria;
    });

    setFilteredData(filtered);
  };

  const openImageViewer = (index, item) => {
    setImages([item.image1, item.image2]);
    setCurrentImageIndex(index);
    setIsViewerOpen(true);
  };

  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };

  const forwardData = (e) => {
    e &&e.preventDefault();
    
    const searchParams = {
      minPrice,
      maxPrice,
      selectedTypes,
    };

    // Navigate to the next page with serialized data in the URL
    navigate(`/notes?query=${encodeURIComponent(JSON.stringify(searchParams))}`);
  };

  return (
    <div className={`font-clash overflow-hidden w-full ${theme==="dark"?"bg-black":"bg-white"} `}>
      {/* Home Section */}
      <div className="flex mobile:flex-row flex-col justify-center gap-x-[2rem] mobile:gap-x-0  pt-20 pb-20 md:scale-90 lg:scale-[1.25] w-full md:mt-0 sm:mt-[-4rem] ">
        <div className={`text-xl md:text-[2.6rem] font-normal leading-normal font-clash flex flex-col justify-between ${theme==="dark"?"text-white":"text-black"}`}>
          <div className="flex justify-center sm:text-lg  md:text-3xl md:leading-[3rem] mobile:pl-10 sm:pl-0 mobile:pt-10 pl-0 pr-[0.1rem]">
            <div className="sm:leading-[3rem] md:leading-normal mobile:ml-7 sm:pt-10 md:pt-0 ">
              Want to earn some{" "}
              <span className="text-main font-[550]">Side hustle</span>
              <br /> from all that
              <span className="text-main font-[550]"> Hardwork</span> you do
              <br /> in making{" "}
              <span className="text-main font-[550]">Notes ?</span>
            </div>
          </div>
          <div className="pb-24 ml-[-1.12rem] mobile:inline hidden w-72 mobile:mt-10 mobile:pl-6  mobile:scale-[0.9] sm:scale-100">
            {/*Button Section */}
            <button
              className="flex items-center justify-center px-6 py-[0.6rem] mx-5 text-white text-[1rem] font-semibold bg-[#a883c5] rounded-[1.05rem] border-none cursor-pointer mobile:ml-16 sm:ml-6 mb-10"
              onClick={() => {
                navigate("/rent");
              }}>
              <svg
                className="w-5 h-5  fill-white mr-2 pb-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 27 28"
                fill="none">
                <path
                  d="M26.9054 27.1098V6.16286L23.9535 6.16286L23.943 22.0511L2.82959 0.926117L0.73604 3.02082L21.8495 24.1458L5.96991 24.1563V27.1098H26.9054Z"
                  fill="white"
                />
              </svg>
              RENT NOTES
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            className="max-w-[300px] h-auto object-scale-down lg:scale-100 mobile:scale-[0.8] sm:scale-[0.8] md:scale-100 sm:pb-0 scale-[0.7]"
            src={img1}
          />
        </div>
        <div className="mobile:hidden scale-[0.9] flex justify-center">
          <button
            className="flex items-center justify-center px-5 py-3 mx-5 text-white text-xl font-semibold bg-[#a883c5] rounded-2xl border-none cursor-pointer"
            onClick={() => {
              navigate("/rent");
            }}>
            <svg
              className="w-7 h-7 fill-white mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 27 28"
              fill="none">
              <path
                d="M26.9054 27.1098V6.16286L23.9535 6.16286L23.943 22.0511L2.82959 0.926117L0.73604 3.02082L21.8495 24.1458L5.96991 24.1563V27.1098H26.9054Z"
                fill="white"
              />
            </svg>
            RENT NOTES
          </button>
        </div>
      </div>

      {/*App Promo container + NotesView Part */}
      <div className="flex justify-center md:scale-75 lg:scale-[1] sm:scale-[0.6] mobile:scale-[0.45] lg:mt-0 md:mt-[-12rem] sm:mt-[-16rem] mobile:mt-[-25rem] scale-[0.32] mt-[-26rem]">
        <div className="flex flex-col items-center justify-center w-[60rem] mx-32">
          <div className="flex justify-center items-center pb-20 ">
            {/* Container Section */}
            <div className={`flex justify-center gap-x-16 items-center rounded-2xl ${theme==="dark"?"border-0":"border-2 border-black"}  pl-[3rem] pr-[6rem] pt-6 pb-8 max-w-[60rem]`}>
              <div className="flex flex-col justify-between items-start text-5xl font-normal text-black leading-[2.7rem]   ">
                <p className="pb-5">Have you Tried our App?</p>
                <p>
                  <span>Notes On The GO</span>
                </p>
                <button
                  className="flex items-center justify-center px-4 py-2 p-[0.75rem] text-black text-xl font-semibold bg-[#a883c5] rounded-3xl border-none cursor-pointer mt-16"
                  onClick={() => {
                    window.open(
                      "https://play.google.com/store/apps/details?id=com.jurident.valsco"
                    );
                  }}>
                  <svg
                    className="w-5 h-5 pb-1 fill-white mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 27 28"
                    fill="none">
                    <path
                      d="M26.9054 27.1098V6.16286L23.9535 6.16286L23.943 22.0511L2.82959 0.926117L0.73604 3.02082L21.8495 24.1458L5.96991 24.1563V27.1098H26.9054Z"
                      fill="black"
                    />
                  </svg>
                  Download RentSwap
                </button>
              </div>
              <img className="w-[10.5rem] " src={ph} alt="iPhone" />
            </div>
          </div>

          <div className="flex justify-center">
            {/* Notes Display Section */}
            <div className="w-[60rem]">
              <div className="  grid justify-items-center sm:grid-cols-3 grid-cols-2 md:gap-y-14 lg:grid-cols-3 md:gap-x-[1rem] lg:gap-x-3 sm:gap-x-1 mobile:gap-y-10 mobile:gap-x-72 gap-x-[18rem] gap-y-[3rem] ">
                {filteredData.map((item, index) => (
                  <a
                    key={item.id}
                    className={`bg-white text-black p-3 rounded-2xl w-[18rem] h-[18rem] md:scale-100 ${theme==="dark"?"border-0":"border-2 border-black"} `}>
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

      <div className=" flex justify-center lg:scale-100 md:scale-[0.76] sm:scale-[0.61] pt-10 mobile:scale-[0.45] lg:mt-0 md:mt-[-5rem] lg:mb-0 md:mb-[-4rem] sm:mt-[-12rem] sm:mb-[-6rem] mobile:mt-[-23rem] scale-[0.315] mt-[-35rem] mb-[-5rem]">
        {/* Search Box Section */}
        <div className=" min-w-[60rem] lg:mt-0 mt-[-10rem]">
          <div className="flex justify-center pb-20 pt-20 ">
            <form onSubmit={forwardData}>
              <div className={`bg-white text-black md:pl-12 pr-6 pb-12 rounded-2xl sm:pl-10 mobile:pl-16 pl-10 ${theme==="dark"?"border-0":"border-2 border-black"} `}>
                <div className="text-[3.1rem] font-[600] pt-3">
                  Search Notes
                </div>
                <div className="flex justify-center gap-x-12">
                  <div className="pt-12 ">
                    <div className="text-2xl pb-3 font-[300]">Price Range</div>
                    <div className="grid grid-rows-2 grid-cols-2 gap-x-16 pb-4">
                      <div className="pb-1 text-2xl font-light">Min</div>
                      <div className="pb-1 text-2xl font-light">Max</div>
                      <div>
                        <input
                          className="bg-[#d9d9d9] h-11 rounded-lg md:w-fit object-scale-down"
                          type="text"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                        />
                      </div>
                      <div>
                        <input
                          className="bg-[#d9d9d9] h-11 rounded-lg md:w-fit"
                          type="text"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="pb-4 text-2xl font-light">Note Type</div>
                    <div className="flex justify-normal gap-x-9 pb-4">
                      <div
                        className={`relative bg-[#d9d9d9] flex flex-col justify-end h-24 px-5 w-fit rounded-lg cursor-pointer ${
                          selectedTypes.includes("class notes")
                            ? "border border-black"
                            : ""
                        }`}
                        onClick={() => handleCheckboxChange("class notes")}>
                        <div className="text-sm pb-2">Class Notes</div>
                        {selectedTypes.includes("class notes") && (
                          <div className="absolute top-4 right-12 text-black text-4xl">
                            &#10003;
                          </div>
                        )}
                      </div>
                      <div
                        className={`relative bg-[#d9d9d9] flex flex-col justify-end h-24 px-3.5 w-fit rounded-lg cursor-pointer ${
                          selectedTypes.includes("lecture notes")
                            ? "border border-black"
                            : ""
                        }`}
                        onClick={() => handleCheckboxChange("lecture notes")}>
                        <div className="text-sm pb-2">Lecture Notes</div>
                        {selectedTypes.includes("lecture notes") && (
                          <div className="absolute top-4 right-12 text-4xl text-black">
                            &#10003;
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="bg-[#a883c5] mt-5 w-fit px-5 py-1 rounded-full cursor-pointer flex items-center">
                      <GoArrowDownRight size={25} className="inline pb-1" />
                      <span className="text-[1.25rem] font-[550]">
                        Search Notes
                      </span>
                    </button>
                  </div>
                  <div className="pt-7 scale-[1]">
                    <img
                      className=" rounded-[0.75rem] w-[21rem]"
                      src={shelf}
                      alt="Shelf"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/*Footer Part */}
        </div>
      </div>
    </div>
  );
}
