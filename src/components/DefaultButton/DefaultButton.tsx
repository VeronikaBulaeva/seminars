import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";
import styles from "./DefaultButton.module.css";
import { ButtonProps } from "./types.ts";

const DefaultButton: FC<
  PropsWithChildren<
    ButtonProps & Partial<ButtonHTMLAttributes<HTMLButtonElement>>
  >
> = ({
  link,
  className = "",
  buttonType,
  children,
  onClick,
  disabled,
  ...rest
}) => {
  return buttonType === "link" && link ? (
    <a
      className={`${styles.button} ${className}`}
      href={link}
      onClick={onClick}
    >
      {children}
    </a>
  ) : (
    <button
      onClick={onClick}
      className={`${styles.button} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default DefaultButton;
