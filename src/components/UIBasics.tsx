import type { JSX } from "solid-js/jsx-runtime";

export function Button({
  isActive = false,
  children,
  buttonType,

  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      class={`transition duration-300 capitalize rounded-full ${
        props.class
      } ${getButtonClasses(isActive, buttonType)}`}
    >
      {children}
    </button>
  );
}

type ButtonType = "MENUBIG" | "MENUSELECT" | "PRIMARY" | "SECONDARY";
type ButtonProps = {
  isActive?: Boolean;
  buttonType: ButtonType;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

function getButtonClasses(isActive: Boolean, type?: ButtonType): string {
  switch (type) {
    case "MENUBIG":
      return "text-h2 text-white  w-[541px] h-[70px] bg-orange hover:bg-[#FFB84A]";
    case "MENUSELECT":
      return `text-[1.625rem] text-white px-[73px] py-3 ${
        isActive ? "bg-blue-400" : "bg-blue-100"
      } hover:bg-blue-300 hover:bg-[#FFB84A]`;
    case "PRIMARY":
      return "text-h3 text-white py-3 px-7 bg-orange hover:bg-[#FFB84A]";
    case "SECONDARY":
      return "text-h3 text-blue-400 bg-[#DFE7EC] py-3 px-7 hover:text-white hover:bg-blue-300";
    default:
      return "";
  }
}
