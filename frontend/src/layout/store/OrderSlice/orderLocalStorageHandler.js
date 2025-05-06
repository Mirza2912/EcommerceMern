// Helper for localStorage
const loadShippingFromLocalStorage = () => {
  const shippingAddress = localStorage.getItem("shippingAddress");
  return shippingAddress ? JSON.parse(shippingAddress) : null;
};
const saveShippingToLocalStorage = (shippingAddress) => {
  localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));
};

const loadOrderItemsFromLocalStorage = () => {
  const orderItems = localStorage.getItem("orderItems");
  return orderItems ? JSON.parse(orderItems) : [];
};
const saveOrderItemsToLocalStorage = (orderItems) => {
  localStorage.setItem("orderItems", JSON.stringify(orderItems));
};

export {
  loadShippingFromLocalStorage,
  saveShippingToLocalStorage,
  loadOrderItemsFromLocalStorage,
  saveOrderItemsToLocalStorage,
};
