import Image from "next/image";
import React from "react";
import { FiCheck } from "react-icons/fi";
import People from "../../public/3.png";
import { invest } from "../../utils/constants";

const Invest = () => {
  return (
    <div className='bg-gray-50 pt-40 px-16'>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <div className='space-y-8 px-8 py-8'>
          <h2 className='text-4xl text-[#333333] font-bold mb-12'>
            Invest in your future.
          </h2>
          <p>
            Wherever you are in planning for your future, we’re here to help you
            evaluate investment and retirement options as you work toward your
            goals.
          </p>
          <ul className='grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-6'>
            {invest.map((item) => (
              <li
                key={item.id}
                className='flex gap-4  items-center bg-white p-2 rounded-lg hover:bg-indigo-800'
              >
                <FiCheck className='text-green-600 animate-bounce' />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Image
            src={People}
            alt='people'
            className='h-[450px] w-full shadow-2xl'
          />
        </div>
      </div>
    </div>
  );
};

export default Invest;
