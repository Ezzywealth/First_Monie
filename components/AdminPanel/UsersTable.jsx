import axios from "axios";
import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { startLoading } from "../../Redux/generalSlice";

const UsersTable = ({ newUsers, handleUserDelete }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleUserEdit = async (email) => {
    dispatch(startLoading());
    const userDetails = await axios.post(
      `/api/transactions/clientTransactions`,
      { email }
    );

    router.push(`/admin/aztrades-admin/${email}`);
  };

  return (
    <div className='px-8 my-8 xl:px-16 '>
      <h2 className='font-bold tracking-wide'>Users Lists</h2>
      <table className='min-w-full bg-indigo-100 '>
        <thead className='bg-indigo-300'>
          <tr className='mb-2 font-bold text-sm md:text-lg'>
            <td className='text-start p-2 '>Name</td>
            <td className='text-center'>email</td>
            <td className='text-center'>userName</td>
            <td className='text-center'>Phone</td>
            <td className='text-center'>Country</td>
            <td className='text-center'>Actions</td>
            <td className='text-center'>Delete</td>
          </tr>
        </thead>
        <tbody className='bg-indigo-900 text-white space-y-2  font-normal text-xs lg:text-base'>
          {newUsers.map((item) => (
            <tr key={item._id} className='text-sm'>
              <td className='text-start px-2'>{item.name}</td>
              <td className='text-center p-4 text-amber-500'>{item.email}</td>
              <td className={`text-center `}>{item.userName}</td>
              <td className='text-center p-3'>{item?.telephone}</td>
              <td className='text-center'>{item?.country}</td>
              <td className='text-center p-3'>
                <button
                  className='bg-green-500 px-3 py-1 rounded-lg'
                  onClick={() => handleUserEdit(item.email)}
                >
                  Edit
                </button>
              </td>
              <td className='text-center p-3'>
                <button
                  className='bg-red-500 px-2 py-1 rounded-lg'
                  onClick={() => handleUserDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
