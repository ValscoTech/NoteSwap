import React, { useState } from "react";
import Footer from "@/components/layout/footer";
import shelf from "../assets/images/shelf.png";
import img3 from "../assets/images/image3.png";
import img4 from "../assets/images/image4.png";
import img1 from "../assets/images/1.png";
import ph from "../assets/images/phone.png";
import { useNavigate } from "react-router-dom";
import { GoArrowDownRight } from "react-icons/go";
import Navbar from "@/components/layout/navbar";

{/*Storing JSon file temporarily untill integration with backend*/}
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

export default function NotesPage() {
  const navigate=useNavigate();
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
    <div className="font-clash">
      {/*The navigation Bar */}
      <div className="bg-black">
        {/* Home Section */}
        <div className="flex justify-center gap-x-[1rem] pt-20 pb-20">
          <div className="text-white text-[2.6rem] font-normal leading-normal font-clash flex flex-col justify-between">
            <div>
              Want to earn some{" "}
              <span className="text-main font-bold">Side hustle</span>
              <br /> from all that
              <span className="text-main font-bold"> Hardwork</span> you do
              <br /> in making{" "}
              <span className="text-main font-bold">Notes ?</span>
            </div>
            <div className="pb-20">
              {/*Button Section */}
              <button className="flex items-center justify-center px-5 py-3 mx-5 text-white text-xl font-semibold bg-[#a883c5] rounded-2xl border-none cursor-pointer" onClick={()=>{navigate("/rent")}}>
                <svg
                  className="w-7 h-7 fill-white mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 27 28"
                  fill="none"
                >
                  <path
                    d="M26.9054 27.1098V6.16286L23.9535 6.16286L23.943 22.0511L2.82959 0.926117L0.73604 3.02082L21.8495 24.1458L5.96991 24.1563V27.1098H26.9054Z"
                    fill="white"
                  />
                </svg>
                RENT NOTES
              </button>
            </div>
          </div>
          <img className="w-[300px] h-auto object-cover" src={img1} />
        </div>

        {/* Container Section */}
        <div className="flex justify-center items-center w-full pb-20">
          <div className="flex justify-center gap-x-20 items-center w-fit rounded-xl bg-white px-14 py-8">
            <div className="flex flex-col justify-between items-start text-5xl font-normal text-black">
              <p className="pb-4">Have you Tried our App?</p>
              <p>
                <span>Notes On The GO</span>
              </p>
              <button className="flex items-center justify-center p-4 text-white text-xl font-semibold bg-[#a883c5] rounded-3xl border-none cursor-pointer mt-24">
                <svg
                  className="w-7 h-7 fill-white mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 27 28"
                  fill="none"
                >
                  <path
                    d="M26.9054 27.1098V6.16286L23.9535 6.16286L23.943 22.0511L2.82959 0.926117L0.73604 3.02082L21.8495 24.1458L5.96991 24.1563V27.1098H26.9054Z"
                    fill="white"
                  />
                </svg>
                Download RentSwap
              </button>
            </div>
            <img className="w-48 object-cover" src={ph} alt="iPhone" />
          </div>
        </div>
      </div>

      {/* Notes Display Section */}
      <div className="flex justify-center gap-x-11">
        {filteredData.map((item) => (
          <a
            key={item.id}
            href={item.link}
            className="bg-white text-black p-4 rounded-2xl w-fit"
          >
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

      {/* Search Box Section */}
      <div>
      <div className="flex justify-center pb-20 pt-20">
        <form onSubmit={handleSubmit}>
          <div className="w-fit bg-white text-black pl-12 pr-8 pb-10 rounded-2xl">
            <div className="text-[3.1rem] font-[600] pt-3">Search Notes</div>
            <div className="flex justify-center gap-x-12">
              <div className="pt-12">
                <div className="text-2xl pb-3 font-[300]">Price Range</div>
                <div className="grid grid-rows-2 grid-cols-2 gap-x-16 pb-4">
                  <div className="pb-1 text-xl">Min</div>
                  <div className="pb-1 text-xl">Max</div>
                  <div>
                    <input
                      className="bg-[#d9d9d9] h-11 rounded-lg"
                      type="text"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      className="bg-[#d9d9d9] h-11 rounded-lg"
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
                    onClick={() => handleCheckboxChange("class notes")}
                  >
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
                    onClick={() => handleCheckboxChange("lecture notes")}
                  >
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
                  className="bg-[#a883c5] mt-5 w-fit px-5 py-1 rounded-full cursor-pointer flex items-center"
                >
                  <GoArrowDownRight size={25} className="inline" />
                  <span className="text-[1.25rem] font-semibold">
                    Search Notes
                  </span>
                </button>
              </div>
              <div className="pt-7">
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
  );
}
