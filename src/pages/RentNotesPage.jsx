import { memo, React, useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useLocation } from "react-router-dom";

import "../styles/calendar.css";
import img1 from "../components/rent/2f855903-01c1-4bf6-b337-124bdebd2d8f.jpg";
import img2 from "../components/rent/2f855903-01c1-4bf6-b337-124bdebd2d8f1.jpg";
import img3 from "../components/rent/2f855903-01c1-4bf6-b337-124bdebd2d8f2.jpg";
import img4 from "../components/rent/2f855903-01c1-4bf6-b337-124bdebd2d8f2.jpg";
import NotesView from "@/components/common/NotesView";
import { useContext } from "react";
import "../styles/ThemeContext.css";
import { ThemeContext } from "./ThemeContext";

const data = [
  {
    id: 1,
    title: "Computation of Mathematics",
    type: "class notes",
    price: 10.0,
    images: [img3, img4],
    modulesCovered: 8,
    department: "CSE2005",
    school: "SCOPE",
    link: "/path-to-note-1", // Link to the note detail page
  },
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function RentNotesPage() {
  const { theme } = useContext(ThemeContext);
  const query = useQuery();
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [Images, SetImages] = useState([]);

  function dateChangeHandler(newDate) {
    setDate(newDate);
  }

  useEffect(() => {
    const term = query.get("query");
    if (term) {
      const parsedTerms = JSON.parse(decodeURIComponent(term));
      setName(parsedTerms.title);
      setPrice(parsedTerms.price);
      setCourseCode(parsedTerms.department);
      SetImages(parsedTerms.images);
    } else {
      setName(data[0].title);
      setPrice(data[0].price);
      setCourseCode(data[0].department);
      SetImages(data[0].images);
    }
  }, []);

  return (
    <div>
      <div
        className={`w-full font-clash min-h-screen flex items-center justify-center p-4 md:p-8 lg:p-12 ${
          theme === "dark" ? "bg-black text-white" : "bg-white text-black"
        }`}>
        <div className="w-full max-w-7xl mx-auto space-y-8">
          <h1 className="text-3xl md:text-5xl font-semibold text-left">
            Rent Notes
          </h1>
          <div className="mx-auto space-y-10 flex flex-col gap-4">
            <div className="space-y-4 md:space-y-10">
              <p className="text-xl md:text-2xl">{name}</p>
              <p className="text-lg md:text-xl">{courseCode}</p>
              <p className="text-lg md:text-xl">Price Per Module: {price}</p>
            </div>

            <div className="space-y-4">
              <p className="text-lg md:text-xl">Preview:</p>
              <div className=" bg-gray-300 rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 justify-items-center">
                {Images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Preview ${index}`}
                    className="max-w-[20rem] h-auto object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-lg md:text-xl">
                Kindly Update the Date of Exam:{" "}
                <span>{date.toDateString()}</span>
              </p>
            </div>

            <div
              className={`max-w-[100vw] h-auto mb-16 ${
                theme === "dark" ? "border-0" : "border-2 border-black rounded-lg"
              }`}>
              <Calendar
                onChange={dateChangeHandler}
                value={date}
                prev2Label={null}
                next2Label={null}
                className="custom-calendar mb-4 pb-4 text-black"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-1/2 py-2 mt-12 px-4 bg-[#A883C5] text-white font-bold text-xl md:text-2xl rounded-md shadow-sm">
              Rent Notes
            </button>

            <NotesView className="flex flex-wrap justify-evenly place-content-evenly" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RentNotesPage;
