import React, { useState, useContext } from "react";
import logo from "@/assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "@/pages/ThemeContext"; // Import the ThemeContext

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State to control search input visibility
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext); // Use ThemeContext to get current theme

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/notes?search=${searchQuery}`);
    }
  };

  return (
    <nav
      className={`flex flex-col md:flex-row justify-between items-center p-4 font-clash relative ${
        theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      {/* Logo */}
      <div className="flex justify-between items-center w-full md:w-auto">
        <a href="/home">
          <img
            src={logo}
            alt="Logo"
            className="w-[150px] h-auto flex-shrink-0"
          />
        </a>
        {/* Mobile menu button */}
        <button
          className={`text-${theme === 'dark' ? 'white' : 'black'} md:hidden flex items-center`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
          >
            <path
              d="M5 7.5H25M5 15H25M5 22.5H25"
              stroke={theme === 'dark' ? 'white' : 'black'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-full h-full transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } z-30 ${
          theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
        }`}
      >
        <div className="flex justify-between items-center p-4">
          <img src={logo} alt="Logo" className="w-[150px] h-auto" />
          <button className={`text-${theme === 'dark' ? 'white' : 'black'}`} onClick={() => setIsOpen(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <path
                d="M6 6L24 24M6 24L24 6"
                stroke={theme === 'dark' ? 'white' : 'black'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col space-y-6 p-4 text-lg">
          <li>
            <a href="/home" className={`block hover:text-${theme === 'dark' ? 'blue-500' : 'purple-500'}`}>
              Home
            </a>
          </li>
          <li>
            <a href="/notes" className={`block hover:text-${theme === 'dark' ? 'blue-500' : 'purple-500'}`}>
              Notes
            </a>
          </li>
          <li>
            <a href="/blog" className={`block hover:text-${theme === 'dark' ? 'blue-500' : 'purple-500'}`}>
              Blogs
            </a>
          </li>
          <li>
            <a href="/account">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <rect x="1" y="1" width="38" height="38" rx="19" fill={theme === 'dark' ? 'white' : 'black'} />
                <rect
                  x="1"
                  y="1"
                  width="38"
                  height="38"
                  rx="19"
                  stroke={theme === 'dark' ? 'white' : 'black'}
                  strokeWidth="2"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M38.7408 40H1.25922C4.09669 32.4067 11.4169 27 20 27C28.5831 27 35.9033 32.4067 38.7408 40ZM27.5 18C27.5 22.4183 24.1421 26 20 26C15.8579 26 12.5 22.4183 12.5 18C12.5 13.5817 15.8579 10 20 10C24.1421 10 27.5 13.5817 27.5 18Z"
                  fill={theme === 'dark' ? '#1B1B1B' : 'white'}
                />
              </svg>
            </a>
          </li>
          <li>
            <form onSubmit={handleSearchSubmit} className="flex space-x-2">
              {isSearchOpen && (
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search notes..."
                  className="px-4 py-2 text-black rounded-md"
                />
              )}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className={`bg-${theme === 'dark' ? 'white-200' : 'black'} px-1 py-2 rounded-md flex items-center`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  fill="none"
                >
                  <g clipPath="url(#clip0_436_39)">
                    <path
                      d="M16.625 3.16675C19.1519 3.16658 21.6279 3.87783 23.7695 5.21911C25.9111 6.5604 27.6318 8.47751 28.7347 10.7511C29.8376 13.0246 30.2781 15.5627 30.0059 18.075C29.7337 20.5872 28.7597 22.9721 27.1953 24.9566L32.9777 30.7389C33.2661 31.0375 33.4257 31.4375 33.4221 31.8526C33.4185 32.2678 33.2519 32.6649 32.9584 32.9585C32.6648 33.252 32.2677 33.4185 31.8526 33.4221C31.4374 33.4258 31.0375 33.2662 30.7388 32.9777L24.9565 27.1954C23.271 28.5238 21.2922 29.4298 19.1853 29.8379C17.0784 30.2459 14.9044 30.1443 12.8448 29.5413C10.7852 28.9383 8.89965 27.8515 7.34546 26.3716C5.79128 24.8918 4.61353 23.0616 3.91049 21.034C3.20744 19.0064 2.99948 16.84 3.30396 14.7156C3.60844 12.5913 4.41652 10.5706 5.66079 8.82202C6.90507 7.07349 8.54945 5.64787 10.4567 4.6641C12.364 3.68032 14.4789 3.16693 16.625 3.16675ZM16.625 6.33341C13.8955 6.33341 11.2778 7.41771 9.3477 9.34777C7.41763 11.2778 6.33337 13.8955 6.33337 16.625C6.33337 19.3549 7.41763 22.0726 9.3477 24.0026C11.2778 25.9326 13.8955 27.0169 16.625 27.0169C19.3549 27.0169 22.0726 25.9326 24.0026 24.0026C25.9326 22.0726 27.0169 19.3549 27.0169 16.625C27.0169 13.8955 25.9326 11.2778 24.0026 9.34777C22.0726 7.41771 19.3549 6.33341 16.625 6.33341Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_436_39">
                      <rect width="38" height="38" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </button>
              </form>
              </li>
        </ul>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex flex-row space-x-6 items-center">
      <li>
    <a href="/home" className="hover:text-purple-500">
      Home
    </a>
  </li>
  <li>
    <a href="/notes" className="hover:text-purple-500">
      Notes
    </a>
  </li>
  <li>
    <a href="/blog" className="hover:text-purple-500">
      Blogs
    </a>
  </li>
  <li>
        <a href="/account" className="hover:text-purple-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
      >
        <rect x="1" y="1" width="38" height="38" rx="19" fill="white" />
        <rect
          x="1"
          y="1"
          width="38"
          height="38"
          rx="19"
          stroke="white"
          strokeWidth="2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M38.7408 40H1.25922C4.09669 32.4067 11.4169 27 20 27C28.5831 27 35.9033 32.4067 38.7408 40ZM27.5 18C27.5 22.4183 24.1421 26 20 26C15.8579 26 12.5 22.4183 12.5 18C12.5 13.5817 15.8579 10 20 10C24.1421 10 27.5 13.5817 27.5 18Z"
          fill="#1B1B1B"
        />
      </svg>
    </a>
  </li>
  <li>
    <form onSubmit={handleSearchSubmit} className="flex space-x-4 items-center">
      {isSearchOpen && (
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search notes..."
          className="px-4 py-2 text-black rounded-md"
        />
      )}
      <button
        type="button"
        onClick={() => setIsSearchOpen(true)}
        className="bg-white-600 px-4 py-2 rounded-md flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="38"
          viewBox="0 0 38 38"
          fill="none"
        >
          <g clipPath="url(#clip0_436_39)">
            <path
              d="M16.625 3.16675C19.1519 3.16658 21.6279 3.87783 23.7695 5.21911C25.9111 6.5604 27.6318 8.47751 28.7347 10.7511C29.8376 13.0246 30.2781 15.5627 30.0059 18.075C29.7337 20.5872 28.7597 22.9721 27.1953 24.9566L32.9777 30.7389C33.2661 31.0375 33.4257 31.4375 33.4221 31.8526C33.4185 32.2678 33.2519 32.6649 32.9584 32.9585C32.6648 33.252 32.2677 33.4185 31.8526 33.4221C31.4374 33.4258 31.0375 33.2662 30.7388 32.9777L24.9565 27.1954C23.271 28.5238 21.2922 29.4298 19.1853 29.8379C17.0784 30.2459 14.9044 30.1443 12.8448 29.5413C10.7852 28.9383 8.89965 27.8515 7.34546 26.3716C5.79128 24.8918 4.61353 23.0616 3.91049 21.034C3.20744 19.0064 2.99948 16.84 3.30396 14.7156C3.60844 12.5913 4.41652 10.5706 5.66079 8.82202C6.90507 7.07349 8.54945 5.64787 10.4567 4.6641C12.364 3.68032 14.4789 3.16693 16.625 3.16675ZM16.625 6.33341C13.8955 6.33341 11.2778 7.41771 9.3477 9.34777C7.41763 11.2778 6.33334 13.8956 6.33334 16.6251C6.33334 19.3546 7.41763 21.9723 9.3477 23.9024C11.2778 25.8324 13.8955 26.9167 16.625 26.9167C19.3545 26.9167 21.9722 25.8324 23.9023 23.9024C25.8324 21.9723 26.9167 19.3546 26.9167 16.6251C26.9167 13.8956 25.8324 11.2778 23.9023 9.34777C21.9722 7.41771 19.3545 6.33341 16.625 6.33341Z"
              fill={theme === 'dark' ? 'white' : 'black'}
            />
          </g>
          <defs>
            <clipPath id="clip0_436_39">
              <rect width="38" height="38" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
      <button>
      <a
        href="/offer"
        className={`border-2 rounded-full px-9 py-1 ${
          theme === 'dark' ? 'border-white text-white hover:text-blue-500' : 'border-black text-black hover:text-purple-500'
        }`}
      >
        Offer
      </a>
    </button>
        <button>
        <a href="/rent" className={`border-2 border-black text-black bg-white rounded-full px-9 py-1 hover:text-${theme === 'dark' ? 'blue-500' : 'purple-500' }`}>
          Rent
        </a>
        </button>
        </form>
        </li>
        </ul>
    </nav>
  );
}
