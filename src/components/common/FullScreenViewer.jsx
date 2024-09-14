import React from 'react';
import ReactDOM from 'react-dom';
import ImageViewer from 'react-simple-image-viewer';

const FullscreenViewer = ({ images, currentIndex, onClose }) => {
  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
      style={{
        width: '100vw', // Cover the entire screen width
        height: '100vh', // Cover the entire screen height
      }}
    >
      <ImageViewer
        src={images}
        currentIndex={currentIndex}
        disableScroll={true}
        closeOnClickOutside={true}
        onClose={onClose}
        backgroundStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0.9)', // Dark background
          zIndex: 9999,
          width: '100%', // Full width for the background
          height: '100%', // Full height for the background
        }}
        className="min-w-full" // Ensure viewer takes full width
      />
    </div>,
    document.body // Render at root level
  );
};

export default FullscreenViewer;
