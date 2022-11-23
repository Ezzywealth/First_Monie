import React, { useState, useRef, useEffect } from "react";

const ImageUploader = () => {
  const cloudinaryRef = useRef();
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    console.log(cloudinaryRef.current);
  }, []);

  const uploadToCloudinary = async () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dk8oefaio",
        uploadPreset: "ml_default",
        resourceType: "image",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Uploaded", result.info);
          setIsImageUploaded(true);
        } else if (error) {
          console.log(error);
        }
      }
    );
    widget.open();
  };
  return (
    <div>
      <button type='button' onClick={uploadToCloudinary}>
        Upload Image
      </button>
    </div>
  );
};

export default ImageUploader;
