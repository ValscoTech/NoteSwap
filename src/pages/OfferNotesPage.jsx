import React, { useState } from 'react';
import uploadIcon from '../components/offer/upload-icon.png';
import NotesView from '../components/common/NotesView';
import { useNotes } from '../components/common/NoteContext';

export default function OfferNotesPage() {
  const { addNote } = useNotes();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    courseCode: '',
    courseName: '',
    module: '',
    school: '',
    price: '',
  });
  const [notesData, setNotesData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const schoolNameMap = {
    school1: 'SCOPE',
    school2: 'SELECT',
    school3: 'SMEC',
    school4: 'SCORE',
    school5: 'SCHEME',
    school6: 'SENSE',
    school7: 'SCE',
    school8: 'SAS',
    school9: 'VIT BS',
    school10: 'V-SPARC',
    school11: 'V-SIGN',
    school12: 'HOT',
    school13: 'SHINE',
    school14: 'SSL',
    school15: 'SBST',
    school16: 'VAIAL'
  };

  const handleFileChange = (event) => {
    const fileList = Array.from(event.target.files);
    const mappedFiles = fileList.map((file) => ({
      preview: URL.createObjectURL(file),
      name: file.name,
    }));
    setFiles((prevFiles) => [...prevFiles, ...mappedFiles]);
  };

  const openModal = (file) => {
    setSelectedImage(file.preview);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePostOffer = (event) => {
    event.preventDefault();

    if (files.length === 0 || !formData.title || !formData.price) {
      alert("Please complete all fields and upload at least one file.");
      return;
    }

    const filePreviews = files.map(file => file.preview);

    const newNote = {
      id: notesData.length + 1,
      title: formData.courseName,
      type: 'lecture notes',
      price: parseFloat(formData.price),
      images: filePreviews,
      modulesCovered: formData.module,
      department: formData.courseCode,
      school: schoolNameMap[formData.school],
      link: `/notes/${formData.title.replace(/\s+/g, '-').toLowerCase()}`,
    };

    setNotesData((prevData) => [...prevData, newNote]);
    addNote(newNote);
    setFiles([]);
    setFormData({
      title: '',
      courseCode: '',
      courseName: '',
      module: '',
      school: '',
      price: '',
    });
  };

  return (
    <div className="bg-black text-white font-clash min-h-screen flex items-center justify-center p-4 md:p-8 lg:p-12">
      <div className="w-full mx-auto space-y-8">
        <h1 className="text-5xl font-semibold">Offer Notes</h1>
        <form className="mx-20 space-y-10" onSubmit={handlePostOffer}>
          {/* Title Input */}
          <div className="space-y-2">
            <label className="block text-2xl font-light">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              autoComplete="off"
              className="w-full p-2 rounded-md border-b-2 border-white bg-transparent focus:outline-none"
            />
          </div>

          {/* Course Code Input */}
          <div className="space-y-2">
            <label className="block text-2xl font-light">Course Code</label>
            <input
              type="text"
              name="courseCode"
              value={formData.courseCode}
              onChange={handleFormChange}
              autoComplete="off"
              className="w-full p-2 rounded-md border-b-2 border-white bg-transparent focus:outline-none"
            />
          </div>

          {/* Course Name Input */}
          <div className="space-y-2">
            <label className="block text-2xl font-light">Course Name</label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleFormChange}
              autoComplete="off"
              className="w-full p-2 rounded-md border-b-2 border-white bg-transparent focus:outline-none"
            />
          </div>

          {/* Module Selection */}
          <div>
            <select
              name="module"
              value={formData.module}
              onChange={handleFormChange}
              className='text-[#909090] block w-[100%] p-3 text-2xl font-light'
            >
              <option value="">Select Module</option>
              <option value="1">Module 1</option>
              <option value="2">Module 2</option>
              <option value="3">Module 3</option>
              <option value="4">Module 4</option>
              <option value="5">Module 5</option>
              <option value="6">Module 6</option>
              <option value="7">Module 7</option>
              <option value="8">Module 8</option>
            </select>
          </div>

          {/* School Selection */}
          <div>
            <select
              name="school"
              value={formData.school}
              onChange={handleFormChange}
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

          {/* File Upload Section */}
          <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Upload your files</h2>
                <div className="bg-black rounded-lg flex flex-col p-4">
                  <div className="text-center">
                    <img src={uploadIcon} alt="Upload Icon" className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                    <input type="file" onChange={handleFileChange} className="hidden" id="fileUpload" multiple />
                    <label htmlFor="fileUpload" className="text-white font-medium cursor-pointer">
                      Drag and drop your files here
                    </label>
                  </div>
                  </div>
                  <div className="mt-4">
                    {files.length > 0 && (
                      <ul className="text-white list-disc pl-5">
                        {files.map((file, index) => (
                          <li key={index} className="text-black font-clash font-bold">{file.name}✅</li>
                        ))}
                      </ul>
                    )}
                  </div>
                
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-[#A883C5] rounded-lg shadow-md p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-center text-xl font-bold text-black mb-4">Set Your Price</h2>
                <div className="flex items-center justify-between mt-10">
                  <span className="text-white font-medium">₹{formData.price || 20}</span>
                  <input
                    type="range"
                    name="price"
                    min="20"
                    max="120"
                    step="1"
                    value={formData.price || 20}
                    onChange={(e) => handleFormChange({ target: { name: 'price', value: e.target.value } })}
                    className="w-full mx-4"
                  />
                </div>
              </div>
              <button type="submit" className="w-full py-2 bg-[#DEEBFF] text-black font-normal rounded-md">
                Save Price
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-[515px] ml-5 py-2 px-4 bg-[#A883C5] text-white font-bold text-2xl rounded-md shadow-sm"
          >
            Post Offer
          </button>
        </form>

        {/* Display Notes Preview */}
        <NotesView notesData={notesData} />
      </div>

      {/* Modal for Image Preview */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative">
            <img src={selectedImage} alt="Selected Preview" className="max-w-full max-h-screen object-contain" />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-3xl font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
