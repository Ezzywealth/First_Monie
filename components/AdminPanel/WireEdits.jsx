import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const WireEdit = ({ editingId, changeDetails, setEditing }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const formHandler = async ({ amount, date, email, status }) => {
    console.log(editingId);
    document.getElementById("myForm").reset();

    try {
      const { data } = await axios.put(`/api/transactions/editWire`, {
        amount,
        editingId,
        date,
        email,
        status,
      });
      toast.success(data.message);
      console.log(data);
      changeDetails(data.toUpdateWire);
    } catch (error) {
      toast.error(data.message);
    }
  };
  return (
    <div className='border border-solid border-gray-300 bg-gray-800 py-3 px-2 rounded-lg backdrop-blur-sm'>
      <span
        className='flex justify-start mb-2 text-xl  text-white px-4'
        onClick={() => setEditing(false)}
      >
        <span className='rounded-full flex h-8 justify-center items-center w-8 bg-red-500'>
          X
        </span>
      </span>
      <form
        id='myForm'
        onSubmit={handleSubmit(formHandler)}
        className='flex gap-2 justify-between overflow-auto px-2 py-1'
      >
        <input
          type=''
          placeholder='date'
          {...register("date")}
          required
          className='admin bg-gray-100 py-1 px-2 borderflex-1  border-gray-400 border-solid rounded-lg focus:outline-none'
        />
        <input
          type='text'
          placeholder='email'
          {...register("email")}
          required
          className='admin bg-gray-100 py-1 px-2 borderflex-1  border-gray-400 border-solid rounded-lg focus:outline-none'
        />
        <input
          type='number'
          placeholder='amount'
          {...register("amount")}
          required
          className='admin bg-gray-100 py-1 px-2 borderflex-1  border-gray-400 border-solid rounded-lg focus:outline-none'
        />
        <input
          type='text'
          placeholder='status'
          {...register("status")}
          required
          className='admin bg-gray-100 py-1 px-2 borderflex-1  border-gray-400 border-solid rounded-lg focus:outline-none'
        />
        <button className='bg-green-500 w-[5rem] text-white  rounded-lg hover:scale-105 customTransition px-3 py-1'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default WireEdit;
