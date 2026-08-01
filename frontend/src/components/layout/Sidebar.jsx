import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  LayoutDashboard, Users, Settings, LogOut,
  Bot, MessageSquare, ChevronLeft, ChevronRight,
} from 'lucide-react'
import { logout } from '../../store/actions/authActions'
import Logo from '../ui/Logo'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/chat', icon: MessageSquare, label: 'AI Chat' },
  { to: '/users', icon: Users, label: 'Kullanicilar' },
  { to: '/settings', icon: Settings, label: 'Ayarlar' },
]

export default function Sidebar({ collapsed, onToggle }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-40 transition-all duration-300 flex flex-col ${
        collapsed ? 'w-[72px]' : 'w-64'
      }`}
    >
      <div className="flex items-center gap-3 px-5 h-16 border-b border-gray-100">
        <Logo size={32} />
        {!collapsed && (
          <span className="text-lg font-bold text-coal tracking-tight whitespace-nowrap">
            SupportAgent.AI
          </span>
        )}
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-emerald/10 text-emerald-dark'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-coal'
              }`
            }
          >
            <Icon size={20} strokeWidth={1.8} />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pb-4 space-y-1">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-500/10 hover:text-red-600 transition-all duration-200 w-full"
        >
          <LogOut size={20} strokeWidth={1.8} />
          {!collapsed && <span>Cikis Yap</span>}
        </button>
      </div>

      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-coal hover:border-gray-300 transition-all shadow-sm"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </aside>
  )
}
