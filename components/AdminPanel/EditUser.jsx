import axios from 'axios';
import React, { useState } from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { setUserDetails } from '../../Redux/generalSlice';
import Button2 from '../Layout/Button2';
import { useDispatch } from 'react-redux';
const EditUser = ({ id }) => {
  const dispatch = useDispatch();
  const [selectedCountry, setSelectedCountry] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const updateUser = async ({
    fullName,
    email,
    userName,
    telephone,
    password,
    sex,
    marital_status,
    occupation,
  }) => {
    // document.getElementById("myForm").reset();

    try {
      const { data } = await axios.put(`/api/auth/update`, {
        selectedCountry,
        fullName,
        email,
        userName,
        telephone,
        password,
        occupation,
        sex,
        marital_status,
        id,
      });
      console.log(data);
      dispatch(setUserDetails(data.toUpdateUser));
      // setEditedUser(data.newUser);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <section>
      <div className='bg-white p-5 space-y-4 mt-8 rounded-lg'>
        <h2 className='text-gray-600 text-xl '>Update user record</h2>
        <form
          className='space-y-4'
          onSubmit={handleSubmit(updateUser)}
          id='myForm'
        >
          <div className='grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <div>
              <label htmlFor='firstName' className='text-[#333333] '>
                Full Name
              </label>
              <input
                type='text'
                id='fullName'
                className='w-full p-2 focus:outline-none border '
                {...register('fullName', {
                  required: 'Please enter your First Name',
                })}
              />
              {errors.fullName && (
                <span className='text-red-500'>{errors.fullName.message}</span>
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
                {...register('userName', {
                  required: 'Please enter your username',
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
                {...register('email', {
                  required: 'please enter email address',
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                    message: 'please enter a valid email address',
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
                {...register('telephone', {
                  required: 'Please enter your phone number',
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
              <label htmlFor='country' className='text-[#333333] '>
                Marital status
              </label>
              <select
                className='w-full p-2 focus:outline-none border rounded-lg'
                {...register('marital_status', {
                  required: 'Please select your status',
                })}
              >
                <option value='married'>Married</option>
                <option value='single'>Single</option>
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
              <label htmlFor='country' className='text-[#333333] '>
                Gender
              </label>
              <select
                className='w-full p-2 focus:outline-none border rounded-lg'
                {...register('sex', {
                  required: 'Please select your gender',
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
              <label htmlFor='occupation' className='text-[#333333] '>
                Occupation
              </label>
              <input
                type='text'
                id='occupation'
                className='w-full p-2 focus:outline-none border '
                {...register('occupation', {
                  required: 'Please enter your occupation',
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
                {...register('password', {
                  required: 'Please enter your password',
                  minLength: {
                    value: 6,
                    message: 'password chars shoukd be greater than 5',
                  },
                })}
              />
              {errors.password && (
                <span className='text-red-500'>{errors.password.message}</span>
              )}
            </div>
          </div>
          <div className=''>
            <Button2 type='submit' title='Update' />
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditUser;
