import React from "react";
import Button2 from "../Layout/Button2";
import { useRouter } from "next/router";
const Contact = () => {
  const router = useRouter();
  return (
    <div className=' flex md:justify-center items-center md:p-8'>
      <div className='border border-gray-500 border-solid gap-4 flex flex-col md:flex-row w-full  justify-between p-4 md:p-8 rounded-lg'>
        <div>
          <h2 className='font-bold text-xl md:text-3xl text-[#333333]'>
            Have any question about us?
          </h2>
          <p>Do not hesistate to contact us.</p>
        </div>
        <div>
          <Button2 title='Contact Us' onClick={() => router.push("/contact")} />
        </div>
      </div>
    </div>
  );
};

export default Contact;
