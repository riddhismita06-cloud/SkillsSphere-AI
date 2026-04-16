import React from "react";
import PropTypes from "prop-types";

/**
 * Input — Reusable text input component.
 *
 * Props
 * ─────
 * @param {string}   id          - Unique id (required for a11y label association)
 * @param {string}   label       - Visible label text
 * @param {string}   type        - HTML input type (default: "text")
 * @param {string}   placeholder - Placeholder text
 * @param {string|number} value  - Controlled value
 * @param {function} onChange    - Change handler
 * @param {string}   error       - Error message (shows red border + message)
 * @param {string}   helperText  - Subtle hint shown below input when no error
 * @param {boolean}  disabled    - Disables the input
 * @param {boolean}  required    - Marks field as required
 * @param {string}   className   - Extra Tailwind classes for the wrapper
 * @param {React.ReactNode} leftIcon  - Icon element rendered inside left edge
 * @param {React.ReactNode} rightIcon - Icon element rendered inside right edge
 */
const Input = ({
  id,
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  required = false,
  className = "",
  leftIcon,
  rightIcon,
  ...rest
}) => {
  const hasError = Boolean(error);

  const baseInput = [
    "w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-800",
    "placeholder:text-slate-400 transition-all duration-150",
    "focus:outline-none focus:ring-2 focus:ring-offset-0",
    leftIcon ? "pl-10" : "",
    rightIcon ? "pr-10" : "",
    hasError
      ? "border-red-400 focus:ring-red-400 focus:border-red-400"
      : "border-slate-300 focus:ring-brand-500 focus:border-brand-500",
    disabled
      ? "cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200"
      : "hover:border-slate-400",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-slate-700 select-none"
        >
          {label}
          {required && (
            <span className="ml-0.5 text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {/* Input wrapper */}
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="pointer-events-none absolute left-3 flex items-center text-slate-400">
            {leftIcon}
          </span>
        )}

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined
          }
          className={baseInput}
          {...rest}
        />

        {rightIcon && (
          <span className="pointer-events-none absolute right-3 flex items-center text-slate-400">
            {rightIcon}
          </span>
        )}
      </div>

      {/* Error or helper text */}
      {hasError ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-500 flex items-center gap-1">
          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      ) : helperText ? (
        <p id={`${id}-helper`} className="text-xs text-slate-500">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  error: PropTypes.string,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
};

export default Input;
