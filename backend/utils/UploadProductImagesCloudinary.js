import cloudinary from "cloudinary";
import { ApiError } from "./ApiError.js";

const UploadProductImagesCloudinary = async (req, next) => {
  try {
    //first of all check given images is an array if not make sure to make it array
    // const imagesArray = Array.isArray(images) ? images : [images]; // Ensure it's an array
    // console.log(typeof imagesArray);
    // Validate file types and size

    //it is an array where we will store object of uploaded images properties
    const uploadedImages = [];

    //check is images given by local machine
    if (req.files?.images) {
      //if images not in the form of array
      const imagesArray = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];
      // const start = Date.now();
      //loop for upload image on cloudinary one by one and then store every image url and id in uploadedImages array
      const uploadedLocalImages = await Promise.all(
        imagesArray.map((image) =>
          cloudinary.uploader.upload(image.tempFilePath, {
            folder: "productImages",
            quality: "auto:low",
            chunk_size: 6000000, // Upload in 6MB chunks
            transformation: [
              {
                width: 800,
                height: 800,
                crop: "limit",
                fetch_format: "auto",
                quality: "auto",
              },
            ],
          })
        )
      );
      // console.log(`Upload Time: ${Date.now() - start}ms`);
      //if not upload successfully
      if (!uploadedLocalImages) {
        return next(
          new ApiError(`Something went wrong while uploading image`, 500)
        );
      }

      // Store { url, public_id }
      uploadedImages.push(
        ...uploadedLocalImages.map((img) => ({
          url: img.secure_url,
          public_id: img.public_id,
        }))
      );
    }

    //if user gives images from google or another as only url(string)
    if (req.body?.images) {
      //if images not in the form of array
      const imagesArray = Array.isArray(req.body.images)
        ? req.body.images
        : [req.body.images];
      // const start = Date.now();
      //loop for upload image on cloudinary one by one and then store every image url and id in uploadedImages array
      const uploadedLocalImages = await Promise.all(
        imagesArray.map((image) =>
          cloudinary.uploader.upload(image, {
            folder: "productImages",
            quality: "auto:low",
            chunk_size: 6000000, // Upload in 6MB chunks
            transformation: [
              {
                width: 800,
                height: 800,
                crop: "limit",
                fetch_format: "auto",
                quality: "auto",
              },
            ],
          })
        )
      );
      // console.log(`Upload Time: ${Date.now() - start}ms`);
      //if not upload successfully
      if (!uploadedLocalImages) {
        return next(
          new ApiError(`Something went wrong while uploading image`, 500)
        );
      }

      // Store { url, public_id }
      uploadedImages.push(
        ...uploadedLocalImages.map((img) => ({
          url: img.secure_url,
          public_id: img.public_id,
        }))
      );
    }

    return uploadedImages;
  } catch (error) {
    // console.log(error);
    return next(
      new ApiError(`product images upload failed: ${error.message}`, 500)
    );
  }
};

export default UploadProductImagesCloudinary;
