import React from "react";
import Layout from "../components/Layout/Layout";
import { CiLocationOn } from "react-icons/ci";
import { BsTelephoneInbound } from "react-icons/bs";
import { useForm } from "react-hook-form";
import Button from "../components/Layout/Button";

const Contact = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues,
  } = useForm();

  const formHandler = ({ name, phone, message, subject }) => {
    console.log(name, phone, subject, message);
    document.querySelector("form").reset();
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      "service_ezzy",
      "template_lf4fnom",
      form.current,
      "vngt2iIdOB55EqdDp"
    );
    e.target.reset();
  };
  return (
    <Layout>
      <div className='px-4 md:px-16 py-8 mt-[90px] bgContact'>
        <h2 className='text-center font-bold text-[#333333] mb-8 text-3xl'>
          Drop a Message for any query you have
        </h2>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          <div className='col-span-1 space-y-4'>
            <div className='flex gap-4 '>
              <span className='border  text-white   rounded-full  p-2 items-center  border-dashed flex justify-center w-16 h-16'>
                <span className=' bg-indigo-800 rounded-full p-2'>
                  <CiLocationOn
                    className='h-6  w-6 text-white border-none '
                    style={{ color: "white" }}
                  />
                </span>
              </span>
              <span className='flex flex-col'>
                <h2 className='font-semibold'>Address:</h2>
                <p>
                  Office. Main Office 175 S. Washington St. Tiffin, Ohio 44895
                </p>
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
                <h2 className='font-semibold'>Phone:</h2>
                <p>+112456722999</p>
              </span>
            </div>
          </div>
          <div className='col-span-1 md:col-span-2'>
            <form
              action=''
              onSubmit={handleSubmit(sendEmail)}
              className='md:grid flex flex-col md:grid-cols-2 gap-4'
            >
              <div>
                <input
                  type='text'
                  id='name'
                  placeholder='name'
                  {...register("name", { required: "Please enter your name" })}
                />
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
