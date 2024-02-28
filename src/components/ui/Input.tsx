'use client'

import {
  FieldError,
  FieldErrors,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormRegister,
} from 'react-hook-form'

interface InputProps {
  id: string
  label: string
  type?: string
  disabled?: boolean
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  placeholder?: string
  errorMessage?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  disabled,
  register,
  required,
  errors,
  placeholder,
  errorMessage,
}) => {
  console.log(errorMessage)

  return (
    <div className="w-full relative">
      <label
        className={`
                 text-xs font-semibold ${
                   errors[id] ? 'text-rose-500' : 'text-gray_color'
                 }
            `}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder={placeholder}
        className={`
                    w-full text-sm py-2 font-medium bg-white border-[1px] rounded-lg outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4 ${
                      errors[id]
                        ? 'border-rose-500 focus:border-rose-500'
                        : 'border-gray_color/40 focus:border-dark/80'
                    }
                `}
      />
      {errorMessage && (
        <span className="text-red-500 text-xs">{String(errorMessage)}</span>
      )}
    </div>
  )
}

export default Input
