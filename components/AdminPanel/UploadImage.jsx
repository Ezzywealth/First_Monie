import React, { useState, useEffect } from "react";
import Image from "next/image";
import ImageUploader from "../Layout/ImageUploader";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const UploadImage = ({ id, newUser }) => {
  const [imageUrl, setImageUrl] = useState(newUser[0].image);
  const user = useSelector((state) => state.generalSlice.user);

  const changeImageUrl = async () => {
    try {
      const { data } = await axios.put(`/api/transactions/changeImage`, {
        id,
        imageUrl,
      });
    } catch (error) {
      toast.error("There was an error uploading your picture");
    }
  };
  useEffect(() => {
    changeImageUrl();
  }, [imageUrl]);

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
