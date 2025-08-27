import React from "react";

interface CustomInputProps {
  label?: string;
  name: string;
  type?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}

const index: React.FC<CustomInputProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
}) => {
  return (
    <div className='w-full'>
      {label && (
        <label htmlFor={name} className='text-[15px] text-gray-700 px-1'>
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className='text-[14px]'
        style={{
          padding: "8px",
          border: error ? "1px solid red" : "1px solid #ccc",
          borderRadius: "4px",
          display: "block",
          width: "100%",
        }}
      />
      {error && (
        <p style={{ color: "red", marginTop: "4px", fontSize: "12px" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default index;
