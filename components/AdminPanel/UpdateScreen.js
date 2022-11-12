import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getError } from "../../utils/error";
import axios from "axios";
import Button from "../../components/Layout/Button";

const UpdateScreen = () => {
  const { data: session } = useSession();

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("name", session?.user.name);
    setValue("email", session?.user.email);
  }, [session?.user, setValue]);

  const submitHandler = async ({ email, password }) => {
    try {
      await axios.put("/api/auth/update", {
        email,
        password,
      });

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      toast.success("Profile updated successfully");

      document.getElementById("formUpdate").reset();
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div className='px-4 md:px-8 xl:px-16 my-8 grid gap-8 grid-cols-1'>
      <div className='col-span-1 md:w-[50%]'>
        <div>
          <form
            className='w-full my-4 bg-white h-[80%]  py-8  rounded-lg px-4'
            onSubmit={handleSubmit(submitHandler)}
            id='formUpdate'
          >
            <h1 className='mb-4 text-xl font-semibold text-black'>
              Update Profile
            </h1>

            <div className='mb-4'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                className='w-full p-2 focus:outline-none border'
                id='email'
                {...register("email", {
                  required: "Please enter email",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                    message: "Please enter valid email",
                  },
                })}
              />
              {errors.email && (
                <div className='text-red-500'>{errors.email.message}</div>
              )}
            </div>

            <div className='mb-4'>
              <label htmlFor='password'>New Password</label>
              <input
                className='w-full p-2 focus:outline-none border'
                type='password'
                id='password'
                {...register("password", {
                  minLength: {
                    value: 6,
                    message: "password is more than 5 chars",
                  },
                })}
              />
              {errors.password && (
                <div className='text-red-500 '>{errors.password.message}</div>
              )}
            </div>

            <div className='mb-4'>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <input
                className='w-full p-2 focus:outline-none border'
                type='password'
                id='confirmPassword'
                {...register("confirmPassword", {
                  validate: (value) => value === getValues("password"),
                  minLength: {
                    value: 6,
                    message: "confirm password is more than 5 chars",
                  },
                })}
              />
              {errors.confirmPassword && (
                <div className='text-red-500 '>
                  {errors.confirmPassword.message}
                </div>
              )}
              {errors.confirmPassword &&
                errors.confirmPassword.type === "validate" && (
                  <div className='text-red-500 '>Password do not match</div>
                )}
            </div>
            <div className='mb-4'>
              <Button title='Update' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateScreen;
