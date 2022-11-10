import Image from "next/image";
import React from "react";
import People from "../../public/image8.jpg";

const Expectation = () => {
  return (
    <div className='flex justify-center py-8 bg-gray-100 px-2'>
      <div className='flex flex-col items-center gap-6'>
        <h2 className='font-bold text-xl text-center md:text-3xl text-[#333333] tracking-wider'>
          We always meet our customers expectations
        </h2>
        <div className='flex justify-center'>
          <Image src={People} alt='people' objectFit='contain' />
        </div>
        <p className='text-center w-[70%] text-indigo-600 font-semibold'>
          The statistics speaks for themselves.
        </p>
        <div className='flex gap-8 md:gap-16 w-[80%] justify-between'>
          <span className='font-bold text-3xl text-center text-green-600 hover:scale-125 customTransition'>
            <h2>20K</h2>
            <p className='font-semibold text-base'>Feedback</p>
          </span>
          <span className='font-bold text-3xl text-center text-amber-600 hover:scale-125 customTransition'>
            <h2>500+</h2>
            <p className='font-semibold text-base'>Workers</p>
          </span>
          <span className='font-bold text-3xl text-center text-pink-600 hover:scale-125 customTransition'>
            <h2>70+</h2>
            <p className='font-semibold text-base'>Contributors</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Expectation;
