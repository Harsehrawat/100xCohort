export const Input = ({ type, placeholder, className }) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className={`rounded-xl text-4xl text-black ${className}`}
      />
    );
  };
  