import React, { useState } from "react";
import { useEffect } from "react";
import { generateSignature } from "../../utils/generateSignature";
const ImageUploader = () => {
  const [ssr, setSsr] = useState(true);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  useEffect(() => {
    setSsr(false);
  }, []);
  const uploadToCloudinary = async () => {
    if (ssr) {
      return;
    }

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dk8oefaio",
        uploadPreset: "ml_default",
        resourceType: "image",
        apikey: process.env.NEXT_CLOUDINARY_API_KEY,
        uploadSignature: generateSignature,
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