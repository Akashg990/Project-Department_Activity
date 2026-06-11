// export default function DeleteModal({
//   isOpen,
//   onClose,
//   onConfirm,
// }) {

//   if (!isOpen) return null;



//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      
//       {/* Modal */}
//       <div className="bg-white w-[90%] max-w-md rounded-2xl p-6 shadow-2xl animate-fadeIn">

        
//         {/* Title */}
//         <h2 className="text-2xl font-bold text-gray-800">
//           Delete Activity
//         </h2>



//         {/* Message */}
//         <p className="text-gray-500 mt-3 leading-7">
//           Are you sure you want to delete this
//           activity?

//           This action cannot be undone.
//         </p>



//         {/* Buttons */}
//         <div className="flex justify-end gap-4 mt-8">

          
//           {/* Cancel */}
//           <button
//             onClick={onClose}
//             className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
//           >
//             Cancel
//           </button>



//           {/* Delete */}
//           <button
//             onClick={onConfirm}
//             className="bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700 transition"
//           >
//             Delete
//           </button>

//         </div>

//       </div>

//     </div>
//   );
// }




export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Item",
  message = "Are you sure?",
  confirmText = "Delete",
}) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

      <div
        className="
          bg-white
          w-[90%]
          max-w-md
          rounded-3xl
          p-6
          shadow-2xl
        "
      >

        <h2 className="text-2xl font-bold text-gray-800">
          {title}
        </h2>

        <p className="text-gray-500 mt-3 leading-7">
          {message}
        </p>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="
              px-5
              py-2
              rounded-xl
              border
              border-gray-300
              hover:bg-gray-100
              transition
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="
              bg-red-600
              text-white
              px-5
              py-2
              rounded-xl
              hover:bg-red-700
              transition
            "
          >
            {confirmText}
          </button>

        </div>

      </div>

    </div>
  );
}