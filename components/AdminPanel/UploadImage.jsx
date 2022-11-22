import React from "react";
import { useForm } from "react-hook-form";
import { WidgetLoader, Widget } from "react-cloudinary-upload-widget";
import Image from "next/image";
import { toast } from "react-toastify";
import ImageUploader from "../Layout/ImageUploader";
const UploadImage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const uploadImage = ({ image }) => {
    console.log(image);
  };

  return (
    <div className='space-y-4'>
      <div className='border border-solid  border-gray-400 p-6'>
        <div className=' '>
          <Image
            src='/hero7.jpg'
            height={100}
            width={100}
            layout='responsive'
            className='rounded-lg'
            alt='image'
          />
        </div>
      </div>

      <div className='flex flex-col w-full'>
        <ImageUploader />
      </div>
    </div>
  );
};

export default UploadImage;
