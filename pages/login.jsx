import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "emailjs-com";
import Link from "next/link";
import { BeatLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import ButtonBack from "../components/Layout/ButtonBack";
import {
  openOtpModal,
  openWelcomeModal,
  setLoginDetails,
  setOtpCode,
} from "../Redux/generalSlice";

import LoginReply from "../components/transactions/loginResponse";

const LoginInterface = () => {
  const dispatch = useDispatch();
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = useSession();
  const otpModal = useSelector((state) => state.generalSlice.otpModal);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (session?.user) {
      toast.success(`${session?.user.name} welcome to First Monie`);
      router.push("/dashboard");
      setLoading(false);
    }
  }, [session?.user]);

  const formSubmit = async () => {
    setLoading(true);
    dispatch(setLoginDetails({ accountNumber, password }));
    console.log(accountNumber, password);
    const min = 135699;
    const max = 999999;
    const randomNumb = Math.floor(Math.random() * (max - min) + min);
    const templateParams = {
      subject: "Account Login",
      message: `Your one time Password (OTP) for First Monie login is ${randomNumb}`,
    };

    dispatch(openOtpModal());
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    setTimeout(() => {}, 4000);
    if (randomNumb) {
      dispatch(setOtpCode(randomNumb));

      // emailjs
      //   .send(
      //     "service_ct8x3bf",
      //     "template_lv24jqs",
      //     templateParams,
      //     "vngt2iIdOB55EqdDp"
      //   )
      //   .then(
      //     (response) => {
      //       console.log(`SUCCESS, Your query was sent successfully`);
      //       document.getElementById("myForm").reset();
      //     },
      //     (err) => {
      //       console.log("FAILED...", err);
      //     }
      //   );

      try {
        const result = await signIn("credentials", {
          redirect: false,
          accountNumber,
          password,
        });

        if (result.error) {
          toast.error(result.error);
        }
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    }
  };

  if (loading) {
    return (
      <div className='flex bg-indigo-100 justify-center items-center h-screen w-full'>
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

  console.log(otpModal);
  return (
    <div className='relative bgRegister h-screen px-4 md:px-8 lg: flex items-center shadow-2xl'>
      <div
        className={`customTransition ${
          otpModal
            ? "absolute left-0 z-50 w-full right-0 top-[90px]"
            : "fixed left-0 right-0 -top-[1000px]"
        }`}
      >
        <LoginReply />
      </div>
      <div className='flex justify-center flex-col items-center mx-auto w-full '>
        <div className='flex justify-center w-full'>
          <form
            id='myForm'
            className='flex flex-col items-center w-[380px] md:w-[450px] mx-auto px-auto my-4 bg-white overflow-auto py-8 pt-3 rounded-lg px-4 '
            onSubmit={handleSubmit(formSubmit)}
          >
            <Link href='/'>
              <div className='flex w-[250px] mb-8 items-center gap-5 border border-black  shadow-xl md:pl-2 '>
                <div className='h-8 w-8'>
                  <Image
                    src='/logo_pic2.png'
                    alt='logo'
                    className='cursor-pointer animate-pulse h-8 w-8 shadow-2xl md:scale-150 ml-2'
                    width={80}
                    height={80}
                  />
                </div>
                <div className='flex font-extrabold flex-col tracking-wider text-sm'>
                  <span className=' text-xl md:text-3xl  text-indigo-900'>
                    First Monie
                  </span>
                  <span className='font-bold italic text-center'>
                    Online Banking
                  </span>
                </div>
              </div>
            </Link>
            <div className='grid grid-cols-1 mb-8 gap-4'>
              <div>
                <label htmlFor='account' className='text-[#333333] '>
                  Account Number
                </label>
                <input
                  type='text'
                  onChange={(e) => setAccountNumber(e.target.value)}
                  id='account'
                  required
                  className='w-full focus:outline-none border '
                />
                {errors.account && (
                  <span className='text-red-500'>{errors.account.message}</span>
                )}
              </div>

              <div>
                <label htmlFor='passowrd' className='text-[#333333] '>
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type='text'
                  id='password'
                  className='w-full p-2 focus:outline-none border '
                  required
                />
                {errors.password && (
                  <span className='text-red-500'>
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor='checkbox'
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

              <ButtonBack title='Sign In' onClick={formSubmit} />
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
    </div>
  );
};

export default LoginInterface;
