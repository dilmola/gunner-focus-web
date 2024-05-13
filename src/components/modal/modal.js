import { useState, useEffect } from "react";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true); // Set isOpen to true when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-40	">
          <div className="absolute inset-0 bg-gray-500 opacity-65"></div>
          <div className="bg-[#E63946] p-8 rounded shadow-lg z-50 ">
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-4">
              <h1 className="text-5xl text-white font-bold">Fuck You!!</h1>
              <h1 className="text-5xl text-white  font-bold">Abang</h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
