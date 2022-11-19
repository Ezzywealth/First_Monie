import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Link from "next/link";
import { BeatLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import Image from "next/image";
import ButtonBack from "../components/Layout/ButtonBack";
import { startLoading } from "../Redux/generalSlice";

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { data: session } = useSession();

  const router = useRouter();
  console.log(session);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (session?.user) {
      // setCalledRouter(true);
      // dispatch(fetchTransactions(session?.user.email));
      toast.success(`${session?.user.name} welcome to First Monie`);
      router.push("/dashboard");
    }
  }, [session?.user]);

  const onSubmit = async () => {
    document.querySelector("form").reset();
    dispatch(startLoading());
    try {
      setLoading(true);
      const result = await signIn("credentials", {
        redirect: false,
        accountNumber,
        password,
      });

      if (result.error) {
        toast.error(result.error);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
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

  return (
    <div className='bgRegister h-screen flex items-center shadow-2xl'>
      <div className='flex justify-center flex-col items-center mx-auto w-full px-4 '>
        <div className='flex justify-center w-full'></div>
        <form
          className='w-[380px] md:w-[400px]  my-4 bg-white overflow-auto py-8 pt-3 rounded-lg px-4 '
          onSubmit={handleSubmit(onSubmit)}
          mailto=''
        >
          <Link href='/'>
            <div className='flex mb-8 items-center w-full  gap-5 border bg-white border-indigo-200 pr-2 mx-2 md:pr-16 shadow-xl md:pl-2 py-1 justify-start'>
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
                <span className=' text-2xl md:text-3xl  text-indigo-900'>
                  First Monie
                </span>
                <span className='font-bold italic text-center'>
                  Online Banking
                </span>
              </div>
            </div>
          </Link>
          <div className='grid grid-cols-1 mb-8 gap-4'>
            <h2 className='text-center font-semibold text-xl text-gray-500'>
              Account Login
            </h2>
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
                // {...register("account", {
                //   required: "Please enter your Account Number",
                // })}
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
                // {...register("password", {
                //   required: "Please enter your password",
                //   minLength: {
                //     value: 6,
                //     message: "password chars shoukd be greater than 5",
                //   },
                // })}
              />
              {errors.password && (
                <span className='text-red-500'>{errors.password.message}</span>
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

            <ButtonBack type='submit' title='Sign In' onClick={onSubmit} />
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
