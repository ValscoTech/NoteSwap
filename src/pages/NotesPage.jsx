import React, { useState, useEffect, useContext, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { GoArrowDownRight } from "react-icons/go";
import FullscreenViewer from "@/components/common/FullScreenViewer";
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
    images:[img3,img4],
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
    images:[img3,img4],
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
    images:[img3,img4],
    modulesCovered: 7,
    department: "ENG2005",
    school: "SCOPE",
    link: "/notes/computation-of-english",
  },
  {
    id: 4,
    title: "Computation of English",
    type: "class notes",
    price: 25.0,
    images:[img3,img4],
    modulesCovered: 6,
    department: "MAT2005",
    school: "SCOPE",
    link: "/notes/computation-of-mathematics",
  },
];

// Hook to get the query parameter
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function NotesPage() {
  const { theme } = useContext(ThemeContext);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const query = useQuery();
  const [hasManualSearch, setHasManualSearch] = useState(false);
  const [linkIndex,setLinkIndex]=useState("");
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [params,setParams]=useState([]);
  const navigate=useNavigate();
  const searchQuery = query.get("search") || ""; // Get search query from URL

  useEffect(() => {//filtering the searchbar result.
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery]);

  useEffect(() => {
    if (isInitialLoad) {
      handleSubmit();
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      setIsInitialLoad(false); // Prevent future automatic submissions
    }
  }, [isInitialLoad, minPrice, maxPrice, selectedTypes]);

  useEffect(() => {
    const term = query.get("query");

    if (term && !hasManualSearch) {
      const parsedTerms = JSON.parse(decodeURIComponent(term));

      // Set the states only if necessary to avoid resetting values
      if (parsedTerms.minPrice !== undefined) setMinPrice(parsedTerms.minPrice);
      if (parsedTerms.maxPrice !== undefined) setMaxPrice(parsedTerms.maxPrice);
      if (parsedTerms.selectedTypes !== undefined)
        setSelectedTypes(parsedTerms.selectedTypes);

      // Set the manual search flag after the initial state update
      setHasManualSearch(true);
      setIsInitialLoad(true);
    }
  }, [query]);

  const handleCheckboxChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
    setHasManualSearch(true);
  };

  const handleSubmit = (e) => {
    e && e.preventDefault(); // Prevent page reload on form submit

    // If no filters are applied, display all data
    if (minPrice === "" && maxPrice === "" && selectedTypes.length === 0) {
      setFilteredData(data); // Reset to all data
      handleFunction(); // Update URL with empty search parameters
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

    // Update the filtered data
    setFilteredData(filtered);

    // Make sure the URL is updated based on current filters
    handleFunction();
  };

  const handleFunction = () => {
    // Build search params only for non-empty fields
    const searchParams = {};
    if (minPrice) searchParams.minPrice = minPrice;
    if (maxPrice) searchParams.maxPrice = maxPrice;
    if (selectedTypes.length > 0) searchParams.selectedTypes = selectedTypes;

    const encodedParams = encodeURIComponent(JSON.stringify(searchParams));
    if (Object.keys(searchParams).length > 0) {
      // Navigate with query parameters
      navigate(`/notes?query=${encodedParams}`);
    } else {
      // Navigate without query if no filters
      navigate(`/notes`);
    }
  };

  const openImageViewer = (imagesArray, index, linkIndex, item) => {
    setImages(imagesArray);
    setCurrentImageIndex(index);
    setIsViewerOpen(true);
    setLinkIndex(linkIndex);
    setParams(item);
  };

  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };

  return (
    <div
      className={`font-clash overflow-hidden ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      } `}
      onLoad={() => {
        setHasManualSearch(false);
      }}>
      <div className=" flex justify-center lg:scale-100 md:scale-[0.76] sm:scale-[0.61] pt-10 mobile:scale-[0.45] scale-[0.4] mt-[-6rem] mobile:mt-0">
        {/* Search Box Section */}
        <div className=" min-w-[60rem] lg:mt-0 mt-[-10rem]">
          <div className="flex justify-center pb-20 pt-20 ">
            <form onSubmit={handleSubmit}>
              <div
                className={`bg-white text-black md:pl-12 pr-6 pb-12 rounded-2xl sm:pl-10 mobile:pl-16 pl-10 ${
                  theme === "dark" ? "border-0" : "border-2 border-black"
                } `}>
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

      <div className="flex justify-center lg:scale-100 md:scale-[0.75] lg:mt-0 md:mt-[-10rem] sm:scale-[0.6] sm:mt-[-15rem] mobile:scale-[0.5] mobile:mt-[-20rem] scale-[0.4] mt-[-20rem]">
        
        {/* Notes Display Section */}
        <div className="min-w-[60rem]">
          <div className="grid justify-items-center sm:grid-cols-3 grid-cols-2 md:gap-y-14 lg:grid-cols-3 md:gap-x-[1rem] lg:gap-x-3 sm:gap-x-1 mobile:gap-y-10 mobile:gap-x-[10rem] gap-x-[18rem] gap-y-[3rem] ">
            {filteredData.map((item, index) => (
              <a
                key={item.id}
                className={`bg-white text-black p-3 rounded-2xl w-[18rem] h-[18rem] md:scale-100 ${
                  theme === "dark" ? "border-0" : "border-2 border-black"
                } `}>
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
                  {item.images.slice(0, 2).map((img, imgIndex) => (
                    <img
                      key={imgIndex}
                      className="w-32 h-36 object-cover cursor-pointer"
                      src={img}
                      onClick={() => openImageViewer(item.images, imgIndex,item.id,item)}
                      alt={`Image ${imgIndex}`}
                    />
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      {isViewerOpen && (
        <FullscreenViewer
          images={images}
          currentIndex={currentImageIndex}
          onClose={closeImageViewer}
          link={data[linkIndex-1].link}
          params={params}// Close the viewer
        />
      )}
    </div>
  );

}

export default memo(NotesPage);
