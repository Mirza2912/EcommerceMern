import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Add an item to the cart
const addItemToCart = async (req, res, next) => {
  try {
    const { productId, quantity, price } = req.body;
    // console.log("new product quantity :" + quantity);

    //bhai yahan pe userId nahi ana srf req.user._id because mogodb default id deti he with key of _id
    const userId = req.user._id; // Assumes auth middleware sets req.user.userId

    // Validate input
    if (!productId || !quantity || !price) {
      return next(new ApiError(`Required missing parameters...!`, 400));
    }

    // Find the user's cart or create a new one
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if the product already exists in the cart
    const itemIndex = cart.items?.findIndex(
      (item) => item.product.toString() === productId
    );
    // console.log(itemIndex);

    var message = "";
    if (itemIndex > -1) {
      const product = await Product.findById(productId);

      if (product?.stock > cart.items[itemIndex]?.quantity + quantity) {
        cart.items[itemIndex].quantity += quantity;
        message = "Item quantity updated in cart";
      } else {
        cart.items[itemIndex].quantity = product?.stock;
        message = "Item quantity updated in cart to max stock";
      }
    } else {
      // Add new item to the cart
      cart.items?.push({ product: productId, quantity, price });
      message = "Item added to cart";
    }

    await cart.populate({
      path: "items.product",
      populate: {
        path: "category",
        select: "category",
      },
    });
    await cart.save();

    res.status(201).json(new ApiResponse(201, { cart }, message));
  } catch (error) {
    console.error("Error in addItemToCart:", error);
    return next(
      new ApiError(`Something went wrong while add item to cart...!`, 500)
    );
  }
};

// Retrieve the current user's cart
const getCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "items.product",
      populate: {
        path: "category",
        select: "category",
      },
    });
    // console.log(cart?.items[0]);

    if (!cart) {
      return next(new ApiError(`Cart not found or empty...!`, 404));
    }

    res.status(200).json(new ApiResponse(201, { cart }, "All items of cart"));
  } catch (error) {
    console.error("Error in getCart:", error);
    return next(
      new ApiError(`Something went wrong while add item to cart...!`, 500)
    );
  }
};

// Update the quantity of a specific cart item
const updateCartItem = async (req, res, next) => {
  try {
    const { quantity, itemId, price } = req.body;
    const userId = req.user._id;
    // console.log(price, quantity, itemId);

    if (!quantity || !itemId || !price) {
      return next(
        new ApiError(`Quantity, id and price of product required...!`, 401)
      );
    }

    // Find user's cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return next(new ApiError(`Cart not found...!`, 404));
    }

    // Find the cart item to update
    const itemIndex = cart.items?.findIndex(
      (item) => item._id.toString() === itemId
    );
    // console.log(itemIndex);

    if (itemIndex === -1) {
      return next(new ApiError(`item to update not found...!`, 404));
    }

    // Update the quantity in frontend show only product available stock
    cart.items[itemIndex].quantity = quantity;
    cart.items[itemIndex].price = price;
    await cart.populate({
      path: "items.product",
      populate: {
        path: "category",
        select: "category",
      },
    });
    await cart.save();
    // console.log(cart);

    res
      .status(200)
      .json(new ApiResponse(201, { cart }, "Cart updated successfully...!"));
  } catch (error) {
    console.error("Error in updateCartItem:", error);
    return next(
      new ApiError(`Something went wrong while updating cart...!`, 500)
    );
  }
};

// Remove a specific item from the cart
const removeCartItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(id);
    // console.log(req.body);

    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId }).populate({
      path: "items.product",
      populate: {
        path: "category",
        select: "category",
      },
    });
    // console.log(cart);

    if (!cart) {
      return next(new ApiError(`Cart not found...!`, 404));
    }

    // Filter out the item to be removed
    cart.items = cart.items?.filter((item) => item._id.toString() !== id);
    await cart.save();

    // console.log(cart);

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { cart },
          "Item is removed from cart successfully...!"
        )
      );
  } catch (error) {
    console.error("Error in removeCartItem:", error);
    return next(
      new ApiError(`Something went wrong while deleting cart item...!`, 404)
    );
  }
};

// Clear the entire cart for the user
const clearCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return next(new ApiError(`Cart not found...!`, 404));
    }

    cart.items = [];
    await cart.save();

    res
      .status(200)
      .json(new ApiResponse(200, { cart }, "Cart is empty successfully...!"));
  } catch (error) {
    console.error("Error in clearCart:", error);
    return next(
      new ApiError(`Something went wrong while deleting cart item...!`, 500)
    );
  }
};

export { addItemToCart, getCart, updateCartItem, removeCartItem, clearCart };
