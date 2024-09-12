import React, { useState } from 'react';
import uploadIcon from '../components/offer/upload-icon.png';

export default function OfferNotesPage() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const fileList = Array.from(event.target.files);
    const mappedFiles = fileList.map((file) => {
      return Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
    });
    setFiles((prevFiles) => [...prevFiles, ...mappedFiles]);
  };

  const filePreview = files.map((file, index) => (
    <div key={index} className="w-full h-full p-1 border rounded-lg overflow-hidden relative">
      <img
        src={file.preview}
        alt={`preview ${index}`}
        className="w-[410px] h-[210px] object-cover rounded-lg"
      />
      <p className="absolute bottom-0 left-0 w-full text-center text-white bg-black bg-opacity-50 p-1">
        {file.name}
      </p>
    </div>
  ));

  return (
    <div className="bg-black text-white font-clash min-h-screen flex items-center justify-center p-4 md:p-8 lg:p-12">
      <div className="w-full mx-auto space-y-8">
        <h1 className="text-5xl font-semibold">Offer Notes</h1>
        <form className="mx-20 space-y-10">
          
          <div className="space-y-2">
            <label className="block text-2xl font-light">Title</label>
            <input
              type="text"
              name="title"
              className="w-full p-2 rounded-md border-b-2 border-white bg-transparent focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-2xl font-light">Course Code</label>
            <input
              type="text"
              name="courseCode"
              className="w-full p-2 rounded-md border-b-2 border-white bg-transparent focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-2xl font-light">Course Name</label>
            <input
              type="text"
              name="courseName"
              className="w-full p-2 rounded-md border-b-2 border-white bg-transparent focus:outline-none"
            />
          </div>
          <div>
            <select
              name="module"
              className='text-[#909090] block w-[100%] p-3 text-2xl font-light'
            >
              <option value="">Select Module</option>
              <option value="module1">Module 1</option>
              <option value="module2">Module 2</option>
              <option value="module3">Module 3</option>
              <option value="module4">Module 4</option>
              <option value="module5">Module 5</option>
              <option value="module6">Module 6</option>
              <option value="module7">Module 7</option>
              <option value="module8">Module 8</option>
            </select>
          </div>
          <div>
            <select
              name="school"
              className="text-[#909090] block w-[100%] p-3 text-2xl font-light"
            >
              <option value="">Select School</option>
              <option value="school1">SCOPE</option>
              <option value="school2">SELECT</option>
              <option value="school3">SMEC</option>
              <option value="school4">SCORE</option>
              <option value="school5">SCHEME</option>
              <option value="school6">SENSE</option>
              <option value="school7">SCE</option>
              <option value="school8">SAS</option>
              <option value="school9">VIT BS</option>
              <option value="school10">V-SPARC</option>
              <option value="school11">V-SIGN</option>
              <option value="school12">HOT</option>
              <option value="school13">SHINE</option>
              <option value="school14">SSL</option>
              <option value="school15">SBST</option>
              <option value="school16">VAIAL</option>
            </select>
          </div>
          <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Upload your files</h2>
                <div className="bg-black rounded-lg flex items-center justify-center p-4">
                  <div className="text-center">
                    <img src={uploadIcon} alt="Upload Icon" className="mx-auto h-12 w-12 text-gray-400" />
                    <input type="file" onChange={handleFileChange} className="hidden" id="fileUpload" multiple />
                    <label htmlFor="fileUpload" className="text-white font-medium cursor-pointer">
                      Drag and drop your files here
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {files.map((file, index) => (
                  <p key={index} className="text-gray-900 font-clash font-semibold">
                    {file.name}
                  </p>
                ))}
              </div>
            </div>

            <div className="bg-[#A883C5] rounded-lg shadow-md p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-center text-xl font-bold text-black mb-4">Set Your Price</h2>
                <input type="text" className="mt-10 w-full p-2 rounded-md border-b-2 border-black bg-transparent focus:outline-none" />
              </div>
              <button className="mt-4 w-full py-2 bg-[#DEEBFF] text-black font-normal rounded-md">Save Price</button>
            </div>
          </div>
           <button
            type="submit"
            className="w-full sm:w-[520px] ml-5 py-2 px-4 bg-[#A883C5] text-white font-bold text-2xl rounded-md shadow-sm"
          >
            Post Offer
          </button>

          <div className="grid grid-cols-3 gap-4 mt-8 gap-y-12">
            {filePreview}
          </div>
        </form>
      </div>
    </div>
  );
}
