import { useState } from "react";

const FloatingInput = ({
  label,
  icon: Icon,
  type = "text",
  name,
  value,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className=" relative">
      {/* Icon */}
      <Icon className="text-xl text-gray-500 absolute top-4 left-2.5 z-10" />
      {/* Input Field */}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(name)}
        onBlur={() => setIsFocused(null)}
        placeholder={`${isFocused ? `your ${label}` : label}`}
        className={`w-full relative pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none text-gray-800 peer transition-all duration-200 
            focus:border-gray-300 focus:ring-2 focus:ring-gold`}
        required
      />

      {/* Floating Label */}
      <label
        htmlFor={name}
        className={`absolute left-10 transition-all duration-300 text-gray-500 bg-white rounded px-1
            ${
              isFocused || (value && value.length > 0)
                ? "-top-2.5 text-sm "
                : "top-1/2 -translate-y-1/2 text-base"
            }
          `}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingInput;
