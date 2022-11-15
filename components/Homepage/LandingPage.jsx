import React from "react";
import { services } from "../../utils/constants";
import Button2 from "../Layout/Button2";
import { useRouter } from "next/router";
const LandingPage = () => {
  const router = useRouter();

  const handleReadMore = (link) => {
    if (link === "cards") {
      router.push("/cards");
    } else if (link === "savings") {
      router.push("/accounts?query=savings");
    } else if (link === "checking") {
      router.push("/accounts?query=current");
    } else if (link === "safe") {
      router.push("/about");
    }
  };
  return (
    <div className='bgLanding w-full h-[650px] relative'>
      <div className='absolute top-0 left-0 w-full  h-full bg-[rgba(0,0,0,0.4)] '>
        <div className='absolute md:w-1/2 lg:w-[40%] top-[25%] space-y-8 bottom-[50%] left-4 w-[90%] md:left-16 h-full'>
          <h2 className='text-4xl md:text-5xl text-white capitalize font-extrabold tracking-wider'>
            Smart-free{" "}
            <span className='text-indigo-500'>banking for everybody</span>
          </h2>
          <p className='font-bold text-gray-100 text-lg'>
            Bank smarter with us now and browse <br /> personal and consumer
            banking services
          </p>
          <Button2 title='Get Started' px={5} />
        </div>
        <div className='hidden absolute  left-0 right-0 md:-bottom-16 md:flex justify-center'>
          <div className='flex flex-col md:flex-row mx-8   w-full md:w-[80%]  -bottom-16'>
            {services.map((item) => (
              <div
                key={item.id}
                className='relative bg-white px-2 md:px-5 flex justify-center items-center flex-1 h-44 border border-solid border-gray'
              >
                <div className='flex items-center gap-4 flex-col'>
                  <span
                    className={`text-5xl animate-bounce ${
                      item.link === "cards" && "text-green-600 delay-75"
                    } ${item.link === "savings" && "text-pink-600 delay-100"} ${
                      item.link === "checking" && "text-amber-600 delay-150"
                    } ${item.link === "safe" && "text-purple-600 delay-200"}`}
                  >
                    {item.icon}
                  </span>
                  <span className='text-base font-semibold tracking-wider'>
                    {item.title}
                  </span>
                  <p
                    className={`cursor-pointer hover:scale-105 customTransition ${
                      item.link === "cards" &&
                      "text-green-600 delay-75 hover:text-green-900"
                    } ${
                      item.link === "savings" &&
                      "text-pink-600 delay-100 hover:text-pink-900"
                    } ${
                      item.link === "checking" &&
                      "text-amber-600 delay-150 hover:text-amber-900"
                    } ${
                      item.link === "safe" &&
                      "text-purple-600 delay-200 hover:text-purple-900"
                    } hover:bottom-0 hover:opacity-100`}
                    onClick={() => handleReadMore(item.link)}
                  >
                    Read More
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
