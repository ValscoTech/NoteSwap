import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import ImageViewer from "react-simple-image-viewer";
import { useLocation } from "react-router-dom";
const FullscreenViewer = ({ images, currentIndex, onClose, link, params }) => {
  const navigate=useNavigate();
  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
      style={{
        width: "100vw", // Cover the entire screen width
        height: "100vh", // Cover the entire screen height
      }}>
      <ImageViewer
        src={images}
        currentIndex={currentIndex}
        disableScroll={true}
        closeOnClickOutside={true}
        onClose={onClose}
        backgroundStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.9)", // Dark background
          zIndex: 9,
          width: "100%", // Full width for the background
          height: "100%", // Full height for the background
        }}
        className="min-w-full" // Ensure viewer takes full width
      />
      <button
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2 px-5 py-2 bg-[#a883c5] border-none rounded-md cursor-pointer z-10 text-white "
        onClick={() =>{navigate(`/rent?query=${encodeURIComponent(JSON.stringify(params))}`)}}>
        Rent this Note
      </button>
    </div>,
    document.body // Render at root level
  );
};

export default FullscreenViewer;
