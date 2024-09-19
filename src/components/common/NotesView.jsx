import React, { useState, useEffect, useContext } from "react";
import ImageViewer from "react-simple-image-viewer";
import img3 from "../../assets/images/image3.png";
import img4 from "../../assets/images/image4.png";
import FullscreenViewer from "./FullScreenViewer";
import { ThemeContext } from "@/pages/ThemeContext";
import "../../styles/ThemeContext.css";
import { useNotes } from "./NoteContext";
const defaultData = [
  {
    id: 1,
    title: "Computation of Science",
    type: "class notes",
    price: 15.0,
    images: [img3, img4],
    modulesCovered: 9,
    department: "SCI2005",
    school: "SCOPE",
    link: "/rent",
  },
  {
    id: 2,
    title: "Computation of Social",
    type: "class notes",
    price: 20.0,
    images: [img4, img3],
    modulesCovered: 4,
    department: "SOC2005",
    school: "SCOPE",
    link: "/rent",
  },
  {
    id: 3,
    title: "Computation of English",
    type: "lecture notes",
    price: 10.0,
    images: [img3, img4],
    modulesCovered: 7,
    department: "ENG2005",
    school: "SCOPE",
    link: "/rent",
  },
  {
    id: 4,
    title: "Computation of Mathematics",
    type: "lecture notes",
    price: 25.0,
    images: [img4, img3],
    modulesCovered: 6,
    department: "MAT2005",
    school: "SCOPE",
    link: "/rent",
  },
];

export default function NotesView({ paramsData }) {
  const { notesData } = useNotes();
  const { theme } = useContext(ThemeContext);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [data, setData] = useState(defaultData);
  const [linkIndex, setLinkIndex] = useState("");
  const [params, setParams] = useState([]);

  useEffect(() => {
    // If paramsData is passed and is not empty, set it as the data.
    if (paramsData && paramsData.length > 0) {
      setData(paramsData);
    }
    // Otherwise, prioritize notesData if it exists.
    else if (notesData && notesData.length > 0) {
      setData(notesData);
    }
    // Fall back to defaultData if nothing else is available.
    else {
      setData(defaultData);
    }
  }, [notesData, paramsData]);

  const openImageViewer = (imagesArray, index, linkIndex, item) => {
    setImages(imagesArray);
    setCurrentImageIndex(index);
    setIsViewerOpen(true);
    setLinkIndex(linkIndex);
    setParams(item);
  };

  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };

  return (
    <div className="font-clash overflow-hidden">
      <div className="flex justify-center">
        <div className="w-[60rem]">
          <div className="grid justify-items-center sm:grid-cols-3 grid-cols-2 md:gap-y-14 lg:grid-cols-3 md:gap-x-[1rem] lg:gap-x-3 sm:gap-x-1 mobile:gap-y-10 mobile:gap-x-72 gap-x-[18rem] gap-y-[3rem]">
            {data.map((item) => (
              <a
                key={item.id}
                className={`bg-white text-black p-3 rounded-2xl w-[18rem] h-[18rem] md:scale-100 ${
                  theme === "dark" ? "border-0" : "border-2 border-black"
                }`}>
                <div className="flex justify-normal gap-x-4 items-center">
                  <div className="pt-1 pl-2 font-[400] text-lg">
                    {item.department}
                  </div>
                  <div className="bg-[#a883c5] px-5 py-0 h-4 rounded-[0.225rem] font-[500] text-sm flex flex-col justify-center">
                    <div className="font-[525]">{item.school}</div>
                  </div>
                </div>
                <div className="flex justify-center gap-x-2 pb-4 pl-0">
                  <div className="text-[1.15rem] font-[425] w-[8.7rem]">
                    {item.title}
                  </div>
                  <div className="flex justify-normal border-[1.25px] border-black rounded-[0.7rem] w-fit items-center p-2 gap-x-1">
                    <div className="text-sm leading-4">
                      Modules
                      <br /> Covered
                    </div>
                    <div className="text-4xl">{item.modulesCovered}</div>
                  </div>
                </div>
                <div className="flex justify-normal">
                  {item.images.slice(0, 2).map((img, imgIndex) => (
                    <img
                      key={imgIndex}
                      className="w-32 h-36 object-cover cursor-pointer"
                      src={img}
                      onClick={() =>
                        openImageViewer(item.images, imgIndex, item.id, item)
                      }
                      alt={`Image ${imgIndex}`}
                    />
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      {isViewerOpen && (
        <FullscreenViewer
          images={images}
          currentIndex={currentImageIndex}
          onClose={closeImageViewer}
          link={data[linkIndex - 1].link}
          params={params} // Close the viewer
        />
      )}
    </div>
  );
}
