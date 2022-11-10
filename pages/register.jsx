import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Link from "next/link";
import Button2 from "../components/Layout/Button2";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import ButtonBack from "../components/Layout/ButtonBack";
// import { fetchTransactions } from "../Redux/transactionSlice";
// import { BeatLoader } from "react-spinners";

const RegisterScreen = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [calledRouter, setCalledRouter] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const inputRef = useRef(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [secretPin, setSecretPin] = useState(0);

  useEffect(() => {
    if (session?.user && !calledRouter) {
      setCalledRouter(true);
      dispatch(fetchTransactions(session?.user.email));
      router.push("/dashboard");
      toast.success(`${session?.user.name} welcome to Aztrades`);
    }
  }, [session]);
  const formHandler = async ({
    email,
    password,
    firstName,
    lastName,
    middleName,
    userName,
    phone,
    birthday,
    sex,
    marital_status,
    occupation,
    address,
  }) => {
    console.log(
      email,
      password,
      firstName,
      lastName,
      middleName,
      userName,
      phone,
      birthday,
      sex,
      marital_status,
      occupation,
      address
    );
  };

  return (
    <div className='bgRegister h-full'>
      <div className='flex justify-center items-center flex-col-reverse mx-auto w-full p-4 md:p-10'>
        <form
          className='w-full my-4 bg-white overflow-auto py-8 pt-8 rounded-lg px-4 '
          onSubmit={handleSubmit(formHandler)}
        >
          <div className='mb-8 flex justify-center'>
            <Link href='/'>
              <div className='flex w-  items-center gap-5 border border-black pr-2 mx-2 md:pr-16 shadow-xl md:pl-2 py-1 justify-start'>
                <div className='h-8 w-8'>
                  <Image
                    src='/logo_pic2.png'
                    alt='logo'
                    className='cursor-pointer h-8 w-8 shadow-2xl md:scale-150 ml-2'
                    width={80}
                    height={80}
                  />
                </div>
                <div className='flex font-extrabold flex-col tracking-wider text-sm'>
                  <span className=' text-base md:text-3xl  text-indigo-900'>
                    First Monie
                  </span>
                  <span className='font-bold italic text-center'>
                    Online Banking
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <div>
              <label htmlFor='firstName' className='text-[#333333] '>
                Full Name
              </label>
              <input
                type='text'
                id='firstName'
                className='w-full p-2 focus:outline-none border '
                {...register("fullName", {
                  required: "Please enter your First Name",
                })}
              />
              {errors.fullName && (
                <span className='text-red-500'>{errors.fullName.message}</span>
              )}
            </div>
            <div>
              <label htmlFor='middleName' className='text-[#333333] '>
                Middle Name
              </label>
              <input
                type='text'
                id='middleName'
                className='w-full p-2 focus:outline-none border '
                {...register("middleName", {
                  required: "Please enter your middleName",
                })}
              />
              {errors.middleName && (
                <span className='text-red-500'>{middleName.message}</span>
              )}
            </div>
            <div>
              <label htmlFor='lastName' className='text-[#333333] '>
                Last Name
              </label>
              <input
                type='text'
                id='lastName'
                className='w-full p-2 focus:outline-none border '
                {...register("lastName", {
                  required: "Please enter your lastName",
                })}
              />
              {errors.lastName && (
                <span className='text-red-500'>{errors.lastName.message}</span>
              )}
            </div>
            <div>
              <label htmlFor='userName' className='text-[#333333] '>
                Username
              </label>
              <input
                type='text'
                id='userName'
                className='w-full p-2 focus:outline-none border '
                {...register("userName", {
                  required: "Please enter your username",
                })}
              />
              {errors.userName && (
                <span className='text-red-500'>{errors.userName.message}</span>
              )}
            </div>

            <div>
              <label htmlFor='email' className='text-[#333333] '>
                Email
              </label>
              <input
                type='text'
                id='email'
                className='w-full p-2 focus:outline-none border mb-2'
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
              <label htmlFor='telephone' className='text-[#333333] '>
                Telephone
              </label>
              <input
                type='tel'
                id='telephone'
                className='w-full p-2 focus:outline-none border '
                {...register("telephone", {
                  required: "Please enter your phone number",
                })}
              />
              {errors.telephone && (
                <span className='text-red-500'>{errors.telephone.message}</span>
              )}
            </div>

            <div>
              <label htmlFor='country' className='text-[#333333] '>
                Birthday
              </label>
              <input
                type='text'
                id='userName'
                className='w-full p-2 focus:outline-none border '
                {...register("birthday", {
                  required: "Please enter your birthday",
                })}
              />
              {errors.birthday && (
                <span className='text-red-500'>{errors.birthday.message}</span>
              )}
            </div>

            <div>
              <label htmlFor='country' className='text-[#333333] '>
                Sex
              </label>
              <select
                id='sex'
                className='w-full p-2 focus:outline-none border rounded-lg '
                {...register("sex", {
                  required: "Please select your sex",
                })}
              >
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </select>
              {errors.sex && (
                <span className='text-red-500'>{errors.sex.message}</span>
              )}
            </div>
            <div>
              <label htmlFor='address' className='text-[#333333] '>
                Marital Status
              </label>
              <select
                id='marital_status'
                className='w-full p-2 focus:outline-none border rounded-lg '
                {...register("Marital Status", {
                  required: "Please select your Marital Status",
                })}
              >
                <option value='single'>Single</option>
                <option value='married'>Married</option>
                <option value='divorced'>Divorced</option>
                <option value='widow'>Widow</option>
                <option value='widower'>Widower</option>
              </select>
              {errors.marital_status && (
                <span className='text-red-500'>
                  {errors.marital_status.message}
                </span>
              )}
            </div>
            <div>
              <label htmlFor='occupation' className='text-[#333333] '>
                Occupation
              </label>
              <input
                type='text'
                id='occupation'
                className='w-full p-2 focus:outline-none border '
                {...register("occupation", {
                  required: "Please enter your occupation",
                })}
              />
              {errors.occupation && (
                <span className='text-red-500'>
                  {errors.occupation.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor='passowrd' className='text-[#333333] '>
                Password
              </label>
              <input
                type='text'
                id='password'
                className='w-full p-2 focus:outline-none border '
                {...register("password", {
                  required: "Please enter your password",
                  minLength: {
                    value: 6,
                    message: "password chars shoukd be greater than 5",
                  },
                })}
              />
              {errors.password && (
                <span className='text-red-500'>{errors.password.message}</span>
              )}
            </div>
            <div>
              <label htmlFor='confirmPassword' className='text-[#333333] '>
                Confirm password
              </label>
              <input
                type='text'
                id='confirmPassword'
                className='w-full p-2 focus:outline-none border '
                {...register("confirmPassword", {
                  required: "Please enter your password",
                  validate: (value) => value === getValues("password"),
                  minLength: {
                    value: 6,
                    message: "password chars should be greater than 5",
                  },
                })}
              />
              {errors.confirmPassword && (
                <span className='text-red-500'>
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <ButtonBack type='submit' title='Register' />
          </div>
          <p>
            Already have an account?{" "}
            <Link href='/login' legacyBehavior>
              <span className='font-semibold text-indigo-600 cursor-pointer'>
                {" "}
                Login
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
