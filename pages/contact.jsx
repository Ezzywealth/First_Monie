import React from "react";
import Layout from "../components/Layout/Layout";
import { GoLocation } from "react-icons/go";
import { BsTelephoneInbound } from "react-icons/bs";
import { useForm } from "react-hook-form";
import Button from "../components/Layout/Button";
import axios from "axios";
import { toast } from "react-toastify";

const Contact = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues,
  } = useForm();

  const formHandler = async ({ name, email, phone, message, subject }) => {
    // document.getElementById('myForm').reset()
    console.log(name, phone, subject, message);

    try {
      const { data } = await axios.post(`/api/support`, {
        name,
        email,
        phone,
        message,
        subject,
      });
      toast.success(data.message);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Layout>
      <div className='px-4 md:px-8 lg:px-16 py-16 mt-[90px] bgContact'>
        <h2 className='text-center font-bold text-[#333333] mb-8 text-3xl'>
          Drop a Message for our support team
        </h2>

        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
          <div className='col-span-1 space-y-4'>
            <div className='flex gap-4 '>
              <span className='border  text-white   rounded-full  p-2 items-center  border-dashed flex justify-center w-16 h-16'>
                <span className=' bg-indigo-800 rounded-full p-2'>
                  <GoLocation
                    className='h-6  w-6 text-white border-none '
                    style={{ color: "white" }}
                  />
                </span>
              </span>
              <span className='flex flex-col'>
                <h2 className='font-semibold'>Email:</h2>
                <p>support@firstmoniebank.com</p>
              </span>
            </div>
            <div className='flex gap-4'>
              <span className='border text-white    rounded-full p-2  items-center border-dashed flex justify-center w-16 h-16'>
                <span className=' bg-indigo-800 rounded-full p-2'>
                  <BsTelephoneInbound
                    className='h-6  w-6 text-white border-none '
                    style={{ color: "white" }}
                  />
                </span>
              </span>
              <span className='flex flex-col'>
                <h2 className='font-semibold'>Telegram:</h2>
                <p>+1(616) 666-3409</p>
              </span>
            </div>
          </div>
          <div className='col-span-1 md:col-span-2'>
            <form
              id='myForm'
              onSubmit={handleSubmit(formHandler)}
              className='md:grid flex flex-col md:grid-cols-2 gap-4'
            >
              <div>
                <input
                  type='text'
                  id='name'
                  placeholder='name'
                  {...register("name", { required: "Please enter your name" })}
                />
                {errors.name && (
                  <span className='text-red-500'>{errors.name.message}</span>
                )}
              </div>
              <div>
                <input
                  type='email'
                  id='email'
                  placeholder='email'
                  {...register("email", {
                    required: "please enter email address",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                      message: "please enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <span className='text-red-500'>{errors.email.message}</span>
                )}
              </div>
              <div>
                <input
                  type='text'
                  id='phone'
                  placeholder='phone'
                  {...register("phone", {
                    required: "Please enter your phone number",
                  })}
                />
                {errors.phone && (
                  <span className='text-red-500'>{errors.phone.message}</span>
                )}
              </div>
              <div>
                <input
                  type='text'
                  id='subject'
                  placeholder='subject'
                  {...register("subject", {
                    required: "Kindly enter the title of your message",
                  })}
                />
                {errors.subject && (
                  <span className='text-red-500'>{errors.subject.message}</span>
                )}
              </div>
              <div className='col-span-2 w-full'>
                <textarea
                  type='text'
                  rows={6}
                  id='message'
                  placeholder='message'
                  {...register("message", {
                    required: "Kindly enter your message",
                  })}
                />
                {errors.message && (
                  <span className='text-red-500'>{errors.message.message}</span>
                )}
              </div>
              <div>
                <Button type='submit' title='Submit' />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
