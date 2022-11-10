import Image from "next/image";
import React from "react";
import Layout from "../components/Layout/Layout";
import People from "../public/image3.jpg";

const Aboutscreen = () => {
  return (
    <Layout title='About'>
      <div className='bgContact md:px-16 py-8 mt-[90px] px-4'>
        <h2 className='text-center font-bold text-3xl'>About Us</h2>
        <p className='text-sm text-center mb-8 text-indigo-600'>
          Learn how we are focused on being flexible, resilient and responsible.
        </p>
        <div className='grid md:grid-cols-2 gap-8'>
          <div>
            <Image src={People} alt='about_us' layout='responsive' />
          </div>
          <div className=''>
            <h3 className='font-bold text-center text-2xl text-[#333333] mb-4'>
              Easy, fee-free banking for entrepreneurs
            </h3>
            <p className='mb-4'>
              <span className='ml-8 capitalize'>Since</span> the Lincoln
              administration signed our national bank charter No. 24 in 1863,
              we’ve drawn on our financial strength to serve customers. This has
              been especially evident in times of need, such as during the
              COVID-19 pandemic. Our response by the end of 2020 included a $20
              million premium pay program for our employees, relief assistance
              and 108,000 Small Business Administration Paycheck Protection
              Program (PPP) loans for our customers, and $30 million in
              expedited charitable contributions for our communities.
            </p>
            <p>
              We also recognize that this past year has fundamentally changed
              banking by accelerating the shift to digital products and
              services.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Aboutscreen;
