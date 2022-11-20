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
import ButtonBack from "../../components/Layout/ButtonBack";
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
      router.push("/admin/firstmonie");
    }
  }, [session?.user.email]);

  const formHandler = async ({ account_number, password }) => {
    try {
      setLoading(true);
      const result = await signIn("credentials", {
        redirect: false,
        accountNumber: account_number,
        password,
      });
      // router.push("/admin/firstmonie");

      if (result.error) {
        router.push("/admin/adminLogin");
        setLoading(false);
        toast.error(result.error);
      }
    } catch (error) {
      toast.error(getError(error));
      setLoading(false);
    }
    console.log(account_number, password);
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
    <div className='bgRegister'>
      <ToastContainer position='top-center' limit={1} />
      <div className='flex justify-center items-center flex-col-reverse h-screen mx-auto w-full md:w-[450px] p-4 md:p-10'>
        <form
          className='w-full flex flex-col items-center  mx-auto my-4 bg-white md:h-screen mt-32 pt-4 py-8 rounded-lg px-4 space-y-8'
          onSubmit={handleSubmit(formHandler)}
        >
          <Link href='/'>
            <div className='flex w-[250px]  items-center gap-5 border border-black  shadow-xl md:pl-2 '>
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
                <span className=' text-xl md:text-3xl  text-indigo-900'>
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
              <ButtonBack title='Sign in' />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
