import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ChangeAccountStatus = ({ user, setStats }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [newStatus, setNewStatus] = useState(user.account_status);

  const formHandler = async ({ account_status }) => {
    console.log(account_status);
    try {
      const { data } = await axios.post(`/api/transactions/changeStatus`, {
        account_status,
        id: user._id,
      });
      console.log(data);
      setNewStatus(account_status);
      setStats(account_status);
      toast.success(data.message);

      if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className='space-y-8'>
      <div>
        <div className='flex flex-col items-center'>
          <h2 className='text-xl text-gray-500 font-bold'>Account Status</h2>
          <h3
            className={`text-2xl text-gray-500 font-bold capitalize ${
              user.account_status === "active"
                ? "text-green-500"
                : "text-orange-500"
            }`}
          >
            {newStatus}
          </h3>
        </div>

        <form
          id='balanceform'
          className='space-y-6'
          onSubmit={handleSubmit(formHandler)}
        >
          <div className='flex flex-col w-full'>
            <label htmlFor='action' className='text-gray-500 font-semibold'>
              Select Status
            </label>
            <select
              className=' p-2 rounded-lg focus:outline-none border border-solid border-gray-400'
              id='action'
              {...register("account_status", {
                required: "Please select a method",
              })}
            >
              <option value='active' className='bg-gray-300 focus:bg-gray-300'>
                Active
              </option>
              <option value='hold' className='bg-gray-300 focus:bg-gray-300'>
                Hold
              </option>
            </select>
          </div>
          <div>
            <button className='bg-indigo-500 rounded-lg px-3 py-2 text-white w-full'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeAccountStatus;
