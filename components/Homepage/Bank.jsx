import Image from "next/image";
import React from "react";
import { FiCheck } from "react-icons/fi";
import People from "../../public/undraw.png";
import { invest } from "../../utils/constants";
import Button2 from "../Layout/Button2";

const Invest = () => {
  return (
    <div className='bg-gray-50 py-40 px-16'>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <div>
          <Image
            src={People}
            alt='people'
            className='h-[450px] scale-90 w-full shadow-2xl'
          />
        </div>
        <div className='space-y-8 px-8 py-8'>
          <h2 className='text-4xl text-[#333333] font-bold mb-12'>
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
