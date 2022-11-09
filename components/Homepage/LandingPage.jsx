import React from "react";
import { services } from "../../utils/constants";
import Button2 from "../Layout/Button2";

const LandingPage = () => {
  return (
    <div className='bgLanding w-full h-[650px] relative'>
      <div className='absolute w-1/2 top-[25%] space-y-4 bottom-[50%] left-8 h-full'>
        <h2 className='text-5xl text-[#333333]  capitalize font-extrabold tracking-wider'>
          Smart-free banking for everybody
        </h2>
        <p className='font-bold text-indigo-900'>
          Bank smarter with us now and browse <br /> personal and consumer
          banking services
        </p>
        <Button2 title='Get Started' />
      </div>
      <div className='absolute left-0 right-0 -bottom-16 flex justify-center'>
        <div className='flex  w-full  md:w-[60%]  -bottom-16'>
          {services.map((item) => (
            <div
              key={item.id}
              className='bg-white px-5 flex justify-center items-center flex-1 h-36 py-3 border border-solid border-gray'
            >
              <div className='flex items-center gap-4 flex-col'>
                <span
                  className={`text-5xl ${
                    item.link === "cards" && "text-green-600"
                  } ${item.link === "savings" && "text-pink-600"} ${
                    item.link === "checking" && "text-amber-600"
                  } ${item.link === "safe" && "text-purple-600"}`}
                >
                  {item.icon}
                </span>
                <span className='text-base font-semibold tracking-wider'>
                  {item.title}
                </span>
                <p>Read More</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
