import React from "react";

const Button2 = ({ title, onClick, width }) => {
  return (
    <button
      className={`relative w-${
        width && width
      } inline-flex items-center justify-start px-4 py-2 overflow-hidden border border-solid border-purple-500 font-medium transition-all bg-white rounded hover:bg-white group`}
      onClick={onClick}
    >
      <span className='w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-700 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0'></span>
      <span className='relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white'>
        {title}
      </span>
    </button>
  );
};

export default Button2;
