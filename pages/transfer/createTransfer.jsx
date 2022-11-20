import React from "react";
import { useForm } from "react-hook-form";
import Layout from "../../components/Layout/Layout";
import TransferResponse from "../../components/transactions/transferResponse";
import { useDispatch, useSelector } from "react-redux";
import {
  openOtpModal,
  setOtpCode,
  setTransactionDetails,
} from "../../Redux/generalSlice";
import { BeatLoader } from "react-spinners";
import { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { useRouter } from "next/router";
import emailjs from "emailjs-com";
import Currencies from "list-of-currencies";

const CreateTransfer = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const otpModal = useSelector((state) => state.generalSlice.otpModal);

  const formHandler = ({ account_name, amount, account_number }) => {
    document.getElementById("myForm").reset();
    setLoading(true);
    dispatch(setTransactionDetails({ account_name, account_number, amount }));
    const min = 135699;
    const max = 999999;
    const randomNumb = Math.floor(Math.random() * (max - min) + min);

    if (randomNumb) {
      const templateParams = {
        subject: "Account Login",
        message: `Your one time Password (OTP) for First Monie transfer is ${randomNumb}`,
      };
      dispatch(setOtpCode(randomNumb));
      emailjs
        .send(
          "service_ct8x3bf",
          "template_lv24jqs",
          templateParams,
          "vngt2iIdOB55EqdDp"
        )
        .then(
          (response) => {
            console.log(`SUCCESS, Your query was sent successfully`);
          },
          (err) => {
            console.log("FAILED...", err);
          }
        );
    }
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    setTimeout(() => {
      dispatch(openOtpModal());
    }, 4000);
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

  return (
    <Layout title='createTransaction'>
      <div className='py-16 px-4 md:px-8 lg:px-16 mt-[90px] md:mt-8 bgContact'>
        <div
          className={`customTransition ${
            otpModal
              ? "fixed left-0 right-0 top-[90px]"
              : "fixed left-0 right-0 -top-[1000px]"
          }`}
        >
          <TransferResponse />
        </div>
        <div className='flex justify-between'>
          <h2 className=' font-semibold text-2xl text-gray-500'>Send Money</h2>
          <button
            className='bg-green-500 rounded-lg px-3 py-1 hover:scale-105 text-white'
            onClick={() => {
              setLoading(true);
              router.push("/transfer");
            }}
          >
            Go back
          </button>
        </div>
        <form
          id='myForm'
          className=' px-4 md:px-8 lg:px-16 border border-solid border-gray-200 my-8 mt-2 py-8'
          onSubmit={handleSubmit(formHandler)}
        >
          <div>
            <div className='flex flex-col font-semibold space-y-2 mb-2'>
              <label htmlFor='account_name'>Bank</label>
              <input
                placeholder='bank name'
                type='text'
                className='p-2 focus:outline-none border-solid font-normal border text-sm rounded-lg'
                id='account_name'
                {...register("bank_name", {
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
                <select
                  id='currency'
                  placeholder='Enter Currency'
                  className='font-normal text-sm py-3 px-2 rounded-lg border focus:outline-none border-gray-300 border-solid'
                  {...register("currency", {
                    required: "please enter a currency",
                  })}
                >
                  {Currencies.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>

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
                  {...register("account_number", {
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
              <label htmlFor='note'>Description</label>
              <textarea
                rows={6}
                id='description'
                placeholder='Description Note'
                className='font-normal text-sm'
                {...register("description", {
                  required: "please enter a descriptive message",
                })}
              />

              {errors.description && (
                <span className='text-red-500'>
                  {errors.description.message}
                </span>
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

CreateTransfer.auth = true;
export default CreateTransfer;
