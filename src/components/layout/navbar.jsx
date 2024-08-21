import React, { useState } from "react";
import logo from "@/assets/images/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black flex flex-col md:flex-row justify-between items-center p-4 font-clash relative">
      {/* Logo */}
      <div className="flex justify-between items-center w-full md:w-auto">
        <a href="/">
          <img
            src={logo}
            alt="Logo"
            className="w-[272px] h-[122px] flex-shrink-0"
          />
        </a>
        {/* Mobile menu button */}
        <button
          className="text-white md:hidden flex items-center"
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
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 mt-12 bg-black text-white shadow-lg md:hidden transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } z-20`}
        style={{ width: '250px', height: '100vh' }} // Adjust width and height as needed
      >
        <div className="flex justify-end p-4">
          <button
            className="text-white"
            onClick={() => setIsOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <path
                d="M6 6L24 24M6 24L24 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col space-y-4 p-4">
          <li>
            <a href="/home" className="block hover:text-blue-500">
              Home
            </a>
          </li>
          <li>
            <a href="/notes" className="block hover:text-blue-500">
              Notes
            </a>
          </li>
          <li>
            <a href="/blog" className="block hover:text-blue-500">
              Blogs
            </a>
          </li>
          <li>
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
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
            >
              <g clipPath="url(#clip0_436_39)">
                <path
                  d="M16.625 3.16675C19.1519 3.16658 21.6279 3.87783 23.7695 5.21911C25.9111 6.5604 27.6318 8.47751 28.7347 10.7511C29.8376 13.0246 30.2781 15.5627 30.0059 18.075C29.7337 20.5872 28.7597 22.9721 27.1953 24.9566L32.9777 30.7389C33.2661 31.0375 33.4257 31.4375 33.4221 31.8526C33.4185 32.2678 33.2519 32.6649 32.9584 32.9585C32.6648 33.252 32.2677 33.4185 31.8526 33.4221C31.4374 33.4258 31.0375 33.2662 30.7388 32.9777L24.9565 27.1954C23.271 28.5238 21.2922 29.4298 19.1853 29.8379C17.0784 30.2459 14.9044 30.1443 12.8448 29.5413C10.7852 28.9383 8.89965 27.8515 7.34546 26.3716C5.79128 24.8918 4.61353 23.0616 3.91049 21.034C3.20744 19.0064 2.99948 16.84 3.30396 14.7156C3.60844 12.5913 4.41652 10.5706 5.66079 8.82202C6.90507 7.07349 8.54945 5.64787 10.4567 4.6641C12.364 3.68032 14.4789 3.16693 16.625 3.16675ZM16.625 6.33341C13.8955 6.33341 11.2778 7.41771 9.3477 9.34777C7.41763 11.2778 6.33334 13.8956 6.33334 16.6251C6.33334 19.3546 7.41763 21.9723 9.3477 23.9024C11.2778 25.8324 13.8955 26.9167 16.625 26.9167C19.3545 26.9167 21.9722 25.8324 23.9023 23.9024C25.8324 21.9723 26.9167 19.3546 26.9167 16.6251C26.9167 13.8956 25.8324 11.2778 23.9023 9.34777C21.9722 7.41771 19.3545 6.33341 16.625 6.33341ZM16.625 7.91675C18.9346 7.91675 21.1496 8.83423 22.7827 10.4674C24.4159 12.1005 25.3333 14.3155 25.3333 16.6251C25.3333 18.9347 24.4159 21.1497 22.7827 22.7828C21.1496 24.4159 18.9346 25.3334 16.625 25.3334C14.3154 25.3334 12.1004 24.4159 10.4673 22.7828C8.83415 21.1497 7.91667 18.9347 7.91667 16.6251C7.91667 14.3155 8.83415 12.1005 10.4673 10.4674C12.1004 8.83423 14.3154 7.91675 16.625 7.91675Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_436_39">
                  <rect width="38" height="38" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </li>
          <li>
            <button className="border-2 border-white text-white bg-black rounded-full px-4 py-2">
              <a href="/offer">Offer</a>
            </button>
          </li>
          <li>
            <button className="border-2 border-black text-black bg-white rounded-full px-4 py-2">
              <a href="/rent">Rent</a>
            </button>
          </li>
        </ul>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex md:flex-row md:space-x-5 md:list-none md:p-0 md:m-0">
        <li className="text-white text-[20px] font-normal leading-normal">
          <a href="/home" className="hover:text-blue-500">
            Home
          </a>
        </li>
        <li className="text-white text-[20px] font-normal leading-normal">
          <a href="/notes" className="hover:text-blue-500">
            Notes
          </a>
        </li>
        <li className="text-white text-[20px] font-normal leading-normal">
          <a href="/blog" className="hover:text-blue-500">
            Blogs
          </a>
        </li>
        <li>
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
        </li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="38"
            height="38"
            viewBox="0 0 38 38"
            fill="none"
          >
            <g clipPath="url(#clip0_436_39)">
              <path
                d="M16.625 3.16675C19.1519 3.16658 21.6279 3.87783 23.7695 5.21911C25.9111 6.5604 27.6318 8.47751 28.7347 10.7511C29.8376 13.0246 30.2781 15.5627 30.0059 18.075C29.7337 20.5872 28.7597 22.9721 27.1953 24.9566L32.9777 30.7389C33.2661 31.0375 33.4257 31.4375 33.4221 31.8526C33.4185 32.2678 33.2519 32.6649 32.9584 32.9585C32.6648 33.252 32.2677 33.4185 31.8526 33.4221C31.4374 33.4258 31.0375 33.2662 30.7388 32.9777L24.9565 27.1954C23.271 28.5238 21.2922 29.4298 19.1853 29.8379C17.0784 30.2459 14.9044 30.1443 12.8448 29.5413C10.7852 28.9383 8.89965 27.8515 7.34546 26.3716C5.79128 24.8918 4.61353 23.0616 3.91049 21.034C3.20744 19.0064 2.99948 16.84 3.30396 14.7156C3.60844 12.5913 4.41652 10.5706 5.66079 8.82202C6.90507 7.07349 8.54945 5.64787 10.4567 4.6641C12.364 3.68032 14.4789 3.16693 16.625 3.16675ZM16.625 6.33341C13.8955 6.33341 11.2778 7.41771 9.3477 9.34777C7.41763 11.2778 6.33334 13.8956 6.33334 16.6251C6.33334 19.3546 7.41763 21.9723 9.3477 23.9024C11.2778 25.8324 13.8955 26.9167 16.625 26.9167C19.3545 26.9167 21.9722 25.8324 23.9023 23.9024C25.8324 21.9723 26.9167 19.3546 26.9167 16.6251C26.9167 13.8956 25.8324 11.2778 23.9023 9.34777C21.9722 7.41771 19.3545 6.33341 16.625 6.33341ZM16.625 7.91675C18.9346 7.91675 21.1496 8.83423 22.7827 10.4674C24.4159 12.1005 25.3333 14.3155 25.3333 16.6251C25.3333 18.9347 24.4159 21.1497 22.7827 22.7828C21.1496 24.4159 18.9346 25.3334 16.625 25.3334C14.3154 25.3334 12.1004 24.4159 10.4673 22.7828C8.83415 21.1497 7.91667 18.9347 7.91667 16.6251C7.91667 14.3155 8.83415 12.1005 10.4673 10.4674C12.1004 8.83423 14.3154 7.91675 16.625 7.91675Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_436_39">
                <rect width="38" height="38" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </li>
        <li>
          <button className="border-2 border-white text-white bg-black rounded-full px-4 py-2">
            <a href="/offer">Offer</a>
          </button>
        </li>
        <li>
          <button className="border-2 border-black text-black bg-white rounded-full px-4 py-2">
            <a href="/rent">Rent</a>
          </button>
        </li>
      </ul>
    </nav>
  );
}
