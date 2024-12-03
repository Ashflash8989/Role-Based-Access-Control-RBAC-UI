import React from "react";

const Modal = ({ isOpen, title, onClose, onSubmit, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded p-6 w-1/3">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        {children}
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
