import axios from "axios";
import React, { useState } from "react";
import CurrencyFormat from "react-currency-format";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import Layout from "../../components/Layout/Layout";
import { useRouter } from "next/router";

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
  const loanDetails = useSelector((state) => state.generalSlice.loanDetails);
  const loanAmount = useSelector((state) => state.generalSlice.loanAmount);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePreview = (title) => {
    if (title === "Plan Title") {
      return loanDetails.type;
    } else if (title === "Loan Amount") {
      return (
        <CurrencyFormat
          value={parseInt(loanAmount)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      );
    } else if (title === "Total Installment") {
      return loanDetails.total;
    } else if (title === "Per Installment") {
      return (
        <CurrencyFormat
          value={parseInt(loanAmount / parseInt(loanDetails.percent))}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      );
    } else if (title === "Total Amount To Pay") {
      return (
        <CurrencyFormat
          value={
            (loanAmount / parseInt(loanDetails.percent)) *
            parseInt(loanDetails.total)
          }
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      );
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const max = 9999993486;
    const min = 1428794822;
    const randNumbs = Math.ceil(Math.random() * (max - min) + min);
    try {
      const { data } = await axios.post(
        `/api/transactions/createLoanRequests`,
        {
          plan_no: `FMOB${randNumbs}`,
          per_installment: parseInt(loanAmount / parseInt(loanDetails.percent)),
          total_installment:
            (loanAmount / parseInt(loanDetails.percent)) *
            parseInt(loanDetails.total),
          next_installment: "--",
          STATUS: "pending",
          loanAmount,
        }
      );
      console.log(data);
      toast.success("Loan request has been created successfully");
      router.push("/loans");
    } catch (error) {
      toast.error(error);
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
                  <span
                    className={`font-semibold  ${
                      item.title === "Total Amount To Pay"
                        ? "text-red-500 font-semibold"
                        : "text-gray-600"
                    }`}
                  >
                    {item.title}
                  </span>
                  <span
                    className={`font-semibold  ${
                      item.title === "Total Amount To Pay"
                        ? "text-red-500 font-semibold"
                        : "text-gray-600"
                    }`}
                  >
                    {handlePreview(item.title)}
                  </span>
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
