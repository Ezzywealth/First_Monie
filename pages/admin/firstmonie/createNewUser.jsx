import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import axios from "axios";

import { BeatLoader } from "react-spinners";
import { CountryDropdown } from "react-country-region-selector";
import Button2 from "../../../components/Layout/Button2";

const CreateNewUser = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [calledRouter, setCalledRouter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accountNumber, setAccountNumber] = useState(0);
  const [otp, setOtp] = useState(0);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const inputRef = useRef(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const generateSecretPin = () => {
    const min = 13569935;
    const max = 99999999;
    const randomNumb = Math.floor(Math.random() * (max - min) + min);

    setAccountNumber(`444${randomNumb}`);
  };
  const generateOtp = () => {
    const min = 135699;
    const max = 999999;
    const randomNumb = Math.floor(Math.random() * (max - min) + min);

    setOtp(randomNumb);
  };
  useEffect(() => {
    generateSecretPin();
    generateOtp();
  }, []);

  const formHandler = async ({
    email,
    password,
    firstName,
    lastName,
    userName,
    telephone,
    birthday,
    sex,
    marital_status,
    occupation,
  }) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`/api/auth/signUp`, {
        email,
        password,
        name: `${firstName} ${lastName}`,
        country: selectedCountry,
        userName,
        telephone,
        birthday,
        sex,
        marital_status,
        occupation,
        account_number: accountNumber,
        secret_code: otp,
      });

      toast.success(
        "Your request has been submitted and reviewed by our team. Thank You"
      );
      router.push("/admin/firstmonie");
      if (data.error) throw new Error(data.error);
    } catch (error) {
      setLoading(false);
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
    <div className='bgRegister h-full'>
      <div className='flex justify-center items-center flex-col-reverse mx-auto w-full p-2 md:p-10'>
        <form
          className='w-full my-4 bgContact overflow-auto py-8 pt-8 rounded-lg px-4 '
          onSubmit={handleSubmit(formHandler)}
        >
          <div className='mb-8 flex justify-center'>
            <Link href='/admin/firstmonie'>
              <div className='flex w-  items-center gap-5 border border-black pr-2 mx-2 md:pr-16 shadow-xl md:pl-2 py-1 justify-start'>
                <div className='h-8 w-8'>
                  <Image
                    src='/logo_pic2.png'
                    alt='logo'
                    className='cursor-pointer h-8 w-8 shadow-2xl md:scale-150 ml-2 animate-pulse'
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
                First Name
              </label>
              <input
                type='text'
                id='firstName'
                className='w-full p-2 focus:outline-none border '
                {...register("firstName", {
                  required: "Please enter your First Name",
                })}
              />
              {errors.firstName && (
                <span className='text-red-500'>{errors.firstName.message}</span>
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

            <div>
              <label htmlFor='sex' className='text-[#333333] '>
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
              <label htmlFor='birthday' className='text-[#333333] '>
                Birthday
              </label>
              <input
                type='date'
                id='birthday'
                className='w-full  focus:outline-none border '
                {...register("birthday", {
                  required: "Please enter your birthday",
                })}
              />
              {errors.birthday && (
                <span className='text-red-500'>{birthday.message}</span>
              )}
            </div>
            <div>
              <label htmlFor='address' className='text-[#333333] '>
                Marital Status
              </label>
              <select
                id='marital_status'
                className='w-full p-2 focus:outline-none border rounded-lg '
                {...register("marital_status", {
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

            <div className='mb-4'>
              <Button2 type='submit' title='Create User' />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

CreateNewUser.auth = { adminOnly: true };
export default CreateNewUser;
