import type { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary" | "tertiary";
    text: string;
    startIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;
    disabled?: boolean;
}

const variantClasses = {
    "primary": "bg-gradient-to-br from-purple-700 via-purple-500 via-pink-500 to-purple-300 text-white cursor-pointer",
    "secondary": "bg-transparent border-1 border-black text-black hover:bg-purple-600 hover:text-white transition-colors",
    "tertiary": "bg-transparent border-1 border-black text-black hover:bg-purple-600 hover:text-white transition-colors"
};

const defaultStyles = "px-3 py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 rounded-md font-light flex items-center text-sm md:text-base transition-all duration-200";

export function Button({ variant, text, startIcon, onClick, fullWidth, loading, disabled }: ButtonProps) {
    const isDisabled = loading || disabled;

    return (
        <button
            onClick={onClick}
            className={`${variantClasses[variant]} ${defaultStyles} ${fullWidth ? "w-full flex justify-center items-center" : ""} ${isDisabled ? "opacity-45" : ""}`}
            disabled={isDisabled}
        >
            <div className="pr-1 md:pr-2">
                {startIcon}
            </div>
            {text}
        </button>
    );
}