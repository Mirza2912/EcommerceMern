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
      //if images not in the form of array then convert to array
      const imagesArray = Array.isArray(req.files?.images)
        ? req.files?.images
        : [req.files?.images];

      //validation of image format
      const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      //validation of images
      for (let image of imagesArray) {
        //check given image is valid or not
        if (!allowedFormats.includes(image.mimetype)) {
          return next(
            new ApiError(`Invalid file type: ${image.mimetype}`, 400)
          );
        }

        //check image size not exceed 5mb
        if (image.size > maxSize) {
          return next(new ApiError("File size exceeds 5MB limit", 400));
        }
      }
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

    return uploadedImages;
  } catch (error) {
    // console.log(error);
    return next(
      new ApiError(`product images upload failed: ${error.message}`, 500)
    );
  }
};

export default UploadProductImagesCloudinary;
