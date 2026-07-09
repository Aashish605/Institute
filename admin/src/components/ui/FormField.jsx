import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi'

const baseInput = 'w-full border rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 transition-all duration-200 bg-white focus:outline-none'

export function FormField({ label, name, register, errors, type = 'text', placeholder, required, rows, className, icon: Icon, helperText }) {
  const err = errors?.[name]
  const Tag = type === 'textarea' ? 'textarea' : 'input'

  return (
    <div className={className}>
      <label htmlFor={name} className="block font-medium mb-1.5 text-gray-700 text-sm">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Icon size={16} />
          </div>
        )}
        <Tag
          id={name}
          type={type !== 'textarea' ? type : undefined}
          rows={type === 'textarea' ? rows || 4 : undefined}
          placeholder={placeholder}
          {...register(name, required ? { required: `${label} is required` } : {})}
          className={`${baseInput}
            ${Icon ? 'pl-10' : ''}
            ${err ? 'border-red-400 focus:border-red-400 focus:ring-[3px] focus:ring-red-200/50' : 'border-gray-300 focus:border-primary focus:ring-[3px] focus:ring-primary/10'}
            ${type === 'textarea' ? 'resize-y min-h-[100px]' : ''}
          `}
        />
        {err && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400">
            <FiAlertCircle size={16} />
          </div>
        )}
        {!err && Icon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300">
            <FiCheckCircle size={16} className="opacity-0" />
          </div>
        )}
      </div>
      {err && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><span>•</span>{err.message}</p>}
      {helperText && !err && <p className="text-gray-400 text-xs mt-1.5">{helperText}</p>}
    </div>
  )
}

export function FormSelect({ label, name, register, errors, required, children, placeholder, className, icon: Icon }) {
  const err = errors?.[name]

  return (
    <div className={className}>
      <label htmlFor={name} className="block font-medium mb-1.5 text-gray-700 text-sm">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Icon size={16} />
          </div>
        )}
        <select
          id={name}
          {...register(name, required ? { required: `${label} is required` } : {})}
          className={`${baseInput} ${Icon ? 'pl-10' : ''} ${err ? 'border-red-400 focus:border-red-400 focus:ring-[3px] focus:ring-red-200/50' : 'border-gray-300 focus:border-primary focus:ring-[3px] focus:ring-primary/10'}`}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {children}
        </select>
        {err && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400">
            <FiAlertCircle size={16} />
          </div>
        )}
      </div>
      {err && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><span>•</span>{err.message}</p>}
    </div>
  )
}
