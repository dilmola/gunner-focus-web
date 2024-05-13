import { useState, useEffect, useRef } from "react";

const Modal = ({ onClose, children }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-40	">
        <div className="absolute inset-0 bg-gray-500 opacity-65"></div>
        <div className="p-8 rounded z-50 px-36 py-4 mx-auto max-w-screen-xl container">
          <div ref={modalRef} className="bg-[#E63946] rounded-lg p-5">
            <div className="mt-4">
              <div>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
