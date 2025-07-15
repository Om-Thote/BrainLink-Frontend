interface InputProps {
  placeholder: string;
  reference?: any;
  type?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function Input({ placeholder, reference, type = "text", onKeyDown }: InputProps) {
  return (
    <div>
      <input
        ref={reference}
        placeholder={placeholder}
        type={type}
        onKeyDown={onKeyDown}
        className="px-4 py-2 border rounded m-2"
      />
    </div>
  );
}





