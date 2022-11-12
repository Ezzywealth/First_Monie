import React from "react";
import { servicesData } from "../utils/constants";

const Services = () => {
  return (
    <div className='py-16 pt-8 bgContact'>
      <div className='flex justify-center flex-col px-4 md:px-16 lg:px-32 gap-8'>
        <div>
          <h2 className='text-2xl font-bold text-[#333333] text-center'>
            Our Services
          </h2>
          <p></p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '>
          {servicesData.map((data) => (
            <div
              key={data.id}
              className='shadow-xl flex flex-col gap-4 items-center bg-white py-8 rounded-xl px-8 border border-indigo-400 hover:scale-105 customTransition'
            >
              <div className='flex font-semibold items-center uppercase gap-2'>
                <span className='text-3xl text-indigo-600'>{data.icons}</span>
                <span>{data.title}</span>
              </div>
              <div className='flex justify-center'>
                <p className='text-center text-sm text-[#333333]'>
                  {data.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
