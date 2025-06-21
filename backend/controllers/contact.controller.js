import Contact from "../models/contact.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

const submitContactForm = AsyncHandler(async (req, res, next) => {
  const { name, email, subject, message } = req.body;
  console.log(name, email, subject, message);

  if (!name || !email || !message) {
    return next(new ApiError(`Please fill all required fields...!`, 400));
  }

  try {
    const contact = await Contact.create({ name, email, subject, message });

    res
      .status(200)
      .json(
        new ApiResponse(200, `Message received. We will contact you soon...!`)
      );
  } catch (error) {
    console.error("Contact form error:", error);
    return next(new ApiError(`Something went wrong please try later...!`, 500));
  }
});

const getAllContact = AsyncHandler(async (req, res, next) => {
  try {
    const contact = await Contact.find().sort({ createAt: -1 });

    if (!contact) {
      return next(new ApiError(`Contacts not found...!`, 500));
    }
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          contact,
          `Message received. We will contact you soon...!`
        )
      );
  } catch (error) {
    console.error("Contact form error:", error);
    return next(new ApiError(`Something went wrong please try later...!`, 500));
  }
});

const singleContactDetails = AsyncHandler(async (req, res, next) => {
  // console.log(req.user);

  const id = req.params.id;

  try {
    if (!id) {
      return next(new ApiError(`Id is required...!`, 400));
    }
    const singleContact = await Contact.findById(id);

    if (!singleContact) {
      return next(
        new ApiError(`Contact with id : ${req.params.id} is not found...!`, 400)
      );
    }

    return res
      .status(200)
      .json(new ApiResponse(200, singleContact, "User Details...!"));
  } catch (error) {
    console.log("userDetails error", error);
    return next(
      new ApiError(
        "Something went wrong while getting contact details...!",
        500
      )
    );
  }
});

const deleteContact = AsyncHandler(async (req, res, next) => {
  // console.log(req.user);

  const id = req.params.id;

  try {
    if (!id) {
      return next(new ApiError(`Id is required...!`, 400));
    }
    await Contact.findByIdAndDelete(id);

    return res
      .status(200)
      .json(new ApiResponse(200, "Contact deleted successfully...!"));
  } catch (error) {
    console.log("userDetails error", error);
    return next(
      new ApiError(
        "Something went wrong while getting deleting contact...!",
        500
      )
    );
  }
});

export {
  submitContactForm,
  getAllContact,
  singleContactDetails,
  deleteContact,
};
