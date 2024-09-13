import { React, useState } from 'react';
import Calendar from 'react-calendar';

import '../styles/calendar.css';
import img1 from "../components/rent/2f855903-01c1-4bf6-b337-124bdebd2d8f.jpg";
import img2 from "../components/rent/2f855903-01c1-4bf6-b337-124bdebd2d8f1.jpg";
import img3 from "../components/rent/2f855903-01c1-4bf6-b337-124bdebd2d8f2.jpg";

export default function RentNotesPage() {
  const [date, setDate] = useState(new Date());

  function dateChangeHandler(newDate) {
    setDate(newDate);
  }
  return (
    <div className="bg-black text-white font-clash min-h-screen flex items-center justify-center p-4 md:p-8 lg:p-12">
      <div className="w-full mx-auto space-y-8">
        <h1 className="text-5xl font-semibold">Rent Notes</h1>
        <div className="mx-20 space-y-10">
          <div className="space-y-10">
            <p className="text-2xl">Theory Of Computation</p>
            <p className="text-xl">CSE 2005</p>
            <p className="text-xl">Price Per Module: 20rs</p>
          </div>

          <div className="space-y-4">
            <p className="text-xl">Preview:</p>
            <div className="w-full p-2 bg-gray-300 rounded-lg">
              <img
                src="/path/to/your/image.png" // Update with your image path or state
                alt="Preview"
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xl">Kindly Update the Date of Exam : <span>{date.toDateString()}</span></p>
          </div>
        
          <div className="">
            <Calendar
              onChange={dateChangeHandler}
              value={date}
              prev2Label={null}
              next2Label={null}
              className="custom-calendar px-48 " 
            />
          </div>
          <button
            type="submit"
            className="w-1/2 py-2 px-4 bg-[#A883C5] text-white font-bold text-2xl rounded-md shadow-sm"
            >
              Offer Notes
          </button>
          <div className="grid grid-cols-3 gap-4 mt-8 gap-y-12">
            <div className="w-full h-full p-1 border rounded-lg overflow-hidden relative">
              <img src={img1} className={`w-[510px] h-[510px] object-cover rounded-lg`}/>
            </div>
            <div className="w-full h-full p-1 border rounded-lg overflow-hidden relative">
              <img src={img2} className={`w-[510px] h-[510px] object-cover rounded-lg`}/>
            </div>
            <div className="w-full h-full p-1 border rounded-lg overflow-hidden relative">
              <img src={img3} className={`w-[510px] h-[510px] object-cover rounded-lg`}/>
            </div>           
          </div>
        </div>
      </div>
    </div>
  );
}
