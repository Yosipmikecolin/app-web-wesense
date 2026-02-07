import React, { useState, useRef, useEffect } from "react";
import { FieldError } from "react-hook-form";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: boolean;
  id: string;
  label: string;
}

const Select: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  error,
  label,
  placeholder = "Selecciona una opción",
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={ref} id={id}>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full bg-white border ${
          error
            ? "border-red-300 focus:ring-2 focus:border-red-500 focus:ring-red-200"
            : "border-gray-200"
        } rounded-lg px-4 py-3 text-left focus:outline-none focus:ring-2 focus:border-green-500 focus:ring-green-200 flex justify-between items-center`}
      >
        <span className={`${value ? "text-gray-800" : "text-gray-400"}`}>
          {selectedLabel || placeholder}
        </span>
        <svg
          className={`w-5 h-5 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer hover:bg-green-100 ${
                value === opt.value
                  ? "bg-green-50 font-medium text-green-600"
                  : ""
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
