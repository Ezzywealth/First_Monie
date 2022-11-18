import React from "react";
import { services } from "../../utils/constants";
import Button2 from "../Layout/Button2";
import { useRouter } from "next/router";
import { BeatLoader } from "react-spinners";
import { useState } from "react";
import { useSession } from "next-auth/react";

const LandingPageNexts = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

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

  const handleGetStarted = () => {
    setLoading(true);
    if (session?.user) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center bg-indigo-50 items-center h-screen w-full'>
        <BeatLoader
          color='indigo'
          loading={loading}
          size={10}
          aria-label='Loading Spinner'
          data-testid='loader'
        />
      </div>
    );
  }

  const changeBg = () => {
    const el = document.getElementById("landing");
  };

  return (
    <div className='bgLandingNexts w-full h-[650px] relative' id='landing'>
      <div className='absolute top-0 left-0 w-full  h-full bg-[rgba(0,0,0,0.5)] '>
        <div className='absolute md:w-1/2 lg:w-[40%] top-[40%] md:top-[25%] space-y-4 bottom-[50%] left-4 w-[90%] md:left-16 h-full'>
          <h2 className='text-4xl md:text-5xl text-white capitalize font-extrabold tracking-wider'>
            All Smiles <br />
            <span className='text-indigo-500'>
              As we meet your Financial needs.
            </span>
          </h2>
          <p className='font-bold text-gray-100 text-lg'>
            Customer Satisfactions is <br /> our priority
          </p>
          <Button2
            title='Get Started'
            px={5}
            onClick={() => handleGetStarted()}
          />
        </div>
        <div className='hidden absolute  left-0 right-0 md:-bottom-16 md:flex justify-center'>
          <div className='flex flex-col md:flex-row mx-8 gap-2  w-full md:w-[80%]  -bottom-16'>
            {services.map((item) => (
              <div
                key={item.id}
                className='relative bg-white px-2 md:px-5 rounded-lg flex justify-center items-center flex-1 h-44 border border-solid border-gray bgContact'
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

export default LandingPageNexts;
