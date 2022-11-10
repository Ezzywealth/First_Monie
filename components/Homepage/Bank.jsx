import Image from "next/image";
import React from "react";
import People from "../../public/undraw.png";
import Button2 from "../Layout/Button2";

const Invest = () => {
  return (
    <div className='bg-gray-50 py-16 md:py-40 px-2 md:px-16'>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <div>
          <Image
            src={People}
            layout='responsive'
            alt='people'
            className='md:h-[450px] h-[300px]  scale-90 w-full shadow-2xl'
          />
        </div>
        <div className='md:space-y-8 space-y-4 px-4 md:px-8 py-8'>
          <h2 className='text-4xl text-[#333333] font-bold md:mb-12'>
            Bank where life <br /> takes you...
          </h2>
          <p>
            It doesn't happen with one transaction, in one day on the job, or in
            one quarter. It's earned relationship by relationship.
          </p>
          <Button2 title='Get Started' />
        </div>
      </div>
    </div>
  );
};

export default Invest;
