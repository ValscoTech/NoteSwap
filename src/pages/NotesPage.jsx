import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/layout/footer";
import shelf from "../assets/images/shelf.png";
import img3 from "../assets/images/image3.png";
import img4 from "../assets/images/image4.png";
import { GoArrowDownRight } from "react-icons/go";
import Navbar from "@/components/layout/navbar";


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

export default function NotesPage() {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [filteredData, setFilteredData] = useState(data);

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
    <div className="font-clash overflow-hidden">
      {/*The navigation bar */}
      <div className="scale-[0.5] sm:scale-100 sm:pt-10 lg:mb-[-1rem] ">{/* Search Box Section */}
        <div className="flex justify-center  lg:mt-0 mt-[-10rem] ">
          <div className="flex justify-center pb-20 pt-20 ">
            <form onSubmit={handleSubmit}>
              <div className="max-w-[58.5rem] min-w-[37.875rem] bg-white text-black pl-12 lg:pr-8 pr-1 pb-10 rounded-2xl ">
                <div className="text-[3.1rem] font-[600] pt-3">
                  Search Notes
                </div>
                <div className="flex justify-center gap-x-12">
                  <div className="pt-12">
                    <div className="text-2xl pb-3 font-[300]">Price Range</div>
                    <div className="grid grid-rows-2 grid-cols-2 gap-x-16 pb-4">
                      <div className="pb-1 text-xl">Min</div>
                      <div className="pb-1 text-xl">Max</div>
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
                          className="bg-[#d9d9d9] h-11 rounded-lg w-32 lg:w-auto    "
                          type="text"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="pb-4 text-xl">Note Type</div>
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
          {/*Footer Part */}
        </div>
      </div>

      {/* Displaying Filtered Results */}
      <div className="flex justify-center ">{/* Notes Display Section */}
        <div className="grid justify-center gap-x-10 lg:grid-cols-3 grid-cols-1 gap-y-[0.01rem] md:gap-y-11 lg:gap-y-10 sm:grid-cols-2 sm:pb-20 sm:gap-x-14 md:gap-x-32 lg:gap-x-10">
          {filteredData.map((item) => (
            <a
              key={item.id}
              href={item.link}
              className="bg-white text-black p-4 rounded-2xl w-[17.5rem] lg:scale-100 scale-75 md:scale-[1.1] sm:scale-[0.8] ">
              {/* Component Part */}
              <div className="flex justify-normal gap-x-4 items-start">
                {/* Department + Year, Respective School */}
                <div className="pt-1">{item.department}</div>
                <div className="bg-[#a883c5] px-5 h-5 rounded-sm font-[500] text-sm flex flex-col justify-center">
                  <div>{item.school}</div>
                </div>
              </div>
              <div className="flex justify-between pb-4">
                {/* Course and Modules Covered */}
                <div className="text-lg w-[8.5rem]">{item.title}</div>
                <div className="flex justify-normal border-2 border-black rounded-[0.7rem] w-fit items-center p-2 gap-x-2">
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
                  <img className="w-32" src={item.image1} />
                </div>
                <div>
                  <img className="w-32" src={item.image2} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      {/*The footer part */}
    </div>
  );
}
