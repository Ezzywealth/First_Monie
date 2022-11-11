import React from "react";
import { BsCheck } from "react-icons/bs";
import Layout from "../components/Layout/Layout";
import { firstCard, secondCard, thirdCard } from "../utils/constants";
const Cards = () => {
  return (
    <Layout>
      <div className='bgContact py-16 pt-[100px]'>
        <div className='flex flex-col mb-4 md:mb-8 items-center'>
          <h2 className='text-3xl font-extrabold text-[#333333]'>
            CREDIT CARDS
          </h2>
          <p className='text-gray-500'>
            Find a credit card that fits your lifestyle.
          </p>
        </div>
        <div className='grid grid-cols-1 py-8 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-16 shadow-2xl'>
          <div className='bg-white px-4 py-3  rounded-lg hover:scale-105 customTransition'>
            <div className='text-center mb-4 text-lg font-bold'>
              <h2>Earn 20,000 bonus points worth $200.</h2>
              <p>GO VISA SIGNATURE® CARD</p>
            </div>
            <ul className='space-y-4 '>
              {firstCard.map((item) => (
                <li
                  key={item.id}
                  className='flex gap-4 items-center text-gray-500 text-md'
                >
                  <span>
                    <BsCheck className='text-green-500 text-xl' />
                  </span>
                  <span>{item.details}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className='bg-white px-4 py-3 rounded-lg hover:scale-105 customTransition '>
            <div className='text-center mb-4 text-lg font-bold'>
              <h2>Earn 50,000 bonus points worth $500.</h2>
              <p>CONNECT VISA SIGNATURE® CARD</p>
            </div>
            <ul className='space-y-4 '>
              {secondCard.map((item) => (
                <li
                  key={item.id}
                  className='flex gap-4 items-center text-gray-500 text-md'
                >
                  <span>
                    <BsCheck className='text-green-500 text-xl' />
                  </span>
                  <span>{item.details}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className='bg-white px-4 py-3  rounded-lg hover:scale-105 customTransition'>
            <div className='text-center mb-4 text-md font-bold'>
              <h2>Earn 50,000 bonus points worth $750 in travel.</h2>
              <p>RESERVE VISA INFINITE® CARD</p>
            </div>
            <ul className='space-y-4 '>
              {thirdCard.map((item) => (
                <li
                  key={item.id}
                  className='flex gap-4 items-center text-gray-500 text-md'
                >
                  <span>
                    <BsCheck className='text-green-500 text-xl' />
                  </span>
                  <span>{item.details}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cards;
