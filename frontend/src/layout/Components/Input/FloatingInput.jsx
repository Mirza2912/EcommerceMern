import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icons

const FloatingInput = ({
  label,
  icon: Icon,
  type = "text",
  name,
  value,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordType = type === "password";

  return (
    <div className="relative">
      {/* Icon */}
      <Icon className="text-xl text-gray-500 absolute top-4 left-2.5 z-10" />

      {/* Input Field */}
      <input
        type={isPasswordType && showPassword ? "text" : type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={`${isFocused ? `your ${label}` : label}`}
        className={`w-full relative pl-10 pr-10 py-3 border border-gray-300 rounded-lg outline-none text-gray-800 peer transition-all duration-200 
            focus:border-gray-300 focus:ring-2 focus:ring-gold`}
        required
      />

      {/* Floating Label */}
      <label
        htmlFor={name}
        className={`absolute left-10 transition-all duration-300 text-gray-500 bg-white rounded px-1
            ${
              isFocused || (value && value.length > 0)
                ? "-top-2.5 text-sm"
                : "top-1/2 -translate-y-1/2 text-base"
            }
          `}
      >
        {label}
      </label>

      {/* Show/Hide Password Toggle */}
      {isPasswordType && (
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute top-4 right-3 text-gray-500 cursor-pointer z-10"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      )}
    </div>
  );
};

export default FloatingInput;
