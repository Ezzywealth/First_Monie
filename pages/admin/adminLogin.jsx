import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getError } from "../../utils/error";
import { useEffect, useState } from "react";
import Button from "../../components/Layout/Button";
import { useRef } from "react";
import { BeatLoader } from "react-spinners";
import Image from "next/image";
import Link from "next/link";
export default function Component() {
  const { data: session, status } = useSession();
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { redirect } = router.query;
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (session?.user && session?.user.isAdmin) {
      router.push("/admin/aztrades-admin");
    }
  }, [session?.user.email]);

  const formHandler = async ({ email, password }) => {
    try {
      setLoading(true);
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      router.push("/admin/firstmonie");

      if (result.error) {
        router.push("/admin/adminLogin");
        setLoading(false);
        toast.error(result.error);
      }
    } catch (error) {
      toast.error(getError(error));
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
    <div className='bg-indigo-50'>
      <ToastContainer position='top-center' limit={1} />
      <div className='flex justify-center items-center flex-col-reverse h-screen mx-auto w-full md:w-[450px] p-4 md:p-10'>
        <form
          className='w-full my-4 bg-white h-[80%] md:h-screen py-8 pt-4 rounded-lg px-4 space-y-8'
          onSubmit={handleSubmit(formHandler)}
        >
          <Link href='/'>
            <div className='flex md:w-full items-center gap-5 border border-black pr-2 mx-2 md:pr-16 shadow-xl md:pl-2 py-1 justify-start'>
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
          <div className='flex flex-col gap-4'>
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
              <label htmlFor='email' className='text-[#333333] '>
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
            <div className='mt-8 mb-4'>
              <Button title='Sign in' />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}