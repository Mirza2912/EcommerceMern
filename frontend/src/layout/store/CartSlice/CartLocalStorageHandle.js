// Helper for localStorage
const loadCartFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};
const saveCartToLocalStorage = (cart) => {
  // console.log(cart?.items[0]);

  localStorage.setItem("cart", JSON.stringify(cart));
};

export { loadCartFromLocalStorage, saveCartToLocalStorage };
