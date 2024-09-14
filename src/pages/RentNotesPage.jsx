import { React, useState } from 'react';
import Calendar from 'react-calendar';

import '../styles/calendar.css';
import img1 from "../components/rent/2f855903-01c1-4bf6-b337-124bdebd2d8f.jpg";
import img2 from "../components/rent/2f855903-01c1-4bf6-b337-124bdebd2d8f1.jpg";
import img3 from "../components/rent/2f855903-01c1-4bf6-b337-124bdebd2d8f2.jpg";
import { NotesPage } from '.';
import NotesView from '@/components/common/NotesView';

export default function RentNotesPage() {
  const [date, setDate] = useState(new Date());

  function dateChangeHandler(newDate) {
    setDate(newDate);
  }

  return (
    <div className="bg-black text-white font-clash min-h-screen flex items-center justify-center p-4 md:p-8 lg:p-12">
      <div className="w-full max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-5xl font-semibold text-left">Rent Notes</h1>
        <div className="mx-auto space-y-10 flex flex-col gap-4">
          <div className="space-y-4 md:space-y-10">
            <p className="text-xl md:text-2xl">Theory Of Computation</p>
            <p className="text-lg md:text-xl">CSE 2005</p>
            <p className="text-lg md:text-xl">Price Per Module: 20rs</p>
          </div>

          <div className="space-y-4">
            <p className="text-lg md:text-xl">Preview:</p>
            <div className="w-full bg-gray-300 rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
              <img
                src={img3} 
                alt="Preview"
                className="w-full h-auto object-cover rounded-lg"
              />
              <img
                src={img3} 
                alt="Preview"
                className="w-full h-auto object-cover rounded-lg"
              />
              <img
                src={img3} 
                alt="Preview"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <p className="text-lg md:text-xl">
              Kindly Update the Date of Exam: <span>{date.toDateString()}</span>
            </p>
          </div>

          <div className="max-w-[100vw] h-auto mb-16">
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
            className="w-full sm:w-1/2 py-2 mt-12 px-4 bg-[#A883C5] text-white font-bold text-xl md:text-2xl rounded-md shadow-sm"
          >
            Rent Notes
          </button>

          <NotesView  className="flex flex-wrap justify-evenly place-content-evenly"/>

          
        </div>
      </div>
    </div>
  );
}
