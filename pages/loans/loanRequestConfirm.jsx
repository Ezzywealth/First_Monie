import React from "react";
import Layout from "../../components/Layout/Layout";

const data = [
  {
    id: 1,
    title: "Plan Title",
  },
  {
    id: 2,
    title: "Loan Amount",
  },
  {
    id: 3,
    title: "Total Installment",
  },
  {
    id: 4,
    title: "Per Installment",
  },
  {
    id: 5,
    title: "Total Amount To Pay",
  },
];

const LoanRequestConfirm = () => {
  const handlePreview = (title) => {
    if (title === "Plan Title") {
      return "2";
    } else if (title === "Loan Amount") {
      return "3";
    } else if (title === "Total Installment") {
      return "4";
    } else if (title === "Per Installment") {
      return "5";
    } else if (title === "Total Amount To Pay") {
      return "6";
    }
  };

  const handleSubmit = () => {};
  return (
    <Layout title='confirm loan'>
      <div className='p-4 py-16 mt-[90px] md:p-16 lg:p-28 bgContact'>
        <h2 className='text-2xl font-semibold mb-4 text-gray-500'>
          Confirm Loan Details
        </h2>
        <div className='border border-gray-300 border-solid '>
          <div className='bg-white rounded-lg p-4'>
            <ul className=' space-y-4'>
              {data.map((item) => (
                <li
                  key={item.id}
                  className='flex justify-between border-b border-solid border-gray-400 pb-2 px-1'
                >
                  <span className='font-semibold text-gray-600'>
                    {item.title}
                  </span>
                  <span>{handlePreview(item.title)}</span>
                </li>
              ))}
            </ul>
            <div className='my-4  '>
              <button
                className='bg-blue-800 px-4 py-2 rounded-lg w-full customTransition hover:scale-105 text-white '
                onClick={() => handleSubmit()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoanRequestConfirm;
