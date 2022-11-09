import React from "react";
import Image from "next/image";
import Pics from "../public/image5.jpg";

const Logo = () => {
  return (
    <div className='bg-white flex p-2'>
      <div className='flex'>
        <div className='h-8 w-8'>
          <Image
            src='/logo_pic2.png'
            alt='logo'
            className='cursor-pointer h-8 w-8'
          />
        </div>
        <div>
          <h3>First Monie</h3>
          <h3>Online Banking</h3>
        </div>
      </div>
    </div>
  );
};

export default Logo;
