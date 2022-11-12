import axios from "axios";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const WalletScreen = ({ wallets }) => {
  const [newWallets, setNewWallets] = useState(wallets);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // adding new wallet address to the database
  const handleWalletChange = async ({ walletName, walletAddress }) => {
    const formInput = document.getElementById("myForm3");

    //checking if the wallet address to be added is already in the database
    const existingWallet = newWallets.find(
      (item) => item.walletAddress === walletAddress
    );

    if (existingWallet) {
      toast.error("This wallet already exist");
      return;
    }

    try {
      const { data } = await axios.post(`/api/transactions/createWallet`, {
        walletName,
        walletAddress,
      });
      setNewWallets([...newWallets, ...data.data]);
      formInput.reset();
      if (data.error) throw new Error(data.error);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // deleting wallet from the database and the UI
  const handleWalletDelete = async (id) => {
    try {
      const { data } = await axios.post(`/api/transactions/deleteWallet`, {
        id,
      });

      setNewWallets(() => newWallets.filter((item) => item._id !== id));
      console.log(data);
    } catch (error) {}
  };

  return (
    <div className='px-4 md:px-8 xl:px-16 my-8 grid gap-8 grid-cols-1'>
      <div className='col-span-2 overflow-auto'>
        <h2 className='font-bold tracking-wide text-xl'>Lists of Wallets</h2>
        <table className='min-w-full bg-indigo-100 '>
          <thead className='bg-indigo-300'>
            <tr className='mb-2 font-bold text-sm md:text-lg'>
              <td className='text-start p-2 '>Name</td>
              <td className='text-center'>Address</td>

              <td className='text-center'>Actions</td>
            </tr>
          </thead>
          <tbody className='bg-indigo-900 text-white space-y-2  font-normal text-xs lg:text-base'>
            {newWallets.map((item) => (
              <tr key={item._id} className='text-sm'>
                <td className='text-start px-2'>{item.walletName}</td>
                <td className='text-center p-4 text-amber-500'>
                  {item.walletAddress}
                </td>

                <td className='text-center p-3'>
                  <button
                    className='bg-red-500 px-2 py-1 rounded-lg'
                    onClick={() => handleWalletDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='col-span-1 md:w-[50%]'>
        <h2 className='text-xl font-bold'>Change Deposit Wallet</h2>
        <div>
          <form
            id='myForm3'
            className=' my-1 bg-white h-full py-8 pt-4 rounded-lg px-4'
            onSubmit={handleSubmit(handleWalletChange)}
          >
            <div className='flex flex-col gap-4'>
              <div>
                <label htmlFor='walletName' className='text-[#333333] '>
                  Wallet name
                </label>
                <input
                  type='text'
                  id='walletName'
                  className='w-full p-2 focus:outline-none border mb-2'
                  {...register("walletName", {
                    required: "please enter wallet name",
                  })}
                />
                {errors.walletName && (
                  <span className='text-red-500'>
                    {errors.walletName.message}
                  </span>
                )}
              </div>
              <div>
                <label htmlFor='walletAddress' className='text-[#333333] '>
                  Wallet Address
                </label>
                <input
                  type='text'
                  id='walletAddress'
                  className='w-full p-2 focus:outline-none border mb-2'
                  {...register("walletAddress", {
                    required: "please enter address",
                  })}
                />
                {errors.walletAddress && (
                  <span className='text-red-500'>
                    {errors.walletAddress.message}
                  </span>
                )}
              </div>

              <div>
                <button
                  type='submit'
                  className='bg-indigo-900 px-3 py-1 text-white rounded-lg'
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WalletScreen;
