import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { GoArrowDownRight } from "react-icons/go";
import ImageViewer from "react-simple-image-viewer";
import { ThemeContext } from "./ThemeContext"; // Make sure this path is correct
import shelf from "../assets/images/shelf.png";
import img3 from "../assets/images/image3.png";
import img4 from "../assets/images/image4.png";

// Temporarily storing values locally
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

// Hook to get the query parameter
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function NotesPage() {
  const { theme } = useContext(ThemeContext);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const query = useQuery();
  const searchQuery = query.get("search") || ""; // Get search query from URL

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery]);

  const openImageViewer = (index, item) => {
    setImages([item.image1, item.image2]);
    setCurrentImageIndex(index);
    setIsViewerOpen(true);
  };

  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };

  const handleCheckboxChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // If no filters are applied, display all data
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

  return (
    <div
      className={`font-clash overflow-hidden ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Navigation bar */}
      <div className="scale-[0.5] sm:scale-100 sm:pt-10 lg:mb-[-1rem]">
        {/* Search Box Section */}
        <div className="flex justify-center lg:mt-0 mt-[-10rem]">
          <div className="flex justify-center pb-20 pt-20">
            <form onSubmit={handleSubmit}>
              <div
                className={`max-w-[58.5rem] min-w-[37.875rem] 
                bg-white text-black pl-12 lg:pr-8 pr-1 pb-10 rounded-2xl`}
              >
                <div
                  className={`text-[3.1rem] font-[600] pt-3 
                  `}
                >
                  Search Notes
                </div>
                <div className="flex justify-center gap-x-12">
                  <div className="pt-12">
                    <div
                      className={`text-2xl pb-3 font-[300] 
                      `}
                    >
                      Price Range
                    </div>
                    <div className="grid grid-rows-2 grid-cols-2 gap-x-16 pb-4">
                      <div
                        className={`pb-1 text-xl 
                          `}
                      >
                        Min
                      </div>
                      <div
                        className={`pb-1 text-xl
                        `}
                      >
                        Max
                      </div>
                      <div>
                        <input
                          className="bg-[#d9d9d9] h-11 rounded-lg w-32 lg:w-auto"
                          type="text"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                        />
                      </div>
                      <div>
                        <input
                          className="bg-[#d9d9d9] h-11 rounded-lg w-32 lg:w-auto"
                          type="text"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                        />
                      </div>
                    </div>
                    <div
                      className={`pb-4 text-xl `}
                    >
                      Note Type
                    </div>
                    <div className="flex justify-normal gap-x-9 pb-4">
                      <div
                        className={`relative bg-[#d9d9d9]
                       flex flex-col justify-end h-24 px-5 w-fit rounded-lg cursor-pointer ${
                          selectedTypes.includes("class notes")
                            ? "border border-black"
                            : ""
                        }`}
                        onClick={() => handleCheckboxChange("class notes")}
                      >
                        <div
                          className={`text-sm pb-2`}
                        >
                          Class Notes
                        </div>
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
                        onClick={() => handleCheckboxChange("lecture notes")}
                      >
                        <div
                          className={`text-sm pb-2 `}
                        >
                          Lecture Notes
                        </div>
                        {selectedTypes.includes("lecture notes") && (
                          <div className="absolute top-4 right-12 text-black text-4xl">
                            &#10003;
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="bg-[#a883c5] mt-5 w-fit px-5 py-1 rounded-full cursor-pointer flex items-center"
                    >
                      <GoArrowDownRight size={25} className="inline" />
                      <span className="text-[1.25rem] font-semibold">
                        Search Notes
                      </span>
                    </button>
                  </div>
                  <div className="pt-7 scale-[0.8] w-[22rem]">
                    <img
                      className="w-[22rem] h-[22rem] rounded-[0.75rem]"
                      src={shelf}
                      alt="Shelf"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Displaying Filtered Results */}
      <div className="flex justify-center">
        <div className="w-[60rem]">
          <div className="grid justify-items-center sm:grid-cols-3 grid-cols-2 gap-x-[18rem] gap-y-[3rem]">
            {filteredData.length === 0 ? (
              <p
                className={`${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                No notes found for "{searchQuery}"
              </p>
            ) : (
              filteredData.map((item, index) => (
                <a
                  key={item.id}
                  className={`bg-white text-black p-3 rounded-2xl w-[18rem] h-[18rem]`}
                >
                  <div className="flex justify-normal gap-x-4 items-center">
                    <div
                      className={`pt-1 pl-2 font-[400] text-lg `}
                    >
                      {item.department}
                    </div>
                    <div
                      className={`bg-[#a883c5] px-5 py-0 h-4 rounded-[0.225rem] font-[500] text-sm flex flex-col justify-center `}
                    >
                      <div className="font-[400]">{item.school}</div>
                    </div>
                  </div>
                  <div className="flex justify-center gap-3">
                    <img
                      className="w-[7.5rem] h-[7.5rem] rounded-[0.75rem]"
                      src={item.image1}
                      onClick={() => openImageViewer(index, item)}
                      alt="Image 1"
                    />
                    <img
                      className="w-[7.5rem] h-[7.5rem] rounded-[0.75rem]"
                      src={item.image2}
                      onClick={() => openImageViewer(index, item)}
                      alt="Image 2"
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <div
                      className={`font-[400] pt-2 text-xl `}
                    >
                      {item.title}
                    </div>
                    <div
                      className={`pt-2 font-[400] text-xl `}
                    >
                      ${item.price.toFixed(2)}
                    </div>
                    <div
                      className={`pt-1 font-[400] text-md `}
                    >
                      Modules covered: {item.modulesCovered}
                    </div>
                  </div>
                </a>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Image Viewer */}
      {isViewerOpen && (
        <ImageViewer
          src={images}
          currentIndex={currentImageIndex}
          onClose={closeImageViewer}
          backgroundStyle={{
            backgroundColor: theme === "dark" ? "rgba(0, 0, 0, 0.9)" : "rgba(255, 255, 255, 0.9)",
          }}
        />
      )}
    </div>
  );
}
