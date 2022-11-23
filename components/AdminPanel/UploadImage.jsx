import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import ImageUploader from "../Layout/ImageUploader";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
const UploadImage = () => {
  const user = useSelector((state) => state.generalSlice.user);
  console.log(user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: session } = useSession();
  const [imageUrl, setImageUrl] = useState(user.image);

  const changeImageUrl = async () => {
    try {
      const { data } = await axios.put(`/api/transactions/changeImage`, {
        id: session?.user._id,
        imageUrl,
      });
    } catch (error) {
      toast.error("There was an error uploading your picture");
    }
  };
  useEffect(() => {
    changeImageUrl();
  }, [user.image]);

  return (
    <div className='space-y-4'>
      <div className='border border-solid  border-gray-400 p-6'>
        <div className=' '>
          <Image
            src={imageUrl}
            height={100}
            width={100}
            layout='responsive'
            className='rounded-lg'
            alt='image'
          />
        </div>
      </div>

      <div className='flex flex-col w-full'>
        <ImageUploader setImageUrl={setImageUrl} />
      </div>
    </div>
  );
};

export default UploadImage;
