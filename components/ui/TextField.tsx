'use client'

import { Label } from "./label";
import { Input } from "./input";

type TextFieldProps = {
    label: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    fullWidth?: boolean;
    className?: string;
    disabled?: boolean;
    required?: boolean;
};

export function TextField({
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    fullWidth = false,
    className = '',
    disabled = false,
    required = false
}: TextFieldProps) {
    return (
        <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
            <Label htmlFor={label.toLowerCase().replace(/\s+/g, '-')} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input 
                id={label.toLowerCase().replace(/\s+/g, '-')} 
                type={type} 
                value={value} 
                onChange={onChange} 
                placeholder={placeholder}
                disabled={disabled}
                className={`
                    mt-2 block w-full 
                    ${disabled ? 'cursor-not-allowed opacity-50' : ''}
                    ${fullWidth ? 'w-full' : ''}
                `}
                required={required}
            />
        </div>
    );
}