import React from "react";
import Button2 from "../Layout/Button2";
const Contact = () => {
  return (
    <div className=' flex justify-center items-center p-8'>
      <div className='border border-gray-500 border-solid gap-4 flex justify-between p-8 rounded-lg'>
        <div>
          <h2 className='font-bold text-3xl text-[#333333]'>
            Have any question about us?
          </h2>
          <p>Do not hesistate to contact us.</p>
        </div>
        <div>
          <Button2 title='Contact Us' />
        </div>
      </div>
    </div>
  );
};

export default Contact;
