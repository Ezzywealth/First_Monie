import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../../Redux/generalSlice";
import { BeatLoader } from "react-spinners";
import { CountryDropdown } from "react-country-region-selector";
import { useEffect } from "react";

const CreateWire = () => {
  const [error, setError] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setLoading(false);
  }, []);

  const dispatch = useDispatch();

  const formHandler = () => {
    document.getElementById("myForm").reset();
    dispatch(startLoading());
    setTimeout(() => {
      setError(true);
      dispatch(stopLoading());
      setTimeout(() => {
        setError(false);
      }, 5000);
    }, 4000);
  };

  if (loading) {
    return (
      <div className='flex justify-center shadow-2xl bg-indigo-50 items-center h-screen w-full'>
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
    <Layout title='createTransaction'>
      <div className='pt-16 px-3 md:px-8 lg:px-16 mt-32 md:mt-8 bgContact'>
        <h2 className='px-8 font-semibold text-2xl text-gray-500'>
          Wire Transfer
        </h2>
        <form
          id='myForm'
          className=' px-4 md:px-8 lg:px-16 border border-solid border-gray-200 m-8 mt-2 py-8'
          onSubmit={handleSubmit(formHandler)}
        >
          {error && (
            <div className='border py-3 px-3 border-x-4 mb-4 border-solid border-red-500 w-full rounded-lg'>
              <h2 className='text-gray500 font-semibold animate-pulse'>
                Transfer Limit Exceeded!
              </h2>
            </div>
          )}
          <div>
            <div className='flex flex-col font-semibold space-y-2 mb-2'>
              <label htmlFor='account_name'>Bank</label>
              <input
                placeholder='000.0000.0000'
                type='text'
                className='p-2 focus:outline-none border-solid font-normal border text-sm rounded-lg'
                id='account_name'
                {...register("account_number", {
                  required: "Please enter receiver's account number",
                })}
              />
              {errors.account_number && (
                <span className='text-red-500'>
                  {errors.account_number.message}
                </span>
              )}
            </div>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='flex flex-col font-semibold space-y-2 mb-2'>
                <label htmlFor='swift_code'>Swift Code</label>
                <input
                  type='text'
                  className='font-normal text-sm'
                  placeholder='enter swift code'
                  id='swift_code'
                  {...register("swift_code", {
                    required: "please enter swift code",
                  })}
                />
                {errors.swift_code && (
                  <span className='text-red-500'>
                    {errors.swift_code.message}
                  </span>
                )}
              </div>
              <div className='flex flex-col font-semibold space-y-2 mb-2'>
                <label htmlFor='currency'>Currency</label>
                <input
                  id='currency'
                  placeholder='Enter Currency'
                  className='font-normal text-sm'
                  {...register("currency", {
                    required: "please enter a currency",
                  })}
                />

                {errors.currency && (
                  <span className='text-red-500'>
                    {errors.currency.message}
                  </span>
                )}
              </div>
              <div className='flex flex-col font-semibold space-y-2 mb-2'>
                <label htmlFor='routing'>Routing Number</label>
                <input
                  id='routing'
                  placeholder='routing number'
                  className='font-normal text-sm'
                  {...register("routing", {
                    required: "please enter outing number",
                  })}
                />

                {errors.routing && (
                  <span className='text-red-500'>{errors.routing.message}</span>
                )}
              </div>
              <div>
                <label htmlFor='country' className='text-[#333333] '>
                  Country
                </label>
                <CountryDropdown
                  value={selectedCountry}
                  onChange={(val) => setSelectedCountry(val)}
                  className='w-full p-2 focus:outline-none border rounded-lg'
                />
                {errors.selectedCountry && (
                  <span className='text-red-500'>
                    {errors.selectedCountry.message}
                  </span>
                )}
              </div>
              <div className='flex flex-col font-semibold space-y-2 mb-2'>
                <label htmlFor='account'>Account Number</label>
                <input
                  placeholder='Account Number'
                  className='font-normal text-sm'
                  {...register("account", {
                    required: "please enter account details",
                  })}
                />

                {errors.account && (
                  <span className='text-red-500'>{errors.account.message}</span>
                )}
              </div>
              <div className='flex flex-col font-semibold space-y-2 mb-2'>
                <label htmlFor='account_name'>Account Holder Name</label>
                <input
                  id='account_name'
                  placeholder='Account Holder Name'
                  className='font-normal text-sm'
                  {...register("account_name", {
                    required: "please enter account name",
                  })}
                />

                {errors.account_name && (
                  <span className='text-red-500'>
                    {errors.account_name.message}
                  </span>
                )}
              </div>
            </div>
            <div className='flex flex-col font-semibold space-y-2 mb-2'>
              <label htmlFor='amount'>Amount</label>
              <input
                placeholder='Amount'
                className='font-normal text-sm'
                {...register("amount", {
                  required: "please enter an amount to send",
                })}
              />

              {errors.amount && (
                <span className='text-red-500'>{errors.amount.message}</span>
              )}
            </div>
            <div className='flex flex-col font-semibold space-y-2 mb-8'>
              <label htmlFor='note'>Note</label>
              <textarea
                rows={6}
                id='note'
                placeholder='Description Note'
                className='font-normal text-sm'
                {...register("note", {
                  required: "please enter a descriptive message",
                })}
              />

              {errors.note && (
                <span className='text-red-500'>{errors.note.message}</span>
              )}
            </div>
            <div>
              <button className='bg-indigo-700 p-2 w-full text-white rounded-lg hover:scale-105 customTransition'>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

CreateWire.auth = true;
export default CreateWire;
