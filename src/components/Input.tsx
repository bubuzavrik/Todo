import { forwardRef, ForwardedRef, InputHTMLAttributes, FC } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  ref?: ForwardedRef<HTMLInputElement>;
}

export const Input: FC<Props> = forwardRef(
  ({ name, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 border rounded-sm p-2">
        <label htmlFor={name} className="flex items-baseline gap-2 text-xs">
          {label}
          <span className="text-red-600 text-xs"> {error}</span>
        </label>

        <input
          {...props}
          name={name}
          id={name}
          className="flex-1 bg-transparent outline-none"
          ref={ref}
        />
      </div>
    );
  }
);
