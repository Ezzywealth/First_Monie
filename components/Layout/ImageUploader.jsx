import React, { useState, useRef, useEffect } from "react";

const ImageUploader = ({ setImageUrl }) => {
  const cloudinaryRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
  }, []);

  const uploadToCloudinary = async () => {
    const widget = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dk8oefaio",
        uploadPreset: "firstmonie",
        resourceType: "image",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Uploaded", result.info);
          setImageUrl(result.info.url);
        } else if (error) {
          console.log(error);
        }
      }
    );
    widget.open();
  };

  return (
    <div>
      <button
        type='button'
        onClick={uploadToCloudinary}
        className='px-3 py-2 bg-gray-400 text-white hover:scale-105 customTransition rounded-lg w-full mb-8'
      >
        Upload Image
      </button>
    </div>
  );
};

export default ImageUploader;
