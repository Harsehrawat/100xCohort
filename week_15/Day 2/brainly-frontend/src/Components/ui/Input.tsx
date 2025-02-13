import { forwardRef } from "react";

interface InputProps {
    placeholder: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return (
        <div>
            <input
                type="text"
                placeholder={props.placeholder}
                ref={ref}
                className="px-4 py-2 border rounded-xl m-2"
            />
        </div>
    );
});
