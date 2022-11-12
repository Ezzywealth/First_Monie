import React from "react";
import Layout from "../components/Layout/Layout";
import { privacyData, termsData } from "../utils/constants";
const Privacy = () => {
  return (
    <Layout title='Layout'>
      <div className='bgContact flex justify-center mx-auto px-4 md:px-16 lg:px-28 py-[120px] md:py-16'>
        <div>
          {termsData.map((data) => (
            <div key={data.id} className='mb-8 space-y-2'>
              <h2 className='text-2xl text-[#333333] font-bold'>
                {data.title}
              </h2>
              <p className='text-md text-gray-500'>{data.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
