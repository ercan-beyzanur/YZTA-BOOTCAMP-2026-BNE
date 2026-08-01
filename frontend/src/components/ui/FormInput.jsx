import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function FormInput({ icon: Icon, label, error, ...props }) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = props.type === 'password'

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-coal">{label}</label>
      )}
      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        )}
        <input
          {...props}
          type={isPassword && showPassword ? 'text' : props.type}
          className={`w-full ${
            Icon ? 'pl-10' : 'pl-4'
          } pr-4 py-2.5 bg-gray-50 border rounded-xl text-sm text-coal placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald/30 focus:border-emerald transition-all ${
            error ? 'border-red-500' : 'border-gray-200'
          }`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
