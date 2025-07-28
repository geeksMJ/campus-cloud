/* eslint-disable react/prop-types */
export default function FloatContainer({ children, onClose }) {
  return (
    <>
      <button
        onClick={onClose}
        className="absolute top-0 right-0 m-4 bg-gray-950 rounded text-white font-bold py-2 px-4 z-40"
      >
        Close
      </button>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-60 flex justify-center w-full items-center z-30">
        {children}
      </div>
    </>
  );
}
