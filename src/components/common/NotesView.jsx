import React, { useState } from "react";
import shelf from "../../assets/images/shelf.png";
import img3 from "../../assets/images/image3.png";
import img4 from "../../assets/images/image4.png";
import { GoArrowDownRight } from "react-icons/go";

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


  return (
    <div className="font-clash overflow-hidden">

      {/* Displaying Filtered Results */}
      <div className="flex justify-center ">{/* Notes Display Section */}
        <div className="grid justify-center gap-x-10 lg:grid-cols-3 grid-cols-1 gap-y-[0.01rem] md:gap-y-11 lg:gap-y-10 sm:grid-cols-2 sm:pb-20 sm:gap-x-14 md:gap-x-32 lg:gap-x-10">
          {data.map((item) => (
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
