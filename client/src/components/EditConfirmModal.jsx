
import { useState } from "react";

export default function EditConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  Loading,
}) {

  if (!isOpen) return null;
  
   

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      
      {/* Modal */}
      <div className="bg-white w-[90%] max-w-md rounded-2xl p-6 shadow-2xl">

        
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800">
          Save Changes
        </h2>



        {/* Message */}
        <p className="text-gray-500 mt-3 leading-7">
          Are you sure you want to save these
          changes to the activity?

        </p>



        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-8">

          
          {/* Cancel */}
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>



          {/* Confirm */}
          <button
            onClick={onConfirm}
            className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Save
          </button>

        </div>

      </div>

    </div>
  );
}