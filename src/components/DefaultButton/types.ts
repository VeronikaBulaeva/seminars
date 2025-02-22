export enum ButtonType {
  link = "link",
  button = "button",
}

export interface ButtonProps {
  buttonType: ButtonType;
  className?: string;
  link?: string;
  onClick?: () => void;
  disabled?: boolean;
}
