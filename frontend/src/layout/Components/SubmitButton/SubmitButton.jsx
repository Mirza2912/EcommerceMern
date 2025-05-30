import LoaderForForms from "../Home/LoaderForForms";

const SubmitButton = ({ type, isLoading, input, instead }) => {
  return (
    <>
      <button
        type={type}
        disabled={isLoading}
        className={`w-full border rounded-full border-[#ffc253] hover:bg-[#ffce53] hover:border-[#ffce53]  text-white font-bold py-3 transition duration-200 ${
          isLoading && "opacity-50 hover:cursor-wait"
        }`}
      >
        {isLoading ? <LoaderForForms input={input} /> : instead}
      </button>
    </>
  );
};

export default SubmitButton;
