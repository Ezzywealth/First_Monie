import Image from "next/image";
import Link from "next/link";
import React from "react";
import { address, company, icons, support } from "../../utils/constants";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className='flex flex-col  bg-indigo-50 pt-16 md:pr-16'>
      <div className='flex flex-col md:flex-row gap-4 justify-around px-4 md:px-8'>
        <div className='flex-[1.5] flex flex-col gap-2 mr-8'>
          <Link href='/'>
            <div className='flex  items-center w-[65%] md:w-[95%] gap-5 border border-black shadow-xl py-1 justify-start'>
              <div className='h-8 w-8'>
                <Image
                  src='/logo_pic2.png'
                  alt='logo'
                  className='cursor-pointer h-8 w-8 shadow-2xl scale-150 ml-2'
                  width={80}
                  height={80}
                />
              </div>
              <div className='flex font-extrabold flex-col tracking-wider text-sm'>
                <span className='text-xl md:text-4xl  text-indigo-900'>
                  First Monie
                </span>
                <span className='font-bold italic text-center'>
                  Online Banking
                </span>
              </div>
            </div>
          </Link>
          <p className='hidden md:contents font-semibold text-sm tracking-wider'>
            Our response by the end of 2022 included a $20 million premium pay
            program for our employees.
          </p>
        </div>
        <div className='flex-1'>
          <h2 className='font-bold text-xl tracking-wider'>Company</h2>
          <ul className='flex flex-col gap-2 mt-4'>
            {company.map((item) => (
              <li key={item.id} className='text-sm tracking-wider'>
                <Link href={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='flex-1'>
          <h2 className='font-bold text-xl tracking-wider'>Support</h2>
          <ul className='flex flex-col gap-2 mt-2'>
            {support.map((item) => (
              <li key={item.id} className='text-sm tracking-wider'>
                <Link href={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='flex-1'>
          <h2 className='font-bold text-xl tracking-wider'>Contact</h2>
          <ul className='flex flex-col gap-2 mt-2'>
            {address.map((item) => (
              <li key={item.id} className='text-sm tracking-wider'>
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='flex items-center justify-center  mt-2'>
        <div className=' border-t border-gray-300  flex justify-center text-sm md:text-base w-full h-full items-center py-1 font-semibold tracking-widest '>
          <h2 className=' flex items-center  gap-1 mr-1 '>
            &#169;<span>{year}</span>
          </h2>
          <p className='flex'>
            All rights reserved |{" "}
            <span className='text-blue-900'>First Monie</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
