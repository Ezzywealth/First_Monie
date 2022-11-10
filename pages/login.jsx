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

const LoginScreen = () => {
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
  const formHandler = async ({ password, account_number }) => {
    document.querySelector("form").reset();
    console.log(password, account_number);
  };

  return (
    <div className='bgRegister h-screen shadow-2xl'>
      <div className='flex justify-center items-center flex-col-reverse mx-auto w-full p-4 md:p-10'>
        <form
          className='w-[400px] h-[500px] my-4 bg-white overflow-auto py-8 pt-8 rounded-lg px-4 '
          onSubmit={handleSubmit(formHandler)}
        >
          <div className='mb-8 flex justify-center '>
            <Link href='/'>
              <div className='flex  items-center gap-5 border border-black pr-2 mx-2 md:pr-16 shadow-xl md:pl-2 py-1 justify-start'>
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
          <div className='grid grid-cols-1 mb-8  gap-4'>
            <div>
              <label htmlFor='firstName' className='text-[#333333] '>
                Account Number
              </label>
              <input
                type='text'
                id='account_number'
                className='w-full p-2 focus:outline-none border '
                {...register("account_number", {
                  required: "Please enter your Account Number",
                })}
              />
              {errors.account_number && (
                <span className='text-red-500'>
                  {errors.account_number.message}
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
              <label
                htmlFor='passowrd'
                className='text-[#333333] flex items-center gap-3 text-sm'
              >
                <input
                  type='checkbox'
                  id='remember'
                  className='checkbox focus:outline-none border '
                  {...register("remember", {
                    required: "Please enter your remember",
                  })}
                />
                Remember Me
              </label>
            </div>

            <ButtonBack type='submit' title='Sign In' />
          </div>
          <p className='text-sm'>
            Don't have an account?{" "}
            <Link href='/register' legacyBehavior>
              <span className='font-semibold text-indigo-600 cursor-pointer hover:text-amber-600 customTransition'>
                Register
              </span>
            </Link>
          </p>
          <p className='text-sm'>
            Forgotten Password?{" "}
            <Link href='/register' legacyBehavior>
              <span className='font-semibold text-indigo-600 cursor-pointer hover:text-amber-600 customTransition'>
                Reset
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
