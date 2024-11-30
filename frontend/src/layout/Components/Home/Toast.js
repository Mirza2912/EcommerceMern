import { toast } from "react-toastify";
// import "../../Toast.css";

// const showToast = (message, type = "default") => {
//   //options for toast
//   let options = {
//     position: "top-right",
//     autoClose: 3000, // Close after 3 seconds
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "colored",
//   };
//   switch (type) {
//     case "success":
//       options = {
//         ...options,
//         className: "bg-green-500 text-white p-4 rounded-lg shadow-lg", // Tailwind styles for success
//         progressClassName: "bg-green-700",
//         icon: "✅",
//       };
//       break;
//     case "error":
//       options = {
//         ...options,
//         className: "bg-red-500 text-white p-4 rounded-lg shadow-lg", // Tailwind styles for error
//         progressClassName: "bg-red-700",
//         icon: "❌",
//       };
//       break;
//     case "info":
//       options = {
//         ...options,
//         className: "bg-blue-500 text-white p-4 rounded-lg shadow-lg", // Tailwind styles for info
//         progressClassName: "bg-blue-700",
//         icon: "ℹ️",
//       };
//       break;
//     default:
//       options = {
//         ...options,
//         className: "bg-gray-500 text-white p-4 rounded-lg shadow-lg", // Default styling
//         progressClassName: "bg-gray-700",
//         icon: "🔔",
//       };
//   }
//   toast(message, options);
// };

const showToast = (message, type) => {
  switch (type) {
    case "success":
      toast.success(` ${message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      break;
    case "error":
      toast.error(`⚠️ ${message}`, {
        className:
          "bg-red-500 text-white font-semibold rounded-lg shadow-lg p-4",
        progressClassName: "bg-red-300",
      });
      break;
    case "info":
      toast.info("ℹ️ Info! Here is some information.", {
        className:
          "bg-blue-500 text-white font-semibold rounded-lg shadow-lg p-4",
        progressClassName: "bg-blue-300",
      });
      break;
    case "warning":
      toast.warn("⚠️ Warning! Be cautious.", {
        className:
          "bg-yellow-500 text-white font-semibold rounded-lg shadow-lg p-4",
        progressClassName: "bg-yellow-300",
      });
      break;
    default:
  }
};

export default showToast;
