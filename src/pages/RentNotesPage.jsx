import { React, useState } from 'react';
import Calendar from 'react-calendar';

export default function RentNotesPage() {
  const [value, onChange] = useState(new Date());
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
            <p className="text-xl">Kindly Update the Date of Exam</p>
          </div>
        </div>
        <div>
          <Calendar onChange={onChange} value={value} />
        </div>
      </div>
    </div>
  );
}
