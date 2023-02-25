import { splitProps } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";

export function Button(props: ButtonProps) {
  const [, others] = splitProps(props, [
    "isActive",
    "buttonType",
    "children",
    "class",
  ]);

  return (
    <button
      {...others}
      class={`transition duration-200 capitalize rounded-full  ${
        props.class
      } ${getButtonClasses(props.isActive ?? false, props.buttonType)}`}
    >
      {props.children}
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
      return "text-body md:text-h2 text-white w-[279px] h-[48px]  md:w-[541px] md:h-[70px] bg-orange hover:bg-[#FFB84A]";
    case "MENUSELECT":
      return `text-[1rem] md:text-[1.625rem] text-white pt-[11px] pb-[9px] ${
        isActive ? "bg-blue-400" : "bg-blue-100 hover:bg-blue-300"
      } `;
    case "PRIMARY":
      return "text-h3 text-white py-3 px-7 bg-orange hover:bg-[#FFB84A]";
    case "SECONDARY":
      return "text-h3 text-blue-400 bg-[#DFE7EC] py-3 px-7 hover:text-white hover:bg-blue-300";
    default:
      return "";
  }
}
