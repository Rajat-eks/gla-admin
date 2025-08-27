import React, { type ReactNode } from "react";

interface CustomButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

const Button: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
}) => {
  const styles = {
    primary: {
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
    },
    secondary: {
      backgroundColor: "#6c757d",
      color: "#fff",
      border: "none",
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        borderRadius: "4px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        ...styles[variant],
      }}
    >
      {children}
    </button>
  );
};

export default Button;
