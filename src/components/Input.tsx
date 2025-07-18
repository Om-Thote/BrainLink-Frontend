interface InputProps {
  placeholder: string;
  reference?: any;
  type?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function Input({ placeholder, reference, type = "text", onKeyDown }: InputProps) {
  return (
    <div className="w-full">
      <input
        ref={reference}
        placeholder={placeholder}
        type={type}
        onKeyDown={onKeyDown}
        className="
          w-full
          px-3 py-2.5
          md:px-4 md:py-3
          lg:px-5 lg:py-3.5
          m-1
          md:m-2
          lg:m-3
          max-w-xs
          md:max-w-sm
          lg:max-w-md
          xl:max-w-lg
          text-sm
          md:text-base
          lg:text-lg
          border
          border-gray-300
          rounded-lg
          md:rounded-xl
          focus:outline-none
          focus:ring-2
          focus:ring-purple-500
          focus:border-transparent
          transition-all
          duration-200
          placeholder:text-gray-400
          hover:border-purple-300
        "
      />
    </div>
  );
}





