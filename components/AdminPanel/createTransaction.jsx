import React from "react";
import { useForm } from "react-hook-form";
import TransferResponse from "../../components/transactions/transferResponse";
import { useDispatch, useSelector } from "react-redux";
import { setTransactionDetails } from "../../Redux/generalSlice";
import { BeatLoader } from "react-spinners";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CreateTransaction = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const otpModal = useSelector((state) => state.generalSlice.otpModal);

  const formHandler = ({ account_name, amount, account_number }) => {
    setLoading(true);
    dispatch(setTransactionDetails({ account_name, account_number, amount }));
    document.getElementById("myForm").reset();
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

  const createTransaction = async ({
    date,
    status,
    email,
    description,
    amount,
    category,
  }) => {
    console.log(date, status, email, category, amount, description);
    const max = 9999;
    const min = 1000;
    const randNum = Math.ceil(Math.random() * (max - min) + min);
    try {
      const { data } = await axios.post(
        `/api/transactions/createTransactions`,
        {
          amount,
          email,
          category,
          TXNID: `FMB23642423${randNum}`,
          description,
          status,
          date,
        }
      );
      toast.success(data.message);
      console.log(data);
    } catch (error) {
      toast.error("there was an error, try again later");
    }
    document.getElementById("myForm").reset();
  };

  return (
    <div className='pt-16 px-4 md:px-8 lg:px-16 mt-32 md:mt-8 bgContact'>
      <h2 className=' font-semibold mb-4 text-2xl text-gray-500'>
        Create Transaction
      </h2>
      <div>
        <div className=''>
          <form
            id='myForm'
            className='my-1 bg-white h-full py-8 pt-4 rounded-lg px-4'
            onSubmit={handleSubmit(createTransaction)}
          >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label htmlFor='date' className='text-[#333333] '>
                  Date
                </label>
                <input
                  type='date'
                  id='date'
                  className='w-full p-2 focus:outline-none border mb-2'
                  {...register("date", {
                    required: "please enter date",
                  })}
                />
                {errors.date && (
                  <span className='text-red-500'>{errors.date.message}</span>
                )}
              </div>
              <div>
                <label htmlFor='email' className='text-[#333333] '>
                  User Email
                </label>
                <input
                  type='text'
                  id='email'
                  className='w-full p-2 focus:outline-none border mb-2'
                  {...register("email", {
                    required: "please enter client email address",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                      message: "please enter a valid email address",
                    },
                  })}
                />
                {errors.client && (
                  <span className='text-red-500'>{errors.client.message}</span>
                )}
              </div>
              <div>
                <label htmlFor='amount' className='text-[#333333] '>
                  Amount
                </label>
                <input
                  type='number'
                  id='amount'
                  className='w-full p-2 focus:outline-none border mb-2'
                  {...register("amount", {
                    required: "please enter amount",
                  })}
                />
                {errors.amount && (
                  <span className='text-red-500'>{errors.amount.message}</span>
                )}
              </div>
              <div>
                <label htmlFor='amount' className='text-[#333333] '>
                  Category
                </label>
                <select
                  id='category'
                  className='w-full p-2 focus:outline-none border rounded-lg mb-2'
                  {...register("category", {
                    required: "please select a category",
                  })}
                >
                  <option value='credit'>Credit</option>
                  <option value='debit'>Debit</option>
                </select>
                {errors.category && (
                  <span className='text-red-500'>
                    {errors.category.message}
                  </span>
                )}
              </div>
              <div>
                <label htmlFor='email' className='text-[#333333] '>
                  Description
                </label>
                <input
                  type='text'
                  id='details'
                  className='w-full p-2 focus:outline-none border mb-2'
                  {...register("description", {
                    required: "please enter description",
                  })}
                />
                {errors.description && (
                  <span className='text-red-500'>
                    {errors.description.message}
                  </span>
                )}
              </div>
              <div>
                <label htmlFor='status' className='text-[#333333] '>
                  Status
                </label>
                <input
                  type='text'
                  id='status'
                  className='w-full p-2 focus:outline-none border '
                  {...register("status", {
                    required: "Please enter the status",
                  })}
                />
                {errors.status && (
                  <span className='text-red-500'>{errors.status.message}</span>
                )}
              </div>
              <div>
                <button
                  type='submit'
                  className='bg-indigo-900 px-3 py-1 text-white rounded-lg'
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

CreateTransaction.auth = true;
export default CreateTransaction;
