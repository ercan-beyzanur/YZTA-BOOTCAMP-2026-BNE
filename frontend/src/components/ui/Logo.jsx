import { Bot } from 'lucide-react'

export default function Logo({ size = 28 }) {
  return (
    <div
      className="flex items-center justify-center rounded-xl bg-emerald/10"
      style={{ width: size, height: size }}
    >
      <Bot size={size * 0.6} className="text-emerald" strokeWidth={1.8} />
    </div>
  )
}
