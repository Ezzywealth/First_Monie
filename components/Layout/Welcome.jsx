import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FaRegWindowClose } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { closeWelcomeModal } from "../../Redux/generalSlice";

const Welcome = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  return (
    <div className='w-full md:w-[60%] lg:w-[45%] mx-4 pb-16 pt-4  rounded-lg bg-orange-50 justify-center px-8 border border-solid border-indigo-200 shadow-lg '>
      <div className='flex justify-end '>
        <FaRegWindowClose
          className='text-blue-700'
          onClick={() => dispatch(closeWelcomeModal())}
        />
      </div>
      <div className='flex flex-col gap-4 items-center mb-8'>
        <div className='flex w-[250px] items-center gap-5 border border-black pr-1 mx-2 md:pr-4 shadow-xl md:pl-2 py-1 justify-start'>
          <div className='h-8 w-8'>
            <Image
              src='/logo_pic2.png'
              alt='logo'
              className='cursor-pointer h-8 w-8 shadow-2xl md:scale-150 ml-2'
              width={80}
              height={80}
            />
          </div>
          <div className='flex font-extrabold flex-col tracking-wider text-sm'>
            <span className=' text-2xl  text-indigo-900'>First Monie</span>
            <span className='font-bold italic text-center'>Online Banking</span>
          </div>
        </div>
        <div className='text-blue-900 text-2xl flex flex-col gap-0 font-bold'>
          <h3>Welcome!!!</h3>
          <span className='tracking-widest'>{session?.user.name}</span>
        </div>

        <div>
          <p className='text-sm text-gray-500 text-center leading-loose tracking-wider'>
            Kindly note that your details and login information are fully
            secured. Transactions performed are not shared with any third-party
            at First Monie. We offer one of the best banking service out there.
            Thank you for trusting us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
