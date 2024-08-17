import React, { useState } from 'react';

export default function OfferNotesPage() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const fileList = Array.from(event.target.files);
    const mappedFiles = fileList.map((file) => {
      return Object.assign(file, {
        preview: URL.createObjectURL(file),
        loading: true, // Initial loading state
      });
    });
    setFiles((prevFiles) => [...prevFiles, ...mappedFiles]);

    // Simulate upload process
    setTimeout(() => {
      setFiles((prevFiles) =>
        prevFiles.map((file) => {
          return {
            ...file,
            loading: false, // Set loading to false once "upload" is done
          };
        })
      );
    }, 2000); // Simulate 2 seconds upload time
  };

  const filePreview = files.map((file, index) => (
    <div key={index} className="w-full h-full p-1 border rounded-lg overflow-hidden relative">
      <img
        src={file.preview}
        alt={`preview ${index}`}
        className={`w-[410px] h-[210px] object-cover rounded-lg ${file.loading ? 'opacity-50' : ''}`}
      />
      {file.loading && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black">
          <div className="h-full bg-blue-500 loading-bar"></div>
        </div>
      )}
    </div>
  ));

  return (
    <div className="bg-black text-white font-clash min-h-screen flex items-center justify-center p-4 md:p-8 lg:p-12">
      <div className="w-full mx-auto space-y-8">
        <h1 className="text-5xl font-semibold">Offer Notes</h1>
        <form className="mx-20 space-y-10">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="block text-2xl font-light">Title</label>
            <input
              type="text"
              name="title"
              className="w-full p-2 rounded-md border-b-2 border-white bg-transparent focus:outline-none"
            />
          </div>

          {/* Course Code Input */}
          <div className="space-y-2">
            <label className="block text-2xl font-light">Course Code</label>
            <input
              type="text"
              name="courseCode"
              className="w-full p-2 rounded-md border-b-2 border-white bg-transparent focus:outline-none"
            />
          </div>

          {/* Course Name Input */}
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
              <option value="module2">Module 3</option>
              <option value="module2">Module 4</option>
              <option value="module2">Module 5</option>
              <option value="module2">Module 6</option>
              <option value="module2">Module 7</option>
              <option value="module2">Module 8</option>
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
              <option value="school2">SMEC</option>
              <option value="school2">SCORE</option>
              <option value="school2">SCHEME</option>
              <option value="school2">SENSE</option>
              <option value="school2">SCE</option>
              <option value="school2">SAS</option>
              <option value="school2">VIT BS</option>
              <option value="school2">V-SPARC</option>
              <option value="school2">V-SIGN</option>
              <option value="school2">HOT</option>
              <option value="school2">SHINE</option>
              <option value="school2">SSL</option>
              <option value="school2">SBST</option>
              <option value="school2">VAIAL</option>
            </select>
          </div>
          <div class="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            <div class="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
                <div>
                    <h2 class="text-2xl font-bold text-gray-900 mb-4">Upload your files</h2>
                    <div class="bg-black rounded-lg flex items-center justify-center p-4">
                        <div class="text-center">
                            <svg class="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V7a2 2 0 00-2-2H3a2 2 0 00-2 2v12a2 2 0 002 2h18a2 2 0 002-2V11a2 2 0 00-2-2h-4a2 2 0 01-2-2V7a2 2 0 00-2-2H7z" />
                            </svg>
                            <input type="file" onChange={handleFileChange} className="hidden" id="fileUpload" multiple />
                            <label htmlFor="fileUpload" className="text-white font-medium cursor-pointer">
                              Drag and drop your files here
                            </label>                            
                        </div>
                    </div>
                </div>
                <div className="mt-4 space-y-2">
                <div class="mt-4 space-y-2">
                  {files.map((file, index) => (
                    <p key={index} className="text-gray-900 font-clash font-semibold">
                      {file.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div class="bg-[#A883C5] rounded-lg shadow-md p-6 flex flex-col justify-between">
                <div>
                    <h2 class="text-center text-xl font-bold text-black mb-4">Set Your Price</h2>
                    <input type="text" class="mt-10 w-full p-2 rounded-md border-b-2 border-black bg-transparent focus:outline-none" />
                </div>
                <button class="mt-4 w-full py-2 bg-[#DEEBFF] text-black font-normal rounded-md">Save Price</button>
            </div>
          </div>
          <button
          type="submit"
          className="w-1/2 py-2 px-4 bg-[#A883C5] text-white font-bold text-2xl rounded-md shadow-sm"
          >
            Post Offer
          </button>
          {/* File Previews */}
          <div className="grid grid-cols-3 gap-4 mt-8 gap-y-12">
            {filePreview}
          </div>
        </form>
      </div>
    </div>
  )
}
